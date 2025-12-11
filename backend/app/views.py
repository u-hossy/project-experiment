from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json
import traceback
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# CRUD処理のために追加
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from . import models
from . import serializers

# アルゴリズムをインポート
from .lib import algorithm1, algorithm2

ALGORITHM_MAP = {
    1: algorithm1.process_warikan_json,
    2: algorithm2.process_warikan_json,
}

@method_decorator(csrf_exempt, name="dispatch")
class CalculateWarikanView(View):

    def post(self, request, *args, **kwargs):
        try:
            input_data = json.loads(request.body)
            algo_id = input_data.get("algorithm_id")
            
            group_id = input_data.get("group_id") or input_data.get("event_id")

            # イベント特定
            event = None
            if group_id:
                event = models.Events.objects.filter(url_end_code=group_id).first()
                if not event:
                    return JsonResponse({"error": "Event not found"}, status=404)
                
            # 支払情報保存
            if event:
                payments_list = input_data.get("payments", [])
                models.Payments.objects.filter(event_id=event).delete()

                new_payments = []
                for p in payments_list:
                    try:
                        payer = models.Members.objects.get(event_id=event, member_id=int(p.get("paid_by")))
                        receiver = models.Members.objects.get(event_id=event, member_id=int(p.get("paid_for")))

                        new_payments.append(models.Payments(
                            event_id=event,
                            payment_id=int(p.get("id", 0)),
                            paid_by=payer,
                            paid_for=receiver,
                            amount=int(p.get("amount", 0)),
                            note=p.get("note", "")
                        ))
                    except (models.Members.DoesNotExist, ValueError):
                        continue
                
                models.Payments.objects.bulk_create(new_payments)

            # アルゴリズム実行部分
            output_data = None

            process_function = ALGORITHM_MAP.get(algo_id)

            if process_function:
                output_data = process_function(input_data)
            else:
                return JsonResponse(
                    {"error": f"Invalid algorithm_id: {algo_id}"}, status=400
                )

            # 結果保存と通知部分
            if event and output_data:
                models.Results.objects.filter(event_id=event).delete()

                new_results = []
                for r in output_data:
                    try:
                        payer = models.Members.objects.get(event_id=event, member_id=int(r.get("paid_by")))
                        receiver = models.Members.objects.get(event_id=event, member_id=int(r.get("paid_for")))

                        new_results.append(models.Results(
                            event_id=event,
                            result_id=int(r.get("id", 0)),
                            paid_by=payer,
                            paid_for=receiver,
                            amount=int(r.get("amount", 0))
                        ))
                    except (models.Members.DoesNotExist, ValueError):
                        continue

                models.Results.objects.bulk_create(new_results)
                
                # WebSocketでグループ全員に通知を送る処理
                if group_id:
                    try:
                        channel_layer = get_channel_layer()
                    
                        group_name = f'warikan_{group_id}'

                        async_to_sync(channel_layer.group_send)(
                            group_name,
                            {
                                'type': 'chat_message', 
                                'message': {
                                    'results': output_data
                                }
                            }
                        )
                    except Exception as ws_error:
                        print(f"Warning: WebSocket通知に失敗: {ws_error}")

            return JsonResponse(output_data, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    def get(self, request, *args, **kwargs):
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)


class HealthCheckView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({"status": "ok"}, status=200)


#　CRUD処理
class EventsViewSet(viewsets.ModelViewSet):
    # 作成日時の新しい順に取得
    queryset = models.Events.objects.all().order_by('-created_at')
    serializer_class = serializers.EventsSerializer
    
    # URLの識別子を 'id' ではなく 'url_end_code' に変更
    lookup_field = 'url_end_code'


class MembersViewSet(viewsets.ModelViewSet):
    queryset = models.Members.objects.all().order_by('id')
    serializer_class = serializers.MembersSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        event_code = self.request.query_params.get("event_id")
        if event_code:
            qs = qs.filter(event_id__url_end_code=event_code)
        return qs
    
    @action(detail=False, methods=["delete"])
    def delete_by_key(self, request):
        event_id = request.query_params.get("event_id")
        member_id = request.query_params.get("member_id")

        deleted, _ = models.Members.objects.filter(
            event_id__url_end_code=event_id,
            member_id=member_id
        ).delete()

        return Response({"status": "deleted"}, status=200)


class PaymentsViewSet(viewsets.ModelViewSet):
    queryset = models.Payments.objects.all().order_by('id')
    serializer_class = serializers.PaymentsSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        event_code = self.request.query_params.get("event_id")
        if event_code:
            qs = qs.filter(event_id__url_end_code=event_code)
        return qs
    
    @action(detail=False, methods=["delete"])
    def delete_by_key(self, request):
        event_id = request.query_params.get("event_id")
        payment_id = request.query_params.get("payment_id")

        deleted, _ = models.Payments.objects.filter(
            event_id__url_end_code=event_id,
            payment_id=payment_id
        ).delete()

        return Response({"status": "deleted"}, status=200)
    
    @action(detail=False, methods=["patch"])
    def patch_by_key(self, request):
        event_id = request.data.get("event_id")
        payment_id = request.data.get("payment_id")

        try:
            obj = models.Payments.objects.get(
                event_id__url_end_code=event_id,
                payment_id=payment_id)
        except models.Payments.DoesNotExist:
            return Response({"error": "payment not found"}, status=404)

        serializer = self.get_serializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=200)


class ResultsViewSet(viewsets.ModelViewSet):
    queryset = models.Results.objects.all().order_by('id')
    serializer_class = serializers.ResultsSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        event_code = self.request.query_params.get("event_id")
        if event_code:
            qs = qs.filter(event_id__url_end_code=event_code)
        return qs
    
    @action(detail=False, methods=["delete"])
    def delete_by_event(self, request):
        event_id = request.query_params.get("event_id")

        deleted, _ = models.Results.objects.filter(event_id__url_end_code=event_id).delete()
        return Response({"status": "deleted", "count": deleted}, status=200)
    
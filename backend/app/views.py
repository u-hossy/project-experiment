from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

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
            
            group_id = input_data.get("group_id") 

            output_data = None

            process_function = ALGORITHM_MAP.get(algo_id)

            if process_function:
                output_data = process_function(input_data)
                
                # WebSocketでグループ全員に通知を送る処理
                if group_id:
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

            else:
                return JsonResponse(
                    {"error": f"Invalid algorithm_id: {algo_id}"}, status=400
                )

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
    
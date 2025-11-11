from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json

# アルゴリズムをインポート
from .lib import algorithm1, algorithm2 #, algorithm3 # 今後追加のアルゴリズムがあればここに追加


ALGORITHM_MAP = {
    1: algorithm1.process_warikan_json,
    2: algorithm2.process_warikan_json,
    # 3: algorithm3.process_warikan_json,
    # 今後追加のアルゴリズムがあればここに追加
}


@method_decorator(csrf_exempt, name="dispatch")
class CalculateWarikanView(View):

    def post(self, request, *args, **kwargs):
        try:
            # フロントエンドから送られてきたJSONデータを受け取り
            input_data = json.loads(request.body)

            # algorithm_id を取得
            algo_id = input_data.get("algorithm_id")

            output_data = None  # 結果を格納する変数

            # アルゴリズムの選択と実行
            process_function = ALGORITHM_MAP.get(algo_id) # 辞書から、IDに対応する関数を取得

            if process_function:
                output_data = process_function(input_data)
            else:
                return JsonResponse(
                    {"error": f"Invalid algorithm_id: {algo_id}"}, status=400
                )

            # 結果をJSONで返す
            return JsonResponse(output_data, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    def get(self, request, *args, **kwargs):
        # GETリクエストは禁止
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)


class HealthCheckView(View):

    def get(self, request, *args, **kwargs):
        return JsonResponse({"status": "ok"}, status=200)
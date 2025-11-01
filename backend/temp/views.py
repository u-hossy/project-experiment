from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

#アルゴリズムをインポート
from .temp import algorithm1
from .temp import algorithm2

@csrf_exempt
def calculate_warikan(request):
    if request.method == 'POST':
        try:
            # フロントエンドから送られてきたJSONデータを受け取り
            input_data = json.loads(request.body)
            
            # algorithm_id を取得
            algo_id = input_data.get("algorithm_id")

            output_data = None # 結果を格納する変数

            #アルゴリズムの選択と実行
            if algo_id == 1:
                # アルゴリズム1を呼び出す
                output_data = algorithm1.process_warikan_json(input_data)
            elif algo_id == 2:
                # アルゴリズム2を呼び出す
                output_data = algorithm2.process_warikan_json(input_data)
            else:
                # algorithm_id が無効な場合
                return JsonResponse({"error": f"Invalid algorithm_id: {algo_id}"}, status=400)
            
            
            # 結果をJSONでフロントエンドに返す
            return JsonResponse(output_data, safe=False)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Only POST method is allowed"}, status=405)
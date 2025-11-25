from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import datetime
from django.conf import settings
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

import json

# アルゴリズムをインポート
from .lib import algorithm1, algorithm2 #, algorithm3 # 今後追加のアルゴリズムがあればここに追加


ALGORITHM_MAP = {
    1: algorithm1.process_warikan_json,
    2: algorithm2.process_warikan_json,
    # 3: algorithm3.process_warikan_json,
    # 今後追加のアルゴリズムがあればここに追加
}

# ログイン処理クラス
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        refresh_token = response.data["refresh"]
        
        
        # refresh tokenをcookieに保存
        response.set_cookie(
            "refresh_token",
            refresh_token,
            httponly=True,
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds(),
            path="/",
        )
        
        return response
    
# ログアウト処理クラス
class LogoutView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        refresh_cookie_name = settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"]
        refresh_token = request.COOKIES.get(refresh_cookie_name)
        
        
        
        # Cookie削除
        response = Response({"detail": "Logged out"}, status=200)
        
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                print("Warning: Invalid or expired refresh token during logout attempt.")
                pass

        response.delete_cookie(refresh_cookie_name)
            
        
        return response

# token更新クラス
class RefreshTokenView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        
        if refresh_token is None:
            return Response({"detail": "No refresh token"}, status=401)
        
        try:
            refresh = RefreshToken(refresh_token)
        except Exception:
            return Response({"detail": "Invalid refresh token"}, status=401)
        
        # 新しいトークン生成
        new_access = str(refresh.access_token)
        new_refresh = str(refresh)
        
        response = Response({"access": new_access}, status=200)
        
        # 新しい tokenをCookieセット
        response.set_cookie(
            "refresh_token",
            new_refresh,
            httponly=True,
            secure=False, # 本番環境ではTrue
            samesite="Lax",
            path="/"
        )
        
        return response

# ログイン状態確認クラス
class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({"username": request.user.username})


# API処理クラス
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
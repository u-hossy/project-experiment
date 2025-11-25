from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Cookie から access token を取得
        access_token = request.COOKIES.get("access")

        if access_token is None:
            return None

        validated_token = self.get_validated_token(access_token)

        return self.get_user(validated_token), validated_token

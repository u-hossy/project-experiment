import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator, OriginValidator
import app.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = ProtocolTypeRouter({
    # HTTPリクエスト
    "http": get_asgi_application(),

    # WebSocketリクエスト
    "websocket": AllowedHostsOriginValidator(
        OriginValidator(
            AuthMiddlewareStack(
                URLRouter(
                    app.routing.websocket_urlpatterns
                )
            ),
            # 開発環境で許可するオリジン
            os.environ['CORS_ALLOWED_ORIGINS'].split(',')
        )
    ),
})
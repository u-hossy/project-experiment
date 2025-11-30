import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import app.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = ProtocolTypeRouter({
    # HTTPリクエスト
    "http": get_asgi_application(),

    # WebSocketリクエスト
    # "websocket": AuthMiddlewareStack(
    #     URLRouter(
    #         app.routing.websocket_urlpatterns
    #     )
    # ),
})
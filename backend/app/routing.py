from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # フロントエンドからは ws://localhost:8000/ws/warikan/グループID/ で接続
    re_path(r'ws/warikan/(?P<group_id>\w+)/$', consumers.WarikanConsumer.as_asgi()),
]
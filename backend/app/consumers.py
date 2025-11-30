import json
from channels.generic.websocket import AsyncWebsocketConsumer

class WarikanConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # group_id を取得
        self.group_id = self.scope['url_route']['kwargs']['group_id']
        self.room_group_name = f'warikan_{self.group_id}'

        # グループに参加
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # 接続を許可
        await self.accept()

    async def disconnect(self, close_code):
        # グループから離脱
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Viewから送られてきたメッセージを受け取るメソッド
    async def chat_message(self, event):
        message = event['message']

        # WebSocketを通じてReact（クライアント）にデータを送信
        await self.send(text_data=json.dumps({
            'message': message
        }))
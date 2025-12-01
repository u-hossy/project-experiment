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
        
    # クライアントがサーバーにデータを送信 
    async def receive(self, text_data):
        data = json.loads(text_data)
        event_type = data.get("type")
        
        if event_type == "member_added":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "broadcast_member_added",
                    "member": data["member"]
                    }
            )
        elif event_type == "payment_added":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "broadcast_payment_added",
                    "payment": data["payment"]
                }
            )
            
    async def broadcast_member_added(self, event):
        await self.send(json.dumps({
            "type": "member_added",
            "member": event["member"]
        }))
        
    async def broadcast_payment_added(self, event):
        await self.send(json.dumps({
            "type": "payment_added",
            "payment": event["payment"]
        }))
    

        
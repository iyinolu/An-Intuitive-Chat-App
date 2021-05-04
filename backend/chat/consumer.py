import json
from channels.generic.websocket import WebsocketConsumer, async_to_sync
from django.core.checks import messages
from .models import Message, Room
from django.contrib.auth.models import User
from .serializers import RoomSerializer, MessageSerializer

class ChatConsumer(WebsocketConsumer):
    '''
    Synchronous Websocket consumer
    '''
    def connect(self):
        print('got here')
        self.user = self.scope['user']
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        print(self.user)
        # Join room group
        # TODO: Find how to limit no of users listening in a channel layer
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )        
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        print(close_code)
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Entry-Point of all data sent over websocket connection
    def receive(self, text_data):
        data = json.loads(text_data)
        print('recieved')
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': data
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        user_id = User.objects.filter(username=event['message']['username']).first().id
        room_id = Room.objects.filter(id=event['message']['room']).first().id
        content = event['message']['content']


        # message = Message({'chatroom':room_id, 'user':user_id, 'content':content})
        serializer = MessageSerializer(data = {'chatroom':room_id, 'user':user_id, 'content':content})
        if serializer.is_valid():
            print('saved')
            serializer.save()
        print(serializer.data)
        # Send message to WebSocket
        async_to_sync(self.send(text_data=json.dumps(
            {
                'command': 'new_message',
                'messages': serializer.data
                
            }
        )))




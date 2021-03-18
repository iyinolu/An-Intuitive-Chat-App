import json
from channels.generic.websocket import WebsocketConsumer, async_to_sync
from django.core.checks import messages
from .models import Message, Room
from django.contrib.auth.models import User
# from channels.auth import channel_session_user, channel_session_user_from_http

class ChatConsumer(WebsocketConsumer):

    '''
    Asynchronous Websocket consumer
    '''

    def messagesJson(message):
        dump = []
        for msg in message:
            dump.append({
                'user': msg.user.username,
                'content': msg.content,
                'timestamp': msg.timestamp,
                'chatroomname': msg.chatroom.room_name
            })
    
    def fetch_messages(self, data):
        room = Room.objects.filter(room_name=self.room_group_name).first()
        if room:
            room_id = room.id
            message = Message.objects.filter(room=room_id).all()
            
            content = {
                'msg': self.messagesJson(message)
            }
        # Send msg to the websocket server
        # Handle if no room name


    def new_message(self, data):
    
        room = Room.objects.filter(room_name=self.room_group_name).first()
        if not room:
            room_info = {'room_name': self.room_group_name }
            new_room = Room(**room_info)
            new_room.save()
            room = Room.objects.filter(room_name=self.room_group_name).first()

        msg_dict = {
                'chatroom': room,
                'user': self.user,
                'content': data['message']
            }
        new_msg = Message(**msg_dict)
        new_msg.save()



        
    # To Trigger Specific Actions
    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):    
        self.user = self.scope['user']
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )        
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    # Entry-Point of all data sent over websocket connection
    
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': data['message']
            }
        )

    
    def send_chat_message(self, message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        async_to_sync(self.send(text_data=json.dumps({
            'message': message
        })))




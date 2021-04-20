import json
from channels.generic.websocket import WebsocketConsumer, async_to_sync
from django.core.checks import messages
from .models import Message, Room
from django.contrib.auth.models import User
from .serializers import RoomSerializer
# from channels.auth import channel_session_user, channel_session_user_from_http

class ChatConsumer(WebsocketConsumer):

    '''
    Asynchronous Websocket consumer
    '''

    def messagesJson(self, message):
        dump = []
        for msg in message:
            dump.append({
                'id': msg.id,
                'user': msg.user.username,
                'content': msg.content,
                'chatroomname': msg.chatroom.room_name
            })
        return dump
            
    
    def fetch_messages(self, data):
        room = Room.objects.filter(room_name=self.room_group_name).first()
        if room:
            room_id = room.id
            message = Message.objects.filter(chatroom=room_id).all()
            content = {
                'command': 'messages',
                'messages': self.messagesJson(message)
            }

            async_to_sync(self.send(text_data=json.dumps(
                content
            )))

        # Send msg to the websocket server
        # Handle if no room name
    def fetch_chat_rooms(self, data):
        # NOTE: Add id to user data in frontend
        user = User.objects.filter(username=data['username']).first()
        id = user.id
        rooms = Room.objects.filter(friend_id=id).all() | Room.objects.filter(you_id=id).all()
        # serialize_rooms = 
        async_to_sync(self.send(text_data=json.dumps({
            'command': 'add_chatroom',
            'rooms': [RoomSerializer(room).data for room in rooms]
            }
        )))

    def new_message(self, data):
        room = Room.objects.filter(room_name=self.room_group_name).first()
        user = User.objects.filter(id=1).first()
        if not room:
            room_info = {'room_name': self.room_group_name }
            new_room = Room(**room_info)
            new_room.save()
            room = Room.objects.filter(room_name=self.room_group_name).first()
        msg_dict = {
                'chatroom': room,
                'user': user,
                'content': data['message']
            }
        new_msg = Message(**msg_dict)
        new_msg.save()
        
        async_to_sync(self.send(text_data=json.dumps(
            {
                'command': 'new_message',
                'messages': self.messagesJson(Message.objects.filter(id=new_msg.id))[0]
            }
        )))

    # To Trigger Specific Actions
    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
        'fetch_chat_rooms': fetch_chat_rooms
    }

    def connect(self):
        print('got here')
        self.user = self.scope['user']
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        print(self.room_name)
        # Join room group
        # TODO: Find how to limit no of users listening in a channel layer
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
        # async_to_sync(self.send(text_data=json.dumps(
        #     {
        #         'command': 'new_message',
        #         'messages': {
        #             'content': message,
        #             'id': 3,
        #             'user': '',
        #             'chatroomname': self.room_group_name    
        #         }
                
        #     }
        # )))




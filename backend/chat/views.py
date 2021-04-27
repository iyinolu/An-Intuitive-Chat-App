from django.core.checks import messages
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http.response import HttpResponse

from chat.models import Message, Room
from chat.serializers import MessageSerializer, RoomSerializer


from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, permissions, mixins
from rest_framework.views import APIView




def default(request):
    return render(request, 'chat/index.html')

def chatroom(request, chatrm_name):
    return render(
        request, 'chat/chatroom.html', {"room_name":chatrm_name}
    )

def get_room_messages(request, user):
    return HttpResponse({'no_content': 'No Messages found'})


@api_view(['GET'])
def get_chatrooms(request, username):
    user_id = User.objects.filter(username=username).first()
    rooms = Room.objects.filter(you_id=user_id) | Room.objects.filter(friend_id=user_id)
    room_data = [RoomSerializer(room).data for room in rooms]
    return Response(room_data)


@api_view(['GET'])
def get_messages(request, room_id):
    messages = Message.objects.filter(chatroom=room_id).all()
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)
    
    




class MessagesList(generics.GenericAPIView):
    serializer_class = MessageSerializer
    lookup_field = 'chatroom_id'
    queryset = Message.objects.all()

from django.core.checks import messages
from django.db.models import query
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http.response import Http404, HttpResponse

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


class MultipleRoomLookupMixin:
    '''
    Mixin to lookup multiple model fields given a 
    single lookup_field parameter
    '''
    def get_object(self):
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        filter_pairs = []
        for field in self.lookup_field:
            filter_pairs.append({field: self.kwargs[self.lookup_url_kwarg]})

        obj = self.custom_get_object_or_404(filter_pairs)
        return obj

class TestGetRoom(MultipleRoomLookupMixin, generics.RetrieveAPIView):
    '''
    Endpoint for returning chatroom queryset response
    '''
    serializer_class = RoomSerializer
    queryset = Room.objects.all()
    lookup_field = ['you_id', 'friend_id']
    lookup_url_kwarg = 'id'

    def custom_get_object_or_404(self, filter_pairs):
        queryset = self.get_queryset()
        try:
            return queryset.filter(you_id=filter_pairs[0]['you_id']) | queryset.filter(friend_id=filter_pairs[1]['friend_id'])
        except AttributeError:
            raise ValueError('Input the user id should be a string')
        except queryset.model.DoesNotExist:
            raise Http404('No model found')

    def get_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs, many=True)


class AddUser(generics.CreateAPIView):
    serializer_class = RoomSerializer
    permission_classes = [permissions.AllowAny]

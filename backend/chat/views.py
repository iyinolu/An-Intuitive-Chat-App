from django.shortcuts import render
from django.contrib.auth.models import User
from django.http.response import HttpResponse
from chat.models import Message
from chat.serializers import MessageSerializer


# Create your views here.
def default(request):
    return render(request, 'chat/index.html')

def chatroom(request, chatrm_name):
    return render(
        request, 'chat/chatroom.html', {"room_name":chatrm_name}
    )

def get_room_messages(request, user):
    print(request, user)
    # messages = Message.objects.filter(chatroom=request.data[id]).all()
    # if messages:
    #     return HttpResponse([MessageSerializer(query).data for query in messages]) 
    # else:
    return HttpResponse({'no_content': 'No Messages found'})
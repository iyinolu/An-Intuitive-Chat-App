from django.shortcuts import render

# Create your views here.
def default(request):
    return render(request, 'chat/index.html')

def chatroom(request, chatrm_name):
    return render(
        request, 'chat/chatroom.html', {"room_name":chatrm_name}
    )


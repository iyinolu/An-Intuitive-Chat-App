from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from .views import (chatroom,
                    default,
                    get_room_messages, 
                    get_chatrooms, 
                    get_messages, 
                    TestGetRoom,
                    AddUser
                    )
from chat import views

urlpatterns = [
    path('', default, name='default-page'),
    path('chat/<str:chatrm_name>/', chatroom, name='chat-room'),
    path('loadchat/', get_room_messages),
    path('chatroom/<str:username>/', get_chatrooms),
    path('messages/<int:room_id>', get_messages, name='get-messages'),
    path('chatrooms/<int:id>/', TestGetRoom.as_view()),
    path('newroom/', AddUser.as_view())
]
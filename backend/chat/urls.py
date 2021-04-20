from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from .views import chatroom, default, get_room_messages

urlpatterns = [
    path('', default, name='default-page'),
    path('chat/<str:chatrm_name>/', chatroom, name='chat-room'),
    path('loadchat/', get_room_messages)
]
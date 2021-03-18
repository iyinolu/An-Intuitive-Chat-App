from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from .views import chatroom, default

urlpatterns = [
    path('', default, name='default-page'),
    path('chat/<str:chatrm_name>/', chatroom, name='chat-room')
]
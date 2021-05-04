from traceback import print_tb
from django.urls import path
from . import views

urlpatterns = [
    path('create_user/', views.CreateUserEndpoint.as_view())
]

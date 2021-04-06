from django.urls import path
from .views import current_user, user_view 

urlpatterns = [
    path('current_user/', current_user),
    path('access_user/', user_view)
]

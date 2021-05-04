from decimal import Context
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

from rest_framework import permissions, serializers, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import generics

from userprofile.serializers import UserSerializer, UserSerializerWithToken


class CreateUserEndpoint(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializerWithToken

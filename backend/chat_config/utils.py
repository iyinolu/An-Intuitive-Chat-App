from rest_framework.serializers import Serializer
from userprofile.serializers import UserSerializer


def custom_jwt_response_handler(token, user=None, request=None):
    print(request)
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
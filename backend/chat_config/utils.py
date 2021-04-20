from rest_framework.serializers import Serializer
from userprofile.serializers import UserSerializer

# token, user, request
def custom_jwt_response_handler(token, user=None, request=None):
    print("gets some :", request)
    # manages data return on login or signup
    return {
        'token': token,
        # TODO: Return chat rooms avaliable to use in UserSerializer object
        'user': UserSerializer(user, context={'request': request}).data
    }
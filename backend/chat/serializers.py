from django.contrib.auth.models import User
from rest_framework import serializers
from chat.models import Message, Room
from django.db import DataError
from rest_framework.validators import UniqueTogetherValidator, qs_filter

from itertools import permutations


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class UniqueBothWaysValidator(UniqueTogetherValidator):
    '''
    An adapted version of "UniqueTogetherValidator" class. 
    It ensures the selected fields are unique regardless of their
    permutations.
    '''
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def filter_queryset(self, attrs, queryset, serializer):
        sources = [
            serializer.fields[field_name].source
            for field_name in self.fields
        ]
        
        attrs_keys = list(attrs.keys())
        filter_attrs = {kwarg:attrs[kwarg] for kwarg in sources}

        # get the permutation of the unique together fields to ensure
        # the choosen fields are unique in both ways.
        attrs_permutation = list(permutations(list(filter_attrs.values())))

        filter_kwargs = [
            {sources[0]:perm[0], sources[1]:perm[1]} 
                            for perm in attrs_permutation
        ]     

        return qs_filter(queryset, **filter_kwargs[0]) | qs_filter(queryset, **filter_kwargs[1])
        
 
class RoomSerializer(serializers.ModelSerializer):
    room_members = serializers.SerializerMethodField()
    class Meta:
        model = Room
        fields = ['room_name', 'room_type', 'friend', 'you', 'room_members']
        validators = [
            UniqueBothWaysValidator(
                queryset=Room.objects.all(),
                fields = ['you', 'friend']
            )
        ]

    def get_room_members(self, obj):
        '''Get the members of the room instance '''
        you = obj.you.username
        friend = obj.friend.username
        return [you, friend]

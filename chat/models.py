import re
from django.db import models
from django.contrib.auth.models import User
from django.db.models.constraints import UniqueConstraint
from django.db.models.expressions import OrderBy

class Room(models.Model):
    room_name = models.CharField(max_length=400)
    room_type = models.BooleanField(unique=bool, null=True)
    friend = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    you = models.ForeignKey(User, on_delete=models.CASCADE, related_name='myroom', null=True)


    def __str__(self):
        return self.room_name

    @classmethod
    def room_members(cls, user_id):
        '''
        Returns a list of rooms a user has
        '''
        room_list = []        
        for rooms in cls.objects.all():
            if rooms.friend.id == user_id or rooms.you.id == user_id:
                room_list.append(rooms.id)
        return room_list

    class Meta:
        unique_together = ('friend', 'you',)

class Message(models.Model):
    chatroom = models.ForeignKey(Room, on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='name', on_delete=models.CASCADE)
    content = models.TextField(max_length=400)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)

    
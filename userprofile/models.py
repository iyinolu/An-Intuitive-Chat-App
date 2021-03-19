from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(default='default.png', upload_to='profileimages')
    bio = models.CharField(max_length=500, null=True)

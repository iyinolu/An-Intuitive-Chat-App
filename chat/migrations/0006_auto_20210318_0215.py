# Generated by Django 3.1.6 on 2021-03-18 01:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0005_auto_20210316_2049'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='friend',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='room',
            name='you',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='myroom', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='room',
            unique_together={('friend', 'you')},
        ),
    ]

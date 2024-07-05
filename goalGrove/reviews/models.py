from django.db import models
from django.contrib.auth.models import User
import os
from uuid import uuid4
from django.utils import timezone

def upload_filepath(instance, filename):
    today_str = timezone.now().strftime("%Y%m%d")
    file_basename = os.path.basename(filename)
    return f'{instance._meta.model_name}/{today_str}/{str(uuid4())}_{file_basename}'

class Review(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    image = models.ImageField(upload_to = upload_filepath, blank = True)
    content = models.TextField()
    like_users = models.ManyToManyField('users.User', related_name='like_review')

    def __str__(self):
        return f"Review by {self.user.username}"

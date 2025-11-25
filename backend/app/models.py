from django.db import models

class User(models.Model):
    user_id = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20)
    nickname = models.CharField(max_length=20)
    
    def __str__(self):
        return self.user_id
    
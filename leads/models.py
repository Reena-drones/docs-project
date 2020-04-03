from django.db import models
from datetime import datetime

# Create your models here.

from django.db import models

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=300)
    last_active = models.DateTimeField(default=datetime.now)
    class Meta:
        db_table="users"

# Generated by Django 3.0.4 on 2020-04-02 15:09

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0003_users_last_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='last_active',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]
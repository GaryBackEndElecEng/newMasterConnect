# Generated by Django 4.1 on 2022-11-27 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0037_useraccount_newwebsite_useraccount_publishcomplete'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='postActivateEmailSent',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='publishEmailSent',
            field=models.BooleanField(default=False),
        ),
    ]

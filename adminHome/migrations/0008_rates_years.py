# Generated by Django 4.1 on 2022-12-20 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminHome', '0007_producttasktracker_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='rates',
            name='years',
            field=models.IntegerField(default=5),
        ),
    ]

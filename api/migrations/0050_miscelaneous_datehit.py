# Generated by Django 4.1 on 2022-12-03 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0049_alter_imagefield_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='miscelaneous',
            name='dateHit',
            field=models.DateTimeField(auto_now=True),
        ),
    ]

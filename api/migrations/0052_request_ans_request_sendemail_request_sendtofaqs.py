# Generated by Django 4.1 on 2022-12-07 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0051_miscelaneous_avg_miscelaneous_firstdate'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='ans',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='request',
            name='sendEmail',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='request',
            name='sendToFAQS',
            field=models.BooleanField(default=False),
        ),
    ]
# Generated by Django 4.1 on 2022-11-19 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0041_pagefeedback_average'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pagefeedback',
            name='average',
            field=models.IntegerField(default=4),
        ),
    ]

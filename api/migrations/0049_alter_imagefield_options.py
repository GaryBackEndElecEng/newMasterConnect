# Generated by Django 4.1 on 2022-12-02 16:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0048_alter_pagefeedback_options_alter_category_section'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='imagefield',
            options={'ordering': ('id', 'name')},
        ),
    ]
# Generated by Django 4.1 on 2022-08-20 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_wordsnippet_subsectiontitle'),
    ]

    operations = [
        migrations.AddField(
            model_name='wordsnippet',
            name='content1',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='wordsnippet',
            name='content2',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='wordsnippet',
            name='content3',
            field=models.TextField(blank=True),
        ),
    ]

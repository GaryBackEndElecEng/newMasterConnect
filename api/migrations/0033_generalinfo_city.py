# Generated by Django 4.1 on 2022-10-06 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_alter_category_section'),
    ]

    operations = [
        migrations.AddField(
            model_name='generalinfo',
            name='city',
            field=models.CharField(default='Richmod Hill', max_length=200),
        ),
    ]

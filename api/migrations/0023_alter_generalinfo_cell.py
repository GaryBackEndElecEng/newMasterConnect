# Generated by Django 4.1 on 2022-09-20 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_alter_category_section'),
    ]

    operations = [
        migrations.AlterField(
            model_name='generalinfo',
            name='cell',
            field=models.CharField(max_length=200, null=True),
        ),
    ]

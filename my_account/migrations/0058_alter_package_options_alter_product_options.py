# Generated by Django 4.1 on 2022-12-24 13:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0057_creditinvoice_update_creditinvoice_yesupdated'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='package',
            options={'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['name']},
        ),
    ]
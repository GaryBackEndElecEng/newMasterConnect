# Generated by Django 4.1 on 2022-10-06 14:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0005_alter_invoice_enddate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='endDate',
            field=models.DateTimeField(default=datetime.datetime(2022, 10, 6, 10, 3, 4, 536731)),
        ),
    ]

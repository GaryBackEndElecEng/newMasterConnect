# Generated by Django 4.1 on 2022-10-06 14:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0006_alter_invoice_enddate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='endDate',
            field=models.DateTimeField(default=datetime.datetime(2022, 10, 6, 10, 5, 24, 564881)),
        ),
    ]

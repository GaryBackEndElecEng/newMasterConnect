# Generated by Django 4.1 on 2022-10-03 03:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0003_alter_invoice_enddate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='endDate',
            field=models.DateTimeField(default=datetime.datetime(2022, 10, 2, 23, 29, 17, 731656)),
        ),
    ]

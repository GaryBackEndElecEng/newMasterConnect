# Generated by Django 4.1 on 2022-10-10 17:17

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0011_alter_extrainvoice_datestart_alter_invoice_datestart_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='extraSessionID',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='endDate',
            field=models.DateTimeField(default=datetime.datetime(2022, 10, 10, 13, 17, 38, 148141)),
        ),
    ]

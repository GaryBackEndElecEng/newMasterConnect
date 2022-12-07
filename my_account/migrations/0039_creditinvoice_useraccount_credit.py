# Generated by Django 4.1 on 2022-11-28 14:05

import datetime
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0038_useraccount_postactivateemailsent_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CreditInvoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('name', models.CharField(blank=True, max_length=200)),
                ('subTotal', models.IntegerField(blank=True, default=0)),
                ('total', models.IntegerField(blank=True, default=0)),
                ('subTotalMonthly', models.IntegerField(blank=True, default=0)),
                ('totalMonthly', models.IntegerField(blank=True, default=0)),
                ('numPayment', models.IntegerField(blank=True, default=60)),
                ('priceID', models.CharField(blank=True, max_length=150, null=True)),
                ('paid', models.BooleanField(default=False)),
                ('dateStart', models.DateTimeField(default=datetime.datetime.now)),
                ('tax', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='my_account.tax')),
            ],
        ),
        migrations.AddField(
            model_name='useraccount',
            name='credit',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='my_account.creditinvoice'),
        ),
    ]
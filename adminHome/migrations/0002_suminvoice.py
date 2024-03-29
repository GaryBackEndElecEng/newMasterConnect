# Generated by Django 4.1 on 2022-11-03 16:13

import datetime
import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminHome', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SumInvoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=150, null=True)),
                ('allSubTotal', models.IntegerField(blank=True, default=0, null=True)),
                ('allSubMonthly', models.IntegerField(blank=True, default=0, null=True)),
                ('allTotal', models.IntegerField(blank=True, default=0, null=True)),
                ('allMonthly', models.IntegerField(blank=True, default=0, null=True)),
                ('fedTax', models.IntegerField(blank=True, default=0, null=True)),
                ('provtax', models.IntegerField(blank=True, default=0, null=True)),
                ('allPriceID', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=250, null=True), blank=True, default=list, size=None)),
                ('allDateEnd', django.contrib.postgres.fields.ArrayField(base_field=models.DateField(default=datetime.datetime.now), blank=True, default=list, size=None)),
            ],
        ),
    ]

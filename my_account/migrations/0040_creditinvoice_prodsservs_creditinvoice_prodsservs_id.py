# Generated by Django 4.1 on 2022-11-28 14:42

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0039_creditinvoice_useraccount_credit'),
    ]

    operations = [
        migrations.AddField(
            model_name='creditinvoice',
            name='prodsServs',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=100), default=list, size=None),
        ),
        migrations.AddField(
            model_name='creditinvoice',
            name='prodsServs_id',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True), default=list, size=None),
        ),
    ]

# Generated by Django 4.1 on 2022-10-20 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0019_alter_extrainvoice_dateend_alter_invoice_dateend_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tax',
            name='country',
            field=models.CharField(blank=True, choices=[('CA', 'CA'), ('US', 'US')], max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='tax',
            name='subRegion',
            field=models.CharField(blank=True, choices=[('QC', 'QC'), ('ON', 'ON')], max_length=100, null=True),
        ),
    ]

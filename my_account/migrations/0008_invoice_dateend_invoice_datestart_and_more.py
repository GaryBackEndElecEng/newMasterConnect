# Generated by Django 4.1 on 2022-10-09 15:38

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0007_alter_invoice_enddate'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoice',
            name='dateEnd',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='invoice',
            name='dateStart',
            field=models.DateField(default=datetime.datetime(2022, 10, 9, 15, 38, 41, 619822, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AddField(
            model_name='postinvoice',
            name='dateEnd',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='postinvoice',
            name='dateStart',
            field=models.DateField(default=datetime.datetime(2022, 10, 9, 15, 38, 41, 619822, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='date',
            field=models.DateField(default=datetime.datetime(2022, 10, 9, 15, 38, 41, 620819, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='endDate',
            field=models.DateTimeField(default=datetime.datetime(2022, 10, 9, 11, 38, 41, 619822)),
        ),
    ]

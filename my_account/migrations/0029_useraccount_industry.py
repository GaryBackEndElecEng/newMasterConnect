# Generated by Django 4.1 on 2022-11-07 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0028_useraccount_dns_useraccount_website'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='industry',
            field=models.CharField(blank=True, max_length=75, null=True),
        ),
    ]

# Generated by Django 4.1 on 2022-11-30 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0046_quote_preferredcomms'),
    ]

    operations = [
        migrations.AddField(
            model_name='pagefeedback',
            name='pageCount',
            field=models.IntegerField(blank=True, default=1),
        ),
    ]

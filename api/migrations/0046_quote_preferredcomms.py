# Generated by Django 4.1 on 2022-11-28 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0045_quote_faqyes_quote_answer_quote_emailsent_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='quote',
            name='preferredComms',
            field=models.CharField(blank=True, default='email', max_length=50),
        ),
    ]

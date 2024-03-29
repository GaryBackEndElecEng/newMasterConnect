# Generated by Django 4.1 on 2022-12-02 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0047_pagefeedback_pagecount'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='pagefeedback',
            options={'ordering': ('-rating', 'page')},
        ),
        migrations.AlterField(
            model_name='category',
            name='section',
            field=models.CharField(choices=[('contact', 'contact'), ('about', 'about'), ('home', 'home'), ('article', 'article'), ('bio', 'bio'), ('main', 'main'), ('footer', 'footer'), ('GeneralInfo', 'GeneralInfo'), ('sponsor', 'sponsor'), ('designs', 'designs'), ('policy', 'policy'), ('feedback', 'feedback'), ('customTemplate', 'customTemplate')], default='main', max_length=200),
        ),
    ]

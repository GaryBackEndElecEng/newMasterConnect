# Generated by Django 4.1 on 2022-08-30 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_wordsnippet_content1_wordsnippet_content2_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullName', models.CharField(blank=True, max_length=200)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('content', models.TextField(blank=True)),
                ('promotion', models.BooleanField(default=False)),
            ],
        ),
    ]

# Generated by Django 4.1 on 2022-11-06 23:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('adminHome', '0004_producttasktracker'),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskTracker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('extraService', models.ManyToManyField(blank=True, to='adminHome.extraservicetasktracker')),
                ('postService', models.ManyToManyField(blank=True, to='adminHome.postservicetasktracker')),
                ('product', models.ManyToManyField(blank=True, to='adminHome.producttasktracker')),
                ('service', models.ManyToManyField(blank=True, to='adminHome.servicetasktracker')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

# Generated by Django 4.1 on 2022-08-17 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_service_section_service_subsection'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='section',
            field=models.CharField(blank=True, choices=[('allServices', 'allServices'), ('supplemental', 'supplemental'), ('works', 'works'), ('advert', 'advert'), ('main', 'main')], max_length=200),
        ),
    ]

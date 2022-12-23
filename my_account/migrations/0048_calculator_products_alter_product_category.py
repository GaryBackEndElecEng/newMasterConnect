# Generated by Django 4.1 on 2022-12-17 08:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0047_rename_des_servicedependancy_desc'),
    ]

    operations = [
        migrations.AddField(
            model_name='calculator',
            name='products',
            field=models.ManyToManyField(blank=True, related_name='calc_products', to='my_account.product'),
        ),
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('aboutPage', 'aboutPage'), ('contactPage', 'contactPage'), ('footer', 'footer'), ('navBar', 'navBar'), ('detailPage', 'detailPage'), ('blogPage', 'blogPage'), ('frontPage', 'frontPage'), ('articlePage', 'articlePage'), ('sidebar', 'sidebar'), ('signin', 'signin'), ('registration', 'registration'), ('checkout', 'checkout'), ('userAccount', 'userAccount'), ('customFrontPage', 'customFrontPage'), ('changeEmailPage', 'changeEmailPage'), ('changePasswordPage', 'changePasswordPage')], default='frontPage', max_length=50),
        ),
    ]
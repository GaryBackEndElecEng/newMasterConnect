# Generated by Django 4.1 on 2022-12-17 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0048_calculator_products_alter_product_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='savings',
            field=models.IntegerField(blank=True, default=1),
        ),
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('aboutPage', 'aboutPage'), ('contactPage', 'contactPage'), ('footer', 'footer'), ('navBar', 'navBar'), ('detailPage', 'detailPage'), ('blogPage', 'blogPage'), ('frontPage', 'frontPage'), ('articlePage', 'articlePage'), ('sidebar', 'sidebar'), ('signin', 'signin'), ('registration', 'registration'), ('checkout', 'checkout'), ('userAccount', 'userAccount'), ('customFrontPage', 'customFrontPage'), ('changeEmailPage', 'changeEmailPage'), ('changePasswordPage', 'changePasswordPage'), ('internetSales', 'internetSales'), ('SEO', 'SEO'), ('fileSystem', 'fileSystem')], default='frontPage', max_length=50),
        ),
    ]

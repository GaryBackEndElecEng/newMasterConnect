# Generated by Django 4.1 on 2022-12-12 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_account', '0045_alter_product_category_alter_product_type_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='servicedependancy',
            name='des',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('aboutPage', 'aboutPage'), ('contactPage', 'contactPage'), ('footer', 'footer'), ('navBar', 'navBar'), ('detailPage', 'detailPage'), ('blogPage', 'blogPage'), ('frontPage', 'frontPage'), ('articlePage', 'articlePage'), ('sidebar', 'sidebar'), ('signin', 'signin'), ('registration', 'registration'), ('checkout', 'checkout'), ('userAccount', 'userAccount'), ('customFrontPage', 'customFrontPage')], default='frontPage', max_length=50),
        ),
    ]

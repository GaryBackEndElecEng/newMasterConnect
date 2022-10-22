from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from my_account.models import PostService,Service,Price,Product,Price,PriceCatelog
import math

# @receiver(post_save,dispatch_uid='complete_lowest_Price_capture', sender=Service)
# def insertLowest_price_in(sender,created, instance=None, **kwargs):
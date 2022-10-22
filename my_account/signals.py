from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import PostService,Service,Price,Product,Price,PriceCatelog
from .util import calcPackageMonthlyPrice
import math
# you CAN"T SAVE THE SAME MODEL TABLE ASSIGNED BY THE SENDER BECAUSE IT TRIGGERS THE POST_SAVE THAT SAVES THE MODEL, THEN THE SAVE() TRIGGERS THE POST SAVE=> RECURSIVE
#CREATING TWO PRICE RECS BASED ON LOWEST PRICE/MONTHLY IN SERVICE AND PRODUCT
# @receiver(post_save,dispatch_uid='complete_lowest_Price_capture', sender=Service)
# def insertLowest_price_in(sender,created, instance=None, **kwargs):
#     if instance:
#         serviceArr=[]
#         productArr=[]
#         serviceExtraArr=[]
#         servicePostArr=[]

#         newPricecatelog,created=PriceCatelog.objects.get_or_create(name="baseServices_4")
#         if created:
#             newPricecatelog.save()

#         for priceCatelog in PriceCatelog.objects.all():
#             if priceCatelog.service.all() is not None and len(priceCatelog.service.all())>0:
#                 for service in priceCatelog.service.all():
#                     serviceArr.append({"price":service.price,"monthly":service.monthly})
                
#                 priceInst, created=Price.objects.get_or_create(
#                     name="Starting Service Price",priceCatelog=newPricecatelog
#                     )
#                 if(serviceArr):
#                     priceInst.price=min([obj["price"] for obj in serviceArr])
#                     priceInst.monthly=min([obj["monthly"] for obj in serviceArr])
#                     priceInst.desc="starting service prices"
#                     priceInst.save()
#             if priceCatelog.product.all() is not None and len(priceCatelog.product.all())>0:
#                 for product in priceCatelog.product.all():
#                     productArr.append({"price":product.price,"monthly":product.monthly})
#                 priceInstProd, created=Price.objects.get_or_create(
#                     name="Starting Product Price",priceCatelog=newPricecatelog
                    
#                     )
#                 if productArr:
#                     priceInstProd.price=min([obj["price"] for obj in productArr])
#                     priceInstProd.monthly=min([obj["monthly"] for obj in productArr])
#                     priceInst.desc="starting product prices"
#                     priceInstProd.save()
#             if priceCatelog.extraService.all() is not None and len(priceCatelog.extraService.all())>0:
#                 for product in priceCatelog.extraService.all():
#                     serviceExtraArr.append({"price":product.price,"monthly":product.monthly})
#                 priceInstProd, created=Price.objects.get_or_create(
#                     name="Starting Extra Service Price",priceCatelog=newPricecatelog
                    
#                     )
#                 if serviceExtraArr:
#                     priceInstProd.price=min([obj["price"] for obj in serviceExtraArr])
#                     priceInstProd.monthly=min([obj["monthly"] for obj in serviceExtraArr])
#                     priceInst.desc="starting extra service prices"
#                     priceInstProd.save()

#             if priceCatelog.postService.all() is not None and len(priceCatelog.postService.all())>0:
#                 for product in priceCatelog.postService.all():
#                     servicePostArr.append({"price":product.price,"monthly":product.monthly})
#                 priceInstProd, created=Price.objects.get_or_create(
#                     name="Starting Post Service Price",priceCatelog=newPricecatelog
                    
#                     )
#                 if servicePostArr:
#                     priceInstProd.price=min([obj["price"] for obj in servicePostArr])
#                     priceInstProd.monthly=min([obj["monthly"] for obj in servicePostArr])
#                     priceInst.desc="starting Postservice prices"
#                     priceInstProd.save()

            
        

    

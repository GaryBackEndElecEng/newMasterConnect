from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from my_account.models import PostService,Service,Price,Product,Price,PriceCatelog,UserAccount,Invoice,PostInvoice,ExtraInvoice
from .models import *
import math

@receiver(post_save,dispatch_uid='onInvoicePaidCreateTask', sender=Invoice)
def onInvoicePaidCreateTask(sender,created, instance, **kwargs):
    arrService=[]
    arrProd=[]
    userAccount=UserAccount.objects.filter(invoice=instance).first()
    if userAccount and instance.paid:
        user=User.objects.filter(id=userAccount.user.id).first()
        if user:
            taskTracker,created=TaskTracker.objects.get_or_create(user=user)
            if created:
                taskTracker.save()
            for service in userAccount.service.all():
                servTaskTracker,created1=ServiceTaskTracker.objects.get_or_create(
                    name=service.name,
                    user_id=user.id,
                    username=user.username,
                    Id=service.id,
                    task=False
                )
                if created1:
                    servTaskTracker.save()
                    arrService.append(servTaskTracker)
            for product in userAccount.product.all():
                prodTaskTracker,created2=ProductTaskTracker.objects.get_or_create(
                    name=product.name,
                    user_id=user.id,
                    username=user.username,
                    subTasks=','.join([obj.name for obj in product.services.all()]), 
                    Id=product.id,
                    task=False
                )
                if created2:
                    prodTaskTracker.save()
                    arrProd.append(prodTaskTracker)
            taskTracker.service.add(*arrService)
            taskTracker.product.add(*arrProd)
            taskTracker.save()

@receiver(post_save,dispatch_uid='onPostInvoicePaidCreateTask', sender=PostInvoice)
def onPostInvoicePaidCreateTask(sender,created, instance, **kwargs):
    arrPostServ=[]
    userAccount=UserAccount.objects.filter(invoice=instance).first()
    if userAccount and instance.paid:
        user=User.objects.filter(id=userAccount.user.id).first()
        if user:
            taskTracker,created=TaskTracker.objects.get_or_create(user=user)
            if created:
                taskTracker.save()
            for postService in userAccount.postService.all():
                postServTaskTracker,created1=PostServiceTaskTracker.objects.get_or_create(
                    name=postService.name,
                    user_id=user.id,
                    username=user.username,
                    Id=postService.id,
                    task=False
                )
                if created1:
                    postServTaskTracker.save()
                    arrPostServ.append(postServTaskTracker)
            taskTracker.postService.add(*arrPostServ)
            taskTracker.save()

@receiver(post_save,dispatch_uid='onExtraInvoicePaidCreateTask', sender=ExtraInvoice)
def onExtraInvoicePaidCreateTask(sender,created, instance, **kwargs):
    arrExtraServ=[]
    userAccount=UserAccount.objects.filter(invoice=instance).first()
    if userAccount and instance.paid:
        user=User.objects.filter(id=userAccount.user.id).first()
        if user:
            taskTracker,created=TaskTracker.objects.get_or_create(user=user)
            if created:
                taskTracker.save()
            for extraService in userAccount.extraService.all():
                extraServTaskTracker,created3=ExtraServiceTaskTracker.objects.get_or_create(
                    name=extraService.name,
                    user_id=user.id,
                    username=user.username,
                    Id=extraService.id,
                    task=False
                )
                if created3:
                    extraServTaskTracker.save()
                    arrExtraServ.append(extraServTaskTracker)
            taskTracker.extraService.add(*arrExtraServ)
            taskTracker.save()
            
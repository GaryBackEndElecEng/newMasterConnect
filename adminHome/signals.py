from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from my_account.models import PostService,Service,Price,Product,Price,PriceCatelog,UserAccount,Invoice,PostInvoice,ExtraInvoice,CreditInvoice,TempSavedCalculator
from .models import *
import math

@receiver(post_save,dispatch_uid='onInvoicePaidCreateTask', sender=Invoice)
def onInvoicePaidCreateTask(sender,created, instance, **kwargs):
    arrService=[]
    arrProd=[]
    userAccount=UserAccount.objects.filter(invoice=instance).first()
    if userAccount and instance.paid and userAccount.postAccountActivate==False:
        user=User.objects.filter(id=userAccount.user.id).first()
        taskTracker=TaskTracker.objects.filter(user=user).first()
        if user:
            if not taskTracker:
                taskTracker,created=TaskTracker.objects.get_or_create(user=user)
                if created:
                    taskTracker.save()
            for service in userAccount.service.all():
                servTaskTracker=ServiceTaskTracker.objects.filter(name=service.name,user_id=user.id,Id=service.id).first()
                if not servTaskTracker:
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
                prodTaskTracker=ProductTaskTracker.objects.filter(name=product.name,user_id=user.id,Id=product.id).first()
                if not prodTaskTracker:
                    testLenght=','.join([obj.name for obj in product.services.all()])
                    prodTaskTracker,created2=ProductTaskTracker.objects.get_or_create(
                        name=product.name,
                        user_id=user.id,
                        username=user.username,
                        subTasks=testLenght[0:180], 
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
    userAccount=UserAccount.objects.filter(postInvoice=instance).first()
    if userAccount and instance.paid and userAccount.postAccountActivate==True:
        user=User.objects.filter(id=userAccount.user.id).first()
        taskTracker=TaskTracker.objects.filter(user=user).first()
        if user:
            if not taskTracker:
                taskTracker,created=TaskTracker.objects.get_or_create(user=user)
                if created:
                    taskTracker.save()
            for postService in userAccount.postService.all():
                postServTaskTracker=PostServiceTaskTracker.objects.filter(name=postService.name,user_id=user.id,Id=postService.id).first()
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
    userAccount=UserAccount.objects.filter(extraInvoice=instance).first()
    if userAccount and instance.paid:
        user=User.objects.filter(id=userAccount.user.id).first()
        taskTracker=TaskTracker.objects.filter(user=user).first()
        if user:
            if not taskTracker:
                taskTracker,created=TaskTracker.objects.get_or_create(user=user)
                if created:
                    taskTracker.save()
            for extraService in userAccount.extraService.all():
                extraServTaskTracker=ExtraServiceTaskTracker.objects.filter(name=extraService.name,user_id=user.id,Id=extraService.id).first()
                if not extraServTaskTracker:
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

@receiver(post_save,dispatch_uid='onCreatedCreateDeleteTask', sender=CreditInvoice)
def onCreatedCreateDeleteTask(sender,created, instance, **kwargs):
    arrExtraServ=[]
    userAccount=UserAccount.objects.filter(credit=instance).first()
    if userAccount and instance.hasCredit == True and instance.update ==True:
        user=User.objects.filter(id=userAccount.user.id).first()
        taskTracker=TaskTracker.objects.filter(user=user).first()
        if user and taskTracker:
            for prodServsId in instance.prodsServs_id:
                prodTaskTracker=ProductTaskTracker.objects.filter(Id=prodServsId,user_id=user.id).first()
                postTaskTracker=PostServiceTaskTracker.objects.filter(Id=prodServsId,user_id=user.id).first()
                servTaskTracker=ServiceTaskTracker.objects.filter(Id=prodServsId,user_id=user.id).first()
                extraTaskTracker=ExtraServiceTaskTracker.objects.filter(Id=prodServsId,user_id=user.id).first()
                if prodTaskTracker:
                    taskTracker.product.remove(prodTaskTracker)
                    prodTaskTracker.delete()
                if postTaskTracker:
                    taskTracker.postService.remove(postTaskTracker)
                    postTaskTracker.delete()
                if servTaskTracker:
                    taskTracker.service.remove(servTaskTracker)
                    servTaskTracker.delete()
                if extraTaskTracker:
                    taskTracker.extraService.remove(extraTaskTracker)
                    extraTaskTracker.delete()
            taskTracker.save()
            instance.yesUpdated=True
            instance.update=False
            instance.save()


@receiver(post_save,dispatch_uid='adminCleanCompletedTasks', sender=UpDateItems)
def adminCleanCompletedTasks(sender,created,instance,**kwargs):
    if instance.name=="tasks" and instance.update==True and instance.Updated==False:
        for prodTask in ProductTaskTracker.objects.all():
            if prodTask.task==True:
                prodTask.delete()
        for servtask in ServiceTaskTracker.objects.all():
            if servtask.task==True:
                servtask.delete()
        for postServTask in PostServiceTaskTracker.objects.all():
            if postServTask.task==True:
                postServTask.delete()
        for extraServTask in ExtraServiceTaskTracker.objects.all():
            if extraServTask.task==True:
                extraServTask.delete()
        instance.Updated=True
        instance.update=False
        instance.save()

@receiver(post_save,dispatch_uid="updateAllPaidInvoices",sender=UpDateItems)
def updateAllPaidInvoices(sender,created,instance,**kwargs):
    if instance.name=="updateSumInvoice" and instance.update==True and instance.Updated==False:
        for invoice in Invoice.objects.all():
            if invoice.paid ==True:
                sumInvoice,created=SumInvoice.objects.get_or_create(
                name=invoice.name,
                fedTax=invoice.tax.fed,
                provtax=invoice.tax.provState
                )
                if created:
                    sumInvoice.allSubTotal+=invoice.subTotal
                    sumInvoice.allSubMonthly+=invoice.subTotalMonthly
                    sumInvoice.allTotal=invoice.total
                    sumInvoice.allMonthly=invoice.totalMonthly
                    sumInvoice.allDateEnd.append(invoice.dateEnd)
                    sumInvoice.allPriceID.append(invoice.priceID)
                    sumInvoice.save()
        for postInvoice in PostInvoice.objects.all():
            if postInvoice.paid ==True:
                sumInvoice,created1=SumInvoice.objects.get_or_create(
                name=postInvoice.name,
                fedTax=postInvoice.tax.fed,
                provtax=postInvoice.tax.provState
                )
                if created1:
                    sumInvoice.save()
                if len(sumInvoice.allDateEnd)<2:
                    sumInvoice.allSubTotal+=postInvoice.subTotal
                    sumInvoice.allSubMonthly+=postInvoice.subTotalMonthly
                    sumInvoice.allTotal+=postInvoice.total
                    sumInvoice.allMonthly+=postInvoice.totalMonthly
                    sumInvoice.allDateEnd.append(postInvoice.dateEnd)
                    sumInvoice.allPriceID.append(postInvoice.priceID)
                    sumInvoice.save()
        for extraInvoice in ExtraInvoice.objects.all():
            if extraInvoice.paid ==True:
                sumInvoice,created2=SumInvoice.objects.get_or_create(
                name=extraInvoice.name,
                fedTax=extraInvoice.tax.fed,
                provtax=extraInvoice.tax.provState
                )
                if created2:
                    sumInvoice.save()
                if len(sumInvoice.allDateEnd)<3:
                    sumInvoice.allSubTotal+=extraInvoice.subTotal
                    sumInvoice.allSubMonthly+=extraInvoice.subTotalMonthly
                    sumInvoice.allTotal+=extraInvoice.total
                    sumInvoice.allMonthly+=extraInvoice.totalMonthly
                    sumInvoice.allDateEnd.append(extraInvoice.dateEnd)
                    sumInvoice.allPriceID.append(extraInvoice.priceID)
                    sumInvoice.save()
        instance.update=False
        instance.Updated=True
        instance.save()

@receiver(post_save,dispatch_uid="cleanTempSavedCalculator",sender=UpDateItems)
def cleanTempSavedCalculator(sender,created,instance,**kwargs):
    if instance.name=="cleanTempCalculator" and instance.update==True and instance.Updated==False:
        occupiedUUID=[obj.calcUUID for obj in UserAccount.objects.all()]
        # print(occupiedUUID)
        for checkTempCalc in TempSavedCalculator.objects.all():
            # print(type(checkTempCalc.uuid))
            if str(checkTempCalc.uuid) not in occupiedUUID:
                checkTempCalc.delete()
        instance.Updated=True
        instance.update=False
        instance.save()





            
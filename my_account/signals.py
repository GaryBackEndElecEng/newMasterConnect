from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.conf import settings
from .models import UserAccount
import math
from django.http import Http404
from django.core.mail import EmailMultiAlternatives,BadHeaderError
from django.template.loader import render_to_string
# you CAN"T SAVE THE SAME MODEL TABLE ASSIGNED BY THE SENDER BECAUSE IT TRIGGERS THE POST_SAVE THAT SAVES THE MODEL, THEN THE SAVE() TRIGGERS THE POST SAVE=> RECURSIVE
#CREATING TWO PRICE RECS BASED ON LOWEST PRICE/MONTHLY IN SERVICE AND PRODUCT
@receiver(post_save,dispatch_uid='createOnpostAccountActivate', sender=UserAccount)
def createOnpostAccountActivate(instance,created,*args,**kwargs):
    if instance.postAccountActivate and instance.postActivateEmailSent==False:
            generateReadyToPublish(instance.user,instance.id)
    if instance.publishComplete and instance.publishEmailSent==False:
            sendPublishCompleteEmail(instance.user.id,instance.id)
            
        

    
def generateReadyToPublish(userObj,userAccountId):
    userAccount=UserAccount.objects.get(id=userAccountId)
    userAccount.postActivateEmailSent=True
    userAccount.save()
    website=" no previous website"
    postServArr=[]
    isCalculator=False
    user=User.objects.get(id=userObj.id)
    from_email=settings.EMAIL_HOST_USER
    to_email=[user.email,]
    subject="READY TO PUBLISH!"
    cell=userAccount.cell
    if "www" in userAccount.website or (".ca" or ".com") in userAccount.website:
        website=userAccount.website
    if userAccount.postService.all() and userAccount.calcUUID:
        postServArr=[obj.name for obj in userAccount.postService.all()]
        isCalculator=True
    context={
        "username":user.username,
        "name":userAccount.name,
        "website": website,
        "email":userAccount.email,
        "cell":cell,
        "address":f'{userAccount.address}',
        "address2":f'{userAccount.country},{userAccount.provState},{userAccount.postal}',
        "products":[obj.name for obj in userAccount.product.all()],
        "services":[obj.name for obj in userAccount.service.all()],
        "isCalculator":isCalculator,
        "postService":postServArr

    }

    try:
        html_content= render_to_string('publishNotice.html',context)
        msg= EmailMultiAlternatives(subject,html_content, from_email,to_email,bcc=['masterconnect919@gmail.com',])
        msg.attach_alternative(html_content,"text/html")
        msg.content_subtype='html'
        msg.send()
    except BadHeaderError as e:
        return e
    return "done"


def sendPublishCompleteEmail(user_id,userAccountId):
    context={}
    subject="PUBLISHING COMPLETE - MASTER-CONNECT"
    from_email=settings.EMAIL_HOST_USER
    userAccount=None
    user=User.objects.filter(id=user_id).first()
    userAccount=UserAccount.objects.filter(id=userAccountId).first()
    if userAccount:
        userAccount.publishEmailSent=True
        userAccount.save()
        userServiceNames=[obj.name for obj in userAccount.service.all()]
        userProductNames=[obj.name for obj in userAccount.product.all()]
        userPostServiceNames=[obj.name for obj in userAccount.postService.all()]
        userExtraServiceNames=[obj.name for obj in userAccount.extraService.all()]
        totalNames =userServiceNames + userProductNames + userPostServiceNames + userExtraServiceNames
        to_email=[user.email,]
        bcc=['masterconnect919@gmail.com']
        # from_email=settings.EMAIL_HOST_USER
        context={"name":userAccount.name,
                "username":user.username,
                "address":userAccount.address,
                "address2":f'{userAccount.provState}, {userAccount.country}, {userAccount.postal}',
                "email":user.email,
                "cell":userAccount.cell,
                "new_website":userAccount.newWebsite,
                "website":userAccount.website,
                "extraSession_id":userAccount.extraSessionID,
                "session_id":userAccount.sessionID,
                "postSession_id":userAccount.postSessionID,
                "taskNames":totalNames,
                
                }

        try:
            html_content= render_to_string('publishComplete.html',context)
            msg= EmailMultiAlternatives(subject,html_content, from_email,to_email,bcc)
            msg.attach_alternative(html_content,"text/html")
            msg.content_subtype='html'
            msg.send()
        except BadHeaderError as e:
            return e
        return "done"
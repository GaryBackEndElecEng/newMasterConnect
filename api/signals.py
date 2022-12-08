from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.conf import settings
from .models import *
import math
from django.http import Http404
from django.core.mail import EmailMultiAlternatives,BadHeaderError
from django.template.loader import render_to_string
# you CAN"T SAVE THE SAME MODEL TABLE ASSIGNED BY THE SENDER BECAUSE IT TRIGGERS THE POST_SAVE THAT SAVES THE MODEL, THEN THE SAVE() TRIGGERS THE POST SAVE=> RECURSIVE
#CREATING TWO PRICE RECS BASED ON LOWEST PRICE/MONTHLY IN SERVICE AND PRODUCT
#FAQS=>(question,category(foriegnkey(Category)=>exampl=faq.category(sameid)),answer)
@receiver(post_save,dispatch_uid='sendEmailToQuoter', sender=Quote)
def sendEmailToQuoter(instance,created,*args,**kwargs):
    if instance.sendThemEmail==True and instance.emailSent==False:
        sendQuoterEmail(instance)
        
        


def sendQuoterEmail(instance):
    getQuote=Quote.objects.get(id=instance.id)
    from_email=settings.EMAIL_HOST_USER
    to_email=[instance.email,]
    subject="MASTER-CONNECT QUOTE RESPONSE"
    context={
        "first_name":instance.fullName.split(" ")[0],
        "last_name":instance.fullName.split(" ")[1],
        "name":instance.fullName,
        "company": instance.coName,
        "email":instance.email,
        "coSite":instance.coSite,
        "question":instance.content,
        "answer":instance.answer

    }

    try:
        getQuote.emailSent=True
        getQuote.save()
        html_content= render_to_string('toQuoter.html',context)
        msg= EmailMultiAlternatives(subject,html_content, from_email,to_email,bcc=['masterconnect919@gmail.com',])
        msg.attach_alternative(html_content,"text/html")
        msg.content_subtype='html'
        msg.send()
    except BadHeaderError as e:
        return e
    return "done"

@receiver(post_save,dispatch_uid='sendEmailToFAQ', sender=Quote)
def sendEmailToFAQ(instance,created,*args,**kwargs):
    if instance.sendToFAQ==True and instance.FAQYes==True:
        firstFAQ=FAQS.objects.first()
        category=firstFAQ.category
        newFAQ=FAQS(
            question=instance.content,
            category=category,
            answer=instance.answer
            )
        newFAQ.save()


@receiver(post_save,dispatch_uid='sendEmailToRequester', sender=Request)
def sendEmailToRequester(instance,created,*args,**kwargs):
    if instance.sendEmail==True and instance.emailSent==False:
        sendRequesterEmail(instance)
    if instance.sendToFAQS==True and instance.FAQS_sent==False:
        sendRequestToFAQ(instance)



def sendRequesterEmail(instance):
    getRequest=Request.objects.get(id=instance.id)
    from_email=settings.EMAIL_HOST_USER
    to_email=[instance.email,]
    subject="MASTER-CONNECT REQUEST RESPONSE"
    context={
        "first_name":instance.fullName.split(" ")[0],
        "last_name":instance.fullName.split(" ")[1],
        "email":instance.email,
        "name":instance.fullName,
        "question":instance.content,
        "answer":instance.ans

    }

    try:
        getRequest.sendEmail=False
        getRequest.emailSent=True
        getRequest.save()
        html_content= render_to_string('toRequester.html',context)
        msg= EmailMultiAlternatives(subject,html_content, from_email,to_email,cc=['masterconnect919@gmail.com',])
        msg.attach_alternative(html_content,"text/html")
        msg.content_subtype='html'
        msg.send()
    except BadHeaderError as e:
        return e
    return "done"


def sendRequestToFAQ(instance):
    firstFAQ=FAQS.objects.first()
    request=Request.objects.get(id=instance.id)
    category=firstFAQ.category
    newFAQ=FAQS(
        question=instance.content,
        category=category,
        answer=instance.ans
        )
    newFAQ.save()
    request.FAQS_sent=True
    request.sendToFAQS=False
    request.save()
from my_account.models import Product,Service,UserAccount,Invoice,PostInvoice,ExtraInvoice
from .models import Quote
from django.contrib.auth.models import User,Group
import stripe
from django.conf import settings
from datetime import datetime,timedelta,date
import json
import math
from django.http import Http404
from django.core.mail import EmailMultiAlternatives,BadHeaderError
from django.template.loader import render_to_string


def sendAlertEmail(user_id,type):
    context={}
    userAccount=None
    user=User.objects.filter(id=user_id).first()
    userAccount=UserAccount.objects.filter(user=user).first()
    if userAccount and type=="first":
        invoice=Invoice.objects.filter(id=userAccount.invoice.id).first()
        if invoice:
            if invoice.numPayment ==1:
                context={"total":invoice.total,"subTotal":invoice.subTotal,"name":invoice.name,"sessionID":userAccount.sessionID,"flag":"paid","cell":userAccount.cell,"address":userAccount.address,"country":userAccount.country,"provState":userAccount.provState}
            elif invoice.numPayment > 1:
                context={"total":invoice.totalMonthly,"subTotal":invoice.subTotalMonthly,"name":invoice.name,"sessionID":userAccount.sessionID,"endDate":invoice.endDate,"flag":"monthlyPaid","cell":userAccount.cell,"address":userAccount.address,"country":userAccount.country,"provState":userAccount.provState}
    if userAccount and userAccount.postInvoice and type=="second":
        invoice=PostInvoice.objects.filter(id=userAccount.postInvoice.id).first()
        if invoice:
            context={"total":invoice.totalMonthly,"subTotal":invoice.subTotalMonthly,"name":invoice.name,"sessionID":userAccount.sessionID,"flag":"postPaid","cell":userAccount.cell,"address":userAccount.address,"country":userAccount.country,"provState":userAccount.provState}

    from_email=settings.EMAIL_HOST_USER
    subject="Alert"
    to_email=[user.email,]
    to_email.append('masterconnect919@gmail.com')
    # from_email=settings.EMAIL_HOST_USER
    
    try:
        html_content= render_to_string('purchase.html',context)
        msg= EmailMultiAlternatives(subject,html_content, from_email,to_email)
        msg.attach_alternative(html_content,"text/html")
        msg.content_subtype='html'
        msg.send()
    except BadHeaderError as e:
        return e
    return "done"


def sendConsultEmail(user_id):
    context={}
    subject="CONSULT REQUEST FROM A CLIENT"
    from_email=settings.EMAIL_HOST_USER
    userAccount=None
    user=User.objects.filter(id=user_id).first()
    userAccount=UserAccount.objects.filter(user=user).first()
    options=userAccount.options
    if userAccount:
        to_email=[user.email,]
        to_email.append('masterconnect919@gmail.com')
        # from_email=settings.EMAIL_HOST_USER
        context={"name":userAccount.name,
                "email":userAccount.email,
                "cell":userAccount.cell,
                "consult":"client sent an email, requesting a consult",
                "question1":options.question1,
                "question2":options.question2,
                "question3":options.question3,
                "question4":options.question4,
                "products":[obj.name for obj in userAccount.product.all()],
                "services":[obj.name for obj in userAccount.service.all()],
                "address":userAccount.address + "," + userAccount.provState + "," + userAccount.country,
                "subTotal":sum([obj.price for obj in userAccount.product.all()]) + sum([obj.price for obj in userAccount.service.all()])
                }
    
    try:
        html_content= render_to_string('consultEmail.html',context)
        msg= EmailMultiAlternatives(subject,html_content, from_email,to_email)
        msg.attach_alternative(html_content,"text/html")
        msg.content_subtype='html'
        msg.send()
    except BadHeaderError as e:
        return e
    return "done"

def sendQuoteEmail(fullName):
    context={}
    subject="REQUEST A QUOTE - MASTER-CONNECT"
    from_email=settings.EMAIL_HOST_USER
    userAccount=None
    quote=Quote.objects.filter(fullName=fullName).last()

    if quote:
        to_email=[quote.email,]
        to_email.append('masterconnect919@gmail.com')
        # from_email=settings.EMAIL_HOST_USER
        context={"name":quote.fullName,
                "email":quote.email,
                "cell":quote.cell,
                "company":quote.coName,
                "site":quote.coSite,
                "content":quote.content,
                }

    try:
        html_content= render_to_string('sendQuote.html',context)
        msg= EmailMultiAlternatives(subject,html_content, from_email,to_email)
        msg.attach_alternative(html_content,"text/html")
        msg.content_subtype='html'
        msg.send()
    except BadHeaderError as e:
        return e
    return "done"


def sendExtraEmail(user_id):
    context={}
    subject="EXTRA PURCHASE - MASTER-CONNECT"
    from_email=settings.EMAIL_HOST_USER
    userAccount=None
    user=User.objects.filter(id=user_id).first()
    userAccount=UserAccount.objects.filter(user=user).first()
    extraInvoice=ExtraInvoice.objects.filter(id=userAccount.extraInvoice.id).first()

    if userAccount:
        to_email=[user.email,]
        to_email.append('masterconnect919@gmail.com')
        # from_email=settings.EMAIL_HOST_USER
        context={"name":userAccount.name,
                "email":userAccount.email,
                "cell":userAccount.cell,
                "session_id":userAccount.extraSessionID,
                "priceID":extraInvoice.priceID,
                "services":[obj.name for obj in userAccount.extraService.all()],
                "address":userAccount.address + "," + userAccount.provState + "," + userAccount.country,
                "subTotal":extraInvoice.subTotalMonthly,
                "total":extraInvoice.totalMonthly,
                "endDate":extraInvoice.dateEnd
                }

    try:
        html_content= render_to_string('extraEmail.html',context)
        msg= EmailMultiAlternatives(subject,html_content, from_email,to_email)
        msg.attach_alternative(html_content,"text/html")
        msg.content_subtype='html'
        msg.send()
    except BadHeaderError as e:
        return e
    return "done"
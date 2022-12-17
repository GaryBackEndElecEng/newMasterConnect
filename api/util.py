from my_account.models import UserAccount,Invoice,PostInvoice,ExtraInvoice,ServiceDependancy
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
    missedProdsServs=""
    userAccount=None
    user=User.objects.filter(id=user_id).first()
    userAccount=UserAccount.objects.filter(user=user).first()
    checkMissedServProds=ServiceEvaluator(user_id).returnMissedProdsServs()
    if len(checkMissedServProds)>0:
        missedProdsServs="missed service"
    if userAccount and type=="first":
        invoice=Invoice.objects.filter(id=userAccount.invoice.id).first()
        if invoice:
            if invoice.numPayment ==1:
                context={"total":invoice.total,"subTotal":invoice.subTotal,"name":invoice.name,"sessionID":userAccount.sessionID,"flag":"paid","cell":userAccount.cell,"address":userAccount.address,"country":userAccount.country,"provState":userAccount.provState,
                "missedProdsServs":missedProdsServs,"checkMissedServProds":checkMissedServProds
                }
            elif invoice.numPayment > 1:
                context={"total":invoice.totalMonthly,"subTotal":invoice.subTotalMonthly,"name":invoice.name,"sessionID":userAccount.sessionID,"endDate":invoice.endDate,"flag":"monthlyPaid","cell":userAccount.cell,"address":userAccount.address,"country":userAccount.country,"provState":userAccount.provState,
                "missedProdsServs":missedProdsServs,"checkMissedServProds":checkMissedServProds
                }
    if userAccount and userAccount.postInvoice and type=="second":
        invoice=PostInvoice.objects.filter(id=userAccount.postInvoice.id).first()
        if invoice:
            context={"total":invoice.totalMonthly,"subTotal":invoice.subTotalMonthly,"name":invoice.name,"sessionID":userAccount.sessionID,"flag":"postPaid","cell":userAccount.cell,"address":userAccount.address,"country":userAccount.country,"provState":userAccount.provState,
            "missedProdsServs":missedProdsServs,"checkMissedServProds":checkMissedServProds
            }

    from_email=settings.EMAIL_HOST_USER
    subject="CONFIRMATION"
    to_email=[user.email,]
    # from_email=settings.EMAIL_HOST_USER
    
    try:
        html_content= render_to_string('purchase.html',context)
        msg= EmailMultiAlternatives(subject,html_content, from_email,to_email,bcc=['masterconnect919@gmail.com',])
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
        msg= EmailMultiAlternatives(subject,html_content, from_email,to_email,bcc=['masterconnect919@gmail.com',])
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
        msg= EmailMultiAlternatives(subject,html_content, from_email,to_email,bcc=['masterconnect919@gmail.com',])
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
        msg= EmailMultiAlternatives(subject,html_content, from_email,to_email,bcc=['masterconnect919@gmail.com',])
        msg.attach_alternative(html_content,"text/html")
        msg.content_subtype='html'
        msg.send()
    except BadHeaderError as e:
        return e
    return "done"

# OBJECTIVE IS TO FINDOUT WHAT SERVICE WAS NOT SELECTED IN USERACCOUNT BASED ON ServiceDependancy
class ServiceEvaluator:
    def __init__(self,user_id):
        self.user_id=user_id
        user=User.objects.get(id=self.user_id)
        self.userAccount=UserAccount.objects.filter(user=user).first()

    def missedService(self):
        missedServiceArr=[]
        if self.userAccount:
            for service in self.userAccount.service.all():
                serviceDepend=ServiceDependancy.objects.filter(category=service).first()
                if serviceDepend:
                    for serv in serviceDepend.services.all():
                        if serv not in self.userAccount.service.all():
                            missedServiceArr.append(serv.name)
        return missedServiceArr

    def missedPostService(self):
        missedPostServiceArr=[]
        if self.userAccount:
            for postService in self.userAccount.postService.all():
                serviceDepend=ServiceDependancy.objects.filter(category=postService).first()
                if serviceDepend:
                    for postServ in serviceDepend.postServices.all():
                        if postServ not in self.userAccount.postService.all():
                            missedPostServiceArr.append(postServ.name)
        return missedPostServiceArr

    def missedProduct(self):
        missedProductArr=[]
        if self.userAccount:
            for product in self.userAccount.product.all():
                serviceDepend=ServiceDependancy.objects.filter(category=product).first()
                if serviceDepend:
                    for prod in serviceDepend.products.all():
                        if prod not in self.userAccount.product.all():
                            missedProductArr.append(prod.name)
        return missedProductArr

    def returnMissedProdsServs(self):
        missedArr=[]
        if self.missedProduct():
            missedArr += self.missedProduct()
        if self.missedPostService():
            missedArr += self.missedPostService()
        if self.missedService():
            missedArr += self.missedService()
        return missedArr
                           
# print(ServiceEvaluator(40).returnMissedProdsServs())


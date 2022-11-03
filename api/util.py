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


#CALCULATING ESTIMATE FROM CALCULATOR

"""
1.) ( Service => Filing System Integration =>)-
If you ansered, yes to a filing system, do you want the filing system to be secure and priveldged?
2.) (Product to vender integration)=> 
If you are selling products on the internet, what company or companies do you use?
3.) ( Time factor weight Rate.CDN_Usage)=>
When registering for a domain, there are two ways, you can achieve this.If you have already a domain, do you know who registered your domain.
4.)( Service Static File Extraction)=>
If you have a CDN, do you want to use it in your new site?
5.) Do you have an existing site?, if yes, then please enter it below
6.)( Service => Static Storage extraction)=>
This determines, the level of difficulty for file extraction. if you do have a CDN, please type your CDN.
7.)What industry are you in?
8.)( service=> database migration => weight to size=>)-
if you do have a database, to the previous question, then what is your database size?
9.) ( Service=> Psql integration, verse SQL integration=>)-
If you have a database, to the previous yes/no question, then what type of database do you have?
10.) ( Service => frontEnd / Backend Design=>)-
Hits are people going to your site and ultilizing resources.How many hits on the site do you forcast- just a number?
11.)(database Migrations=>)-
Do you have an existing database that needs records transferred?
12) ( Service DNS registration=>)-
Are you registering a new domain?
13.)( Service image extraction + image creation=> )=> 
Would you like us to handle finding/creating images for you that matches your target audience, inclusive to the above?
14.)( Service => Static Storage extraction )-
Cloud structures, on the internet are heavily dependant on CDNs for static storage. Given, this, do you have a CDN?
15.)( Service JWT + Service login session + service account creation =>)-
 A company or resource base typically need central access to secure files, both for your staff and clients.Do you require a filing system?
16.)( Service =>)-
 Do you want professional image creation or you don't care-meaning no?
17.) ( Service =>)-
 Dynamic SEO registration is simply adding and or refreshing your information so that Google and others will crawl your site more often, improving site ranking.Do you want dynamic SEO registration with your site?
18.) ( Service => SEO Services)-
 SEO( Search Engine Optimization) is like a librarian to a library, except, its Google, Fir-Fox, Yahoo, etc the librarians. Do you have resources to deal with the SEO or do you want SEO so that your site will be discovered on the internet?
19.)( requesting cookie acceptance,etc)
The internet is made up of regions that covers the world.If you are selling, are you going to be selling all throughout North America and or the world?
20.)( instruction sets, complicated products)-
If this is for a company? and is the company in the high-tech business?
21.)( session verse JWT)-
There is an easy way and a hard way to secure a site.Do you want a secure site?
22.)( database )-
 Do you want clients to register,have records;such as call records,emails,name,etc,,?
23.)(database, or one Product sell) -
 Would you like to sell products over the internet?
24.)(Professional or hobby)-
 Is this for a company?
25.) ( finacial )-
 If you are selling products on the internet and not part of Shopify and or Amazon, then what financial institution you are with.
"""

#pop ans=> array,2.) Manto-many=> to Service,Post and extra Services.,Then generate monthly cost minum  and 1.62* amount.
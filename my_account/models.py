from django.db import models
from django.contrib.auth.models import User, Group
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from datetime import datetime,date
from django.contrib.postgres.fields import ArrayField
import uuid,math
from django.db.models.signals import post_save
from api.models import Region
from django.utils import timezone
from datetime import datetime,date

TYPE=(("pageDesign","pageDesign"),("subDesign","subDesign"),("pageTemplate","pageTemplate"),("subTemplate","subTemplate"),("nonDesign","nonDesign"),("subNonDesign","subNonDesign"),("video","video"))
CATEGORY=(("aboutPage","aboutPage"),("contactPage","contactPage"),("footer","footer"),("navBar","navBar"),("detailPage","detailPage"),("blogPage","blogPage"),("frontPage","frontPage"),("articlePage","articlePage"),("sidebar","sidebar"),("signin","signin"),("registration","registration"),("checkout","checkout"),("userAccount","userAccount"),("customFrontPage","customFrontPage"),("changeEmailPage","changeEmailPage"),("changePasswordPage","changePasswordPage"),("internetSales","internetSales"),("SEO","SEO"),("fileSystem","fileSystem"),("video","video"))

class PriceCatelog(models.Model):
    name=models.CharField(max_length=100,blank=True,null=True)
    subCategory=models.CharField(max_length=100,blank=True,null=True)

    def __str__(self):
        return self.name


class Price(models.Model):
    name=models.CharField(max_length=100,blank=True,null=True)
    priceCatelog=models.ManyToManyField(PriceCatelog,related_name="price",blank=True)
    price=models.IntegerField(blank=True,default=1)
    monthly=models.IntegerField(default=1,blank=True)
    desc=models.TextField(blank=True)
    summary=models.TextField(blank=True)
    class Meta:
        ordering=["name"]

    def __str__(self):
        return f'{self.name}'

class Service(models.Model):
    name=models.CharField(max_length=150,blank=True)
    priceCatelog=models.ManyToManyField(PriceCatelog,related_name="service",blank=True)
    price=models.IntegerField(blank=True)
    monthly=models.IntegerField(blank=True,default=1)
    summary=models.TextField(blank=True,null=True)
    desc=models.TextField(blank=True)
    image=models.CharField(max_length=100,null=True,blank=True)
    class Meta:
        ordering=["name"]
    def __str__(self):
        return f'{self.name}'

class PostService(models.Model):
    name=models.CharField(max_length=150,blank=True)
    priceCatelog=models.ManyToManyField(PriceCatelog,related_name="postService",blank=True)
    services=models.ManyToManyField(Service,related_name="dependantServices",blank=True)
    price=models.IntegerField(blank=True)
    monthly=models.IntegerField(blank=True,default=1)
    summary=models.TextField(blank=True,null=True)
    desc=models.TextField(blank=True)
    image=models.CharField(max_length=100,null=True,blank=True)
    class Meta:
        ordering=["name"]
    def __str__(self):
        return f'{self.name}'

class ExtraService(models.Model):
    name=models.CharField(max_length=150,blank=True)
    priceCatelog=models.ManyToManyField(PriceCatelog,related_name="extraService",blank=True)
    price=models.IntegerField(blank=True)
    monthly=models.IntegerField(blank=True,default=1)
    summary=models.TextField(blank=True,null=True)
    desc=models.TextField(blank=True)
    image=models.CharField(max_length=100,null=True,blank=True)
    class Meta:
        ordering=["name"]
    def __str__(self):
        return self.name

class Product(models.Model):
    name=models.CharField(max_length=150,blank=True)
    type=models.CharField(max_length=50,choices=TYPE,default="pageDesign")
    category=models.CharField(max_length=50,choices=CATEGORY,default="frontPage")
    price=models.IntegerField(blank=True)
    summary=models.TextField(blank=True,null=True)
    desc=models.TextField(blank=True)
    monthly=models.IntegerField(blank=True,default=1)
    savings=models.IntegerField(blank=True,default=1)
    extra_kwargs=models.CharField(max_length=300,default="not assigned",blank=True)
    priceCatelog=models.ManyToManyField(PriceCatelog,related_name="product",blank=True)
    imageName=models.CharField(max_length=150,blank=True)
    frontCover=models.CharField(max_length=150,blank=True)
    postServices=models.ManyToManyField(PostService,blank=True)
    services=models.ManyToManyField(Service,blank=True)
    extraServices=models.ManyToManyField(ExtraService,blank=True)
    update=models.BooleanField(default=False)
    updated=models.BooleanField(default=False)
    class Meta:
        ordering=['name']

    def __str__(self):
        return f'{self.name}-{self.category}-updated:{self.updated}'

class ServiceDependancy(models.Model):
    category=models.CharField(max_length=70,blank=True,null=True)
    desc=models.TextField(blank=True)
    products=models.ManyToManyField(Product,blank=True)
    services=models.ManyToManyField(Service,blank=True)
    postServices=models.ManyToManyField(PostService,blank=True)
    extraServices=models.ManyToManyField(ExtraService,blank=True)
    compare=models.BooleanField(default=False)

    def __str__(self):
        return self.category


class Package(models.Model):
    name=models.CharField(max_length=150,blank=True)
    price=models.IntegerField(blank=True)
    summary=models.TextField(blank=True,null=True)
    desc=models.TextField(blank=True)
    monthly=models.IntegerField(blank=True,default=1)
    reducePerc=models.IntegerField(blank=True,null=True)
    savings=models.IntegerField(blank=True,null=True)
    products=models.ManyToManyField(Product,blank=True)
    postServices=models.ManyToManyField(PostService,blank=True)
    services=models.ManyToManyField(Service,blank=True)
    priceCatelog=models.ForeignKey(PriceCatelog,related_name="packages",on_delete=models.CASCADE,default=1)
    specialOffer=models.BooleanField(default=False)
    updateValue=models.BooleanField(default=False)
    image=models.CharField(max_length=50,blank=True,null=True)
    class Meta:
        ordering=['name']

    def __str__(self):
        return f'{self.name}-{self.monthly}-{self.specialOffer}'

# def createPriceMonthlyDesc(instance,created,*args,**kwargs):
#     getPackage=Package.objects.filter(id=instance.id).first()
#     if created and getPackage:
# post_save.connect(createPriceMonthlyDesc,sender=Package)

COUNTRY=(("",""),("CAN","CAN"),("US","US"),("EU","EU"),)
def country():
    innerTuple=()
    outerTuple=()
    outerArr=[]
    regions=Region.objects.all()
    for i,cnt in enumerate(regions):
        if i >1 and regions[i].country != regions[i-1].country:
            # print(cnt.country)
            innerTuple=(cnt.country,cnt.country)
            outerArr.append(innerTuple)
        elif i==0:
            innerTuple=(regions[i].country,regions[i].country)
            outerArr.append(innerTuple)

    return tuple(outerArr)

def region():
    innerTuple=()
    outerTuple=()
    outerArr=[]
    for cnt in Region.objects.all():
        innerTuple=(cnt.provState,cnt.provState)
        outerArr.append(innerTuple)
    return tuple(outerArr)

COUNTRY=(("CA","CA"),("US","US"))
REGION=(("QC","QC"),("ON","ON"))

class Tax(models.Model):
    country=models.CharField(max_length=100,choices=COUNTRY,blank=True,null=True)
    subRegion=models.CharField(max_length=100,choices=REGION,blank=True,null=True)
    fed=models.IntegerField(default=13)
    provState = models.IntegerField(default=15)
    class Meta:
        unique_together=["country","subRegion"]
        ordering=["country"]

    def __str__(self):
        return f'{self.country}-{self.subRegion}'

class Option(models.Model):
    name=models.CharField(max_length=100,blank=True)
    question1=models.TextField(blank=True)
    question2=models.TextField(blank=True)
    question3=models.TextField(blank=True)
    question4=models.TextField(blank=True)

    def __str__(self):
        return self.name

class SitePreference(models.Model):
    name=models.CharField(max_length=50,blank=True)
    site=models.CharField(max_length=100,blank=True)
    q1=models.CharField(max_length=100,blank=True)
    ans1=models.TextField(blank=True)
    q2=models.CharField(max_length=100,blank=True)
    ans2=models.TextField(blank=True)
    q3=models.CharField(max_length=100,blank=True)
    ans3=models.TextField(blank=True)

    def __str__(self):
        return self.name

class UUIModel(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)

class Invoice(models.Model):
    uuid=models.UUIDField(primary_key=False,default=uuid.uuid4,editable=False)
    name=models.CharField(max_length=200,blank=True)
    region=models.CharField(max_length=50,blank=True)
    tax=models.ForeignKey(Tax,on_delete=models.CASCADE,blank=True)
    subTotal = models.IntegerField(blank=True,default=0)
    total = models.IntegerField(blank=True,default=0)
    subTotalMonthly = models.IntegerField(blank=True,default=0)
    totalMonthly = models.IntegerField(blank=True,default=0)
    monthlyArray=ArrayField(models.IntegerField(blank=True),default=list)
    numPayment= models.IntegerField(blank=True,null=True)
    endDate=models.DateTimeField(default=datetime.now)
    consult = models.BooleanField(default=False)
    sendingForPayment = models.BooleanField(default=False)
    priceID=models.CharField(max_length=150,blank=True,null=True)
    paid=models.BooleanField(default=False)
    savings=models.IntegerField(blank=True,default=1)
    dateStart=models.DateTimeField(default=timezone.now)
    dateEnd=models.DateTimeField(default=timezone.now,blank=True)
    
    def __str__(self):
        return self.name

class PostInvoice(models.Model):
    uuid=models.UUIDField(primary_key=False,default=uuid.uuid4,editable=False)
    name=models.CharField(max_length=200,blank=True)
    tax=models.ForeignKey(Tax,on_delete=models.CASCADE,blank=True,null=True)
    subTotal = models.IntegerField(blank=True,default=0)
    total = models.IntegerField(blank=True,default=0)
    subTotalMonthly = models.IntegerField(blank=True,default=0)
    totalMonthly = models.IntegerField(blank=True,default=0)
    numPayment= models.IntegerField(blank=True,default=60)
    sendingForPayment = models.BooleanField(default=False)
    priceID=models.CharField(max_length=150,blank=True,null=True)
    paid=models.BooleanField(default=False)
    dateStart=models.DateTimeField(default=timezone.now)
    dateEnd=models.DateTimeField(default=timezone.now,blank=True)
    
    def __str__(self):
        return self.name

class ExtraInvoice(models.Model):
    uuid=models.UUIDField(primary_key=False,default=uuid.uuid4,editable=False)
    name=models.CharField(max_length=200,blank=True)
    tax=models.ForeignKey(Tax,on_delete=models.CASCADE,blank=True,null=True)
    subTotal = models.IntegerField(blank=True,default=0)
    total = models.IntegerField(blank=True,default=0)
    subTotalMonthly = models.IntegerField(blank=True,default=0)
    totalMonthly = models.IntegerField(blank=True,default=0)
    numPayment= models.IntegerField(default=60,blank=True)
    sendingForPayment = models.BooleanField(default=False)
    priceID=models.CharField(max_length=150,blank=True,null=True)
    paid=models.BooleanField(default=False)
    dateStart=models.DateTimeField(default=timezone.now)
    dateEnd=models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.name

class CreditInvoice(models.Model):
    uuid=models.UUIDField(primary_key=False,default=uuid.uuid4,editable=False)
    name=models.CharField(max_length=200,blank=True)
    tax=models.ForeignKey(Tax,on_delete=models.CASCADE,blank=True,null=True)
    subTotal = models.IntegerField(blank=True,default=0)
    total = models.IntegerField(blank=True,default=0)
    subTotalMonthly = models.IntegerField(blank=True,default=0)
    totalMonthly = models.IntegerField(blank=True,default=0)
    numPayment= models.IntegerField(default=60,blank=True)
    prodsServs=ArrayField(models.CharField(max_length=100,blank=True),default=list)
    prodsServs_id=ArrayField(models.IntegerField(blank=True),default=list)
    hasCredit=models.BooleanField(default=False)
    update=models.BooleanField(default=False)
    yesUpdated=models.BooleanField(default=False)
    dateStart=models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.name


class UserAccount(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    name=models.CharField(max_length=100,blank=True)
    customerID=models.CharField(max_length=150,blank=True,null=True)
    sessionID=models.CharField(max_length=150,blank=True,null=True)
    postSessionID=models.CharField(max_length=150,blank=True,null=True)
    extraSessionID=models.CharField(max_length=150,blank=True,null=True)
    cell=models.CharField(max_length=100,blank=True)
    email=models.CharField(max_length=100,blank=True)
    city=models.CharField(max_length=50,blank=True)
    address=models.CharField(max_length=300,blank=True)
    country=models.CharField(max_length=50,blank=True)
    provState=models.CharField(max_length=50,blank=True)
    postal=models.CharField(max_length=50,blank=True,null=True)
    website=models.CharField(max_length=75,blank=True,null=True)
    newWebsite=models.CharField(max_length=75,blank=True,null=True)
    CDN=models.CharField(max_length=75,default='False',blank=True)
    industry=models.CharField(max_length=75,blank=True,null=True)
    co=models.CharField(max_length=75,blank=True,null=True)
    promotion=models.BooleanField(default=False,blank=True)
    product=models.ManyToManyField(Product,related_name='products',blank=True)
    service=models.ManyToManyField(Service,related_name='services',blank=True)
    extraService=models.ManyToManyField(ExtraService,related_name='extraServices',blank=True)
    postService=models.ManyToManyField(PostService,related_name='postServices',blank=True)
    invoice=models.ForeignKey(Invoice,on_delete=models.CASCADE,null=True,blank=True)
    postInvoice=models.ForeignKey(PostInvoice,on_delete=models.CASCADE,null=True,blank=True)
    credit=models.ForeignKey(CreditInvoice,on_delete=models.CASCADE,null=True,blank=True)
    extraInvoice=models.ForeignKey(ExtraInvoice,on_delete=models.CASCADE,null=True,blank=True)
    options=models.ForeignKey(Option,on_delete=models.CASCADE,null=True,blank=True)
    sitePreference=models.ForeignKey(SitePreference,on_delete=models.CASCADE,null=True,blank=True)
    postAccountActivate=models.BooleanField(default=False)
    postActivateEmailSent=models.BooleanField(default=False)
    publishComplete=models.BooleanField(default=False)
    publishEmailSent=models.BooleanField(default=False)
    calcUUID=models.CharField(max_length=100,blank=True,null=True)
    consult = models.BooleanField(default=False)
    canceled= models.BooleanField(default=False)
    canceledCount=models.IntegerField(default=0)
    date=models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.name}-{self.user}'



class Jobs(models.Model):
    userId=models.CharField(max_length=100,blank=True,null=True)
    userAccount=models.ForeignKey(UserAccount,on_delete=models.CASCADE,null=True,related_name='jobs')
    serviceArr=ArrayField(models.CharField(max_length=200,blank=True),default=list)
    postServiceArr=ArrayField(models.CharField(max_length=200,blank=True),default=list)
    extraServiceArr=ArrayField(models.CharField(max_length=200,blank=True),default=list)
    def __str__(self):
        return self.userId




class Calculator(models.Model):
    priceCatelog=models.ForeignKey(PriceCatelog,related_name="calculator",on_delete=models.CASCADE,blank=True,null=True)
    Q=models.CharField(max_length=300,blank=True,null=True)
    services =models.ManyToManyField(Service,blank=True,related_name="calc_services")
    products =models.ManyToManyField(Product,blank=True,related_name="calc_products")
    post_services =models.ManyToManyField(PostService,blank=True,related_name="calc_post_services")
    extra_services =models.ManyToManyField(Service,blank=True,related_name="calc_extra_services")
    yesno=models.BooleanField(default=True)
    ans=ArrayField(models.CharField(max_length=300,default="no"),default=list)
    dateNow= models.DateTimeField(default=timezone.now)
    date=models.DateField(auto_now_add=True)
    class Meta:
        ordering =['id']
    def __str__(self):
        return f'{self.Q}-{self.yesno}'

class TempSavedCalculator(models.Model):
    uuid=models.UUIDField(primary_key=False,default=uuid.uuid4,editable=False)
    co=models.CharField(max_length=50,blank=True,null=True)
    industry=models.CharField(max_length=50,blank=True,null=True)
    website=models.CharField(max_length=50,blank=True,null=True)
    highTech=models.BooleanField(default=False)
    CDN=models.CharField(max_length=50,blank=True,null=True)
    productIdArr=ArrayField(models.IntegerField(default=0),default=list)
    postServiceIdArr=ArrayField(models.IntegerField(default=0),default=list)
    total=models.IntegerField(default=0)
    serviceIdArr=ArrayField(models.IntegerField(default=0),default=list)
    additionalCharArr=ArrayField(models.CharField(max_length=100,blank=True),default=list)
    def __str__(self):
        return f'{self.uuid}'





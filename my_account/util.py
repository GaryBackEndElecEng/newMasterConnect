from .models import (Product,Service,UserAccount,Invoice,Tax,Package,PostService,PostInvoice,ExtraService,ExtraInvoice,PriceCatelog,Price,Calculator,TempSavedCalculator,Jobs)
from adminHome.models import Rates
from django.contrib.auth.models import User,Group
import stripe
from django.conf import settings
from datetime import datetime,timedelta,date
import json
import math,pytz
from django.utils import timezone
from django.core.mail import EmailMultiAlternatives,BadHeaderError
from django.template.loader import render_to_string

"""
REMAINDER FOR CALCULATING INTERESTS FOR 2-YEARS INSTEAD OF 5-YRS, SHOWING THE REMAINDER
(1+int)**5 - (1+int)**2
(1+int)**2 ((1+int)**3 -1)

remainder for (2-5 yrs)
(1+int)**3 -1
"""

def calculateMonth(mon):
    today=date.today()
    days=mon*30.5
    setdate=timedelta(days=days) + today
    return setdate.strftime("%Y%m%d"),setdate

def calculateMonthTZ(mon):
    today=timezone.now()
    days=mon*30.5
    setdate=timedelta(days=days) + today
    return setdate

# THIS IS USED FOR INITIAL REGISTRATION AT USER LOGIN
def addInvoiceToUserAccount(username):
    user=User.objects.get(username=username)
    userAccount=UserAccount.objects.filter(user=user).first()
    if not userAccount.invoice:
        if not userAccount.country:
            userAccount.country="CA"
        if not userAccount.provState:
            userAccount.provState="ON"
        tax,created = Tax.objects.get_or_create(country=userAccount.country,subRegion="ON")
        if created:
            tax.save()
        invoice,created1=Invoice.objects.get_or_create(name=userAccount.name,tax=tax)
        if created1:
            invoice.save()
            userAccount.invoice=invoice
            userAccount.save()
            return invoice.id
    else:
        invoice=Invoice.objects.filter(id=userAccount.invoice.id).first()
    return invoice.id

class Calculate:
    def __init__(self,user_id):
        self.user_id=int(user_id)
        self.user=User.objects.filter(id=self.user_id).first()
        self.userAccount=UserAccount.objects.filter(user=self.user).first()
        self.stripeCharge=Rates.objects.filter(name="stripeCharge").first()
        if not self.userAccount.invoice:
            invoice_id=addInvoiceToUserAccount(self.user.username)
            self.invoice=Invoice.objects.filter(id=invoice_id).first()
            self.invoice.tax.country=self.userAccount.country
            self.invoice.tax.subRegion=self.userAccount.provState
            self.invoice.save()
            self.userAccount.invoice=self.invoice
            self.userAccount.save()
        else:
            self.invoice=Invoice.objects.filter(id=self.userAccount.invoice.id).first()
            
    def productServiceSubTotal(self):
        if self.invoice and self.userAccount and self.invoice.paid==False:
            self.userProducts=self.userAccount.product.all()
            self.userServices=self.userAccount.service.all()
            subTotalProduct=sum([obj.price for obj in self.userProducts])
            subTotalService=sum([obj.price for obj in self.userServices])
            self.invoice.subTotal=subTotalProduct + subTotalService
            self.invoice.save()
            return self.invoice.subTotal

    def productServiceTotal(self):
        if self.invoice and self.userAccount and self.invoice.paid==False:
            subTotal= self.productServiceSubTotal()
            fedTax=(self.invoice.tax.fed/100)*subTotal
            provStateTax=fedTax*(self.invoice.tax.provState/100)
            total=subTotal + fedTax + provStateTax
            self.invoice.total=total
            self.invoice.save()
            return total

    def monthlyArrayCalculator(self):
        if self.invoice and self.userAccount and self.invoice.paid==False:
            total=self.productServiceTotal()
            array=[]
            if total !=0:
                for i in range(1,25):
                    total2=int(total*(1.03**2)//i)
                    array.append(math.ceil(total2))
                self.invoice.monthlyArray=array
                self.invoice.save()
                return 

    def productServiceSubMonthly(self):
        subTotalMonthly=0
        if self.invoice and self.userAccount and self.invoice.paid==False:
            self.userProducts=self.userAccount.product.all()
            self.userServices=self.userAccount.service.all()
            subTotalProduct=sum([obj.monthly for obj in self.userProducts])
            subTotalService=sum([obj.monthly for obj in self.userServices])
            self.invoice.subTotalMonthly=subTotalProduct + subTotalService
            subTotalMonthly=subTotalProduct + subTotalService
            self.invoice.save()
            return subTotalMonthly

    def productServiceMonthly(self):
        if self.invoice and self.userAccount and self.invoice.paid==False:
            subTotal= self.productServiceSubMonthly()
            fedTax=(self.invoice.tax.fed/100)
            provStateTax=fedTax*(self.invoice.tax.provState/100)
            total=subTotal*(1 + fedTax + provStateTax)
            self.invoice.totalMonthly=total
            self.invoice.save()
            return total
        return 0

    def calculateSavings(self):
        if self.invoice and self.userAccount and self.invoice.paid==False:
            savings=0
            for product in self.userAccount.product.all():
                savings += product.savings
            self.invoice.savings=savings
            self.invoice.save()
    
    def calculateStripeFee(self):
        if self.invoice.paid==False:
            fee=1 + self.stripeCharge.interest/200
            self.invoice.total=math.floor(self.invoice.total*fee)
            self.invoice.totalMonthly=math.floor(self.invoice.totalMonthly * fee)
            self.invoice.save()
        return 

    def execute(self):
        self.productServiceMonthly()
        self.productServiceTotal()
        self.monthlyArrayCalculator()
        self.calculateSavings()
        self.calculateStripeFee()
        return 


                
# user_id=47                
# test=Calculate(user_id)
# print(test.productServiceMonthly())

stripe.api_key = settings.STRIPE_SECRET_KEY
class StripeCreation:
    def __init__(self, user_id ):
        self.user_id=user_id
        self.user=User.objects.filter(id=self.user_id).first()
        self.userAccount=UserAccount.objects.filter(user=self.user).first()
        self.invoice=Invoice.objects.filter(id=self.userAccount.invoice.id).first()
        self.products=self.userAccount.product.all()
        self.services=self.userAccount.service.all()
        self.true=False
        self.numPayment=0
        
    def productName(self):
        name=""
        if self.products:
            name +=",".join([obj.name[:10] for obj in self.userAccount.product.all()])
        if self.services:
            name+=",".join([obj.name[:10] for obj in self.userAccount.service.all()])
        return name

    
    def descName(self):
        desc=""
        if self.products:
            desc+=",".join([obj.desc[:16] for obj in self.userAccount.product.all()])
        if self.services:
            desc+=f'{self.userAccount.service.all()[0].desc}'
        return desc

    def stripeCustomer(self):
        if  self.userAccount.customerID:
            custumerID=self.userAccount.customerID
            getCustomerID=stripe.Customer.retrieve(id=custumerID,api_key=stripe.api_key)
            getCustomerID.metadata={'ordered product':self.productName(),"ordered desc":self.descName()}
            getCustomerID.address={'line1':self.userAccount.address,'city':self.userAccount.provState,'country':self.userAccount.country,'postal_code':""}
            getCustomerID.save()
            return getCustomerID.id
        else:
            customer=stripe.Customer.create(
                api_key=stripe.api_key,
                email=self.userAccount.email,
                name=self.userAccount.name,
                phone=self.userAccount.cell,
                address={'line1':self.userAccount.address,'city':self.userAccount.provState,'country':self.userAccount.country,'postal_code':""},
                description=" new Master Client",
                # metadata={'ordered product':self.stripeProductIDCreate()}
            )
            self.userAccount.customerID=customer.id
            self.userAccount.save()
            customer.save()
            return customer.id

    def stripeProduct(self):
        if self.products or self.services:
            try:
                stripeProduct=stripe.Product.create(
                    name=self.productName(),
                    description=self.descName(),
                    images=['https://master-connect.s3.ca-central-1.amazonaws.com/static/pics/bronze.png',],
                )
                # print(stripeProduct)
                stripeProduct.save()
                return stripeProduct.id
            except Exception as e:
                print(f'product error=>{e}')

    def stripePrice(self):
        if (self.products or self.services) and (self.stripeProduct()):
            price = 0
            if self.invoice and self.invoice.numPayment >= 1:
                self.numPayment=self.invoice.numPayment
                if self.numPayment==1:
                    price=self.invoice.total * 100
                    try:
                        stripePrice=stripe.Price.create(
                        product=self.stripeProduct(),
                        # type="one_time",
                        unit_amount=price,
                        currency="cad",
                        metadata={
                                "productID":self.stripeProduct(),
                                'full_name':self.userAccount.name,
                                'userAccount_id':self.userAccount.id,
                                "invoice_id":self.invoice.id,
                                "numPayment":1
                                    },
                        )
                        stripePrice.save()
                        self.invoice.priceID=stripePrice.id
                        self.invoice.sendingForPayment=True
                        self.invoice.save()
                        return stripePrice.id
                    except Exception as e:
                        print(f'Price issue=>{e}')
                else:
                    price=self.invoice.totalMonthly * 100
                    self.true=True
                    try:
                        dateTerm=calculateMonth(self.numPayment)[0]
                        self.invoice.endDate=calculateMonth(self.numPayment)[1]
                        stripePrice=stripe.Price.create(
                        product=self.stripeProduct(),
                        # type = "recurring",
                        recurring = {
                                "aggregate_usage": None,
                                "interval": "month",
                                "interval_count": 1,
                                "usage_type": "licensed"
                            },
                        unit_amount = price,
                        currency ="cad",
                        metadata = {
                                "productID":self.stripeProduct(),
                                'full_name':self.userAccount.name,
                                'userAccount_id':self.userAccount.id,
                                "invoice_id":self.invoice.id,
                                "numPayment":self.invoice.numPayment,
                                "endDate":dateTerm
                                    },
                        )
                        stripePrice.save()
                        self.invoice.priceID=stripePrice.id
                        self.invoice.sendingForPayment=True
                        self.invoice.save()
                        return stripePrice.id
                    except Exception as e:
                        print(f'Price issue=>{e}')
        

    def execute(self):
        custumer_id=self.stripeCustomer()
        price_id=self.stripePrice()
        return self.true,self.numPayment,price_id,custumer_id

# STRIPE RECIEVED A NON FOR SESSION KEY, AT FIRST, THEN REFRESHED AN RETURNED IT. THERE SHOULD BE A DELAY
# OR SIMPLY REMOVE IT BECAUSE THE SESSION_ID HAS BEEN SAVED
class GetSession:
    def __init__(self,session,user_id):
        self.session=session
        self.user_id=user_id
        self.user=User.objects.filter(id=self.user_id).first()
        self.userAccount=UserAccount.objects.filter(user=self.user).first()

    def getSession(self):
        getSession=stripe.checkout.Session.retrieve(str(self.session))
        subscription=getSession["subscription"]
        paymentStatus=getSession["payment_status"]
        paymentIntent=getSession["payment_intent"]
        print("payment_intent",paymentIntent)
        if(subscription):
            self.userAccount.sessionID=subscription
        else:
            self.userAccount.sessionID=paymentIntent
        self.userAccount.save()
        
        return getSession,subscription



def findSubTotalMonthly(invoice_id,totalMonthly):
    invoice=Invoice.objects.filter(id=invoice_id).first()
    if invoice:
        fedTax=invoice.tax.fed
        provTax=invoice.tax.provState
        total=totalMonthly
        subTotal=(total//(1+fedTax/100))
        subTotal=subTotal//(1+provTax/100)
        return subTotal

pubCard="pk_test_51LhEO0DeW5nEzo25iVgmGlWUD9RmC3Eh32h9ALgT9OScLfYIiAzelvyKQNS6lxbZP36HiI4pzPDKpjp1QeAoz4I300dLnItvBl"
pubCardSetting=str(settings.STRIPE_PUBLIC_KEY)

def TestCard(card1,card2):
    if(card1==card2):
        print("YES")
    else:
        print("NOOO",card1,'CARD2',card2)

# TestCard(pubCard,pubCardSetting)
"""
THIS CALCULATES THE MONTHLY COSTS FOR THE PRODUCT AND SERVICE PRICE. IT SAVES THE MONTHLY COSTS IN SVC(S) AND PROD(S)
"""
class monthlyProductServiceMonthlyPrice:
    def __init__(self):
        self.interest=0
        self.products=Product.objects.all()
        self.services= Service.objects.all()
        self.postServices= PostService.objects.all()
        self.extraServices= ExtraService.objects.all()
        self.rate=Rates.objects.filter(name="interest").first()
        if self.rate:
            self.interest=self.rate.interest/100
        self.years=self.rate.years
        self.accumInterest=(1 + self.interest)**(self.years)
        self.months= self.years * 12

    def productCalc(self):
        for product in self.products:
            product.monthly=product.price * self.accumInterest//self.months
            product.save()

    def serviceCalc(self):
        for service in self.services:
            service.monthly=service.price * self.accumInterest//self.months
            service.save()

    def postServiceCalc(self):
        for service in self.postServices:
            service.monthly=service.price * self.accumInterest//self.months
            service.save()

    def postExtraServiceCalc(self):
        for service in self.extraServices:
            service.monthly=service.price * self.accumInterest//self.months
            service.save()

    def execute(self):
        self.productCalc()
        self.serviceCalc()
        self.postServiceCalc()
        self.postExtraServiceCalc()

# test= monthlyProductServiceMonthlyPrice()
# test.execute()

"""
THIS CALCULATES THE PACKAGE SUM PRICES AND MONTHLY COSTS FOR THE PACKAGE
"""
class calcPackageMonthlyPrice:
    def __init__(self,packInstance):
        self.packInstance=packInstance
        self.products=[]
        self.services=[]
        self.postServices=[]
        # self.getPackage=Package.objects.filter(id=self.packInstance.id).first()
        self.getPackage=self.packInstance
        if(self.getPackage):
            self.products=self.packInstance.products.all()
            self.services=self.packInstance.services.all()
            self.postServices=self.packInstance.services.all()
        
    def packageProductDesc(self):
        total=''
        self.descsProd=",".join( [obj.desc for obj in self.products])
        self.descsServ=",".join( [obj.desc for obj in self.services])
        self.descsPostServ=",".join( [obj.desc for obj in self.postServices])
        total="service(s),".join( [self.descsProd,self.descsServ,self.descsPostServ])
        if(self.getPackage):
            self.getPackage.desc=total
        return total

    def packageProdPrice(self):
        total=0
        self.prodPrices=sum([obj.price for obj in self.products])
        self.servPrices=sum([obj.price for obj in self.services])
        self.postServPrices=sum([obj.price for obj in self.postServices])
        total=math.ceil(self.prodPrices + self.servPrices + self.postServPrices)
        if(self.getPackage):
            self.getPackage.price=total
        return total

    def packageProdMonthly(self):
        total=0
        self.prodMonthly=sum([obj.monthly for obj in self.products])
        self.servMonthly=sum([obj.monthly for obj in self.services])
        self.postServMonthly=sum([obj.monthly for obj in self.postServices])
        total=math.ceil(self.prodMonthly + self.servMonthly + self.postServMonthly)
        if(self.getPackage):
            self.getPackage.monthly=total
        return total

    def packageSpecial(self):
        if self.getPackage.specialOffer and self.getPackage.reducePerc is not None:
            self.getPackage.price = math.ceil(self.getPackage.price* (1-self.getPackage.reducePerc/100))
            self.getPackage.monthly = math.ceil(self.getPackage.monthly* (1-self.getPackage.reducePerc/100))
            # print("OUTSIDE LOOP",self.getPackage.specialOffer,self.getPackage.reducePerc)

    def execute(self):
        allPackages=None
        self.packageProductDesc()
        self.packageProdPrice()
        self.packageProdMonthly()
        self.packageSpecial()
        # print("OUTSIDE LOOP",self.getPackage.specialOffer,self.getPackage.reducePerc)
        self.getPackage.save()
        allPackages=Package.objects.all().order_by("id")
        return allPackages
        

"""
THIS getPackages() CALCULATES THE SUM MONTHLY AND PRICE AND DESC AND STORES IT WITHIN THE Package TABLE.
IF!! THE reducePerc is not null then it will reduce the Price and monthly, SHOWN ABOVE^
"""
def updatePackages():
    arr=[]
    packages=Package.objects.all()
    for package in packages:
        try:
            if package.updateValue==True:
                arr.append(calcPackageMonthlyPrice(package).execute())
            # print("EXECUTED",arr)
            return arr
        except Exception as e:
            print("error", e )       

# updatePackages()

class StripeCreationPost:
    def __init__(self, userAccount):
        self.userAccount=userAccount
        self.postInvoice=PostInvoice.objects.filter(id=self.userAccount.postInvoice.id).first()
        self.postServices=self.userAccount.postService.all()
        self.true=False
        self.numPayment=0
        # print("self.postInvoice",self.postInvoice)
        
    def productName(self):
        name=""
        if self.postServices:
            name +=",".join([obj.name[:25] for obj in self.postServices])
        return name

    
    def descName(self):
        desc=""
        if self.postServices:
            desc+=",".join([obj.desc[:20] for obj in self.postServices])
            print(desc)
        return desc

    def stripeCustomer(self):
        if  self.userAccount.customerID:
            custumerID=self.userAccount.customerID
            getCustomerID=stripe.Customer.retrieve(id=custumerID,api_key=stripe.api_key)
            getCustomerID.metadata={'ordered product':self.productName(),"ordered desc":self.descName()}
            getCustomerID.address={'line1':self.userAccount.address,'city':self.userAccount.provState,'country':self.userAccount.country,'postal_code':self.userAccount.postal}
            getCustomerID.save()
            return getCustomerID.id
        else:
            customer=stripe.Customer.create(
                api_key=stripe.api_key,
                email=self.userAccount.email,
                name=self.userAccount.name,
                phone=self.userAccount.cell,
                address={'line1':self.userAccount.address,'city':self.userAccount.provState,'country':self.userAccount.country,'postal_code':self.userAccount.postal},
                description=" PostDeployement",
                # metadata={'ordered product':self.stripeProductIDCreate()}
            )
            self.userAccount.customerID=customer.id
            self.userAccount.save()
            customer.save()
            return customer.id

    def stripeProduct(self):
        if self.postServices and not self.postInvoice.priceID:
            try:
                stripeProduct=stripe.Product.create(
                    name=self.productName(),
                    description=self.descName(),
                    images=['https://master-connect.s3.ca-central-1.amazonaws.com/static/pics/bronze.png',],
                )
                # print(stripeProduct)
                stripeProduct.save()
                return stripeProduct.id
            except Exception as e:
                print(f'product error=>{e}')

    def stripePrice(self):
        if ( self.postServices):
            price = 0
            if not self.postInvoice.priceID:
                # print("INSIDE postInvoice")
                price=self.postInvoice.totalMonthly * 100
                self.true=True
                try:
                    dateTerm=calculateMonth(61)[0]
                    self.postInvoice.endDate=dateTerm[1]
                    stripePrice=stripe.Price.create(
                            product=self.stripeProduct(),
                            # type = "recurring",
                            recurring = {
                                    "aggregate_usage": None,
                                    "interval": "month",
                                    "interval_count": 1,
                                    "usage_type": "licensed"
                                },
                            unit_amount = price,
                            currency ="cad",
                            metadata = {
                                    "productID":self.stripeProduct(),
                                    'full_name':self.userAccount.name,
                                    'userAccount_id':self.userAccount.id,
                                    "invoice_id":self.postInvoice.id,
                                    "endDate":dateTerm
                                        },
                    )
                    stripePrice.save()
                    self.postInvoice.priceID=stripePrice.id
                    self.postInvoice.sendingForPayment=True
                    self.postInvoice.save()
                    return stripePrice.id
                except Exception as e:
                    print(f'Price issue=>{e}')
            else:
                return self.postInvoice.priceID

    def execute(self):
        price_id=self.stripePrice()
        customer_id=self.stripeCustomer()
        # print("PRICE_ID",price_id,"CUSTOMER",customer_id)
        return price_id,customer_id

#///////////////----THIS CALCULATES TOTALMONTHLY COST BASED ON INVOICE PRICING---/////////////

def calculate5YrMonthly(userAccount):
    invoice=Invoice.objects.filter(id= userAccount.invoice.id).first()
    if invoice:
        tax=(1 + invoice.tax.fed/100 + invoice.tax.provState/100)
        totalMonthly=math.ceil(invoice.subTotalMonthly * tax)
        totalMonthly=totalMonthly
        invoice.totalMonthly=totalMonthly
        invoice.numPayment=60
        invoice.paid=False
        invoice.dateEnd=calculateMonthTZ(60)
        invoice.save()

# def monthlyProductServiceMonthlyCalc():
#     for i,product in enumerate(Product.objects.all()):
#         product.monthly=math.ceil((product.price * (1.03)**(5*12))//(5*12))
#         product.save()
#     for i,service in enumerate(Service.objects.all()):
#         service.monthly=math.ceil((service.price * (1.03)**(5*12))//(5*12))
#         service.save()



#-------//////////EXTRA SERVICE PURCHASE///////////------#

class StripeCreationExtra:
    def __init__(self, userAccount):
        self.userAccount=userAccount
        self.extraInvoice=ExtraInvoice.objects.filter(id=self.userAccount.extraInvoice.id).first()
        self.extraServices=self.userAccount.extraService.all()
        self.true=False
        self.numPayment=0
        # print("self.pextraInvoice",self.extraInvoice)
        
    def serviceName(self):
        name=""
        if self.extraServices:
            name +=",".join([obj.name[:26] for obj in self.extraServices])
        return name

    
    def descName(self):
        desc=""
        if self.extraServices:
            desc+=",".join([obj.desc[:10] for obj in self.extraServices])
        return desc

    def stripeCustomer(self):
        custumerID=self.userAccount.customerID
        getCustomerID=stripe.Customer.retrieve(id=custumerID,api_key=stripe.api_key)
        getCustomerID.metadata={'ordered Service':self.serviceName(),"ordered desc":self.descName()}
        getCustomerID.address={'line1':self.userAccount.address,'city':self.userAccount.provState,'country':self.userAccount.country,'postal_code':self.userAccount.postal}
        getCustomerID.save()
        return getCustomerID.id

    def stripeProduct(self):
        if self.extraServices and not self.extraInvoice.priceID:
            try:
                stripeService=stripe.Product.create(
                    name=self.serviceName(),
                    description="purchasing package",
                    images=['https://master-connect.s3.ca-central-1.amazonaws.com/static/pics/gold.png',],
                )
                # print(stripeProduct)
                stripeService.save()
                return stripeService.id
            except Exception as e:
                print(f'product error=>{e}')

    def stripePrice(self):
        if ( self.extraServices):
            price = 0
            if not self.extraInvoice.priceID:
                # print("INSIDE postInvoice")
                price=self.extraInvoice.totalMonthly * 100
                self.true=True
                try:
                    dateTerm=calculateMonth(60)
                    self.extraInvoice.dateEnd=dateTerm[1]
                    stripePrice=stripe.Price.create(
                            product=self.stripeProduct(),
                            # type = "recurring",
                            recurring = {
                                    "aggregate_usage": None,
                                    "interval": "month",
                                    "interval_count": 1,
                                    "usage_type": "licensed"
                                },
                            unit_amount = price,
                            currency ="cad",
                            metadata = {
                                    "productID":self.stripeProduct(),
                                    'full_name':self.userAccount.name,
                                    'userAccount_id':self.userAccount.id,
                                    "invoice_id":self.extraInvoice.id,
                                    "endDate":dateTerm[0]
                                        },
                    )
                    stripePrice.save()
                    self.extraInvoice.priceID=stripePrice.id
                    self.extraInvoice.sendingForPayment=True
                    self.extraInvoice.save()
                    return stripePrice.id
                except Exception as e:
                    print(f'Price issue=>{e}')
            else:
                return self.extraInvoice.priceID

    def execute(self):
        price_id=self.stripePrice()
        customer_id=self.stripeCustomer()
        # print("PRICE_ID",price_id,"CUSTOMER",customer_id)
        return price_id,customer_id

def insertLowest_price_in():
    serviceArr=[]
    productArr=[]
    serviceExtraArr=[]
    servicePostArr=[]

    newPricecatelog,created=PriceCatelog.objects.get_or_create(name="baseServices_4")
    if created:
        newPricecatelog.save()

    for priceCatelog in PriceCatelog.objects.all():
        if priceCatelog.service.all() is not None:
            for service in priceCatelog.service.all():
                serviceArr.append({"price":service.price,"monthly":service.monthly})
            
            priceInst, created=Price.objects.get_or_create(
                name="Starting Service Price"
                )
            if(serviceArr):
                priceInst.price=min([obj["price"] for obj in serviceArr])
                priceInst.monthly=min([obj["monthly"] for obj in serviceArr])
                priceInst.desc="starting pre-build service prices"
                priceInst.priceCatelog.add(newPricecatelog)
                priceInst.save()
        if priceCatelog.service.all() is not None:
            for product in priceCatelog.product.all():
                productArr.append({"price":product.price,"monthly":product.monthly})
            priceInstProd, created=Price.objects.get_or_create(
                name="Starting Product Price"
                
                )
            if productArr:
                priceInstProd.price=min([obj["price"] for obj in productArr])
                priceInstProd.monthly=min([obj["monthly"] for obj in productArr])
                priceInstProd.desc="starting product Design prices"
                priceInstProd.priceCatelog.add(newPricecatelog)
                priceInstProd.save()
        if priceCatelog.extraService.all() is not None:
            for product in priceCatelog.extraService.all():
                serviceExtraArr.append({"price":product.price,"monthly":product.monthly})
            priceInstProd, created=Price.objects.get_or_create(
                name="Starting Extra Service Price"
                
                )
            if serviceExtraArr:
                priceInstProd.price=min([obj["price"] for obj in serviceExtraArr])
                priceInstProd.monthly=min([obj["monthly"] for obj in serviceExtraArr])
                priceInstProd.desc="starting Post Extra service prices"
                priceInstProd.priceCatelog.add(newPricecatelog)
                priceInstProd.save()

        if priceCatelog.postService.all() is not None:
            for product in priceCatelog.postService.all():
                servicePostArr.append({"price":product.price,"monthly":product.monthly})
            priceInstProd, created=Price.objects.get_or_create(
                name="Starting Post Service Price"
                
                )
            if servicePostArr:
                priceInstProd.price=min([obj["price"] for obj in servicePostArr])
                priceInstProd.monthly=min([obj["monthly"] for obj in servicePostArr])
                priceInstProd.desc="starting Post Service prices"
                priceInstProd.priceCatelog.add(newPricecatelog)
                priceInstProd.save()

# insertLowest_price_in()

#CALCULATING ESTIMATE FROM CALCULATOR
#pop ans=> array,2.) Manto-many=> to Service,Post and extra Services.,Then generate monthly cost minum  and 1.62* amount.
# BEfore logging in
class CalculateCost:
    def __init__(self):
        self.calculates=Calculator.objects.all().order_by("id")
        self.tempSaveCalc=TempSavedCalculator()

    def cleanTemSavedCalc(self):
        for userAccount in UserAccount.objects.all():
            for tempCalc in TempSavedCalculator.objects.all():
              if userAccount.calcUUID and tempCalc.uuid != userAccount.calcUUID:
                 tempCalc.delete()

    def wordToIdAnsFinder(self,text,*calculate): #<==GOOD STUFF BUT NOT USING
        self.text=text
        self.calculate=calculate
        if self.calculate and self.text:
            for i,calc in enumerate(self.calculate):
                ans=calc.ans[len(calc.ans)-1]
                if self.text in calc.Q:
                    return {"id":calc.id,"ans":ans}
        
    def calcProducts(self):
        arrayIds=[]
        array1=[]
        ids=[]
        productNameArray=[]
        summaryArray=[]
        total=0
        ans="no"
        for calc in self.calculates:
            if calc.yesno == True:
                ans=calc.ans[len(calc.ans)-1]
                if ans != 'no':
                    monthly=[obj.monthly for obj in calc.products.all()]
                    ids=[obj.id for obj in calc.products.all()]
                    self.tempSaveCalc.productIdArr +=ids
                    total+=sum(monthly)
                    summaryArray =[obj.summary for obj in calc.products.all()]
                    productNameArray=[obj.name for obj in calc.products.all()]
                    for id,name,summary in zip(ids,productNameArray,summaryArray):
                        array1.append({"id":id,"name":name,"summary":summary})
        return total , array1

    def calcServices(self):
        array1=[]
        ids=[]
        serviceNameArray=[]
        summaryArray=[]
        total=0
        ans="no"
        for calc in self.calculates:
            if calc.yesno == True:
                ans=calc.ans[len(calc.ans)-1]
                if ans != 'no':
                    monthly=[obj.monthly for obj in calc.services.all()]
                    ids=[obj.id for obj in calc.services.all()]
                    self.tempSaveCalc.serviceIdArr +=ids
                    total+=sum(monthly)
                    summaryArray =[obj.summary for obj in calc.services.all()]
                    serviceNameArray=[obj.name for obj in calc.services.all()]
                    for id,name,summary in zip(ids,serviceNameArray,summaryArray):
                        array1.append({"id":id,"name":name,"summary":summary})
        return total , array1

    def calcPostServices(self):
        array1=[]
        summaryArray=[]
        serviceNameArray=[]
        ids=[]
        total=0
        ans="no"
        for calc in self.calculates:
            if calc.yesno == True:
                ans=calc.ans[len(calc.ans)-1]
                if ans != 'no':
                    monthly=[obj.monthly for obj in calc.post_services.all()]
                    total+=sum(monthly)
                    ids=[obj.id for obj in calc.post_services.all()]
                    self.tempSaveCalc.postServiceIdArr+=ids
                    summaryArray =[obj.summary for obj in calc.post_services.all()]
                    serviceNameArray=[obj.name for obj in calc.post_services.all()]
                    for id,name,summary in zip(ids,serviceNameArray,summaryArray):
                        array1.append({"id":id,"name":name,"summary":summary})
        return total , array1


    def genYesnoFalseArray(self):
        array2=[{"id":0,"name":"CDN","ans":"","calcID":0},{"id":1,"name":"existing site","ans":"","calcID":0},{"id":2,"name":"industry","ans":"","calcID":0},{"id":3,"name":"database size","ans":"","calcID":0},{"id":4,"name":"hits","calcID":0},{"id":5,"name":"type of database","ans":"","calcID":0},{"id":6,"name":"company","ans":"","calcID":0},{"id":7,"name":"website","ans":"","calcID":0}]
        ans="no"
        for calc in self.calculates:
            ans=calc.ans[len(calc.ans)-1]
            if calc.yesno==False:
                for dict1 in array2:
                    if dict1["name"] in calc.Q:
                        dict1["ans"]=ans
                        dict1["calcID"]=calc.id
                        break
        return array2

    def calcWrittenService(self):
        array1=[]
        total=0
        serviceNameArray=[]
        productNameArray=[]
        array2=self.genYesnoFalseArray()
        for dict1 in array2:
            num=dict1["ans"]
            # print("num",num)
            if dict1["name"] == "hits" and num !="" and num:
                try:
                    getCalc=Calculator.objects.filter(id=dict1["calcID"]).first()
                    if getCalc:
                       ans=getCalc.ans[len(getCalc.ans)-1]
                       if  num !="" and num:
                           # print("num",num)
                           if int(float(num)) and int(float(num)) >100:
                               if getCalc.services.all().exists():
                                   monthly=[obj.monthly for obj in getCalc.services.all()]
                                   total+=sum(monthly)
                                   ids=[obj.id for obj in getCalc.services.all()]
                                   self.tempSaveCalc.serviceIdArr+=ids
                                   summaryArray =[obj.summary for obj in getCalc.services.all()]
                                   serviceNameArray=[obj.name for obj in getCalc.services.all()]
                                   for id,name,summary in zip(ids,serviceNameArray,summaryArray):
                                       array1.append({"id":id,"name":name,"summary":summary})
                               if getCalc.products.all().exists():
                                   monthly=[obj.monthly for obj in getCalc.products.all()]
                                   total+=sum(monthly)
                                   ids =[obj.id for obj in getCalc.products.all()]
                                   self.tempSaveCalc.productIdArr+=ids
                                   summaryArray =[obj.summary for obj in getCalc.products.all()]
                                   productNameArray =[obj.name for obj in getCalc.products.all()]
                                   for id,name,summary in zip(ids,productNameArray,summaryArray):
                                       array1.append({"id":id,"name":name,"summary":summary})
                    
                except Exception as e:
                    print("error",e)

            if dict1["name"] == "database size":
                try:
                    getCalc=Calculator.objects.filter(id=dict1["calcID"]).first()
                    if getCalc:
                       ans=getCalc.ans[len(getCalc.ans)-1]
                       if int(dict1["ans"]) and int(dict1["ans"]) and int(dict1["ans"]) >64:
                           if getCalc.post_services.all().exists():
                               monthly=[obj.monthly for obj in getCalc.post_services.all()]
                               total+=sum(monthly)
                               ids=[obj.id for obj in getCalc.post_services.all()]
                               self.tempSaveCalc.postServiceIdArr+=ids
                               summaryArray =[obj.summary for obj in getCalc.post_services.all()]
                               serviceNameArray=[obj.name for obj in getCalc.post_services.all()]
                               for id,name,summary in zip(ids,serviceNameArray,summaryArray):
                                      array1.append({"id":id,"name":name,"summary":summary})
                           if getCalc.products.all().exists():
                                  monthly=[obj.monthly for obj in getCalc.products.all()]
                                  total+=sum(monthly)
                                  ids=[obj.id for obj in getCalc.products.all()]
                                  self.tempSaveCalc.productIdArr+=ids
                                  summaryArray =[obj.summary for obj in getCalc.products.all()]
                                  serviceNameArray=[obj.name for obj in getCalc.products.all()]
                                  for id,name,summary in zip(ids,serviceNameArray,summaryArray):
                                      array1.append({"id":id,"name":name,"summary":summary})
                except Exception as e:
                    print("error",e)
        return total,array1
                        
    def calcgetAdditional(self):
        array2=self.genYesnoFalseArray()
        for dict1 in array2:
            getCalc=Calculator.objects.filter(id=dict1["calcID"]).first()
            if getCalc:
               ans=dict1["ans"]
               if dict1["name"] == "industry":
                   self.tempSaveCalc.industry=ans
                   dict1["ans"]=ans
               if dict1["name"] == "CDN":
                   self.tempSaveCalc.CDN=ans
                   dict1["ans"]=ans
               if dict1["name"] == "company":
                   self.tempSaveCalc.co=ans
                   dict1["ans"]=ans
               if dict1["name"] == "website":
                   self.tempSaveCalc.website=ans
                   dict1["ans"]=ans
        
    def removeDuplicates(self):
        array3=[]
        total= self.calcPostServices()[0] + self.calcServices()[0] + self.calcWrittenService()[0] + self.calcProducts()[0]
        array2=self.calcPostServices()[1] + self.calcServices()[1] + self.calcWrittenService()[1] + self.calcProducts()[1]
        for dict1 in array2:
           if dict1 not in array3:
              array3.append(dict1)
           else:
              total -= 50
        return total,array3


    def calcCombine(self):
        self.cleanTemSavedCalc()
        total=self.removeDuplicates()[0]
        array2=self.removeDuplicates()[1]
        self.calcgetAdditional()
        self.tempSaveCalc.total=total
        self.tempSaveCalc.save()
        return {"total":total,"data":array2,"uuid":self.tempSaveCalc.uuid}

## ADDING SERVICES TO THE USER ACCOUNT
## THIS EXECUTES AT LOGIN; IT LOADES THE SELECTED SERVICE AND POSTSERVICES INTO USERACCOUNT 
class CalcAddToUserAccountAtLogin:
    def __init__(self,uuid,username):
        self.array2=[{"id":0,"name":"CDN","ans":""},{"id":1,"name":"existing site","ans":""},{"id":2,"name":"industry","ans":""},{"id":3,"name":"database size","ans":""},{"id":4,"name":"hits"},{"id":5,"name":"type of database","ans":""},{"id":6,"name":"Co","ans":""}]
        self.uuid=uuid
        self.username=username
        self.calcResults=TempSavedCalculator.objects.filter(uuid=self.uuid).first()
        self.user=User.objects.filter(username=self.username).first()
        self.userAccount=UserAccount.objects.filter(user=self.user).first()

    def addServicesToUser(self):
        if self.calcResults and self.userAccount:
            for id in self.calcResults.serviceIdArr:
                getService=Service.objects.get(id=id)
                self.userAccount.service.add(getService)

    def addProductsToUser(self):
        if self.calcResults and self.userAccount:
            for id in self.calcResults.productIdArr:
                getProduct=Product.objects.get(id=id)
                self.userAccount.product.add(getProduct)

    def AddCustomPage(self):
        product=Product.objects.get(category="customFrontPage").first()
        self.userAccount.product.add(product)


    def addPostServicesToUser(self):
        if self.calcResults and self.userAccount:
            for id in self.calcResults.postServiceIdArr:
                getPostService=PostService.objects.get(id=id)
                self.userAccount.postService.add(getPostService)

    def execute(self):
        if self.userAccount:
            self.addServicesToUser()
            self.addProductsToUser()
            self.addPostServicesToUser()
            self.AddCustomPage()
            self.userAccount.calcUUID=self.uuid
            self.userAccount.co=self.calcResults.co
            self.userAccount.CDN=self.calcResults.CDN
            self.userAccount.industry=self.calcResults.industry
            self.userAccount.website=self.calcResults.website
            self.userAccount.save()



def generateUserJobs(user_id):
    user=User.objects.filter(id=user_id).first()
    userAccount=UserAccount.objects.filter(user=user).first()
    jobs=Jobs.objects.filter(userAccount=userAccount).first()
    if userAccount and jobs:
        services=[obj.name for obj in userAccount.service.all()]
        postServices=[obj.name for obj in userAccount.postService.all()]
        extraServices=[obj.name for obj in userAccount.extraService.all()]
        if services:
            jobs.serviceArr=services
        if postServices:
            jobs.postServiceArr=postServices
        if extraServices:
            jobs.extraServiceArr=extraServices
        jobs.save()


from django.contrib.sites.models import Site
def site_url():
            sites=Site.objects.all()
            for site in sites:
                if(site.domain == "www.masterconnect.ca"):
                    settings.SITE_ID=int(site.id)
                    settings.SITE_URL="https://www.masterconnect.ca"
                    return {"SITE_URL":"https://www.masterconnect.ca","id":site.id}
                elif(site.domain=="newmasterconnect.herokuapp.com"):
                    settings.SITE_ID=int(site.id)
                    settings.SITE_URL="https://newmasterconnect.herokuapp.com"
                    return {"SITE_URL":"https://newmasterconnect.herokuapp.com"}
                elif(site.domain=="www.master-connect.com"):
                    settings.SITE_ID=int(site.id)
                    settings.SITE_URL="https://www.master-connect.com"
                    return {"SITE_URL":"https://www.master-connect.com"}
                elif(site.domain=="www.master-connect.ca"):
                    settings.SITE_ID=int(site.id)
                    settings.SITE_URL="https://www.master-connect.ca"
                    return {"SITE_URL":"https://www.master-connect.ca","id":settings.SITE_ID}
                else:
                    settings.SITE_URL="http://localhost:8000"
                    return {"SITE_URL":"http://localhost:8000"}

# print(site_url())

def storeCustomId(customId,username):
    user=User.objects.filter(username=username).first()
    if user:
        product=Product.objects.get(id=customId)
        userAccount=UserAccount.objects.get(user=user)
        userAccount.product.add(product)
        userAccount.save()


def saveUsersPackage(user_id,packageId):
    if user_id:
        # print("user_id",user_id,"packageId",packageId)
        user=User.objects.get(id=user_id)
        userAccount=UserAccount.objects.filter(user=user).first()
        package=Package.objects.filter(id=packageId).first()
        if userAccount and package:
            products = package.products.all()
            services=package.services.all()
            postServices=package.postServices.all()
            if products:
                userAccount.product.add(*products)
            if services:
                userAccount.service.add(*services)
            if postServices:
                userAccount.postService.add(*postServices)
            userAccount.save()

def addServicesProducts(userAccnt_id,*arrProdsServs):
    arr=[]
    if userAccnt_id and arrProdsServs:
        userAccount=UserAccount.objects.filter(id=userAccnt_id).first()
        for obj in arrProdsServs:
            product=Product.objects.filter(id=obj.id).first()
        

#-----////// PROVIDES SAVINGS ON PRICES TO PRODUCTS THIS WAS TRANSFERRED TO MYACCOUNT/SIGNALS ///////------#
def calculateSavings(product):
    if product.update == True and product.updated==False:
       total=0
       servicePrice=0
       postServicePrice=0
       extraServicePrice=0
       services=product.services.all()
       postServices=product.postServices.all()
       extraServices=product.extraServices.all()
       product.update=False
       product.updated=True
       for service in services:
        servicePrice +=service.price
       for postService in postServices:
        postServicePrice += postService.price
       for extraService in extraServices:
        extraServicePrice += extraService.price
       total=servicePrice + postServicePrice + extraServicePrice
       product.savings=total - product.price
       product.save()


# THIS IS USED FOR UPDATING THE TAX FORIEGN KEY TO INVOICE
def adjustTaxInvoiceForiegn(userAccount_id):
    userAccount=UserAccount.objects.get(id=userAccount_id)
    invoice=Invoice.objects.filter(id=userAccount.invoice.id).first()
    if invoice:
        country=userAccount.country.upper()
        subRegion=userAccount.provState.upper()
        tax,created=Tax.objects.get_or_create(country=country,subRegion=subRegion)
        if created:
            tax.save()
        invoice.tax=tax
        invoice.save()

#----/////// THIS IS USED FOR EXTRA SERVICES CALCULATIONS/////////
def extraInvoiceCalc(userAccount):
    total=0
    subTotal=0
    subMonthlyTotal=0
    monthlyTotal=0
    userAccount=UserAccount.objects.filter(id=userAccount.id).first()
    if not userAccount.extraInvoice:
        if not userAccount.country:
            userAccount.country="CA"
        tax,created=Tax.objects.get_or_create(country=userAccount.country,subRegion=userAccount.provState)
        if created:
            tax.save()
        extraInvoice, created = ExtraInvoice.objects.get_or_create(name=userAccount.name,tax=tax)
        if created:
            extraInvoice.save()
            userAccount.extraInvoice=extraInvoice
            userAccount.save()
    else:
        extraInvoice=ExtraInvoice.objects.filter(id=userAccount.extraInvoice.id).first()
        tax=extraInvoice.tax
        if extraInvoice:
           for extraService in userAccount.extraService.all():
               subTotal += extraService.price
               subMonthlyTotal += extraService.monthly
           extraInvoice.subTotal=subTotal
           extraInvoice.subTotalMonthly=subMonthlyTotal
           total=math.ceil(subTotal*(1+ tax.fed/100 + tax.provState/100))
           monthlyTotal=math.ceil(subMonthlyTotal*(1+ tax.fed/100 + tax.provState/100))
           extraInvoice.total=total
           extraInvoice.totalMonthly=monthlyTotal
           extraInvoice.dateEnd=calculateMonthTZ(60)
           extraInvoice.save()
    return 


def addSelectedPackageToUser(user_id,package_id,invoice_id):
    user=User.objects.filter(id=user_id).first()
    userAccount=UserAccount.objects.filter(user=user).first()
    invoice=Invoice.objects.filter(id=invoice_id).first()
    print("invoice in addSelectedPackageToUser ",invoice)
    if user and userAccount:
        package=Package.objects.get(id=package_id)
        products=package.products.all()
        services=package.services.all()
        postServices=package.postServices.all()
        userAccount.product.add(*products)
        userAccount.service.add(*services)
        userAccount.postService.add(*postServices)
        userAccount.invoice=invoice
        userAccount.save()
        

def addProductToNewUser(user_id,extra_kwargs):
    product=Product.objects.filter(extra_kwargs=extra_kwargs).first()
    user=User.objects.get(id=user_id)
    userAccount=UserAccount.objects.filter(user=user).first()
    if userAccount:
        userAccount.product.add(product.id)
        userAccount.save()
        



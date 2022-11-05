from .models import (Product,Service,UserAccount,Invoice,Tax,Package,PostService,PostInvoice,ExtraService,ExtraInvoice,PriceCatelog,Price,Calculator,TempSavedCalculator)
from adminHome.models import Rates
from django.contrib.auth.models import User,Group
import stripe
from django.conf import settings
from datetime import datetime,timedelta,date
import json
import math

"""
REMAINDER FOR CALCULATING INTERESTS FOR 2-YEARS INSTEAD OF 5-YRS, SHOWING THE REMAINDER
(1+int)**5 - (1+int)**2
(1+int)**2 ((1+int)**3 -1)

remainder for (2-5 yrs)
(1+int)**3 -1
"""

def calculateMonth(mon):
    today=date.today()
    days=mon*31
    setdate=timedelta(days=days) + today
    return setdate.strftime("%Y%m%d"),setdate

def calculateMonthTZ(mon):
    today=date.today()
    days=mon*30
    setdate=timedelta(days=days) + today
    return setdate

class Calculate:
    def __init__(self,user_id):
        self.user_id=int(user_id)
        self.user=User.objects.filter(id=self.user_id).first()
        self.userAccount=UserAccount.objects.filter(user=self.user).first()
        if self.userAccount.invoice:
            self.invoice=Invoice.objects.filter(id=self.userAccount.invoice.id).first()
        if  self.userAccount and not self.userAccount.invoice:
            self.tax,created=Tax.objects.get_or_create(country=self.userAccount.country,subRegion=self.userAccount.provState)
            if created:
                self.tax.fed=13
                self.tax.provState=8
                self.tax.save()
            self.invoice,created=Invoice.objects.get_or_create(name=self.userAccount.name,region=self.userAccount.country,tax=self.tax)
            if created:
                self.invoice.subTotal=0
                self.invoice.total=0
                self.invoice.subTotalMonthly=0
                self.invoice.totalMonthly=0
                self.invoice.save()
            self.userAccount.invoice=self.invoice
            self.userAccount.save()
            
            
    def productServiceSubTotal(self):
        if self.user and self.userAccount:
            self.userProducts=self.userAccount.product.all()
            self.userServices=self.userAccount.service.all()
            subTotalProduct=sum([obj.price for obj in self.userProducts])
            subTotalService=sum([obj.price for obj in self.userServices])
            if (subTotalProduct or subTotalService) is not None:
                self.invoice.subTotal=subTotalProduct + subTotalService
                self.invoice.type="price"
                if self.invoice.subTotal >0:
                    self.invoice.name=self.userAccount.name
                    self.invoice.save()
                    return self.invoice.subTotal
        return 0

    def productServiceTotal(self):
        if self.user and self.userAccount:
            subTotal= self.productServiceSubTotal()
            fedTax=(self.invoice.tax.fed/100)*subTotal
            provStateTax=fedTax*(self.invoice.tax.provState/100)
            total=subTotal + fedTax + provStateTax
            self.invoice.total=total
            self.invoice.save()
            return total
        return 0

    def monthlyArrayCalculator(self):
        subTotal= self.productServiceSubTotal()
        fedTax=(self.invoice.tax.fed/100)
        provStateTax=fedTax*(self.invoice.tax.provState/100)
        total=subTotal*(1 + fedTax + provStateTax)
        array=[]
        if total !=0:
            for i in range(1,25):
                total2=int(total*(1.03**2)//i)
                array.append(math.ceil(total2))
            if self.invoice:
                self.invoice.monthlyArray=array
                self.invoice.save()
                return 
        return


    def productServiceSubMonthly(self):
        if self.user and self.userAccount:
            self.invoice.type="monthly"
            self.userProducts=self.userAccount.product.all()
            self.userServices=self.userAccount.service.all()
            subTotalProduct=sum([obj.monthly for obj in self.userProducts])
            subTotalService=sum([obj.monthly for obj in self.userServices])
            self.invoice.subTotalMonthly=subTotalProduct + subTotalService
            if self.invoice.subTotalMonthly >0:
                self.invoice.name=self.userAccount.name
                self.invoice.save()
                return self.invoice.subTotalMonthly
        return 0

    def productServiceMonthly(self):
        if self.user and self.userAccount:
            subTotal= self.productServiceSubMonthly()
            fedTax=(self.invoice.tax.fed/100)
            provStateTax=fedTax*(self.invoice.tax.provState/100)
            total=subTotal*(1 + fedTax + provStateTax)
            self.invoice.totalMonthly=total
            self.invoice.save()
            return total
        return 0

    

    def execute(self):
        self.productServiceMonthly()
        self.productServiceTotal()
        self.monthlyArrayCalculator()
        self.userAccount.save()
        return self.invoice


                
# user_id=5                
# test=Calculate(user_id)
# print(test.monthlyArrayCalculator())
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
            name +=",".join([obj.name[:25] for obj in self.userAccount.product.all()])
        if self.services:
            name+=",".join([obj.name[:25] for obj in self.userAccount.service.all()])
        return name

    
    def descName(self):
        desc=""
        if self.products:
            desc+=",".join([obj.desc[:26] for obj in self.userAccount.product.all()])
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
        if (self.products or self.services) and (self.stripeProduct() and not self.invoice.priceID):
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
        else:
            return self.invoice.priceID

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
        self.years=5
        self.accumInterest=(1 + self.interest)**(self.years)
        self.months= self.years * 12

    def productCalc(self):
        print("PRODUCT EXECUTED")
        for product in self.products:
            product.monthly=product.price * self.accumInterest//self.months
            product.save()

    def serviceCalc(self):
        print("SERVICE EXECUTED")
        for service in self.services:
            service.monthly=service.price * self.accumInterest//self.months
            service.save()

    def postServiceCalc(self):
        print("POST SERVICE EXECUTED")
        for service in self.postServices:
            service.monthly=service.price * self.accumInterest//self.months
            service.save()

    def postExtraServiceCalc(self):
        print("POST SERVICE EXECUTED")
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
        tax=(1 + invoice.tax.fed/100)*(1+invoice.tax.provState/100)
        totalMonthly=math.ceil(invoice.subTotalMonthly * tax)
        totalMonthly=totalMonthly*(1.03)**(5)
        invoice.totalMonthly=totalMonthly
        invoice.numPayment=60
        invoice.paid=True
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
            desc+=",".join([obj.desc[:26] for obj in self.extraServices])
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
                    description=self.descName(),
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
        self.service=Service.objects.all().order_by("id")
        self.postService=PostService.objects.all().order_by("id")
        self.calculate=Calculator.objects.all().order_by("id")
        self.tempSaveCalc=TempSavedCalculator()
        
    def calcServices(self):
        array1=[]
        ids=[]
        total=0
        ans="no"
        for calc in self.calculate:
            if calc.yesno == True:
                ans=calc.ans[len(calc.ans)-1]
                if ans != 'no':
                    monthly=[obj.monthly for obj in calc.services.all()]
                    ids=[obj.id for obj in calc.services.all()]
                    self.tempSaveCalc.serviceIdArr +=ids
                    total+=sum(monthly)
                    summaryArray =[obj.summary for obj in calc.services.all()]
                    serviceNameArray=[obj.name for obj in calc.services.all()]
                    for name,summary in zip(serviceNameArray,summaryArray):
                        array1.append({"name":name,"summary":summary})
        return total , array1

    def calcPostServices(self):
        array1=[]
        ids=[]
        total=0
        ans="no"
        for calc in self.calculate:
            if calc.yesno == True:
                ans=calc.ans[len(calc.ans)-1]
                if ans != 'no':
                    monthly=[obj.monthly for obj in calc.post_services.all()]
                    total+=sum(monthly)
                    ids=[obj.id for obj in calc.post_services.all()]
                    self.tempSaveCalc.postServiceIdArr+=ids
                    summaryArray =[obj.summary for obj in calc.post_services.all()]
                    serviceNameArray=[obj.name for obj in calc.post_services.all()]
                    for name,summary in zip(serviceNameArray,summaryArray):
                        array1.append({"name":name,"summary":summary})
        return total , array1

    def calcWrittenService(self):
        array1=[]
        array2=[{"id":0,"name":"CDN","ans":""},{"id":1,"name":"site","ans":""},{"id":2,"name":"industry","ans":""},{"id":3,"name":"database size","ans":""},{"id":4,"name":"hits"},{"id":5,"name":"type of database","ans":""}]
        ids=[]
        total=0
        monthly=0
        ans="no"
        for calc in self.calculate:
            ans=calc.ans[len(calc.ans)-1]
            if calc.yesno==False:
                for dict in array2:
                    if dict["name"] in calc.Q:
                        dict["ans"]=ans
        for calc in self.calculate:
            for dict in array2:
                if dict["name"] == "hits":
                    if int(dict["ans"]) and int(dict["ans"]) >100:
                        if calc.post_services.all():
                            monthly=[obj.monthly for obj in calc.post_services.all()]
                            total+=sum(monthly)
                            ids=[obj.id for obj in calc.post_services.all()]
                            self.tempSaveCalc.postServiceIdArr+=ids
                            summaryArray =[obj.summary for obj in calc.post_services.all()]
                            serviceNameArray=[obj.name for obj in calc.post_services.all()]
                            for name,summary in zip(serviceNameArray,summaryArray):
                                array1.append({"name":name,"summary":summary})
                        if calc.services.all():
                            monthly=[obj.monthly for obj in calc.services.all()]
                            total+=sum(monthly)
                            ids=[obj.id for obj in calc.services.all()]
                            self.tempSaveCalc.serviceIdArr+=ids
                            summaryArray =[obj.summary for obj in calc.services.all()]
                            serviceNameArray=[obj.name for obj in calc.services.all()]
                            for name,summary in zip(serviceNameArray,summaryArray):
                                array1.append({"name":name,"summary":summary})

                if dict["name"] == "database size":
                    if int(dict["ans"]) and int(dict["ans"]) >64:
                        if calc.post_services.all():
                            monthly=[obj.monthly for obj in calc.post_services.all()]
                            total+=sum(monthly)
                            ids=[obj.id for obj in calc.post_services.all()]
                            self.tempSaveCalc.postServiceIdArr+=ids
                            summaryArray =[obj.summary for obj in calc.post_services.all()]
                            serviceNameArray=[obj.name for obj in calc.post_services.all()]
                            for name,summary in zip(serviceNameArray,summaryArray):
                                array1.append({"name":name,"summary":summary})
        return total,array1
                        
    def calcgetAdditional(self):
        for calc in self.calculate:
            ans=calc.ans[len(calc.ans)-1]
            if calc.yesno==False and "industry" in calc.Q:
                self.tempSaveCalc.additionalCharArr.append(f'industry:{ans}')
            if calc.yesno==False and "site" in calc.Q:
                self.tempSaveCalc.additionalCharArr.append(f'site:{ans}')
            if calc.yesno==False and "type of database" in calc.Q:
                self.tempSaveCalc.additionalCharArr.append(f'db:{ans}')
            if calc.yesno==False and "database MB" in calc.Q:
                self.tempSaveCalc.additionalCharArr.append(f'dbMb:{ans}')
            if calc.yesno==True and "for a company" in calc.Q:
                self.tempSaveCalc.additionalCharArr.append(f'Co:{ans}')
            if calc.yesno==True and "high-tech" in calc.Q:
                self.tempSaveCalc.additionalCharArr.append(f'HTech{ans}')


    def calcCombine(self):
        total= self.calcPostServices()[0] + self.calcServices()[0] 
        array2=self.calcPostServices()[1] + self.calcServices()[1] 
        self.calcgetAdditional()
        self.tempSaveCalc.total=total
        self.tempSaveCalc.save()
        return {"total":total,"data":array2,"uuid":self.tempSaveCalc.uuid}

## ADDING SERVICES TO THE USER ACCOUNT
## THIS EXECUTES AT LOGIN; IT LOADES THE SELECTED SERVICE AND POSTSERVICES INTO USERACCOUNT 
class CalcAddToUserAccountAtLogin:
    def __init__(self,uuid,username):
        self.uuid=uuid
        self.username=username
        self.calcResults=TempSavedCalculator.objects.filter(uuid=self.uuid).first()
        self.user=User.objects.filter(username=self.username).first()
        if self.user:
            self.userAccount=UserAccount.objects.filter(user=self.user).first()
            

    def addServicesToUser(self):
        if self.calcResults and self.userAccount:
            for id in self.calcResults.serviceIdArr:
                getService=Service.objects.get(id=id)
                self.userAccount.service.add(getService)

    def addPostServicesToUser(self):
        if self.calcResults and self.userAccount:
            for id in self.calcResults.postServiceIdArr:
                getPostService=PostService.objects.get(id=id)
                self.userAccount.postService.add(getPostService)

    def execute(self):
        self.addServicesToUser()
        self.addPostServicesToUser()
        if self.uuid and self.userAccount:
            self.userAccount.calcUUID=self.uuid
        self.userAccount.save()


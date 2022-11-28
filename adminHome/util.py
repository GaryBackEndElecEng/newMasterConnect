from my_account.models import *
from .models import SumInvoice,Rates
from datetime import datetime
from .models import *


class StoreAllINvoices:
    def __init__(self,userAccount):
        self.invoice=None
        self.postInvoice=None
        self.extraInvoice=None
        self.userAccount=userAccount
        self.sumInvoice=SumInvoice.objects.filter(name=self.userAccount.name).first()
        if not self.sumInvoice:
            self.sumInvoice=SumInvoice()
        self.sumInvoice.name=userAccount.name
        if(self.userAccount.invoice):
            self.invoice=Invoice.objects.filter(id=self.userAccount.invoice.id).first()
            print("self.invoice",self.invoice)
        if self.userAccount.postInvoice:
            self.postInvoice=PostInvoice.objects.filter(id=self.userAccount.postInvoice.id).first()
        if self.userAccount.extraInvoice:
            self.extraInvoice=ExtraInvoice.objects.filter(id=self.userAccount.extraInvoice.id).first()

    def sumAll(self):
        if self.invoice and self.postInvoice and self.extraInvoice:
            self.sumInvoice.allSubTotal=self.invoice.subTotal + self.postInvoice.subTotal + self.extraInvoice.subTotal
            self.sumInvoice.allSubMonthly=self.invoice.subTotalMonthly + self.postInvoice.subTotalMonthly + self.extraInvoice.subTotalMonthly
            self.sumInvoice.allTotal=self.invoice.total + self.postInvoice.total + self.extraInvoice.total
            self.sumInvoice.allMonthly=self.invoice.totalMonthly + self.postInvoice.totalMonthly + self.extraInvoice.totalMonthly
        elif self.invoice and self.postInvoice:
            self.sumInvoice.allSubTotal=self.invoice.subTotal + self.postInvoice.subTotal
            self.sumInvoice.allSubMonthly=self.invoice.subTotalMonthly + self.postInvoice.subTotalMonthly
            self.sumInvoice.allTotal=self.invoice.total + self.postInvoice.total
            self.sumInvoice.allMonthly=self.invoice.totalMonthly + self.postInvoice.totalMonthly
        elif self.invoice:
            self.sumInvoice.allSubTotal=self.invoice.subTotal
            self.sumInvoice.allSubMonthly=self.invoice.subTotalMonthly
            self.sumInvoice.allTotal=self.invoice.total
            self.sumInvoice.allMonthly=self.invoice.totalMonthly
    def calcTax(self):
        if self.invoice:
            fed_tax=self.invoice.tax.fed/100 * self.sumInvoice.allTotal
            prov_tax=self.invoice.tax.provState/100*self.sumInvoice.allTotal
            self.sumInvoice.fedTax=fed_tax
            self.sumInvoice.provtax=prov_tax

    def getPriceID(self):
        if self.invoice and self.postInvoice and self.extraInvoice:
            self.sumInvoice.allPriceID=[{"priceID":self.invoice.priceID},{"priceID":self.postInvoice.priceID},{"priceID":self.extraInvoice.priceID}]
        elif self.invoice and self.postInvoice:
            self.sumInvoice.allPriceID=[{"priceID":self.invoice.priceID},{"priceID":self.postInvoice.priceID}]
        elif self.invoice:
            self.sumInvoice.allPriceID=[{"priceID":self.invoice.priceID}]

    def getEndDate(self):
        if self.invoice and self.postInvoice and self.extraInvoice:
            date1=datetime.fromisoformat(self.invoice.dateEnd.strftime("%Y-%m-%d"))
            date2=datetime.fromisoformat(self.postInvoice.dateEnd.strftime("%Y-%m-%d"))
            date3=datetime.fromisoformat(self.extraInvoice.dateEnd.strftime("%Y-%m-%d"))
            self.sumInvoice.allDateEnd=[date1,date2,date3]
        elif self.invoice and self.postInvoice:
            date1=datetime.fromisoformat(self.invoice.dateEnd.strftime("%Y-%m-%d"))
            date2=datetime.fromisoformat(self.postInvoice.dateEnd.strftime("%Y-%m-%d"))
            self.sumInvoice.allDateEnd=[date1,date2]
        elif self.invoice:
            date1=datetime.fromisoformat(self.invoice.dateEnd.strftime("%Y-%m-%d"))
            self.sumInvoice.allDateEnd=[date1]

    def getPaidInvoice(self):
        if self.invoice and self.postInvoice and self.extraInvoice:
            self.sumInvoice.allPaidInvoice=[{"paid":self.invoice.paid},{"paid":self.postInvoice.paid},{"endDate":self.extraInvoice.paid}]
        elif self.invoice and self.postInvoice:
            self.sumInvoice.allPaidInvoice=[{"paid":self.invoice.paid},{"paid":self.postInvoice.paid}]
        elif self.invoice:
            self.sumInvoice.allPaidInvoice=[{"paid":self.invoice.paid}]

    def saveTable(self):
        self.sumAll()
        self.calcTax()
        self.getPriceID()
        self.getEndDate()
        self.getPaidInvoice()
        self.sumInvoice.save()

def generateSumInvoice():
    for userAccount in UserAccount.objects.all():
        StoreAllINvoices(userAccount).saveTable()

# generateSumInvoice()

#//////------ CLEAN TASKTRACKERS --------///////

class CleanTaskTracker:
    def __init__(self):
        self.allUsers=User.objects.all()

    def cleanServTaskTracker(self):
        for user in self.allUsers:
            self.userAccount=UserAccount.objects.filter(user=user).first()
            self.userTracker=TaskTracker.objects.filter(user=user).first()
            if self.userTracker and self.userAccount:
                if self.userAccount.invoice:
                    if self.userAccount.invoice.paid ==True:
                        for serviceTracker in self.userTracker.service.all():
                            if len(self.userTracker.service.all())>0:
                                if serviceTracker.Id not in [obj.id for obj in self.userAccount.service.all()]:
                                    if serviceTracker.id != None:
                                        serviceTracker.delete()

    def cleanProdTaskTracker(self):
        for user in self.allUsers:
            self.userAccount=UserAccount.objects.filter(user=user).first()
            self.userTracker=TaskTracker.objects.filter(user=user).first()
            if self.userTracker and self.userAccount:
                if self.userAccount.invoice:
                    if self.userAccount.invoice.paid ==True:
                        for productTracker in self.userTracker.product.all():
                            if len(self.userTracker.product.all()):
                                if productTracker.Id not in [obj.id for obj in self.userAccount.product.all()]:
                                    if productTracker.id != None:
                                        productTracker.delete()


    def cleanPostServTaskTracker(self):
        for user in self.allUsers:
            self.userAccount=UserAccount.objects.filter(user=user).first()
            self.userTracker=TaskTracker.objects.filter(user=user).first()
            if self.userTracker and self.userAccount:
                if self.userAccount.postInvoice:
                    if self.userAccount.postInvoice.paid ==True:
                        for postServTracker in self.userTracker.postService.all():
                            if len(self.userTracker.postService.all())>0:
                                if postServTracker.Id not in [obj.id for obj in self.userAccount.postService.all()]:
                                    if postServTracker.id != None:
                                        postServTracker.delete()


    def cleanExtraServTaskTracker(self):
        for user in self.allUsers:
            self.userAccount=UserAccount.objects.filter(user=user).first()
            self.userTracker=TaskTracker.objects.filter(user=user).first()
            if self.userTracker and self.userAccount:
                if self.userAccount.extraInvoice:
                    if self.userAccount.extraInvoice.paid ==True:
                        for extraServTracker in self.userTracker.extraService.all():
                            if len(self.userTracker.extraService.all())>0:
                                if extraServTracker.Id not in [obj.id for obj in self.userAccount.postService.all()]:
                                    if extraServTracker.id != None:
                                        extraServTracker.delete()

    def removeUserTracker(self):
        for user in self.allUsers:
            self.userAccount=UserAccount.objects.filter(user=user).first()
            self.userTracker=TaskTracker.objects.filter(user=user).first()
            if self.userTracker and self.userAccount:
                if self.userAccount.extraInvoice and self.userAccount.postInvoice and self.userAccount.invoice:
                    check=[self.userAccount.extraInvoice.paid==True and self.userAccount.postInvoice.paid ==True and self.userAccount.invoice == True]
                    if check[0]:
                        extraServs=self.userTracker.extraService.all()
                        postServs=self.userTracker.postService.all()
                        prods=self.userTracker.product.all()
                        servs=self.userTracker.service.all()
                        if len(extraServs)==0 and len(postServs)==0 and len(prods)==0 and len(servs)==0:
                            self.userTracker.delete()

    def executeAll(self):
        self.cleanServTaskTracker()
        self.cleanProdTaskTracker()
        self.cleanPostServTaskTracker()
        self.cleanExtraServTaskTracker()
        self.removeUserTracker()



# test=CleanTaskTracker().executeAll()


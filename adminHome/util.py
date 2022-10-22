from my_account.models import *
from .models import SumInvoice,Rates
from datetime import datetime


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
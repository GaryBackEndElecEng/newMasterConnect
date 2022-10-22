from django.db import models
from django.contrib.postgres.fields import ArrayField
from datetime import datetime

class Rates(models.Model):
    interest=models.IntegerField(default=0,blank=True)
    def __str__(self):
        return f'{self.interest}'

class SumInvoice(models.Model):
    name=models.CharField(max_length=150,blank=True,null=True)
    allSubTotal=models.IntegerField(default=0,null=True,blank=True)
    allSubMonthly=models.IntegerField(default=0,null=True,blank=True)
    allTotal=models.IntegerField(default=0,null=True,blank=True)
    allMonthly=models.IntegerField(default=0,null=True,blank=True)
    fedTax=models.IntegerField(default=0,null=True,blank=True)
    provtax=models.IntegerField(default=0,null=True,blank=True)
    allPriceID=ArrayField(models.CharField(max_length=250,blank=True,null=True),default=list,blank=True)
    allDateEnd=ArrayField(models.DateField(default=datetime.now),default=list,blank=True)
    allPaidInvoice=ArrayField(models.CharField(max_length=70),default=list,blank=True)

    def __str__(self):
        return self.name



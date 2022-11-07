from django.db import models
from django.contrib.postgres.fields import ArrayField
from datetime import datetime
from my_account.models import UserAccount
from django.contrib.auth.models import User

class Rates(models.Model):
    name=models.CharField(max_length=75,blank=True,null=True)
    interest=models.IntegerField(default=0,blank=True)
    def __str__(self):
        return f'{self.name}-{self.interest}'

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
    # allPaidInvoice=ArrayField(models.CharField(max_length=70),default=list,blank=True)

    def __str__(self):
        return self.name

class ServiceTaskTracker(models.Model):
    name=models.CharField(max_length=75,blank=True,null=True)
    user_id=models.IntegerField(blank=True,null=True)
    Id=models.IntegerField(default=0)
    task=models.BooleanField(default=False)
    def __str__(self):
        return self.name

class PostServiceTaskTracker(models.Model):
    name=models.CharField(max_length=75,blank=True,null=True)
    user_id=models.IntegerField(blank=True,null=True)
    Id=models.IntegerField(default=0)
    task=models.BooleanField(default=False)
    def __str__(self):
        return self.name

class ExtraServiceTaskTracker(models.Model):
    name=models.CharField(max_length=75,blank=True,null=True)
    user_id=models.IntegerField(blank=True,null=True)
    Id=models.IntegerField(default=0)
    task=models.BooleanField(default=False)
    def __str__(self):
        return self.name

class ProductTaskTracker(models.Model):
    name=models.CharField(max_length=75,blank=True,null=True)
    user_id=models.IntegerField(blank=True,null=True)
    Id=models.IntegerField(default=0)
    task=models.BooleanField(default=False)
    def __str__(self):
        return self.name

class TaskTracker(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    service=models.ManyToManyField(ServiceTaskTracker,blank=True)
    postService=models.ManyToManyField(PostServiceTaskTracker,blank=True)
    extraService=models.ManyToManyField(ExtraServiceTaskTracker,blank=True)
    product=models.ManyToManyField(ProductTaskTracker,blank=True)
    def __str__(self):
        return self.user.username
    




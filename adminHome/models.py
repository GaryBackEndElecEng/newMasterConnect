from django.db import models
from django.contrib.postgres.fields import ArrayField
from datetime import datetime
from my_account.models import UserAccount
from django.contrib.auth.models import User

class Rates(models.Model):
    name=models.CharField(max_length=75,blank=True,null=True)
    interest=models.IntegerField(default=0,blank=True)
    years=models.IntegerField(default=5)
    def __str__(self):
        return f'{self.name}-{self.interest}'

class UpDateItems(models.Model):
    name=models.CharField(max_length=50,blank=True,null=True)
    update=models.BooleanField(default=False)
    Updated=models.BooleanField(default=False)
    def __str__(self):
        return f'name:{self.name}-update:{self.update}-Updated:{self.Updated}'


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
    
    def __str__(self):
        return self.name
        

class ServiceTaskTracker(models.Model):
    name=models.CharField(max_length=75,blank=True,null=True)
    user_id=models.IntegerField(blank=True,null=True)
    username=models.CharField(max_length=100,blank=True,null=True)
    Id=models.IntegerField(default=0)
    task=models.BooleanField(default=False)
    class Meta:
        ordering=["-user_id","username"]
    def __str__(self):
        return f'{self.name}-{self.username}-{self.task}'

class PostServiceTaskTracker(models.Model):
    name=models.CharField(max_length=75,blank=True,null=True)
    user_id=models.IntegerField(blank=True,null=True)
    username=models.CharField(max_length=100,blank=True,null=True)
    Id=models.IntegerField(default=0)
    task=models.BooleanField(default=False)
    class Meta:
        ordering=["-user_id","username"]
    def __str__(self):
        return f'{self.name}-{self.username}-{self.task}'

class ExtraServiceTaskTracker(models.Model):
    name=models.CharField(max_length=75,blank=True,null=True)
    user_id=models.IntegerField(blank=True,null=True)
    username=models.CharField(max_length=100,blank=True,null=True)
    Id=models.IntegerField(default=0)
    task=models.BooleanField(default=False)
    class Meta:
        ordering=["-user_id","username"]
    def __str__(self):
        return f'{self.name}-{self.username}-{self.task}'


class ProductTaskTracker(models.Model):
    name=models.CharField(max_length=75,blank=True,null=True)
    user_id=models.IntegerField(blank=True,null=True)
    username=models.CharField(max_length=100,blank=True,null=True)
    subTasks=models.CharField(max_length=200,blank=True,null=True)
    Id=models.IntegerField(default=0)
    task=models.BooleanField(default=False)
    class Meta:
        ordering=["-user_id","username"]
    def __str__(self):
        return f'{self.name}-{self.username}-{self.task}'

class TaskTracker(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    service=models.ManyToManyField(ServiceTaskTracker,blank=True)
    postService=models.ManyToManyField(PostServiceTaskTracker,blank=True)
    extraService=models.ManyToManyField(ExtraServiceTaskTracker,blank=True)
    product=models.ManyToManyField(ProductTaskTracker,blank=True)
    def __str__(self):
        return self.user.username
    




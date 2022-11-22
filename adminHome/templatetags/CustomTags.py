from django import template
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User, Group
import datetime
from my_account.models import *
from adminHome.models import *




register = template.Library()

@register.filter(name="prodTrackerTask")
def prodTrackerTask(userAccount,id):
    user_id=userAccount.user.id
    product=Product.objects.get(id=id)
    taskTracker,created=TaskTracker.objects.get_or_create(user=userAccount.user)
    if created:
        taskTracker.save()
    if user_id:
        prodTask, created=ProductTaskTracker.objects.get_or_create(Id=product.id,name=product.name,user_id=user_id,username=userAccount.user.username)
        if created:
            prodTask.save()
            taskTracker.product.add(prodTask)
            taskTracker.save()
        return prodTask.task

@register.filter(name="servTrackerTask")
def servTrackerTask(userAccount,id):
    user_id=userAccount.user.id
    user=User.objects.get(id=user_id)
    service=Service.objects.get(id=id)
    taskTracker,created=TaskTracker.objects.get_or_create(user=user)
    if created:
        taskTracker.save()
    if user_id:
        servTask, created=ServiceTaskTracker.objects.get_or_create(Id=service.id,name=service.name,user_id=user_id,username=user.username)
        if created:
            servTask.save()
            taskTracker.service.add(servTask)
            taskTracker.save()
        return servTask.task

@register.filter(name="postServTrackerTask")
def postServTrackerTask(userAccount,id):
    user_id=userAccount.user.id
    user=User.objects.get(id=user_id)
    service=PostService.objects.get(id=id)
    taskTracker,created=TaskTracker.objects.get_or_create(user=user)
    if created:
        taskTracker.save()
    if user_id:
        servTask, created=PostServiceTaskTracker.objects.get_or_create(Id=service.id,name=service.name,user_id=user_id,username=user.username)
        if created:
            servTask.save()
            taskTracker.postService.add(servTask)
            taskTracker.save()
        return servTask.task

@register.filter(name="extraServTrackerTask")
def extraServTrackerTask(userAccount,id):
    user_id=userAccount.user.id
    user=User.objects.get(id=user_id)
    service=ExtraService.objects.get(id=id)
    taskTracker,created=TaskTracker.objects.get_or_create(user=user)
    if created:
        taskTracker.save()
    if user_id:
        servTask, created=ExtraServiceTaskTracker.objects.get_or_create(Id=service.id,name=service.name,user_id=user_id,username=user.username)
        if created:
            servTask.save()
            taskTracker.extraService.add(servTask)
            taskTracker.save()
        return servTask.task


@register.filter(name="getPackage")
def getPackage(name):
    name2=name
    return name2

#{% if request.user|has_group:"customer" %}
@register.filter(name='has_group') 
def has_group(user, group_name):
    group = Group.objects.filter(name=group_name)
    if group:
        group = group.first()
        if group in user.groups.all():
            return True
    else:
        return False

@register.filter(name="totalSum")
def totalSum(userAccount):
    total=0
    if userAccount.invoice and userAccount.postInvoice and userAccount.extraInvoice:
        total=userAccount.invoice.total + userAccount.postInvoice.total + userAccount.extraInvoice.total
    if userAccount.invoice and userAccount.postInvoice:
        total=userAccount.invoice.total + userAccount.postInvoice.total
    if userAccount.invoice:
        total=userAccount.invoice.total
    return total

@register.filter(name="totalMonthly")
def totalMonthly(userAccount):
    totalMonthly=0
    if userAccount.invoice and userAccount.postInvoice and userAccount.extraInvoice:
        totalMonthly=userAccount.invoice.totalMonthly + userAccount.postInvoice.totalMonthly + userAccount.extraInvoice.totalMonthly
    if userAccount.invoice and userAccount.postInvoice:
        totalMonthly=userAccount.invoice.totalMonthly + userAccount.postInvoice.totalMonthly
    if userAccount.invoice:
        totalMonthly=userAccount.invoice.totalMonthly
    
    return totalMonthly

@register.filter(name='float2')
def format(num):
    str_=''
    if num:
        str_='{:.2f}'.format(num)
    return str_

@register.filter(name='float1')
def format(num):
    str_=''
    if num:
        str_='{:.1f}'.format(num)
    return str_

@register.filter(name='float0')
def format(num):
    str_=''
    if num:
        str_='{:.0f}'.format(num)
    return str_



@register.simple_tag
def current_time(format_string):
    return datetime.datetime.now().strftime(format_string)


@register.inclusion_tag('link.html', takes_context=True)
def jump_link(context):
    return {
        'link': context['home_link'],
        'title': context['home_title'],
    }# allow special links as shown


# @register.filter(name='markdown')
# def markdown_format(text):
#     return markupsafe(markdown.markdown(text))
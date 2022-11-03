
from distutils.log import error
# from msilib.schema import Error
from pyexpat import ErrorString
from unittest.util import strclass
from django.shortcuts import render,get_object_or_404
from django.http import Http404
from django.urls import path
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import request
from rest_framework import status,mixins,generics,viewsets,permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from users.permissions import IsOwnerOrReadOnly
from rest_framework import status,mixins,generics,viewsets,permissions
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from blogPost.models import SectionBlog,ArticleHeader,TitleBlog
from my_account.models import *
# from users.permissions import IsStaffEditorPermission,IsPostPermission
from rest_framework.permissions import AllowAny
from my_account.util import monthlyProductServiceMonthlyPrice,updatePackages,insertLowest_price_in
from .forms import FormUpdate
from .util import generateSumInvoice
from .models import *
from api.models import *
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()

@staff_member_required
def AdminHome(request):
    getFormUpdate=FormUpdate()
    userAccount=UserAccount.objects.all()
    # sumInvoice=SumInvoice.objects.all()
    priceCatelog=PriceCatelog.objects.all().order_by("id")
    service=Service.objects.all().order_by("id")
    postService=PostService.objects.all().order_by("id")
    extraService=ExtraService.objects.all().order_by("id")
    hits=Miscelaneous.objects.all().order_by("-pageCount")
    if request.method == "POST":
        getFormUpdate=FormUpdate(request.POST)
        if getFormUpdate.is_valid():
            updatePackage=getFormUpdate.cleaned_data.get("updatePackage")
            activateLowestPrice=getFormUpdate.cleaned_data.get("activateLowestPrice")
            adjustMonthlyCost=getFormUpdate.cleaned_data.get("adjustMonthlyCost")
            calculateAllInvoices=getFormUpdate.cleaned_data.get("calculateAllInvoices")
            
            if activateLowestPrice == "True":
                insertLowest_price_in()
            if adjustMonthlyCost == "True":
                test= monthlyProductServiceMonthlyPrice()
                test.execute()
            if updatePackage == "True":
                # print("updatePackage")
                updatePackages()
            if calculateAllInvoices == "True":
                print("calculateAllInvoices")
                generateSumInvoice()
            


    context={
        "userAccount":userAccount,"getFormUpdate":getFormUpdate,"sumInvoice":sumInvoice,"service":service,"postService":postService,"extraService":extraService,"priceCatelog":priceCatelog,"hits":hits
    }
    return render(request,'adminHome/home.html',context)


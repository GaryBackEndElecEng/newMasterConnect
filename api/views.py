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
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import request
from rest_framework import status,mixins,generics,viewsets,permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from users.permissions import IsOwnerOrReadOnly
from api.models import (Service,Category,Quote,FAQS,WordSnippet,Region,Miscelaneous,Sponsor,PageFeedback,SiteMap)
from my_account.models import Service,Product
from my_account.models import Tax
from rest_framework import status,mixins,generics,viewsets,permissions
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from .serializers import (PageSerializer,CategorySerializer,RequestQuotePostSerializer,FAQSSerializer,WordSnippetSerializer,RequestPostSerializer,RegionSerializer,ExtraSerializer,MiscSerializer,PostFeedbackSerializer,SiteMapSerializer)
from my_account.serializers import ServiceSerializer,ProductSerializer
# from users.permissions import IsStaffEditorPermission,IsPostPermission
from rest_framework.permissions import AllowAny,IsAuthenticated,SAFE_METHODS,IsAuthenticatedOrReadOnly
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from .util import sendQuoteEmail
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from adminHome.models import ServiceTaskTracker,PostServiceTaskTracker,ExtraServiceTaskTracker,ProductTaskTracker

from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
from datetime import datetime,timedelta

class GetConicalAddress(APIView):
    def get(self,request,format=None):
        frontEnd=request.build_absolute_uri().split("/api/")[0]
        return Response(frontEnd,status=status.HTTP_200_OK)


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def authenticate(self,request):
        user = getattr(request._request,"user",None)
        # self.enforce_csrf(request)
        return  # To not perform the csrf check previously happening

class GoolgeAuth(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client

class MiscelaneousCapture(APIView):
    permission_classes=[AllowAny]
    def get(self,request,format=None):
        miscs=Miscelaneous.objects.all().order_by("page")
        if miscs:
            serializer=ExtraSerializer(miscs,many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PageCountPost(APIView):
    days=1
    authentication_classes=[CsrfExemptSessionAuthentication]
    permission_classes=[AllowAny]
    @csrf_exempt
    def post(self,request,format=None,**kwargs):
        try:
            data=self.request.data
            page=data['page']
            misc=Miscelaneous.objects.filter(page=page).first()
            if not misc:
                misc,created=Miscelaneous.objects.get_or_create(page=page)
                misc.pageCount=1
                misc.save()
            else:
                misc.pageCount += 1
                days=misc.dateHit - misc.firstDate
                # print("NOW",misc.dateHit,"first",misc.firstDate,"Days",days.days)
                if days.days > 0:
                    misc.avg = misc.pageCount/days.days
                misc.save()
            serializer=ExtraSerializer(misc,many=False)
            return Response(serializer.data)
        except Exception as e:
            print("PAGE_COUNT_POST issue",e)
            return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)

class PageCountGet(APIView):
    permission_classes=[AllowAny]
    def get(self,request,format=None):
        try:
            misc=Miscelaneous.objects.all()
            serializer=MiscSerializer(misc,many=True)
            return Response(serializer.data)
        except Exception as e:
            print("PAGE_COUNT_POST issue",e)
            return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)

        
class ServiceList(APIView):
    permission_classes=[AllowAny]
    """ List and create Posts"""
    def get(self,request,format=None):
        posts=Service.objects.all().order_by("id")
        if posts:
            serializer = PageSerializer(posts,many=True)
            # print("PostList-serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class AboutList(APIView):
    permission_classes=[AllowAny]
    """ about List"""
    def get(self,request,format=None):
        try:
            services=Service.objects.all()
            serializer = PageSerializer(services,many=True)
            # print("PostList-serializer",serializer)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error":e,"status":status.HTTP_400_BAD_REQUEST})


class categoryList(APIView):
    permission_classes=[AllowAny]
    """ List """
    def get(self,request,format=None):
        categories=Category.objects.all().order_by("id")
        if categories:
            serializer = CategorySerializer(categories,many=True)
            # print("categoryList-serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PostQuote(APIView):
    permission_classes=[AllowAny]
    @csrf_exempt
    def post(self,request,format=None):
        serializer = RequestQuotePostSerializer(data=request.data)
        # print(serializer)
        if serializer.is_valid(raise_exception=True):
            fullName=serializer.validated_data.get("fullName")
            # print("GET ID",fullName)
            serializer.save()
            sendQuoteEmail(fullName)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class PostRequest(APIView):
    permission_classes=[AllowAny]
    def post(self,request,format=None):
        serializer = RequestPostSerializer(data=request.data)
        # print(serializer)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class FAQSList(APIView):
    permission_classes=[AllowAny]
    """ List """
    def get(self,request,format=None):
        faqs=FAQS.objects.all().order_by("id")
        if faqs:
            serializer = FAQSSerializer(faqs,many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class WordSnippetList(APIView):
    permission_classes=[AllowAny]
    """ for word docs and snippets=> catInstance=instance.catWordSnippet.all()"""
    def get(self,request,format=None):
        wordSnippets=WordSnippet.objects.all().order_by("id","category")
        
        if wordSnippets:
            serializer = WordSnippetSerializer(wordSnippets,many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class GetTax(APIView):
    permission_classes=[AllowAny]
    def get(self,request,format="none"):
        region=Region.objects.all().order_by("country")
        try:
            if region:
                serializer=RegionSerializer(region,many=True)
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response({"error":"empty files", "status":status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE})

        except Exception as e:
            print("api.GetTax=>",e)

#/////////////////- sending service and product////////////////////

class GetServices(APIView):
    permission_classes=[AllowAny]
    def get(self,request,format="none"):
        services=Service.objects.all().order_by("id")
        try:
            if services:
                serializer=ServiceSerializer(services,many=True)
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response({"error":"empty files", "status":status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE})

        except Exception as e:
            print("api.GetTax=>",e)

#NOT USING
class GetProducts(APIView):
    permission_classes=[AllowAny]
    def get(self,request,format="none"):
        products=Service.objects.all().order_by("id")
        try:
            if products:
                serializer=ProductSerializer(products,many=True)
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response({"error":"empty files", "status":status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE})

        except Exception as e:
            print("api.GetTax=>",e)

class GetSiteMap(APIView):
    permission_classes=[AllowAny]
    def get(self,request,format="none"):
        sitemaps=SiteMap.objects.all().order_by("id")
        try:
            if sitemaps:
                serializer=SiteMapSerializer(sitemaps,many=True)
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response({"error":"empty files", "status":status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE})

        except Exception as e:
            print("sitemaps=>",e)

class PostPageFeedback(APIView):
    permission_classes=[AllowAny]
    def post(self,request,format=None):
        data=request.data
        category,created=Category.objects.get_or_create(section="feedback")
        if created:
            category.name="feedback"
            category.save()
        if data:
            newPageFb=PageFeedback(
                name=data["name"],
                category=category,
                email=data["email"] or "None",
                page=data["page"],
                comment=data["comment"],
                rating =int(data["rating"])
            )
            newPageFb.save()
            print(newPageFb)
            serializer = PostFeedbackSerializer(newPageFb,many=False)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



    

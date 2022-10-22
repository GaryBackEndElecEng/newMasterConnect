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
from rest_framework import status,mixins,generics,viewsets,permissions
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from blogPost.models import SectionBlog,ArticleHeader,TitleBlog
from .serializers import BlogCategorySerializer,ArticleHeaderSerializer
# from users.permissions import IsStaffEditorPermission,IsPostPermission
from rest_framework.permissions import AllowAny
# from users import utils

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


class BlogPost(APIView):
    permission_classes=[AllowAny]
    """ Main Blog Posts"""
    def get(self,request,format=None):
        blogs=TitleBlog.objects.all()
        print("blog",blogs)
        if blogs:
            serializer = BlogCategorySerializer(blogs,many=True)
            # print("PostList-serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class Articles(APIView):
    permission_classes=[AllowAny]
    """ Main Blog Posts"""
    def get(self,request,format=None):
        articles=ArticleHeader.objects.all()
        # print("blog",articles)
        if articles:
            serializer = ArticleHeaderSerializer(articles,many=True)
            # print("PostList-serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

def AdminHome(request):

    context={

    }
    return render(request,'blogAdmin/home.html',context)


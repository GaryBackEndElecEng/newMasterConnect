from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
#/api/blog/admin
urlpatterns=[
    path('',views.BlogPost.as_view(),name="blog-view"),
    path('articles/',views.Articles.as_view(),name="Articles-view"),
    path('admin/',views.AdminHome,name="adminHome-view"),
]
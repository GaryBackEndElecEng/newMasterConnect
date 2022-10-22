from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

app_name="adminHome"
urlpatterns=[
    path('',views.AdminHome,name="adminHome-view"),
]
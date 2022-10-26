from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from . import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

app_name="adminHome"
urlpatterns=[
    path('',views.AdminHome,name="adminHome-view"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns +=static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
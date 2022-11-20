from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from .import views
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
#FAQSList,PostRequest
app_name="api"

urlpatterns=[
    path('',views.ServiceList.as_view(),name="ServiceList-view"),
    path('category/',views.categoryList.as_view(),name="getCategories"),
    path('FAQS/',views.FAQSList.as_view(),name="FAQSList-view"),
    path('about/',views.AboutList.as_view(),name="About"),
    path('wordSnippet/',views.WordSnippetList.as_view(),name="wordSnippet-view"),
    path('post/',views.PostQuote.as_view(),name="postQuoteCreate"),
    path('postRequest/',views.PostRequest.as_view(),name="postRequestCreate"),
    path('region/',views.GetTax.as_view(),name="postRequestCreate"),
    path('miscelaneous/',views.MiscelaneousCapture.as_view(),name="miscelaneousCapture-get"),
    path('pageCount/',views.PageCountPost.as_view(),name="pageCounte-post"),
    path('pageCountGet/',views.PageCountGet.as_view(),name="pageCount-get"),

    path('GetServices/',views.GetServices.as_view(),name="GetServices-post"),
    path('GetProducts/',views.GetProducts.as_view(),name="GetProducts-post"),

    path('postPageFeedback/',views.PostPageFeedback.as_view(),name="postPageFeedback-post"),
    path('getSitemap/',views.GetSiteMap.as_view(),name="getSitemap-view"),
    
   
]
urlpatterns = format_suffix_patterns(urlpatterns)
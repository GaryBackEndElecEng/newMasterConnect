from django.shortcuts import render,get_object_or_404
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
from django.contrib.sitemaps import Sitemap
from django.contrib.sites.models import Site
from django.conf import settings
from django.conf.urls.static import static
from api.models import SiteMap


def main(request):
    getStatic=static(settings.STATIC_URL,document_root=settings.TEST_DIR)
    print("STATIC_URL",settings.STATIC_URL)
    return render(request,"index.html")

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'build/static', filename)
        print("path",path)
        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()

class SiteMap_(Sitemap):
    
    sites=Site.objects.all()
    for site in sites:
        if(site.domain == "www.master-connect.ca"):
            settings.SITE_ID=int(site.id)
    def items(self):
        return SiteMap.objects.all()

    def lastmod(self,obj):
        return obj.lastmod

    def changefreq(self,obj):
        return obj.changefreq

    def priority(self,obj):
        return obj.priority/10

    def location(self,obj):
        return obj.loc

class SiteMap_mastercom(Sitemap):
    
    sites=Site.objects.all()
    for site in sites:
        if(site.domain == "www.master-connect.com"):
            settings.SITE_ID=int(site.id)
    def items(self):
        return SiteMap.objects.all()

    def lastmod(self,obj):
        return obj.lastmod

    def changefreq(self,obj):
        return obj.changefreq

    def priority(self,obj):
        return obj.priority/10

    def location(self,obj):
        return obj.loc

class SiteMap_masterconnect(Sitemap):
    
    sites=Site.objects.all()
    for site in sites:
        if(site.domain == "www.masterconnect.ca"):
            settings.SITE_ID=int(site.id)
    def items(self):
        return SiteMap.objects.all()

    def lastmod(self,obj):
        return obj.lastmod

    def changefreq(self,obj):
        return obj.changefreq

    def priority(self,obj):
        return obj.priority/10

    def location(self,obj):
        return obj.loc
    

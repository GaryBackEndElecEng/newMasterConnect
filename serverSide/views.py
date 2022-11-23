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
    
    def site_url(self):
        sites=Site.objects.all()
        for site in sites:
            if(site.domain == "www.master-connect.ca"):
                settings.SITE_ID=int(site.id)
            elif(site.domain=="newmasterconnect.herokuapp.com"):
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
    
    def site_url(self):
        sites=Site.objects.all()
        for site in sites:
            if(site.domain == "www.master-connect.com"):
                settings.SITE_ID=int(site.id)
            elif(site.domain=="newmasterconnect.herokuapp.com"):
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
    
    def site_url(self):
        sites=Site.objects.all()
        for site in sites:
            if(site.domain == "www.masterconnect.ca"):
                settings.SITE_ID=int(site.id)
            elif(site.domain=="newmasterconnect.herokuapp.com"):
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

def robot(request):
    context={"robot":
    "User-agent: * \
        Disallow: /cgi-bin/ \
        Disallow: /junk/     \
        Disallow: /MyAccount  \
        Disallow: /MyAccount/postAccount\
        Disallow: /MyAccount/success\
        Disallow: /MyAccount/successPost\
        Disallow: /MyAccount/successExtra\
        Disallow: /adminHome/\
        Disallow: /ckeditor/\
        Disallow: /dj-rest-auth/\
        sitemap:https://www.masterconnect.ca/sitemap.xml_masterconnect-ca/\
        sitemap:https://www.master-connect.ca/sitemap.xml_master-connect-ca/\
        sitemap:https://www.master-connect.com/sitemap.xml_master-connect-com/"
    }
    return HttpResponse(context["robot"])
    

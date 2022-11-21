from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings
from django.contrib.sites.models import Site
# this feeds the DEFAULT_FILE_STORAGE=> MEDIA in settings
class MediaStore(S3Boto3Storage):
    location ='media'
    default_acl = 'public-read'
    file_override = False
    custom_domaine = False

def site_url(request):
        sites=Site.objects.all()
        for site in sites:
            if(site.domain == "www.masterconnect.ca"):
                settings.SITE_ID=int(site.id)
                settings.SITE_URL="https://www.masterconnect.ca"
                return {"SITE_ID":settings.SITE_ID,"SITE_URL":settings.SITE_URL}
            elif(site.domain=="newmasterconnect.herokuapp.com"):
                settings.SITE_ID=int(site.id)
                settings.SITE_URL="https://newmasterconnect.herokuapp.com"
                return {"SITE_ID":settings.SITE_ID,"SITE_URL":settings.SITE_URL}
            elif(site.domain=="www.master-connect.com"):
                settings.SITE_ID=int(site.id)
                settings.SITE_URL="https://www.master-connect.com"
                return {"SITE_ID":settings.SITE_ID,"SITE_URL":settings.SITE_URL}
            elif(site.domain=="www.master-connect.ca"):
                settings.SITE_ID=int(site.id)
                settings.SITE_URL="https://www.master-connect.ca"
                return {"SITE_ID":settings.SITE_ID,"SITE_URL":settings.SITE_URL}
            else:
                settings.SITE_URL="http://localhost:8000"
                return
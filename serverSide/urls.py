from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
# from api.views import Assets 
from django.conf import settings
from django.contrib.sitemaps import GenericSitemap
from django.contrib.sitemaps import views as sitemapView
from django.contrib.sitemaps.views import sitemap
from django.views.decorators.cache import cache_page
from django.views.static import serve
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.sites.models import Site
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from api.models import SiteMap

# print([item for item in GenericSitemap(info_dict).items()])
from .views import main,Assets,SiteMap_,SiteMap_mastercom,SiteMap_masterconnect,robot
from . import views
urlpatterns = [
    path('robots.txt',views.robot),
    path('googlecc372f98e6bf9e30.html',views.googleSiteVerify),
    path('api/token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('admin/', admin.site.urls),
    path('api/', include("api.urls", namespace='api')),
    path('api/account/', include("my_account.urls", namespace='my_account')),
    path('api/blog/', include("blogPost.urls")),
    path('adminHome/', include("adminHome.urls",namespace="adminHome")),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('accounts/', include('allauth.urls')),
    path('sitemap.xml_master-connect-ca/',(cache_page(None))(sitemap),{'sitemaps':{"sitemaps":SiteMap_}},name='django.contrib.sitemaps.views.sitemap'),
    path('sitemap.xml_master-connect-com/',(cache_page(None))(sitemap),{'sitemaps':{"SiteMap":SiteMap_mastercom}},name='django.contrib.sitemaps.views.sitemap'),
    path('sitemap.xml_masterconnect-ca/',(cache_page(None))(sitemap),{'sitemaps':{"SiteMap":SiteMap_masterconnect}},name='django.contrib.sitemaps.views.sitemap'),
    # path('sitemap.xml2/',sitemap,{'sitemaps':{"sitemap":genSitemaps}},name='django.contrib.sitemaps.views.sitemap'),
    re_path(r'^static/(?P<path>.*)$', serve),
    re_path(r'.*',main),
    # path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls'))
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns +=static(settings.STATIC_URL, document_root=settings.TEST_DIR)


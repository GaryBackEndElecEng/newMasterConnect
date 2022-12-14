from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
main=TemplateView.as_view(template_name="index.html")

urlpatterns = [
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
    re_path('.*',main)
    # path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls'))
    
]


"""
Django settings for serverSide project.

Generated by 'django-admin startproject' using Django 4.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os
from datetime import timedelta
from django.conf import settings



# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY1 = 'django-insecure-np3p#sz9-cu=nv*h27jqj^%y1t_6xpc0zom^b7u-&atwb_mlr2'
SECRET_KEY = os.environ.get('SECRET_KEY_newMaster',SECRET_KEY1)


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG',"False") == "True"

ALLOWED_HOSTS = ['http://localhost:8000','http://localhost:3000','localhost',"newmasterconnect.herokuapp.com","herokuapp.com","master-connect.ca"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.messages',
    'django.contrib.sites',
    'rest_framework_simplejwt.token_blacklist', # adding this requires migrations
    'django.contrib.contenttypes',
    'django.contrib.postgres',
    "dj_rest_auth",
    'django_filters',
    "ckeditor",'ckeditor_uploader',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework.authtoken',
    'corsheaders',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
    "api.apps.ApiConfig",
    "my_account",
    "blogPost.apps.BlogpostConfig",
    "adminHome.apps.AdminhomeConfig",
    "import_export",
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    # "dj_rest_auth.registration"
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.instagram',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "corsheaders.middleware.CorsPostCsrfMiddleware",
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "django.middleware.common.CommonMiddleware",
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
   
]
AUTHENTICATION_BACKENDS = [
   
    'django.contrib.auth.backends.ModelBackend',

    
    'allauth.account.auth_backends.AuthenticationBackend',
    
]

ROOT_URLCONF = 'serverSide.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build'),
                 os.path.join(BASE_DIR, 'templates'),

                ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'serverSide.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE':'django.db.backends.postgresql',
        'NAME':'newmasterconnect2',
        'USER':'postgres',
        'PASSWORD':'JamieIs12',
        'HOST':'LOCALHOST',
        'PORT':'5432',
        'CONN_MAX_AGE':600,
    },
}
# import dj_database_url
# newMasterdb=dj_database_url.config(conn_max_age=500)
# DATABASES['default'].update(newMasterdb)

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_PERMISSION_CLASSES':[
        'rest_framework.permissions.AllowAny',
        # 'rest_framework.permissions.IsAuthenticatedOrReadOnly',
        # 'rest_framework.permissions.IsAdminUser'
    ],
    "DEFAULT_AUTHENTICATION_CLASSES":[
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        
        
    ],
    'DEFAULT_SCHEMA_CLASS':'django_filters.rest_framework.DjangoFilterBackend',
    'DEFAULT_SCHEMA_CLASS':'rest_framework.schemas.coreapi.AutoSchema'
}
#Permissions: Project LEVEL
#AllowAny
#IsAuthenticated
#IsAdminUser=>isSuperUser
#IsAuthenticatedOrReadOnly
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False, # if True=> refresh_token generated with access_token @ /token/refresh/
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False, #updated when TokenObtainPairView is used

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer', ),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=60),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}


CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://newmasterconnect.herokuapp.com",
    "https://checkout.stripe.com"
]


CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "X-CSRFToken",
    "x-requested-with",
    'Access-Control-Allow-Origin',
]
# CORS_ALLOW_CREDENTIALS: bool
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000","https://checkout.stripe.com","http://127.0.0.1:3000","https://newmasterconnect.herokuapp.com",]
CSRF_COOKIE_NAME = "csrftoken"
CSRF_HEADER_NAME="X_CSRFToken"
# ACCESS_CONTROL_ALLOW_HEADERS="*"

#--////////////--------------SOCIAL NETWORKS--------------------////////////////////////#
REST_USE_JWT = True
JWT_AUTH_COOKIE = 'access_token'
JWT_AUTH_REFRESH_COOKIE = 'refresh_token'
SOCIALACCOUNT_PROVIDERS={
    'google':{
        'SCOPE':[
            'profile',
            'email',
        ],
        'AUTH_PARAMS':{
            'access_type':'online',
        }
    },
    'facebook': {
        'LOCALE_FUNC': lambda request: 'en_US'
    },
    'instagram':{
        'client_id':'306375078130326',
        # 'redirect_uri':'https://www.master-connect.ca',
        'code':'code',
        'SCOPE':[
            'user_profile','user_media'
        ],
            'AUTH_PARAMS':{'auth_type': 'reauthenticate'}
    },
    
}
#--////////////------------END--SOCIAL NETWORKS--------------------////////////////////////#

#--////////////--------------STRIPE-------------------////////////////////////#
# STRIPE_LIVE_MODE = False  # Change to True in production
STRIPE_WEBHOOK_SECRET = 'whsec_C4lZl04E6ErVep2QhBzvVqxx2aYsYxjP'  #whsec_C4lZl04E6ErVep2QhBzvVqxx2aYsYxjP Get it from the section in the Stripe 
# #STRIPE_LIVE_SECRET_KEY = os.environ.get("STRIPE_LIVE_SECRET_KEY", "<your secret key>")
STRIPE_TEST_SECRET_KEY =os.environ.get("NEW_STRIPE_SECRET_TEST_KEY")
STRIPE_PUBLIC_KEY = os.environ.get("NEW_STRIPE_PUBLIC_TEST_KEY")
STRIPE_SECRET_KEY = os.environ.get("STRIPE_SECRET_TEST_KEY")
STRIPE_PUBLIC_KEY = "pk_test_51LhEO0DeW5nEzo25iVgmGlWUD9RmC3Eh32h9ALgT9OScLfYIiAzelvyKQNS6lxbZP36HiI4pzPDKpjp1QeAoz4I300dLnItvBl"
STRIPE_SECRET_KEY = "sk_test_51LhEO0DeW5nEzo25yBzcZXGZdlENrlRMCW43yb5Wl7cJ0c2ZhTEb50eDit4LZkcThZretAESPyci0HjBS8VZBbTL00vOmGxCiW"
# STRIPE_SECRET_KEY = "whsec_C4lZl04E6ErVep2QhBzvVqxx2aYsYxjP"
SITE_URL="https://newmasterconnect.herokuapp.com"
#--////////////--------------STRIPE--------------------////////////////////////#

#-----////////////// ---STATIC FILES ------/////////////#
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
STATIC_ROOT =os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS=[
    os.path.join(BASE_DIR,'build/static'),
    os.path.join(BASE_DIR,'adminHome/static'),
    
]
#-------////////// EMAIL ////////////--------#
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_STARTTLS = True
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_PASSWORD=os.environ.get('EMAIL_HOST_PASSWORD')
EMAIL_HOST_USER=os.environ.get('EMAIL_HOST_USER')
#----///////AWS////--------------#
AWS_ACCESS_KEY_ID=os.environ.get('AWS_ACCESS_KEY_ID_CONNECT')
AWS_SECRET_ACCESS_KEY=os.environ.get('AWS_SECRET_ACCESS_KEY_CONNECT')
AWS_USER=os.environ.get('MASTER-CONNECT-USER')
AWS_STORAGE_BUCKET_NAME='new-master'
AWS_STORAGE_BUCKET_CNAME = 'static.master-connect.com'
AWS_S3_REGION_NAME='ca-central-1'
S3_USE_SIGV4 = True
AWS_S3_SIGNATURE_VERSION = "s3v4" 
AWS_S3_ADDRESSING_STYLE = "path"
AWS_S3_FILE_OVERWRITE = False
AWS_DEFAULT_ACL = 'public-read'
AWS_LOCATION='static'
AWS_MEDIA_LOCATION = 'media'
#DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage' # for media
DEFAULT_FILE_STORAGE = 'serverSide.storages.MediaStore'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'
AWS_S3_CUSTOM_DOMAIN = '%s.s3.ca-central-1.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_MEDIA_LOCATION}/'

#--- FACEBOOK- GOOGLE-----//////////////////////
SITE_ID = 1
SOCIALACCOUNT_PROVIDERS={
    'google':{
        'SCOPE':[
            'profile',
            'email',
        ],
        'AUTH_PARAMS':{
            'access_type':'online',
        }
    },
    'facebook': {
        'LOCALE_FUNC': lambda request: 'en_US'
    },
    'instagram':{
        'client_id':'306375078130326',
        # 'redirect_uri':'https://www.master-connect.ca',
        'code':'code',
        'SCOPE':[
            'user_profile','user_media'
        ],
            'AUTH_PARAMS':{'auth_type': 'reauthenticate'}
    },
    
}
#-----///////////-----ckeditor-------/////////
# CKEDITOR_BASEPATH = "/static/ckeditor/ckeditor/"
CKEDITOR_UPLOAD_PATH = "uploads/"
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'height': 300,
        'width': 900,
    },
}
import django_heroku
django_heroku.settings(locals(),staticfiles=False)
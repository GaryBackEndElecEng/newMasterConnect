"""
Production Settings for Heroku
"""

import environ

# If using in your own project, update the project namespace below
from serverSide.settings.base import *

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)

# False if not in os.environ
DEBUG = env('DEBUG')

# Raises django's ImproperlyConfigured exception if SECRET_KEY not in os.environ
SECRET_KEY = env('SECRET_KEY')

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')
CORS_ALLOWED_ORIGINS= env.list("CORS_ALLOWED_ORIGINS")
CORS_URLS_REGEX = env("CORS_URLS_REGEX")
CORS_ALLOW_METHODS = env.list("CORS_ALLOW_METHODS")
CORS_ALLOW_HEADERS = env.list("CORS_ALLOW_HEADERS")
CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS")
CSRF_COOKIE_NAME = env("CSRF_COOKIE_NAME")
CSRF_HEADER_NAME= env("CSRF_HEADER_NAME")
STRIPE_WEBHOOK_SECRET=env("STRIPE_WEBHOOK_SECRET")
STRIPE_PUBLIC_KEY = env("STRIPE_PUBLIC_KEY")
STRIPE_SECRET_KEY = env("STRIPE_SECRET_KEY")
EMAIL_HOST_PASSWORD=env("EMAIL_HOST_PASSWORD")
EMAIL_HOST_USER=env("EMAIL_HOST_USER")
AWS_ACCESS_KEY_ID= env("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")
AWS_USER = env("AWS_USER")
AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME")
AWS_STORAGE_BUCKET_CNAME = env("AWS_STORAGE_BUCKET_CNAME")

# Parse database connection url strings like psql://user:pass@127.0.0.1:8458/db
DATABASES = {
    # read os.environ['DATABASE_URL'] and raises ImproperlyConfigured exception if not found
    'default': env.db(),
}
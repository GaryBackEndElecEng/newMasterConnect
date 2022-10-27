"""
Production Settings for Heroku
"""

import environ
import os

# If using in your own project, update the project namespace below
from serverSide.settings.base import *
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)

# False if not in os.environ
DEBUG = env('DEBUG')

# Raises django's ImproperlyConfigured exception if SECRET_KEY not in os.environ
SECRET_KEY = env('SECRET_KEY')

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')
CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS")
STRIPE_WEBHOOK_SECRET=env("STRIPE_WEBHOOK_SECRET")
STRIPE_PUBLIC_KEY = env("STRIPE_PUBLIC_KEY")
STRIPE_SECRET_KEY = env("STRIPE_SECRET_KEY")
EMAIL_HOST_PASSWORD=env("EMAIL_HOST_PASSWORD")
EMAIL_HOST_USER=env("EMAIL_HOST_USER")
AWS_ACCESS_KEY_ID= env("AWS_ACCESS_KEY_ID_CONNECT")
AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY_CONNECT")


# Parse database connection url strings like psql://user:pass@127.0.0.1:8458/db
DATABASES = {
    # read os.environ['DATABASE_URL'] and raises ImproperlyConfigured exception if not found
    'default': env.db(),
}
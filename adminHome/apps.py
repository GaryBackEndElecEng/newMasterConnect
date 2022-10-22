from django.apps import AppConfig



class AdminhomeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'adminHome'

    def ready(self):
        import adminHome.signals
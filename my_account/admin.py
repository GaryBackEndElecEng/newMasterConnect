from django.contrib import admin
from .models import (PriceCatelog,Price,UserAccount,Product,Service,Tax,Invoice,Option,Package,PostInvoice,PostService,ExtraService,ExtraInvoice,Calculator,TempSavedCalculator,Jobs,SitePreference)
from import_export import resources
from import_export.admin import ImportExportModelAdmin 
from import_export.admin import ImportExportActionModelAdmin

@admin.register(PriceCatelog,Price,UserAccount,Product,Service,Tax,Invoice,Option,Package,PostInvoice,PostService,ExtraService,ExtraInvoice,Calculator,TempSavedCalculator,Jobs,SitePreference)
class ViewAdmin(ImportExportActionModelAdmin):
    pass

class ViewAdmin(ImportExportModelAdmin):
    pass


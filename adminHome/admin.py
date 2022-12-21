from django.contrib import admin
from .models import Rates,SumInvoice,ServiceTaskTracker,PostServiceTaskTracker,ExtraServiceTaskTracker,ProductTaskTracker,TaskTracker,UpDateItems
from import_export import resources
from import_export.admin import ImportExportModelAdmin 
from import_export.admin import ImportExportActionModelAdmin

@admin.register(Rates,SumInvoice,ServiceTaskTracker,PostServiceTaskTracker,ExtraServiceTaskTracker,ProductTaskTracker,TaskTracker,UpDateItems)
class ViewAdmin(ImportExportActionModelAdmin):
    pass

class ViewAdmin(ImportExportModelAdmin):
    pass


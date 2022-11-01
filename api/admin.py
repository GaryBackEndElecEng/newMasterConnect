from django.contrib import admin
from .models import Category,Service,Quote,FAQS,WordSnippet,Request,Region,Miscelaneous,GeneralInfo,Sponsor,ImageField,PageFeedback
from import_export import resources
from import_export.admin import ImportExportModelAdmin 
from import_export.admin import ImportExportActionModelAdmin

@admin.register(Category,Service,Quote,FAQS,WordSnippet,Request,Region,Miscelaneous,GeneralInfo,Sponsor,ImageField,PageFeedback)
class ViewAdmin(ImportExportActionModelAdmin):
    pass

class ViewAdmin(ImportExportModelAdmin):
    pass

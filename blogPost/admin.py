from django.contrib import admin
from .models import SectionBlog,TitleBlog,Article,ArticleHeader
from import_export import resources
from import_export.admin import ImportExportModelAdmin 
from import_export.admin import ImportExportActionModelAdmin

@admin.register(TitleBlog,SectionBlog,Article,ArticleHeader)
class ViewAdmin(ImportExportActionModelAdmin):
    pass

class ViewAdmin(ImportExportModelAdmin):
    pass

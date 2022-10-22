from django.db import models
from django.contrib.auth.models import User, Group
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from datetime import datetime,date
from django.contrib.postgres.fields import ArrayField
import uuid,math
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField
from django.db.models.signals import post_save
from django.utils import timezone
from django.conf import settings
import os
# media = os.path.join(settings.BASE_DIR, 'media')

class SectionBlog(models.Model):
    sectionImage=models.CharField(max_length=175,default="",blank=True,null=True)
    imageSection = models.FileField(upload_to="blog",default = '',blank=True,null=True)
    section=models.CharField(max_length=100,blank=True,null=True)
    summary=RichTextUploadingField(blank=True,null=True)
    subSection=models.CharField(max_length=100,blank=True,null=True)
    content = RichTextUploadingField(blank=True,null=True)
    subSection1=models.CharField(max_length=100,blank=True,null=True)
    content1=RichTextUploadingField(blank=True,null=True)
    subSection2=models.CharField(max_length=100,blank=True,null=True)
    content2=RichTextUploadingField(blank=True,null=True)
    date=models.DateField(default=timezone.now)

    def __str__(self):
        return self.section

class TitleBlog(models.Model):
    sectionBlog = models.ManyToManyField(SectionBlog, blank=True)
    title=models.CharField(max_length=100,blank=True,null=True)
    intro=RichTextUploadingField(blank=True,null=True)
    mainImage=models.CharField(max_length=175,default="",blank=True,null=True)
    imageMain = models.FileField(upload_to="blog",default = '',blank=True,null=True)
    show=models.BooleanField(default=False)
    def __str__(self):
        return self.title

class Article(models.Model):
    section=models.CharField(max_length=150,blank=True,null=True)
    imageSection = models.FileField(upload_to="blog",default = '',blank=True,null=True)
    summary=RichTextUploadingField(blank=True,null=True)
    subSection=models.CharField(max_length=100,blank=True,null=True)
    content=RichTextUploadingField(blank=True,null=True)
    subSection1=models.CharField(max_length=100,blank=True,null=True)
    content1=RichTextUploadingField(blank=True,null=True)
    subSection2=models.CharField(max_length=100,blank=True,null=True)
    content2=RichTextUploadingField(blank=True,null=True)
    date=models.DateField(default=timezone.now)

    def __str__(self):
        return self.section

class ArticleHeader(models.Model):
    title=models.CharField(max_length=150,blank=True,null=True)
    article=models.ManyToManyField(Article,blank=True,)

    def __str__(self):
        return self.title

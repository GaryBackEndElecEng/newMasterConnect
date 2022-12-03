from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save, pre_save
from datetime import datetime,timedelta

class Miscelaneous(models.Model):
    page=models.CharField(max_length=40,null=True,blank=True)
    pageCount=models.IntegerField(default=0,null=True)
    avg=models.IntegerField(default=1,null=True,blank=True)
    dateHit=models.DateTimeField(auto_now=True)
    firstDate=models.DateTimeField(default=datetime.now)

    def __str__(self):
        return f'{self.page}-{self.pageCount}'



CATEGORIES=(("contact","contact"),("about","about"),("home","home"),("article","article"),("bio","bio"),("main","main"),("footer","footer"),("GeneralInfo","GeneralInfo"),("sponsor","sponsor"),("designs","designs"),("policy","policy"),("feedback","feedback"),("customTemplate","customTemplate"),)
SECTION_TYPE=(('allServices','allServices'),('supplemental','supplemental'),('works','works'),('advert','advert'),('main','main'),('general','general'),('restriction','restriction'),('warning','warning'),)
class Category(models.Model):
    section=models.CharField(max_length=200,choices=CATEGORIES,default="main")
    name=models.CharField(max_length=200,blank=True)
    def __str__(self):
        return f'{self.name}-{self.section}'

class ImageField(models.Model):
    name=models.CharField(max_length=50,null=True,blank=True)
    category=models.ForeignKey(Category,related_name="imageCategory",on_delete=models.CASCADE)
    image=models.CharField(max_length=300,null=True,blank=True)
    class Meta:
        ordering= ("id","name",)

    def __str__(self):
        return self.name


class Sponsor(models.Model):
    name=models.CharField(max_length=75,null=True)
    category=models.ForeignKey(Category,related_name="categorySponsor",on_delete=models.CASCADE)
    logo=models.CharField(max_length=300,null=True,blank=True)
    site=models.CharField(max_length=150,null=True,blank=True)

    def __str__(self):
        return self.name

class GeneralInfo(models.Model):
    name=models.CharField(max_length=75,null=True)
    address=models.CharField(max_length=200,null=True)
    cell=models.CharField(max_length=200,null=True)
    city=models.CharField(max_length=200,default="Richmod Hill")
    country=models.CharField(max_length=200,null=True)
    provState=models.CharField(max_length=200,null=True)
    postal=models.CharField(max_length=50,null=True,default="L4C-1K8")
    extra=models.CharField(max_length=200,null=True)
    siteArray=ArrayField(models.JSONField(),default=list)
    category=models.ForeignKey(Category,related_name="categoryGeneralInfo",on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}-{self.category}'

class Service(models.Model):
    title=models.CharField(max_length=200,blank=True)
    category=models.ForeignKey(Category,related_name="categories",on_delete=models.CASCADE)
    section=models.CharField(max_length=200,choices=SECTION_TYPE,blank=True)
    subSection=models.CharField(max_length=200,blank=True)
    summary=models.TextField(null=True)
    content=models.TextField(blank=True)

    def __str__(self):
        return f'{self.title}-{self.category.section}'

class Quote(models.Model):
    fullName=models.CharField(max_length=200,blank=True)
    email=models.EmailField(blank=True)
    cell=models.CharField(max_length=100,blank=True)
    coName=models.CharField(max_length=200,blank=True)
    coSite=models.CharField(max_length=200,blank=True)
    content=models.TextField(blank=True)
    promotion=models.BooleanField(default=False)
    preferredComms=models.CharField(max_length=50,default="email",blank=True)
    emailSent=models.BooleanField(default=False)
    sendThemEmail=models.BooleanField(default=False)
    answer=models.TextField(blank=True,null=True)
    sendToFAQ=models.BooleanField(default=False)
    FAQYes=models.BooleanField(default=False)

    def __str__(self):
        return self.fullName

class Request(models.Model):
    fullName=models.CharField(max_length=200,blank=True)
    email=models.EmailField(blank=True)
    content=models.TextField(blank=True)
    promotion=models.BooleanField(default=False)

    def __str__(self):
        return self.fullName

class FAQS(models.Model):
    question=models.CharField(max_length=200,blank=True)
    category=models.ForeignKey(Category,related_name="catFooter",on_delete=models.CASCADE)
    answer=models.TextField(blank=True)

    def __str__(self):
        return f'{self.category.section}-{self.question}'

class WordSnippet(models.Model):
    title=models.CharField(max_length=100,blank=True)
    category=models.ForeignKey(Category,related_name="catWordSnippet",on_delete=models.CASCADE)
    sectionTitle=models.CharField(max_length=100,blank=True)
    subSectionTitle=models.CharField(max_length=100,blank=True)
    content=models.TextField(blank=True)
    content1=models.TextField(blank=True)
    content2=models.TextField(blank=True)
    content3=models.TextField(blank=True)
    webImage=models.CharField(max_length=250,blank=True)

    def __str__(self):
        return f'{self.title}-{self.sectionTitle}'

class Region(models.Model):
    country=models.CharField(max_length=50,blank=True,null=True)
    provState=models.CharField(max_length=50,blank=True,null=True)
    class Meta:
        unique_together = ("country","provState",)
        ordering = ('country',"provState",)

    def __str__(self):
        return f'{self.country}-{self.provState}'


class PageFeedback(models.Model):
    name=models.CharField(max_length=75,blank=True)
    category=models.ForeignKey(Category,related_name="pageFeedback",on_delete=models.CASCADE)
    email=models.CharField(max_length=100,blank=True)
    page=models.CharField(max_length=50,blank=True)
    comment=models.TextField(blank=True)
    rating=models.IntegerField(blank=True)
    pageCount=models.IntegerField(default=1,blank=True)
    average=models.IntegerField(default=4)
    class Meta:
        ordering=('-rating','page',)
    def __str__(self):
        return f'{self.name}-{self.page}'

def post_save_GenerateAverage(sender,instance,created,*args,**kwargs):
    average=0
    total=0
    if created:
        feedbacks=PageFeedback.objects.filter(page=instance.page)
        total=len(feedbacks)
        if total>0:
            average=sum([obj.rating for obj in feedbacks])/total
            for obj in feedbacks:
                obj.average=average
                obj.pageCount=total
                obj.save()
post_save.connect(post_save_GenerateAverage,sender=PageFeedback)

class SiteMap(models.Model):
    name=models.CharField(max_length=100,blank=True,null=True)
    loc=models.CharField(max_length=50,blank=True,null=True)
    changefreq=models.CharField(max_length=50,blank=True,null=True)
    priority=models.IntegerField(default=10)
    lastmod=models.DateTimeField(default=datetime.now)
    def __str__(self):
        return self.name


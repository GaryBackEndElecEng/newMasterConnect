from rest_framework import serializers,permissions
from api.models import Service,Category,CATEGORIES,Quote,FAQS,WordSnippet,Request,Region,Miscelaneous,GeneralInfo,Sponsor,PageFeedback
from django.contrib.auth.models import User

class PostFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model=PageFeedback
        fields="__all__"

class MiscSerializer(serializers.ModelSerializer):
    class Meta:
        model= Miscelaneous
        fields=("id","page","pageCount")

class ImageCatField(serializers.RelatedField):
    def to_representation(self,value):
        return {"id":value.id,"name":value.name,"image":value.image}

class SponsorCatField(serializers.RelatedField):
    def to_representation(self,value):
        return {"id":value.id,"name":value.name,"logo":value.logo,"site":value.site}

class GeneralInfoCatField(serializers.RelatedField):
    def to_representation(self,value):
        return {"id":value.id,"name":value.name,"address": value.address, "cell":value.cell,"country":value.country,"provState": value.provState,"city": value.city,"postal": value.postal, "extra":value.extra,"siteArray":value.siteArray}

class ServiceCategoriesField(serializers.RelatedField):
    def get_query_set(self):
        return self.title , self.section , self.subSection, self.content
    def to_representation(self,value):
        return {"id":value.id,"title":value.title,"section": value.section, "subSection":value.subSection,"content":value.content,"summary":value.summary}

class FAQSCategoriesField(serializers.RelatedField):
    def get_query_set(self):
        return self.question , self.answer 
    def to_representation(self,value):
        return {"id":value.id,"question":value.question,"answer": value.answer}

class WordSnippetCategoriesField(serializers.RelatedField):
    def get_query_set(self):
        return  self.title , self.sectionTitle, self.subSectionTitle , self.content , self.sectionTitle , self.content1 , self.content2 , self.content3, self.webImage  
    def to_representation(self,value):
        return {"id":value.id,"title":value.title,"sectionTitle": value.sectionTitle,"subSectionTitle": value.subSectionTitle,"content": value.content,"content1": value.content1,"content2": value.content2,"content3": value.content3,"webImage": value.webImage}

class CategorySerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    categories = ServiceCategoriesField(many=True,read_only=True)
    catWordSnippet=WordSnippetCategoriesField(many=True,read_only=True)
    catFooter=FAQSCategoriesField(many=True,read_only=True)
    categoryGeneralInfo=GeneralInfoCatField(many=True,read_only=True)
    categorySponsor=SponsorCatField(many=True,read_only=True)
    imageCategory=ImageCatField(many=True,read_only=True)
    pageFeedback=PostFeedbackSerializer(many=True,read_only=True)
    class Meta:
        model = Category
        fields=('id', 'name','section','categories',"catWordSnippet","catFooter","categoryGeneralInfo","categorySponsor","imageCategory","pageFeedback")

class PageSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    
    class Meta:
        model = Service
        fields=('id', 'title','summary','content','section','subSection',)

class FAQSSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    class Meta:
        model= FAQS
        fields=("id","question","answer","category")

class RequestQuotePostSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    class Meta:
        model = Quote
        fields=("id","fullName","email","cell","coName","coSite","content","promotion")

class RequestPostSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    class Meta:
        model = Request
        fields=("id","fullName","email","content","promotion")

class WordSnippetSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    class Meta:
        model = WordSnippet
        fields=("id","title","category","sectionTitle","subSectionTitle","content","content1","content2","content3","webImage")

class RegionSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny]
    class Meta:
        model = Region
        fields=("id","country","provState")

class ExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model=Miscelaneous
        fields="__all__"









# class PostSerializer(serializers.ModelSerializer):
#     owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
#     print("owner",owner)
#     class Meta:
#         model = Post
#         fields=('id','category','title','slug','owner','excerpt','content','status','published','my_user')
    
#     def get_my_user(self,obj):
#         if not hasattr(obj,'id'):
#             return None
#         return obj.my_user() 



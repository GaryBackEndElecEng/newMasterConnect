from rest_framework import serializers
from rest_framework import status,mixins,generics,viewsets,permissions
from .models import (Price,PriceCatelog,Product,UserAccount,Service,Tax,Invoice,Option,Package,PostInvoice,PostService,ExtraInvoice,ExtraService,Calculator,Jobs,SitePreference,TempSavedCalculator,CreditInvoice)
from django.contrib.auth.models import User

class PostCalculatorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Calculator
        fields=("id","Q","ans","yesno")

class ExtraServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model=ExtraService
        fields="__all__"

class PriceCategory2Serializer(serializers.ModelSerializer):
     permission_classes=[permissions.AllowAny,]
     class Meta:
        model= PriceCatelog
        fields="__all__"

class ProductSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    priceCatelog = PriceCategory2Serializer(many=False,read_only=True)
    class Meta:
        model = Product
        fields='__all__'
        # fields=('id', 'name',"desc",'price',"monthly","extra_kwargs","priceCatelog","imageName")

class ServiceSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    priceCatelog = PriceCategory2Serializer(many=False,read_only=True)
    class Meta:
        model = Service
        fields='__all__'

class PostServiceSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    class Meta:
        model = PostService
        fields='__all__'
       

class PackageSerializer(serializers.ModelSerializer):
    products=ProductSerializer(many=True,read_only=True)
    services=ServiceSerializer(many=True,read_only=True)
    postServices=PostServiceSerializer(many=True,read_only=True)
    class Meta:
        model=Package
        fields="__all__"

class PriceSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    class Meta:
        model = Price
        fields=('id', 'name',"desc",'priceCatelog','price','monthly')

#----------PRICECATELOG -- GOVERNING PRODUCT AND SERVICES-------------------#
class PackageCatelogField(serializers.RelatedField):
    # products=ProductSerializer(many=True,read_only=True)
    # service=ServiceSerializer(many=True,read_only=True)
    def to_representation(self,value):
        return {"id":value.id,"name":value.name,"price": value.price, "desc":value.desc,"monthly": value.monthly,}

class PriceCatelogPriceField(serializers.RelatedField):
    def get_query_set(self):
        return self.name , self.price , self.desc
    def to_representation(self,value):
        return {"id":value.id,"name":value.name,"price": value.price, "desc":value.desc,"monthly": value.monthly,"summary": value.summary}

class ExtraServicePriceCatelogField(serializers.RelatedField):
    def get_query_set(self):
        return self.name , self.price , self.desc,self.summary
    def to_representation(self,value):
        return {"id":value.id,"name":value.name,"price": value.price, "desc":value.desc, "summary":value.summary,"monthly": value.monthly}

class ProductCatelogProductField(serializers.RelatedField):
    def get_query_set(self):
        return self.name , self.price , self.desc,self.monthly,self.extra_kwargs,self.imageName
    def to_representation(self,value):
        return {"id":value.id,"name":value.name,"price": value.price , "summary":value.summary, "desc":value.desc,"monthly": value.monthly,"extra_kwargs":value.extra_kwargs,"imageName":value.imageName}

class ServiceCatelogServiceField(serializers.RelatedField):
    def get_query_set(self):
        return self.name , self.price , self.desc,self.monthly
    def to_representation(self,value):
        return {"id":value.id,"name":value.name,"price": value.price, "summary":value.summary, "desc":value.desc,"monthly": value.monthly}

class PostServiceCatelogServiceField(serializers.RelatedField):
    def get_query_set(self):
        return self.name , self.price , self.desc,self.monthly
    def to_representation(self,value):
        return {"id":value.id,"name":value.name,"price": value.price, "summary":value.summary, "desc":value.desc,"monthly": value.monthly}

class PriceCatelogSerializer(serializers.ModelSerializer):
    price = PriceCatelogPriceField(many=True,read_only=True)
    product=ProductCatelogProductField(many=True,read_only=True)
    service=ServiceCatelogServiceField(many=True,read_only=True)
    packages=PackageCatelogField(many=True,read_only=True)
    postService=PostServiceCatelogServiceField(many=True,read_only=True)
    extraService=ExtraServicePriceCatelogField(many=True,read_only=True)
    calculator=PostCalculatorSerializer(many=True,read_only=True)
    permission_classes=[permissions.AllowAny,]
    class Meta:
        model = PriceCatelog
        fields=('id', 'name','subCategory','price',"product","service","packages","postService","extraService","calculator")

#----------PRICECATELOG  ENDDDD-- GOVERNING PRODUCT AND SERVICES-------------------#

class RegisterSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    class Meta:
        model = User
        fields=('id', 'username','email',"password")
        extra_kwargs = {"password":{"write_only":True},}

    def create(self,validated_data):
        password = validated_data.pop("password",None)
        # checked=validated_data.pop("checked")
        instance = self.Meta.model(**validated_data)
        # print("INSTANCE=>>",instance)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserAccount
        fields=("id","name","cell","product","service")



class UserAccountProductRelated(serializers.RelatedField):
    child=ProductSerializer(many=True)
    
class UserProductSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    products=UserAccountProductRelated(many=True,read_only=True)
    class Meta:
        model = UserAccount
        fields=("id","name","cell","products")


#----ADDING INVOICE TO USERACCOUNT-------#
    
class ShowOptionSerializer(serializers.RelatedField):
    def get_query_set(self):
        return self.name , self.question1 ,self.question2,self.question3,self.question4
    def to_representation(self,value):
        return {"id":value.id,"name":value.name, "question1":value.question1,"question2": value.question2,"question3":value.question3,"question4": value.question4}


class InvoiceField(serializers.RelatedField):
  
    def get_query_set(self):
        return self.name , self.region,self.tax ,self.subTotal,self.total,self.subTotalMonthly,self.totalMonthly,self.sendingForPayment,self.paid,self.monthlyArray,self.numPayment
    def to_representation(self,value):
        return {"id":value.id,"region":value.region,"subTotal":value.subTotal,"total": value.total,"subTotalMonthly":value.subTotalMonthly,"totalMonthly": value.totalMonthly,"numPayment":value.numPayment,"monthlyArray":value.monthlyArray,"sendingForPayment":value.sendingForPayment,"paid":value.paid}

class UserAccountsSerializer(serializers.ModelSerializer):
    options=ShowOptionSerializer(many=False,read_only=True)
    product= ProductCatelogProductField(many=True,read_only=True)
    # print("product",product)
    service=ServiceCatelogServiceField(many=True,read_only=True)
    invoice=InvoiceField(many=False,read_only=True)
    class Meta:
        model = UserAccount
        fields=("id","name","cell","email","address","product","service","invoice","consult","options")


#NEW SERIALIZER------------------
class JobsSerializer(serializers.RelatedField):
    def to_representation(self,value):
        return {"id":value.id,"userId":value.userId,"serviceArr":value.serviceArr,"postServiceArr":value.postServiceArr,"extraServiceArr":value.extraServiceArr}

class CreditInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditInvoice
        fields= "__all__"

class SitePreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model=SitePreference
        fields="__all__"

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Option
        fields=("name","question1","question2","question3","question4",)

class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tax
        fields=("country","subRegion","fed","provState",)

class InvoiceTaxSerializer(serializers.ModelSerializer):
    tax=TaxSerializer(many=False,read_only=True)
    class Meta:
        model=Invoice
        fields='__all__'
        # fields=("id","uuid","name","region","tax","subTotal","total","subTotalMonthly","totalMonthly","monthlyArray","numPayment","sendingForPayment","priceID","paid",)

class PostInvoiceSerializer(serializers.ModelSerializer):
     tax=TaxSerializer(many=False,read_only=True)
     class Meta:
        model= PostInvoice
        fields='__all__'

class ExtraInvoiceSerializer(serializers.ModelSerializer):
     tax=TaxSerializer(many=False,read_only=True)
     class Meta:
        model= ExtraInvoice
        fields='__all__'

class UserAccountAllCombined(serializers.ModelSerializer):
    jobs=JobsSerializer(many=True,read_only=True)
    invoice=InvoiceTaxSerializer(many=False,read_only=True)
    product=ProductSerializer(many=True,read_only=True)
    service=ServiceSerializer(many=True,read_only=True)
    options=OptionSerializer(many=False,read_only=True)
    postInvoice=PostInvoiceSerializer(many=False, read_only=True)
    postService=PostServiceSerializer(many=True,read_only=True)
    extraInvoice=ExtraInvoiceSerializer(many=False,read_only=True)
    extraService=ExtraServiceSerializer(many=True,read_only=True)
    sitePreference=SitePreferenceSerializer(many=False,read_only=True)
    credit=CreditInvoiceSerializer(many=False,read_only=True)
    class Meta:
        model=UserAccount
        fields='__all__'
        # fields=("id","name","customerID","cell","email","address","country","provState","postal","promotion","product","service","invoice","options","consult")

class UserCancelledCount(serializers.ModelSerializer):
    class Meta:
        model=UserAccount
        fields=("id","canceled","canceledCount")

class PostServiceCoreSerializer(serializers.ModelSerializer):
    services=ServiceSerializer(many=True,read_only=True)
    class Meta:
        model=PostService
        fields="__all__"

class TempSavedCalculatorSerializer(serializers.ModelSerializer):
    class Meta:
        model=TempSavedCalculator
        fields="__all__"
from distutils.log import error
# from msilib.schema import Error
from pyexpat import ErrorString
from unittest.util import strclass
from django.shortcuts import render,get_object_or_404,redirect
from django.http import Http404
from django.urls import path
from django.http import JsonResponse,HttpRequest
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import request
from rest_framework import status,mixins,generics,viewsets,permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import authentication
# from users.permissions import IsOwnerOrReadOnly
from .models import (Price,PriceCatelog,UserAccount,Product,Service,Option,Invoice,Package,PostInvoice,Tax,PostService,ExtraService,ExtraInvoice,Calculator,Jobs,SitePreference,TempSavedCalculator,CreditInvoice,ServiceDependancy)
from api.models import Region
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib.sites.models import Site
from django.conf import settings
from corsheaders.defaults import default_methods,default_headers
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework.decorators import api_view
from .serializers import (PriceSerializer,PriceCatelogSerializer,RegisterSerializer,ProductSerializer,UserAccountSerializer,UserProductSerializer,InvoiceTaxSerializer,UserAccountsSerializer,UserAccountProductRelated,ServiceSerializer,UserAccountAllCombined,UserCancelledCount,PackageSerializer,ExtraServiceSerializer,PostCalculatorSerializer,SitePreferenceSerializer,PostServiceCoreSerializer,TempSavedCalculatorSerializer,CreditInvoiceSerializer,FullProductSerializer,ServiceDependancySerializer,ExtraInvoiceSerializer)
# from users.permissions import IsStaffEditorPermission,IsPostPermission
from rest_framework.permissions import AllowAny,IsAuthenticated,SAFE_METHODS,IsAuthenticatedOrReadOnly
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.exceptions import AuthenticationFailed
from .util import( Calculate,StripeCreation,findSubTotalMonthly,GetSession,updatePackages,monthlyProductServiceMonthlyPrice,StripeCreationPost,calculate5YrMonthly,calculateMonthTZ,StripeCreationExtra,CalculateCost,CalcAddToUserAccountAtLogin,storeCustomId,saveUsersPackage,generateUserJobs,addInvoiceToUserAccount,extraInvoiceCalc,addSelectedPackageToUser,adjustTaxInvoiceForiegn,addProductToNewUser)
from api.util import sendAlertEmail,sendConsultEmail,sendExtraEmail,ServiceEvaluator
import stripe,math
stripe.api_key = settings.STRIPE_SECRET_KEY
stripe_public_key=settings.STRIPE_PUBLIC_KEY
strip_secret_key=settings.STRIPE_SECRET_KEY

from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os,json

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()


class PriceList(APIView):
    permission_classes=[AllowAny]
    """ List and create Posts"""
    def get(self,request,format=None):
        prices=Price.objects.all().order_by("id","name")
        if prices:
            serializer = PriceSerializer(prices,many=True)
            # print("PostList-serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class PriceCatelogList(APIView):
    permission_classes=[AllowAny]
    """ List """
    def get(self,request,format=None):
        calcMonthly=monthlyProductServiceMonthlyPrice()
        calcMonthly.execute()
        priceCatelogs=PriceCatelog.objects.all().order_by("id")
        if priceCatelogs:
            serializer = PriceCatelogSerializer(priceCatelogs,many=True)
            # print("categoryList-serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class PackageViewList(APIView):
    permission_classes=[AllowAny]
    def get(self,request,format="none"):
        updatePackages()
        packages=Package.objects.all()
        # print("PACKAGES IN VIEW",packages) # works
        if packages:
            # print("PACKAGES IN VIEW INSIDE IF PACKAGES",packages) # works
            serializer=PackageSerializer(packages,many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)



class Register(ObtainAuthToken,APIView):
    permission_classes=[permissions.AllowAny]
    authentication_classes = [authentication.TokenAuthentication]
    # authentication_classes = [SessionAuthentication]
    def post(self,request,*args,**kwargs):
        try:
            data=self.request.data
            username= data['username']
            email=data['email']
            password=data['password']
            check=data["checked"]
            # print("username",username,"email",email,"password",password,"check",check,"userEXIST",)
            newData={"username":username,"email":email,"password":password}
            if User.objects.filter(username=username).exists():
                # print("SAME USERNAME")
                return Response({'error':"username already exists"},status=status.HTTP_302_FOUND)
            elif User.objects.filter(email=email).exists():
                # print("SAME EMAIL")
                return Response({'error':"email already exists"},status=status.HTTP_302_FOUND)
            else:
                # print("ELSE===>")
                reg_serializer = RegisterSerializer(data=newData)
                if reg_serializer.is_valid(raise_exception=True):
                    arr=[]
                    newuser = reg_serializer.save()
                    getUser=User.objects.get(id=newuser.id)
                    userAccount=UserAccount(user=getUser,name="newuser",cell="newUser cell",email=getUser.email,promotion=check)
                    #ADDED THE TASK ARRAY 
                    userAccount.save()
                    services=userAccount.service.all().order_by("id")
                    job=Jobs(userId=userAccount.user.id,userAccount=userAccount)
                    job.save()
                    sitePreference=SitePreference(name=getUser.username,
                    q1="What is the one thing that you like with this site?",
                    q2="What effect do you like of this site?",
                    q3="What do you think is missing of this site that will improved interests and clicks?"
                    )
                    sitePreference.save()
                    userAccount.sitePreference=sitePreference
                    userAccount.save()

                    return Response({"username":newuser.username,"email":newuser.email},status=status.HTTP_201_CREATED)
                
            return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"error":"Trycatch fail-Register"})

# @method_decorator(csrf_protect, name='dispatch')
#so you must pass the CSRF token in the X-CSRFToken header
class LoginView(APIView):
    permission_classes=[permissions.AllowAny]
    authentication_classes = [authentication.TokenAuthentication]
    # manually create tokens for users ( not needed)
    def get_tokens_for_user(self,user):
        refresh=RefreshToken.for_user(user)
        if(refresh):
            return{
                "refresh_token":str(refresh),
                "access_token":str(refresh.access_token)        
                }
    def post(self,request,format=None):
        customId=0
        uuid=""
        packageId=None
        # print("data",request.data)
        data=self.request.data
        username=data['username']
        password=data['password']
        print(data)
        try:
            user=auth.authenticate(username=username,password=password)
            # print("userModel",user)
            if user is not None:
                auth.login(request,user)
                addInvoiceToUserAccount(username)
                if data['UUID']:
                   uuid=data['UUID']
                   CalcAddToUserAccountAtLogin(uuid,username).execute()
                if packageId:
                    saveUsersPackage(user.id,packageId)
                if data["customId"]:
                   customId=data["customId"]
                   #STORES CUSTOM PRODUCT TO USERACCOUT
                   storeCustomId(customId,username)
                if data["packageId"]:
                   # STORE USERS SELECTED PACKAGE TO THE USERS ACCOUNT
                   packageId=data["packageId"]
                   addSelectedPackageToUser(user.id,packageId)
                   #CALCULATES THE TOTAL COST AND SAVE IN INVOICE
                   Calculate(user.id).execute()
                if data["extra_kwargs"]:
                    extra_kwargs=data["extra_kwargs"]
                    addProductToNewUser(user.id,extra_kwargs)
                generateUserJobs(user.id)
                token=self.get_tokens_for_user(user)
                return Response({"access_token":token["access_token"],"refresh_token":token["refresh_token"],"username":user.username,"email":user.email,"user_id":user.id},status=status.HTTP_200_OK)
            else:
                return Response({"error":"No user assigned","status":status.HTTP_503_SERVICE_UNAVAILABLE})
        except Exception as e:
            print("loginError",e)
            return Response({"error":"either package object error or generateUserJobs error","status":status.HTTP_503_SERVICE_UNAVAILABLE})

class LogoutView(APIView):
    #TO LOGOUT YOU NEED THE CSRF TOKEN=> if using
    authentication_classes = [authentication.TokenAuthentication]
    # permission_classes=[permissions.AllowAny,]
    # not used=> false in settings
    # def get_blacklists_for_user(self,user):
    #     token=RefreshToken(user)
    #     print("blackLIST",token)
    #     token.blacklist()

    def post(self,request,format=None):
        try:
            data=self.request.data
            user_id=data["user_id"]
            # print(user_id)
            user=User.objects.get(id=user_id)
            auth.logout(request)
            return Response({"msg":"logged out"},status=status.HTTP_200_OK)
        except Exception as e:
            print("logout failed",e)
            return Response({"msg":"logged out failed"},status=status.HTTP_400_BAD_REQUEST)

class UserAccountComplete(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    
    def post(self,request,format=None):
        invoice=None
        website='none'
        co="None"
        industry="None"
        city="none"
        CDN='None'
        country="CA"
        data=self.request.data
        user_id=data['user_id']
        name=data['name']
        cell=data['cell']
        email=data["email"]
        address=data['address']
        country=data['country']
        provState=data['provState']
        postal=data['postal']
        city=data['city']
        if data['website']:
            website=data['website']
        if data['CDN']:
            CDN=data['CDN']
        if data['comp']:
            co=data['comp']
        if data['industry']:
            industry=data['industry']
        # print("DATA",data)
        try:
            user=User.objects.filter(id=user_id).first()
            if email == user.email:
                userAccount=UserAccount.objects.filter(user=user).first()
                if userAccount.invoice:
                    invoice=Invoice.objects.get(id=userAccount.invoice.id)
                    invoice.name=name
                    invoice.save()
                        
                # print("userAccount",userAccount,"invoice",invoice,data)
                if user and userAccount:
                    userAccount.name=name
                    userAccount.cell=cell
                    userAccount.address=address
                    userAccount.city=city
                    userAccount.country=country
                    userAccount.provState=provState
                    userAccount.postal=postal.upper()
                    userAccount.website=website
                    userAccount.CDN=CDN
                    userAccount.industry=industry
                    userAccount.co=co
                    userAccount.email=user.email
                    userAccount.save()
                    adjustTaxInvoiceForiegn(userAccount.id)
                    if name.split(" "):
                        user.email=email
                        user.first_name=name.split(" ")[0]
                        user.last_name=name.split(" ")[1]
                        user.save()
                    serializer= UserAccountAllCombined(userAccount,many=False)
                    return Response(serializer.data)
                else:
                    return Response({"error":"No user assigned","status":status.HTTP_503_SERVICE_UNAVAILABLE})
            else:
                if not User.objects.filter(email=email).exists():
                    user.email=email
                    user.save()
                else:
                    return Response({'error':"email already exists"},status=status.HTTP_302_FOUND)
        except Exception as e:
            print("error",e)
            return Response({"error":"error occured","status":status.HTTP_503_SERVICE_UNAVAILABLE})

# this endpoint gives Axios a CSRF cookie from the server
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes=[permissions.AllowAny,]
    def get(self,request,format=None):
        name=settings.CSRF_HEADER_NAME
        cookie=settings.CSRF_COOKIE_NAME
        csrftoken=request.META["CSRF_COOKIE"]
        return Response({'csrftoken':csrftoken,"name":name})




class ProductList(APIView):
    permission_classes=[AllowAny]
    """ List """
    def get(self,request,format=None):
        products=Product.objects.all().order_by("id")
        if products:
            serializer = FullProductSerializer(products,many=True)
            # print("categoryList-serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ServiceList(APIView):
    permission_classes=[AllowAny]
    """ List """
    def get(self,request,format=None):
        services=Service.objects.all().order_by("id")
        if services:
            serializer = ServiceSerializer(services,many=True)
            # print("categoryList-serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
class UserAccountServices(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        serv_id=data["serv_id"]
        # id=self.kwargs["user_id"] # does this given http://addres/id
        # print("user_id",user_id,"serv_id",serv_id)
        user=User.objects.get(id=user_id)
        userAccount=UserAccount.objects.filter(user=user).last()
        service=Service.objects.filter(id=serv_id).first()
        # print("userAccount",userAccount)
        if userAccount and service:
            userAccount.service.add(service)
            userAccount.save()
            Calculate(user_id).execute()
            serializer= UserAccountAllCombined(userAccount,many=False)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
class UserAccountProducts(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        # id=self.kwargs["user_id"] # does this given http://addres/id
        # print("user_id",user_id)
        user=User.objects.get(id=user_id)
        userAccount=UserAccount.objects.filter(user=user).last()
        # print("userAccount",userAccount)
        if userAccount:
            serializer= UserAccountSerializer(userAccount,many=False)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserPostproduct(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        prod_id=data["prod_id"]
        if user_id:
            # print("user_id",user_id,"prod_id",prod_id)
            user=User.objects.get(id=user_id)
            userAccount=UserAccount.objects.filter(user=user).first()
            product=Product.objects.filter(id=prod_id).first()
            # print("product_myAccount views371",product)
            if userAccount and product:
                userAccount.product.add(product)
                userAccount.save()
                Calculate(user_id).execute()
                serializer= UserAccountAllCombined(userAccount)
                return Response(serializer.data)
        else:
            return Response({data:"no user or prod"},status=status.HTTP_400_BAD_REQUEST)

class UserProducts(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request):
        data=self.request.data
        user_id=data["user_id"]
        # print("user_id",user_id)
        user=User.objects.filter(id=user_id).first()
        if user:
            userAccount=UserAccount.objects.filter(user=user).last()
            
            if userAccount:
                products=userAccount.product.all()
                # print("products",products)
                serializer= ProductSerializer(products,many=True)
                # print("serializer",serializer.data)
                return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserServiceDelete(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        serv_id=data["serv_id"]
        # id=self.kwargs["user_id"] # does this given http://addres/id
        # print("user_id",user_id,"serv_id",serv_id)
        user=User.objects.get(id=user_id)
        userAccount=UserAccount.objects.filter(user=user).first()
        service=Service.objects.filter(id=serv_id).first()
        if userAccount and service:
            userAccount.service.remove(service)
            userAccount.save()
            Calculate(user_id).execute()
            serializer= UserAccountAllCombined(userAccount,many=False)
            # print("serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserProductDelete(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        prod_id=data["prod_id"]
        # id=self.kwargs["user_id"] # does this given http://addres/id
        # print("user_id",user_id,"prod_id",prod_id)
        user=User.objects.get(id=user_id)
        userAccount=UserAccount.objects.filter(user=user).first()
        product=Product.objects.filter(id=prod_id).first()
        userAccount.product.remove(product)
        userAccount.save()
        Calculate(user_id).execute()
        # print("userAccount",userAccount)
        if userAccount:
            serializer= UserAccountAllCombined(userAccount,many=False)
            # print("serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


###IT WORKED!!- THIS IS THE MAIN FEED FOR USERACCOUNTS
class UserCombinedProductServices(APIView):

    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        # id=self.kwargs["user_id"] # does this given http://addres/id
        # print("user_id",user_id,)
        user=User.objects.get(id=user_id)
        userAccount=UserAccount.objects.filter(user=user).first()
        if userAccount:
            #Creates Invoice and tax(if not present) saves it in Invoice and Tax, then this calls it
            test=Calculate(user_id)
            test.execute()
            
            serializer= UserAccountAllCombined(userAccount)
            # print("serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserPostPackage(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        packageId=data["packageId"]
        if user_id:
            # print("user_id",user_id,"packageId",packageId)
            user=User.objects.get(id=user_id)
            userAccount=UserAccount.objects.filter(user=user).first()
            if userAccount.invoice:
                invoice=Invoice.objects.filter(id=userAccount.invoice.id).first()
            else:
                #addInvoiceToUserAccount creates invoice if not exists
                addInvoiceToUserAccount(user.username)
            package=Package.objects.filter(id=packageId).first()
            if userAccount and package:
                products = package.products.all()
                services=package.services.all()
                postServices=package.postServices.all()
                if products:
                    userAccount.product.add(*products)
                    for product in products:
                        invoice.savings+=product.savings
                    invoice.save()
                if services:
                    userAccount.service.add(*services)
                if postServices:
                    userAccount.postService.add(*postServices)
                userAccount.save()
                # THIS CALCULATES AND SAVES IN INVOICE
                Calculate(user_id).execute()
                
                serializer= UserAccountAllCombined(userAccount,many=False)
                return Response(serializer.data)
        else:
            return Response({data:"no user or prod"},status=status.HTTP_400_BAD_REQUEST)

class UserCombinedProductServicesConsultCheck(APIView):

    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        consult=data["consult"]
        #//SEND EMAIL
        # id=self.kwargs["user_id"] # does this given http://addres/id
        # print("user_id",user_id,)
        user=User.objects.get(id=user_id)
        userAccount=UserAccount.objects.filter(user=user).first()
        if userAccount:
            #Creates Invoice and tax(if not present) saves it in Invoice and Tax, then this calls it
            test=Calculate(user_id)
            test.execute()
            userAccount.consult=consult
            userAccount.save()
            # print("userAccount=>consult",userAccount.consult)
            serializer= UserAccountAllCombined(userAccount,many=False)
            # print("serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class GetClientsOptions(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        question1=data["question1"]
        question2=data["question2"]
        question3=data["question3"]
        question4=data["question4"]
        # id=self.kwargs["user_id"] # does this given http://addres/id
        # print("user_id",user_id,question1,question2,question3,question4)
        user=User.objects.get(id=user_id)
        userAccount=UserAccount.objects.filter(user=user).first()
        if userAccount:
            #Creates Invoice and tax(if not present) saves it in Invoice and Tax, then this calls it
            getOption,created=Option.objects.get_or_create(name=userAccount.name)
            if "NA" not in question1:
                getOption.question1=question1
            if "NA" not in question2:
                getOption.question2=question2
            if "NA" not in question3:
                getOption.question3=question3
            if "NA" not in question4:
                getOption.question4=question4
            getOption.save()
            userAccount.options=getOption
            userAccount.save()
            # print("getOption",getOption)
            serializer= UserAccountAllCombined(userAccount,many=False)
            sendConsultEmail(user_id)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ClickCheckout(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=int(data["user_id"])
        # print("USER_ID",user_id)
        user=User.objects.get(id=user_id)
        userAccount=UserAccount.objects.filter(user=user).first()
        if userAccount:
            Calculate(user_id).execute()
            invoice=Invoice.objects.filter(id=userAccount.invoice.id).first()
            serializer= InvoiceTaxSerializer(invoice,many=False)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class Payment(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes=[AllowAny]
    @csrf_exempt
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        totalMonthly=data["totalMonthly"]
        # print("totalMonthly",totalMonthly)
        total=data["total"]
        numPayment=data["numPayment"]
        print("numPayment",numPayment)
        # id=self.kwargs["user_id"] # does this given http://addres/id
        # print("user_id",user_id,totalMonthly,total,"numPayment",numPayment)
        # print("HTTPREQUEST.GET_HOST",request.get_host())
        user=User.objects.get(id=user_id)
        userAccount=UserAccount.objects.filter(user=user).first()
        getInvoice= Invoice.objects.filter(id=userAccount.invoice.id).first()
       
        if userAccount and getInvoice:
    
            if numPayment==1:
                getInvoice.total=total
                getInvoice.numPayment = numPayment
                getInvoice.dateEnd=calculateMonthTZ(numPayment)
                getInvoice.paid=False
                getInvoice.save()
            elif numPayment < 60:
                # print("user_id",user_id,totalMonthly,total,"numPayment",numPayment)
                getInvoice.totalMonthly= totalMonthly
                getInvoice.numPayment=numPayment
                getInvoice.subTotalMonthly=findSubTotalMonthly(getInvoice.id,totalMonthly)
                getInvoice.dateEnd=calculateMonthTZ(numPayment)
                getInvoice.paid=False
                getInvoice.save()
            else:
                # print("user_id",user_id,totalMonthly,total,"numPayment",numPayment)
                calculate5YrMonthly(userAccount)
           
            serializer= UserAccountAllCombined(userAccount,many=False)
            # print("serializer",serializer)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class StripePaymentFromClient(APIView):
        authentication_classes = [authentication.TokenAuthentication]
        CORS_ALLOW_HEADERS=list(default_headers) + ["Access-Control-Allow-Origin",]
        CORS_ALLOW_METHODS=list(default_methods) + ["GET"]
        permission_classes=[permissions.AllowAny]
        stripe.api_key = settings.STRIPE_SECRET_KEY

        def post(self,request,**kwargs):
            user_id=kwargs.get("user_id")
            frontEnd=request.build_absolute_uri().split("/api/")[0]
            # id=self.kwargs["user_id"] # does this given http://addres/id
            # print("user_id",user_id)
            user=User.objects.get(id=user_id)
            userAccount=UserAccount.objects.filter(user=user).first()
            getInvoice= Invoice.objects.filter(id=userAccount.invoice.id).first()
            if userAccount and getInvoice:
                mode='payment'
                sendToStripe= StripeCreation(user_id).execute()
                Calcdata=sendToStripe
                isMonthlyPayment=Calcdata[0]
                numPayment=getInvoice.numPayment
                customerID=Calcdata[3]
                price_id=Calcdata[2]
                getInvoice.priceID=price_id
                getInvoice.sendingForPayment=True
                getInvoice.save()
        
                if getInvoice.numPayment > 1:
                    mode="subscription"
                
                try:
                    session = stripe.checkout.Session.create(
                    success_url=frontEnd + '/MyAccount/success' + '?success=true&session_id={CHECKOUT_SESSION_ID}',
                    cancel_url=frontEnd + '/MyAccount/canceled' + '?canceled=true',
                    customer=customerID,
                    payment_method_types=['card'],
                    line_items=[
                        {
                                'price':price_id,
                                'quantity':1,
                                
                            
                        }
                    ],
                    mode=mode,
                    metadata={
                        # 'payment_id':payment_id,
                        'userAccount_id':userAccount.id,
                        'invoice_id':getInvoice.id,
                        'name':userAccount.name,
                        'numPayment':getInvoice.numPayment,
                        }
                    )
                    # self.response.headers['Access-Control-Allow-Origin']="*"
                    return redirect(session.url, code=303 )
        
                except Exception as e:
                    print(e)
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({"error":"No user and Invoice accounts"},status=status.HTTP_400_BAD_REQUEST)

class Get_stripe_public_key(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        # print(request.headers,"data",request.data)
        data=self.request.data
        user_id=data['user_id']
        
        try:
            user=User.objects.filter(id=user_id).first()
            userAccount=UserAccount.objects.filter(user=user).first()
            # print("userModel",user)
            if user and userAccount:
                # print(stripe_public_key)
                return Response({"public_key":stripe_public_key},status=status.HTTP_200_OK)
            else:
                return Response({"error":"No user assigned","status":status.HTTP_400_BAD_REQUEST})
        except Exception as e:
            return Response({"error":e,"status":status.HTTP_503_SERVICE_UNAVAILABLE})

# -----------THIS IS NOW THE MAIN FEED TO USERACCOUNT------------------/////
class getFullUserAccount(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        if userAccount:
            Calculate(user_id).execute()
            serializer= UserAccountAllCombined(userAccount)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class getUserInvoiceAccount(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        invoice=Invoice.objects.filter(id=userAccount.invoice.id).first()
        if userAccount and invoice:
            serializer= InvoiceTaxSerializer(invoice,many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CheckCanceledPurchase(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        userAccount.canceled=True
        userAccount.canceledCount +=1
        userAccount.save()
        if userAccount:
            serializer=UserCancelledCount(userAccount)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)



class GetSessionInfo(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        session_id=data["session_id"]
        # print('GET SESSION KEY',session_id)
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        if userAccount:
            userAccount.sessionID=session_id
            userAccount.save()
            getInvoice=Invoice.objects.get(id=userAccount.invoice.id)
            getInvoice.paid=True
            getInvoice.save()
            test= GetSession(session_id,user_id)
            test.getSession()
            sendAlertEmail(user_id,type="first")
            serializer= UserAccountAllCombined(userAccount)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class GetPostSessionInfo(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        postSession_id=data["postSession_id"]
        # print('GET SESSION KEY',postSession_id)
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        postInvoice=PostInvoice.objects.filter(id=userAccount.postInvoice.id).first()
        postInvoice.paid=True
        postInvoice.save()
        if userAccount:
            userAccount.postSessionID=postSession_id
            userAccount.save()
            test= GetSession(postSession_id,user_id)
            test.getSession()
            sendAlertEmail(user_id,type="second")
            serializer= UserAccountAllCombined(userAccount)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class MissedProdServs(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=request.data
        user_id=data["user_id"]
        try:
            missing=ServiceEvaluator(user_id).returnMissedProdsServs()
            return Response({"data":missing,"status":status.HTTP_200_OK})
        except Exception as e:
            print("error",e)
            return Response({"error":"server error"})
            
          

###//--------------- POST ACCOUNT ---------------///################################

class AddPostServices(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=request.data
        user_id=data["user_id"]
        serv_id=data["serv_id"]
        postService = PostService.objects.filter(id=serv_id).first()
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        if userAccount.invoice:
            invoice=Invoice.objects.get(id=userAccount.invoice.id)
            tax=invoice.tax
        else:
            tax,created=Tax.objects.get_or_create(country=userAccount.country,subRegion=userAccount.provState)
            if created:
                tax.save()
            invoice,created2=Invoice.objects.get_or_create(name=userAccount.name,tax=tax)
            if created2:
                invoice.save()
                userAccount.invoice=invoice
                userAccount.save()
        if userAccount.postInvoice:
            postInvoice=PostInvoice.objects.get(id=userAccount.postInvoice.id)
        else:
            postInvoice, created3=PostInvoice.objects.get_or_create(name=userAccount.name,tax=tax)
            if created3:
                postInvoice.save()
                userAccount.postInvoice=postInvoice
                userAccount.save()
        if userAccount and postService:
            userAccount.postService.add(postService)
            userAccount.save()
            # CALCULATING COST
            subTotalMonthly=sum([obj.monthly for obj in userAccount.postService.all()])
            subTotalMonthly=subTotalMonthly
            subTotal=sum([obj.price for obj in userAccount.postService.all()])
            tax=(1+postInvoice.tax.fed/100 + postInvoice.tax.provState/100)
            totalMonthly=subTotalMonthly*tax
            total=subTotal*tax
            postInvoice.subTotalMonthly=math.ceil(subTotalMonthly)
            postInvoice.subTotal=math.ceil(subTotal)
            postInvoice.totalMonthly=totalMonthly
            postInvoice.total=total
            postInvoice.dateEnd=calculateMonthTZ(60)
            postInvoice.paid=False
            postInvoice.save()

            serializer= UserAccountAllCombined(userAccount,many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class RemovePostServices(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=request.data
        user_id=data["user_id"]
        serv_id=data["serv_id"]
        postService = PostService.objects.filter(id=serv_id).first()
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        postInvoice =PostInvoice.objects.filter(name=userAccount.name).first()
        if userAccount and postService and postInvoice:
            userAccount.postService.remove(postService)
            userAccount.save()

            # CALCULATING COST
            subTotalMonthly=sum([obj.monthly for obj in userAccount.postService.all()])
            subTotalMonthly=subTotalMonthly*(1+0.03)**5
            subTotal=sum([obj.price for obj in userAccount.postService.all()])
            tax=(1+postInvoice.tax.fed/100 + postInvoice.tax.provState/100)
            totalMonthly=subTotalMonthly*tax
            total=subTotal*tax
            postInvoice.subTotalMonthly=math.ceil(subTotalMonthly)
            postInvoice.subTotal=math.ceil(subTotal)
            postInvoice.totalMonthly=totalMonthly
            postInvoice.total=total
            postInvoice.save()

            serializer= UserAccountAllCombined(userAccount,many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"error":"PostInvoice is created at add service","status":status.HTTP_406_NOT_ACCEPTABLE})


class StripePaymentPostBuild(APIView):
        authentication_classes = [authentication.TokenAuthentication]
        CORS_ALLOW_HEADERS=list(default_headers) + ["Access-Control-Allow-Origin",]
        CORS_ALLOW_METHODS=list(default_methods) + ["GET"]
        permission_classes=[permissions.AllowAny]
        stripe.api_key = settings.STRIPE_SECRET_KEY
        def post(self,request,**kwargs):
            user_id=kwargs.get("user_id")
            frontEnd= frontEnd=request.build_absolute_uri().split("/api/")[0]
            # print("user_id",user_id)
            user=User.objects.get(id=user_id)
            userAccount=UserAccount.objects.filter(user=user).first()
            getPostInvoice= PostInvoice.objects.filter(id=userAccount.postInvoice.id).first()
            if userAccount and getPostInvoice:
                stripeIds= StripeCreationPost(userAccount).execute()
                price_id=stripeIds[0]
                customer_id=stripeIds[1]
                
                try:
                    session = stripe.checkout.Session.create(
                    success_url=frontEnd + '/MyAccount/successPost/' + '?success=true&postSession_id={CHECKOUT_SESSION_ID}',
                    cancel_url=frontEnd + '/MyAccount/canceled' + '?canceled=true',
                    customer=customer_id,
                    payment_method_types=['card'],
                    line_items=[
                        {
                                'price':price_id,
                                'quantity':1,
                                
                            
                        }
                    ],
                    mode="subscription",
                    metadata={
                        # 'payment_id':payment_id,
                        'userAccount_id':userAccount.id,
                        'invoice_id':getPostInvoice.id,
                        'name':userAccount.name,
                        }
                    )
                    # self.response.headers['Access-Control-Allow-Origin']="*"
                    return redirect(session.url, code=303 )
        
                except Exception as e:
                    print(e)
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({"error":"No user and Invoice accounts"},status=status.HTTP_400_BAD_REQUEST)

class GetExtraServices(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def get(self,request,format=None):
        extraServices=ExtraService.objects.all()
        if extraServices:
            serializer=ExtraServiceSerializer(extraServices,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"error":"Table is empty","status":status.HTTP_303_SEE_OTHER})

class GetPostServices(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes=[AllowAny]
    def get(self,request,format=None):
        postServs=PostService.objects.all()
        if postServs:
            serializer=PostServiceCoreSerializer(postServs,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"error":"Table is empty","status":status.HTTP_303_SEE_OTHER})


class PostExtraService(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,**kwargs):
        extraInvoice=None
        data=request.data
        user_id=data["user_id"]
        id=kwargs.get("id")
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        extraService=ExtraService.objects.filter(id=id).first()
        if userAccount and extraService not in userAccount.extraService.all():
            userAccount.extraService.add(extraService)
            userAccount.save()
            extraInvoiceCalc(userAccount)
            serializer= UserAccountAllCombined(userAccount,many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"error":"No user account","status":status.HTTP_303_SEE_OTHER})

class PostDeleteExtraService(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,**kwargs):
        extraInvoice=None
        data=request.data
        user_id=data["user_id"]
        id=kwargs.get("id")
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        extraService=ExtraService.objects.filter(id=id).first()
        if userAccount and extraService in userAccount.extraService.all():
            userAccount.extraService.remove(extraService)
            userAccount.save()
            extraInvoiceCalc(userAccount)
            serializer= UserAccountAllCombined(userAccount,many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"error":"No user account","status":status.HTTP_303_SEE_OTHER})

class GetExtraInvoiceForCheckOut(APIView):
    authentication_classes=[authentication.TokenAuthentication]
    def post(self,request,**kwargs):
        data=request.data
        user_id=data["user_id"]
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        extraInvoice=ExtraInvoice.objects.filter(id=userAccount.extraInvoice.id).first()
        if userAccount and extraInvoice:
            serializer=ExtraInvoiceSerializer(extraInvoice,many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"error":"no invoice found","status":status.HTTP_404_NOT_FOUND})

            
class AdditionalServiceCheckout(APIView):
        authentication_classes = [authentication.TokenAuthentication]
        permission_classes=[permissions.AllowAny]
        stripe.api_key = settings.STRIPE_SECRET_KEY
        def post(self,request,**kwargs):
            user_id=kwargs.get("user_id")
            frontEnd=request.build_absolute_uri().split("/api/")[0]
            # id=self.kwargs["user_id"] # does this given http://addres/id
            # print("user_id",user_id)
            user=User.objects.get(id=user_id)
            userAccount=UserAccount.objects.filter(user=user).first()
            getInvoice= ExtraInvoice.objects.filter(id=userAccount.extraInvoice.id).first()
            if userAccount and getInvoice:
                getStripe= StripeCreationExtra(userAccount).execute()
                price_id=getStripe[0]
                customerID=getStripe[1]
                
                try:
                    session = stripe.checkout.Session.create(
                    success_url=frontEnd + '/MyAccount/successExtra' + '?successExtra=true&sessionExtra_id={CHECKOUT_SESSION_ID}',
                    cancel_url=frontEnd + '/MyAccount/canceled' + '?canceled=true',
                    customer=customerID,
                    payment_method_types=['card'],
                    line_items=[
                        {
                                'price':price_id,
                                'quantity':1,
                                
                            
                        }
                    ],
                    mode="subscription",
                    metadata={
                        # 'payment_id':payment_id,
                        'userAccount_id':userAccount.id,
                        'invoice_id':getInvoice.id,
                        'name':userAccount.name,
                        'numPayment':60,
                        }
                    )
                    # self.response.headers['Access-Control-Allow-Origin']="*"
                    return redirect(session.url, code=303 )
        
                except Exception as e:
                    print(e)
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({"error":"No user and Invoice accounts"},status=status.HTTP_400_BAD_REQUEST)


class GetExtraSessionInfo(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=self.request.data
        user_id=data["user_id"]
        extraSession_id=data["extraSession_id"]
        # print('GET SESSION KEY',extraSession_id)
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        extraInvoice=ExtraInvoice.objects.filter(id=userAccount.extraInvoice.id).first()
        extraInvoice.paid=True
        extraInvoice.save()
        if userAccount:
            userAccount.extraSessionID=extraSession_id
            userAccount.save()
            # test= GetSession(extraSession_id,user_id)
            # test.getSession()
            sendExtraEmail(user_id)
            serializer= UserAccountAllCombined(userAccount,many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            

class CalculatorResults(APIView):
    permission_classes=[AllowAny]
    def post(self,request,format=None):
        data=request.data
        # print(data)
        category,created =PriceCatelog.objects.get_or_create(name="calculator")
        if created:
            category.name="calculator"
            category.save()
        calculators=Calculator.objects.all().order_by("id")
        try:
            if data and calculators:
                for question in calculators:
                    question.priceCatelog=category
                    for dict1 in data:
                        if question.id == dict1.get("id"):
                            question.ans.append(dict1.get("ans"))
                            question.save()
                senResults=CalculateCost().calcCombine()
                return Response({"data":senResults,"status":status.HTTP_201_CREATED})

        except Exception as e:
            return Response({"error":e,"status":status.HTTP_400_BAD_REQUEST})

class SitePreferenceView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None):
        data=request.data
        # print(data)
        try:
            ans1=data["ans1"]
            ans2=data["ans2"]
            ans3=data["ans3"]
            site=data["site"]
            user_id=data["user_id"]
            user=User.objects.get(id=user_id)
            sitePreference=SitePreference.objects.filter(name=user.username).first()
            if sitePreference:
                sitePreference.ans1=ans1
                sitePreference.ans2=ans2
                sitePreference.ans3=ans3
                sitePreference.site=site
                sitePreference.save()
                serializer=SitePreferenceSerializer(sitePreference,many=False)
            return Response(serializer.data)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class GetUUIDPost(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format="none"):
        data=request.data
        uuid=data["uuid"]
        user_id=data["user_id"]
        try:
            if(user_id and uuid):
                user=User.objects.filter(id=user_id).first()
                getUuid=TempSavedCalculator.objects.filter(uuid=uuid).first()
                if user and getUuid:
                    serializer=TempSavedCalculatorSerializer(getUuid,many=False)
                    return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            print("GetUUID error",e)
            return Response({"error":"GetUUID error","status":status.HTTP_404_NOT_FOUND})

class PostDeductService(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    #THESE ARE ALREADY PAID SERVICES TO BE CREDITED. CLIENT CAN ONLY DEDUCT
    def post(self,request,**kwargs):
        data=request.data
        user_id=data["user_id"]
        servProd_id=data["servProd_id"]
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        extraService=ExtraService.objects.filter(id=servProd_id).first()
        service=Service.objects.filter(id=servProd_id).first()
        postService=PostService.objects.filter(id=servProd_id).first()
        product=Product.objects.filter(id=servProd_id).first()
        extraService=Product.objects.filter(id=servProd_id).first()
        tax=Tax.objects.filter(country=userAccount.country,subRegion=userAccount.provState).first()
        creditInvoice=CreditInvoice.objects.filter(name=userAccount.name).first()
        if userAccount:
            if not creditInvoice:
                if not tax:
                    tax,created=Tax.objects.get_or_create(country=userAccount.country,subRegion=userAccount.provState)
                    if created:
                        tax.save()
                creditInvoice, created1 = CreditInvoice.objects.get_or_create(name=userAccount.name,tax=tax)
                if created1:
                    creditInvoice.save()
                    userAccount.credit=creditInvoice
                    userAccount.save()
            if service and service.id not in creditInvoice.prodsServs_id:
                creditInvoice.prodsServs.append(service.name)
                creditInvoice.prodsServs_id.append(service.id)
                creditInvoice.subTotal += service.price
                creditInvoice.subTotalMonthly += service.monthly
                taxApply=tax.provState/100 + tax.fed/100 + 1
                creditInvoice.total=math.floor(creditInvoice.subTotal*taxApply)
                creditInvoice.totalMonthly=math.floor(creditInvoice.subTotalMonthly*taxApply)
            elif postService and postService.id not in creditInvoice.prodsServs_id:
                creditInvoice.prodsServs.append(postService.name)
                creditInvoice.prodsServs_id.append(postService.id)
                creditInvoice.subTotal += postService.price
                creditInvoice.subTotalMonthly += postService.monthly
                taxApply=tax.provState/100 + tax.fed/100 + 1
                creditInvoice.total=math.floor(creditInvoice.subTotal*taxApply)
                creditInvoice.totalMonthly=math.floor(creditInvoice.subTotalMonthly*taxApply)
            elif extraService and extraService.id not in creditInvoice.prodsServs_id:
                creditInvoice.prodsServs.append(extraService.name)
                creditInvoice.prodsServs_id.append(extraService.id)
                creditInvoice.subTotal += extraService.price
                creditInvoice.subTotalMonthly += extraService.monthly
                taxApply=tax.provState/100 + tax.fed/100 + 1
                creditInvoice.total=math.floor(creditInvoice.subTotal*taxApply)
                creditInvoice.totalMonthly=math.floor(creditInvoice.subTotalMonthly*taxApply)
            elif product and product.id not in creditInvoice.prodsServs_id:
                creditInvoice.prodsServs.append(product.name)
                creditInvoice.prodsServs_id.append(extraService.id)
                creditInvoice.subTotal += product.price
                creditInvoice.subTotalMonthly += product.monthly
                taxApply=tax.provState/100 + tax.fed/100 + 1
                creditInvoice.total=math.floor(creditInvoice.subTotal*taxApply)
                creditInvoice.totalMonthly=math.floor(creditInvoice.subTotalMonthly*taxApply)
            creditInvoice.hasCredit=True
            creditInvoice.update=True
            creditInvoice.yesUpdated=False
            creditInvoice.save()
            serializer= CreditInvoiceSerializer(creditInvoice,many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"error":"No user account","status":status.HTTP_303_SEE_OTHER})

#SENDING THE ServiceDependancy TO GENERALCONTEXTPROVIDER: THIS IDENTIFIES THE SERVICE DEPENDANCIES
class ServiceDependancyGet(APIView):
    permission_classes=[AllowAny]
    def get(self,request,format=None,**kwargs):
        dependencies=ServiceDependancy.objects.all()
        try:
            serializer=ServiceDependancySerializer(dependencies,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            print("ServiceDependency error",e)
            return Response(status=status.HTTP_400_BAD_REQUEST) 

#-invoice is first created once THE CLIENT COMPLETES THE FORM (THEN THEY CAN SELECT)
#BELOW THE INVOICE SHOULD HAVE BEEN CREATED
class SaveServiceDependancy(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request,format=None,**kwargs):
        data=request.data
        serviceName=data["serviceName"]
        user_id=data["user_id"]
        user=User.objects.filter(id=user_id).first()
        userAccount=UserAccount.objects.filter(user=user).first()
        tax=userAccount.invoice.tax
        postInvoice,created=PostInvoice.objects.get_or_create(name=userAccount.name,tax=tax)
        # print("postInvoice-outside",postInvoice)
        if created:
            # print("postInvoice-Inside",postInvoice)
            postInvoice.subTotal=0
            postInvoice.subTotalMonthly=0
            postInvoice.save()
        serviceDepend=ServiceDependancy.objects.filter(category=serviceName).first()
        if serviceDepend and userAccount:
            try:
                for product in serviceDepend.products.all():
                    if product not in userAccount.product.all():
                        userAccount.product.add(product.id)
                for service in serviceDepend.services.all():
                    if service not in userAccount.service.all():
                        userAccount.service.add(service.id)
                for postService in serviceDepend.postServices.all():
                    if postService not in userAccount.postService.all():
                        userAccount.postService.add(postService.id)
                        postInvoice.subTotal +=postService.price
                        postInvoice.subTotalMonthly +=postService.monthly
                userAccount.save()
                tax=(1 + postInvoice.tax.fed/100 + postInvoice.tax.provState/100)
                postInvoice.total=postInvoice.subTotal*tax
                postInvoice.totalMonthly=postInvoice.totalMonthly*tax
                postInvoice.save()
                Calculate(user_id).execute()
                serialize=UserAccountAllCombined(userAccount,many=False)
                return Response(serialize.data,status=status.HTTP_200_OK)
            except Exception as e:
                print("error",e)
                return Response({"error":"something went wrong","status":status.HTTP_505_HTTP_VERSION_NOT_SUPPORTED})
        else:
            return Response({"error":"no user account or service name","status":status.HTTP_404_NOT_FOUND})

        
        


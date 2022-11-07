from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
#FAQSList
app_name="my_account"
#UserPostproduct,UserAccountServices
urlpatterns=[
    path('price/',views.PriceList.as_view(),name="PriceList-view"),
    path('priceCatelog/',views.PriceCatelogList.as_view(),name="PriceCatelogList-view"),
    path('product/',views.ProductList.as_view(),name="ProductList-view"),
    path('userAccount/',views.UserAccountProducts.as_view(),name="userAccount-view"),
    path('userProductPost/',views.UserPostproduct.as_view(),name="userAccountProdPost-view"),
    path('userServicePost/',views.UserAccountServices.as_view(),name="userAccountServPost-view"),
    path('userProducts/',views.UserProducts.as_view(),name="userAProducts-view"),
    path('userProductPostDelete/',views.UserProductDelete.as_view(),name="userAccountProdPostDelete-post"),
    path('userServicePostDelete/',views.UserServiceDelete.as_view(),name="userAccountServPostDelete-post"),
    path('register/',views.Register.as_view(),name="Register-view"),
    path('login/',views.LoginView.as_view(),name="Login-view"),
    path('logout/',views.LogoutView.as_view(),name="Logout-view"),
    path('CSRF/',views.GetCSRFToken.as_view(),name="getCSRF-view"),

    path('userAllAccounts/',views.getFullUserAccount.as_view(),name="userAllAccounts-view"),
    path('userAccountComplete/',views.UserAccountComplete.as_view(),name="UserAccountComplete-view"),
    path('UserCombinedProductServicesConsultCheckPost/',views.UserCombinedProductServicesConsultCheck.as_view(),name="UserAccountCompleteConsult-post"),
    path('UserOptions/',views.GetClientsOptions.as_view(),name="UserOptionAccountComplete-post"),
    path('get_public/',views.Get_stripe_public_key.as_view(),name="StripePublicKey-get"),
    path('payment/',views.Payment.as_view(),name="getting_Payment-get"),
    path('stripe/payment/<int:user_id>',views.StripePaymentFromClient.as_view(),name="getting_Payment-get"),
    path('invoice/',views.getUserInvoiceAccount.as_view(),name="getting_Payment-get"),
    path('post_invoice/',views.ClickCheckout.as_view(),name="checkingout-get"),
    path('getInfoSession/',views.GetSessionInfo.as_view(),name="getting_Payment-get"),
    path('getPostInfoSession/',views.GetPostSessionInfo.as_view(),name="getting_post_Payment-get"),
    path('getExtraInfoSession/',views.GetExtraSessionInfo.as_view(),name="getting_extra_Payment-post"),
    path('getPackages/',views.PackageViewList.as_view(),name="getting_Packages-get"),
    path('CanceledPurchase/',views.CheckCanceledPurchase.as_view(),name="CheckCanceledPurchase-post"),

    path('addPostService/',views.AddPostServices.as_view(),name="addPostService-post"),
    path('subPostService/',views.RemovePostServices.as_view(),name="subPostService-post"),
    path('postCheckout/<int:user_id>',views.StripePaymentPostBuild.as_view(),name="postCheckout-post"),

    path('extraServices/',views.GetExtraServices.as_view(),name="GetExtraServices-get"),
    path('extraService/<int:id>/',views.PostExtraService.as_view(),name="PostExtraService-post"),
    path('extraService/delete/<int:id>/',views.PostDeleteExtraService.as_view(),name="PostDeleteExtraService-post"),
    path('extraService/checkout/<int:user_id>/',views.AdditionalServiceCheckout.as_view(),name="PostDeleteExtraService-post"),
    path('postCalculatorResults/',views.CalculatorResults.as_view(),name="postCalculatorResults-post"),
    path('sitePreference/',views.SitePreferenceView.as_view(),name="SitePreferenceView-post"),
    
]
urlpatterns = format_suffix_patterns(urlpatterns)
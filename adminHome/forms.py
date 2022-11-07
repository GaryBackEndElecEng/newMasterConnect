from datetime import datetime
from django import forms
from .models import *

UPDATE=((False,"select"),(True,"UPDATE"))
class FormUpdate(forms.Form):  
    updatePackage= forms.ChoiceField(required=False, label='Update package', choices=UPDATE)
    activateLowestPrice= forms.ChoiceField(required=False, label='Activate Lowest Prices', choices=UPDATE)  
    adjustMonthlyCost= forms.ChoiceField(required=False, label='Adjust monthly prices', choices=UPDATE)  
    calculateAllInvoices= forms.ChoiceField(required=False, label='Calculate allInvoices', choices=UPDATE)  




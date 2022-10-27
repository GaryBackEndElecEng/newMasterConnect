from django.shortcuts import render,get_object_or_404
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
from django.conf import settings
from django.conf.urls.static import static


def main(request):
    getStatic=static(settings.STATIC_URL,document_root=settings.TEST_DIR)
    print("STATIC_URL",settings.STATIC_URL)
    return render(request,"index.html")

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)
        print("path",path)
        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()
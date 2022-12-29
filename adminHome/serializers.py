from rest_framework import serializers,permissions
from . models import *

class ServiceTaskTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model=ServiceTaskTracker
        fields="__all__"

class PostServiceTaskTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model=PostServiceTaskTracker
        fields="__all__"

class ExtraServiceTaskTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model=ExtraServiceTaskTracker
        fields="__all__"

class ProductTaskTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductTaskTracker
        fields="__all__"

class TaskTrackerSerializer(serializers.ModelSerializer):
    product=ProductTaskTrackerSerializer(many=True,read_only=False)
    extraService=ExtraServiceTaskTrackerSerializer(many=True,read_only=False)
    postService=PostServiceTaskTrackerSerializer(many=True,read_only=False)
    service=ServiceTaskTrackerSerializer(many=True,read_only=False)
    class Meta:
        model=TaskTracker
        fields="__all__"

class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rates
        fields="__all__"
from rest_framework import serializers
from rest_framework import status,mixins,generics,viewsets,permissions
from blogPost.models import TitleBlog,SectionBlog,Article,ArticleHeader
from django.contrib.auth.models import User


class BlogSectionSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    class Meta:
        model = SectionBlog
        fields='__all__'

class BlogCategorySerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    sectionBlog=BlogSectionSerializer(many=True,read_only=True)
    class Meta:
        model = TitleBlog
        fields='__all__'


class ArticleSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    class Meta:
        model = Article
        fields='__all__'

class ArticleHeaderSerializer(serializers.ModelSerializer):
    permission_classes=[permissions.AllowAny,]
    article=ArticleSerializer(many=True,read_only=True)
    class Meta:
        model = ArticleHeader
        fields='__all__'
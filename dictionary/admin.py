from django.contrib import admin

from .models import Article, Example


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    pass


@admin.register(Example)
class ExampleAdmin(admin.ModelAdmin):
    pass

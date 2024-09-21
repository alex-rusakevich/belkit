from django.contrib import admin

from .models import Article, Example


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ["title", "body", "translation_direction"]
    search_fields = ["title", "body"]
    list_filter = ["translation_direction"]


@admin.register(Example)
class ExampleAdmin(admin.ModelAdmin):
    list_display = ["chinese_text", "belarusian_text"]
    search_fields = ["chinese_text", "belarusian_text"]

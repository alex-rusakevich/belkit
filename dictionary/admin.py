from django.contrib import admin

from dictionary.models import Article


class ArticleAdmin(admin.ModelAdmin):
    model = Article
    list_display = ["title", "pronunciation", "body"]


admin.site.register(Article, ArticleAdmin)

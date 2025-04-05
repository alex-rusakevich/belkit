from django.contrib import admin
from django.db import models
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

from dictionary.models import Article, Example
from django_dsl_dict.widgets import DslTextarea


class ArticleAdmin(admin.ModelAdmin):
    class Media:
        css = {"all": ()}
        js = ()

    formfield_overrides = {
        models.TextField: {"widget": DslTextarea},
    }

    model = Article
    list_display = ["id", "title", "pronunciation", "get_body"]
    list_filter = ["direction"]
    search_fields = ["id", "title", "pronunciation", "body"]

    def get_body(self, obj):
        return mark_safe("<div style='white-space:pre-wrap'>" + obj.body + "</div>")

    get_body.short_description = _("Змест")


admin.site.register(Article, ArticleAdmin)


class ExampleAdmin(admin.ModelAdmin):
    model = Example
    list_display = ["id", "get_body_be", "get_body_zh"]
    search_fields = ["id", "body_be", "body_zh"]

    def get_body_be(self, obj):
        return mark_safe("<div style='white-space:pre-wrap'>" + obj.body_be + "</div>")

    get_body_be.short_description = _("Змест на беларускай")

    def get_body_zh(self, obj):
        return mark_safe("<div style='white-space:pre-wrap'>" + obj.body_zh + "</div>")

    get_body_zh.short_description = _("Змест на кітайскай")


admin.site.register(Example, ExampleAdmin)

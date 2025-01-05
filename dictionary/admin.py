from django.contrib import admin
from django.db import models
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from martor.widgets import AdminMartorWidget

from dictionary.models import Article, Example


class ArticleAdmin(admin.ModelAdmin):
    class Media:
        css = {"all": ("admin/css/martor-fix.css",)}
        js = ("admin/js/martor-custom-buttons.js",)

    formfield_overrides = {
        models.TextField: {"widget": AdminMartorWidget},
    }

    model = Article
    list_display = ["id", "title", "pronunciation", "get_body"]
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

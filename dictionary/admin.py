from django.contrib import admin
from django.db import models
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from martor.widgets import AdminMartorWidget

from dictionary.models import Article


class ArticleAdmin(admin.ModelAdmin):
    class Media:
        css = {"all": ("admin/css/martor-fix.css",)}

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

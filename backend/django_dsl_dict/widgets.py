from django.forms import Textarea
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe


class DslTextarea(Textarea):
    template_name = "widgets/dsl_textarea.html"

    class Media:
        css = {"all": ("css/dsl_textarea.css",)}
        js = ("js/dsl_textarea.js", "js/dsl_instruments.js")

    def __init__(self, attrs=None, char_limit=None):
        default_attrs = {"class": "dsl-textarea"}
        if attrs:
            default_attrs.update(attrs)
        super().__init__(default_attrs)

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        return context

    def render(self, name, value, attrs=None, renderer=None):
        context = self.get_context(name, value, attrs)
        return mark_safe(render_to_string(self.template_name, context))

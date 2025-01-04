import nh3
from django.db import models
from django.utils.translation import gettext_lazy as _


class Article(models.Model):
    class Meta:
        verbose_name = _("Артыкул")
        verbose_name_plural = _("Артыкулы")

    title = models.CharField(max_length=255, unique=True, verbose_name=_("Загаловак"))
    pronunciation = models.CharField(
        max_length=255, null=True, blank=True, verbose_name=_("Вымаўленне")
    )
    body = models.TextField(verbose_name=_("Змест"))

    def __str__(self):
        return _("<Артыкул '{}'>").format(self.title)

    def save(self, **kwargs):
        self.body = nh3.clean(self.body)
        super().save(**kwargs)

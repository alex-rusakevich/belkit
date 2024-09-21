from django.db import models
from django.utils.translation import gettext_lazy as _


class Article(models.Model):
    class Meta:
        verbose_name = _("Article")
        verbose_name_plural = _("Articles")

    class TranslationDirection(models.TextChoices):
        BEL_TO_CN = "BK", _("Belarusian to Chinese")
        CN_TO_BEL = "KB", _("Chinese to Belarusian")

    title = models.CharField(max_length=512, unique=True, verbose_name=_("Title"))
    pinyin = models.CharField(
        max_length=512, default=None, blank=True, null=True, verbose_name=_("Pinyin")
    )

    body = models.TextField(verbose_name=_("Body"))
    translation_direction = models.TextField(
        max_length=2,
        choices=TranslationDirection,
        default=TranslationDirection.CN_TO_BEL,
        verbose_name=_("Translation direction"),
    )


class Example(models.Model):
    class Meta:
        verbose_name = _("Example")
        verbose_name_plural = _("Examples")

    chinese_text = models.TextField(verbose_name=_("Chinese text"))
    belarusian_text = models.TextField(verbose_name=_("Belarusian text"))

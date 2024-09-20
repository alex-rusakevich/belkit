from django.db import models


class Article(models.Model):
    class TranslationDirection(models.TextChoices):
        BEL_TO_CN = "BK"
        CN_TO_BEL = "KB"

    title = models.CharField(max_length=512, unique=True)
    pinyin = models.CharField(max_length=512, default=None, blank=True, null=True)

    body = models.TextField()
    translation_direction = models.TextField(
        max_length=2,
        choices=TranslationDirection,
        default=TranslationDirection.CN_TO_BEL,
    )


class Example(models.Model):
    chinese_text = models.TextField()
    belarusian_text = models.TextField()

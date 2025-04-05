from django.db import models
from django.utils.translation import gettext_lazy as _


class Article(models.Model):
    class Direction(models.TextChoices):
        BY_ZH = "BZ", _("Бел-кіт")
        ZH_BY = "ZB", _("Кіт-бел")

    class Meta:
        verbose_name = _("Артыкул")
        verbose_name_plural = _("Артыкулы")

    title = models.CharField(max_length=255, unique=True, verbose_name=_("Загаловак"))
    pronunciation = models.CharField(
        max_length=255, null=True, blank=True, verbose_name=_("Вымаўленне")
    )
    body = models.TextField(verbose_name=_("Змест"))
    direction = models.CharField(
        max_length=2,
        choices=Direction.choices,
        default=Direction.BY_ZH,
        verbose_name=_("Напрамак перакладу"),
    )

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return _("<Артыкул '{}'>").format(self.title)

    def save(self, **kwargs):
        self.body = self.body
        self.title = self.title

        if self.pronunciation:
            self.pronunciation = self.pronunciation

        super().save(**kwargs)


class Example(models.Model):
    class Meta:
        verbose_name = _("Прыклад")
        verbose_name_plural = _("Прыклады")

    body_be = models.TextField(verbose_name=_("Змест на беларускай"))
    body_zh = models.TextField(verbose_name=_("Змест на кітайскай"))

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return _("<Прыклад #{} '{}...'>").format(self.id, self.body_be[:64])

    def save(self, **kwargs):
        self.body_be = self.body_be
        self.body_zh = self.body_zh
        super().save(**kwargs)

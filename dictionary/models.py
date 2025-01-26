import nh3
from django.db import models
from django.utils.translation import gettext_lazy as _


class Article(models.Model):
    class Direction(models.TextChoices):
        BY_CN = "BC", _("Бел-кіт")
        CN_BY = "CB", _("Кіт-бел")

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
        default=Direction.BY_CN,
        verbose_name=_("Напрамак перакладу"),
    )

    def __str__(self):
        return _("<Артыкул '{}'>").format(self.title)

    def save(self, **kwargs):
        self.body = nh3.clean(self.body)
        super().save(**kwargs)


class Example(models.Model):
    class Meta:
        verbose_name = _("Прыклад")
        verbose_name_plural = _("Прыклады")

    body_be = models.TextField(verbose_name=_("Змест на беларускай"))
    body_zh = models.TextField(verbose_name=_("Змест на кітайскай"))

    def __str__(self):
        return _("<Прыклад #{} '{}...'>").format(self.id, self.body_be[:64])

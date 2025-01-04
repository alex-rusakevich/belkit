import nh3
from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=256, unique=True)
    pronunciation = models.CharField(max_length=256, null=True, blank=True)
    body = models.TextField()

    def save(self, **kwargs):
        self.body = nh3.clean(self.body)
        super().save(**kwargs)

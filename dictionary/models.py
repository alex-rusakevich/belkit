from django.db import models


# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=512, unique=True)
    pinyin = models.CharField(max_length=512, default=None, blank=True, null=True)

    body = models.TextField()

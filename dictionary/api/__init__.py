from rest_framework import routers

from dictionary.api.article import ArticleViewSet
from dictionary.api.example import ExampleViewSet

router = routers.DefaultRouter()
router.register(r"articles", ArticleViewSet)
router.register(r"examples", ExampleViewSet)

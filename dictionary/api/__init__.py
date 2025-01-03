from rest_framework import routers

from dictionary.api.article import ArticleViewSet

router = routers.DefaultRouter()
router.register(r"articles", ArticleViewSet)

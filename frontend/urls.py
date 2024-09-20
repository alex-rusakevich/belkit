from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("search", views.search, name="search"),
    path("article/<str:article_title>/", views.view_article, name="view_article"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

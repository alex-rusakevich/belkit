from django.urls import include, path

from dictionary import views
from dictionary.api import router

urlpatterns = [
    path("", include(router.urls)),
    path("fullTextSearch", views.search_possible),
]

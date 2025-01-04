from django.contrib import admin
from django.urls import include, path

from dictionary.api import router

urlpatterns = [
    path("api/dictionary/", include(router.urls)),
    path("api/utils/", include("utils.urls")),
    path("admin/", admin.site.urls),
    path("martor/", include("martor.urls")),
    path("", include("frontend.urls")),
]

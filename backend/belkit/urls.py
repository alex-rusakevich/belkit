from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("api/dictionary/", include("dictionary.urls")),
    path("api/utils/", include("utils.urls")),
    path("admin/", admin.site.urls),
    path("martor/", include("martor.urls")),
]

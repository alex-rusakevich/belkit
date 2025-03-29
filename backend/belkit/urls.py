from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("api/dictionary/", include("dictionary.urls")),
    path("api/utils/", include("utils.urls")),
    path("admin/", admin.site.urls),
    path("martor/", include("martor.urls")),
]

if settings.DEBUG is True:
    urlpatterns = (
        static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + urlpatterns
    )
    urlpatterns = (
        static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + urlpatterns
    )

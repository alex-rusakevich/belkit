import os

from django.core.asgi import get_asgi_application
from django.urls import path, re_path

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "belkit.settings")
django_asgi_app = get_asgi_application()

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf import settings
from django_nextjs.proxy import NextJSProxyHttpConsumer, NextJSProxyWebsocketConsumer

http_routes = [re_path(r"", django_asgi_app)]
websocket_routers = []

if settings.DEBUG:
    http_routes.insert(
        0, re_path(r"^(?:_next|__next|next).*", NextJSProxyHttpConsumer.as_asgi())
    )
    websocket_routers.insert(
        0, path("_next/webpack-hmr", NextJSProxyWebsocketConsumer.as_asgi())
    )


application = ProtocolTypeRouter(
    {
        "http": URLRouter(http_routes),
        "websocket": AuthMiddlewareStack(URLRouter(websocket_routers)),
    }
)

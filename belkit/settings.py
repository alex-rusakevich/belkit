import os
import sys
from pathlib import Path

import dj_database_url
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.environ.get(
    "SECRET_KEY", "django-insecure-3(v0bjd*9u0koyy8*p&4=e)vrt^mn)($&@yd(@1sc03)js(la="
)

DEBUG = bool(os.environ.get("DJANGO_DEBUG", True))

LOG_LVL = "DEBUG" if DEBUG else "INFO"

LOG_DIR = Path(os.path.join(os.path.dirname(__file__), "..", "logs"))
LOG_DIR.mkdir(parents=True, exist_ok=True)


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {"format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"},
    },
    "handlers": {
        "default": {
            "level": LOG_LVL,
            "class": "logging.handlers.RotatingFileHandler",
            "filename": LOG_DIR / "default.log",
            "maxBytes": 1024 * 1024 * 5,  # 5 MB
            "backupCount": 5,
            "formatter": "standard",
        },
        "request_handler": {
            "level": LOG_LVL,
            "class": "logging.handlers.RotatingFileHandler",
            "filename": LOG_DIR / "django_request.log",
            "maxBytes": 1024 * 1024 * 5,  # 5 MB
            "backupCount": 5,
            "formatter": "standard",
        },
        "console": {
            "class": "logging.StreamHandler",
            "stream": sys.stdout,
            "formatter": "standard",
        },
        "mail_admins": {
            "level": "ERROR",
            "class": "django.utils.log.AdminEmailHandler",
            "include_html": True,
        },
    },
    "loggers": {
        "": {
            "handlers": ["default", "console"],
            "level": LOG_LVL,
            "propagate": True,
        },
        "django.request": {
            "handlers": ["request_handler", "console"],
            "level": LOG_LVL,
            "propagate": False,
        },
    },
}


ALLOWED_HOSTS = []

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "martor",
    "dictionary",
    "frontend",
    "utils",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "belkit.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "belkit.wsgi.application"


DATABASES = {
    "default": dj_database_url.config(
        env="DATABASE_URL",
        default="mysql://belkit_db_user:__belkit@localhost:3306/belkit_db",
        conn_max_age=600,
        conn_health_checks=True,
    ),
}


DATABASES["default"]["OPTIONS"] = {
    "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
    "charset": "utf8mb4",
    "collation": "utf8mb4_general_ci",
}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


LANGUAGE_CODE = "be-by"

TIME_ZONE = "Europe/Minsk"

USE_I18N = True

USE_TZ = True


# region Static files (CSS, JavaScript, Images)
STATIC_URL = "static/"
STATIC_ROOT = os.path.expandvars("~/public_html/static/")
MEDIA_URL = "media/"
MEDIA_ROOT = os.path.expandvars("~/public_html/media/")

MAX_UPLOAD_SIZE = os.environ.get("MAX_UPLOAD_SIZE", 8 * 1024 * 1024)  # 8 MB max size
MAX_FILES_AT_ONCE = os.environ.get("MAX_FILES_AT_ONCE", 15)

if DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, "static")
    MEDIA_ROOT = os.path.join(BASE_DIR, "media")

STATICFILES_DIRS = (
    BASE_DIR / os.path.join("frontend", "nextjs", "static"),
    BASE_DIR / os.path.join("dictionary", "static"),
)
# endregion


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly"
    ]
}

# region Configure markdown
MARTOR_THEME = "semantic"

MARTOR_TOOLBAR_BUTTONS = ["bold", "italic", "link", "help"]

MARTOR_MARKDOWN_EXTENSIONS = [
    "markdown.extensions.extra",
    "markdown.extensions.nl2br",
    "markdown.extensions.smarty",
    "markdown.extensions.fenced_code",
    "markdown.extensions.sane_lists",
    "dictionary.martor.extensions.color_squares",
]

ALLOWED_HTML_ATTRIBUTES = [
    "alt",
    "class",
    "color",
    "colspan",
    "datetime",
    "height",
    "href",
    "id",
    "name",
    "reversed",
    "rowspan",
    "scope",
    "src",
    "style",
    "title",
    "type",
    "width",
]
# endregion

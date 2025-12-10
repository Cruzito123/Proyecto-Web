"""
Django settings for Restaurant project.
"""
import os
from pathlib import Path
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# ==============================================================================
# SEGURIDAD
# ==============================================================================

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-zd#8*rh864_#b$7g+p(u2=ys_dzyq8^^bg2=*$=%)84klqiaoi')

DEBUG = os.environ.get('DEBUG', 'False') == 'True'

# ==============================================================================
# DOMINIOS PERMITIDOS (UNA SOLA VEZ)
# ==============================================================================

ALLOWED_HOSTS = [
    'lejardinmexican.duckdns.org',
    'www.lejardinmexican.duckdns.org',
    '78.13.206.166',      # IP pública de EC2
    '172.31.6.83',        # IP privada de EC2
    'localhost',
    '127.0.0.1',
]

# Si hay más hosts en .env, los agregamos
if os.environ.get('ALLOWED_HOSTS'):
    ALLOWED_HOSTS.extend(os.environ.get('ALLOWED_HOSTS').split(','))

# ==============================================================================
# APLICACIONES
# ==============================================================================

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'myRestaurant',
    'corsheaders',
]

# Solo agregar sslserver en desarrollo local
if DEBUG:
    try:
        import sslserver
        INSTALLED_APPS.append('sslserver')
    except ImportError:
        pass

# ==============================================================================
# MIDDLEWARE
# ==============================================================================

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Restaurant.urls'

# ==============================================================================
# TEMPLATES
# ==============================================================================

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "myRestaurant" / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Restaurant.wsgi.application'

# ==============================================================================
# BASE DE DATOS
# ==============================================================================

DATABASES = {
    'default': dj_database_url.config(
        default='postgres://postgres:Losarmas1*@localhost:5432/restaurant_db',
        conn_max_age=600
    )
}

# ==============================================================================
# VALIDACIÓN DE CONTRASEÑAS
# ==============================================================================

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ==============================================================================
# INTERNACIONALIZACIÓN
# ==============================================================================

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ==============================================================================
# ARCHIVOS ESTÁTICOS
# ==============================================================================

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / "myRestaurant" / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ==============================================================================
# CONFIGURACIÓN HTTPS/SSL (PRODUCCIÓN)
# ==============================================================================

# Permite que Django confíe en el header X-Forwarded-Proto de Nginx
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# ⚠️ NO redirigir a HTTPS desde Django (Nginx ya lo hace)
SECURE_SSL_REDIRECT = False

# Cookies seguras (solo HTTPS)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# ==========================================
# CONFIGURACIÓN CSRF (Agregar después de MIDDLEWARE)
# ==========================================

# Permitir CSRF desde tu dominio
CSRF_TRUSTED_ORIGINS = [
    'https://lejardinmexican.duckdns.org',
    'https://www.lejardinmexican.duckdns.org',
]

# IMPORTANTE: Como estás en producción sin subdominios complejos
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = False  # ← Permite que JavaScript acceda al token
CSRF_COOKIE_SAMESITE = 'Lax'  # ← Importante para formularios
CSRF_USE_SESSIONS = False

# ==========================================
# CONFIGURACIÓN CORS (Actualizar)
# ==========================================

CORS_ALLOW_ALL_ORIGINS = False  # Cambiar a False en producción
CORS_ALLOWED_ORIGINS = [
    'https://lejardinmexican.duckdns.org',
    'https://www.lejardinmexican.duckdns.org',
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# ==========================================
# CONFIGURACIÓN DE SEGURIDAD
# ==========================================

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = 'Lax'

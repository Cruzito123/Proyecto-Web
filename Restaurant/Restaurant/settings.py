"""
Django settings for Restaurant project.
"""
import os
from pathlib import Path
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- SEGURIDAD Y PRODUCCIÓN ---

# SECRET KEY: En producción usa la del entorno, sino la default
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-zd#8*rh864_#b$7g+p(u2=ys_dzyq8^^bg2=*$=%)84klqiaoi')

# DEBUG: Debe ser False en producción, pero lo dejamos dinámico
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

# --- DOMINIOS PERMITIDOS ---
# Agregamos explícitamente tu dominio DuckDNS y las IPs locales
ALLOWED_HOSTS = [
    'lejardinmexican.duckdns.org', 
    'localhost', 
    '127.0.0.1', 
    'www.lejardinmexican.duckdns.org'
]
# Si hay más en el .env, los agregamos también
if os.environ.get('ALLOWED_HOSTS'):
    ALLOWED_HOSTS.extend(os.environ.get('ALLOWED_HOSTS').split(','))


# Application definition

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

# Solo agregamos sslserver si estamos en modo DEBUG (desarrollo local)
if DEBUG:
    try:
        import sslserver
        INSTALLED_APPS.append('sslserver')
    except ImportError:
        pass

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # CORS debe ir lo más arriba posible
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # Recomendado para estáticos en prod (opcional)
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Restaurant.urls'

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


# Database
DATABASES = {
    'default': dj_database_url.config(
        default='postgres://postgres:Losarmas1*@localhost:5432/restaurant_db',
        conn_max_age=600
    )
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

STATICFILES_DIRS = [
    BASE_DIR / "myRestaurant" / "static",
]

# Carpeta para Nginx
STATIC_ROOT = BASE_DIR / "staticfiles"


# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ==========================================
# CONFIGURACIÓN PARA PRODUCCIÓN (HTTPS / AWS)
# ==========================================

# 1. ESTA LÍNEA ES LA SOLUCIÓN AL ERROR DE REDIRECCIONES
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# 2. Permitir tu dominio
ALLOWED_HOSTS = ['*', 'lejardinmexican.duckdns.org', 'localhost', '127.0.0.1']

# 3. Confianza para el Login (CSRF) - OBLIGATORIO
CSRF_TRUSTED_ORIGINS = [
    "https://lejardinmexican.duckdns.org",
]

# 4. CORS (Para que React se conecte)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://lejardinmexican.duckdns.org",
]
CORS_ALLOW_CREDENTIALS = True

# 5. Seguridad
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True
# ==========================================
# CONFIGURACIÓN OBLIGATORIA PARA AWS / NGINX
# ==========================================

# 1. ESTO ARREGLA EL BUCLE DE REDIRECCIONES
# Le dice a Django: "Si Nginx te dice que es HTTPS, créetelo".
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# 2. Seguridad SSL
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# 3. Permitir tu dominio DuckDNS (Sobrescribe lo anterior para asegurar)
ALLOWED_HOSTS = ['*', 'lejardinmexican.duckdns.org', 'localhost', '127.0.0.1']

# 4. Confianza para Login (CSRF)
CSRF_TRUSTED_ORIGINS = [
    "https://lejardinmexican.duckdns.org",
    "https://www.lejardinmexican.duckdns.org"
]

# 5. Conexión con React (CORS)
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://lejardinmexican.duckdns.org",
    "https://www.lejardinmexican.duckdns.org"
]

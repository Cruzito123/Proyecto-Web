"""
Django settings for Restaurant project.
"""
import os
from pathlib import Path
import dj_database_url  # Asegúrate de haber instalado: pip install dj-database-url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- SEGURIDAD Y PRODUCCIÓN ---

# SECURITY WARNING: keep the secret key used in production secret!
# En producción leerá la variable de entorno, en local usará la clave insegura por defecto.
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-zd#8*rh864_#b$7g+p(u2=ys_dzyq8^^bg2=*$=%)84klqiaoi')

# SECURITY WARNING: don't run with debug turned on in production!
# Busca la variable 'DEBUG'. Si no existe, asume False (seguro para producción).
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

# ALLOWED_HOSTS: Lee una lista separada por comas desde las variables de entorno.
# Ejemplo en .env: ALLOWED_HOSTS=tusitio.com,54.123.45.67
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '127.0.0.1,localhost').split(',')


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
    # 'sslserver' se agrega dinámicamente abajo solo si es necesario
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
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# Configuración híbrida:
# 1. Intenta usar la variable DATABASE_URL del entorno (AWS/Producción).
# 2. Si no la encuentra, usa tu configuración local de siempre.

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

# Carpetas donde buscas estáticos en desarrollo
STATICFILES_DIRS = [
    BASE_DIR / "myRestaurant" / "static",
]

# IMPORTANTE PARA PRODUCCIÓN:
# Carpeta donde se juntarán todos los estáticos al ejecutar "python manage.py collectstatic"
STATIC_ROOT = BASE_DIR / "staticfiles"


# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# --- CONFIGURACIÓN DE CORS ---

CORS_ALLOW_CREDENTIALS = True

# En producción, lee los orígenes desde el entorno.
# Si no hay variable, usa tus valores locales por defecto.
if 'CORS_ALLOWED_ORIGINS' in os.environ:
    CORS_ALLOWED_ORIGINS = os.environ['CORS_ALLOWED_ORIGINS'].split(',')
else:
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://localhost:3000",
        "https://127.0.0.1:3000",
        "https://192.168.56.1:3000",
    ]
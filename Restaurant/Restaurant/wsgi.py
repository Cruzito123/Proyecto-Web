"""
WSGI config for Restaurant project.
"""

import os
from pathlib import Path
from django.core.wsgi import get_wsgi_application
from dotenv import load_dotenv

# 👇 ESTO ES LO NUEVO: Cargar el archivo .env
# Calcula la ruta para encontrar el .env dos carpetas arriba
env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(env_path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Restaurant.settings')

application = get_wsgi_application()

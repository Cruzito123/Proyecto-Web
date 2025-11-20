from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('usuarios/', UsuarioList.as_view()),
    
    # 1. Ruta para ALTAS (POST) y Listar Platillos (GET sin ID)
    # URL: /api/platillos/
    path('platillos/', PlatilloList.as_view()),
    
    # ✅ LÍNEA CRUCIAL FALTANTE O INCORRECTA
    # 2. Ruta para MODIFICAR (PUT) y BAJA (DELETE) de un Platillo específico.
    # URL: /api/platillos/2/ (o cualquier ID)
    path('platillos/<int:pk>/', PlatilloDetail.as_view()),
   
]
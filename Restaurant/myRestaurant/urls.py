# myRestaurant/urls.py - VERSIÓN FINAL CORREGIDA
from django.urls import path
from .views import *

urlpatterns = [
    # Autenticación y Usuarios
    path('login/', LoginView.as_view()),
    path('usuarios/', UsuarioList.as_view()),
    path('usuarios/<int:pk>/', UsuarioDetail.as_view()),
    
    # Platillos
    path('platillos/', PlatilloList.as_view()),
    path('platillos/<int:pk>/', PlatilloDetail.as_view()),
    
    # Reservaciones
    path('reservaciones/', ReservacionList.as_view()),
    path('reservaciones/<int:pk>/', ReservacionDetail.as_view()),
    
    # ✅ Reseñas - RUTAS CORRECTAS
    path('resenas/', ResenaList.as_view(), name='resena-list'),
    path('resenas/<int:pk>/', ResenaDetail.as_view(), name='resena-detail'),
    
    # ❌ NO incluyas esto: path('api/', include('myRestaurant.urls'))
]
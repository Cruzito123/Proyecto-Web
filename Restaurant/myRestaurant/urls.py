from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('usuarios/', UsuarioList.as_view()),
    path('platillos/', PlatilloList.as_view()),
   
    # aGREGAR ESTAS RUTAS PARA RESERVACIONES
    path('reservaciones/', ReservacionList.as_view()),
    path('reservaciones/<int:pk>/', ReservacionDetail.as_view()),
]

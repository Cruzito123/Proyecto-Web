from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('usuarios/', UsuarioList.as_view()),
    path('platillos/', PlatilloList.as_view()),
   
]

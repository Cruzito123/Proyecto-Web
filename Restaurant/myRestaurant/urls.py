from django.urls import path
from . import views

urlpatterns = [
    path('', views.Inicio, name='Inicio'),
    path('Altas', views.Altas, name='Altas'),
]

from django.urls import path
from . import views
from .views import UsuarioList

urlpatterns = [
path('', UsuarioList.as_view(), name='Inicio'),

]

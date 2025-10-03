from django.shortcuts import render, redirect
from django.db import connection
from .models import Platillo

def Inicio(request):
    # Obtenemos todos los platillos de la base de datos
    platillos = Platillo.objects.all()
    return render(request, 'index.html', {'platillos': platillos})

def Altas(request):
    return render(request, 'Altas.html')
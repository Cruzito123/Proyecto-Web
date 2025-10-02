from django.shortcuts import render, redirect
from django.db import connection
from .models import Platillo

def Inicio(request):
    return render(request, 'index.html')

def Altas(request):
    return render(request, 'Altas.html')
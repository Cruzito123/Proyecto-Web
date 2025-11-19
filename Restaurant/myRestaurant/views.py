from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from .models import *
from .serializers import *
from .serializers import (
    UsuarioSerializer,
    PlatilloSerializer,
    ReservacionSerializer,
    PedidoSerializer,
    DetallePedidoSerializer,
    ResenaSerializer
)


# -----------------------
# AUTH: Login / Registro
# -----------------------
def home(request):
    return JsonResponse({"status": "API funcionando"})

class RegisterView(APIView):
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Usuario creado correctamente"})
        return Response(serializer.errors, status=400)


class LoginView(APIView):
    def post(self, request):
        correo = request.data.get("correo")
        contrasena = request.data.get("contrasena")

        try:
            user = Usuario.objects.get(correo=correo)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=404)

        if not check_password(contrasena, user.contrasena):
            return Response({"error": "Contraseña incorrecta"}, status=400)

        return Response({
            "mensaje": "Login correcto",
            "usuario": UsuarioSerializer(user).data
        })


# -----------------------
# CRUD API Genéricas
# -----------------------

class UsuarioList(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class PlatilloList(generics.ListCreateAPIView):
    queryset = Platillo.objects.all()
    serializer_class = PlatilloSerializer

class PlatilloDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Platillo.objects.all()
    serializer_class = PlatilloSerializer


class ReservacionList(generics.ListCreateAPIView):
    queryset = Reservacion.objects.all()
    serializer_class = ReservacionSerializer

class ReservacionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservacion.objects.all()
    serializer_class = ReservacionSerializer


class PedidoList(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class PedidoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer


class DetallePedidoList(generics.ListCreateAPIView):
    queryset = DetallePedido.objects.all()
    serializer_class = DetallePedidoSerializer

class DetallePedidoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DetallePedido.objects.all()
    serializer_class = DetallePedidoSerializer


class ResenaList(generics.ListCreateAPIView):
    queryset = Resena.objects.all()
    serializer_class = ResenaSerializer

class ResenaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resena.objects.all()
    serializer_class = ResenaSerializer


class BlogList(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class BlogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class FidelidadList(generics.ListCreateAPIView):
    queryset = Fidelidad.objects.all()
    serializer_class = FidelidadSerializer

class FidelidadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fidelidad.objects.all()
    serializer_class = FidelidadSerializer


class EventoList(generics.ListCreateAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

class EventoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer


class RedSocialList(generics.ListCreateAPIView):
    queryset = RedSocial.objects.all()
    serializer_class = RedSocialSerializer

class RedSocialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RedSocial.objects.all()
    serializer_class = RedSocialSerializer


class ContactoList(generics.ListCreateAPIView):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

class ContactoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

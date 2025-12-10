from rest_framework import generics,status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from .models import *
from rest_framework.permissions import IsAdminUser
from .serializers import UserManagementSerializer
from .serializers import *
from .serializers import (
    UsuarioSerializer,
    PlatilloSerializer,
    ReservacionSerializer,
    PedidoSerializer,
    DetallePedidoSerializer,
    ResenaSerializer
)
from .models import Resena
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

@ensure_csrf_cookie
def get_csrf_token(view):
    """Vista para obtener el CSRF token"""
    return JsonResponse({'detail': 'CSRF cookie set'})


User = get_user_model() 

class UserManagementViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserManagementSerializer
    # ¡IMPORTANTE! Solo los administradores deben usar esta vista
    permission_classes = [IsAdminUser]

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
            # 👈 Retorna el objeto de usuario creado (frame correspondiente)
            return Response(serializer.data, status=201) 
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    # No usar @csrf_exempt en producción, solo para debugging
    # @method_decorator(csrf_exempt)
    # def dispatch(self, *args, **kwargs):
    #     return super().dispatch(*args, **kwargs)
    
    def post(self, request):
        correo = request.data.get("correo")
        contrasena = request.data.get("contrasena")

        print(f"🔐 Intento de login: {correo}")  # Debug

        try:
            user = Usuario.objects.get(correo=correo)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=404)

        if not check_password(contrasena, user.contrasena):
            return Response({"error": "Credenciales incorrectas"}, status=400)

        print(f"✅ Login exitoso: {user.nombre}")  # Debug
        
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

# En views.py, en la clase ResenaList:
class ResenaList(generics.ListCreateAPIView):
    queryset = Resena.objects.all().order_by('-fecha')
    serializer_class = ResenaSerializer
    
    def create(self, request, *args, **kwargs):
        print(f"📥 POST /api/resenas/ - Datos: {request.data}")
        
        try:
            # Validar que el usuario existe
            from .models import Usuario
            usuario_id = request.data.get('usuario')
            if usuario_id:
                if not Usuario.objects.filter(id=usuario_id).exists():
                    return Response(
                        {"error": f"Usuario con ID {usuario_id} no existe"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            # Validar platillo si se envió
            platillo_id = request.data.get('platillo')
            if platillo_id and platillo_id != "":
                if not Platillo.objects.filter(id=platillo_id).exists():
                    return Response(
                        {"error": f"Platillo con ID {platillo_id} no existe"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            response = super().create(request, *args, **kwargs)
            print(f"✅ Reseña creada ID: {response.data.get('id')}")
            return response
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class ResenaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resena.objects.all()
    serializer_class = ResenaSerializer

class PlatilloList(generics.ListAPIView):
    queryset = Platillo.objects.all()
    serializer_class = PlatilloSerializer

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

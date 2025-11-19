from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'contrasena': {'write_only': True}
        }

def create(self, validated_data):
    from django.contrib.auth.hashers import make_password
    print("Datos validados:", validated_data)  # <-- ver qué llega
    validated_data['contrasena'] = make_password(validated_data['contrasena'])
    usuario = super().create(validated_data)
    print("Usuario creado:", usuario)          # <-- ver si realmente se crea
    return usuario


class PlatilloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platillo
        fields = '__all__'


class ReservacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservacion
        fields = '__all__'


class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'


class DetallePedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetallePedido
        fields = '__all__'


class ResenaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resena
        fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'


class FidelidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fidelidad
        fields = '__all__'


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = '__all__'


class RedSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = RedSocial
        fields = '__all__'


class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'

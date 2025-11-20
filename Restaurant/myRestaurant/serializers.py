from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password # Importación necesaria para el hasheo

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'contrasena': {'write_only': True}
        }
    
    # 💥 ESTE ES EL MÉTODO CORREGIDO Y ROBUSTO PARA HASHEAR 💥
    def create(self, validated_data):
        
        # Saca la contraseña del diccionario de datos validados para que no se guarde en texto plano
        password_plano = validated_data.pop('contrasena') 
        
        # Crea el objeto Usuario usando todos los demás campos
        usuario = Usuario.objects.create(**validated_data)
        
        # Hashea la contraseña y la guarda explícitamente en el objeto Usuario
        usuario.contrasena = make_password(password_plano)
        usuario.save()
        
        # Muestra una señal clara de que el hasheo funcionó
        print("✅ HASHEO EXITOSO. Contraseña hasheada guardada:", usuario.contrasena) 
        
        return usuario


class PlatilloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platillo
        fields = '__all__'

    # ✅ MÉTODO UPDATE CORREGIDO para manejar PATCH
    def update(self, instance, validated_data):
        # 👈 DEBUG: Imprime los datos que el serializador está a punto de guardar
        print("✅ SERIALIZER UPDATE: Datos validados para Platillo:", validated_data)
        
        # Este bucle aplica los datos que vienen en validated_data a la instancia
        # Solo se incluyen los campos enviados en la petición PATCH
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        
        # 👈 DEBUG: Imprime la instancia después de guardar
        print("✅ PLATILLO ACTUALIZADO EN DB:", instance.nombre, instance.precio)
        
        return instance

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
from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password # Importación necesaria para el hasheo
from django.contrib.auth import get_user_model

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

User = get_user_model()

class UserManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        # Incluye los campos necesarios para la gestión administrativa
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'is_staff', 'is_active', 'groups']
        # Oculta la contraseña en la respuesta y permite solo escritura
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # Sobrescribe el método create para hashear la contraseña
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    # Sobrescribe el update para manejar la contraseña si se cambia
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)



# En serializers.py - ACTUALIZA el ReservacionSerializer
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


# myRestaurant/serializers.py
class ResenaSerializer(serializers.ModelSerializer):
    # Campo adicional para mostrar nombre del platillo
    platillo_nombre = serializers.CharField(
        source='platillo.nombre', 
        read_only=True, 
        allow_null=True
    )
    
    class Meta:
        model = Resena
        fields = [
            'id', 'usuario', 'platillo', 'platillo_nombre',
            'calificacion', 'comentario', 'fecha', 'nombre', 'tipo'
        ]
        extra_kwargs = {
            'platillo': {'required': False, 'allow_null': True},
            'usuario': {'required': True}
        }
    
    def validate(self, data):
        # Validación personalizada si necesitas
        if data.get('calificacion') < 1 or data.get('calificacion') > 5:
            raise serializers.ValidationError("La calificación debe estar entre 1 y 5")
        return data

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
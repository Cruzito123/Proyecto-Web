#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import ssl
# 👇 2. Pega este bloque completo para arreglar el error en Python 3.12/3.13
if not hasattr(ssl, 'wrap_socket'):
    def wrap_socket(sock, keyfile=None, certfile=None, **kwargs):
        context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
        # Cargar el protocolo correcto si se especifica, o usar TLS por defecto
        if 'ssl_version' in kwargs:
            context = ssl.SSLContext(kwargs['ssl_version'])
        
        if certfile:
            context.load_cert_chain(certfile=certfile, keyfile=keyfile)
            
        return context.wrap_socket(sock, server_side=kwargs.get('server_side', False))
    
    ssl.wrap_socket = wrap_socket
# 👆 Fin del arreglo

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Restaurant.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

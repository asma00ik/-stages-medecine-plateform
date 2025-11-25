"""
<<<<<<<< HEAD:backend/config/asgi.py
ASGI config for config project.
========
ASGI config for core project.
>>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7:backend/core/core/asgi.py

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

<<<<<<<< HEAD:backend/config/asgi.py
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
========
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
>>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7:backend/core/core/asgi.py

application = get_asgi_application()

"""
<<<<<<<< HEAD:backend/config/wsgi.py
WSGI config for config project.
========
WSGI config for core project.
>>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7:backend/core/core/wsgi.py

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

<<<<<<<< HEAD:backend/config/wsgi.py
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
========
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
>>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7:backend/core/core/wsgi.py

application = get_wsgi_application()

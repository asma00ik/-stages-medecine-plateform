#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) 
sys.path.append(BASE_DIR)

def main():
    """Run administrative tasks."""
<<<<<<<< HEAD:backend/manage.py
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
========
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
>>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7:backend/core/manage.py
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

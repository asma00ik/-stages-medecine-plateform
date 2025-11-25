from django.contrib import admin

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, StudentProfile, HospitalAccount, DoctorProfile

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("email","role","is_staff","is_superuser")
    search_fields = ("email",)
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("email","password")}),
        ("Permissions", {"fields": ("role","is_staff","is_superuser")}),
        ("Important dates", {"fields": ("last_login",)}),
    )
    add_fieldsets = ((None, {"classes": ("wide",), "fields": ("email","password1","password2")}),)

admin.site.register(StudentProfile)
admin.site.register(HospitalAccount)
admin.site.register(DoctorProfile)

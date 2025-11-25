from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        if extra_fields.get("role") is None:
            extra_fields.setdefault("role", "STUDENT")
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "ADMIN")
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ("STUDENT", "Étudiant"),
        ("DOCTOR", "Médecin"),
        ("HOSPITAL", "Établissement"),
        ("ADMIN", "Administrateur central"),
    ]
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="STUDENT")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email} ({self.role})"
    

def get_username(self):
    return self.email


class StudentProfile(models.Model):
    user = models.OneToOneField("accounts.User", on_delete=models.CASCADE, related_name="student_profile")
    matricule = models.CharField(max_length=12, unique=True)
    annee_univ = models.CharField(max_length=20, blank=True, null=True)
    first_name = models.CharField(max_length=120, blank=True, null=True)
    last_name = models.CharField(max_length=120, blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)
    cv = models.FileField(upload_to="students/cv/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Étudiant {self.matricule}"


class HospitalAccount(models.Model):
    user = models.OneToOneField("accounts.User", on_delete=models.CASCADE, related_name="hospital_account")
    code_etablissement = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=512, blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)
    logo = models.ImageField(upload_to="hospitals/logos/", blank=True, null=True,
                             default="/mnt/data/2E7FE419-76DD-44A7-BD0E-4A2F41C13D1A.jpeg")

    def __str__(self):
        return f"{self.name or self.user.email} ({self.code_etablissement})"


class DoctorProfile(models.Model):
    user = models.OneToOneField("accounts.User", on_delete=models.CASCADE, related_name="doctor_profile")
    is_head = models.BooleanField(default=False)
    phone = models.CharField(max_length=30, blank=True, null=True)
    # hospital/service relations are in doctors app (string refs there)

    def __str__(self):
        return f"Doctor {self.user.email}"
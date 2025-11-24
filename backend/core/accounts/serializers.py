from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken

from .models import StudentProfile, HospitalAccount, DoctorProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "role", "is_staff")


# ---------------- Register serializers (used by admin/hospital) ----------------
class RegisterStudentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, validators=[validate_password])
    matricule = serializers.CharField(max_length=12)
    annee_univ = serializers.CharField(required=False, allow_blank=True)

    def validate_matricule(self, v):
        if not (v.isdigit() and len(v) == 12):
            raise serializers.ValidationError("Matricule must be exactly 12 digits.")
        if StudentProfile.objects.filter(matricule=v).exists():
            raise serializers.ValidationError("Matricule already exists.")
        return v

    def validate_email(self, v):
        if User.objects.filter(email=v).exists():
            raise serializers.ValidationError("Email already used.")
        return v

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            role="STUDENT"
        )
        StudentProfile.objects.create(user=user, matricule=validated_data["matricule"], annee_univ=validated_data.get("annee_univ", ""))
        return user


class RegisterHospitalSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, validators=[validate_password])
    code_etab = serializers.CharField()
    name = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)

    def validate_email(self, v):
        if User.objects.filter(email=v).exists():
            raise serializers.ValidationError("Email already used.")
        return v

    def validate_code_etab(self, v):
        if HospitalAccount.objects.filter(code_etablissement=v).exists():
            raise serializers.ValidationError("Code etablissement already used.")
        return v

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            role="HOSPITAL"
        )
        HospitalAccount.objects.create(
            user=user,
            code_etablissement=validated_data["code_etab"],
            name=validated_data.get("name", ""),
            address=validated_data.get("address", "")
        )
        return user


class RegisterDoctorSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, validators=[validate_password])
    is_head = serializers.BooleanField(default=False)

    def validate_email(self, v):
        if User.objects.filter(email=v).exists():
            raise serializers.ValidationError("Email already used.")
        return v

    def create(self, validated_data):
        user = User.objects.create_user(email=validated_data["email"], password=validated_data["password"], role="DOCTOR")
        DoctorProfile.objects.create(user=user, is_head=validated_data.get("is_head", False))
        return user


# ---------------- Login serializers ----------------
class StudentLoginSerializer(serializers.Serializer):
    matricule = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        matricule = attrs.get("matricule")
        password = attrs.get("password")
        try:
            profile = StudentProfile.objects.get(matricule=matricule)
        except StudentProfile.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials.")
        user = profile.user
        if not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials.")
        attrs["user"] = user
        return attrs


class HospitalLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    code_etab = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        code = attrs.get("code_etab")

        user = authenticate(email=email, password=password)
        if not user or user.role != "HOSPITAL":
            raise serializers.ValidationError("Invalid credentials.")

        try:
            account = user.hospital_account
        except HospitalAccount.DoesNotExist:
            raise serializers.ValidationError("Hospital account missing.")

        if account.code_etablissement != code:
            raise serializers.ValidationError("Invalid code_etab.")

        attrs["user"] = user
        return attrs

class DoctorLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    service_id = serializers.IntegerField(required=False)
    chef_service = serializers.BooleanField(default=False)

    def validate(self, attrs):
        email = attrs.get("email"); password = attrs.get("password")
        chef_flag = attrs.get("chef_service", False)
        user = authenticate(email=email, password=password)
        if not user or user.role != "DOCTOR":
            raise serializers.ValidationError("Invalid credentials.")
        try:
            doctor = user.doctor_profile
        except DoctorProfile.DoesNotExist:
            raise serializers.ValidationError("Doctor profile missing.")
        if chef_flag and not doctor.is_head:
            raise serializers.ValidationError("Not head of service.")
        attrs["user"] = user
        return attrs


# ---------------- Token helper serializer (response) ----------------
class TokenResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()
    role = serializers.CharField()
    email = serializers.EmailField()
    id = serializers.IntegerField()
    matricule = serializers.CharField(required=False, allow_null=True)

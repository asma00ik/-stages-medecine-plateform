from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate

from .serializers import (
    RegisterStudentSerializer, RegisterHospitalSerializer, RegisterDoctorSerializer,
    StudentLoginSerializer, HospitalLoginSerializer, DoctorLoginSerializer,
    TokenResponseSerializer, UserSerializer
)
from .models import StudentProfile

User = get_user_model()

def tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)
    return {
        "refresh": str(refresh),
        "access": access,
        "role": user.role,
        "email": user.email,
        "id": user.id,
        "matricule": getattr(getattr(user, "student_profile", None), "matricule", None)
    }


# --- Registration endpoints (only ADMIN can create) ---
class RegisterStudentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        if request.user.role != "ADMIN":
            return Response({"detail":"Only central admin can create students."}, status=status.HTTP_403_FORBIDDEN)
        serializer = RegisterStudentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

class RegisterHospitalView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        if request.user.role != "ADMIN":
            return Response({"detail":"Only central admin can create hospitals."}, status=status.HTTP_403_FORBIDDEN)
        serializer = RegisterHospitalSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

class RegisterDoctorView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        if request.user.role not in ("ADMIN", "HOSPITAL"):
            return Response({"detail":"Not authorized."}, status=status.HTTP_403_FORBIDDEN)
        serializer = RegisterDoctorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


# --- Login endpoints ---
class StudentLoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = StudentLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        payload = tokens_for_user(user)
        return Response(TokenResponseSerializer(payload).data, status=status.HTTP_200_OK)


class HospitalLoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = HospitalLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        payload = tokens_for_user(user)
        return Response(TokenResponseSerializer(payload).data, status=status.HTTP_200_OK)


class DoctorLoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = DoctorLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        payload = tokens_for_user(user)
        return Response(TokenResponseSerializer(payload).data, status=status.HTTP_200_OK)

class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)

        if not user:
            return Response({"detail": "Informations incorrectes"}, status=400)

        if user.role != "ADMIN":
            return Response({"detail": "Ce compte n’est pas un administrateur"}, status=403)

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role,
            }
        })
# Me & Logout
class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        return Response(UserSerializer(request.user).data)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        refresh = request.data.get("refresh")
        if not refresh:
            return Response({"detail":"refresh token required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh)
            token.blacklist()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception:
            return Response({"detail":"invalid token"}, status=status.HTTP_400_BAD_REQUEST)

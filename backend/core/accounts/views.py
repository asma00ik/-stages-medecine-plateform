# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny

from .serializers import (
    RegisterStudentSerializer, RegisterHospitalSerializer, RegisterDoctorSerializer,
    StudentLoginSerializer, HospitalLoginSerializer, DoctorLoginSerializer,
    TokenResponseSerializer, UserSerializer
)

User = get_user_model()


def tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "role": user.role,
        "email": user.email,
        "id": user.id,
        "matricule": getattr(getattr(user, "student_profile", None), "matricule", None)
    }


# ---------------- Registration ----------------
class RegisterStudentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if request.user.role != "ADMIN":
            return Response({"detail": "Seul l’administrateur central peut créer des étudiants."},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = RegisterStudentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class RegisterHospitalView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if request.user.role != "ADMIN":
            return Response({"detail": "Seul l’administrateur central peut créer des hôpitaux."},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = RegisterHospitalSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class RegisterDoctorView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if request.user.role not in ("ADMIN", "HOSPITAL"):
            return Response({"detail": "Non autorisé."},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = RegisterDoctorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


# ---------------- Login ----------------
class StudentLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = StudentLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        payload = tokens_for_user(user)

        return Response(TokenResponseSerializer(payload).data)


class HospitalLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = HospitalLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        payload = tokens_for_user(user)

        return Response(TokenResponseSerializer(payload).data)


class DoctorLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = DoctorLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        payload = tokens_for_user(user)

        return Response(TokenResponseSerializer(payload).data)


# ---------------- Admin Login ----------------
class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)

        if not user:
            return Response({"detail": "Informations incorrectes."}, status=400)

        if user.role != "ADMIN":
            return Response({"detail": "Ce compte n’est pas un administrateur."}, status=403)

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


# ---------------- Me & Logout ----------------
class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        refresh = request.data.get("refresh")

        if not refresh:
            return Response({"detail": "Jeton refresh requis."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh)
            token.blacklist()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception:
            return Response({"detail": "Jeton invalide."},
                            status=status.HTTP_400_BAD_REQUEST)
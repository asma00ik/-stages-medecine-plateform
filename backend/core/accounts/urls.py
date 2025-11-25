from django.urls import path
from .views import (
    RegisterStudentView, RegisterHospitalView, RegisterDoctorView,
    StudentLoginView, HospitalLoginView, DoctorLoginView,
    MeView, LogoutView, AdminLoginView,
)

urlpatterns = [
    path("register/student/", RegisterStudentView.as_view(), name="register_student"),
    path("register/hospital/", RegisterHospitalView.as_view(), name="register_hospital"),
    path("register/doctor/", RegisterDoctorView.as_view(), name="register_doctor"),

    path("login/student/", StudentLoginView.as_view(), name="login_student"),
    path("login/hospital/", HospitalLoginView.as_view(), name="login_hospital"),
    path("login/doctor/", DoctorLoginView.as_view(), name="login_doctor"),
    path("login/admin/", AdminLoginView.as_view(), name="login_admin"),
    path("me/", MeView.as_view(), name="me"),
    path("logout/", LogoutView.as_view(), name="logout"),
]

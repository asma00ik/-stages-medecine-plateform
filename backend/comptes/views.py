from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .forms import LoginForm

def login_view(request):
    error = None

    if request.method == "POST":
        form = LoginForm(request, data=request.POST)
        selected_role = request.POST.get("role")

        if form.is_valid():
            user = authenticate(
                request,
                username=form.cleaned_data.get("username"),
                password=form.cleaned_data.get("password")
            )

            if user:
                if user.role != selected_role:
                    error = "Role does not match. Please choose your correct role."
                else:
                    login(request, user)
                    return redirect("dashboard")  # à ajuster selon ton projet
        else:
            error = "Invalid credentials"

    else:
        form = LoginForm()

    return render(request, "comptes/login.html", {"form": form, "error": error})

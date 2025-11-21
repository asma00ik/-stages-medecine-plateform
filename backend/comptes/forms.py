from django import forms
from django.contrib.auth.forms import AuthenticationForm

class LoginForm(AuthenticationForm):
    role = forms.ChoiceField(
        choices=[
            ('etudiant', 'Étudiant'),
            ('enseignant', 'Enseignant / Médecin'),
            ('chef_service', 'Chef de service'),
            ('admin', 'Administrateur'),
        ],
        widget=forms.Select(attrs={'class': 'form-control'})
    )

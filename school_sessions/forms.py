from django import forms
from django.forms import ModelForm
from .models import school_sessions


class sessions_sForm(ModelForm):
    class Meta:
        model = school_sessions
        fields = ('session_name',)

        widgets = {
            'session_name': forms.TextInput(attrs={'class':'form-control', 'id':'createsessioninput', 'label':'', 'placeholder':'Session Name',})
        }
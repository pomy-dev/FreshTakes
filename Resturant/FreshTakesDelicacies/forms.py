from django import forms
from .models import MenuItem

class MenuForm(forms.ModelForm):
  class Meta:
    model = MenuItem
    fields = ['category', 'dish', 'price', 'serveTime', 'description']

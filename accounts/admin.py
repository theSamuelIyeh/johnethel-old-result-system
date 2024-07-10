from django.contrib import admin
from django.contrib.auth import get_user_model
from .forms import UserAdminCreationForm, UserAdminChangeForm
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.

User = get_user_model()
class UserAdmin(BaseUserAdmin):
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    list_display = ('username', 'First_name', 'Middle_name', 'Last_name', 'Session', 'Section', 'Class', 'date_joined', 'id')
    list_filter = ('admin', 'username', 'Session', 'Section', 'Class',)
    fieldsets = (
        (None, {'fields': ('username', 'password', 'Session', 'Section', 'Class', 'email', 'First_name', 'Middle_name', 'Last_name', 'Date_of_birth', 'Gender', 'Group', 'passport', 'full_name', 'admission_no')}),
        ('permissions',{'fields': ('admin','active','staff',)})
    )
    add_fieldsets = (
        (None, {
            'classes':('wide',),
            'fields': ('username', 'password1', 'password2', 'First_name', 'Middle_name', 'Last_name', 'full_name',)}
        ),
    )
    prepopulated_fields = {'full_name':('First_name', 'Middle_name', 'Last_name',)}
    search_fields = ('username', 'First_name', 'Middle_name', 'Last_name', 'Session', 'Section', 'Class',)
    ordering = ('id',)
    filter_horizontal = ()

admin.site.register(User, UserAdmin)
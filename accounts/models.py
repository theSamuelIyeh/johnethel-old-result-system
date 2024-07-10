from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, Group
from school_sessions.models import *
# Create your models here.

class MyUserManager(BaseUserManager):
    def create_user(self, username, First_name, Middle_name, Last_name, password=None, is_active=True, is_staff=False, is_admin=False):
        if not username:
            raise ValueError('Username field is required')
        if not First_name:
            raise ValueError('First Name field is required')
        if not Middle_name:
            raise ValueError('Middle Name field is required')
        if not Last_name:
            raise ValueError('Last Name field is required')
        if not password:
            raise ValueError('Password field is required')

        user_obj = self.model(
            username=username,
            First_name=First_name,
            Middle_name=Middle_name,
            Last_name=Last_name,
        )
        user_obj.set_password(password)
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.active = is_active
        user_obj.save(using=self._db)
        return user_obj


    def create_staffuser(self, username, First_name, Middle_name, Last_name, password=None):
        user=self.create_user(
            username,
            First_name,
            Middle_name,
            Last_name,
            password=password,
            is_staff=True
        )
        return user


    def create_superuser(self, username, First_name, Middle_name, Last_name, password=None):
        user=self.create_user(
            username,
            First_name,
            Middle_name,
            Last_name,
            password=password,
            is_staff=True,
            is_admin=True
        )
        return user


class MyUser(AbstractBaseUser):
    Session = models.ForeignKey(school_sessions, max_length=200, verbose_name="Session", null=True, blank=True, on_delete=models.CASCADE)
    Section = models.CharField(max_length=200, verbose_name="Section", null=True, blank=True)
    Class = models.CharField(max_length=200, verbose_name="Class", null=True, blank=True)
    Term = models.CharField(max_length=200, verbose_name="Term", null=True, blank=True)
    First_name = models.CharField(max_length=200, verbose_name="First Name")
    Middle_name = models.CharField(max_length=200, verbose_name="Middle Name")
    Last_name = models.CharField(max_length=200, verbose_name="Last Name")
    Date_of_birth = models.DateField(null=True, blank=True)
    Gender = models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=200, null=True, blank=True)
    username = models.CharField(max_length=200, verbose_name='Username', unique=True)
    email = models.EmailField(max_length=200, null=True, blank=True)
    Group = models.ForeignKey(Group, null=True, blank=True, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)
    admin = models.BooleanField(default=False)
    staff = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    passport = models.ImageField(max_length = 100, null=True, blank=True)
    full_name = models.CharField(max_length=225)
    admission_no = models.IntegerField(null=True, blank=True, default=0)

    USERNAME_FIELD = 'username'
    
    REQUIRED_FIELDS = ['First_name', 'Middle_name', 'Last_name']

    objects = MyUserManager()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['Session', 'Section', 'Class', 'Term', 'First_name', 'Middle_name', 'Last_name', 'Date_of_birth', 'Gender', 'username', 'passport'], name='unique_accounts')
        ]
    

    def __str__(self):
        return self.First_name + " " + self.Middle_name + " " + self.Last_name

    def has_perm(self, perm, obj=None):
        return True

    def get_full_name(self):
        return self.First_name + ' ' + self.Middle_name + ' ' + self.Last_name

    def get_short_name(self):
        return self.username

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    def is_active(self):
        return self.active

    def is_admin(self):
        return self.admin


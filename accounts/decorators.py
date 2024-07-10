from django.http import HttpResponse 
from django.shortcuts import redirect

def unauthenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('home')
        else:
            return view_func(request, *args, **kwargs)
    return wrapper_func
    

def admin_only(view_func):
    def wrapper_func(request, *args, **kwargs):
        group = None
        if request.user.Group is not None:
                group = request.user.Group.name

        if group == 'Student':
            return redirect('students')

        if group == 'Teacher':
            return redirect('teachers')

        if group == 'Administrator':
            return view_func(request, *args, **kwargs)
    return wrapper_func

def profile_pic(view_func):
    def wrapper_func(request, *args, **kwargs):
        gender = None
        if request.user.Gender is not None:
            gender = request.user.Gender

        if gender == 'Male':
            request.user.passport ==  "/static/img/asset 13.png"
            return view_func(request, *args, **kwargs)

        if gender == 'Female':
            request.user.passport == "/static/img/asset 14.png"
            return view_func(request, *args, **kwargs)
    return wrapper_func
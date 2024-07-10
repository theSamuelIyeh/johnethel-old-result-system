from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .decorators import unauthenticated_user, admin_only
from school_sessions.models import school_sessions
from sections.models import sections
from term_subjects.models import term_subjects
from classes.models import classes
from subjects.models import allsubjects
from django.forms.models import modelformset_factory
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from school_sessions.forms import sessions_sForm
from accounts.models import MyUser
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from nur_first_result.models import nur_first_result
from nur_second_result.models import nur_second_result
from nur_third_result.models import nur_third_result
from prim_first_result.models import prim_first_result
from prim_second_result.models import prim_second_result
from prim_third_result.models import prim_third_result
from django.http import HttpResponse
from django.views.generic import View
from django.template.loader import get_template
import io
from django.http import FileResponse
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.lib.colors import *
from reportlab.platypus import Frame
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.pagesizes import A4, landscape, portrait
from django.contrib.humanize.templatetags.humanize import ordinal

# Create your views here.

@unauthenticated_user
def loginpage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.info(request, 'Invalid Username or Password')   
    context = {}
    return render(request, 'login/login.html', context)

@login_required(login_url='login_url')
def logoutuser(request, *args, **kwargs):
    logout(request)
    return redirect('login_url')


@login_required(login_url='login_url')
@admin_only
def homeview(request):
    form = sessions_sForm()
    if request.method == 'POST':
        form = sessions_sForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/")
    
    sessions = school_sessions.objects.all()

    section = sections.objects.all()
    
    classe = classes.objects.all()
    photo = MyUser.objects.all()

    
    first_ca = 'french_ca_1'
    second_ca = 'french_ca_2'
    third_ca = 'french_ca_3'
    fourth_ca = 'french_ca_4'
    exam = 'french_exam'

    resultformset = modelformset_factory(prim_first_result, fields=('full_name', first_ca, second_ca, third_ca, fourth_ca, exam))
    formset = resultformset(request.POST or None)
    if formset.is_valid():
        formset.save(commit=False)




    
    context = {'form':form, 'sessions':sessions, 'sections':section,'classes':classe, 'photo':photo, 'formset':formset}
    return render(request, 'dashboards/home.html', context)


@login_required(login_url='login_url')
def students(request):
    context = {}
    return render(request, 'dashboards/students.html', context)


@login_required(login_url='login_url')
def teachers(request):
    context = {}
    return render(request, 'dashboards/teachers.html', context)


@login_required(login_url='login_url')
def createsession(request):
    form = sessions_sForm()
    if request.method == 'POST':
        form = sessions_sForm(request.POST)
        if form.is_valid():
            instance = form.save()
            return JsonResponse({'session':model_to_dict(instance)}, status=200)
        else:
            return redirect("/")




@login_required(login_url='login_url')
def deletesession(request, id):
    if request.method == 'POST':
        session = school_sessions.objects.get(id=id)
        session.delete()
        return JsonResponse({'session':model_to_dict(session)}, status=200)
    else:
        return redirect("/")


@login_required(login_url='login_url')
def createsection_get_session_json(request):
    sessions_val = list(school_sessions.objects.values())
    return JsonResponse({'sessions_val':sessions_val}, status=200)

@login_required(login_url='login_url')
def createsection(request):
    session_name = request.POST['session_name']
    section_name = request.POST['section_name']

    if request.method == 'POST':
        sectioncreate = sections.objects.create(session_name=school_sessions.objects.get(session_name=session_name), section_name=section_name)
        sectioncreate.save()
        return JsonResponse({'section':model_to_dict(sectioncreate)}, status=200)
    else:
        return redirect("/")




@login_required(login_url='login_url')
def deletesection(request, id):
    if request.method == 'POST':
        section_item = sections.objects.get(id=id)
        section_item.delete()
        return JsonResponse({'section':model_to_dict(section_item)}, status=200)
    else:
        return redirect("/")



@login_required(login_url='login_url')
def createclass_get_session_json(request):
    class_sessions_val = list(school_sessions.objects.values())
    return JsonResponse({'class_sessions_val':class_sessions_val}, status=200)


@login_required(login_url='login_url')
def createclass_get_section_json(request, *args, **kwargs):
    selected_session1 = kwargs.get('car')
    selected_session2 = kwargs.get('car2')
    selected_session = str(selected_session1) + '/' + str(selected_session2)
    obj_models = list(sections.objects.filter(session_name=selected_session).values())
    return JsonResponse({'data':obj_models})


@login_required(login_url='login_url')
def get_id_for_session_card(request, *args, **kwargs):
    value1_ = kwargs.get('goat')
    value2_ = kwargs.get('sheep')
    value_ = str(value1_) + '/' + str(value2_)
    item_ = list(sections.objects.filter(session_name=value_).values())
    return JsonResponse({'value':item_}, status=200)


@login_required(login_url='login_url')
def createclass(request):
    session_name = request.POST['session_name']
    section_name = request.POST['section_name']
    class_name = request.POST['class_name']

    if request.method == 'POST':
        classcreate = classes.objects.create(session_name=school_sessions.objects.get(session_name=session_name), section_name=section_name, class_name=class_name)
        classcreate.save()
        return JsonResponse({'class':model_to_dict(classcreate)}, status=200)
    else:
        return redirect("/")

@login_required(login_url='login_url')
def deleteclass(request, id):
    if request.method == 'POST':
        class_item = classes.objects.get(id=id)
        class_item.delete()
        return JsonResponse({'class':model_to_dict(class_item)}, status=200)
    else:
        return redirect("/")


@login_required(login_url='login_url')
def get_id_for_session_card2(request, *args, **kwargs):
    value11_ = kwargs.get('goat')
    value22_ = kwargs.get('sheep')
    value3_ = str(value11_) + '/' + str(value22_)
    item1_ = list(classes.objects.filter(session_name=value3_).values())
    return JsonResponse({'value1':item1_}, status=200)


@login_required(login_url='login_url')
def get_id_for_section_card(request, *args, **kwargs):
    value123_ = kwargs.get('goat')
    item123_ = list(classes.objects.filter(section_name=value123_).values())
    return JsonResponse({'value123':item123_}, status=200)



@login_required(login_url='login_url')
def get_subjects_list(request, *args, **kwargs):
    section_name = kwargs.get('goat')
    subjects_list = list(allsubjects.objects.filter(section_name=section_name).values())
    return JsonResponse({'subjects_list':subjects_list}, status=200)


@login_required(login_url='login_url')
def get_section_list_for_subjects(request, *args, **kwargs):
    session_value1 = kwargs.get('goat')
    session_value2 = kwargs.get('sheep')
    session_total_value = str(session_value1) + '/' + str(session_value2)
    subject_section_list = list(sections.objects.filter(session_name=session_total_value).values())
    return JsonResponse({'data2':subject_section_list}, status=200)


@login_required(login_url='login_url')
def get_class_list_for_subjects(request, *args, **kwargs):
    section_value1 = kwargs.get('goat')
    session_value1 = kwargs.get('sheep')
    session_value2 = kwargs.get('fish')
    print(section_value1)
    session_total_value = str(session_value1) + '/' + str(session_value2)
    print(session_total_value)
    subject_class_list = list(classes.objects.filter(session_name=school_sessions.objects.get(session_name=session_total_value), section_name=section_value1).values())
    print(subject_class_list)
    return JsonResponse({'data3':subject_class_list}, status=200)


@login_required(login_url='login_url')
def get_subject_list_for_subjects(request, *args, **kwargs):
    section_value1 = kwargs.get('section')
    session_value1 = kwargs.get('goat')
    session_value2 = kwargs.get('sheep')
    term_value = kwargs.get('term')
    class_value = kwargs.get('class')
    session_total_value = str(session_value1) + '/' + str(session_value2)
    subject_subjects_list = list(term_subjects.objects.filter(session_name=session_total_value, section_name=section_value1, class_name=class_value, term_name=term_value).values())
    return JsonResponse({'data4':subject_subjects_list}, status=200)

@login_required(login_url='login_url')
def createterm_subject(request, *args, **kwargs):
    session_name = request.POST['session_name']
    section_name = request.POST['section_name']
    class_name = request.POST['class_name']
    term_name = request.POST['term_name']
    subject_name = kwargs.get('goat')

    if request.method == 'POST':
        term_subject_create = term_subjects.objects.create(session_name=session_name, section_name=section_name, class_name=class_name, term_name=term_name, subject_name=subject_name)
        term_subject_create.save()
        return JsonResponse({'subject':model_to_dict(term_subject_create)}, status=200)
    else:
        return redirect("/")


@login_required(login_url='login_url')
def promote_student(request, *args, **kwargs):
    session_name = request.POST['session_name']
    section_name = request.POST['section_name']
    class_name = request.POST['class_name']
    term_name = request.POST['term_name']
    oldsession_name = request.POST['oldsession_name']
    oldsection_name = request.POST['oldsection_name']
    oldclass_name = request.POST['oldclass_name']
    oldterm_name = request.POST['oldterm_name']
    admission_no0 = kwargs.get('goat')
    admission_no = "JS/OGB/" + admission_no0

    if request.method == 'POST':

        if oldsection_name == "PRIMARY SECTION":
            if oldterm_name == "FIRST TERM":
                old_stud = prim_first_result.objects.get(admission_no=admission_no, session_name=oldsession_name)
            elif oldterm_name == "SECOND TERM":
                old_stud = prim_second_result.objects.get(admission_no=admission_no, session_name=oldsession_name)
            elif oldterm_name == "THIRD TERM":
                old_stud = prim_third_result.objects.get(admission_no=admission_no, session_name=oldsession_name)
        elif oldsection_name == "NURSERY SECTION":
            if oldterm_name == "FIRST TERM":
                old_stud = nur_first_result.objects.get(admission_no=admission_no, session_name=oldsession_name)
            elif oldterm_name == "SECOND TERM":
                old_stud = nur_second_result.objects.get(admission_no=admission_no, session_name=oldsession_name)
            elif oldterm_name == "THIRD TERM":
                old_stud = nur_third_result.objects.get(admission_no=admission_no, session_name=oldsession_name)

        gender = old_stud.gender
        first_name = old_stud.first_name
        middle_name = old_stud.middle_name
        last_name = old_stud.last_name
        date_of_birth = old_stud.date_of_birth
        passport = old_stud.passport
        full_name = old_stud.full_name
        if section_name == "PRIMARY SECTION":
            if term_name == "FIRST TERM":
                student_promote = prim_first_result.objects.create(session_name=session_name, section_name=section_name, class_name=class_name, gender=gender, first_name=first_name, middle_name=middle_name, last_name=last_name, passport=passport, date_of_birth=date_of_birth, full_name=full_name, admission_no=admission_no)
                student_promote.save()
                full_name = student_promote.full_name
                identity = student_promote.admission_no
            elif term_name == "SECOND TERM":
                student_promote = prim_second_result.objects.create(session_name=session_name, section_name=section_name, class_name=class_name, gender=gender, first_name=first_name, middle_name=middle_name, last_name=last_name, passport=passport, date_of_birth=date_of_birth, full_name=full_name, admission_no=admission_no)
                student_promote.save()
                full_name = student_promote.full_name
                identity = student_promote.admission_no
            elif term_name == "THIRD TERM":
                student_promote = prim_third_result.objects.create(session_name=session_name, section_name=section_name, class_name=class_name, gender=gender, first_name=first_name, middle_name=middle_name, last_name=last_name, passport=passport, date_of_birth=date_of_birth, full_name=full_name, admission_no=admission_no)
                student_promote.save()
                full_name = student_promote.full_name
                identity = student_promote.admission_no
        elif section_name == "NURSERY SECTION":
            if term_name == "FIRST TERM":
                student_promote = nur_first_result.objects.create(session_name=session_name, section_name=section_name, class_name=class_name, gender=gender, first_name=first_name, middle_name=middle_name, last_name=last_name, passport=passport, date_of_birth=date_of_birth, full_name=full_name, admission_no=admission_no)
                student_promote.save()
                full_name = student_promote.full_name
                identity = student_promote.admission_no
            elif term_name == "SECOND TERM":
                student_promote = nur_second_result.objects.create(session_name=session_name, section_name=section_name, class_name=class_name, gender=gender, first_name=first_name, middle_name=middle_name, last_name=last_name, passport=passport, date_of_birth=date_of_birth, full_name=full_name, admission_no=admission_no)
                student_promote.save()
                full_name = student_promote.full_name
                identity = student_promote.admission_no
            elif term_name == "THIRD TERM":
                student_promote = nur_third_result.objects.create(session_name=session_name, section_name=section_name, class_name=class_name, gender=gender, first_name=first_name, middle_name=middle_name, last_name=last_name, passport=passport, date_of_birth=date_of_birth, full_name=full_name, admission_no=admission_no)
                student_promote.save()
                full_name = student_promote.full_name
                identity = student_promote.admission_no
        return JsonResponse({'full_name':full_name, 'identity':identity}, status=200)
    else:
        return redirect("/")


@login_required(login_url='login_url')
def deleteterm_subject(request, id):
    if request.method == 'POST':
        term_subject_delete = term_subjects.objects.get(id=id)
        term_subject_delete.delete()
        return JsonResponse({'subject':model_to_dict(term_subject_delete)}, status=200)
    else:
        return redirect("/")

@login_required(login_url='login_url')
def demote_student(request, id):
    session_name = request.POST['session_name']
    section_name = request.POST['section_name']
    class_name = request.POST['class_name']
    term_name = request.POST['term_name']
    

    if request.method == 'POST':
        if section_name == 'PRIMARY SECTION':
            if term_name == 'FIRST TERM':
                demote_student = prim_first_result.objects.get(admission_no='JS/OGB/' + id, session_name=session_name, section_name=section_name, class_name=class_name)
                admission_no0 = demote_student.admission_no 
                demote_student.delete()
            elif term_name == 'SECOND TERM':
                demote_student = prim_second_result.objects.get(admission_no='JS/OGB/' + id, session_name=session_name, section_name=section_name, class_name=class_name)
                admission_no0 = demote_student.admission_no
                demote_student.delete()
            elif term_name == 'THIRD TERM':
                demote_student = prim_third_result.objects.get(admission_no='JS/OGB/' + id, session_name=session_name, section_name=section_name, class_name=class_name)
                admission_no0 = demote_student.admission_no
                demote_student.delete()
        elif section_name == 'NURSERY SECTION':
            if term_name == 'FIRST TERM':
                demote_student = nur_first_result.objects.get(admission_no='JS/OGB/' + id, session_name=session_name, section_name=section_name, class_name=class_name)
                admission_no0 = demote_student.admission_no
                demote_student.delete()
            elif term_name == 'SECOND TERM':
                demote_student = nur_second_result.objects.get(admission_no='JS/OGB/' + id, session_name=session_name, section_name=section_name, class_name=class_name)
                admission_no0 = demote_student.admission_no
                demote_student.delete()
            elif term_name == 'THIRD TERM':
                demote_student = nur_third_result.objects.get(admission_no='JS/OGB/' + id, session_name=session_name, section_name=section_name, class_name=class_name)
                admission_no0 = demote_student.admission_no
                demote_student.delete()
        return JsonResponse({'admission_no0':admission_no0}, status=200)
    else:
        return redirect("/")


@login_required(login_url='login_url')
def create_student(request):
    if request.POST.get('action') == 'create-student':
        session = request.POST.get('student_session_name')
        section = request.POST.get('student_section_name')
        classes = request.POST.get('student_class_name')
        term = request.POST.get('student_term_name')
        first_name = request.POST.get('student_first_name')
        middle_name = request.POST.get('student_middle_name')
        last_name = request.POST.get('student_last_name')
        username = request.POST.get('student_username')
        gender = request.POST.get('student_gender')
        date_of_birth = request.POST.get('student_date_of_birth')
        password1 = request.POST.get('student_password_1')
        password2 = request.POST.get('student_password_2')
        passport = request.FILES.get('image')

        if password1 == password2:
            password = make_password(password2)
        else:
            password = ''
        oldvalue = MyUser.objects.filter(admin=False, staff=False).values('admission_no').last()
        print(oldvalue)
        if oldvalue == None:
            vick = 0
        else:
            vick = oldvalue.get('admission_no')
        
        newvalue = int(vick) + 1
        MyUser.objects.create(
            Session=school_sessions.objects.get(session_name=session),
            Section=section,
            Class=classes,
            Term=term,
            First_name=first_name,
            Middle_name=middle_name,
            Last_name=last_name,
            Date_of_birth=date_of_birth,
            Gender=gender,
            username=username,
            passport=passport,
            password=password,
            full_name=str(last_name) + ' ' + str(first_name) + ' ' + str(middle_name[0]) + '.',
            admission_no=str(newvalue),
            active=True,
            Group=Group.objects.get(name='Student')
        )
        
        if section == 'PRIMARY SECTION':
            if term == 'FIRST TERM':
                prim_first_result.objects.create(
                    session_name=session,
                    section_name=section,
                    class_name=classes,
                    first_name=first_name,
                    middle_name=middle_name,
                    last_name=last_name,
                    gender=gender,
                    date_of_birth=date_of_birth,
                    passport=passport,
                    full_name=str(last_name) + ' ' + str(first_name) + ' ' + str(middle_name[0]) + '.',
                    admission_no='JS/OGB/' + str(newvalue).zfill(5)
                )
            elif term == 'SECOND TERM':
                prim_second_result.objects.create(
                    session_name=session,
                    section_name=section,
                    class_name=classes,
                    first_name=first_name,
                    middle_name=middle_name,
                    last_name=last_name,
                    gender=gender,
                    date_of_birth=date_of_birth,
                    passport=passport,
                    full_name=str(last_name) + ' ' + str(first_name) + ' ' + str(middle_name[0]) + '.',
                    admission_no='JS/OGB/' + str(newvalue).zfill(5)
                )
            elif term == 'THIRD TERM':
                prim_third_result.objects.create(
                    session_name=session,
                    section_name=section,
                    class_name=classes,
                    first_name=first_name,
                    middle_name=middle_name,
                    last_name=last_name,
                    gender=gender,
                    date_of_birth=date_of_birth,
                    passport=passport,
                    full_name=str(last_name) + ' ' + str(first_name) + ' ' + str(middle_name[0]) + '.',
                    admission_no='JS/OGB/' + str(newvalue).zfill(5)
                )

        elif section == 'NURSERY SECTION':
            if term == 'FIRST TERM':
                nur_first_result.objects.create(
                    session_name=session,
                    section_name=section,
                    class_name=classes,
                    first_name=first_name,
                    middle_name=middle_name,
                    last_name=last_name,
                    gender=gender,
                    date_of_birth=date_of_birth,
                    passport=passport,
                    full_name=str(last_name) + ' ' + str(first_name) + ' ' + str(middle_name[0]) + '.',
                    admission_no='JS/OGB/' + str(newvalue).zfill(5)
                )
            elif term == 'SECOND TERM':
                nur_second_result.objects.create(
                    session_name=session,
                    section_name=section,
                    class_name=classes,
                    first_name=first_name,
                    middle_name=middle_name,
                    last_name=last_name,
                    gender=gender,
                    date_of_birth=date_of_birth,
                    passport=passport,
                    full_name=str(last_name) + ' ' + str(first_name) + ' ' + str(middle_name[0]) + '.',
                    admission_no='JS/OGB/' + str(newvalue).zfill(5)
                )
            elif term == 'THIRD TERM':
                nur_third_result.objects.create(
                    session_name=session,
                    section_name=section,
                    class_name=classes,
                    first_name=first_name,
                    middle_name=middle_name,
                    last_name=last_name,
                    gender=gender,
                    date_of_birth=date_of_birth,
                    passport=passport,
                    full_name=str(last_name) + ' ' + str(first_name) + ' ' + str(middle_name[0]) + '.',
                    admission_no='JS/OGB/' + str(newvalue).zfill(5)
                )
            print(str(middle_name[0]))

        else:
            pass
        return HttpResponse('done')
    else:
        return redirect('/')


@login_required(login_url='login_url')
def fetch_subject_list(request, *args, **kwargs):
    session_value1 = kwargs.get('sheep')
    session_value2 = kwargs.get('cow')
    section_value1 = kwargs.get('chicken')
    term_value = kwargs.get('goat')
    class_value = kwargs.get('rabbit')
    session_total_value = str(session_value1) + '/' + str(session_value2)
    result_subjects_list = list(term_subjects.objects.filter(session_name=session_total_value, section_name=section_value1, class_name=class_value, term_name=term_value).values())
    return JsonResponse({'datax':result_subjects_list}, status=200)

@login_required(login_url='login_url')
def get_result_list(request, *args, **kwargs):
    subject = kwargs.get('goat')
    session_1 = kwargs.get('sheep')
    session_2 = kwargs.get('cow')
    section = kwargs.get('chicken')
    clas = kwargs.get('rabbit')
    term = kwargs.get('snake')
    session_value = str(session_1) + '/' + str(session_2)

    if subject == 'AGRICULTURAL SCIENCE':
        first_ca = 'agricultural_science_ca_1'
        second_ca = 'agricultural_science_ca_2'
        third_ca = 'agricultural_science_ca_3'
        fourth_ca = 'agricultural_science_ca_4'
        exam = 'agricultural_science_exam'
    elif subject == 'CHESS':
        first_ca = 'chess_ca_1'
        second_ca = 'chess_ca_2'
        third_ca = 'chess_ca_3'
        fourth_ca = 'chess_ca_4'
        exam = 'chess_exam'
    elif subject == 'CHRISTIAN RELIGIOUS KNOWLEDGE':
        first_ca = 'christian_religious_knowledge_ca_1'
        second_ca = 'christian_religious_knowledge_ca_2'
        third_ca = 'christian_religious_knowledge_ca_3'
        fourth_ca = 'christian_religious_knowledge_ca_4'
        exam = 'christian_religious_knowledge_exam'
    elif subject == 'CITIZENSHIP':
        first_ca = 'citizenship_ca_1'
        second_ca = 'citizenship_ca_2'
        third_ca = 'citizenship_ca_3'
        fourth_ca = 'citizenship_ca_4'
        exam = 'citizenship_exam'
    elif subject == 'COMPUTER STUDIES':
        first_ca = 'computer_studies_ca_1'
        second_ca = 'computer_studies_ca_2'
        third_ca = 'computer_studies_ca_3'
        fourth_ca = 'computer_studies_ca_4'
        exam = 'computer_studies_exam'
    elif subject == 'FRENCH':
        first_ca = 'french_ca_1'
        second_ca = 'french_ca_2'
        third_ca = 'french_ca_3'
        fourth_ca = 'french_ca_4'
        exam = 'french_exam'
    elif subject == 'GEOGRAPHY':
        first_ca = 'geography_ca_1'
        second_ca = 'geography_ca_2'
        third_ca = 'geography_ca_3'
        fourth_ca = 'geography_ca_4'
        exam = 'geography_exam'
    elif subject == 'HISTORY':
        first_ca = 'history_ca_1'
        second_ca = 'history_ca_2'
        third_ca = 'history_ca_3'
        fourth_ca = 'history_ca_4'
        exam = 'history_exam'
    elif subject == 'HOME ECONOMICS':
        first_ca = 'home_economics_ca_1'
        second_ca = 'home_economics_ca_2'
        third_ca = 'home_economics_ca_3'
        fourth_ca = 'home_economics_ca_4'
        exam = 'home_economics_exam'
    elif subject == 'ICT':
        first_ca = 'ict_ca_1'
        second_ca = 'ict_ca_2'
        third_ca = 'ict_ca_3'
        fourth_ca = 'ict_ca_4'
        exam = 'ict_exam'
    elif subject == 'LITERACY':
        first_ca = 'literacy_ca_1'
        second_ca = 'literacy_ca_2'
        third_ca = 'literacy_ca_3'
        fourth_ca = 'literacy_ca_4'
        exam = 'literacy_exam'
    elif subject == 'MORAL INSTRUCTION':
        first_ca = 'moral_instruction_ca_1'
        second_ca = 'moral_instruction_ca_2'
        third_ca = 'moral_instruction_ca_3'
        fourth_ca = 'moral_instruction_ca_4'
        exam = 'moral_instruction_exam'
    elif subject == 'MUSIC':
        first_ca = 'music_ca_1'
        second_ca = 'music_ca_2'
        third_ca = 'music_ca_3'
        fourth_ca = 'music_ca_4'
        exam = 'music_exam'
    elif subject == 'NUMERACY':
        first_ca = 'numeracy_ca_1'
        second_ca = 'numeracy_ca_2'
        third_ca = 'numeracy_ca_3'
        fourth_ca = 'numeracy_ca_4'
        exam = 'numeracy_exam'
    elif subject == 'PHYSICAL AND HEALTH EDUCATION':
        first_ca = 'physical_and_health_education_ca_1'
        second_ca = 'physical_and_health_education_ca_2'
        third_ca = 'physical_and_health_education_ca_3'
        fourth_ca = 'physical_and_health_education_ca_4'
        exam = 'physical_and_health_education_exam'
    elif subject == 'QUANTITATIVE REASONING':
        first_ca = 'quantitative_reasoning_ca_1'
        second_ca = 'quantitative_reasoning_ca_2'
        third_ca = 'quantitative_reasoning_ca_3'
        fourth_ca = 'quantitative_reasoning_ca_4'
        exam = 'quantitative_reasoning_exam'
    elif subject == 'SCIENCE':
        first_ca = 'science_ca_1'
        second_ca = 'science_ca_2'
        third_ca = 'science_ca_3'
        fourth_ca = 'science_ca_4'
        exam = 'science_exam'
    elif subject == 'SCRABBLE':
        first_ca = 'scrabble_ca_1'
        second_ca = 'scrabble_ca_2'
        third_ca = 'scrabble_ca_3'
        fourth_ca = 'scrabble_ca_4'
        exam = 'scrabble_exam'
    elif subject == 'SOCIAL STUDIES':
        first_ca = 'social_studies_ca_1'
        second_ca = 'social_studies_ca_2'
        third_ca = 'social_studies_ca_3'
        fourth_ca = 'social_studies_ca_4'
        exam = 'social_studies_exam'
    elif subject == 'SPELLING BEE':
        first_ca = 'spelling_bee_ca_1'
        second_ca = 'spelling_bee_ca_2'
        third_ca = 'spelling_bee_ca_3'
        fourth_ca = 'spelling_bee_ca_4'
        exam = 'spelling_bee_exam'
    elif subject == 'VERBAL REASONING':
        first_ca = 'verbal_reasoning_ca_1'
        second_ca = 'verbal_reasoning_ca_2'
        third_ca = 'verbal_reasoning_ca_3'
        fourth_ca = 'verbal_reasoning_ca_4'
        exam = 'verbal_reasoning_exam'
    elif subject == 'VOCATIONAL APTITUDE':
        first_ca = 'vocational_studies_ca_1'
        second_ca = 'vocational_studies_ca_2'
        third_ca = 'vocational_studies_ca_3'
        fourth_ca = 'vocational_studies_ca_4'
        exam = 'vocational_studies_exam'
    elif subject == 'YORUBA':
        first_ca = 'yoruba_ca_1'
        second_ca = 'yoruba_ca_2'
        third_ca = 'yoruba_ca_3'
        fourth_ca = 'yoruba_ca_4'
        exam = 'yoruba_exam'
    elif subject == 'CREATIVE ART':
        first_ca = 'creative_art_ca_1'
        second_ca = 'creative_art_ca_2'
        third_ca = 'creative_art_ca_3'
        fourth_ca = 'creative_art_ca_4'
        exam = 'creative_art_exam'
    else:
        first_ca = ''
        second_ca = ''
        third_ca = ''
        fourth_ca = ''
        exam = ''

    if term == 'FIRST TERM':

        identity = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'id'
            ).order_by('full_name')
        )
        studname = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'full_name'
            ).order_by('full_name')
        )
        firstca = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                first_ca
            ).order_by('full_name')
        )
        secondca = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                second_ca
            ).order_by('full_name')
        )
        thirdca = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                third_ca
            ).order_by('full_name')
        )
        fourthca = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                fourth_ca
            ).order_by('full_name')
        )
        exam = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                exam
            ).order_by('full_name')
        )

    elif term == 'SECOND TERM':

        identity = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'id'
            ).order_by('full_name')
        )
        studname = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'full_name'
            ).order_by('full_name')
        )
        firstca = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                first_ca
            ).order_by('full_name')
        )
        secondca = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                second_ca
            ).order_by('full_name')
        )
        thirdca = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                third_ca
            ).order_by('full_name')
        )
        fourthca = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                fourth_ca
            ).order_by('full_name')
        )
        exam = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                exam
            ).order_by('full_name')
        )
    elif term == 'THIRD TERM':

        identity = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'id'
            ).order_by('full_name')
        )
        studname = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'full_name'
            ).order_by('full_name')
        )
        firstca = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                first_ca
            ).order_by('full_name')
        )
        secondca = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                second_ca
            ).order_by('full_name')
        )
        thirdca = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                third_ca
            ).order_by('full_name')
        )
        fourthca = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                fourth_ca
            ).order_by('full_name')
        )
        exam = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                exam
            ).order_by('full_name')
        )
    else:
        identity = ''
        studname = ''
        firstca = ''
        secondca = ''
        thirdca = ''
        fourthca = ''
        exam = ''

    
    return JsonResponse({'identity':identity, 'name':studname, 'data1':firstca, 'data2':secondca, 'data3':thirdca, 'data4':fourthca, 'data5':exam}, status=200)


@login_required(login_url='login_url')
def get_result_list_for_nur(request, *args, **kwargs):
    subject = kwargs.get('goat')
    session_1 = kwargs.get('sheep')
    session_2 = kwargs.get('cow')
    section = kwargs.get('chicken')
    clas = kwargs.get('rabbit')
    term = kwargs.get('snake')
    session_value = str(session_1) + '/' + str(session_2)
    if subject == 'EMOTIONAL SKILLS':
        question1 = 'emotional_skills_question_1'
        question2 = 'emotional_skills_question_2'
        question3 = 'emotional_skills_question_3'
        question4 = 'emotional_skills_question_4'
        question5 = 'emotional_skills_question_5'
        question6 = 'emotional_skills_question_6'
        question7 = 'emotional_skills_question_7'
        question8 = 'emotional_skills_question_8'
        question9 = 'emotional_skills_question_9'
        question10 = 'emotional_skills_question_10'
        question11 = 'emotional_skills_question_11'
        question12 = 'emotional_skills_question_12'
        question13 = 'emotional_skills_question_13'
        question14 = 'emotional_skills_question_14'
        first_name = 'first_name'
        middle_name = 'middle_name'
        last_name = 'last_name'
    elif subject == 'RHYMES AND SONGS (MUSIC)':
        question1 = 'Rhymes_and_songs_question_1'
        question2 = 'Rhymes_and_songs_question_2'
        question3 = 'Rhymes_and_songs_question_3'
        question4 = 'Rhymes_and_songs_question_4'
        question5 = 'Rhymes_and_songs_question_5'
        question6 = 'Rhymes_and_songs_question_6'
        question7 = 'Rhymes_and_songs_question_7'
        question8 = 'Rhymes_and_songs_question_8'
        question9 = 'Rhymes_and_songs_question_9'
        question10 = 'Rhymes_and_songs_question_10'
        question11 = 'Rhymes_and_songs_question_11'
        question12 = 'Rhymes_and_songs_question_12'
        question13 = 'Rhymes_and_songs_question_13'
        question14 = 'Rhymes_and_songs_question_14'
        first_name = 'first_name'
        middle_name = 'middle_name'
        last_name = 'last_name'
    elif subject == 'GROSS MOTOR SKILLS':
        question1 = 'gross_motor_skills_question_1'
        question2 = 'gross_motor_skills_question_2'
        question3 = 'gross_motor_skills_question_3'
        question4 = 'gross_motor_skills_question_4'
        question5 = 'gross_motor_skills_question_5'
        question6 = 'gross_motor_skills_question_6'
        question7 = 'gross_motor_skills_question_7'
        question8 = 'gross_motor_skills_question_8'
        question9 = 'gross_motor_skills_question_9'
        question10 = 'gross_motor_skills_question_10'
        question11 = 'gross_motor_skills_question_11'
        question12 = 'gross_motor_skills_question_12'
        question13 = 'gross_motor_skills_question_13'
        question14 = 'gross_motor_skills_question_14'
        first_name = 'first_name'
        middle_name = 'middle_name'
        last_name = 'last_name'
    elif subject == 'FINE MOTOR SKILLS':
        question1 = 'fine_motor_skills_question_1'
        question2 = 'fine_motor_skills_question_2'
        question3 = 'fine_motor_skills_question_3'
        question4 = 'fine_motor_skills_question_4'
        question5 = 'fine_motor_skills_question_5'
        question6 = 'fine_motor_skills_question_6'
        question7 = 'fine_motor_skills_question_7'
        question8 = 'fine_motor_skills_question_8'
        question9 = 'fine_motor_skills_question_9'
        question10 = 'fine_motor_skills_question_10'
        question11 = 'fine_motor_skills_question_11'
        question12 = 'fine_motor_skills_question_12'
        question13 = 'fine_motor_skills_question_13'
        question14 = 'fine_motor_skills_question_14'
        first_name = 'first_name'
        middle_name = 'middle_name'
        last_name = 'last_name'
    elif subject == 'ICT SKILLS (COMPUTER)':
        question1 = 'information_and_communication_technology_question_1'
        question2 = 'information_and_communication_technology_question_2'
        question3 = 'information_and_communication_technology_question_3'
        question4 = 'information_and_communication_technology_question_4'
        question5 = 'information_and_communication_technology_question_5'
        question6 = 'information_and_communication_technology_question_6'
        question7 = 'information_and_communication_technology_question_7'
        question8 = 'information_and_communication_technology_question_8'
        question9 = 'information_and_communication_technology_question_9'
        question10 = 'information_and_communication_technology_question_10'
        question11 = 'information_and_communication_technology_question_11'
        question12 = 'information_and_communication_technology_question_12'
        question13 = 'information_and_communication_technology_question_13'
        question14 = 'information_and_communication_technology_question_14'
        first_name = 'first_name'
        middle_name = 'middle_name'
        last_name = 'last_name'
    elif subject == 'SOCIAL SKILLS':
        question1 = 'social_skills_question_1'
        question2 = 'social_skills_question_2'
        question3 = 'social_skills_question_3'
        question4 = 'social_skills_question_4'
        question5 = 'social_skills_question_5'
        question6 = 'social_skills_question_6'
        question7 = 'social_skills_question_7'
        question8 = 'social_skills_question_8'
        question9 = 'social_skills_question_9'
        question10 = 'social_skills_question_10'
        question11 = 'social_skills_question_11'
        question12 = 'social_skills_question_12'
        question13 = 'social_skills_question_13'
        question14 = 'social_skills_question_14'
        first_name = 'first_name'
        middle_name = 'middle_name'
        last_name = 'last_name'
    elif subject == 'NUMERACY':
        question1 = 'numeracy_question_1'
        question2 = 'numeracy_question_2'
        question3 = 'numeracy_question_3'
        question4 = 'numeracy_question_4'
        question5 = 'numeracy_question_5'
        question6 = 'numeracy_question_6'
        question7 = 'numeracy_question_7'
        question8 = 'numeracy_question_8'
        question9 = 'numeracy_question_9'
        question10 = 'numeracy_question_10'
        question11 = 'numeracy_question_11'
        question12 = 'numeracy_question_12'
        question13 = 'numeracy_question_13'
        question14 = 'numeracy_question_14'
        first_name = 'first_name'
        middle_name = 'middle_name'
        last_name = 'last_name'
    elif subject == 'WRITING SKILLS':
        question1 = 'writing_skills_question_1'
        question2 = 'writing_skills_question_2'
        question3 = 'writing_skills_question_3'
        question4 = 'writing_skills_question_4'
        question5 = 'writing_skills_question_5'
        question6 = 'writing_skills_question_6'
        question7 = 'writing_skills_question_7'
        question8 = 'writing_skills_question_8'
        question9 = 'writing_skills_question_9'
        question10 = 'writing_skills_question_10'
        question11 = 'writing_skills_question_11'
        question12 = 'writing_skills_question_12'
        question13 = 'writing_skills_question_13'
        question14 = 'writing_skills_question_14'
        first_name = 'first_name'
        middle_name = 'middle_name'
        last_name = 'last_name'
    elif subject == 'LITERACY':
        question1 = 'literacy_question_1'
        question2 = 'literacy_question_2'
        question3 = 'literacy_question_3'
        question4 = 'literacy_question_4'
        question5 = 'literacy_question_5'
        question6 = 'literacy_question_6'
        question7 = 'literacy_question_7'
        question8 = 'literacy_question_8'
        question9 = 'literacy_question_9'
        question10 = 'literacy_question_10'
        question11 = 'literacy_question_11'
        question12 = 'literacy_question_12'
        question13 = 'literacy_question_13'
        question14 = 'literacy_question_14'
        first_name = 'first_name'
        middle_name = 'middle_name'
        last_name = 'last_name'
    if term == 'FIRST TERM':
        identity = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'id'
            ).order_by('full_name')
        )
        stud_name = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'full_name'
            ).order_by('full_name')
        )
        question_1 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question1
            ).order_by('full_name')
        )
        question_2 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question2 
            ).order_by('full_name')
        )
        question_3 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question3
            ).order_by('full_name')
        )
        question_4 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question4
            ).order_by('full_name')
        )
        question_5 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question5
            ).order_by('full_name')
        )
        question_6 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question6
            ).order_by('full_name')
        )
        question_7 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question7
            ).order_by('full_name')
        )
        question_8 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question8
            ).order_by('full_name')
        )
        question_9 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question9
            ).order_by('full_name')
        )
        question_10 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question10
            ).order_by('full_name')
        )
        question_11 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question11
            ).order_by('full_name')
        )
        question_12 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question12
            ).order_by('full_name')
        )
        question_13 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question13
            ).order_by('full_name')
        )
        question_14 = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question14
            ).order_by('full_name')
        )
        numeracy_first_question_first_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_first_question_first_input'
            ).order_by('full_name')
        )
        numeracy_first_question_end_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_first_question_end_input'
            ).order_by('full_name')
        )
        numeracy_second_question_first_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_second_question_first_input'
            ).order_by('full_name')
        )
        numeracy_second_question_end_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_second_question_end_input'
            ).order_by('full_name')
        )
        numeracy_third_question_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_third_question_input'
            ).order_by('full_name')
        )
        numeracy_fourth_question_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_fourth_question_input'
            ).order_by('full_name')
        )
        numeracy_fifth_question_first_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_fifth_question_first_input'
            ).order_by('full_name')
        )
        numeracy_fifth_question_end_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_fifth_question_end_input'
            ).order_by('full_name')
        )
        writing_skills_first_question_first_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_first_question_first_input'
            ).order_by('full_name')
        )
        writing_skills_first_question_end_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_first_question_end_input'
            ).order_by('full_name')
        )
        writing_skills_second_question_first_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_second_question_first_input'
            ).order_by('full_name')
        )
        writing_skills_second_question_end_input = list(
            nur_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_second_question_end_input'
            ).order_by('full_name')
        )
    elif term == 'SECOND TERM':
        identity = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'id'
            ).order_by('full_name')
        )
        stud_name = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'full_name'
            ).order_by('full_name')
        )
        question_1 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question1
            ).order_by('full_name')
        )
        question_2 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question2 
            ).order_by('full_name')
        )
        question_3 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question3
            ).order_by('full_name')
        )
        question_4 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question4
            ).order_by('full_name')
        )
        question_5 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question5
            ).order_by('full_name')
        )
        question_6 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question6
            ).order_by('full_name')
        )
        question_7 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question7
            ).order_by('full_name')
        )
        question_8 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question8
            ).order_by('full_name')
        )
        question_9 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question9
            ).order_by('full_name')
        )
        question_10 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question10
            ).order_by('full_name')
        )
        question_11 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question11
            ).order_by('full_name')
        )
        question_12 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question12
            ).order_by('full_name')
        )
        question_13 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question13
            ).order_by('full_name')
        )
        question_14 = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question14
            ).order_by('full_name')
        )
        numeracy_first_question_first_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_first_question_first_input'
            ).order_by('full_name')
        )
        numeracy_first_question_end_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_first_question_end_input'
            ).order_by('full_name')
        )
        numeracy_second_question_first_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_second_question_first_input'
            ).order_by('full_name')
        )
        numeracy_second_question_end_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_second_question_end_input'
            ).order_by('full_name')
        )
        numeracy_third_question_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_third_question_input'
            ).order_by('full_name')
        )
        numeracy_fourth_question_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_fourth_question_input'
            ).order_by('full_name')
        )
        numeracy_fifth_question_first_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_fifth_question_first_input'
            ).order_by('full_name')
        )
        numeracy_fifth_question_end_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_fifth_question_end_input'
            ).order_by('full_name')
        )
        writing_skills_first_question_first_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_first_question_first_input'
            ).order_by('full_name')
        )
        writing_skills_first_question_end_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_first_question_end_input'
            ).order_by('full_name')
        )
        writing_skills_second_question_first_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_second_question_first_input'
            ).order_by('full_name')
        )
        writing_skills_second_question_end_input = list(
            nur_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_second_question_end_input'
            ).order_by('full_name')
        )
    elif term == 'THIRD TERM':
        identity = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'id'
            ).order_by('full_name')
        )
        stud_name = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'full_name'
            ).order_by('full_name')
        )
        question_1 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question1
            ).order_by('full_name')
        )
        question_2 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question2 
            ).order_by('full_name')
        )
        question_3 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question3
            ).order_by('full_name')
        )
        question_4 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question4
            ).order_by('full_name')
        )
        question_5 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question5
            ).order_by('full_name')
        )
        question_6 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question6
            ).order_by('full_name')
        )
        question_7 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question7
            ).order_by('full_name')
        )
        question_8 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question8
            ).order_by('full_name')
        )
        question_9 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question9
            ).order_by('full_name')
        )
        question_10 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question10
            ).order_by('full_name')
        )
        question_11 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question11
            ).order_by('full_name')
        )
        question_12 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question12
            ).order_by('full_name')
        )
        question_13 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question13
            ).order_by('full_name')
        )
        question_14 = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                question14
            ).order_by('full_name')
        )
        numeracy_first_question_first_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_first_question_first_input'
            ).order_by('full_name')
        )
        numeracy_first_question_end_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_first_question_end_input'
            ).order_by('full_name')
        )
        numeracy_second_question_first_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_second_question_first_input'
            ).order_by('full_name')
        )
        numeracy_second_question_end_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_second_question_end_input'
            ).order_by('full_name')
        )
        numeracy_third_question_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_third_question_input'
            ).order_by('full_name')
        )
        numeracy_fourth_question_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_fourth_question_input'
            ).order_by('full_name')
        )
        numeracy_fifth_question_first_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_fifth_question_first_input'
            ).order_by('full_name')
        )
        numeracy_fifth_question_end_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'numeracy_fifth_question_end_input'
            ).order_by('id')
        )
        writing_skills_first_question_first_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_first_question_first_input'
            ).order_by('full_name')
        )
        writing_skills_first_question_end_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_first_question_end_input'
            ).order_by('full_name')
        )
        writing_skills_second_question_first_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_second_question_first_input'
            ).order_by('full_name')
        )
        writing_skills_second_question_end_input = list(
            nur_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'writing_skills_second_question_end_input'
            ).order_by('full_name')
        )
    else:
        identity = ''
        stud_name = ''
        question_1 = ''
        question_2 = ''
        question_3 = ''
        question_4 = ''
        question_5 = ''
        question_6 = ''
        question_7 = ''
        question_8 = ''
        question_9 = ''
        question_10 = ''
        question_11 = ''
        question_12 = ''
        question_13 = ''
        question_14 = ''
        numeracy_first_question_first_input = ''
        numeracy_first_question_end_input = ''
        numeracy_second_question_first_input = ''
        numeracy_second_question_end_input = ''
        numeracy_third_question_input = ''
        numeracy_fourth_question_input = ''
        numeracy_fifth_question_first_input = ''
        numeracy_fifth_question_end_input = ''
        writing_skills_first_question_first_input = ''
        writing_skills_first_question_end_input = ''
        writing_skills_second_question_first_input = ''
        writing_skills_second_question_end_input = ''
            

    return JsonResponse(
        {
            'identity':identity, 
            'stud_name':stud_name, 
            'data1':question_1, 
            'data2':question_2, 
            'data3':question_3, 
            'data4':question_4, 
            'data5':question_5, 
            'data6':question_6, 
            'data7':question_7, 
            'data8':question_8, 
            'data9':question_9, 
            'data10':question_10, 
            'data11':question_11, 
            'data12':question_12, 
            'data13':question_13, 
            'data14':question_14,
            'data15':numeracy_first_question_first_input,
            'data16':numeracy_first_question_end_input,
            'data17':numeracy_second_question_first_input,
            'data18':numeracy_second_question_end_input,
            'data19':numeracy_third_question_input,
            'data20':numeracy_fourth_question_input,
            'data21':numeracy_fifth_question_first_input,
            'data22':numeracy_fifth_question_end_input,
            'data23':writing_skills_first_question_first_input,
            'data24':writing_skills_first_question_end_input,
            'data25':writing_skills_second_question_first_input,
            'data26':writing_skills_second_question_end_input,
        }, 
        status=200
    )
    

@login_required(login_url='login_url')
def result_update(request, id):
    session_name = request.POST.get('session_name')
    section_name = request.POST.get('section_name')
    class_name = request.POST.get('class_name')
    term_name = request.POST.get('term_name')
    subject_name = request.POST.get('subject_name')
    student_full_name = request.POST.get('student_full_name')
    question1 = request.POST.get('question1')
    question2 = request.POST.get('question2')
    question3 = request.POST.get('question3')
    question4 = request.POST.get('question4')
    question5 = request.POST.get('question5')
    question6 = request.POST.get('question6')
    question7 = request.POST.get('question7')
    question8 = request.POST.get('question8')
    question9 = request.POST.get('question9')
    question10 = request.POST.get('question10')
    question11 = request.POST.get('question11')
    question12 = request.POST.get('question12')
    numeracy1 = request.POST.get('numeracy1')
    numeracy2 = request.POST.get('numeracy2')
    numeracy3 = request.POST.get('numeracy3')
    numeracy4 = request.POST.get('numeracy4')
    numeracy5 = request.POST.get('numeracy5')
    numeracy6 = request.POST.get('numeracy6')
    numeracy7 = request.POST.get('numeracy7')
    numeracy8 = request.POST.get('numeracy8')
    writing1 = request.POST.get('writing1')
    writing2 = request.POST.get('writing2')
    writing3 = request.POST.get('writing3')
    writing4 = request.POST.get('writing4')
    

    if request.method == 'POST':
        if term_name == 'FIRST TERM':
            result_update = nur_first_result.objects.filter(id=id)
            if subject_name == 'NUMERACY':
                result_update.update(
                    numeracy_question_1=question1,
                    numeracy_question_2=question2,
                    numeracy_question_3=question3,
                    numeracy_question_4=question4,
                    numeracy_question_5=question5,
                    numeracy_first_question_first_input=numeracy1,
                    numeracy_first_question_end_input=numeracy2,
                    numeracy_second_question_first_input=numeracy3,
                    numeracy_second_question_end_input=numeracy4,
                    numeracy_third_question_input=numeracy5,
                    numeracy_fourth_question_input=numeracy6,
                    numeracy_fifth_question_first_input=numeracy7,
                    numeracy_fifth_question_end_input=numeracy8,
                )
            elif subject_name == 'LITERACY':
                result_update.update(
                    literacy_question_1=question1,
                    literacy_question_2=question2,
                    literacy_question_3=question3,
                    literacy_question_4=question4,
                    literacy_question_5=question5,
                    literacy_question_6=question6,
                    literacy_question_7=question7,
                    literacy_question_8=question8,
                )
            elif subject_name == 'EMOTIONAL SKILLS':
                result_update.update(
                    emotional_skills_question_1=question1,
                    emotional_skills_question_2=question2,
                    emotional_skills_question_3=question3,
                    emotional_skills_question_4=question4,
                )
            elif subject_name == 'FINE MOTOR SKILLS':
                result_update.update(
                    fine_motor_skills_question_1=question1,
                    fine_motor_skills_question_2=question2,
                    fine_motor_skills_question_3=question3,
                    fine_motor_skills_question_4=question4,
                    fine_motor_skills_question_5=question5,
                    fine_motor_skills_question_6=question6,
                    fine_motor_skills_question_7=question7,
                    fine_motor_skills_question_8=question8,
                )
            elif subject_name == 'GROSS MOTOR SKILLS':
                result_update.update(
                    gross_motor_skills_question_1=question1,
                    gross_motor_skills_question_2=question2,
                    gross_motor_skills_question_3=question3,
                )
            elif subject_name == 'ICT SKILLS (COMPUTER)':
                result_update.update(
                    information_and_communication_technology_question_1=question1,
                    information_and_communication_technology_question_2=question2,
                    information_and_communication_technology_question_3=question3,
                )
            elif subject_name == 'SOCIAL SKILLS':
                result_update.update(
                    social_skills_question_1=question1,
                    social_skills_question_2=question2,
                    social_skills_question_3=question3,
                    social_skills_question_4=question4,
                    social_skills_question_5=question5,
                    social_skills_question_6=question6,
                    social_skills_question_7=question7,
                    social_skills_question_8=question8,
                    social_skills_question_9=question9,
                    social_skills_question_10=question10,
                    social_skills_question_11=question11,
                    social_skills_question_12=question12,
                )
            elif subject_name == 'RHYMES AND SONGS (MUSIC)':
                result_update.update(
                    Rhymes_and_songs_question_1=question1,
                    Rhymes_and_songs_question_2=question2,
                    Rhymes_and_songs_question_3=question3,
                    Rhymes_and_songs_question_4=question4,
                    Rhymes_and_songs_question_5=question5,
                )
            elif subject_name == 'WRITING SKILLS':
                result_update.update(
                    writing_skills_question_1=question1,
                    writing_skills_question_2=question2,
                    writing_skills_question_3=question3,
                    writing_skills_question_4=question4,
                    writing_skills_first_question_first_input=writing1,
                    writing_skills_first_question_end_input=writing2,
                    writing_skills_second_question_first_input=writing3,
                    writing_skills_second_question_end_input=writing4,
                )
        elif term_name == 'SECOND TERM':
            result_update = nur_second_result.objects.filter(id=id)
            if subject_name == 'NUMERACY':
                result_update.update(
                    numeracy_question_1=question1,
                    numeracy_question_2=question2,
                    numeracy_question_3=question3,
                    numeracy_question_4=question4,
                    numeracy_question_5=question5,
                    numeracy_first_question_first_input=numeracy1,
                    numeracy_first_question_end_input=numeracy2,
                    numeracy_second_question_first_input=numeracy3,
                    numeracy_second_question_end_input=numeracy4,
                    numeracy_third_question_input=numeracy5,
                    numeracy_fourth_question_input=numeracy6,
                    numeracy_fifth_question_first_input=numeracy7,
                    numeracy_fifth_question_end_input=numeracy8,
                )
            elif subject_name == 'LITERACY':
                result_update.update(
                    literacy_question_1=question1,
                    literacy_question_2=question2,
                    literacy_question_3=question3,
                    literacy_question_4=question4,
                    literacy_question_5=question5,
                    literacy_question_6=question6,
                    literacy_question_7=question7,
                    literacy_question_8=question8,
                )
            elif subject_name == 'EMOTIONAL SKILLS':
                result_update.update(
                    emotional_skills_question_1=question1,
                    emotional_skills_question_2=question2,
                    emotional_skills_question_3=question3,
                    emotional_skills_question_4=question4,
                )
            elif subject_name == 'FINE MOTOR SKILLS':
                result_update.update(
                    fine_motor_skills_question_1=question1,
                    fine_motor_skills_question_2=question2,
                    fine_motor_skills_question_3=question3,
                    fine_motor_skills_question_4=question4,
                    fine_motor_skills_question_5=question5,
                    fine_motor_skills_question_6=question6,
                    fine_motor_skills_question_7=question7,
                    fine_motor_skills_question_8=question8,
                )
            elif subject_name == 'GROSS MOTOR SKILLS':
                result_update.update(
                    gross_motor_skills_question_1=question1,
                    gross_motor_skills_question_2=question2,
                    gross_motor_skills_question_3=question3,
                )
            elif subject_name == 'ICT SKILLS (COMPUTER)':
                result_update.update(
                    information_and_communication_technology_question_1=question1,
                    information_and_communication_technology_question_2=question2,
                    information_and_communication_technology_question_3=question3,
                )
            elif subject_name == 'SOCIAL SKILLS':
                result_update.update(
                    social_skills_question_1=question1,
                    social_skills_question_2=question2,
                    social_skills_question_3=question3,
                    social_skills_question_4=question4,
                    social_skills_question_5=question5,
                    social_skills_question_6=question6,
                    social_skills_question_7=question7,
                    social_skills_question_8=question8,
                    social_skills_question_9=question9,
                    social_skills_question_10=question10,
                    social_skills_question_11=question11,
                    social_skills_question_12=question12,
                )
            elif subject_name == 'RHYMES AND SONGS (MUSIC)':
                result_update.update(
                    Rhymes_and_songs_question_1=question1,
                    Rhymes_and_songs_question_2=question2,
                    Rhymes_and_songs_question_3=question3,
                    Rhymes_and_songs_question_4=question4,
                    Rhymes_and_songs_question_5=question5,
                )
            elif subject_name == 'WRITING SKILLS':
                result_update.update(
                    writing_skills_question_1=question1,
                    writing_skills_question_2=question2,
                    writing_skills_question_3=question3,
                    writing_skills_question_4=question4,
                    writing_skills_first_question_first_input=writing1,
                    writing_skills_first_question_end_input=writing2,
                    writing_skills_second_question_first_input=writing3,
                    writing_skills_second_question_end_input=writing4,
                )
        elif term_name == 'THIRD TERM':
            result_update = nur_third_result.objects.filter(id=id)
            if subject_name == 'NUMERACY':
                result_update.update(
                    numeracy_question_1=question1,
                    numeracy_question_2=question2,
                    numeracy_question_3=question3,
                    numeracy_question_4=question4,
                    numeracy_question_5=question5,
                    numeracy_first_question_first_input=numeracy1,
                    numeracy_first_question_end_input=numeracy2,
                    numeracy_second_question_first_input=numeracy3,
                    numeracy_second_question_end_input=numeracy4,
                    numeracy_third_question_input=numeracy5,
                    numeracy_fourth_question_input=numeracy6,
                    numeracy_fifth_question_first_input=numeracy7,
                    numeracy_fifth_question_end_input=numeracy8,
                )
            elif subject_name == 'LITERACY':
                result_update.update(
                    literacy_question_1=question1,
                    literacy_question_2=question2,
                    literacy_question_3=question3,
                    literacy_question_4=question4,
                    literacy_question_5=question5,
                    literacy_question_6=question6,
                    literacy_question_7=question7,
                    literacy_question_8=question8,
                )
            elif subject_name == 'EMOTIONAL SKILLS':
                result_update.update(
                    emotional_skills_question_1=question1,
                    emotional_skills_question_2=question2,
                    emotional_skills_question_3=question3,
                    emotional_skills_question_4=question4,
                )
            elif subject_name == 'FINE MOTOR SKILLS':
                result_update.update(
                    fine_motor_skills_question_1=question1,
                    fine_motor_skills_question_2=question2,
                    fine_motor_skills_question_3=question3,
                    fine_motor_skills_question_4=question4,
                    fine_motor_skills_question_5=question5,
                    fine_motor_skills_question_6=question6,
                    fine_motor_skills_question_7=question7,
                    fine_motor_skills_question_8=question8,
                )
            elif subject_name == 'GROSS MOTOR SKILLS':
                result_update.update(
                    gross_motor_skills_question_1=question1,
                    gross_motor_skills_question_2=question2,
                    gross_motor_skills_question_3=question3,
                )
            elif subject_name == 'ICT SKILLS (COMPUTER)':
                result_update.update(
                    information_and_communication_technology_question_1=question1,
                    information_and_communication_technology_question_2=question2,
                    information_and_communication_technology_question_3=question3,
                )
            elif subject_name == 'SOCIAL SKILLS':
                result_update.update(
                    social_skills_question_1=question1,
                    social_skills_question_2=question2,
                    social_skills_question_3=question3,
                    social_skills_question_4=question4,
                    social_skills_question_5=question5,
                    social_skills_question_6=question6,
                    social_skills_question_7=question7,
                    social_skills_question_8=question8,
                    social_skills_question_9=question9,
                    social_skills_question_10=question10,
                    social_skills_question_11=question11,
                    social_skills_question_12=question12,
                )
            elif subject_name == 'RHYMES AND SONGS (MUSIC)':
                result_update.update(
                    Rhymes_and_songs_question_1=question1,
                    Rhymes_and_songs_question_2=question2,
                    Rhymes_and_songs_question_3=question3,
                    Rhymes_and_songs_question_4=question4,
                    Rhymes_and_songs_question_5=question5,
                )
            elif subject_name == 'WRITING SKILLS':
                result_update.update(
                    writing_skills_question_1=question1,
                    writing_skills_question_2=question2,
                    writing_skills_question_3=question3,
                    writing_skills_question_4=question4,
                    writing_skills_first_question_first_input=writing1,
                    writing_skills_first_question_end_input=writing2,
                    writing_skills_second_question_first_input=writing3,
                    writing_skills_second_question_end_input=writing4,
                )
        return HttpResponse('done')
    else:
        return redirect('/')


@login_required(login_url='login_url')
def primresult_update(request, id):
    term_name = request.POST.get('term_name')
    subject_name = request.POST.get('subject_name')
    firstca = int(request.POST.get('first_ca'))
    secondca = int(request.POST.get('second_ca'))
    thirdca = int(request.POST.get('third_ca'))
    fourthca = int(request.POST.get('fourth_ca'))
    exam = int(request.POST.get('exam'))

    if request.method == 'POST':
        if term_name == 'FIRST TERM':
            primresult_update = prim_first_result.objects.filter(id=id)
            if subject_name == 'NUMERACY':
                primresult_update.update(
                    numeracy_ca_1=firstca,
                    numeracy_ca_2=secondca,
                    numeracy_ca_3=thirdca,
                    numeracy_ca_4=fourthca,
                    numeracy_ca_total=firstca + secondca + thirdca + fourthca,
                    numeracy_exam=exam,
                    numeracy_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'LITERACY':
                primresult_update.update(
                    literacy_ca_1=firstca,
                    literacy_ca_2=secondca,
                    literacy_ca_3=thirdca,
                    literacy_ca_4=fourthca,
                    literacy_ca_total=firstca + secondca + thirdca + fourthca,
                    literacy_exam=exam,
                    literacy_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'ICT':
                primresult_update.update(
                    ict_ca_1=firstca,
                    ict_ca_2=secondca,
                    ict_ca_3=thirdca,
                    ict_ca_4=fourthca,
                    ict_ca_total=firstca + secondca + thirdca + fourthca,
                    ict_exam=exam,
                    ict_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'AGRICULTURAL SCIENCE':
                primresult_update.update(
                    agricultural_science_ca_1=firstca,
                    agricultural_science_ca_2=secondca,
                    agricultural_science_ca_3=thirdca,
                    agricultural_science_ca_4=fourthca,
                    agricultural_science_ca_total=firstca + secondca + thirdca + fourthca,
                    agricultural_science_exam=exam,
                    agricultural_science_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'CHESS':
                primresult_update.update(
                    chess_ca_1=firstca,
                    chess_ca_2=secondca,
                    chess_ca_3=thirdca,
                    chess_ca_4=fourthca,
                    chess_ca_total=firstca + secondca + thirdca + fourthca,
                    chess_exam=exam,
                    chess_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'CHRISTIAN RELIGIOUS KNOWLEDGE':
                primresult_update.update(
                    christian_religious_knowledge_ca_1=firstca,
                    christian_religious_knowledge_ca_2=secondca,
                    christian_religious_knowledge_ca_3=thirdca,
                    christian_religious_knowledge_ca_4=fourthca,
                    christian_religious_knowledge_ca_total=firstca + secondca + thirdca + fourthca,
                    christian_religious_knowledge_exam=exam,
                    christian_religious_knowledge_total=firstca + secondca + thirdca + fourthca + exam
                )
            elif subject_name == 'CITIZENSHIP':
                primresult_update.update(
                    citizenship_ca_1=firstca,
                    citizenship_ca_2=secondca,
                    citizenship_ca_3=thirdca,
                    citizenship_ca_4=fourthca,
                    citizenship_ca_total=firstca + secondca + thirdca + fourthca,
                    citizenship_exam=exam,
                    citizenship_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'COMPUTER STUDIES':
                primresult_update.update(
                    computer_studies_ca_1=firstca,
                    computer_studies_ca_2=secondca,
                    computer_studies_ca_3=thirdca,
                    computer_studies_ca_4=fourthca,
                    computer_studies_ca_total=firstca + secondca + thirdca + fourthca,
                    computer_studies_exam=exam,
                    computer_studies_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'FRENCH':
                primresult_update.update(
                    french_ca_1=firstca,
                    french_ca_2=secondca,
                    french_ca_3=thirdca,
                    french_ca_4=fourthca,
                    french_ca_total=firstca + secondca + thirdca + fourthca,
                    french_exam=exam,
                    french_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'GEOGRAPHY':
                primresult_update.update(
                    geography_ca_1=firstca,
                    geography_ca_2=secondca,
                    geography_ca_3=thirdca,
                    geography_ca_4=fourthca,
                    geography_ca_total=firstca + secondca + thirdca + fourthca,
                    geography_exam=exam,
                    geography_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'HISTORY':
                primresult_update.update(
                    history_ca_1=firstca,
                    history_ca_2=secondca,
                    history_ca_3=thirdca,
                    history_ca_4=fourthca,
                    history_ca_total=firstca + secondca + thirdca + fourthca,
                    history_exam=exam,
                    history_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'HOME ECONOMICS':
                primresult_update.update(
                    home_economics_ca_1=firstca,
                    home_economics_ca_2=secondca,
                    home_economics_ca_3=thirdca,
                    home_economics_ca_4=fourthca,
                    home_economics_ca_total=firstca + secondca + thirdca + fourthca,
                    home_economics_exam=exam,
                    home_economics_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'MORAL INSTRUCTION':
                primresult_update.update(
                    moral_instruction_ca_1=firstca,
                    moral_instruction_ca_2=secondca,
                    moral_instruction_ca_3=thirdca,
                    moral_instruction_ca_4=fourthca,
                    moral_instruction_ca_total=firstca + secondca + thirdca + fourthca,
                    moral_instruction_exam=exam,
                    moral_instruction_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'MUSIC':
                primresult_update.update(
                    music_ca_1=firstca,
                    music_ca_2=secondca,
                    music_ca_3=thirdca,
                    music_ca_4=fourthca,
                    music_ca_total=firstca + secondca + thirdca + fourthca,
                    music_exam=exam,
                    music_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'PHYSICAL AND HEALTH EDUCATION':
                primresult_update.update(
                    physical_and_health_education_ca_1=firstca,
                    physical_and_health_education_ca_2=secondca,
                    physical_and_health_education_ca_3=thirdca,
                    physical_and_health_education_ca_4=fourthca,
                    physical_and_health_education_ca_total=firstca + secondca + thirdca + fourthca,
                    physical_and_health_education_exam=exam,
                    physical_and_health_education_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'QUANTITATIVE REASONING':
                primresult_update.update(
                    quantitative_reasoning_ca_1=firstca,
                    quantitative_reasoning_ca_2=secondca,
                    quantitative_reasoning_ca_3=thirdca,
                    quantitative_reasoning_ca_4=fourthca,
                    quantitative_reasoning_ca_total=firstca + secondca + thirdca + fourthca,
                    quantitative_reasoning_exam=exam,
                    quantitative_reasoning_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SCIENCE':
                primresult_update.update(
                    science_ca_1=firstca,
                    science_ca_2=secondca,
                    science_ca_3=thirdca,
                    science_ca_4=fourthca,
                    science_ca_total=firstca + secondca + thirdca + fourthca,
                    science_exam=exam,
                    science_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SCRABBLE':
                primresult_update.update(
                    scrabble_ca_1=firstca,
                    scrabble_ca_2=secondca,
                    scrabble_ca_3=thirdca,
                    scrabble_ca_4=fourthca,
                    scrabble_ca_total=firstca + secondca + thirdca + fourthca,
                    scrabble_exam=exam,
                    scrabble_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SOCIAL STUDIES':
                primresult_update.update(
                    social_studies_ca_1=firstca,
                    social_studies_ca_2=secondca,
                    social_studies_ca_3=thirdca,
                    social_studies_ca_4=fourthca,
                    social_studies_ca_total=firstca + secondca + thirdca + fourthca,
                    social_studies_exam=exam,
                    social_studies_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SPELLING BEE':
                primresult_update.update(
                    spelling_bee_ca_1=firstca,
                    spelling_bee_ca_2=secondca,
                    spelling_bee_ca_3=thirdca,
                    spelling_bee_ca_4=fourthca,
                    spelling_bee_ca_total=firstca + secondca + thirdca + fourthca,
                    spelling_bee_exam=exam,
                    spelling_bee_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'VERBAL REASONING':
                primresult_update.update(
                    verbal_reasoning_ca_1=firstca,
                    verbal_reasoning_ca_2=secondca,
                    verbal_reasoning_ca_3=thirdca,
                    verbal_reasoning_ca_4=fourthca,
                    verbal_reasoning_ca_total=firstca + secondca + thirdca + fourthca,
                    verbal_reasoning_exam=exam,
                    verbal_reasoning_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'VOCATIONAL APTITUDE':
                primresult_update.update(
                    vocational_studies_ca_1=firstca,
                    vocational_studies_ca_2=secondca,
                    vocational_studies_ca_3=thirdca,
                    vocational_studies_ca_4=fourthca,
                    vocational_studies_ca_total=firstca + secondca + thirdca + fourthca,
                    vocational_studies_exam=exam,
                    vocational_studies_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'YORUBA':
                primresult_update.update(
                    yoruba_ca_1=firstca,
                    yoruba_ca_2=secondca,
                    yoruba_ca_3=thirdca,
                    yoruba_ca_4=fourthca,
                    yoruba_ca_total=firstca + secondca + thirdca + fourthca,
                    yoruba_exam=exam,
                    yoruba_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'CREATIVE ART':
                primresult_update.update(
                    creative_art_ca_1=firstca,
                    creative_art_ca_2=secondca,
                    creative_art_ca_3=thirdca,
                    creative_art_ca_4=fourthca,
                    creative_art_ca_total=firstca + secondca + thirdca + fourthca,
                    creative_art_exam=exam,
                    creative_art_total=firstca + secondca + thirdca + fourthca + exam,
                )
        elif term_name == 'SECOND TERM':
            primresult_update = prim_second_result.objects.filter(id=id)
            if subject_name == 'NUMERACY':
                primresult_update.update(
                    numeracy_ca_1=firstca,
                    numeracy_ca_2=secondca,
                    numeracy_ca_3=thirdca,
                    numeracy_ca_4=fourthca,
                    numeracy_ca_total=firstca + secondca + thirdca + fourthca,
                    numeracy_exam=exam,
                    numeracy_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'LITERACY':
                primresult_update.update(
                    literacy_ca_1=firstca,
                    literacy_ca_2=secondca,
                    literacy_ca_3=thirdca,
                    literacy_ca_4=fourthca,
                    literacy_ca_total=firstca + secondca + thirdca + fourthca,
                    literacy_exam=exam,
                    literacy_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'ICT':
                primresult_update.update(
                    ict_ca_1=firstca,
                    ict_ca_2=secondca,
                    ict_ca_3=thirdca,
                    ict_ca_4=fourthca,
                    ict_ca_total=firstca + secondca + thirdca + fourthca,
                    ict_exam=exam,
                    ict_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'AGRICULTURAL SCIENCE':
                primresult_update.update(
                    agricultural_science_ca_1=firstca,
                    agricultural_science_ca_2=secondca,
                    agricultural_science_ca_3=thirdca,
                    agricultural_science_ca_4=fourthca,
                    agricultural_science_ca_total=firstca + secondca + thirdca + fourthca,
                    agricultural_science_exam=exam,
                    agricultural_science_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'CHESS':
                primresult_update.update(
                    chess_ca_1=firstca,
                    chess_ca_2=secondca,
                    chess_ca_3=thirdca,
                    chess_ca_4=fourthca,
                    chess_ca_total=firstca + secondca + thirdca + fourthca,
                    chess_exam=exam,
                    chess_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'CHRISTIAN RELIGIOUS KNOWLEDGE':
                primresult_update.update(
                    christian_religious_knowledge_ca_1=firstca,
                    christian_religious_knowledge_ca_2=secondca,
                    christian_religious_knowledge_ca_3=thirdca,
                    christian_religious_knowledge_ca_4=fourthca,
                    christian_religious_knowledge_ca_total=firstca + secondca + thirdca + fourthca,
                    christian_religious_knowledge_exam=exam,
                    christian_religious_knowledge_total=firstca + secondca + thirdca + fourthca + exam
                )
            elif subject_name == 'CITIZENSHIP':
                primresult_update.update(
                    citizenship_ca_1=firstca,
                    citizenship_ca_2=secondca,
                    citizenship_ca_3=thirdca,
                    citizenship_ca_4=fourthca,
                    citizenship_ca_total=firstca + secondca + thirdca + fourthca,
                    citizenship_exam=exam,
                    citizenship_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'COMPUTER STUDIES':
                primresult_update.update(
                    computer_studies_ca_1=firstca,
                    computer_studies_ca_2=secondca,
                    computer_studies_ca_3=thirdca,
                    computer_studies_ca_4=fourthca,
                    computer_studies_ca_total=firstca + secondca + thirdca + fourthca,
                    computer_studies_exam=exam,
                    computer_studies_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'FRENCH':
                primresult_update.update(
                    french_ca_1=firstca,
                    french_ca_2=secondca,
                    french_ca_3=thirdca,
                    french_ca_4=fourthca,
                    french_ca_total=firstca + secondca + thirdca + fourthca,
                    french_exam=exam,
                    french_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'GEOGRAPHY':
                primresult_update.update(
                    geography_ca_1=firstca,
                    geography_ca_2=secondca,
                    geography_ca_3=thirdca,
                    geography_ca_4=fourthca,
                    geography_ca_total=firstca + secondca + thirdca + fourthca,
                    geography_exam=exam,
                    geography_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'HISTORY':
                primresult_update.update(
                    history_ca_1=firstca,
                    history_ca_2=secondca,
                    history_ca_3=thirdca,
                    history_ca_4=fourthca,
                    history_ca_total=firstca + secondca + thirdca + fourthca,
                    history_exam=exam,
                    history_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'HOME ECONOMICS':
                primresult_update.update(
                    home_economics_ca_1=firstca,
                    home_economics_ca_2=secondca,
                    home_economics_ca_3=thirdca,
                    home_economics_ca_4=fourthca,
                    home_economics_ca_total=firstca + secondca + thirdca + fourthca,
                    home_economics_exam=exam,
                    home_economics_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'MORAL INSTRUCTION':
                primresult_update.update(
                    moral_instruction_ca_1=firstca,
                    moral_instruction_ca_2=secondca,
                    moral_instruction_ca_3=thirdca,
                    moral_instruction_ca_4=fourthca,
                    moral_instruction_ca_total=firstca + secondca + thirdca + fourthca,
                    moral_instruction_exam=exam,
                    moral_instruction_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'MUSIC':
                primresult_update.update(
                    music_ca_1=firstca,
                    music_ca_2=secondca,
                    music_ca_3=thirdca,
                    music_ca_4=fourthca,
                    music_ca_total=firstca + secondca + thirdca + fourthca,
                    music_exam=exam,
                    music_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'PHYSICAL AND HEALTH EDUCATION':
                primresult_update.update(
                    physical_and_health_education_ca_1=firstca,
                    physical_and_health_education_ca_2=secondca,
                    physical_and_health_education_ca_3=thirdca,
                    physical_and_health_education_ca_4=fourthca,
                    physical_and_health_education_ca_total=firstca + secondca + thirdca + fourthca,
                    physical_and_health_education_exam=exam,
                    physical_and_health_education_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'QUANTITATIVE REASONING':
                primresult_update.update(
                    quantitative_reasoning_ca_1=firstca,
                    quantitative_reasoning_ca_2=secondca,
                    quantitative_reasoning_ca_3=thirdca,
                    quantitative_reasoning_ca_4=fourthca,
                    quantitative_reasoning_ca_total=firstca + secondca + thirdca + fourthca,
                    quantitative_reasoning_exam=exam,
                    quantitative_reasoning_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SCIENCE':
                primresult_update.update(
                    science_ca_1=firstca,
                    science_ca_2=secondca,
                    science_ca_3=thirdca,
                    science_ca_4=fourthca,
                    science_ca_total=firstca + secondca + thirdca + fourthca,
                    science_exam=exam,
                    science_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SCRABBLE':
                primresult_update.update(
                    scrabble_ca_1=firstca,
                    scrabble_ca_2=secondca,
                    scrabble_ca_3=thirdca,
                    scrabble_ca_4=fourthca,
                    scrabble_ca_total=firstca + secondca + thirdca + fourthca,
                    scrabble_exam=exam,
                    scrabble_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SOCIAL STUDIES':
                primresult_update.update(
                    social_studies_ca_1=firstca,
                    social_studies_ca_2=secondca,
                    social_studies_ca_3=thirdca,
                    social_studies_ca_4=fourthca,
                    social_studies_ca_total=firstca + secondca + thirdca + fourthca,
                    social_studies_exam=exam,
                    social_studies_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SPELLING BEE':
                primresult_update.update(
                    spelling_bee_ca_1=firstca,
                    spelling_bee_ca_2=secondca,
                    spelling_bee_ca_3=thirdca,
                    spelling_bee_ca_4=fourthca,
                    spelling_bee_ca_total=firstca + secondca + thirdca + fourthca,
                    spelling_bee_exam=exam,
                    spelling_bee_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'VERBAL REASONING':
                primresult_update.update(
                    verbal_reasoning_ca_1=firstca,
                    verbal_reasoning_ca_2=secondca,
                    verbal_reasoning_ca_3=thirdca,
                    verbal_reasoning_ca_4=fourthca,
                    verbal_reasoning_ca_total=firstca + secondca + thirdca + fourthca,
                    verbal_reasoning_exam=exam,
                    verbal_reasoning_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'VOCATIONAL APTITUDE':
                primresult_update.update(
                    vocational_studies_ca_1=firstca,
                    vocational_studies_ca_2=secondca,
                    vocational_studies_ca_3=thirdca,
                    vocational_studies_ca_4=fourthca,
                    vocational_studies_ca_total=firstca + secondca + thirdca + fourthca,
                    vocational_studies_exam=exam,
                    vocational_studies_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'YORUBA':
                primresult_update.update(
                    yoruba_ca_1=firstca,
                    yoruba_ca_2=secondca,
                    yoruba_ca_3=thirdca,
                    yoruba_ca_4=fourthca,
                    yoruba_ca_total=firstca + secondca + thirdca + fourthca,
                    yoruba_exam=exam,
                    yoruba_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'CREATIVE ART':
                primresult_update.update(
                    creative_art_ca_1=firstca,
                    creative_art_ca_2=secondca,
                    creative_art_ca_3=thirdca,
                    creative_art_ca_4=fourthca,
                    creative_art_ca_total=firstca + secondca + thirdca + fourthca,
                    creative_art_exam=exam,
                    creative_art_total=firstca + secondca + thirdca + fourthca + exam,
                )
        elif term_name == 'THIRD TERM':
            primresult_update = prim_third_result.objects.filter(id=id)
            if subject_name == 'NUMERACY':
                primresult_update.update(
                    numeracy_ca_1=firstca,
                    numeracy_ca_2=secondca,
                    numeracy_ca_3=thirdca,
                    numeracy_ca_4=fourthca,
                    numeracy_ca_total=firstca + secondca + thirdca + fourthca,
                    numeracy_exam=exam,
                    numeracy_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'LITERACY':
                primresult_update.update(
                    literacy_ca_1=firstca,
                    literacy_ca_2=secondca,
                    literacy_ca_3=thirdca,
                    literacy_ca_4=fourthca,
                    literacy_ca_total=firstca + secondca + thirdca + fourthca,
                    literacy_exam=exam,
                    literacy_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'ICT':
                primresult_update.update(
                    ict_ca_1=firstca,
                    ict_ca_2=secondca,
                    ict_ca_3=thirdca,
                    ict_ca_4=fourthca,
                    ict_ca_total=firstca + secondca + thirdca + fourthca,
                    ict_exam=exam,
                    ict_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'AGRICULTURAL SCIENCE':
                primresult_update.update(
                    agricultural_science_ca_1=firstca,
                    agricultural_science_ca_2=secondca,
                    agricultural_science_ca_3=thirdca,
                    agricultural_science_ca_4=fourthca,
                    agricultural_science_ca_total=firstca + secondca + thirdca + fourthca,
                    agricultural_science_exam=exam,
                    agricultural_science_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'CHESS':
                primresult_update.update(
                    chess_ca_1=firstca,
                    chess_ca_2=secondca,
                    chess_ca_3=thirdca,
                    chess_ca_4=fourthca,
                    chess_ca_total=firstca + secondca + thirdca + fourthca,
                    chess_exam=exam,
                    chess_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'CHRISTIAN RELIGIOUS KNOWLEDGE':
                primresult_update.update(
                    christian_religious_knowledge_ca_1=firstca,
                    christian_religious_knowledge_ca_2=secondca,
                    christian_religious_knowledge_ca_3=thirdca,
                    christian_religious_knowledge_ca_4=fourthca,
                    christian_religious_knowledge_ca_total=firstca + secondca + thirdca + fourthca,
                    christian_religious_knowledge_exam=exam,
                    christian_religious_knowledge_total=firstca + secondca + thirdca + fourthca + exam
                )
            elif subject_name == 'CITIZENSHIP':
                primresult_update.update(
                    citizenship_ca_1=firstca,
                    citizenship_ca_2=secondca,
                    citizenship_ca_3=thirdca,
                    citizenship_ca_4=fourthca,
                    citizenship_ca_total=firstca + secondca + thirdca + fourthca,
                    citizenship_exam=exam,
                    citizenship_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'COMPUTER STUDIES':
                primresult_update.update(
                    computer_studies_ca_1=firstca,
                    computer_studies_ca_2=secondca,
                    computer_studies_ca_3=thirdca,
                    computer_studies_ca_4=fourthca,
                    computer_studies_ca_total=firstca + secondca + thirdca + fourthca,
                    computer_studies_exam=exam,
                    computer_studies_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'FRENCH':
                primresult_update.update(
                    french_ca_1=firstca,
                    french_ca_2=secondca,
                    french_ca_3=thirdca,
                    french_ca_4=fourthca,
                    french_ca_total=firstca + secondca + thirdca + fourthca,
                    french_exam=exam,
                    french_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'GEOGRAPHY':
                primresult_update.update(
                    geography_ca_1=firstca,
                    geography_ca_2=secondca,
                    geography_ca_3=thirdca,
                    geography_ca_4=fourthca,
                    geography_ca_total=firstca + secondca + thirdca + fourthca,
                    geography_exam=exam,
                    geography_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'HISTORY':
                primresult_update.update(
                    history_ca_1=firstca,
                    history_ca_2=secondca,
                    history_ca_3=thirdca,
                    history_ca_4=fourthca,
                    history_ca_total=firstca + secondca + thirdca + fourthca,
                    history_exam=exam,
                    history_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'HOME ECONOMICS':
                primresult_update.update(
                    home_economics_ca_1=firstca,
                    home_economics_ca_2=secondca,
                    home_economics_ca_3=thirdca,
                    home_economics_ca_4=fourthca,
                    home_economics_ca_total=firstca + secondca + thirdca + fourthca,
                    home_economics_exam=exam,
                    home_economics_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'MORAL INSTRUCTION':
                primresult_update.update(
                    moral_instruction_ca_1=firstca,
                    moral_instruction_ca_2=secondca,
                    moral_instruction_ca_3=thirdca,
                    moral_instruction_ca_4=fourthca,
                    moral_instruction_ca_total=firstca + secondca + thirdca + fourthca,
                    moral_instruction_exam=exam,
                    moral_instruction_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'MUSIC':
                primresult_update.update(
                    music_ca_1=firstca,
                    music_ca_2=secondca,
                    music_ca_3=thirdca,
                    music_ca_4=fourthca,
                    music_ca_total=firstca + secondca + thirdca + fourthca,
                    music_exam=exam,
                    music_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'PHYSICAL AND HEALTH EDUCATION':
                primresult_update.update(
                    physical_and_health_education_ca_1=firstca,
                    physical_and_health_education_ca_2=secondca,
                    physical_and_health_education_ca_3=thirdca,
                    physical_and_health_education_ca_4=fourthca,
                    physical_and_health_education_ca_total=firstca + secondca + thirdca + fourthca,
                    physical_and_health_education_exam=exam,
                    physical_and_health_education_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'QUANTITATIVE REASONING':
                primresult_update.update(
                    quantitative_reasoning_ca_1=firstca,
                    quantitative_reasoning_ca_2=secondca,
                    quantitative_reasoning_ca_3=thirdca,
                    quantitative_reasoning_ca_4=fourthca,
                    quantitative_reasoning_ca_total=firstca + secondca + thirdca + fourthca,
                    quantitative_reasoning_exam=exam,
                    quantitative_reasoning_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SCIENCE':
                primresult_update.update(
                    science_ca_1=firstca,
                    science_ca_2=secondca,
                    science_ca_3=thirdca,
                    science_ca_4=fourthca,
                    science_ca_total=firstca + secondca + thirdca + fourthca,
                    science_exam=exam,
                    science_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SCRABBLE':
                primresult_update.update(
                    scrabble_ca_1=firstca,
                    scrabble_ca_2=secondca,
                    scrabble_ca_3=thirdca,
                    scrabble_ca_4=fourthca,
                    scrabble_ca_total=firstca + secondca + thirdca + fourthca,
                    scrabble_exam=exam,
                    scrabble_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SOCIAL STUDIES':
                primresult_update.update(
                    social_studies_ca_1=firstca,
                    social_studies_ca_2=secondca,
                    social_studies_ca_3=thirdca,
                    social_studies_ca_4=fourthca,
                    social_studies_ca_total=firstca + secondca + thirdca + fourthca,
                    social_studies_exam=exam,
                    social_studies_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'SPELLING BEE':
                primresult_update.update(
                    spelling_bee_ca_1=firstca,
                    spelling_bee_ca_2=secondca,
                    spelling_bee_ca_3=thirdca,
                    spelling_bee_ca_4=fourthca,
                    spelling_bee_ca_total=firstca + secondca + thirdca + fourthca,
                    spelling_bee_exam=exam,
                    spelling_bee_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'VERBAL REASONING':
                primresult_update.update(
                    verbal_reasoning_ca_1=firstca,
                    verbal_reasoning_ca_2=secondca,
                    verbal_reasoning_ca_3=thirdca,
                    verbal_reasoning_ca_4=fourthca,
                    verbal_reasoning_ca_total=firstca + secondca + thirdca + fourthca,
                    verbal_reasoning_exam=exam,
                    verbal_reasoning_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'VOCATIONAL APTITUDE':
                primresult_update.update(
                    vocational_studies_ca_1=firstca,
                    vocational_studies_ca_2=secondca,
                    vocational_studies_ca_3=thirdca,
                    vocational_studies_ca_4=fourthca,
                    vocational_studies_ca_total=firstca + secondca + thirdca + fourthca,
                    vocational_studies_exam=exam,
                    vocational_studies_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'YORUBA':
                primresult_update.update(
                    yoruba_ca_1=firstca,
                    yoruba_ca_2=secondca,
                    yoruba_ca_3=thirdca,
                    yoruba_ca_4=fourthca,
                    yoruba_ca_total=firstca + secondca + thirdca + fourthca,
                    yoruba_exam=exam,
                    yoruba_total=firstca + secondca + thirdca + fourthca + exam,
                )
            elif subject_name == 'CREATIVE ART':
                primresult_update.update(
                    creative_art_ca_1=firstca,
                    creative_art_ca_2=secondca,
                    creative_art_ca_3=thirdca,
                    creative_art_ca_4=fourthca,
                    creative_art_ca_total=firstca + secondca + thirdca + fourthca,
                    creative_art_exam=exam,
                    creative_art_total=firstca + secondca + thirdca + fourthca + exam,
                )
        return JsonResponse({'id':id}, status=200)
    else:
        return redirect('/')



@login_required(login_url='login_url')
def primresult_average(request, id):
    session_name = request.POST.get('session_name')
    section_name = request.POST.get('section_name')
    class_name = request.POST.get('class_name')
    subject_name = request.POST.get('subject_name')
    term_name = request.POST.get('term_name')
    
    if request.method == 'POST':
        subject_number = list(term_subjects.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name, term_name=term_name).values('subject_name'))
        subject_number2 = len(subject_number)
        
        if term_name == 'FIRST TERM':
            student = list(prim_first_result.objects.filter(id=id).values(
                'agricultural_science_total', 
                'chess_total',
                'christian_religious_knowledge_total',
                'citizenship_total',
                'computer_studies_total',
                'french_total',
                'geography_total',
                'history_total',
                'home_economics_total',
                'ict_total',
                'literacy_total',
                'moral_instruction_total',
                'music_total',
                'numeracy_total',
                'physical_and_health_education_total',
                'quantitative_reasoning_total',
                'science_total',
                'scrabble_total',
                'social_studies_total',
                'spelling_bee_total',
                'verbal_reasoning_total',
                'vocational_studies_total',
                'yoruba_total',
                'creative_art_total',
            ))
            subject_total = sum(student[0].values())
            student_average = subject_total / subject_number2
            student2 = prim_first_result.objects.filter(id=id)
            student2.update(total_scores=subject_total)
            student2.update(totl_average=student_average)
        elif term_name == 'SECOND TERM':
            student = list(prim_second_result.objects.filter(id=id).values(
                'agricultural_science_total', 
                'chess_total',
                'christian_religious_knowledge_total',
                'citizenship_total',
                'computer_studies_total',
                'french_total',
                'geography_total',
                'history_total',
                'home_economics_total',
                'ict_total',
                'literacy_total',
                'moral_instruction_total',
                'music_total',
                'numeracy_total',
                'physical_and_health_education_total',
                'quantitative_reasoning_total',
                'science_total',
                'scrabble_total',
                'social_studies_total',
                'spelling_bee_total',
                'verbal_reasoning_total',
                'vocational_studies_total',
                'yoruba_total',
                'creative_art_total'
            ))
            subject_total = sum(student[0].values())
            student_average = subject_total / subject_number2
            student2 = prim_second_result.objects.filter(id=id)
            student2.update(total_scores=subject_total)
            student2.update(totl_average=student_average)
        elif term_name == 'THIRD TERM':
            student = list(prim_third_result.objects.filter(id=id).values(
                'agricultural_science_total', 
                'chess_total',
                'christian_religious_knowledge_total',
                'citizenship_total',
                'computer_studies_total',
                'french_total',
                'geography_total',
                'history_total',
                'home_economics_total',
                'ict_total',
                'literacy_total',
                'moral_instruction_total',
                'music_total',
                'numeracy_total',
                'physical_and_health_education_total',
                'quantitative_reasoning_total',
                'science_total',
                'scrabble_total',
                'social_studies_total',
                'spelling_bee_total',
                'verbal_reasoning_total',
                'vocational_studies_total',
                'yoruba_total',
                'creative_art_total',
            ))
            subject_total = sum(student[0].values())
            student_average = subject_total / subject_number2
            student2 = prim_third_result.objects.filter(id=id)
            student2.update(total_scores=subject_total)
            student2.update(totl_average=student_average)
        
        return JsonResponse({
            'stuff1':subject_number2,
            'stuff2':subject_total,
            'stuff3':student_average,
            
        }, status=200)
    else:
        return redirect('/')


@login_required(login_url='login_url')
def term_subject_reset(request):
    session_name = request.POST.get('session_name')
    section_name = request.POST.get('section_name')
    class_name = request.POST.get('class_name')
    subject_name = request.POST.get('subject_name')
    term_name = request.POST.get('term_name')

    if request.method == 'POST':
        if term_name == 'FIRST TERM':
            students = prim_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name)
            if subject_name == 'NUMERACY':
                students.update(
                    numeracy_ca_1=0,
                    numeracy_ca_2=0,
                    numeracy_ca_3=0,
                    numeracy_ca_4=0,
                    numeracy_ca_total=0,
                    numeracy_exam=0,
                    numeracy_total=0,
                )
            elif subject_name == 'LITERACY':
                students.update(
                    literacy_ca_1=0,
                    literacy_ca_2=0,
                    literacy_ca_3=0,
                    literacy_ca_4=0,
                    literacy_ca_total=0,
                    literacy_exam=0,
                    literacy_total=0,
                )
            elif subject_name == 'ICT':
                students.update(
                    ict_ca_1=0,
                    ict_ca_2=0,
                    ict_ca_3=0,
                    ict_ca_4=0,
                    ict_ca_total=0,
                    ict_exam=0,
                    ict_total=0,
                )
            elif subject_name == 'AGRICULTURAL SCIENCE':
                students.update(
                    agricultural_science_ca_1=0,
                    agricultural_science_ca_2=0,
                    agricultural_science_ca_3=0,
                    agricultural_science_ca_4=0,
                    agricultural_science_ca_total=0,
                    agricultural_science_exam=0,
                    agricultural_science_total=0,
                )
            elif subject_name == 'CHESS':
                students.update(
                    chess_ca_1=0,
                    chess_ca_2=0,
                    chess_ca_3=0,
                    chess_ca_4=0,
                    chess_ca_total=0,
                    chess_exam=0,
                    chess_total=0,
                )
            elif subject_name == 'CHRISTIAN RELIGIOUS KNOWLEDGE':
                students.update(
                    christian_religious_knowledge_ca_1=0,
                    christian_religious_knowledge_ca_2=0,
                    christian_religious_knowledge_ca_3=0,
                    christian_religious_knowledge_ca_4=0,
                    christian_religious_knowledge_ca_total=0,
                    christian_religious_knowledge_exam=0,
                    christian_religious_knowledge_total=0
                )
            elif subject_name == 'CITIZENSHIP':
                students.update(
                    citizenship_ca_1=0,
                    citizenship_ca_2=0,
                    citizenship_ca_3=0,
                    citizenship_ca_4=0,
                    citizenship_ca_total=0,
                    citizenship_exam=0,
                    citizenship_total=0,
                )
            elif subject_name == 'COMPUTER STUDIES':
                students.update(
                    computer_studies_ca_1=0,
                    computer_studies_ca_2=0,
                    computer_studies_ca_3=0,
                    computer_studies_ca_4=0,
                    computer_studies_ca_total=0,
                    computer_studies_exam=0,
                    computer_studies_total=0,
                )
            elif subject_name == 'FRENCH':
                students.update(
                    french_ca_1=0,
                    french_ca_2=0,
                    french_ca_3=0,
                    french_ca_4=0,
                    french_ca_total=0,
                    french_exam=0,
                    french_total=0,
                )
            elif subject_name == 'GEOGRAPHY':
                students.update(
                    geography_ca_1=0,
                    geography_ca_2=0,
                    geography_ca_3=0,
                    geography_ca_4=0,
                    geography_ca_total=0,
                    geography_exam=0,
                    geography_total=0,
                )
            elif subject_name == 'HISTORY':
                students.update(
                    history_ca_1=0,
                    history_ca_2=0,
                    history_ca_3=0,
                    history_ca_4=0,
                    history_ca_total=0,
                    history_exam=0,
                    history_total=0,
                )
            elif subject_name == 'HOME ECONOMICS':
                students.update(
                    home_economics_ca_1=0,
                    home_economics_ca_2=0,
                    home_economics_ca_3=0,
                    home_economics_ca_4=0,
                    home_economics_ca_total=0,
                    home_economics_exam=0,
                    home_economics_total=0,
                )
            elif subject_name == 'MORAL INSTRUCTION':
                students.update(
                    moral_instruction_ca_1=0,
                    moral_instruction_ca_2=0,
                    moral_instruction_ca_3=0,
                    moral_instruction_ca_4=0,
                    moral_instruction_ca_total=0,
                    moral_instruction_exam=0,
                    moral_instruction_total=0,
                )
            elif subject_name == 'MUSIC':
                students.update(
                    music_ca_1=0,
                    music_ca_2=0,
                    music_ca_3=0,
                    music_ca_4=0,
                    music_ca_total=0,
                    music_exam=0,
                    music_total=0,
                )
            elif subject_name == 'PHYSICAL AND HEALTH EDUCATION':
                students.update(
                    physical_and_health_education_ca_1=0,
                    physical_and_health_education_ca_2=0,
                    physical_and_health_education_ca_3=0,
                    physical_and_health_education_ca_4=0,
                    physical_and_health_education_ca_total=0,
                    physical_and_health_education_exam=0,
                    physical_and_health_education_total=0,
                )
            elif subject_name == 'QUANTITATIVE REASONING':
                students.update(
                    quantitative_reasoning_ca_1=0,
                    quantitative_reasoning_ca_2=0,
                    quantitative_reasoning_ca_3=0,
                    quantitative_reasoning_ca_4=0,
                    quantitative_reasoning_ca_total=0,
                    quantitative_reasoning_exam=0,
                    quantitative_reasoning_total=0,
                )
            elif subject_name == 'SCIENCE':
                students.update(
                    science_ca_1=0,
                    science_ca_2=0,
                    science_ca_3=0,
                    science_ca_4=0,
                    science_ca_total=0,
                    science_exam=0,
                    science_total=0,
                )
            elif subject_name == 'SCRABBLE':
                students.update(
                    scrabble_ca_1=0,
                    scrabble_ca_2=0,
                    scrabble_ca_3=0,
                    scrabble_ca_4=0,
                    scrabble_ca_total=0,
                    scrabble_exam=0,
                    scrabble_total=0,
                )
            elif subject_name == 'SOCIAL STUDIES':
                students.update(
                    social_studies_ca_1=0,
                    social_studies_ca_2=0,
                    social_studies_ca_3=0,
                    social_studies_ca_4=0,
                    social_studies_ca_total=0,
                    social_studies_exam=0,
                    social_studies_total=0,
                )
            elif subject_name == 'SPELLING BEE':
                students.update(
                    spelling_bee_ca_1=0,
                    spelling_bee_ca_2=0,
                    spelling_bee_ca_3=0,
                    spelling_bee_ca_4=0,
                    spelling_bee_ca_total=0,
                    spelling_bee_exam=0,
                    spelling_bee_total=0,
                )
            elif subject_name == 'VERBAL REASONING':
                students.update(
                    verbal_reasoning_ca_1=0,
                    verbal_reasoning_ca_2=0,
                    verbal_reasoning_ca_3=0,
                    verbal_reasoning_ca_4=0,
                    verbal_reasoning_ca_total=0,
                    verbal_reasoning_exam=0,
                    verbal_reasoning_total=0,
                )
            elif subject_name == 'VOCATIONAL APTITUDE':
                students.update(
                    vocational_studies_ca_1=0,
                    vocational_studies_ca_2=0,
                    vocational_studies_ca_3=0,
                    vocational_studies_ca_4=0,
                    vocational_studies_ca_total=0,
                    vocational_studies_exam=0,
                    vocational_studies_total=0,
                )
            elif subject_name == 'YORUBA':
                students.update(
                    yoruba_ca_1=0,
                    yoruba_ca_2=0,
                    yoruba_ca_3=0,
                    yoruba_ca_4=0,
                    yoruba_ca_total=0,
                    yoruba_exam=0,
                    yoruba_total=0,
                )
            elif subject_name == 'CREATIVE ART':
                students.update(
                    creative_art_ca_1=0,
                    creative_art_ca_2=0,
                    creative_art_ca_3=0,
                    creative_art_ca_4=0,
                    creative_art_ca_total=0,
                    creative_art_exam=0,
                    creative_art_total=0,
                )
        elif term_name == 'SECOND TERM':
            students = prim_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name)
            if subject_name == 'NUMERACY':
                students.update(
                    numeracy_ca_1=0,
                    numeracy_ca_2=0,
                    numeracy_ca_3=0,
                    numeracy_ca_4=0,
                    numeracy_ca_total=0,
                    numeracy_exam=0,
                    numeracy_total=0,
                )
            elif subject_name == 'LITERACY':
                students.update(
                    literacy_ca_1=0,
                    literacy_ca_2=0,
                    literacy_ca_3=0,
                    literacy_ca_4=0,
                    literacy_ca_total=0,
                    literacy_exam=0,
                    literacy_total=0,
                )
            elif subject_name == 'ICT':
                students.update(
                    ict_ca_1=0,
                    ict_ca_2=0,
                    ict_ca_3=0,
                    ict_ca_4=0,
                    ict_ca_total=0,
                    ict_exam=0,
                    ict_total=0,
                )
            elif subject_name == 'AGRICULTURAL SCIENCE':
                students.update(
                    agricultural_science_ca_1=0,
                    agricultural_science_ca_2=0,
                    agricultural_science_ca_3=0,
                    agricultural_science_ca_4=0,
                    agricultural_science_ca_total=0,
                    agricultural_science_exam=0,
                    agricultural_science_total=0,
                )
            elif subject_name == 'CHESS':
                students.update(
                    chess_ca_1=0,
                    chess_ca_2=0,
                    chess_ca_3=0,
                    chess_ca_4=0,
                    chess_ca_total=0,
                    chess_exam=0,
                    chess_total=0,
                )
            elif subject_name == 'CHRISTIAN RELIGIOUS KNOWLEDGE':
                students.update(
                    christian_religious_knowledge_ca_1=0,
                    christian_religious_knowledge_ca_2=0,
                    christian_religious_knowledge_ca_3=0,
                    christian_religious_knowledge_ca_4=0,
                    christian_religious_knowledge_ca_total=0,
                    christian_religious_knowledge_exam=0,
                    christian_religious_knowledge_total=0
                )
            elif subject_name == 'CITIZENSHIP':
                students.update(
                    citizenship_ca_1=0,
                    citizenship_ca_2=0,
                    citizenship_ca_3=0,
                    citizenship_ca_4=0,
                    citizenship_ca_total=0,
                    citizenship_exam=0,
                    citizenship_total=0,
                )
            elif subject_name == 'COMPUTER STUDIES':
                students.update(
                    computer_studies_ca_1=0,
                    computer_studies_ca_2=0,
                    computer_studies_ca_3=0,
                    computer_studies_ca_4=0,
                    computer_studies_ca_total=0,
                    computer_studies_exam=0,
                    computer_studies_total=0,
                )
            elif subject_name == 'FRENCH':
                students.update(
                    french_ca_1=0,
                    french_ca_2=0,
                    french_ca_3=0,
                    french_ca_4=0,
                    french_ca_total=0,
                    french_exam=0,
                    french_total=0,
                )
            elif subject_name == 'GEOGRAPHY':
                students.update(
                    geography_ca_1=0,
                    geography_ca_2=0,
                    geography_ca_3=0,
                    geography_ca_4=0,
                    geography_ca_total=0,
                    geography_exam=0,
                    geography_total=0,
                )
            elif subject_name == 'HISTORY':
                students.update(
                    history_ca_1=0,
                    history_ca_2=0,
                    history_ca_3=0,
                    history_ca_4=0,
                    history_ca_total=0,
                    history_exam=0,
                    history_total=0,
                )
            elif subject_name == 'HOME ECONOMICS':
                students.update(
                    home_economics_ca_1=0,
                    home_economics_ca_2=0,
                    home_economics_ca_3=0,
                    home_economics_ca_4=0,
                    home_economics_ca_total=0,
                    home_economics_exam=0,
                    home_economics_total=0,
                )
            elif subject_name == 'MORAL INSTRUCTION':
                students.update(
                    moral_instruction_ca_1=0,
                    moral_instruction_ca_2=0,
                    moral_instruction_ca_3=0,
                    moral_instruction_ca_4=0,
                    moral_instruction_ca_total=0,
                    moral_instruction_exam=0,
                    moral_instruction_total=0,
                )
            elif subject_name == 'MUSIC':
                students.update(
                    music_ca_1=0,
                    music_ca_2=0,
                    music_ca_3=0,
                    music_ca_4=0,
                    music_ca_total=0,
                    music_exam=0,
                    music_total=0,
                )
            elif subject_name == 'PHYSICAL AND HEALTH EDUCATION':
                students.update(
                    physical_and_health_education_ca_1=0,
                    physical_and_health_education_ca_2=0,
                    physical_and_health_education_ca_3=0,
                    physical_and_health_education_ca_4=0,
                    physical_and_health_education_ca_total=0,
                    physical_and_health_education_exam=0,
                    physical_and_health_education_total=0,
                )
            elif subject_name == 'QUANTITATIVE REASONING':
                students.update(
                    quantitative_reasoning_ca_1=0,
                    quantitative_reasoning_ca_2=0,
                    quantitative_reasoning_ca_3=0,
                    quantitative_reasoning_ca_4=0,
                    quantitative_reasoning_ca_total=0,
                    quantitative_reasoning_exam=0,
                    quantitative_reasoning_total=0,
                )
            elif subject_name == 'SCIENCE':
                students.update(
                    science_ca_1=0,
                    science_ca_2=0,
                    science_ca_3=0,
                    science_ca_4=0,
                    science_ca_total=0,
                    science_exam=0,
                    science_total=0,
                )
            elif subject_name == 'SCRABBLE':
                students.update(
                    scrabble_ca_1=0,
                    scrabble_ca_2=0,
                    scrabble_ca_3=0,
                    scrabble_ca_4=0,
                    scrabble_ca_total=0,
                    scrabble_exam=0,
                    scrabble_total=0,
                )
            elif subject_name == 'SOCIAL STUDIES':
                students.update(
                    social_studies_ca_1=0,
                    social_studies_ca_2=0,
                    social_studies_ca_3=0,
                    social_studies_ca_4=0,
                    social_studies_ca_total=0,
                    social_studies_exam=0,
                    social_studies_total=0,
                )
            elif subject_name == 'SPELLING BEE':
                students.update(
                    spelling_bee_ca_1=0,
                    spelling_bee_ca_2=0,
                    spelling_bee_ca_3=0,
                    spelling_bee_ca_4=0,
                    spelling_bee_ca_total=0,
                    spelling_bee_exam=0,
                    spelling_bee_total=0,
                )
            elif subject_name == 'VERBAL REASONING':
                students.update(
                    verbal_reasoning_ca_1=0,
                    verbal_reasoning_ca_2=0,
                    verbal_reasoning_ca_3=0,
                    verbal_reasoning_ca_4=0,
                    verbal_reasoning_ca_total=0,
                    verbal_reasoning_exam=0,
                    verbal_reasoning_total=0,
                )
            elif subject_name == 'VOCATIONAL APTITUDE':
                students.update(
                    vocational_studies_ca_1=0,
                    vocational_studies_ca_2=0,
                    vocational_studies_ca_3=0,
                    vocational_studies_ca_4=0,
                    vocational_studies_ca_total=0,
                    vocational_studies_exam=0,
                    vocational_studies_total=0,
                )
            elif subject_name == 'YORUBA':
                students.update(
                    yoruba_ca_1=0,
                    yoruba_ca_2=0,
                    yoruba_ca_3=0,
                    yoruba_ca_4=0,
                    yoruba_ca_total=0,
                    yoruba_exam=0,
                    yoruba_total=0,
                )
            elif subject_name == 'CREATIVE ART':
                students.update(
                    creative_art_ca_1=0,
                    creative_art_ca_2=0,
                    creative_art_ca_3=0,
                    creative_art_ca_4=0,
                    creative_art_ca_total=0,
                    creative_art_exam=0,
                    creative_art_total=0,
                )
        elif term_name == 'THIRD TERM':
            students = prim_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name)
            if subject_name == 'NUMERACY':
                students.update(
                    numeracy_ca_1=0,
                    numeracy_ca_2=0,
                    numeracy_ca_3=0,
                    numeracy_ca_4=0,
                    numeracy_ca_total=0,
                    numeracy_exam=0,
                    numeracy_total=0,
                )
            elif subject_name == 'LITERACY':
                students.update(
                    literacy_ca_1=0,
                    literacy_ca_2=0,
                    literacy_ca_3=0,
                    literacy_ca_4=0,
                    literacy_ca_total=0,
                    literacy_exam=0,
                    literacy_total=0,
                )
            elif subject_name == 'ICT':
                students.update(
                    ict_ca_1=0,
                    ict_ca_2=0,
                    ict_ca_3=0,
                    ict_ca_4=0,
                    ict_ca_total=0,
                    ict_exam=0,
                    ict_total=0,
                )
            elif subject_name == 'AGRICULTURAL SCIENCE':
                students.update(
                    agricultural_science_ca_1=0,
                    agricultural_science_ca_2=0,
                    agricultural_science_ca_3=0,
                    agricultural_science_ca_4=0,
                    agricultural_science_ca_total=0,
                    agricultural_science_exam=0,
                    agricultural_science_total=0,
                )
            elif subject_name == 'CHESS':
                students.update(
                    chess_ca_1=0,
                    chess_ca_2=0,
                    chess_ca_3=0,
                    chess_ca_4=0,
                    chess_ca_total=0,
                    chess_exam=0,
                    chess_total=0,
                )
            elif subject_name == 'CHRISTIAN RELIGIOUS KNOWLEDGE':
                students.update(
                    christian_religious_knowledge_ca_1=0,
                    christian_religious_knowledge_ca_2=0,
                    christian_religious_knowledge_ca_3=0,
                    christian_religious_knowledge_ca_4=0,
                    christian_religious_knowledge_ca_total=0,
                    christian_religious_knowledge_exam=0,
                    christian_religious_knowledge_total=0
                )
            elif subject_name == 'CITIZENSHIP':
                students.update(
                    citizenship_ca_1=0,
                    citizenship_ca_2=0,
                    citizenship_ca_3=0,
                    citizenship_ca_4=0,
                    citizenship_ca_total=0,
                    citizenship_exam=0,
                    citizenship_total=0,
                )
            elif subject_name == 'COMPUTER STUDIES':
                students.update(
                    computer_studies_ca_1=0,
                    computer_studies_ca_2=0,
                    computer_studies_ca_3=0,
                    computer_studies_ca_4=0,
                    computer_studies_ca_total=0,
                    computer_studies_exam=0,
                    computer_studies_total=0,
                )
            elif subject_name == 'FRENCH':
                students.update(
                    french_ca_1=0,
                    french_ca_2=0,
                    french_ca_3=0,
                    french_ca_4=0,
                    french_ca_total=0,
                    french_exam=0,
                    french_total=0,
                )
            elif subject_name == 'GEOGRAPHY':
                students.update(
                    geography_ca_1=0,
                    geography_ca_2=0,
                    geography_ca_3=0,
                    geography_ca_4=0,
                    geography_ca_total=0,
                    geography_exam=0,
                    geography_total=0,
                )
            elif subject_name == 'HISTORY':
                students.update(
                    history_ca_1=0,
                    history_ca_2=0,
                    history_ca_3=0,
                    history_ca_4=0,
                    history_ca_total=0,
                    history_exam=0,
                    history_total=0,
                )
            elif subject_name == 'HOME ECONOMICS':
                students.update(
                    home_economics_ca_1=0,
                    home_economics_ca_2=0,
                    home_economics_ca_3=0,
                    home_economics_ca_4=0,
                    home_economics_ca_total=0,
                    home_economics_exam=0,
                    home_economics_total=0,
                )
            elif subject_name == 'MORAL INSTRUCTION':
                students.update(
                    moral_instruction_ca_1=0,
                    moral_instruction_ca_2=0,
                    moral_instruction_ca_3=0,
                    moral_instruction_ca_4=0,
                    moral_instruction_ca_total=0,
                    moral_instruction_exam=0,
                    moral_instruction_total=0,
                )
            elif subject_name == 'MUSIC':
                students.update(
                    music_ca_1=0,
                    music_ca_2=0,
                    music_ca_3=0,
                    music_ca_4=0,
                    music_ca_total=0,
                    music_exam=0,
                    music_total=0,
                )
            elif subject_name == 'PHYSICAL AND HEALTH EDUCATION':
                students.update(
                    physical_and_health_education_ca_1=0,
                    physical_and_health_education_ca_2=0,
                    physical_and_health_education_ca_3=0,
                    physical_and_health_education_ca_4=0,
                    physical_and_health_education_ca_total=0,
                    physical_and_health_education_exam=0,
                    physical_and_health_education_total=0,
                )
            elif subject_name == 'QUANTITATIVE REASONING':
                students.update(
                    quantitative_reasoning_ca_1=0,
                    quantitative_reasoning_ca_2=0,
                    quantitative_reasoning_ca_3=0,
                    quantitative_reasoning_ca_4=0,
                    quantitative_reasoning_ca_total=0,
                    quantitative_reasoning_exam=0,
                    quantitative_reasoning_total=0,
                )
            elif subject_name == 'SCIENCE':
                students.update(
                    science_ca_1=0,
                    science_ca_2=0,
                    science_ca_3=0,
                    science_ca_4=0,
                    science_ca_total=0,
                    science_exam=0,
                    science_total=0,
                )
            elif subject_name == 'SCRABBLE':
                students.update(
                    scrabble_ca_1=0,
                    scrabble_ca_2=0,
                    scrabble_ca_3=0,
                    scrabble_ca_4=0,
                    scrabble_ca_total=0,
                    scrabble_exam=0,
                    scrabble_total=0,
                )
            elif subject_name == 'SOCIAL STUDIES':
                students.update(
                    social_studies_ca_1=0,
                    social_studies_ca_2=0,
                    social_studies_ca_3=0,
                    social_studies_ca_4=0,
                    social_studies_ca_total=0,
                    social_studies_exam=0,
                    social_studies_total=0,
                )
            elif subject_name == 'SPELLING BEE':
                students.update(
                    spelling_bee_ca_1=0,
                    spelling_bee_ca_2=0,
                    spelling_bee_ca_3=0,
                    spelling_bee_ca_4=0,
                    spelling_bee_ca_total=0,
                    spelling_bee_exam=0,
                    spelling_bee_total=0,
                )
            elif subject_name == 'VERBAL REASONING':
                students.update(
                    verbal_reasoning_ca_1=0,
                    verbal_reasoning_ca_2=0,
                    verbal_reasoning_ca_3=0,
                    verbal_reasoning_ca_4=0,
                    verbal_reasoning_ca_total=0,
                    verbal_reasoning_exam=0,
                    verbal_reasoning_total=0,
                )
            elif subject_name == 'VOCATIONAL APTITUDE':
                students.update(
                    vocational_studies_ca_1=0,
                    vocational_studies_ca_2=0,
                    vocational_studies_ca_3=0,
                    vocational_studies_ca_4=0,
                    vocational_studies_ca_total=0,
                    vocational_studies_exam=0,
                    vocational_studies_total=0,
                )
            elif subject_name == 'YORUBA':
                students.update(
                    yoruba_ca_1=0,
                    yoruba_ca_2=0,
                    yoruba_ca_3=0,
                    yoruba_ca_4=0,
                    yoruba_ca_total=0,
                    yoruba_exam=0,
                    yoruba_total=0,
                )
            elif subject_name == 'CREATIVE ART':
                students.update(
                    creative_art_ca_1=0,
                    creative_art_ca_2=0,
                    creative_art_ca_3=0,
                    creative_art_ca_4=0,
                    creative_art_ca_total=0,
                    creative_art_exam=0,
                    creative_art_total=0,
                )
        return HttpResponse('done')
    else:
        return redirect('/')















@login_required(login_url='login_url')
def get_psychomotor_list(request, *args, **kwargs):
    subject = kwargs.get('goat')
    session_1 = kwargs.get('sheep')
    session_2 = kwargs.get('cow')
    section = kwargs.get('chicken')
    clas = kwargs.get('rabbit')
    term = kwargs.get('snake')
    session_value = str(session_1) + '/' + str(session_2)

    
    if term == 'FIRST TERM':

        identity = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'id'
            ).order_by('full_name')
        )
        studname = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'full_name'
            ).order_by('full_name')
        )
        punctuality = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_punctuality'
            ).order_by('full_name')
        )
        mental_alertness = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_mental_alertness'
            ).order_by('full_name')
        )
        respect = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_respect'
            ).order_by('full_name')
        )
        neatness = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_neatness'
            ).order_by('full_name')
        )
        politeness = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_politeness'
            ).order_by('full_name')
        )
        honesty = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_honesty'
            ).order_by('full_name')
        )
        relationship_with_peers = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_relationship_with_peers'
            ).order_by('full_name')
        )
        willingness_to_learn = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_willingness_to_learn'
            ).order_by('full_name')
        )
        spirit_of_teamwork = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_spirit_of_teamwork'
            ).order_by('full_name')
        )
        health = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_health'
            ).order_by('full_name')
        )
        verbal_skills = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_verbal_skill'
            ).order_by('full_name')
        )
        participation_in_games_and_sports = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_participation_in_games_and_sports'
            ).order_by('full_name')
        )
        artistic_creativity = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_artistic_creativity'
            ).order_by('full_name')
        )
        musical_skills = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_musical_skills'
            ).order_by('full_name')
        )
        dance_skills = list(
            prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_dance_skills'
            ).order_by('full_name')
        )

    elif term == 'SECOND TERM':
        identity = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'id'
            ).order_by('full_name')
        )
        studname = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'full_name'
            ).order_by('full_name')
        )
        punctuality = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_punctuality'
            ).order_by('full_name')
        )
        mental_alertness = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_mental_alertness'
            ).order_by('full_name')
        )
        respect = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_respect'
            ).order_by('full_name')
        )
        neatness = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_neatness'
            ).order_by('full_name')
        )
        politeness = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_politeness'
            ).order_by('full_name')
        )
        honesty = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_honesty'
            ).order_by('full_name')
        )
        relationship_with_peers = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_relationship_with_peers'
            ).order_by('full_name')
        )
        willingness_to_learn = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_willingness_to_learn'
            ).order_by('full_name')
        )
        spirit_of_teamwork = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_spirit_of_teamwork'
            ).order_by('full_name')
        )
        health = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_health'
            ).order_by('full_name')
        )
        verbal_skills = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_verbal_skill'
            ).order_by('full_name')
        )
        participation_in_games_and_sports = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_participation_in_games_and_sports'
            ).order_by('full_name')
        )
        artistic_creativity = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_artistic_creativity'
            ).order_by('full_name')
        )
        musical_skills = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_musical_skills'
            ).order_by('full_name')
        )
        dance_skills = list(
            prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_dance_skills'
            ).order_by('full_name')
        )
        
    elif term == 'THIRD TERM':
        identity = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'id'
            ).order_by('full_name')
        )
        studname = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'full_name'
            ).order_by('full_name')
        )
        punctuality = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_punctuality'
            ).order_by('full_name')
        )
        mental_alertness = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_mental_alertness'
            ).order_by('full_name')
        )
        respect = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_respect'
            ).order_by('full_name')
        )
        neatness = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_neatness'
            ).order_by('full_name')
        )
        politeness = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_politeness'
            ).order_by('full_name')
        )
        honesty = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_honesty'
            ).order_by('full_name')
        )
        relationship_with_peers = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_relationship_with_peers'
            ).order_by('full_name')
        )
        willingness_to_learn = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_willingness_to_learn'
            ).order_by('full_name')
        )
        spirit_of_teamwork = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_spirit_of_teamwork'
            ).order_by('full_name')
        )
        health = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_health'
            ).order_by('full_name')
        )
        verbal_skills = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_verbal_skill'
            ).order_by('full_name')
        )
        participation_in_games_and_sports = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_participation_in_games_and_sports'
            ).order_by('full_name')
        )
        artistic_creativity = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_artistic_creativity'
            ).order_by('full_name')
        )
        musical_skills = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_musical_skills'
            ).order_by('full_name')
        )
        dance_skills = list(
            prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values(
                'psychomotor_dance_skills'
            ).order_by('full_name')
        )
        
    else:
        identity = ''
        studname = ''
        punctuality = ''
        mental_alertness = ''
        respect = ''
        neatness = ''
        politeness = ''
        honesty = ''
        relationship_with_peers = ''
        willingness_to_learn = ''
        spirit_of_teamwork = ''
        health = ''
        verbal_skills = ''
        participation_in_games_and_sports = ''
        artistic_creativity = ''
        musical_skills = ''
        dance_skills = ''

    
    return JsonResponse({
        'identity':identity, 
        'name':studname, 
        'data1':punctuality, 
        'data2':mental_alertness, 
        'data3':respect, 
        'data4':neatness, 
        'data5':politeness,
        'data6':honesty,
        'data7':relationship_with_peers,
        'data8':willingness_to_learn,
        'data9':spirit_of_teamwork,
        'data10':health,
        'data11':verbal_skills,
        'data12':participation_in_games_and_sports,
        'data13':artistic_creativity,
        'data14':musical_skills,
        'data15':dance_skills,}, status=200)


@login_required(login_url='login_url')
def update_psyc(request, id):
    subject_name = request.POST.get('subject_name')
    term_name = request.POST.get('term_name')
    value = request.POST.get('psycoption')

    if request.method == 'POST':
        if term_name == 'FIRST TERM':
            student = prim_first_result.objects.filter(id=id)
            if subject_name == 'PUNCTUALITY':
                student.update(psychomotor_punctuality=value)
            elif subject_name == 'MENTAL ALERTNESS':
                student.update(psychomotor_mental_alertness=value)
            elif subject_name == 'RESPECT':
                student.update(psychomotor_respect=value)
            elif subject_name == 'NEATNESS':
                student.update(psychomotor_neatness=value)
            elif subject_name == 'POLITENESS':
                student.update(psychomotor_politeness=value)
            elif subject_name == 'HONESTY':
                student.update(psychomotor_honesty=value)
            elif subject_name == 'RELATIONSHIP WITH PEERS':
                student.update(psychomotor_relationship_with_peers=value)
            elif subject_name == 'WILLINGNESS TO LEARN':
                student.update(psychomotor_willingness_to_learn=value)
            elif subject_name == 'SPIRIT OF TEAMWORK':
                student.update(psychomotor_spirit_of_teamwork=value)
            elif subject_name == 'HEALTH':
                student.update(psychomotor_health=value)
            elif subject_name == 'VERBAL SKILLS':
                student.update(psychomotor_verbal_skill=value)
            elif subject_name == 'PARTICIPATION IN GAMES & SPORTS':
                student.update(psychomotor_participation_in_games_and_sports=value)
            elif subject_name == 'ARTISTIC CREATIVITY':
                student.update(psychomotor_artistic_creativity=value)
            elif subject_name == 'MUSICAL SKILLS':
                student.update(psychomotor_musical_skills=value)
            elif subject_name == 'DANCE SKILLS':
                student.update(psychomotor_dance_skills=value)
        elif term_name == 'SECOND TERM':
            student = prim_second_result.objects.filter(id=id)
            if subject_name == 'PUNCTUALITY':
                student.update(psychomotor_punctuality=value)
            elif subject_name == 'MENTAL ALERTNESS':
                student.update(psychomotor_mental_alertness=value)
            elif subject_name == 'RESPECT':
                student.update(psychomotor_respect=value)
            elif subject_name == 'NEATNESS':
                student.update(psychomotor_neatness=value)
            elif subject_name == 'POLITENESS':
                student.update(psychomotor_politeness=value)
            elif subject_name == 'HONESTY':
                student.update(psychomotor_honesty=value)
            elif subject_name == 'RELATIONSHIP WITH PEERS':
                student.update(psychomotor_relationship_with_peers=value)
            elif subject_name == 'WILLINGNESS TO LEARN':
                student.update(psychomotor_willingness_to_learn=value)
            elif subject_name == 'SPIRIT OF TEAMWORK':
                student.update(psychomotor_spirit_of_teamwork=value)
            elif subject_name == 'HEALTH':
                student.update(psychomotor_health=value)
            elif subject_name == 'VERBAL SKILLS':
                student.update(psychomotor_verbal_skill=value)
            elif subject_name == 'PARTICIPATION IN GAMES & SPORTS':
                student.update(psychomotor_participation_in_games_and_sports=value)
            elif subject_name == 'ARTISTIC CREATIVITY':
                student.update(psychomotor_artistic_creativity=value)
            elif subject_name == 'MUSICAL SKILLS':
                student.update(psychomotor_musical_skills=value)
            elif subject_name == 'DANCE SKILLS':
                student.update(psychomotor_dance_skills=value)
        elif term_name == 'THIRD TERM':
            student = prim_third_result.objects.filter(id=id)
            if subject_name == 'PUNCTUALITY':
                student.update(psychomotor_punctuality=value)
            elif subject_name == 'MENTAL ALERTNESS':
                student.update(psychomotor_mental_alertness=value)
            elif subject_name == 'RESPECT':
                student.update(psychomotor_respect=value)
            elif subject_name == 'NEATNESS':
                student.update(psychomotor_neatness=value)
            elif subject_name == 'POLITENESS':
                student.update(psychomotor_politeness=value)
            elif subject_name == 'HONESTY':
                student.update(psychomotor_honesty=value)
            elif subject_name == 'RELATIONSHIP WITH PEERS':
                student.update(psychomotor_relationship_with_peers=value)
            elif subject_name == 'WILLINGNESS TO LEARN':
                student.update(psychomotor_willingness_to_learn=value)
            elif subject_name == 'SPIRIT OF TEAMWORK':
                student.update(psychomotor_spirit_of_teamwork=value)
            elif subject_name == 'HEALTH':
                student.update(psychomotor_health=value)
            elif subject_name == 'VERBAL SKILLS':
                student.update(psychomotor_verbal_skill=value)
            elif subject_name == 'PARTICIPATION IN GAMES & SPORTS':
                student.update(psychomotor_participation_in_games_and_sports=value)
            elif subject_name == 'ARTISTIC CREATIVITY':
                student.update(psychomotor_artistic_creativity=value)
            elif subject_name == 'MUSICAL SKILLS':
                student.update(psychomotor_musical_skills=value)
            elif subject_name == 'DANCE SKILLS':
                student.update(psychomotor_dance_skills=value)
        return HttpResponse('done')
    else:
        return redirect('/')


@login_required(login_url='login_url')
def psyc_list(request):
    session_name = request.POST.get('session_name')
    section_name = request.POST.get('section_name')
    class_name = request.POST.get('class_name')
    subject_name = request.POST.get('subject_name')
    term_name = request.POST.get('term_name')

    if request.method == 'POST':
        if section_name == 'PRIMARY SECTION':
            if term_name == 'FIRST TERM':
                teacher_comment = list(
                    prim_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'teacher_comment'
                    ).order_by('full_name')
                )
                head_teacher_comment = list(
                    prim_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'headteacher_comment'
                    ).order_by('full_name')
                )
                stud_name = list(
                    prim_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'full_name'
                    ).order_by('full_name')
                )
                identity = list(
                    prim_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'id'
                    ).order_by('full_name')
                )
                average = list(
                    prim_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'totl_average'
                    ).order_by('full_name')
                )
            elif term_name == 'SECOND TERM':
                teacher_comment = list(
                    prim_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'teacher_comment'
                    ).order_by('full_name')
                )
                head_teacher_comment = list(
                    prim_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'headteacher_comment'
                    ).order_by('full_name')
                )
                stud_name = list(
                    prim_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'full_name'
                    ).order_by('full_name')
                )
                identity = list(
                    prim_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'id'
                    ).order_by('full_name')
                )
                average = list(
                    prim_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'totl_average'
                    ).order_by('full_name')
                )
            elif term_name == 'THIRD TERM':
                teacher_comment = list(
                    prim_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'teacher_comment'
                    ).order_by('full_name')
                )
                head_teacher_comment = list(
                    prim_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'headteacher_comment'
                    ).order_by('full_name')
                )
                stud_name = list(
                    prim_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'full_name'
                    ).order_by('full_name')
                )
                identity = list(
                    prim_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'id'
                    ).order_by('full_name')
                )
                average = list(
                    prim_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'totl_average'
                    ).order_by('full_name')
                )
        elif section_name == 'NURSERY SECTION':
            if term_name == 'FIRST TERM':
                teacher_comment = list(
                    nur_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'teacher_comment'
                    ).order_by('full_name')
                )
                head_teacher_comment = list(
                    nur_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'headteacher_comment'
                    ).order_by('full_name')
                )
                stud_name = list(
                    nur_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'full_name'
                    ).order_by('full_name')
                )
                identity = list(
                    nur_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'id'
                    ).order_by('full_name')
                )
                average = list(nur_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'id'
                    ).order_by('full_name'))
            elif term_name == 'SECOND TERM':
                teacher_comment = list(
                    nur_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'teacher_comment'
                    ).order_by('full_name')
                )
                head_teacher_comment = list(
                    nur_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'headteacher_comment'
                    ).order_by('full_name')
                )
                stud_name = list(
                    nur_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'full_name'
                    ).order_by('full_name')
                )
                identity = list(
                    nur_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'id'
                    ).order_by('full_name')
                )
                average = list(nur_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'id'
                    ).order_by('full_name'))
            elif term_name == 'THIRD TERM':
                teacher_comment = list(
                    nur_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'teacher_comment'
                    ).order_by('full_name')
                )
                head_teacher_comment = list(
                    nur_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'headteacher_comment'
                    ).order_by('full_name')
                )
                stud_name = list(
                    nur_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'full_name'
                    ).order_by('full_name')
                )
                identity = list(
                    nur_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'id'
                    ).order_by('full_name')
                )
                average = list(nur_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values(
                        'id'
                    ).order_by('full_name'))
        return JsonResponse({
            'teacher_comment':teacher_comment,
            'head_teacher_comment':head_teacher_comment,
            'stud_name':stud_name,
            'identity':identity,
            'average':average,
        }, status=200)
    else:
        return redirect('/')

    

@login_required(login_url='login_url')
def comment_submit(request, id):
    session_name = request.POST.get('session_name')
    section_name = request.POST.get('section_name')
    class_name = request.POST.get('class_name')
    term_name = request.POST.get('term_name')
    teacher_comment = request.POST.get('teacher_comment')
    head_teacher_comment = request.POST.get('head_teacher_comment')

    if request.method == 'POST':
        if section_name == 'PRIMARY SECTION':
            if term_name == 'FIRST TERM':
                student = prim_first_result.objects.filter(id=id)
                student.update(
                    headteacher_comment=head_teacher_comment,
                    teacher_comment=teacher_comment,
                )
            elif term_name == 'SECOND TERM':
                student = prim_second_result.objects.filter(id=id)
                student.update(
                    headteacher_comment=head_teacher_comment,
                    teacher_comment=teacher_comment,
                )
            elif term_name == 'THIRD TERM':
                student = prim_third_result.objects.filter(id=id)
                student.update(
                    headteacher_comment=head_teacher_comment,
                    teacher_comment=teacher_comment,
                )
        elif section_name == 'NURSERY SECTION':
            if term_name == 'FIRST TERM':
                student = nur_first_result.objects.filter(id=id)
                student.update(
                    headteacher_comment=head_teacher_comment,
                    teacher_comment=teacher_comment,
                )
            elif term_name == 'SECOND TERM':
                student = nur_second_result.objects.filter(id=id)
                student.update(
                    headteacher_comment=head_teacher_comment,
                    teacher_comment=teacher_comment,
                )
            elif term_name == 'THIRD TERM':
                student = nur_third_result.objects.filter(id=id)
                student.update(
                    headteacher_comment=head_teacher_comment,
                    teacher_comment=teacher_comment,
                )
        return HttpResponse('done')
    else:
        return redirect('/')



@login_required(login_url='login_url')
def update_studentdetails(request):
    session_name = request.POST.get('session_name')
    section_name = request.POST.get('section_name')
    class_name = request.POST.get('class_name')

    if request.method == 'POST':
        identity = list(
                    MyUser.objects.filter(Session=school_sessions.objects.get(session_name=session_name), Section=section_name, Class=class_name).values(
                        'id'
                    ).order_by('full_name')
                )
        stud_name = list(
                    MyUser.objects.filter(Session=school_sessions.objects.get(session_name=session_name), Section=section_name, Class=class_name).values(
                        'full_name'
                    ).order_by('full_name')
                )
        return JsonResponse({
            'identity':identity,
            'stud_name':stud_name,
        }, status=200)
    else:
        return redirect('/')

@login_required(login_url='login_url')
def edit_studentdetails(request, id):


    student2 = MyUser.objects.get(id=id)
    context = {'stud':student2}
    return render(request, 'dashboards/edit_student_details.html', context)
    

@login_required(login_url='login_url')
def stud_result_list(request):
    session_name = request.POST.get('session_name')
    section_name = request.POST.get('section_name')
    class_name = request.POST.get('class_name')
    term_name = request.POST.get('term_name')

    if request.method == 'POST':
        if section_name == 'NURSERY SECTION':
            if term_name == 'FIRST TERM':
                stud_name = list(nur_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name').order_by('full_name'))
                identity = list(nur_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('id').order_by('full_name'))
            elif term_name == 'SECOND TERM':
                stud_name = list(nur_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name').order_by('full_name'))
                identity = list(nur_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('id').order_by('full_name'))
            elif term_name == 'THIRD TERM':
                stud_name = list(nur_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name').order_by('full_name'))
                identity = list(nur_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('id').order_by('full_name'))
        elif section_name == 'PRIMARY SECTION':
            if term_name == 'FIRST TERM':
                stud_name = list(prim_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name').order_by('full_name'))
                identity = list(prim_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('id').order_by('full_name'))
            elif term_name == 'SECOND TERM':
                stud_name = list(prim_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name').order_by('full_name'))
                identity = list(prim_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('id').order_by('full_name'))
            elif term_name == 'THIRD TERM':
                stud_name = list(prim_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name').order_by('full_name'))
                identity = list(prim_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('id').order_by('full_name'))
        return JsonResponse({'stud_name':stud_name, 'identity':identity}, status=200)
    else:
        return redirect('/')


@login_required(login_url='login_url')
def stud_result_list2(request):
    session_name = request.POST.get('session_name')
    section_name = request.POST.get('section_name')
    class_name = request.POST.get('class_name')
    term_name = request.POST.get('term_name')

    if request.method == 'POST':
        if section_name == 'NURSERY SECTION':
            if term_name == 'FIRST TERM':
                stud_name = list(nur_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name', 'admission_no').order_by('full_name'))
            elif term_name == 'SECOND TERM':
                stud_name = list(nur_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name', 'admission_no').order_by('full_name'))
            elif term_name == 'THIRD TERM':
                stud_name = list(nur_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name', 'admission_no').order_by('full_name'))
        elif section_name == 'PRIMARY SECTION':
            if term_name == 'FIRST TERM':
                stud_name = list(prim_first_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name', 'admission_no').order_by('full_name'))
            elif term_name == 'SECOND TERM':
                stud_name = list(prim_second_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name', 'admission_no').order_by('full_name'))
            elif term_name == 'THIRD TERM':
                stud_name = list(prim_third_result.objects.filter(session_name=session_name, section_name=section_name, class_name=class_name).values('full_name', 'admission_no').order_by('full_name'))
        return JsonResponse({'stud_name':stud_name}, status=200)
    else:
        return redirect('/')

def generatepdf_nur(request, id, *args, **kwargs):
    session_1 = kwargs.get('one')
    session_2 = kwargs.get('two')
    section = kwargs.get('three')
    clas = kwargs.get('four')
    term = kwargs.get('five')
    session_value = str(session_1) + '/' + str(session_2)

    if term == 'FIRST TERM':
        student = nur_first_result.objects.get(id=id)
        termm = 'NOEL TERM'
    elif term == 'SECOND TERM':
        student = nur_second_result.objects.get(id=id)
        termm = 'CALVARY TERM'
    elif term == 'THIRD TERM':
        student = nur_third_result.objects.get(id=id)
        termm = 'SUMMER TERM'
    passport = student.passport.url
    admission_no = student.admission_no
    name = student.full_name
    gender = student.gender
    teacher_comment = student.teacher_comment
    head_teacher_comment = student.headteacher_comment
    literacy1 = student.literacy_question_1
    literacy2 = student.literacy_question_2
    literacy3 = student.literacy_question_3
    literacy4 = student.literacy_question_4
    literacy5 = student.literacy_question_5
    literacy6 = student.literacy_question_6
    literacy7 = student.literacy_question_7
    literacy8 = student.literacy_question_8

    writing1 = student.writing_skills_question_1
    writing2 = student.writing_skills_question_2
    writing3 = student.writing_skills_question_3
    writing4 = student.writing_skills_question_4

    numeracy1 = student.numeracy_question_1
    numeracy2 = student.numeracy_question_2
    numeracy3 = student.numeracy_question_3
    numeracy4 = student.numeracy_question_4
    numeracy5 = student.numeracy_question_5

    social1 = student.social_skills_question_1 
    social2 = student.social_skills_question_2 
    social3 = student.social_skills_question_3 
    social4 = student.social_skills_question_4 
    social5 = student.social_skills_question_5 
    social6 = student.social_skills_question_6 
    social7 = student.social_skills_question_7 
    social8 = student.social_skills_question_8 
    social9 = student.social_skills_question_9 
    social10 = student.social_skills_question_10
    social11 = student.social_skills_question_11
    social12 = student.social_skills_question_12
    
    fine1 = student.fine_motor_skills_question_1
    fine2 = student.fine_motor_skills_question_2
    fine3 = student.fine_motor_skills_question_3
    fine4 = student.fine_motor_skills_question_4
    fine5 = student.fine_motor_skills_question_5
    fine6 = student.fine_motor_skills_question_6
    fine7 = student.fine_motor_skills_question_7
    fine8 = student.fine_motor_skills_question_8
    
    emotion1 = student.emotional_skills_question_1
    emotion2 = student.emotional_skills_question_2
    emotion3 = student.emotional_skills_question_3
    emotion4 = student.emotional_skills_question_4
    
    music1 = student.Rhymes_and_songs_question_1
    music2 = student.Rhymes_and_songs_question_2
    music3 = student.Rhymes_and_songs_question_3
    music4 = student.Rhymes_and_songs_question_4
    music5 = student.Rhymes_and_songs_question_5

    ict1 = student.information_and_communication_technology_question_1
    ict2 = student.information_and_communication_technology_question_2
    ict3 = student.information_and_communication_technology_question_3
    
    gross1 = student.gross_motor_skills_question_1
    gross2 = student.gross_motor_skills_question_2
    gross3 = student.gross_motor_skills_question_3

    numeracyinput1 = student.numeracy_first_question_first_input
    numeracyinput2 = student.numeracy_first_question_end_input
    numeracyinput3 = student.numeracy_second_question_first_input
    numeracyinput4 = student.numeracy_second_question_end_input
    numeracyinput5 = student.numeracy_third_question_input
    numeracyinput6 = student.numeracy_fourth_question_input
    numeracyinput7 = student.numeracy_fifth_question_first_input
    numeracyinput8 = student.numeracy_fifth_question_end_input

    writinginput1 = student.writing_skills_first_question_first_input
    writinginput2 = student.writing_skills_first_question_end_input
    writinginput3 = student.writing_skills_second_question_first_input
    writinginput4 = student.writing_skills_second_question_end_input

    # Create a file-like buffer to receive PDF data.
    buffer = io.BytesIO()
    # Create the PDF object, using the buffer as its "file."
    p = canvas.Canvas(buffer)
    # Draw things on the PDF. Here's where the PDF generation happens.
    # See the ReportLab documentation for the full list of functionality.
    p.setPageSize(portrait(A4))
    p.drawString(100, 100, "Hello world.")
    p.drawImage("static/img/Asset 4.png", 0,0, width=8.3*inch, height=11.7*inch, anchor='c') 
    p.drawImage("static/img/Asset 15.png", 187,735, width=345, height=85, anchor='c') 
    p.drawImage("static/" + str(passport), 78,687, width=102, height=130, anchor='c')
    p.setLineWidth(1.4)
    p.setLineCap(1)
    p.rect(78,687, width=102, height=130, stroke=1, fill=0)
    pdfmetrics.registerFont(TTFont('Calibri', 'static/img/Calibri Bold.TTF'))
    pdfmetrics.registerFont(TTFont('Comic-sans', 'static/img/comicv.ttf'))
    pdfmetrics.registerFont(TTFont('scriptt', 'static/img/edwardian.ttf'))
    pdfmetrics.registerFont(TTFont('Comic-sans2', 'static/img/comic (2).ttf'))
    pdfmetrics.registerFont(TTFont('CALIBRI', 'static/img/CALIBRIZ.TTF'))
    p.setFont('Calibri', 15)
    p.drawString(187, 718, termm + " PROGRESS REPORT " + "(" + session_value + ")")
    p.setFont('Courier-Bold', 15)
    p.drawString(187, 697, "* " + admission_no)
    p.setFont('Calibri', 13)
    p.drawString(338, 697, "CLASS: ")
    p.setFont('Comic-sans', 11)
    p.drawString(378, 697, clas)
    p.setFont('scriptt', 26)
    p.drawString(60, 664, name)
    textwidth = stringWidth(name, "scriptt", 26)
    p.line(60,661,textwidth + 60,661)
    p.setFont('Calibri', 13)
    p.drawString(340, 665, "AGE: ")
    p.drawString(440, 665, "GENDER: ")
    p.setFont('Comic-sans', 13)
    p.drawString(500, 665, gender)
    p.setLineWidth(0.001)
    p.setLineCap(1)
    p.line(23,654,573,654)
    p.line(23,652,573,652)
    p.grid([23, 245, 288], [513, 528, 543, 558, 573, 588, 603, 618, 633, 649])
    p.grid([308, 530, 573], [513, 528, 543, 558, 573, 588, 603, 618, 633, 649])
    p.grid([23, 245, 288], [430, 445, 460, 475, 490, 506])
    p.grid([308, 530, 573], [430, 445, 460, 475, 490, 506])
    p.grid([23, 245, 288], [332, 347, 362, 377, 392, 407, 423])
    p.grid([308, 530, 573], [332, 347, 362, 377, 392, 407, 423])
    p.grid([23, 245, 288], [129, 144, 159, 174, 189, 204, 219, 234, 249, 264, 279, 294, 309, 325])
    p.grid([308, 530, 573], [264, 279, 294, 309, 325])
    p.grid([308, 530, 573], [197, 212, 227, 242, 257])
    p.setLineWidth(2)
    p.roundRect(308,129, 265, 64, 10)
    p.setLineWidth(0.001)
    p.line(23,126,573,126)
    p.line(23,124,573,124)
    p.setLineWidth(2)
    p.roundRect(23,10, 131, 110, 10)
    p.roundRect(159,10, 413, 110, 10)
    p.setFont('Comic-sans', 12)

    p.setFillColor(HexColor(0x055C9D))
    p.setStrokeColor(HexColor(0x055C9D))
    p.drawString(26, 637, "LITERACY")
    textwidth2 = stringWidth("LITERACY", "Comic-sans", 12)
    p.setLineWidth(0.7)
    p.line(26,635, textwidth2 + 27, 635)

    p.setFillColor(HexColor(0xFF4500))
    p.setStrokeColor(HexColor(0xFF4500))
    p.drawString(26, 494, "WRITING SKILLS")
    textwidth3 = stringWidth("WRITING SKILLS", "Comic-sans", 12)
    p.setLineWidth(0.7)
    p.line(26,492, textwidth3 + 27, 492)

    p.setFillColor(HexColor(0x008000))
    p.setStrokeColor(HexColor(0x008000))
    p.drawString(26, 411, "NUMERACY")
    textwidth4 = stringWidth("NUMERACY", "Comic-sans", 12)
    p.setLineWidth(0.7)
    p.line(26,409, textwidth4 + 27, 409)

    p.setFillColor(HexColor(0xFF1493))
    p.setStrokeColor(HexColor(0xFF1493))
    p.drawString(26, 313, "SOCIAL SKILLS")
    textwidth5 = stringWidth("SOCIAL SKILLS", "Comic-sans", 12)
    p.setLineWidth(0.7)
    p.line(26,311, textwidth5 + 27, 311)

    p.setFillColor(HexColor(0x008000))
    p.setStrokeColor(HexColor(0x008000))
    p.drawString(311, 637, "FINE MOTOR SKILLS")
    textwidth6 = stringWidth("FINE MOTOR SKILLS", "Comic-sans", 12)
    p.setLineWidth(0.7)
    p.line(311,635, textwidth6 + 312, 635)

    p.setFillColor(HexColor(0xFFA500))
    p.setStrokeColor(HexColor(0xFFA500))
    p.drawString(311, 494, "EMOTIONAL SKILLS")
    textwidth7 = stringWidth("EMOTIONAL SKILLS", "Comic-sans", 12)
    p.setLineWidth(0.7)
    p.line(311,492, textwidth7 + 312, 492)

    p.setFillColor(HexColor(0xFF1493))
    p.setStrokeColor(HexColor(0xFF1493))
    p.drawString(311, 411, "RHYMES AND SONGS (MUSIC)")
    textwidth8 = stringWidth("RHYMES AND SONGS (MUSIC)", "Comic-sans", 12)
    p.setLineWidth(0.7)
    p.line(311,409, textwidth8 + 312, 409)

    p.setFillColor(HexColor(0x055C9D))
    p.setStrokeColor(HexColor(0x055C9D))
    p.drawString(311, 313, "ICT SKILLS (COMPUTER)")
    textwidth9 = stringWidth("ICT SKILLS (COMPUTER)", "Comic-sans", 12)
    p.setLineWidth(0.7)
    p.line(311,311, textwidth9 + 312, 311)

    p.setFillColor(HexColor(0x008000))
    p.setStrokeColor(HexColor(0x008000))
    p.drawString(311, 246, "GROSS MOTOR SKILLS")
    textwidth10 = stringWidth("GROSS MOTOR SKILLS", "Comic-sans", 12)
    p.setLineWidth(0.7)
    p.line(311,244, textwidth10 + 312, 244)

    p.setFont('Comic-sans', 10)
    p.setFillColor(HexColor(0x000000))
    p.setStrokeColor(HexColor(0x000000))
    p.drawString(249, 636, "GRADE")
    p.drawString(534, 636, "GRADE")
    p.drawString(249, 493, "GRADE")
    p.drawString(534, 493, "GRADE")
    p.drawString(249, 410, "GRADE")
    p.drawString(534, 410, "GRADE")
    p.drawString(249, 312, "GRADE")
    p.drawString(534, 312, "GRADE")
    p.drawString(534, 245, "GRADE")

    p.setFont('Comic-sans2', 8.7)
    p.drawString(26, 621, "I listen quitely to stories")
    p.drawString(26, 606, "My attention span is lengthening")
    p.drawString(26, 591, "I respond to a story by recalling specific details")
    p.drawString(26, 576, "I speak clearly and communicate in sentence")
    p.drawString(26, 561, "I speak clearly and communicate my wants and ideas")
    p.drawString(26, 546, "I can answer some questions")
    p.drawString(26, 531, "I talk about pictures")
    p.drawString(26, 516, "I am expanding my vocabulary")

    p.drawString(311, 621, "I can construct a cube tower")
    p.drawString(311, 606, "I can paint")
    p.drawString(311, 591, "I can paste and glue")
    p.drawString(311, 576, "I finish what I start")
    p.drawString(311, 561, "I can thread large beads/buttons together")
    p.drawString(311, 546, "I can fix objects(puzzles)")
    p.drawString(311, 531, "I can lace objects")
    p.drawString(311, 516, "I can use scissors")

    p.drawString(26, 478, "I can recognize beginning letter sounds " + writinginput1 + " to " + writinginput2)
    p.drawString(26, 463, "T can sound and write letter sounds " + writinginput3 + " to " + writinginput4)
    p.drawString(26, 448, "I can sound and recognize diagrams")
    p.drawString(26, 433, "I can blend two letter words")

    p.drawString(311, 478, "I respect and show concern for people around me")
    p.drawString(311, 463, "I accept and respond to my teacher's authority")
    p.drawString(311, 448, "I play and share with other children")
    p.drawString(311, 433, "I am happy and cheerful at school")
 
    p.drawString(26, 395, "I can count orally numbers " + numeracyinput1 + " to " + numeracyinput2)
    p.drawString(26, 380, "I can recognize and write numbers " + numeracyinput3 + " to " + numeracyinput4)
    p.drawString(26, 365, "I can recognize these shapes (" + numeracyinput5 + ")")
    p.drawString(26, 350, "I can recognize these colours (" + numeracyinput6 + ")")
    p.drawString(26, 335, "I can put together numbers " + numeracyinput7 + " to " + numeracyinput8)

    p.drawString(311, 395, "I can enjoy music")
    p.drawString(311, 380, "I can sing and say rhymes")
    p.drawString(311, 365, "I participate in group songs and rhymes")
    p.drawString(311, 350, "I respond to rhythmic patterns")
    p.drawString(311, 335, "I enjoy demonstrating rhymes and songs")

    p.drawString(26, 297, "I share my toy")
    p.drawString(26, 282, "I drink without spilling")
    p.drawString(26, 267, "I hold spoon, food gets to my mouth")
    p.drawString(26, 252, "I take care of things")
    p.drawString(26, 237, "I am happy at work")
    p.drawString(26, 222, "I am happy at play")
    p.drawString(26, 207, "I play with others")
    p.drawString(26, 192, "I use toilet with/without help")
    p.drawString(26, 177, "I help tidy up")
    p.drawString(26, 162, "I follow simple instructions")
    p.drawString(26, 147, "I don't fight, snatch or throw things")
    p.drawString(26, 132, "I don't shout or scream")

    p.drawString(311, 297, "I can identify the keyboard")
    p.drawString(311, 282, "I can match computer parts and their names")
    p.drawString(311, 267, "I can press the keys on the keyboard normally")

    p.drawString(311, 230, "I can co-ordinate my body movements")
    p.drawString(311, 215, "I like outdoor play")
    p.drawString(311, 200, "I dance and play games")

    p.setFont('Calibri', 10)
    p.setLineWidth(0.7)
    p.drawString(320, 180, "Vacation Date:")
    p.drawString(320, 166, "Resumption Date:")
    p.drawString(315, 152, "NUMBER OF TIMES SCHOOL OPENED:")
    p.drawString(315, 136, "NO. OF TIMES PRESENT:")
    p.drawString(447, 136, "NO. OF TIMES ABSENT:")

    p.setFont('Courier-Bold', 12)
    p.setFillColor(blue)
    p.drawString(385,180, "15th Dec., 2023")
    p.drawString(398,166, "8th Jan., 2024")
    p.drawString(474,152, "120")
    p.line(417,136, 444, 136)
    p.line(544,136, 569, 136)

    p.setFillColor(HexColor(0xFF4500))
    p.setStrokeColor(HexColor(0xFF4500))
    p.setFont('Calibri', 12)
    p.drawString(28, 106, "KEY TO RATINGS:")
    textwidth11 = stringWidth("KEY TO RATINGS:", "Calibri", 12)
    p.setLineWidth(0.7)
    p.line(28,104, textwidth11 + 28, 104)

    p.setFillColor(HexColor(0x000000))
    p.setStrokeColor(HexColor(0x000000))
    p.setFont('CALIBRI', 9.3)
    p.drawString(28, 88, "A = HONOUR ROLL  - 90 - 100%")
    p.drawString(28, 68, "B = SUPER EFFORT  - 70 - 89%")
    p.drawString(28, 48, "C = IMPROVING     - 50 - 69%")
    p.drawString(28, 28, "D = WORKING AT IT  - 40 - 49%")

    p.setLineWidth(0.1)
    p.line(366,120,366,10)

    p.setFont('Calibri', 9)
    p.drawString(164, 108, "TEACHER'S COMMENT:")
    textwidth12 = stringWidth("TEACHER'S COMMENT:", "Calibri", 9)
    p.setLineWidth(0.7)
    p.line(164,106, textwidth12 + 164, 106)

    p.drawString(369, 108, "HEAD TEACHER'S COMMENT:")
    textwidth13 = stringWidth("HEAD TEACHER'S COMMENT:", "Calibri", 9)
    p.setLineWidth(0.7)
    p.line(369,106, textwidth13 + 369, 106)

    style = getSampleStyleSheet()
    mystyle = ParagraphStyle('mytitle', fontName="CALIBRI", fontSize=11, parent=None, textColor=blue)

    teachers_comment = []
    head_teachers_comment = []
    
    teachers_comment.append(Paragraph(teacher_comment, mystyle))
    head_teachers_comment.append(Paragraph(head_teacher_comment, mystyle))
    f1 = Frame(164, 30, 200, 75, showBoundary=0, topPadding=0, leftPadding=0, bottomPadding=0, rightPadding=0)
    f2 = Frame(369, 30, 200, 75, showBoundary=0, topPadding=0, leftPadding=0, bottomPadding=0, rightPadding=0)
    f1.addFromList(teachers_comment,p)
    f2.addFromList(head_teachers_comment,p)

    p.setFont('Calibri', 9)
    p.drawString(369, 20, "SIGNATURE:")
    p.drawString(164, 20, "SIGNATURE:")

    p.setFont('Comic-sans2', 9)
    p.drawString(262, 621, literacy1)
    p.drawString(262, 606, literacy2)
    p.drawString(262, 591, literacy3)
    p.drawString(262, 576, literacy4)
    p.drawString(262, 561, literacy5)
    p.drawString(262, 546, literacy6)
    p.drawString(262, 531, literacy7)
    p.drawString(262, 516, literacy8)

    p.drawString(262, 478, writing1)
    p.drawString(262, 463, writing2)
    p.drawString(262, 448, writing3)
    p.drawString(262, 433, writing4)

    p.drawString(262, 395, numeracy1)
    p.drawString(262, 380, numeracy2)
    p.drawString(262, 365, numeracy3)
    p.drawString(262, 350, numeracy4)
    p.drawString(262, 335, numeracy5)

    p.drawString(262, 297, social1)
    p.drawString(262, 282, social2)
    p.drawString(262, 267, social3)
    p.drawString(262, 252, social4)
    p.drawString(262, 237, social5)
    p.drawString(262, 222, social6)
    p.drawString(262, 207, social7)
    p.drawString(262, 192, social8)
    p.drawString(262, 177, social9)
    p.drawString(262, 162, social10)
    p.drawString(262, 147, social11)
    p.drawString(262, 132, social12)

    p.drawString(547, 621, fine1)
    p.drawString(547, 606, fine2)
    p.drawString(547, 591, fine3)
    p.drawString(547, 576, fine4)
    p.drawString(547, 561, fine5)
    p.drawString(547, 546, fine6)
    p.drawString(547, 531, fine7)
    p.drawString(547, 516, fine8)

    p.drawString(547, 478, emotion1)
    p.drawString(547, 463, emotion2)
    p.drawString(547, 448, emotion3)
    p.drawString(547, 433, emotion4)

    p.drawString(547, 395, music1)
    p.drawString(547, 380, music2)
    p.drawString(547, 365, music3)
    p.drawString(547, 350, music4)
    p.drawString(547, 335, music5)

    p.drawString(547, 297, ict1)
    p.drawString(547, 282, ict2)
    p.drawString(547, 267, ict3)

    p.drawString(547, 230, gross1)
    p.drawString(547, 215, gross2)
    p.drawString(547, 200, gross3)


    #  Close the PDF object cleanly, and we're done.
    p.showPage()
    p.save()
    # FileResponse sets the Content-Disposition header so that browsers
    # present the option to save the file.

    buffer.seek(0)
    return FileResponse(buffer, filename= name + '.pdf')



def generatepdf_prim(request, id, *args, **kwargs):

    session_1 = kwargs.get('one')
    session_2 = kwargs.get('two')
    section = kwargs.get('three')
    clas = kwargs.get('four')
    term = kwargs.get('five')
    session_value = str(session_1) + '/' + str(session_2)

    if term == 'FIRST TERM':
        student = prim_first_result.objects.get(id=id)
        numeracy_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('numeracy_total').order_by('numeracy_total'))[::-1]
        quantitative_reasoning_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('quantitative_reasoning_total').order_by('quantitative_reasoning_total'))[::-1]
        literacy_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('literacy_total').order_by('literacy_total'))[::-1]
        verbal_reasoning_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('verbal_reasoning_total').order_by('verbal_reasoning_total'))[::-1]
        science_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('science_total').order_by('science_total'))[::-1]
        computer_studies_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('computer_studies_total').order_by('computer_studies_total'))[::-1]
        vocational_studies_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('vocational_studies_total').order_by('vocational_studies_total'))[::-1]
        social_studies_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('social_studies_total').order_by('social_studies_total'))[::-1]
        history_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('history_total').order_by('history_total'))[::-1]
        geography_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('geography_total').order_by('geography_total'))[::-1]
        citizenship_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('citizenship_total').order_by('citizenship_total'))[::-1]
        home_economics_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('home_economics_total').order_by('home_economics_total'))[::-1]
        music_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('music_total').order_by('music_total'))[::-1]
        french_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('french_total').order_by('french_total'))[::-1]
        creative_art_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('creative_art_total').order_by('creative_art_total'))[::-1]
        physical_and_health_education_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('physical_and_health_education_total').order_by('physical_and_health_education_total'))[::-1]
        christian_religious_knowledge_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('christian_religious_knowledge_total').order_by('christian_religious_knowledge_total'))[::-1]
        moral_instruction_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('moral_instruction_total').order_by('moral_instruction_total'))[::-1]
        yoruba_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('yoruba_total').order_by('yoruba_total'))[::-1]
        agricultural_science_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('agricultural_science_total').order_by('agricultural_science_total'))[::-1]
        ict_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('ict_total').order_by('ict_total'))[::-1]
        chess_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('chess_total').order_by('chess_total'))[::-1]
        scrabble_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('scrabble_total').order_by('scrabble_total'))[::-1]
        spelling_bee_scoress = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('spelling_bee_total').order_by('spelling_bee_total'))[::-1]
        termm = 'NOEL TERM'
        class_list = list(prim_first_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values())
        class_list2 = len(class_list)
    elif term == 'SECOND TERM':
        student = prim_second_result.objects.get(id=id)
        numeracy_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('numeracy_total').order_by('numeracy_total'))[::-1]
        quantitative_reasoning_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('quantitative_reasoning_total').order_by('quantitative_reasoning_total'))[::-1]
        literacy_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('literacy_total').order_by('literacy_total'))[::-1]
        verbal_reasoning_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('verbal_reasoning_total').order_by('verbal_reasoning_total'))[::-1]
        science_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('science_total').order_by('science_total'))[::-1]
        computer_studies_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('computer_studies_total').order_by('computer_studies_total'))[::-1]
        vocational_studies_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('vocational_studies_total').order_by('vocational_studies_total'))[::-1]
        social_studies_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('social_studies_total').order_by('social_studies_total'))[::-1]
        history_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('history_total').order_by('history_total'))[::-1]
        geography_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('geography_total').order_by('geography_total'))[::-1]
        citizenship_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('citizenship_total').order_by('citizenship_total'))[::-1]
        home_economics_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('home_economics_total').order_by('home_economics_total'))[::-1]
        music_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('music_total').order_by('music_total'))[::-1]
        french_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('french_total').order_by('french_total'))[::-1]
        creative_art_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('creative_art_total').order_by('creative_art_total'))[::-1]
        physical_and_health_education_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('physical_and_health_education_total').order_by('physical_and_health_education_total'))[::-1]
        christian_religious_knowledge_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('christian_religious_knowledge_total').order_by('christian_religious_knowledge_total'))[::-1]
        moral_instruction_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('moral_instruction_total').order_by('moral_instruction_total'))[::-1]
        yoruba_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('yoruba_total').order_by('yoruba_total'))[::-1]
        agricultural_science_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('agricultural_science_total').order_by('agricultural_science_total'))[::-1]
        ict_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('ict_total').order_by('ict_total'))[::-1]
        chess_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('chess_total').order_by('chess_total'))[::-1]
        scrabble_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('scrabble_total').order_by('scrabble_total'))[::-1]
        spelling_bee_scoress = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('spelling_bee_total').order_by('spelling_bee_total'))[::-1]
        termm = 'CALVARY TERM'
        class_list = list(prim_second_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values())
        class_list2 = len(class_list)
    elif term == 'THIRD TERM':
        student = prim_third_result.objects.get(id=id)
        numeracy_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('numeracy_total').order_by('numeracy_total'))[::-1]
        quantitative_reasoning_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('quantitative_reasoning_total').order_by('quantitative_reasoning_total'))[::-1]
        literacy_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('literacy_total').order_by('literacy_total'))[::-1]
        verbal_reasoning_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('verbal_reasoning_total').order_by('verbal_reasoning_total'))[::-1]
        science_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('science_total').order_by('science_total'))[::-1]
        computer_studies_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('computer_studies_total').order_by('computer_studies_total'))[::-1]
        vocational_studies_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('vocational_studies_total').order_by('vocational_studies_total'))[::-1]
        social_studies_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('social_studies_total').order_by('social_studies_total'))[::-1]
        history_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('history_total').order_by('history_total'))[::-1]
        geography_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('geography_total').order_by('geography_total'))[::-1]
        citizenship_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('citizenship_total').order_by('citizenship_total'))[::-1]
        home_economics_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('home_economics_total').order_by('home_economics_total'))[::-1]
        music_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('music_total').order_by('music_total'))[::-1]
        french_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('french_total').order_by('french_total'))[::-1]
        creative_art_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('creative_art_total').order_by('creative_art_total'))[::-1]
        physical_and_health_education_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('physical_and_health_education_total').order_by('physical_and_health_education_total'))[::-1]
        christian_religious_knowledge_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('christian_religious_knowledge_total').order_by('christian_religious_knowledge_total'))[::-1]
        moral_instruction_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('moral_instruction_total').order_by('moral_instruction_total'))[::-1]
        yoruba_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('yoruba_total').order_by('yoruba_total'))[::-1]
        agricultural_science_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('agricultural_science_total').order_by('agricultural_science_total'))[::-1]
        ict_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('ict_total').order_by('ict_total'))[::-1]
        chess_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('chess_total').order_by('chess_total'))[::-1]
        scrabble_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('scrabble_total').order_by('scrabble_total'))[::-1]
        spelling_bee_scoress = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values_list('spelling_bee_total').order_by('spelling_bee_total'))[::-1]
        termm = 'SUMMER TERM'
        class_list = list(prim_third_result.objects.filter(session_name=session_value, section_name=section, class_name=clas).values())
        class_list2 = len(class_list)
    passport = student.passport.url
    admission_no = student.admission_no
    name = student.full_name
    gender = student.gender
    teacher_comment = student.teacher_comment
    head_teacher_comment = student.headteacher_comment
    subjects = list(term_subjects.objects.filter(session_name=session_value, section_name=section, class_name=clas, term_name=term).values_list("subject_name"))
    subject_length = len(subjects)
    total_marks_obt = int(subject_length) * 100


    if ('AGRICULTURAL SCIENCE',) in subjects:
        agric1 = str(student.agricultural_science_ca_1).zfill(2)
        agric2 = str(student.agricultural_science_ca_2).zfill(2)
        agric3 = str(student.agricultural_science_ca_3).zfill(2)
        agric4 = str(student.agricultural_science_ca_4).zfill(2)
        agricca = str(student.agricultural_science_ca_total).zfill(2)
        agricexam = str(student.agricultural_science_exam).zfill(2)
        agrictotal = str(student.agricultural_science_total).zfill(2)
        agricposition = str(agricultural_science_scoress.index((int(agrictotal),)) + 1).zfill(2)

        if int(agrictotal) in range(0, 40):
            agricgrade = "E"
            agricremark = "Poor"
        elif int(agrictotal) in range(40, 50): 
            agricgrade = "D"
            agricremark = "Below Average"
        elif int(agrictotal) in range(50, 70): 
            agricgrade = "C"
            agricremark = "Average"
        elif int(agrictotal) in range(70, 90): 
            agricgrade = "B"
            agricremark = "Good"
        elif int(agrictotal) in range(90, 101): 
            agricgrade = "A"
            agricremark = "Excellent"
    else:
        agric1 = ""
        agric2 = ""
        agric3 = ""
        agric4 = ""
        agricca = ""
        agricexam = ""
        agrictotal = ""
        agricposition = ""
        agricgrade = ""
        agricremark = ""

    if ('CHESS',) in subjects:
        chess1 = str(student.chess_ca_1).zfill(2)
        chess2 = str(student.chess_ca_2).zfill(2)
        chess3 = str(student.chess_ca_3).zfill(2)
        chess4 = str(student.chess_ca_4).zfill(2)
        chessca = str(student.chess_ca_total).zfill(2)
        chessexam = str(student.chess_exam).zfill(2)
        chesstotal = str(student.chess_total).zfill(2)
        chessposition = str(chess_scoress.index((int(chesstotal),)) + 1).zfill(2)

        if int(chesstotal) in range(0, 40):
            chessgrade = "E"
            chessremark = "Poor"
        elif int(chesstotal) in range(40, 50): 
            chessgrade = "D"
            chessremark = "Below Average"
        elif int(chesstotal) in range(50, 70): 
            chessgrade = "C"
            chessremark = "Average"
        elif int(chesstotal) in range(70, 90): 
            chessgrade = "B"
            chessremark = "Good"
        elif int(chesstotal) in range(90, 101): 
            chessgrade = "A"
            chessremark = "Excellent"
    else:
        chess1 = ""
        chess2 = ""
        chess3 = ""
        chess4 = ""
        chessca = ""
        chessexam = ""
        chesstotal = ""
        chessposition = ""
        chessgrade = ""
        chessremark = ""

    if ('CHRISTIAN RELIGIOUS KNOWLEDGE',) in subjects:
        christian1 = str(student.christian_religious_knowledge_ca_1).zfill(2)
        christian2 = str(student.christian_religious_knowledge_ca_2).zfill(2)
        christian3 = str(student.christian_religious_knowledge_ca_3).zfill(2)
        christian4 = str(student.christian_religious_knowledge_ca_4).zfill(2)
        christianca = str(student.christian_religious_knowledge_ca_total).zfill(2)
        christianexam = str(student.christian_religious_knowledge_exam).zfill(2)
        christiantotal = str(student.christian_religious_knowledge_total).zfill(2)
        christianposition = str(christian_religious_knowledge_scoress.index((int(christiantotal),)) + 1).zfill(2)

        if int(christiantotal) in range(0, 40):
            christiangrade = "E"
            christianremark = "Poor"
        elif int(christiantotal) in range(40, 50): 
            christiangrade = "D"
            christianremark = "Below Average"
        elif int(christiantotal) in range(50, 70): 
            christiangrade = "C"
            christianremark = "Average"
        elif int(christiantotal) in range(70, 90): 
            christiangrade = "B"
            christianremark = "Good"
        elif int(christiantotal) in range(90, 101): 
            christiangrade = "A"
            christianremark = "Excellent"
    else:
        christian1 = ""
        christian2 = ""
        christian3 = ""
        christian4 = ""
        christianca = ""
        christianexam = ""
        christiantotal = ""
        christianposition = ""
        christiangrade = ""
        christianremark = ""

    if ('CITIZENSHIP',) in subjects:
        citizenship1 = str(student.citizenship_ca_1).zfill(2)
        citizenship2 = str(student.citizenship_ca_2).zfill(2)
        citizenship3 = str(student.citizenship_ca_3).zfill(2)
        citizenship4 = str(student.citizenship_ca_4).zfill(2)
        citizenshipca = str(student.citizenship_ca_total).zfill(2)
        citizenshipexam = str(student.citizenship_exam).zfill(2)
        citizenshiptotal = str(student.citizenship_total).zfill(2)
        citizenshipposition = str(citizenship_scoress.index((int(citizenshiptotal),)) + 1).zfill(2)

        if int(citizenshiptotal) in range(0, 40):
            citizenshipgrade = "E"
            citizenshipremark = "Poor"
        elif int(citizenshiptotal) in range(40, 50): 
            citizenshipgrade = "D"
            citizenshipremark = "Below Average"
        elif int(citizenshiptotal) in range(50, 70): 
            citizenshipgrade = "C"
            citizenshipremark = "Average"
        elif int(citizenshiptotal) in range(70, 90): 
            citizenshipgrade = "B"
            citizenshipremark = "Good"
        elif int(citizenshiptotal) in range(90, 101): 
            citizenshipgrade = "A"
            citizenshipremark = "Excellent"
    else:
        citizenship1 = ""
        citizenship2 = ""
        citizenship3 = ""
        citizenship4 = ""
        citizenshipca = ""
        citizenshipexam = ""
        citizenshiptotal = ""
        citizenshipposition = ""
        citizenshipgrade = ""
        citizenshipremark = ""

    if ('COMPUTER STUDIES',) in subjects:
        computer1 = str(student.computer_studies_ca_1).zfill(2)
        computer2 = str(student.computer_studies_ca_2).zfill(2)
        computer3 = str(student.computer_studies_ca_3).zfill(2)
        computer4 = str(student.computer_studies_ca_4).zfill(2)
        computerca = str(student.computer_studies_ca_total).zfill(2)
        computerexam = str(student.computer_studies_exam).zfill(2)
        computertotal = str(student.computer_studies_total).zfill(2)
        computerposition = str(computer_studies_scoress.index((int(computertotal),)) + 1).zfill(2)

        if int(computertotal) in range(0, 40):
            computergrade = "E"
            computerremark = "Poor"
        elif int(computertotal) in range(40, 50): 
            computergrade = "D"
            computerremark = "Below Average"
        elif int(computertotal) in range(50, 70): 
            computergrade = "C"
            computerremark = "Average"
        elif int(computertotal) in range(70, 90): 
            computergrade = "B"
            computerremark = "Good"
        elif int(computertotal) in range(90, 101): 
            computergrade = "A"
            computerremark = "Excellent"
    else:
        computer1 = ""
        computer2 = ""
        computer3 = ""
        computer4 = ""
        computerca = ""
        computerexam = ""
        computertotal = ""
        computerposition = ""
        computergrade = ""
        computerremark = ""

    if ('CREATIVE ART',) in subjects:
        art1 = str(student.creative_art_ca_1).zfill(2)
        art2 = str(student.creative_art_ca_2).zfill(2)
        art3 = str(student.creative_art_ca_3).zfill(2)
        art4 = str(student.creative_art_ca_4).zfill(2)
        artca = str(student.creative_art_ca_total).zfill(2)
        artexam = str(student.creative_art_exam).zfill(2)
        arttotal = str(student.creative_art_total).zfill(2)
        artposition = str(creative_art_scoress.index((int(arttotal),)) + 1).zfill(2)

        if int(arttotal) in range(0, 40):
            artgrade = "E"
            artremark = "Poor"
            print(artgrade)
        elif int(arttotal) in range(40, 50): 
            artgrade = "D"
            artremark = "Below Average"
        elif int(arttotal) in range(50, 70): 
            artgrade = "C"
            artremark = "Average"
        elif int(arttotal) in range(70, 90): 
            artgrade = "B"
            artremark = "Good"
        elif int(arttotal) in range(90, 101): 
            artgrade = "A"
            artremark = "Excellent"
    else:
        art1 = ""
        art2 = ""
        art3 = ""
        art4 = ""
        artca = ""
        artexam = ""
        arttotal = ""
        artposition = ""
        artgrade = ""
        artremark = ""

    if ('FRENCH',) in subjects:
        french1 = str(student.french_ca_1).zfill(2)
        french2 = str(student.french_ca_2).zfill(2)
        french3 = str(student.french_ca_3).zfill(2)
        french4 = str(student.french_ca_4).zfill(2)
        frenchca = str(student.french_ca_total).zfill(2)
        frenchexam = str(student.french_exam).zfill(2)
        frenchtotal = str(student.french_total).zfill(2)
        frenchposition = str(french_scoress.index((int(frenchtotal),)) + 1).zfill(2)

        if int(frenchtotal) in range(0, 40):
            frenchgrade = "E"
            frenchremark = "Poor"
        elif int(frenchtotal) in range(40, 50): 
            frenchgrade = "D"
            frenchremark = "Below Average"
        elif int(frenchtotal) in range(50, 70): 
            frenchgrade = "C"
            frenchremark = "Average"
        elif int(frenchtotal) in range(70, 90): 
            frenchgrade = "B"
            frenchremark = "Good"
        elif int(frenchtotal) in range(90, 101): 
            frenchgrade = "A"
            frenchremark = "Excellent"
    else:
        french1 = ""
        french2 = ""
        french3 = ""
        french4 = ""
        frenchca = ""
        frenchexam = ""
        frenchtotal = ""
        frenchposition = ""
        frenchgrade = ""
        frenchremark = ""

    if ('GEOGRAPHY',) in subjects:
        geography1 = str(student.geography_ca_1).zfill(2)
        geography2 = str(student.geography_ca_2).zfill(2)
        geography3 = str(student.geography_ca_3).zfill(2)
        geography4 = str(student.geography_ca_4).zfill(2)
        geographyca = str(student.geography_ca_total).zfill(2)
        geographyexam = str(student.geography_exam).zfill(2)
        geographytotal = str(student.geography_total).zfill(2)
        geographyposition = str(geography_scoress.index((int(geographytotal),)) + 1).zfill(2)

        if int(geographytotal) in range(0, 40):
            geographygrade = "E"
            geographyremark = "Poor"
        elif int(geographytotal) in range(40, 50): 
            geographygrade = "D"
            geographyremark = "Below Average"
        elif int(geographytotal) in range(50, 70): 
            geographygrade = "C"
            geographyremark = "Average"
        elif int(geographytotal) in range(70, 90): 
            geographygrade = "B"
            geographyremark = "Good"
        elif int(geographytotal) in range(90, 101): 
            geographygrade = "A"
            geographyremark = "Excellent"
    else:
        geography1 = ""
        geography2 = ""
        geography3 = ""
        geography4 = ""
        geographyca = ""
        geographyexam = ""
        geographytotal = ""
        geographyposition = ""
        geographygrade = ""
        geographyremark = ""

    if ('HISTORY',) in subjects:
        history1 = str(student.history_ca_1).zfill(2)
        history2 = str(student.history_ca_2).zfill(2)
        history3 = str(student.history_ca_3).zfill(2)
        history4 = str(student.history_ca_4).zfill(2)
        historyca = str(student.history_ca_total).zfill(2)
        historyexam = str(student.history_exam).zfill(2)
        historytotal = str(student.history_total).zfill(2)
        historyposition = str(history_scoress.index((int(historytotal),)) + 1).zfill(2)

        if int(historytotal) in range(0, 40):
            historygrade = "E"
            historyremark = "Poor"
        elif int(historytotal) in range(40, 50): 
            historygrade = "D"
            historyremark = "Below Average"
        elif int(historytotal) in range(50, 70): 
            historygrade = "C"
            historyremark = "Average"
        elif int(historytotal) in range(70, 90): 
            historygrade = "B"
            historyremark = "Good"
        elif int(historytotal) in range(90, 101): 
            historygrade = "A"
            historyremark = "Excellent"
    else:
        history1 = ""
        history2 = ""
        history3 = ""
        history4 = ""
        historyca = ""
        historyexam = ""
        historytotal = ""
        historyposition = ""
        historygrade = ""
        historyremark = ""

    if ('HOME ECONOMICS',) in subjects:
        econs1 = str(student.home_economics_ca_1).zfill(2)
        econs2 = str(student.home_economics_ca_2).zfill(2)
        econs3 = str(student.home_economics_ca_3).zfill(2)
        econs4 = str(student.home_economics_ca_4).zfill(2)
        econsca = str(student.home_economics_ca_total).zfill(2)
        econsexam = str(student.home_economics_exam).zfill(2)
        econstotal = str(student.home_economics_total).zfill(2)
        econsposition = str(home_economics_scoress.index((int(econstotal),)) + 1).zfill(2)

        if int(econstotal) in range(0, 40):
            econsgrade = "E"
            econsremark = "Poor"
        elif int(econstotal) in range(40, 50): 
            econsgrade = "D"
            econsremark = "Below Average"
        elif int(econstotal) in range(50, 70): 
            econsgrade = "C"
            econsremark = "Average"
        elif int(econstotal) in range(70, 90): 
            econsgrade = "B"
            econsremark = "Good"
        elif int(econstotal) in range(90, 101): 
            econsgrade = "A"
            econsremark = "Excellent"
    else:
        econs1 = ""
        econs2 = ""
        econs3 = ""
        econs4 = ""
        econsca = ""
        econsexam = ""
        econstotal = ""
        econsposition = ""
        econsgrade = ""
        econsremark = ""

    if ('ICT',) in subjects:
        ict1 = str(student.ict_ca_1).zfill(2)
        ict2 = str(student.ict_ca_2).zfill(2)
        ict3 = str(student.ict_ca_3).zfill(2)
        ict4 = str(student.ict_ca_4).zfill(2)
        ictca = str(student.ict_ca_total).zfill(2)
        ictexam = str(student.ict_exam).zfill(2)
        icttotal = str(student.ict_total).zfill(2)
        ictposition = str(ict_scoress.index((int(icttotal),)) + 1).zfill(2)

        if int(icttotal) in range(0, 40):
            ictgrade = "E"
            ictremark = "Poor"
        elif int(icttotal) in range(40, 50): 
            ictgrade = "D"
            ictremark = "Below Average"
        elif int(icttotal) in range(50, 70): 
            ictgrade = "C"
            ictremark = "Average"
        elif int(icttotal) in range(70, 90): 
            ictgrade = "B"
            ictremark = "Good"
        elif int(icttotal) in range(90, 101): 
            ictgrade = "A"
            ictremark = "Excellent"
    else:
        ict1 = ""
        ict2 = ""
        ict3 = ""
        ict4 = ""
        ictca = ""
        ictexam = ""
        icttotal = ""
        ictposition = ""
        ictgrade = ""
        ictremark = ""

    if ('LITERACY',) in subjects:
        literacy1 = str(student.literacy_ca_1).zfill(2)
        literacy2 = str(student.literacy_ca_2).zfill(2)
        literacy3 = str(student.literacy_ca_3).zfill(2)
        literacy4 = str(student.literacy_ca_4).zfill(2)
        literacyca = str(student.literacy_ca_total).zfill(2)
        literacyexam = str(student.literacy_exam).zfill(2)
        literacytotal = str(student.literacy_total).zfill(2)
        literacyposition = str(literacy_scoress.index((int(literacytotal),)) + 1).zfill(2)

        if int(literacytotal) in range(0, 40):
            literacygrade = "E"
            literacyremark = "Poor"
        elif int(literacytotal) in range(40, 50): 
            literacygrade = "D"
            literacyremark = "Below Average"
        elif int(literacytotal) in range(50, 70): 
            literacygrade = "C"
            literacyremark = "Average"
        elif int(literacytotal) in range(70, 90): 
            literacygrade = "B"
            literacyremark = "Good"
        elif int(literacytotal) in range(90, 101): 
            literacygrade = "A"
            literacyremark = "Excellent"
    else:
        literacy1 = ""
        literacy2 = ""
        literacy3 = ""
        literacy4 = ""
        literacyca = ""
        literacyexam = ""
        literacytotal = ""
        literacyposition = ""
        literacygrade = ""
        literacyremark = ""

    if ('MORAL INSTRUCTION',) in subjects:
        moral1 = str(student.moral_instruction_ca_1).zfill(2)
        moral2 = str(student.moral_instruction_ca_2).zfill(2)
        moral3 = str(student.moral_instruction_ca_3).zfill(2)
        moral4 = str(student.moral_instruction_ca_4).zfill(2)
        moralca = str(student.moral_instruction_ca_total).zfill(2)
        moralexam = str(student.moral_instruction_exam).zfill(2)
        moraltotal = str(student.moral_instruction_total).zfill(2)
        moralposition = str(moral_instruction_scoress.index((int(moraltotal),)) + 1).zfill(2)

        if int(moraltotal) in range(0, 40):
            moralgrade = "E"
            moralremark = "Poor"
        elif int(moraltotal) in range(40, 50): 
            moralgrade = "D"
            moralremark = "Below Average"
        elif int(moraltotal) in range(50, 70): 
            moralgrade = "C"
            moralremark = "Average"
        elif int(moraltotal) in range(70, 90): 
            moralgrade = "B"
            moralremark = "Good"
        elif int(moraltotal) in range(90, 101): 
            moralgrade = "A"
            moralremark = "Excellent"
    else:
        moral1 = ""
        moral2 = ""
        moral3 = ""
        moral4 = ""
        moralca = ""
        moralexam = ""
        moraltotal = ""
        moralposition = ""
        moralgrade = ""
        moralremark = ""

    if ('MUSIC',) in subjects:
        music1 = str(student.music_ca_1).zfill(2)
        music2 = str(student.music_ca_2).zfill(2)
        music3 = str(student.music_ca_3).zfill(2)
        music4 = str(student.music_ca_4).zfill(2)
        musicca = str(student.music_ca_total).zfill(2)
        musicexam = str(student.music_exam).zfill(2)
        musictotal = str(student.music_total).zfill(2)
        musicposition = str(music_scoress.index((int(musictotal),)) + 1).zfill(2)

        if int(musictotal) in range(0, 40):
            musicgrade = "E"
            musicremark = "Poor"
        elif int(musictotal) in range(40, 50): 
            musicgrade = "D"
            musicremark = "Below Average"
        elif int(musictotal) in range(50, 70): 
            musicgrade = "C"
            musicremark = "Average"
        elif int(musictotal) in range(70, 90): 
            musicgrade = "B"
            musicremark = "Good"
        elif int(musictotal) in range(90, 101): 
            musicgrade = "A"
            musicremark = "Excellent"
    else:
        music1 = ""
        music2 = ""
        music3 = ""
        music4 = ""
        musicca = ""
        musicexam = ""
        musictotal = ""
        musicposition = ""
        musicgrade = ""
        musicremark = ""

    if ('NUMERACY',) in subjects:
        numeracy1 = str(student.numeracy_ca_1).zfill(2)
        numeracy2 = str(student.numeracy_ca_2).zfill(2)
        numeracy3 = str(student.numeracy_ca_3).zfill(2)
        numeracy4 = str(student.numeracy_ca_4).zfill(2)
        numeracyca = str(student.numeracy_ca_total).zfill(2)
        numeracyexam = str(student.numeracy_exam).zfill(2)
        numeracytotal = str(student.numeracy_total).zfill(2)
        numeracyposition = str(numeracy_scoress.index((int(numeracytotal),)) + 1).zfill(2)

        if int(numeracytotal) in range(0, 40):
            numeracygrade = "E"
            numeracyremark = "Poor"
        elif int(numeracytotal) in range(40, 50): 
            numeracygrade = "D"
            numeracyremark = "Below Average"
        elif int(numeracytotal) in range(50, 70): 
            numeracygrade = "C"
            numeracyremark = "Average"
        elif int(numeracytotal) in range(70, 90): 
            numeracygrade = "B"
            numeracyremark = "Good"
        elif int(numeracytotal) in range(90, 101): 
            numeracygrade = "A"
            numeracyremark = "Excellent"
    else:
        numeracy1 = ""
        numeracy2 = ""
        numeracy3 = ""
        numeracy4 = ""
        numeracyca = ""
        numeracyexam = ""
        numeracytotal = ""
        numeracyposition = ""
        numeracygrade = ""
        numeracyremark = ""

    if ('PHYSICAL AND HEALTH EDUCATION',) in subjects:
        physical1 = str(student.physical_and_health_education_ca_1).zfill(2)
        physical2 = str(student.physical_and_health_education_ca_2).zfill(2)
        physical3 = str(student.physical_and_health_education_ca_3).zfill(2)
        physical4 = str(student.physical_and_health_education_ca_4).zfill(2)
        physicalca = str(student.physical_and_health_education_ca_total).zfill(2)
        physicalexam = str(student.physical_and_health_education_exam).zfill(2)
        physicaltotal = str(student.physical_and_health_education_total).zfill(2)
        physicalposition = str(physical_and_health_education_scoress.index((int(physicaltotal),)) + 1).zfill(2)

        if int(physicaltotal) in range(0, 40):
            physicalgrade = "E"
            physicalremark = "Poor"
        elif int(physicaltotal) in range(40, 50): 
            physicalgrade = "D"
            physicalremark = "Below Average"
        elif int(physicaltotal) in range(50, 70): 
            physicalgrade = "C"
            physicalremark = "Average"
        elif int(physicaltotal) in range(70, 90): 
            physicalgrade = "B"
            physicalremark = "Good"
        elif int(physicaltotal) in range(90, 101): 
            physicalgrade = "A"
            physicalremark = "Excellent"
    else:
        physical1 = ""
        physical2 = ""
        physical3 = ""
        physical4 = ""
        physicalca = ""
        physicalexam = ""
        physicaltotal = ""
        physicalposition = ""
        physicalgrade = ""
        physicalremark = ""

    if ('QUANTITATIVE REASONING',) in subjects:
        quantitative1 = str(student.quantitative_reasoning_ca_1).zfill(2)
        quantitative2 = str(student.quantitative_reasoning_ca_2).zfill(2)
        quantitative3 = str(student.quantitative_reasoning_ca_3).zfill(2)
        quantitative4 = str(student.quantitative_reasoning_ca_4).zfill(2)
        quantitativeca = str(student.quantitative_reasoning_ca_total).zfill(2)
        quantitativeexam = str(student.quantitative_reasoning_exam).zfill(2)
        quantitativetotal = str(student.quantitative_reasoning_total).zfill(2)
        quantitativeposition = str(quantitative_reasoning_scoress.index((int(quantitativetotal),)) + 1).zfill(2)

        if int(quantitativetotal) in range(0, 40):
            quantitativegrade = "E"
            quantitativeremark = "Poor"
        elif int(quantitativetotal) in range(40, 50): 
            quantitativegrade = "D"
            quantitativeremark = "Below Average"
        elif int(quantitativetotal) in range(50, 70): 
            quantitativegrade = "C"
            quantitativeremark = "Average"
        elif int(quantitativetotal) in range(70, 90): 
            quantitativegrade = "B"
            quantitativeremark = "Good"
        elif int(quantitativetotal) in range(90, 101): 
            quantitativegrade = "A"
            quantitativeremark = "Excellent"
    else:
        quantitative1 = ""
        quantitative2 = ""
        quantitative3 = ""
        quantitative4 = ""
        quantitativeca = ""
        quantitativeexam = ""
        quantitativetotal = ""
        quantitativeposition = ""
        quantitativegrade = ""
        quantitativeremark = ""

    if ('SCIENCE',) in subjects:
        science1 = str(student.science_ca_1).zfill(2)
        science2 = str(student.science_ca_2).zfill(2)
        science3 = str(student.science_ca_3).zfill(2)
        science4 = str(student.science_ca_4).zfill(2)
        scienceca = str(student.science_ca_total).zfill(2)
        scienceexam = str(student.science_exam).zfill(2)
        sciencetotal = str(student.science_total).zfill(2)
        scienceposition = str(science_scoress.index((int(sciencetotal),)) + 1).zfill(2)

        if int(sciencetotal) in range(0, 40):
            sciencegrade = "E"
            scienceremark = "Poor"
        elif int(sciencetotal) in range(40, 50): 
            sciencegrade = "D"
            scienceremark = "Below Average"
        elif int(sciencetotal) in range(50, 70): 
            sciencegrade = "C"
            scienceremark = "Average"
        elif int(sciencetotal) in range(70, 90): 
            sciencegrade = "B"
            scienceremark = "Good"
        elif int(sciencetotal) in range(90, 101): 
            sciencegrade = "A"
            scienceremark = "Excellent" 
    else:
        science1 = ""
        science2 = ""
        science3 = ""
        science4 = ""
        scienceca = ""
        scienceexam = ""
        sciencetotal = ""
        scienceposition = ""
        sciencegrade = ""
        scienceremark = ""

    if ('SCRABBLE',) in subjects:
        scrabble1 = str(student.scrabble_ca_1).zfill(2)
        scrabble2 = str(student.scrabble_ca_2).zfill(2)
        scrabble3 = str(student.scrabble_ca_3).zfill(2)
        scrabble4 = str(student.scrabble_ca_4).zfill(2)
        scrabbleca = str(student.scrabble_ca_total).zfill(2)
        scrabbleexam = str(student.scrabble_exam).zfill(2)
        scrabbletotal = str(student.scrabble_total).zfill(2)
        scrabbleposition = str(scrabble_scoress.index((int(scrabbletotal),)) + 1).zfill(2)

        if int(scrabbletotal) in range(0, 40):
            scrabblegrade = "E"
            scrabbleremark = "Poor"
        elif int(scrabbletotal) in range(40, 50): 
            scrabblegrade = "D"
            scrabbleremark = "Below Average"
        elif int(scrabbletotal) in range(50, 70): 
            scrabblegrade = "C"
            scrabbleremark = "Average"
        elif int(scrabbletotal) in range(70, 90): 
            scrabblegrade = "B"
            scrabbleremark = "Good"
        elif int(scrabbletotal) in range(90, 101): 
            scrabblegrade = "A"
            scrabbleremark = "Excellent"
    else:
        scrabble1 = ""
        scrabble2 = ""
        scrabble3 = ""
        scrabble4 = ""
        scrabbleca = ""
        scrabbleexam = ""
        scrabbletotal = ""
        scrabbleposition = ""
        scrabblegrade = ""
        scrabbleremark = ""

    if ('SOCIAL STUDIES',) in subjects:
        social1 = str(student.social_studies_ca_1).zfill(2)
        social2 = str(student.social_studies_ca_2).zfill(2)
        social3 = str(student.social_studies_ca_3).zfill(2)
        social4 = str(student.social_studies_ca_4).zfill(2)
        socialca = str(student.social_studies_ca_total).zfill(2)
        socialexam = str(student.social_studies_exam).zfill(2)
        socialtotal = str(student.social_studies_total).zfill(2)
        socialposition = str(social_studies_scoress.index((int(socialtotal),)) + 1).zfill(2)

        if int(socialtotal) in range(0, 40):
            socialgrade = "E"
            socialremark = "Poor"
        elif int(socialtotal) in range(40, 50): 
            socialgrade = "D"
            socialremark = "Below Average"
        elif int(socialtotal) in range(50, 70): 
            socialgrade = "C"
            socialremark = "Average"
        elif int(socialtotal) in range(70, 90): 
            socialgrade = "B"
            socialremark = "Good"
        elif int(socialtotal) in range(90, 101): 
            socialgrade = "A"
            socialremark = "Excellent"
    else:
        social1 = ""
        social2 = ""
        social3 = ""
        social4 = ""
        socialca = ""
        socialexam = ""
        socialtotal = ""
        socialposition = ""
        socialgrade = ""
        socialremark = ""

    if ('SPELLING BEE',) in subjects:
        spellingbee1 = str(student.spelling_bee_ca_1).zfill(2)
        spellingbee2 = str(student.spelling_bee_ca_2).zfill(2)
        spellingbee3 = str(student.spelling_bee_ca_3).zfill(2)
        spellingbee4 = str(student.spelling_bee_ca_4).zfill(2)
        spellingbeeca = str(student.spelling_bee_ca_total).zfill(2)
        spellingbeeexam = str(student.spelling_bee_exam).zfill(2)
        spellingbeetotal = str(student.spelling_bee_total).zfill(2)
        spellingbeeposition = str(spelling_bee_scoress.index((int(spellingbeetotal),)) + 1).zfill(2)

        if int(spellingbeetotal) in range(0, 40):
            spellingbeegrade = "E"
            spellingbeeremark = "Poor"
        elif int(spellingbeetotal) in range(40, 50): 
            spellingbeegrade = "D"
            spellingbeeremark = "Below Average"
        elif int(spellingbeetotal) in range(50, 70): 
            spellingbeegrade = "C"
            spellingbeeremark = "Average"
        elif int(spellingbeetotal) in range(70, 90): 
            spellingbeegrade = "B"
            spellingbeeremark = "Good"
        elif int(spellingbeetotal) in range(90, 101): 
            spellingbeegrade = "A"
            spellingbeeremark = "Excellent"
    else:
        spellingbee1 = ""
        spellingbee2 = ""
        spellingbee3 = ""
        spellingbee4 = ""
        spellingbeeca = ""
        spellingbeeexam = ""
        spellingbeetotal = ""
        spellingbeeposition = ""
        spellingbeegrade = ""
        spellingbeeremark = ""

    if ('VERBAL REASONING',) in subjects:
        verbal1 = str(student.verbal_reasoning_ca_1).zfill(2)
        verbal2 = str(student.verbal_reasoning_ca_2).zfill(2)
        verbal3 = str(student.verbal_reasoning_ca_3).zfill(2)
        verbal4 = str(student.verbal_reasoning_ca_4).zfill(2)
        verbalca = str(student.verbal_reasoning_ca_total).zfill(2)
        verbalexam = str(student.verbal_reasoning_exam).zfill(2)
        verbaltotal = str(student.verbal_reasoning_total).zfill(2)
        verbalposition = str(verbal_reasoning_scoress.index((int(verbaltotal),)) + 1).zfill(2)

        if int(verbaltotal) in range(0, 40):
            verbalgrade = "E"
            verbalremark = "Poor"
        elif int(verbaltotal) in range(40, 50): 
            verbalgrade = "D"
            verbalremark = "Below Average"
        elif int(verbaltotal) in range(50, 70): 
            verbalgrade = "C"
            verbalremark = "Average"
        elif int(verbaltotal) in range(70, 90): 
            verbalgrade = "B"
            verbalremark = "Good"
        elif int(verbaltotal) in range(90, 101): 
            verbalgrade = "A"
            verbalremark = "Excellent"
    else:
        verbal1 = ""
        verbal2 = ""
        verbal3 = ""
        verbal4 = ""
        verbalca = ""
        verbalexam = ""
        verbaltotal = ""
        verbalposition = ""
        verbalgrade = ""
        verbalremark = ""

    if ('VOCATIONAL APTITUDE',) in subjects:
        vocational1 = str(student.vocational_studies_ca_1).zfill(2)
        vocational2 = str(student.vocational_studies_ca_2).zfill(2)
        vocational3 = str(student.vocational_studies_ca_3).zfill(2)
        vocational4 = str(student.vocational_studies_ca_4).zfill(2)
        vocationalca = str(student.vocational_studies_ca_total).zfill(2)
        vocationalexam = str(student.vocational_studies_exam).zfill(2)
        vocationaltotal = str(student.vocational_studies_total).zfill(2)
        vocationalposition = str(vocational_studies_scoress.index((int(vocationaltotal),)) + 1).zfill(2)

        if int(vocationaltotal) in range(0, 40):
            vocationalgrade = "E"
            vocationalremark = "Poor"
        elif int(vocationaltotal) in range(40, 50): 
            vocationalgrade = "D"
            vocationalremark = "Below Average"
        elif int(vocationaltotal) in range(50, 70): 
            vocationalgrade = "C"
            vocationalremark = "Average"
        elif int(vocationaltotal) in range(70, 90): 
            vocationalgrade = "B"
            vocationalremark = "Good"
        elif int(vocationaltotal) in range(90, 101): 
            vocationalgrade = "A"
            vocationalremark = "Excellent"   
    else:
        vocational1 = ""
        vocational2 = ""
        vocational3 = ""
        vocational4 = ""
        vocationalca = ""
        vocationalexam = ""
        vocationaltotal = ""
        vocationalposition = ""
        vocationalgrade = ""
        vocationalremark = ""

    if ('YORUBA',) in subjects:
        yoruba1 = str(student.yoruba_ca_1).zfill(2)
        yoruba2 = str(student.yoruba_ca_2).zfill(2)
        yoruba3 = str(student.yoruba_ca_3).zfill(2)
        yoruba4 = str(student.yoruba_ca_4).zfill(2)
        yorubaca = str(student.yoruba_ca_total).zfill(2)
        yorubaexam = str(student.yoruba_exam).zfill(2)
        yorubatotal = str(student.yoruba_total).zfill(2)
        yorubaposition = str(yoruba_scoress.index((int(yorubatotal),)) + 1).zfill(2)

        if int(yorubatotal) in range(0, 40):
            yorubagrade = "E"
            yorubaremark = "Poor"
        elif int(yorubatotal) in range(40, 50): 
            yorubagrade = "D"
            yorubaremark = "Below Average"
        elif int(yorubatotal) in range(50, 70): 
            yorubagrade = "C"
            yorubaremark = "Average"
        elif int(yorubatotal) in range(70, 90): 
            yorubagrade = "B"
            yorubaremark = "Good"
        elif int(yorubatotal) in range(90, 101): 
            yorubagrade = "A"
            yorubaremark = "Excellent"
    else:
        yoruba1 = ""
        yoruba2 = ""
        yoruba3 = ""
        yoruba4 = ""
        yorubaca = ""
        yorubaexam = ""
        yorubatotal = ""
        yorubaposition = ""
        yorubagrade = ""
        yorubaremark = ""
    
    first_ca_total = student.numeracy_ca_1 + student.quantitative_reasoning_ca_1 + student.literacy_ca_1 + student.verbal_reasoning_ca_1 + student.science_ca_1 + student.computer_studies_ca_1 + student.vocational_studies_ca_1 + student.social_studies_ca_1 + student.history_ca_1 + student.geography_ca_1 + student.citizenship_ca_1 + student.home_economics_ca_1 + student.music_ca_1 + student.french_ca_1 + student.creative_art_ca_1 + student.physical_and_health_education_ca_1 + student.christian_religious_knowledge_ca_1 + student.moral_instruction_ca_1 + student.yoruba_ca_1 + student.agricultural_science_ca_1 + student.ict_ca_1 + student.chess_ca_1 + student.scrabble_ca_1 + student.spelling_bee_ca_1
    second_ca_total = student.numeracy_ca_2 + student.quantitative_reasoning_ca_2 + student.literacy_ca_2 + student.verbal_reasoning_ca_2 + student.science_ca_2 + student.computer_studies_ca_2 + student.vocational_studies_ca_2 + student.social_studies_ca_2 + student.history_ca_2 + student.geography_ca_2 + student.citizenship_ca_2 + student.home_economics_ca_2 + student.music_ca_2 + student.french_ca_2 + student.creative_art_ca_2 + student.physical_and_health_education_ca_2 + student.christian_religious_knowledge_ca_2 + student.moral_instruction_ca_2 + student.yoruba_ca_2 + student.agricultural_science_ca_2 + student.ict_ca_2 + student.chess_ca_2 + student.scrabble_ca_2 + student.spelling_bee_ca_2
    third_ca_total = student.numeracy_ca_3 + student.quantitative_reasoning_ca_3 + student.literacy_ca_3 + student.verbal_reasoning_ca_3 + student.science_ca_3 + student.computer_studies_ca_3 + student.vocational_studies_ca_3 + student.social_studies_ca_3 + student.history_ca_3 + student.geography_ca_3 + student.citizenship_ca_3 + student.home_economics_ca_3 + student.music_ca_3 + student.french_ca_3 + student.creative_art_ca_3 + student.physical_and_health_education_ca_3 + student.christian_religious_knowledge_ca_3 + student.moral_instruction_ca_3 + student.yoruba_ca_3 + student.agricultural_science_ca_3 + student.ict_ca_3 + student.chess_ca_3 + student.scrabble_ca_3 + student.spelling_bee_ca_3 
    fourth_ca_total = student.numeracy_ca_4 + student.quantitative_reasoning_ca_4 + student.literacy_ca_4 + student.verbal_reasoning_ca_4 + student.science_ca_4 + student.computer_studies_ca_4 + student.vocational_studies_ca_4 + student.social_studies_ca_4 + student.history_ca_4 + student.geography_ca_4 + student.citizenship_ca_4 + student.home_economics_ca_4 + student.music_ca_4 + student.french_ca_4 + student.creative_art_ca_4 + student.physical_and_health_education_ca_4 + student.christian_religious_knowledge_ca_4 + student.moral_instruction_ca_4 + student.yoruba_ca_4 + student.agricultural_science_ca_4 + student.ict_ca_4 + student.chess_ca_4 + student.scrabble_ca_4 + student.spelling_bee_ca_4 
    ca_total_total = student.numeracy_ca_total + student.quantitative_reasoning_ca_total + student.literacy_ca_total + student.verbal_reasoning_ca_total + student.science_ca_total + student.computer_studies_ca_total + student.vocational_studies_ca_total + student.social_studies_ca_total + student.history_ca_total + student.geography_ca_total + student.citizenship_ca_total + student.home_economics_ca_total + student.music_ca_total + student.french_ca_total + student.creative_art_ca_total + student.physical_and_health_education_ca_total + student.christian_religious_knowledge_ca_total + student.moral_instruction_ca_total + student.yoruba_ca_total + student.agricultural_science_ca_total + student.ict_ca_total + student.chess_ca_total + student.scrabble_ca_total + student.spelling_bee_ca_total 
    exam_total = student.numeracy_exam + student.quantitative_reasoning_exam + student.literacy_exam + student.verbal_reasoning_exam + student.science_exam + student.computer_studies_exam + student.vocational_studies_exam + student.social_studies_exam + student.history_exam + student.geography_exam + student.citizenship_exam + student.home_economics_exam + student.music_exam + student.french_exam + student.creative_art_exam + student.physical_and_health_education_exam + student.christian_religious_knowledge_exam + student.moral_instruction_exam + student.yoruba_exam + student.agricultural_science_exam + student.ict_exam + student.chess_exam + student.scrabble_exam + student.spelling_bee_exam
    teacher_comment = student.teacher_comment
    head_teacher_comment = student.headteacher_comment
    # Create a file-like buffer to receive PDF data.
    buffer = io.BytesIO()
    # Create the PDF object, using the buffer as its "file."
    p = canvas.Canvas(buffer)
    # Draw things on the PDF. Here's where the PDF generation happens.
    # See the ReportLab documentation for the full list of functionality.
    p.setPageSize(landscape(A4))
    p.drawString(100, 100, "Hello world.")
    p.drawImage("static/img/Asset 2s.png", 0,0, width=11.7*inch, height=8.3*inch, anchor='c') 
    p.drawImage("static/img/Asset 15.png", 429,491, width=362.45, height=89.25, anchor='c') 
    p.drawImage("static/" + str(passport), 327,454.5, width=96.9, height=123.5, anchor='c')
    p.setLineWidth(1.4)
    p.setLineCap(1)
    p.rect(327,454.5, width=96.9, height=123.5, stroke=1, fill=0)
    pdfmetrics.registerFont(TTFont('Calibri', 'static/img/Calibri Bold.TTF'))
    pdfmetrics.registerFont(TTFont('Comic-sans', 'static/img/comicv.ttf'))
    pdfmetrics.registerFont(TTFont('scriptt', 'static/img/edwardian.ttf'))
    pdfmetrics.registerFont(TTFont('Comic-sans2', 'static/img/comic (2).ttf'))
    pdfmetrics.registerFont(TTFont('CALIBRI', 'static/img/CALIBRIZ.TTF'))
    p.setFont('Courier-Bold', 15)
    p.drawString(25, 569, "* " + admission_no)
    p.setFont('Calibri', 14)
    p.drawString(25, 543, "NAME:")
    p.drawString(25, 518, "CLASS:")
    p.drawString(25, 493, "AGE:")
    p.drawString(25, 468, "GENDER:")
    p.drawString(429, 475, "END OF TERM ASSESSMENT REPORT")
    p.drawString(429, 456, termm + " " + session_value + " SESSION")

    p.setFont('Calibri', 13)
    p.drawString(675, 464, "CLASS POPULATION: " + str(class_list2))

    p.setLineWidth(1.4)
    p.setFont('scriptt', 22.2)
    p.drawString(69, 543, name)
    textwidth = stringWidth(name, "scriptt", 22.2)
    p.line(69,540,textwidth + 69, 540)

    p.setFont('Calibri', 13)
    p.drawString(73, 518, clas)
    p.drawString(84, 468, gender)

    p.setLineWidth(0.1)
    p.rect(25,90, 634, 361, stroke=1)

    p.setFillColor(HexColor(0x40E0D0))
    p.rect(25,421, 170, 30, stroke=1, fill=1)
    p.rect(194.8,439, 214, 12, stroke=1, fill=1)
    p.rect(408.4,439, 42.8, 12, stroke=1, fill=1)
    p.rect(451,421, 42.8, 30, stroke=1, fill=1)
    p.rect(493.3,421, 50.8, 30, stroke=1, fill=1)
    p.rect(544.1,421, 42.8, 30, stroke=1, fill=1)
    p.rect(586.5,421, 72.5, 30, stroke=1, fill=1)
    p.grid([194.9, 237.6, 280.4, 323.2, 366, 408.5, 451], [421, 439])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [408, 419])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [395, 406])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [382, 393])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [369, 380])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [356, 367])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [343, 354])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [330, 341])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [317, 328])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [304, 315])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [291, 302])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [278, 289])
    p.grid([43, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [265, 276])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [252, 263])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [239, 250])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [226, 237])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [213, 224])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [200, 211])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [187, 198])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [174, 185])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [161, 172])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [148, 159])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [135, 146])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [122, 133])
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 544.1, 586.5, 659.2], [109, 120])
    p.rect(25,90,634.2,17, stroke=0, fill=1)
    p.grid([25, 194.9, 237.6, 280.4, 323.2, 366, 408.5, 451, 493.3, 659.2], [90, 107])

    p.setFillColor(HexColor(0xFF0000))
    p.setFont('Calibri', 15.5)
    p.rotate(90)
    p.drawString(290,-39, "CORE SUBJECTS" )

    p.setFillColor(HexColor(0x000000))
    p.setFont('Calibri', 15)
    p.rotate(-90)
    p.drawString(75,431, "SUBJECTS" )

    p.setFont('Calibri', 10)
    p.drawString(245,441.5, "CONTINUOUS ASSESSMENT" )
    p.drawString(417,441.5, "EXAM" )

    p.setFont('Calibri', 9.5)
    p.drawString(460,442, "TERM" )
    p.drawString(459,433, "TOTAL" )
    p.drawString(455,424, "SCORE %" )

    p.setFont('Calibri', 9.5)
    p.drawString(499.5,442, "POSITION")
    p.drawString(513,433, "IN" )
    p.drawString(502,424, "SUBJECT")

    p.setFont('Calibri', 11)
    p.drawString(549.3,433, "GRADE")
    p.drawString(597,438, "TEACHER'S")
    p.drawString(599,426, "REMARKS")

    p.setFont('Calibri', 9)
    p.drawString(199,431, "C.A. TEST")
    p.drawString(215,423, "1")

    p.drawString(241.7,431, "C.A. TEST")
    p.drawString(257.7,423, "2")

    p.drawString(284.5,431, "C.A. TEST")
    p.drawString(300.5,423, "3")

    p.drawString(327.3,431, "C.A. TEST")
    p.drawString(343.3,423, "4")

    p.drawString(370.1,431, "C.A. TEST")
    p.drawString(375,423, "SCORE")

    p.drawString(419.5,431, "Mark")
    p.drawString(417,423, "Scored")

    p.setFont('Calibri', 10.8)
    p.drawString(45,410, "Numeracy")
    p.drawString(45,397, "Quantitative Reasoning")
    p.drawString(45,384, "Literacy")
    p.drawString(45,371, "Verbal Reasoning")
    p.drawString(45,358, "Science")
    p.drawString(45,345, "Computer")
    p.drawString(45,332, "Vocational Aptitude")
    p.drawString(45,319, "Social Studies")
    p.drawString(45,306, "History")
    p.drawString(45,293, "Geography")
    p.drawString(45,280, "Citizenship")
    p.drawString(45,267, "Home Economics")
    p.drawString(27,254, "Music")
    p.drawString(27,241, "French")
    p.drawString(27,228, "Creative Art")
    p.drawString(27,215, "Physical and Health Education")
    p.drawString(27,202, "Christian Religious Knowledge")
    p.drawString(27,189, "Moral Instruction")
    p.drawString(27,176, "Yoruba/Igbo")
    p.drawString(27,163, "Agricultural Science")
    p.drawString(27,150, "ICT")
    p.drawString(27,137, "Chess")
    p.drawString(27,124, "Scrabble")
    p.drawString(27,111, "Spelling Bee")

    p.setFont('Calibri', 11.7)
    p.drawString(27,95, "TOTAL MARKS OBTAINABLE: " + str(total_marks_obt))
    #ordinal(20).upper()

    p.setFont('Calibri', 9)
    p.drawString(211,410, numeracy1)
    p.drawString(254,410, numeracy2)
    p.drawString(297,410, numeracy3)
    p.drawString(341,410, numeracy4)
    p.drawString(382,410, numeracyca)
    p.drawString(424,410, numeracyexam)
    p.drawString(465,410, numeracytotal)
    p.drawString(513,410, ordinal(numeracyposition).upper())
    p.drawString(563,410, numeracygrade)
    p.drawString(590,410, numeracyremark)

    p.drawString(211,397, quantitative1)
    p.drawString(254,397, quantitative2)
    p.drawString(297,397, quantitative3)
    p.drawString(341,397, quantitative4)
    p.drawString(382,397, quantitativeca)
    p.drawString(424,397, quantitativeexam)
    p.drawString(465,397, quantitativetotal)
    p.drawString(513,397, ordinal(quantitativeposition).upper())
    p.drawString(563,397, quantitativegrade)
    p.drawString(590,397, quantitativeremark)

    p.drawString(211,384, literacy1)
    p.drawString(254,384, literacy2)
    p.drawString(297,384, literacy3)
    p.drawString(341,384, literacy4)
    p.drawString(382,384, literacyca)
    p.drawString(424,384, literacyexam)
    p.drawString(465,384, literacytotal)
    p.drawString(513,384, ordinal(literacyposition).upper())
    p.drawString(563,384, literacygrade)
    p.drawString(590,384, literacyremark)

    p.drawString(211,371, verbal1)
    p.drawString(254,371, verbal2)
    p.drawString(297,371, verbal3)
    p.drawString(341,371, verbal4)
    p.drawString(382,371, verbalca)
    p.drawString(424,371, verbalexam)
    p.drawString(465,371, verbaltotal)
    p.drawString(513,371, ordinal(verbalposition).upper())
    p.drawString(563,371, verbalgrade)
    p.drawString(590,371, verbalremark)

    p.drawString(211,358, science1)
    p.drawString(254,358, science2)
    p.drawString(297,358, science3)
    p.drawString(341,358, science4)
    p.drawString(382,358, scienceca)
    p.drawString(424,358, scienceexam)
    p.drawString(465,358, sciencetotal)
    p.drawString(513,358, ordinal(scienceposition).upper())
    p.drawString(563,358, sciencegrade)
    p.drawString(590,358, scienceremark)

    p.drawString(211,345, computer1)
    p.drawString(254,345, computer2)
    p.drawString(297,345, computer3)
    p.drawString(341,345, computer4)
    p.drawString(382,345, computerca)
    p.drawString(424,345, computerexam)
    p.drawString(465,345, computertotal)
    p.drawString(513,345, ordinal(computerposition).upper())
    p.drawString(563,345, computergrade)
    p.drawString(590,345, computerremark)

    p.drawString(211,332, vocational1)
    p.drawString(254,332, vocational2)
    p.drawString(297,332, vocational3)
    p.drawString(341,332, vocational4)
    p.drawString(382,332, vocationalca)
    p.drawString(424,332, vocationalexam)
    p.drawString(465,332, vocationaltotal)
    p.drawString(513,332, ordinal(vocationalposition).upper())
    p.drawString(563,332, vocationalgrade)
    p.drawString(590,332, vocationalremark)

    p.drawString(211,319, social1)
    p.drawString(254,319, social2)
    p.drawString(297,319, social3)
    p.drawString(341,319, social4)
    p.drawString(382,319, socialca)
    p.drawString(424,319, socialexam)
    p.drawString(465,319, socialtotal)
    p.drawString(513,319, ordinal(socialposition).upper())
    p.drawString(563,319, socialgrade)
    p.drawString(590,319, socialremark)

    p.drawString(211,306, history1)
    p.drawString(254,306, history2)
    p.drawString(297,306, history3)
    p.drawString(341,306, history4)
    p.drawString(382,306, historyca)
    p.drawString(424,306, historyexam)
    p.drawString(465,306, historytotal)
    p.drawString(513,306, ordinal(historyposition).upper())
    p.drawString(563,306, historygrade)
    p.drawString(590,306, historyremark)

    p.drawString(211,293, geography1)
    p.drawString(254,293, geography2)
    p.drawString(297,293, geography3)
    p.drawString(341,293, geography4)
    p.drawString(382,293, geographyca)
    p.drawString(424,293, geographyexam)
    p.drawString(465,293, geographytotal)
    p.drawString(513,293, ordinal(geographyposition).upper())
    p.drawString(563,293, geographygrade)
    p.drawString(590,293, geographyremark)

    p.drawString(211,280, citizenship1)
    p.drawString(254,280, citizenship2)
    p.drawString(297,280, citizenship3)
    p.drawString(341,280, citizenship4)
    p.drawString(382,280, citizenshipca)
    p.drawString(424,280, citizenshipexam)
    p.drawString(465,280, citizenshiptotal)
    p.drawString(513,280, ordinal(citizenshipposition).upper())
    p.drawString(563,280, citizenshipgrade)
    p.drawString(590,280, citizenshipremark)

    p.drawString(211,267, econs1)
    p.drawString(254,267, econs2)
    p.drawString(297,267, econs3)
    p.drawString(341,267, econs4)
    p.drawString(382,267, econsca)
    p.drawString(424,267, econsexam)
    p.drawString(465,267, econstotal)
    p.drawString(513,267, ordinal(econsposition).upper())
    p.drawString(563,267, econsgrade)
    p.drawString(590,267, econsremark)

    p.drawString(211,254, music1)
    p.drawString(254,254, music2)
    p.drawString(297,254, music3)
    p.drawString(341,254, music4)
    p.drawString(382,254, musicca)
    p.drawString(424,254, musicexam)
    p.drawString(465,254, musictotal)
    p.drawString(513,254, ordinal(musicposition).upper())
    p.drawString(563,254, musicgrade)
    p.drawString(590,254, musicremark)

    p.drawString(211,241, french1)
    p.drawString(254,241, french2)
    p.drawString(297,241, french3)
    p.drawString(341,241, french4)
    p.drawString(382,241, frenchca)
    p.drawString(424,241, frenchexam)
    p.drawString(465,241, frenchtotal)
    p.drawString(513,241, ordinal(frenchposition).upper())
    p.drawString(563,241, frenchgrade)
    p.drawString(590,241, frenchremark)

    p.drawString(211,228, art1)
    p.drawString(254,228, art2)
    p.drawString(297,228, art3)
    p.drawString(341,228, art4)
    p.drawString(382,228, artca)
    p.drawString(424,228, artexam)
    p.drawString(465,228, arttotal)
    p.drawString(513,228, ordinal(artposition).upper())
    p.drawString(563,228, artgrade)
    p.drawString(590,228, artremark)

    p.drawString(211,215, physical1)
    p.drawString(254,215, physical2)
    p.drawString(297,215, physical3)
    p.drawString(341,215, physical4)
    p.drawString(382,215, physicalca)
    p.drawString(424,215, physicalexam)
    p.drawString(465,215, physicaltotal)
    p.drawString(513,215, ordinal(physicalposition).upper())
    p.drawString(563,215, physicalgrade)
    p.drawString(590,215, physicalremark)

    p.drawString(211,202, christian1)
    p.drawString(254,202, christian2)
    p.drawString(297,202, christian3)
    p.drawString(341,202, christian4)
    p.drawString(382,202, christianca)
    p.drawString(424,202, christianexam)
    p.drawString(465,202, christiantotal)
    p.drawString(513,202, ordinal(christianposition).upper())
    p.drawString(563,202, christiangrade)
    p.drawString(590,202, christianremark)

    p.drawString(211,189, moral1)
    p.drawString(254,189, moral2)
    p.drawString(297,189, moral3)
    p.drawString(341,189, moral4)
    p.drawString(382,189, moralca)
    p.drawString(424,189, moralexam)
    p.drawString(465,189, moraltotal)
    p.drawString(513,189, ordinal(moralposition).upper())
    p.drawString(563,189, moralgrade)
    p.drawString(590,189, moralremark)

    p.drawString(211,176, yoruba1)
    p.drawString(254,176, yoruba2)
    p.drawString(297,176, yoruba3)
    p.drawString(341,176, yoruba4)
    p.drawString(382,176, yorubaca)
    p.drawString(424,176, yorubaexam)
    p.drawString(465,176, yorubatotal)
    p.drawString(513,176, ordinal(yorubaposition).upper())
    p.drawString(563,176, yorubagrade)
    p.drawString(590,176, yorubaremark)

    p.drawString(211,163, agric1)
    p.drawString(254,163, agric2)
    p.drawString(297,163, agric3)
    p.drawString(341,163, agric4)
    p.drawString(382,163, agricca)
    p.drawString(424,163, agricexam)
    p.drawString(465,163, agrictotal)
    p.drawString(513,163, ordinal(agricposition).upper())
    p.drawString(563,163, agricgrade)
    p.drawString(590,163, agricremark)

    p.drawString(211,150, ict1)
    p.drawString(254,150, ict2)
    p.drawString(297,150, ict3)
    p.drawString(341,150, ict4)
    p.drawString(382,150, ictca)
    p.drawString(424,150, ictexam)
    p.drawString(465,150, icttotal)
    p.drawString(513,150, ordinal(ictposition).upper())
    p.drawString(563,150, ictgrade)
    p.drawString(590,150, ictremark)

    p.drawString(211,137, chess1)
    p.drawString(254,137, chess2)
    p.drawString(297,137, chess3)
    p.drawString(341,137, chess4)
    p.drawString(382,137, chessca)
    p.drawString(424,137, chessexam)
    p.drawString(465,137, chesstotal)
    p.drawString(513,137, ordinal(chessposition).upper())
    p.drawString(563,137, chessgrade)
    p.drawString(590,137, chessremark)

    p.drawString(211,124, scrabble1)
    p.drawString(254,124, scrabble2)
    p.drawString(297,124, scrabble3)
    p.drawString(341,124, scrabble4)
    p.drawString(382,124, scrabbleca)
    p.drawString(424,124, scrabbleexam)
    p.drawString(465,124, scrabbletotal)
    p.drawString(513,124, ordinal(scrabbleposition).upper())
    p.drawString(563,124, scrabblegrade)
    p.drawString(590,124, scrabbleremark)

    p.drawString(211,111, spellingbee1)
    p.drawString(254,111, spellingbee2)
    p.drawString(297,111, spellingbee3)
    p.drawString(341,111, spellingbee4)
    p.drawString(382,111, spellingbeeca)
    p.drawString(424,111, spellingbeeexam)
    p.drawString(465,111, spellingbeetotal)
    p.drawString(465,111, ordinal(spellingbeeposition).upper())
    p.drawString(563,111, spellingbeegrade)
    p.drawString(590,111, spellingbeeremark)

    p.setFont('Calibri', 11)
    p.drawString(208,95, str(first_ca_total).zfill(3))
    p.drawString(251,95, str(second_ca_total).zfill(3))
    p.drawString(294,95, str(third_ca_total).zfill(3))
    p.drawString(337,95, str(fourth_ca_total).zfill(3))
    p.drawString(379,95, str(ca_total_total).zfill(3))
    p.drawString(421,95, str(exam_total).zfill(3))
    p.drawString(461,95, str(student.total_scores).zfill(4))

    p.setFont('Calibri', 13)
    p.drawString(548,95, "AVERAGE:  " + str(student.totl_average) + "%")

    p.setLineWidth(2.5)
    p.roundRect(669, 361, 150, 90, 10)

    p.setLineWidth(0.1)
    p.rect(669,95, 150, 256)
    p.setFillColor(HexColor(0xFF1493))
    p.rect(669,316,150,35, stroke=1, fill=1)
    p.grid([669,779,819], [303, 314])
    p.grid([669,779,819], [290, 301])
    p.grid([669,779,819], [277, 288])
    p.grid([669,779,819], [264, 275])
    p.grid([669,779,819], [251, 262])
    p.grid([669,779,819], [238, 249])
    p.grid([669,779,819], [225, 236])
    p.grid([669,779,819], [212, 223])
    p.grid([669,779,819], [199, 210])
    p.grid([669,779,819], [186, 197])
    p.grid([669,819], [160, 184])
    p.setFillColor(HexColor(0xFFFF00))
    p.rect(669,160, 150, 24, stroke=1, fill=1)
    p.grid([669,779,819], [147, 158])
    p.grid([669,779,819], [134, 145])
    p.grid([669,779,819], [121, 132])
    p.grid([669,779,819], [108, 119])
    p.grid([669,779,819], [95, 106])

    p.setLineWidth(2.5)
    p.roundRect(669, 10, 150, 75, 10)
    p.roundRect(25, 10, 634, 75, 10)
    p.setLineWidth(0.1)
    p.line(342,10,342,85)

    p.setFillColor(HexColor(0x000000))
    p.setFont('Calibri', 14)
    p.drawString(695,337, "ASSESSMENT OF")
    p.drawString(683,322, "BEHAVIOUR & SKILLS")
    p.drawString(677,167, "PSYCHOMOTOR SKILLS")

    p.setFont('Calibri', 10.2)
    p.drawString(671,305, "Punctuality")
    p.drawString(671,292, "Mental Alertness")
    p.drawString(671,279, "Respect")
    p.drawString(671,266, "Neatness")
    p.drawString(671,253, "Politeness")
    p.drawString(671,240, "Honesty")
    p.drawString(671,227, "Relationship with Peers")
    p.drawString(671,214, "Willingness to Learn")
    p.drawString(671,201, "Spirit of Teamwork")
    p.drawString(671,188, "Health")
    p.drawString(671,149, "Verbal Skills")
    p.drawString(671,136, "Participation in Sports")
    p.drawString(671,123, "Artistic Creativity")
    p.drawString(671,110, "Musical Skills")
    p.drawString(671,97, "Dance Skills")

    p.setFont('Calibri', 10)
    p.drawString(796,305, str(student.psychomotor_punctuality))
    p.drawString(796,292, str(student.psychomotor_mental_alertness))
    p.drawString(796,279, str(student.psychomotor_respect))
    p.drawString(796,266, str(student.psychomotor_neatness))
    p.drawString(796,253, str(student.psychomotor_politeness))
    p.drawString(796,240, str(student.psychomotor_honesty))
    p.drawString(796,227, str(student.psychomotor_relationship_with_peers))
    p.drawString(796,214, str(student.psychomotor_willingness_to_learn))
    p.drawString(796,201, str(student.psychomotor_spirit_of_teamwork))
    p.drawString(796,188, str(student.psychomotor_health))
    p.drawString(796,149, str(student.psychomotor_verbal_skill))
    p.drawString(796,136, str(student.psychomotor_participation_in_games_and_sports))
    p.drawString(796,123, str(student.psychomotor_artistic_creativity))
    p.drawString(796,110, str(student.psychomotor_musical_skills))
    p.drawString(796,97, str(student.psychomotor_dance_skills))

    p.setFillColor(HexColor(0xFF4500))
    p.setStrokeColor(HexColor(0xFF4500))
    p.setFont('Calibri', 12)
    p.drawString(674, 72, "KEY TO RATINGS:")
    textwidth11 = stringWidth("KEY TO RATINGS:", "Calibri", 12)
    p.setLineWidth(0.7)
    p.line(674,70, textwidth11 + 674, 70)

    p.setFillColor(HexColor(0x000000))
    p.setStrokeColor(HexColor(0x000000))
    p.setFont('CALIBRI', 9.3)
    p.drawString(674, 58, "A = EXCELLENT                  - 90 - 100%")
    p.drawString(674, 48, "B = GOOD                            - 70 - 89%")
    p.drawString(674, 38, "C = AVERAGE                      - 50 - 69%")
    p.drawString(674, 28, "D = BELOW AVERAGE       - 40 - 49%")
    p.drawString(674, 18, "E = POOR                        - Below 40%")
    

    p.setFont('Calibri', 11)
    p.setLineWidth(0.7)
    p.drawString(674, 437, "Vacation Date:")
    p.setFont('Calibri', 10)
    p.drawString(674, 420, "Resumption Date:")
    p.setFont('Calibri', 11)
    p.drawString(674, 403, "MAX. ATTENDANCE:")
    p.drawString(674, 386, "NO. OF TIMES PRESENT:")
    p.drawString(674, 369, "NO. OF TIMES ABSENT:")

    p.setFont('Courier-Bold', 8)
    p.setFillColor(blue)
    p.drawString(743,437, "15th Dec., 2023")
    p.drawString(750,421, "8th Jan., 2024")
    p.drawString(770,403, "120")
    p.line(787,386, 815, 386)
    p.line(783,369, 815, 369)

    p.setFillColor(black)
    p.setFont('Calibri', 9)
    p.drawString(30, 75, "TEACHER'S COMMENT:")
    textwidth12 = stringWidth("TEACHER'S COMMENT:", "Calibri", 9)
    p.setLineWidth(0.7)
    p.line(30,73, textwidth12 + 30, 73)

    p.drawString(347, 75, "HEAD TEACHER'S COMMENT:")
    textwidth13 = stringWidth("HEAD TEACHER'S COMMENT:", "Calibri", 9)
    p.setLineWidth(0.7)
    p.line(347,73, textwidth13 + 347, 73)

    style = getSampleStyleSheet()
    mystyle = ParagraphStyle('mytitle', fontName="CALIBRI", fontSize=11, parent=None, textColor=blue)

    teachers_comment = []
    head_teachers_comment = []
    
    teachers_comment.append(Paragraph(teacher_comment, mystyle))
    head_teachers_comment.append(Paragraph(head_teacher_comment, mystyle))
    f1 = Frame(30, 25, 309, 45, showBoundary=0, topPadding=0, leftPadding=0, bottomPadding=0, rightPadding=0)
    f2 = Frame(347, 25, 309, 45, showBoundary=0, topPadding=0, leftPadding=0, bottomPadding=0, rightPadding=0)
    f1.addFromList(teachers_comment,p)
    f2.addFromList(head_teachers_comment,p)

    p.setFont('Calibri', 9.5)
    p.drawString(30, 17, "SIGNATURE:")
    p.drawString(347, 17, "SIGNATURE:")

    
    # Close the PDF object cleanly, and we're done.
    p.showPage()
    p.save()
    # FileResponse sets the Content-Disposition header so that browsers
    # present the option to save the file.
    buffer.seek(0)
    return FileResponse(buffer, filename=name + '.pdf')
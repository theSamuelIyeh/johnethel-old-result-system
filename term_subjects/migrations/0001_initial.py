# Generated by Django 3.1.7 on 2021-04-28 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='term_subjects',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_name', models.CharField(max_length=200)),
                ('section_name', models.CharField(max_length=200)),
                ('class_name', models.CharField(max_length=200)),
                ('term_name', models.CharField(max_length=200)),
                ('subject_name', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddConstraint(
            model_name='term_subjects',
            constraint=models.UniqueConstraint(fields=('session_name', 'section_name', 'class_name', 'term_name', 'subject_name'), name='unique_term_subjects'),
        ),
    ]

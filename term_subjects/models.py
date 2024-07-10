from django.db import models

# Create your models here.

class term_subjects(models.Model):
    session_name = models.CharField(max_length=200)
    section_name = models.CharField(max_length=200)
    class_name = models.CharField(max_length=200)
    term_name = models.CharField(max_length=200)
    subject_name = models.CharField(max_length=200)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['session_name', 'section_name', 'class_name', 'term_name', 'subject_name'], name='unique_term_subjects')
        ]

    def __str__(self):
        return self.class_name + ' ' + self.term_name + ' ' + self.subject_name
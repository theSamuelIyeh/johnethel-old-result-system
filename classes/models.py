from django.db import models
from school_sessions.models import school_sessions
from sections.models import sections
# Create your models here.

class classes(models.Model):
    session_name = models.ForeignKey(school_sessions, on_delete=models.CASCADE, to_field="session_name")
    section_name = models.CharField(max_length=200)
    class_name = models.CharField(max_length=200)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['session_name', 'section_name', 'class_name'], name='unique_class_name')
        ]

    def __str__(self):
        return self.class_name


from django.db import models
from school_sessions.models import school_sessions
# Create your models here.
class allsubjects(models.Model):
    section_name = models.CharField(choices=[('PRIMARY SECTION', 'PRIMARY SECTION'), ('NURSERY SECTION', 'NURSERY SECTION')], max_length=200)
    subject_name = models.CharField(max_length=200)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['section_name', 'subject_name'], name='unique_all_subjects')
        ]

    def __str__(self):
        return self.subject_name
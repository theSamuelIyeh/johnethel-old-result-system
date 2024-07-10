from django.db import models
from school_sessions.models import school_sessions
# Create your models here.
class sections(models.Model):
    session_name = models.ForeignKey(school_sessions, on_delete=models.CASCADE, to_field='session_name')
    section_name = models.CharField(max_length=200)

    class Meta:
        unique_together = [['session_name', 'section_name']]
        constraints = [
            models.UniqueConstraint(fields=['section_name', 'session_name'], name='unique_section')
        ]

    def __str__(self):
        return self.section_name
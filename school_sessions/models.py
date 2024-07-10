from django.db import models

# Create your models here.
class school_sessions(models.Model):
    session_name = models.CharField(max_length=200, null=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['session_name'], name='unique_session_name')
        ]
    
    def __str__(self):
        return self.session_name
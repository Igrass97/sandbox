from django.db import models

class Member(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    dob = models.DateField()
    user = models.OneToOneField('auth.User', related_name='member', on_delete=models.CASCADE)

    class Meta:
        ordering = ['last_name']

    def __str__(self):
        return self.first_name
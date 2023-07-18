from django.db import models
from members.models import Member

class Team(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    members = models.ManyToManyField(Member)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.name
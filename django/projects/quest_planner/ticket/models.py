from django.db import models
from members.models import Member


class Ticket(models.Model):
    class TicketType(models.TextChoices):
        STORY = ("ST", "Story")
        BUG = ("BU", "Bug")
        SPIKE = ("SP", "Spike")

    class StatusType(models.TextChoices):
        TODO = ("TD", "Todo")
        IN_PROGRESS = ("IP", "In Progress")
        DONE = ("DO", "Done")

    title = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    member = models.ForeignKey(
        Member, related_name="created_tickets", on_delete=models.CASCADE
    )
    assignee = models.ForeignKey(
        Member, related_name="assigned_tickets", on_delete=models.CASCADE
    )

    t_type = models.CharField(
        max_length=2,
        choices=TicketType.choices,
        default=TicketType.STORY,
    )

    t_status = models.CharField(
        max_length=2,
        choices=StatusType.choices,
        default=StatusType.TODO,
    )

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title

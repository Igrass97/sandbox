import datetime
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Ticket
from members.models import Member


class TicketSerializer(serializers.ModelSerializer):
    member = serializers.ReadOnlyField(source="member.user.username")
    assignee = serializers.ReadOnlyField(source="assignee.user.username")

    class Meta:
        model = Ticket
        fields = [
            "title",
            "created",
            "updated",
            "t_type",
            "t_status",
            "description",
            "member",
            "assignee",
            "id",
        ]

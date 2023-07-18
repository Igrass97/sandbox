from rest_framework.permissions import BasePermission

from .models import Ticket


class TicketOwnerOrAssignee(BasePermission):
    def has_permission(self, request, view):
        user_id = request.user.id
        ticket_id = view.kwargs.get("pk")
        ticket = Ticket.objects.get(id=ticket_id)
        return ticket.member.user.id == user_id or ticket.assignee.user.id == user_id

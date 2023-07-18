from django.contrib.auth.models import User

from rest_framework import permissions

from rest_framework import generics
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from ticket.models import Ticket
from ticket.serializers import TicketSerializer
from ticket.utils import get_options
from .permissions import TicketOwnerOrAssignee

from members.models import Member


class TicketList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_queryset(self):
        member_id = self.request.query_params.get("member_id")
        team_id = self.request.query_params.get("team_id")

        if member_id:
            return Ticket.objects.filter(member__id=member_id)

        if team_id:
            return Ticket.objects.filter(member__team__id=team_id)

        return Ticket.objects.all()

    def perform_create(self, serializer):
        user_id = self.request.user.id
        member = Member.objects.get(user__id=user_id)

        serializer.save(member_id=member.id, assignee_id=member.id)


class TicketDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, TicketOwnerOrAssignee]

    def get_permissions(self):
        if self.request.method == "GET":
            permission_classes = [permissions.IsAuthenticated]
        else:
            # TODO: improve permissions
            # permission_classes = [TicketOwnerOrAssignee]
            permission_classes = [permissions.IsAuthenticated]

        return [permission() for permission in permission_classes]

    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


class TicketTypes(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(get_options(Ticket.TicketType.choices))


class TicketStatuses(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(get_options(Ticket.StatusType.choices))

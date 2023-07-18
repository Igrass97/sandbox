from django.http import HttpResponse
from django.contrib.auth.models import User

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import mixins
from rest_framework import generics
from rest_framework import permissions

from members.models import Member
from members.serializers import MemberSerializer, UserSerializer

from .permissions import IsSelfMember


class MemberList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]

    queryset = Member.objects.all()
    serializer_class = MemberSerializer


class MemberDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsSelfMember]

    queryset = Member.objects.all()
    serializer_class = MemberSerializer


class UserList(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAdminUser]

    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(["GET"])
def current_user(request):
    serializer = MemberSerializer(request.user.member)
    return Response(serializer.data)

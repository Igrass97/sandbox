import datetime
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Member

from ticket.serializers import TicketSerializer

class MemberSerializer(serializers.ModelSerializer):
    assigned_tickets = TicketSerializer(many=True, read_only=True)
    created_tickets = TicketSerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password', write_only=True)

    class Meta:
        model = Member
        fields = ['id', 'first_name', 'last_name', 'dob', 'username', 'email', 'password', 'assigned_tickets', 'created_tickets']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        member = Member.objects.create(user=user, **validated_data)
        return member

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']
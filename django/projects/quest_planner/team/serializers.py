import datetime
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Team
from members.serializers import MemberSerializer

class TeamSerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['name', 'id', 'created', 'updated', 'members']

    # "Manual" way of doing it (without ModelSerializer)
    # id = serializers.IntegerField(read_only=True)
    # created = serializers.DateTimeField(read_only=True)
    # updated = serializers.DateTimeField()

    # name = serializers.CharField(max_length=100)
    # description = serializers.CharField(max_length=200)

    # def create(self, validated_data):
    #     """
    #     Create and return a new `Team` instance, given the validated data.
    #     """
    #     return Team.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     """
    #     Update and return an existing `Team` instance, given the validated data.
    #     """
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.updated = datetime.datetime.now()
    #     instance.save()
    #     return instance        
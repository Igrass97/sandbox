# Generated by Django 4.2 on 2023-04-04 10:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0001_initial'),
        ('team', '0002_remove_team_group'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='members',
            field=models.ManyToManyField(to='members.member'),
        ),
    ]
# Generated by Django 4.2 on 2023-05-02 11:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ticket', '0002_alter_ticket_asignee_alter_ticket_member'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ticket',
            old_name='asignee',
            new_name='assignee',
        ),
    ]

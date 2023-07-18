from rest_framework.permissions import BasePermission
from rest_framework.permissions import IsAdminUser

from .models import Member

class IsSelfMember(BasePermission):
    def has_permission(self, request, view):
        if getattr(request.user, 'member', None):
            logged_member_id = request.user.member.id
            requested_member_id = view.kwargs.get('pk')
            return logged_member_id == requested_member_id
        elif IsAdminUser.has_permission(self, request, view):
            return True
        
        return False
        
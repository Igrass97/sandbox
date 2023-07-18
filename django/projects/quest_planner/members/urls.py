from django.urls import include, path

from rest_framework.urlpatterns import format_suffix_patterns

from members import views

from . import views

urlpatterns = [
    path("", views.MemberList.as_view()),
    path("<int:pk>/", views.MemberDetail.as_view()),
    path("me/", views.current_user),
    path("/users/", views.MemberList.as_view()),
    path("/users/<int:pk>/", views.MemberDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

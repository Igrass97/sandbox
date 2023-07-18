from django.urls import include, path

from rest_framework.urlpatterns import format_suffix_patterns

from team import views

from . import views

urlpatterns = [
    path('', views.TeamList.as_view()),
    path('<int:pk>/', views.TeamDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

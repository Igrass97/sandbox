from django.urls import include, path

from rest_framework.urlpatterns import format_suffix_patterns

from ticket import views

from . import views

urlpatterns = [
    path("", views.TicketList.as_view()),
    path("<int:pk>/", views.TicketDetail.as_view()),
    path("types/", views.TicketTypes.as_view()),
    path("statuses/", views.TicketStatuses.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

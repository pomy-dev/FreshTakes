from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('addmenu/', views.addmenu, name='addmenu'),
    path('analytics/', views.analytics, name='analytics'),
    path('messages/', views.messages, name='messages'),
    path('allmenu/', views.allmenu, name='allmenu'),
    path('bookings/', views.bookings, name='bookings'),
]
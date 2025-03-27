from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('addmenu/', views.addmenu, name='addmenu'),
    path('analytics/', views.analytics, name='analytics'),
    path('messages/', views.messages, name='messages'),
    path('allmenu/', views.allmenu, name='allmenu'),
    path('bookings/', views.bookings, name='bookings'),
    path('updatemeal/', views.updatemeal, name='updatemeal'),
    path('deletemenu/', views.deletemenu, name='deletemenu'),
]
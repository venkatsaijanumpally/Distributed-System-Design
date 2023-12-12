from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.say_hello),
    path('review/<str:reviewer>/', views.search_reviews)
]
from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

app_name = 'reviews'

urlpatterns = [
    path('delete/<int:review_id>/', delete_review, name='delete_review'),
]

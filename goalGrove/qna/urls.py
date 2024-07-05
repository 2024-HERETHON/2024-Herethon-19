from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

app_name = 'qna'

from django.urls import path
from . import views

urlpatterns = [
    path('delete/<int:question_id>/', delete_question, name='delete_question'),
]

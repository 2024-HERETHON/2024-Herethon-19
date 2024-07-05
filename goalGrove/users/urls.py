from django.urls import path
from .views import *
from django.contrib.auth.views import LogoutView

app_name = 'users'

urlpatterns = [
    path('main/', main_view, name='main'),
    path('shop/', shop_view, name='shop'),
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('pwverification/', pwverification_view, name='pwverification'),
    path('pwreset/', pwreset_view, name='pwreset'),
    path('community/', community_view, name='community'),
]
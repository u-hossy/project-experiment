from django.urls import path
from .views import CalculateWarikanView, HealthCheckView, UserInfoView
from .views import LoginView, LogoutView, RefreshTokenView, UserInfoView

urlpatterns = [
    path("v1/calculate/", CalculateWarikanView.as_view(), name="calculate-warikan"),
    path("v1/health/", HealthCheckView.as_view(), name="health-check"),
    path("login/", LoginView.as_view(), name='login'),
    path("logout/", LogoutView.as_view(), name='logout'),
    path("refresh/", RefreshTokenView.as_view(), name="refresh"),
    path("user/", UserInfoView.as_view(), name="user")
]

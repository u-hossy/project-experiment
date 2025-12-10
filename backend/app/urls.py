<<<<<<< HEAD
from django.urls import path
from .views import CalculateWarikanView, HealthCheckView, UserInfoView
from .views import LoginView, LogoutView, RefreshTokenView, UserInfoView
=======
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CalculateWarikanView, HealthCheckView, EventsViewSet, MembersViewSet, PaymentsViewSet, ResultsViewSet

router = DefaultRouter()
router.register(r'events', EventsViewSet)
router.register(r'members', MembersViewSet)
router.register(r'payments', PaymentsViewSet)
router.register(r'results', ResultsViewSet)
>>>>>>> main

urlpatterns = [
    path("v1/calculate/", CalculateWarikanView.as_view(), name="calculate-warikan"),
    path("v1/health/", HealthCheckView.as_view(), name="health-check"),
<<<<<<< HEAD
    path("login/", LoginView.as_view(), name='login'),
    path("logout/", LogoutView.as_view(), name='logout'),
    path("refresh/", RefreshTokenView.as_view(), name="refresh"),
    path("user/", UserInfoView.as_view(), name="user")
=======
    path("v1/", include(router.urls)),
>>>>>>> main
]

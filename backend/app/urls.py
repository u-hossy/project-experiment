from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CalculateWarikanView, HealthCheckView, EventsViewSet, MembersViewSet, PaymentsViewSet, ResultsViewSet

router = DefaultRouter()
router.register(r'events', EventsViewSet)
router.register(r'members', MembersViewSet)
router.register(r'payments', PaymentsViewSet)
router.register(r'results', ResultsViewSet)

urlpatterns = [
    path("v1/calculate/", CalculateWarikanView.as_view(), name="calculate-warikan"),
    path("v1/health/", HealthCheckView.as_view(), name="health-check"),
    path("v1/", include(router.urls)),
]

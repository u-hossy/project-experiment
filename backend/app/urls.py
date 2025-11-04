from django.urls import path
from .views import CalculateWarikanView, HealthCheckView

urlpatterns = [
    path("v1/calculate/", CalculateWarikanView.as_view(), name="calculate-warikan"),
    path("v1/health/", HealthCheckView.as_view(), name="health-check"),
]

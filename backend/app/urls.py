from django.urls import path
from .views import CalculateWarikanView

urlpatterns = [
    path("calculate/", CalculateWarikanView.as_view(), name="calculate-warikan"),
]

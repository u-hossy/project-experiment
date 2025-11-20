from django.contrib import admin

# Register your models here.
from .models import Events, Members, Payments, Results
admin.site.register(Events)
admin.site.register(Members)
admin.site.register(Payments)
admin.site.register(Results)
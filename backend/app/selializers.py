from rest_framework import serializers
from .models import User

class RegisterSrializer(serializers.ModelSrializer):
    class Meta:
        model = User
        fields = ('user_id', 'password', 'nickname')
        extra_kwargs = {'password': {'write_only': True}}
        
        def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            return user
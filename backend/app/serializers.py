from rest_framework import serializers
from . import models

class MembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Members
        fields = ('id', 'event_id', 'member_id', 'name')

class PaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Payments
        fields = ('id', 'event_id', 'payment_id', 'paid_by', 'paid_for', 'amount', 'note')

class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Results
        fields = ('id', 'event_id', 'result_id', 'paid_by', 'paid_for', 'amount')

class EventsSerializer(serializers.ModelSerializer):
    members = MembersSerializer(many=True, read_only=True)
    payments = PaymentsSerializer(many=True, read_only=True)
    results = ResultsSerializer(many=True, read_only=True)

    class Meta:
        model = models.Events
        fields = (
            'id', 
            'url_end_code', 
            'created_at', 
            'members', 
            'payments', 
            'results'
        )
        # クライアント側から送信する必要がないので read_only に設定
        read_only_fields = ('id', 'url_end_code', 'created_at')
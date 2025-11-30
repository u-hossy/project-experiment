from django.db import models
import secrets
import string   # secretsとstringなかったらランダム生成作り直し

# Create your models here.
class Events(models.Model): #清算イベント全体を管理
    url_end_code = models.CharField(max_length=20, unique=True, blank=True)
    # urlの末尾につける文字列
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # 保存前にランダム文字列生成、重複していたら再作成
        if not self.url_end_code:
            while True:
                safe_kigou = "-_.~"
                alphabet = string.ascii_letters + string.digits + safe_kigou
                new_code = ''.join(secrets.choice(alphabet) for _ in range(20))
                if not Events.objects.filter(url_end_code=new_code).exists():
                    self.url_end_code = new_code
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return self.url_end_code
    
class Members(models.Model):    #メンバーテーブル
    event_id = models.ForeignKey(Events, 
                                 to_field='url_end_code', 
                                 related_name='members', 
                                 on_delete=models.CASCADE)
    member_id = models.IntegerField()
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} ({self.event_id.url_end_code})"
    

class Payments(models.Model):   #支払いテーブル
    event_id = models.ForeignKey(Events, 
                                 to_field='url_end_code', 
                                 related_name='payments', 
                                 on_delete=models.CASCADE)
    payment_id = models.IntegerField()
    paid_by = models.IntegerField()
    paid_for = models.IntegerField()
    amount = models.IntegerField()
    note = models.CharField(max_length=200, blank=True, null=True)  #メモするところ

    def __str__(self):
        return f"Payments {self.payment_id} in {self.event_id.url_end_code}"
    

class Results(models.Model):    #結果テーブル
    event_id = models.ForeignKey(Events, 
                                 to_field='url_end_code', 
                                 related_name='results', 
                                 on_delete=models.CASCADE)
    result_id = models.IntegerField()
    paid_by = models.IntegerField()
    paid_for = models.IntegerField()
    amount = models.IntegerField()

    def __str__(self):
        return f"Results {self.result_id} in {self.event_id.url_end_code}"

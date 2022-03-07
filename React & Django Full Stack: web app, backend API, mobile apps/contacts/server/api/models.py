from django.db import models
import uuid


class Contact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email_1 = models.EmailField(unique=True)
    phone_1 = models.CharField(
        max_length=20, blank=True, null=True, default=None)
    address_one = models.CharField(
        max_length=100, blank=True, null=True, default=None)
    address_two = models.CharField(
        max_length=100, blank=True, null=True, default=None)
    post_code = models.CharField(
        max_length=100, blank=True, null=True, default=None)
    city = models.CharField(max_length=50, blank=True, null=True, default=None)

    def __str__(self):
        return self.email_1


class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=32)
    contact_1 = models.OneToOneField(
        Contact, on_delete=models.CASCADE, blank=True, null=True, default=None)

    # class Meta:
    #     unique_together = ('username', 'contact_1')

    def __str__(self):
        return self.username

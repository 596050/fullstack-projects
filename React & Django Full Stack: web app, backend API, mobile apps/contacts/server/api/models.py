from django.db import models


class Contact(models.Model):
    email_1 = models.EmailField(unique=True)
    phone_1 = models.CharField(
        max_length=20, blank=True, null=True, default=None)
    address_one = models.CharField(
        max_length=100, blank=True, null=True, default=None)
    address_two = models.CharField(
        max_length=100, blank=True, null=True, default=None)
    city = models.CharField(max_length=50, blank=True, null=True, default=None)
    state = models.CharField(max_length=2, blank=True, null=True, default=None)


class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=32)
    contact_1 = models.ForeignKey(Contact, on_delete=models.CASCADE)

from django.db import models
import uuid

# Create your models here.
class Meta(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Person(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    meta = models.ForeignKey(Meta, blank=True, null=True,  on_delete=models.CASCADE)

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    desc = models.TextField(max_length=1000, blank=True, null=True, default=None)
    meta = models.ForeignKey(Meta, blank=True, null=True,  on_delete=models.CASCADE)

class Contact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email_1 = models.EmailField()
    phone_1 = models.CharField(max_length=20, blank=True, null=True, default=None)
    address_one = models.CharField(max_length=100, blank=True, null=True, default=None)
    address_two = models.CharField(max_length=100, blank=True, null=True, default=None)
    city = models.CharField(max_length=50, blank=True, null=True, default=None)
    state = models.CharField(max_length=2, blank=True, null=True, default=None)
    owner = models.ForeignKey(Person, on_delete=models.DO_NOTHING)
    meta = models.ForeignKey(Meta, blank=True, null=True, on_delete=models.CASCADE)

class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=80, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    contact_1 = models.ForeignKey(Contact, on_delete=models.CASCADE)
    meta = models.ForeignKey(Meta, blank=True, null=True,  on_delete=models.CASCADE)

class Book(models.Model):
    title = models.CharField(max_length=36)
    desc = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
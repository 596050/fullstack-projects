from importlib.resources import files
from django.contrib import admin
from .models import Person, User, Contact, Account, Book


@admin.register(Person)
class Person(admin.ModelAdmin):
    search_fields = ['first_name', 'last_name']
    fields = [
        'first_name',
        'last_name',
    ]


@admin.register(User)
class User(admin.ModelAdmin):
    search_fields = ['person']
    fields = [
        'person',
        'desc',
    ]


@admin.register(Contact)
class Contact(admin.ModelAdmin):
    search_fields = ['email_1']
    fields = [
        'email_1',
        'phone_1',
        'address_one',
        'address_two',
        'city',
        'state',
        'owner',
    ]


@admin.register(Account)
class Account(admin.ModelAdmin):
    search_fields = ['username', 'owner']
    fields = ['owner', 'username', 'contact_1']


@admin.register(Book)
class Book(admin.ModelAdmin):
    list_display = ['title', 'desc']
    fields = ['title', 'desc']

from django.contrib import admin
from .models import Person, User, Contact, Account, Book

# Register your models here.
admin.site.register(Book)
admin.site.register(Person)
admin.site.register(User)
admin.site.register(Contact)
admin.site.register(Account)
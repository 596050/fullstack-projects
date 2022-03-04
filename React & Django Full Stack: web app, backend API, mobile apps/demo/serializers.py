from rest_framework import serializers
from .models import User, Contact, Account, Person


class PersonSerializer(serializers.Serializer):
    class Meta:
        model = Person
        fields = ['id', 'person', 'desc']


class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['id', 'person', 'desc']


class ContactSerializer(serializers.Serializer):
    class Meta:
        model = Contact
        fields = ['id', 'person', 'desc']


class AccountSerializer(serializers.Serializer):
    class Meta:
        model = Account
        fields = ['id', 'person', 'desc']

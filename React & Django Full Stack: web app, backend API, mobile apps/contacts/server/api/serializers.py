from http.client import HTTPResponse
from rest_framework import serializers
from .models import User, Contact
import uuid


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = [
            'id',
            "email_1",
            "phone_1",
            "address_one",
            "address_two",
            "post_code",
            "city"
        ]


class UserSerializer(serializers.ModelSerializer):
    contact_1 = ContactSerializer()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            "first_name",
            "last_name",
            "contact_1"
        ]

    def create(self, validated_data):
        contact_1 = validated_data.pop('contact_1', None)
        contact = Contact.objects.create(**contact_1)
        instance = User.objects.create(contact_1=contact, **validated_data)
        contact.save()
        return instance

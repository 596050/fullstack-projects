from rest_framework import serializers
from .models import User, Contact


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

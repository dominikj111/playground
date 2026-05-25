"""
Serializers are like DTOs (Data Transfer Objects) or validation schemas in TypeScript.

They handle:
1. Serialization: Model instance → JSON
2. Deserialization: JSON → Model instance
3. Validation: Similar to Joi, Yup, or Zod in TypeScript

Think of them as the schema layer between your database and API.
"""

from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model.
    
    ModelSerializer automatically creates fields based on the model.
    Similar to auto-generating TypeScript interfaces from your database schema.
    """
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration with password validation.
    
    This demonstrates custom validation and field handling.
    """
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name']
    
    def validate(self, data):
        """
        Custom validation - similar to custom validators in Express/TypeScript.
        Called automatically by DRF.
        """
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({
                'password_confirm': 'Passwords do not match.'
            })
        return data
    
    def create(self, validated_data):
        """
        Create and return a new user instance with hashed password.
        This is called when serializer.save() is invoked.
        """
        # Remove password_confirm from the data
        validated_data.pop('password_confirm')
        
        # Create user with hashed password (best practice)
        user = User.objects.create_user(**validated_data)
        return user


# Example of a simple serializer (without a model)
class MessageSerializer(serializers.Serializer):
    """
    Simple serializer for demonstration - not tied to a database model.
    Similar to defining a DTO interface in TypeScript.
    """
    message = serializers.CharField(max_length=500)
    timestamp = serializers.DateTimeField(read_only=True)
    user = serializers.CharField(max_length=100, required=False)
    
    def validate_message(self, value):
        """Field-level validation example"""
        if len(value.strip()) == 0:
            raise serializers.ValidationError("Message cannot be empty.")
        return value


# Example for future use when you create models
# class TaskSerializer(serializers.ModelSerializer):
#     """
#     Serializer for Task model (when uncommented in models.py)
#     """
#     class Meta:
#         model = Task
#         fields = ['id', 'title', 'description', 'status', 'created_at', 'updated_at']
#         read_only_fields = ['id', 'created_at', 'updated_at']

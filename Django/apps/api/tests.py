"""
Tests for the API app.

Django has built-in testing framework based on unittest.
Similar to Jest/Mocha in JavaScript or PHPUnit in PHP.
"""

from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status


class UserRegistrationTestCase(APITestCase):
    """Test user registration endpoint"""
    
    def test_user_registration(self):
        """Test that users can register successfully"""
        url = '/api/register/'
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'password_confirm': 'testpass123',
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')
    
    def test_registration_password_mismatch(self):
        """Test that registration fails with mismatched passwords"""
        url = '/api/register/'
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'password_confirm': 'different',
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class JWTAuthenticationTestCase(APITestCase):
    """Test JWT authentication"""
    
    def setUp(self):
        """Create a test user"""
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
    
    def test_obtain_token(self):
        """Test obtaining JWT token"""
        url = '/api/token/'
        data = {
            'username': 'testuser',
            'password': 'testpass123',
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
    
    def test_protected_endpoint_without_token(self):
        """Test that protected endpoints require authentication"""
        url = '/api/protected/'
        
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_protected_endpoint_with_token(self):
        """Test accessing protected endpoint with valid token"""
        # Get token
        token_url = '/api/token/'
        token_data = {
            'username': 'testuser',
            'password': 'testpass123',
        }
        token_response = self.client.post(token_url, token_data, format='json')
        access_token = token_response.data['access']
        
        # Access protected endpoint
        url = '/api/protected/'
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# Run tests with:
# python manage.py test

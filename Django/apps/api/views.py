"""
Views handle HTTP requests and return responses.

Django REST Framework provides several view classes:
1. APIView - Basic class-based view (like Express route handlers)
2. ViewSets - Combines logic for CRUD operations (like resource controllers in PHP/Laravel)
3. Generic Views - Pre-built views for common patterns

ViewSets are the most powerful and Pythonic way to build REST APIs.
"""

from datetime import datetime
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView

from .serializers import (
    UserSerializer,
    UserRegistrationSerializer,
    MessageSerializer,
)


# ============================================================================
# VIEWSETS - The DRF way (Recommended)
# ============================================================================

class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for User CRUD operations.
    
    Automatically provides:
    - GET /api/users/ - List all users (list)
    - POST /api/users/ - Create user (create)
    - GET /api/users/{id}/ - Get specific user (retrieve)
    - PUT /api/users/{id}/ - Update user (update)
    - PATCH /api/users/{id}/ - Partial update (partial_update)
    - DELETE /api/users/{id}/ - Delete user (destroy)
    
    Similar to:
    - Express: router.route('/users').get().post()
    - Laravel: Route::resource('users', UserController::class)
    - ColdFusion: RESTful component with CRUD methods
    """
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Customize the queryset - like adding WHERE clauses in SQL.
        This method is called for list and retrieve actions.
        """
        queryset = super().get_queryset()
        
        # Example: Filter by username (query parameter)
        username = self.request.query_params.get('username', None)
        if username:
            queryset = queryset.filter(username__icontains=username)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """
        Custom endpoint: GET /api/users/me/
        Returns the current authenticated user.
        
        @action decorator creates custom routes beyond standard CRUD.
        detail=False means it's a list-level action (no ID needed)
        detail=True would be for specific instances (e.g., /api/users/{id}/custom/)
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def activate(self, request, pk=None):
        """
        Custom endpoint: POST /api/users/{id}/activate/
        Example of a custom action on a specific user.
        
        detail=True means it works on a specific instance.
        """
        user = self.get_object()
        user.is_active = True
        user.save()
        return Response({'status': 'user activated'})


# ============================================================================
# FUNCTION-BASED VIEWS - Simple and straightforward
# ============================================================================

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """
    Function-based view for user registration.
    POST /api/register/
    
    Similar to:
    - Express: app.post('/register', (req, res) => {...})
    - PHP: if ($_SERVER['REQUEST_METHOD'] === 'POST') {...}
    
    Function-based views are simpler for one-off endpoints.
    """
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {
                'message': 'User created successfully',
                'user': UserSerializer(user).data
            },
            status=status.HTTP_201_CREATED
        )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def public_endpoint(request):
    """
    Public endpoint example - no authentication required.
    GET /api/public/
    """
    return Response({
        'message': 'This is a public endpoint',
        'timestamp': datetime.now().isoformat(),
    })


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def protected_endpoint(request):
    """
    Protected endpoint - requires authentication (JWT token).
    GET/POST /api/protected/
    
    Access: Include header "Authorization: Bearer <access_token>"
    """
    if request.method == 'GET':
        return Response({
            'message': f'Hello {request.user.username}!',
            'user_id': request.user.id,
            'email': request.user.email,
        })
    
    elif request.method == 'POST':
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            return Response({
                'message': 'Data received',
                'data': serializer.validated_data,
                'user': request.user.username,
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ============================================================================
# CLASS-BASED VIEWS - More structure than functions
# ============================================================================

class HealthCheckView(APIView):
    """
    Health check endpoint for monitoring.
    GET /api/health/
    
    Class-based views give more control than function-based,
    but less magic than ViewSets.
    
    Similar to Express class-based controllers or PHP classes.
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Handle GET requests"""
        return Response({
            'status': 'healthy',
            'timestamp': datetime.now().isoformat(),
            'service': 'Django REST API',
        })


class EchoView(APIView):
    """
    Echo endpoint - returns whatever you send.
    POST /api/echo/
    
    Useful for testing and demonstrating request/response cycle.
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        """Echo back the request data"""
        return Response({
            'echo': request.data,
            'headers': {
                'content-type': request.content_type,
                'user-agent': request.META.get('HTTP_USER_AGENT', 'Unknown'),
            },
            'method': request.method,
        })

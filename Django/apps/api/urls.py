"""
URL routing for the API app.

This demonstrates both manual routing and automatic router-based routing.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

# ============================================================================
# ROUTER - Automatic URL generation for ViewSets
# ============================================================================
# DefaultRouter automatically creates URLs for all ViewSet actions:
# - list, create, retrieve, update, partial_update, destroy
# - Plus any custom @action decorated methods
#
# Similar to:
# - Express: router.use('/users', userRouter)
# - Laravel: Route::apiResource('users', UserController::class)

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')

# If you had more ViewSets, register them here:
# router.register(r'tasks', views.TaskViewSet, basename='task')
# router.register(r'products', views.ProductViewSet, basename='product')


# ============================================================================
# URL PATTERNS - Manual routing for function-based and class-based views
# ============================================================================
urlpatterns = [
    # Include router URLs - this gives us:
    # GET    /api/users/          -> List users
    # POST   /api/users/          -> Create user
    # GET    /api/users/{id}/     -> Get specific user
    # PUT    /api/users/{id}/     -> Update user
    # PATCH  /api/users/{id}/     -> Partial update
    # DELETE /api/users/{id}/     -> Delete user
    # GET    /api/users/me/       -> Current user (custom action)
    # POST   /api/users/{id}/activate/ -> Activate user (custom action)
    path('', include(router.urls)),
    
    # Function-based views
    path('register/', views.register_user, name='register'),
    path('public/', views.public_endpoint, name='public'),
    path('protected/', views.protected_endpoint, name='protected'),
    
    # Class-based views
    path('health/', views.HealthCheckView.as_view(), name='health'),
    path('echo/', views.EchoView.as_view(), name='echo'),
]

# The complete API structure will be:
# /api/token/                  -> JWT login (from main urls.py)
# /api/token/refresh/          -> JWT refresh (from main urls.py)
# /api/users/                  -> User CRUD (from router)
# /api/users/me/               -> Current user
# /api/register/               -> User registration
# /api/public/                 -> Public endpoint
# /api/protected/              -> Protected endpoint (requires auth)
# /api/health/                 -> Health check
# /api/echo/                   -> Echo service

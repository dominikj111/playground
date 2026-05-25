"""
URL Configuration for the project.

Similar to Express router setup:
- Main urls.py is like your main app.js with routes
- Each app can have its own urls.py (like separate route files)
- DRF routers automatically generate CRUD routes (like resourceful routes in Express)
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from apps.api.page_views import home_view

urlpatterns = [
    # Home page - HTML rendered view
    path('', home_view, name='home'),
    
    # Django admin - built-in admin interface
    path('admin/', admin.site.urls),
    
    # JWT Authentication endpoints
    # POST /api/token/ with {username, password} returns {access, refresh}
    # POST /api/token/refresh/ with {refresh} returns new {access}
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # API routes - delegated to api app
    path('api/', include('apps.api.urls')),
]

# Serve static and media files in development
# In production, use nginx or similar (like in PHP/Node.js deployments)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

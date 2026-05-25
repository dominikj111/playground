"""
Middleware - Django's version of interceptors/middleware in Express.

Middleware processes requests BEFORE they reach views and responses AFTER views return.

Request flow:
Client → Middleware (process_request) → View → Middleware (process_response) → Client

This is similar to:
- Express: app.use((req, res, next) => {...})
- PHP: Middleware in Laravel/Symfony
- ColdFusion: Application.cfc onRequestStart/onRequestEnd

Each middleware must call get_response(request) to pass to the next middleware.
"""

import logging
import time
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)


class RequestLoggingMiddleware(MiddlewareMixin):
    """
    Logs information about each request and response.
    
    Similar to Morgan in Express or logging middleware in other frameworks.
    This demonstrates the most common middleware pattern.
    """
    
    def process_request(self, request):
        """
        Called before the view is executed.
        
        Similar to Express:
        app.use((req, res, next) => {
            console.log('Request received');
            next();
        });
        """
        # Store request start time
        request.start_time = time.time()
        
        # Log request details
        logger.info(
            f"[REQUEST] {request.method} {request.path} "
            f"from {self.get_client_ip(request)}"
        )
        
        # You can also modify the request here
        # request.custom_attribute = 'value'
        
        return None  # Continue to next middleware/view
    
    def process_response(self, request, response):
        """
        Called after the view is executed.
        
        Similar to Express:
        app.use((req, res, next) => {
            res.on('finish', () => {
                console.log('Response sent');
            });
            next();
        });
        """
        # Calculate request duration
        if hasattr(request, 'start_time'):
            duration = time.time() - request.start_time
            duration_ms = int(duration * 1000)
        else:
            duration_ms = 0
        
        # Log response details
        logger.info(
            f"[RESPONSE] {request.method} {request.path} "
            f"{response.status_code} - {duration_ms}ms"
        )
        
        # You can modify the response here
        # response['X-Custom-Header'] = 'value'
        
        return response
    
    def process_exception(self, request, exception):
        """
        Called when a view raises an exception.
        
        Similar to Express error handling middleware:
        app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).send('Error');
        });
        """
        logger.error(
            f"[EXCEPTION] {request.method} {request.path} - {str(exception)}",
            exc_info=True
        )
        
        # Return None to let Django's default exception handler take over
        return None
    
    @staticmethod
    def get_client_ip(request):
        """Get the client's IP address from the request"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class AuthenticationLoggingMiddleware(MiddlewareMixin):
    """
    Example middleware that logs authentication information.
    Demonstrates accessing user information in middleware.
    """
    
    def process_request(self, request):
        """Log authentication status"""
        if request.user.is_authenticated:
            logger.debug(f"Authenticated user: {request.user.username}")
        else:
            logger.debug("Anonymous user")
        
        return None


class CustomHeaderMiddleware(MiddlewareMixin):
    """
    Example middleware that adds custom headers to all responses.
    
    Useful for:
    - API versioning headers
    - Custom security headers
    - Response metadata
    """
    
    def process_response(self, request, response):
        """Add custom headers to response"""
        response['X-API-Version'] = '1.0'
        response['X-Powered-By'] = 'Django REST Framework'
        
        return response


# ============================================================================
# Modern Django Middleware (Functional style - Django 1.10+)
# ============================================================================

def simple_middleware(get_response):
    """
    Modern functional middleware style.
    
    This is closer to Express middleware pattern:
    function middleware(req, res, next) {
        // before view
        const response = next();
        // after view
        return response;
    }
    """
    
    # One-time configuration and initialization
    # This code runs when Django starts up
    print("Middleware initialized")
    
    def middleware(request):
        # Code to be executed for each request BEFORE the view
        # This is like the 'next()' call in Express
        
        # Add custom attribute to request
        request.custom_data = {'initialized': True}
        
        # Call the next middleware or view
        response = get_response(request)
        
        # Code to be executed for each request AFTER the view
        # This is like code after 'next()' in Express
        
        return response
    
    return middleware


# ============================================================================
# How to use these middleware:
# ============================================================================
# Add to MIDDLEWARE in config/settings.py:
#
# MIDDLEWARE = [
#     ...
#     'apps.api.middleware.RequestLoggingMiddleware',
#     'apps.api.middleware.AuthenticationLoggingMiddleware',
#     'apps.api.middleware.CustomHeaderMiddleware',
#     ...
# ]
#
# Order matters! Middleware is processed top-to-bottom for requests,
# and bottom-to-top for responses.

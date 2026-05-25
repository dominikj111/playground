"""
Views for rendering HTML pages (traditional Django views).

This demonstrates how to serve HTML pages alongside your REST API.
Think of these as your "view" layer in MVC (like Blade in Laravel, or EJS in Express).
"""

from django.shortcuts import render
from django.views.generic import TemplateView


def home_view(request):
    """
    Function-based view that renders an HTML template.
    
    Similar to:
    - Express: res.render('home', { data })
    - PHP: include 'home.php'; or use Blade/Twig
    - ColdFusion: <cfinclude template="home.cfm">
    """
    context = {
        'title': 'Django REST API',
        'user': request.user,
    }
    return render(request, 'home.html', context)


class HomeView(TemplateView):
    """
    Class-based view for rendering templates.
    
    More structured than function-based views.
    Good for reusable, complex page logic.
    """
    template_name = 'home.html'
    
    def get_context_data(self, **kwargs):
        """Add extra context to the template"""
        context = super().get_context_data(**kwargs)
        context['title'] = 'Django REST API'
        return context

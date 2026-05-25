# Django Admin Configuration
# This file allows you to customize the Django admin interface

from django.contrib import admin
from django.contrib.auth.models import User

# You can customize how models appear in the admin
# Example (uncomment when you have models):

# from .models import Task

# @admin.register(Task)
# class TaskAdmin(admin.ModelAdmin):
#     list_display = ['title', 'status', 'created_at']
#     list_filter = ['status', 'created_at']
#     search_fields = ['title', 'description']
#     ordering = ['-created_at']

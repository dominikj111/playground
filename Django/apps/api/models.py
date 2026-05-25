"""
Models define your database schema (like entities or database models in TypeScript/PHP).

For now, we're using Django's built-in User model.
When you need custom models, define them here.

Example:
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
"""

from django.db import models

# Example model (commented out - uncomment when you want to use it)
# class Task(models.Model):
#     """Example Task model to demonstrate Django ORM"""
#     
#     # Status choices (enum-like in Django)
#     class Status(models.TextChoices):
#         TODO = 'TODO', 'To Do'
#         IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
#         DONE = 'DONE', 'Done'
#     
#     title = models.CharField(max_length=200)
#     description = models.TextField(blank=True)
#     status = models.CharField(
#         max_length=20,
#         choices=Status.choices,
#         default=Status.TODO
#     )
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     
#     class Meta:
#         ordering = ['-created_at']
#         verbose_name_plural = 'Tasks'
#     
#     def __str__(self):
#         return self.title

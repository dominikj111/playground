#!/bin/bash

# Quick start script for Django REST API project
# Run this script to set up and start the development server

echo "🚀 Django REST API - Quick Start"
echo "================================"
echo ""

# Check if conda is installed
if ! command -v conda &> /dev/null; then
    echo "❌ Error: Conda is not installed or not in PATH"
    echo "Please install Miniconda first: https://docs.conda.io/en/latest/miniconda.html"
    exit 1
fi

echo "✅ Conda found"

# Check if environment exists
if conda env list | grep -q "django-api"; then
    echo "✅ Environment 'django-api' already exists"
else
    echo "📦 Creating conda environment..."
    conda env create -f environment.yml
fi

echo ""
echo "🔧 Activating environment..."
source "$(conda info --base)/etc/profile.d/conda.sh"
conda activate django-api

echo ""
echo "📄 Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🗄️  Running database migrations..."
python manage.py migrate

echo ""
echo "👤 Create a superuser for admin access"
echo "You can skip this if you already have one (Ctrl+C)"
python manage.py createsuperuser

echo ""
echo "✅ Setup complete!"
echo ""
echo "🌐 Starting development server..."
echo "   Visit: http://localhost:8000/"
echo "   Admin: http://localhost:8000/admin/"
echo "   API:   http://localhost:8000/api/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python manage.py runserver

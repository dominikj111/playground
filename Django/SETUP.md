# SETUP GUIDE

## Quick Start (Step by Step)

### 1. Create and Activate Conda Environment

```bash
# Navigate to project directory
cd "/Volumes/WORKING/Development/playground/Django"

# Create conda environment
conda env create -f environment.yml

# Activate environment
conda activate django-api
```

### 2. Set Up Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# The .env file is already configured for development
# You can keep the defaults for now
```

### 3. Initialize Database

```bash
# Run migrations (creates database tables)
python manage.py migrate

# Create admin user (follow prompts)
python manage.py createsuperuser
# Enter username: admin
# Enter email: admin@example.com
# Enter password: (your secure password)
```

### 4. Start Development Server

```bash
# Start the server
python manage.py runserver

# Server will start at: http://localhost:8000/
```

### 5. Test the Application

Open your browser and visit:

1. **Home Page**: http://localhost:8000/
   - Beautiful API documentation page
   
2. **Django Admin**: http://localhost:8000/admin/
   - Login with superuser credentials
   - Manage users, view data
   
3. **Browsable API**: http://localhost:8000/api/
   - Interactive API documentation
   - Test endpoints directly in browser

### 6. Test API Endpoints

#### Using cURL:

```bash
# 1. Register a new user
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepass123",
    "password_confirm": "securepass123"
  }'

# 2. Get JWT token (login)
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepass123"
  }'

# Copy the "access" token from response

# 3. Access protected endpoint
curl -X GET http://localhost:8000/api/users/me/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"

# 4. Test public endpoint
curl http://localhost:8000/api/public/

# 5. Test health check
curl http://localhost:8000/api/health/
```

#### Using Python requests:

```python
import requests

# 1. Register
response = requests.post('http://localhost:8000/api/register/', json={
    'username': 'johndoe',
    'email': 'john@example.com',
    'password': 'securepass123',
    'password_confirm': 'securepass123'
})
print(response.json())

# 2. Login
response = requests.post('http://localhost:8000/api/token/', json={
    'username': 'johndoe',
    'password': 'securepass123'
})
tokens = response.json()
access_token = tokens['access']

# 3. Get current user
headers = {'Authorization': f'Bearer {access_token}'}
response = requests.get('http://localhost:8000/api/users/me/', headers=headers)
print(response.json())
```

## What to Explore

1. **Code Structure**:
   - Check out `apps/api/views.py` for ViewSets
   - Look at `apps/api/serializers.py` for validation
   - See `apps/api/middleware.py` for interceptors
   - Read `config/settings.py` for configuration

2. **Django Admin**:
   - Visit http://localhost:8000/admin/
   - Manage users through the interface
   - See how Django auto-generates admin UI

3. **Browsable API**:
   - Visit http://localhost:8000/api/users/
   - Test API directly from browser
   - See automatic documentation

4. **Run Tests**:
   ```bash
   python manage.py test
   ```

## Common Issues

### Port Already in Use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or run on different port
python manage.py runserver 8080
```

### Conda Environment Not Found
```bash
# Make sure you're in the project directory
cd "/Volumes/WORKING/Development/playground/Django"

# Recreate environment
conda env create -f environment.yml --force
```

### Import Errors
```bash
# Make sure environment is activated
conda activate django-api

# Reinstall dependencies
conda env update -f environment.yml
```

## Next Steps

1. **Add Your Own Models**: Edit `apps/api/models.py`
2. **Create Migrations**: `python manage.py makemigrations`
3. **Apply Migrations**: `python manage.py migrate`
4. **Add to Admin**: Edit `apps/api/admin.py`
5. **Create Serializers**: Edit `apps/api/serializers.py`
6. **Create ViewSets**: Edit `apps/api/views.py`
7. **Register Routes**: Edit `apps/api/urls.py`

## Development Workflow

```bash
# 1. Activate environment
conda activate django-api

# 2. Start development server
python manage.py runserver

# 3. Make changes to code (server auto-reloads)

# 4. If you change models:
python manage.py makemigrations
python manage.py migrate

# 5. Run tests
python manage.py test

# 6. Open Django shell to experiment
python manage.py shell
```

Enjoy building with Django! 🚀

# Django REST API with JWT Authentication

A production-ready Django REST Framework project demonstrating best practices, JWT authentication, and common patterns for developers coming from PHP, ColdFusion, or TypeScript/Express backgrounds.

## 🎯 Features

- ✅ **Django REST Framework (DRF)** - Modern REST API framework
- ✅ **JWT Authentication** - Token-based authentication with refresh tokens
- ✅ **ViewSets & Routers** - Automatic CRUD endpoint generation
- ✅ **Serializers** - Data validation and transformation (like DTOs)
- ✅ **CORS Configuration** - Ready for frontend integration
- ✅ **Middleware** - Request/response interceptors (like Express middleware)
- ✅ **Template Rendering** - HTML page rendering alongside API
- ✅ **Best Practices** - Follows Django conventions and idiomatic Python

## 📁 Project Structure

```
Django/
├── config/                 # Project configuration (like 'app/' in Express)
│   ├── settings.py        # All settings (database, middleware, apps, etc.)
│   ├── urls.py            # Main URL routing
│   ├── wsgi.py            # Production server entry point
│   └── asgi.py            # Async server entry point
│
├── apps/                   # Your applications (like 'src/' or 'modules/')
│   └── api/               # Main API app
│       ├── models.py      # Database models (ORM entities)
│       ├── serializers.py # Data validation & transformation (DTOs)
│       ├── views.py       # API endpoints (ViewSets, APIView)
│       ├── urls.py        # API routing
│       ├── middleware.py  # Custom interceptors
│       └── page_views.py  # HTML page rendering
│
├── templates/             # HTML templates (like 'views/' in Express)
│   ├── base.html          # Base template (layout)
│   └── home.html          # Home page
│
├── static/                # PUBLIC FOLDER - CSS, JS, images
│   ├── css/
│   ├── js/
│   └── images/
│
├── staticfiles/           # Collected static files (production)
├── media/                 # User uploads (like 'uploads/' folder)
│
├── environment.yml        # Conda dependencies
├── .env.example          # Environment variables template
├── .gitignore
├── manage.py             # Django CLI tool
└── README.md
```

## 🔑 Key Concepts for PHP/Express Developers

### Django vs Express/PHP Comparison

| Concept | Django | Express/TypeScript | PHP/Laravel |
|---------|--------|-------------------|-------------|
| **Routing** | `urls.py` with `path()` | `app.get()`, `router.use()` | `routes/web.php` |
| **Controllers** | Views (functions/classes) | Route handlers/Controllers | Controllers |
| **Middleware** | Middleware classes | `app.use()` | Middleware |
| **Models** | ORM Models | TypeORM/Sequelize | Eloquent Models |
| **Validation** | Serializers | Joi/Zod/class-validator | Form Requests |
| **Templates** | Django Templates | EJS/Pug | Blade |
| **Config** | `settings.py` | `.env` + config files | `config/` folder |

### Public vs Private Code

**PUBLIC (Accessible via HTTP):**
- `static/` - CSS, JavaScript, images (like `public/` in Express)
- `media/` - User uploads (configured in settings)
- Served directly by web server in production

**PRIVATE (Not directly accessible):**
- `apps/` - Your Python code (models, views, serializers)
- `config/` - Project configuration
- `templates/` - Server-side templates (rendered to HTML)
- Everything else in the project

Only URLs defined in `urls.py` are accessible. Everything else is private by default.

## 🚀 Quick Start

### 1. Create Conda Environment

```bash
# Create environment from environment.yml
conda env create -f environment.yml

# Activate environment
conda activate django-api
```

### 2. Set Up Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your settings (SECRET_KEY, DEBUG, etc.)
```

### 3. Run Migrations

```bash
# Create database tables (even for SQLite, you need to run this)
python manage.py migrate

# Create a superuser for admin access
python manage.py createsuperuser
```

### 4. Start Development Server

```bash
python manage.py runserver
```

Visit:
- **Home Page**: http://localhost:8000/
- **API Root**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

## 🔐 Authentication Flow

### 1. Register a New User

```bash
POST http://localhost:8000/api/register/
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123",
  "password_confirm": "securepass123",
  "first_name": "John",
  "last_name": "Doe"
}
```

### 2. Get JWT Token

```bash
POST http://localhost:8000/api/token/
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepass123"
}

# Response:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### 3. Use Token for Protected Endpoints

```bash
GET http://localhost:8000/api/users/me/
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### 4. Refresh Token (when access token expires)

```bash
POST http://localhost:8000/api/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

## 📡 API Endpoints

### Authentication
- `POST /api/token/` - Login (get access & refresh tokens)
- `POST /api/token/refresh/` - Refresh access token
- `POST /api/token/verify/` - Verify token validity
- `POST /api/register/` - Register new user (public)

### Users (ViewSet - Auto-generated CRUD)
- `GET /api/users/` - List users
- `POST /api/users/` - Create user
- `GET /api/users/{id}/` - Get specific user
- `PUT /api/users/{id}/` - Update user
- `PATCH /api/users/{id}/` - Partial update
- `DELETE /api/users/{id}/` - Delete user
- `GET /api/users/me/` - Get current user (custom action)

### Utility
- `GET /api/public/` - Public endpoint (no auth)
- `GET /api/protected/` - Protected endpoint (requires JWT)
- `GET /api/health/` - Health check
- `POST /api/echo/` - Echo service

## 🛠️ Middleware (Interceptors)

Django middleware works like Express middleware:

**Express Example:**
```javascript
app.use((req, res, next) => {
  console.log('Request received');
  next();
});
```

**Django Equivalent:**
```python
class RequestLoggingMiddleware:
    def process_request(self, request):
        print('Request received')
        return None  # Continue to next middleware
```

See [apps/api/middleware.py](apps/api/middleware.py) for examples.

## 💾 Database Setup (For Future Use)

Currently using SQLite (no setup needed). To use PostgreSQL or MySQL:

### PostgreSQL

1. **Install psycopg2:**
```bash
conda install -c conda-forge psycopg2
```

2. **Update `.env`:**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

3. **Update `settings.py`:**
Uncomment the PostgreSQL database configuration.

4. **Run migrations:**
```bash
python manage.py migrate
```

### MySQL

```bash
conda install -c conda-forge mysqlclient
```

Update database settings in `settings.py` to:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

## 📧 Email Configuration (For Future Use)

Django's email system is similar to PHP's `mail()` or Node.js's nodemailer.

### Development (Console Backend)
Already configured! Emails print to console.

### Production (SMTP)

1. **Update `.env`:**
```env
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@example.com
```

2. **Send email in code:**
```python
from django.core.mail import send_mail

send_mail(
    'Subject here',
    'Here is the message.',
    'from@example.com',
    ['to@example.com'],
    fail_silently=False,
)
```

### Gmail Setup
1. Enable 2FA on your Google account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the app password in `EMAIL_HOST_PASSWORD`

## 🐳 Docker Setup (For Future Use)

Create `Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

COPY environment.yml .
RUN pip install --no-cache-dir -r <(grep -v "^#" environment.yml | grep pip: -A 100 | grep -E "^\s+-\s+" | sed 's/^[[:space:]]*-[[:space:]]*//')

COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: django_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run:
```bash
docker-compose up
```

## 🔧 Common Django Commands

```bash
# Create new app
python manage.py startapp myapp

# Create migrations (after model changes)
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Open Python shell with Django context
python manage.py shell

# Collect static files for production
python manage.py collectstatic

# Run tests
python manage.py test
```

## 📚 Django Patterns Explained

### ViewSets vs Views

**ViewSets** (Recommended for CRUD):
```python
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Automatically creates: list, create, retrieve, update, destroy
```

**Function-based Views** (Simple endpoints):
```python
@api_view(['GET'])
def hello(request):
    return Response({'message': 'Hello!'})
```

**Class-based Views** (More control):
```python
class HelloView(APIView):
    def get(self, request):
        return Response({'message': 'Hello!'})
```

### Serializers (Like DTOs in TypeScript)

```python
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        read_only_fields = ['id']
    
    def validate_email(self, value):
        # Custom validation
        if not value.endswith('@example.com'):
            raise serializers.ValidationError('Must use example.com')
        return value
```

### Routers (Auto-generate URLs)

```python
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet)

# Automatically creates:
# /users/ - GET (list), POST (create)
# /users/{id}/ - GET (retrieve), PUT (update), DELETE (destroy)
```

## 🎨 Adding React/Vue Frontend (Future)

When you're ready to add a frontend:

1. **CORS is already configured** in `settings.py`
2. **Run React on port 3000**, Django on 8000
3. **Make API calls** to `http://localhost:8000/api/`
4. **Use JWT token** in Authorization header

Example with fetch:
```javascript
const response = await fetch('http://localhost:8000/api/users/me/', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }
});
```

## 📖 Learning Resources

- **Django Docs**: https://docs.djangoproject.com/
- **DRF Docs**: https://www.django-rest-framework.org/
- **JWT Docs**: https://django-rest-framework-simplejwt.readthedocs.io/

## 🤝 Coming from Other Frameworks?

### PHP/Laravel Developers
- Models = Eloquent Models
- Serializers = Form Requests + Resources
- ViewSets = Resource Controllers
- Middleware = Middleware
- `settings.py` = `config/` folder

### Express/TypeScript Developers
- `urls.py` = Router files
- Views = Route handlers
- Middleware = `app.use()` middleware
- Serializers = Joi/Zod validators
- `settings.py` = Environment config

### ColdFusion Developers
- Models = CFCs with database methods
- Views = CFC methods returning data
- Templates = CFML templates
- `settings.py` = Application.cfc

## 📝 Next Steps

1. ✅ Run `python manage.py migrate`
2. ✅ Create superuser: `python manage.py createsuperuser`
3. ✅ Start server: `python manage.py runserver`
4. ✅ Visit http://localhost:8000/
5. ✅ Try the API endpoints
6. ✅ Explore Django Admin at http://localhost:8000/admin/

## 📄 License

MIT

---

**Happy Coding! 🚀**

For questions or issues, Django has excellent documentation and a helpful community.

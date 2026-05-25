# Cheat Sheet: Django for PHP/Express/ColdFusion Developers

## Quick Reference

### Project Commands

```bash
# Start server (like: npm start, php artisan serve)
python manage.py runserver

# Database migrations (like: npm run migrate, php artisan migrate)
python manage.py makemigrations  # Create migration files
python manage.py migrate         # Apply migrations

# Create admin user
python manage.py createsuperuser

# Django shell (like: php artisan tinker, node REPL)
python manage.py shell

# Run tests
python manage.py test

# Collect static files for production
python manage.py collectstatic
```

### Routing Comparison

**Express:**
```javascript
app.get('/api/users', (req, res) => {...})
app.post('/api/users', (req, res) => {...})
```

**Django:**
```python
# urls.py
path('api/users/', UserListView.as_view())
```

**Laravel:**
```php
Route::get('/api/users', [UserController::class, 'index']);
```

### ViewSet (All CRUD in one class)

**Django ViewSet** = **Laravel Resource Controller** = **Express CRUD Router**

```python
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    # Automatically provides:
    # GET    /users/      -> list()
    # POST   /users/      -> create()
    # GET    /users/:id/  -> retrieve()
    # PUT    /users/:id/  -> update()
    # DELETE /users/:id/  -> destroy()
```

### Middleware (Interceptors)

**Express:**
```javascript
app.use((req, res, next) => {
    console.log('Request received');
    next();
});
```

**Django:**
```python
class MyMiddleware:
    def process_request(self, request):
        print('Request received')
        return None  # Continue
```

**PHP/Laravel:**
```php
public function handle($request, Closure $next) {
    // Before
    $response = $next($request);
    // After
    return $response;
}
```

### Serializers (Validation)

**Express (Joi):**
```javascript
const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email()
});
```

**Django:**
```python
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
    
    def validate_email(self, value):
        if not '@' in value:
            raise ValidationError('Invalid email')
        return value
```

**Laravel:**
```php
$request->validate([
    'username' => 'required|string',
    'email' => 'required|email'
]);
```

### Database Queries (ORM)

**Express (TypeORM):**
```javascript
const users = await User.find({ where: { active: true } });
const user = await User.findOne({ where: { id: 1 } });
```

**Django:**
```python
users = User.objects.filter(is_active=True)
user = User.objects.get(id=1)
```

**Laravel (Eloquent):**
```php
$users = User::where('active', true)->get();
$user = User::find(1);
```

**PHP (PDO):**
```php
$stmt = $pdo->prepare("SELECT * FROM users WHERE active = ?");
$stmt->execute([true]);
```

### Request/Response

**Express:**
```javascript
app.post('/api/data', (req, res) => {
    const data = req.body;
    res.json({ success: true, data });
});
```

**Django:**
```python
@api_view(['POST'])
def data_view(request):
    data = request.data
    return Response({'success': True, 'data': data})
```

**PHP:**
```php
$data = json_decode(file_get_contents('php://input'));
echo json_encode(['success' => true, 'data' => $data]);
```

### Authentication

**Express (JWT):**
```javascript
const token = jwt.sign({ userId: user.id }, secret);
// Verify in middleware
const decoded = jwt.verify(token, secret);
```

**Django (JWT):**
```python
# Login
POST /api/token/ 
{ "username": "user", "password": "pass" }

# Use token
headers = {'Authorization': 'Bearer <token>'}
```

**Laravel (Sanctum):**
```php
$token = $user->createToken('auth-token')->plainTextToken;
```

### Models/Entities

**TypeScript (TypeORM):**
```typescript
@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;
}
```

**Django:**
```python
class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
```

**Laravel:**
```php
class User extends Model {
    protected $fillable = ['username', 'email'];
}
```

### Environment Variables

**Express (.env):**
```env
PORT=3000
DATABASE_URL=postgres://...
```

**Django (.env):**
```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://...
```

Both use similar `.env` files!

### Template Rendering

**Express (EJS):**
```javascript
res.render('home', { title: 'Home', user });
```

**Django:**
```python
return render(request, 'home.html', {'title': 'Home', 'user': user})
```

**Laravel (Blade):**
```php
return view('home', ['title' => 'Home', 'user' => $user]);
```

### File Structure Comparison

```
Express/Node:              Django:
src/                       apps/
├── controllers/          ├── api/
│   └── UserController    │   ├── views.py (controllers)
├── models/               │   ├── models.py
│   └── User              │   ├── serializers.py (validation)
├── routes/               │   └── urls.py (routes)
│   └── api.js            config/
├── middleware/           ├── settings.py (all config)
│   └── auth.js           └── urls.py (main routes)
├── config/               templates/ (views/)
│   └── database.js       static/ (public/)
public/                   
├── css/                  
└── js/                   
```

### Common Patterns

#### Get Authenticated User

**Express:**
```javascript
const userId = req.user.id;
```

**Django:**
```python
user = request.user
user_id = request.user.id
```

**PHP:**
```php
$userId = Auth::id();
```

#### Query Parameters

**Express:**
```javascript
const page = req.query.page;
```

**Django:**
```python
page = request.query_params.get('page')
```

**PHP:**
```php
$page = $_GET['page'];
```

#### Send Email

**Express (Nodemailer):**
```javascript
await transporter.sendMail({
    from: 'sender@example.com',
    to: 'recipient@example.com',
    subject: 'Hello',
    text: 'Message'
});
```

**Django:**
```python
from django.core.mail import send_mail

send_mail(
    'Hello',
    'Message',
    'sender@example.com',
    ['recipient@example.com']
)
```

**PHP:**
```php
mail(
    'recipient@example.com',
    'Hello',
    'Message',
    'From: sender@example.com'
);
```

### HTTP Status Codes

```python
from rest_framework import status

return Response(data, status=status.HTTP_200_OK)
return Response(data, status=status.HTTP_201_CREATED)
return Response(errors, status=status.HTTP_400_BAD_REQUEST)
return Response(status=status.HTTP_404_NOT_FOUND)
return Response(status=status.HTTP_401_UNAUTHORIZED)
```

### Permissions

**Django:**
```python
from rest_framework.permissions import IsAuthenticated, AllowAny

class MyView(APIView):
    permission_classes = [IsAuthenticated]
```

**Express:**
```javascript
app.get('/protected', authMiddleware, (req, res) => {...});
```

**Laravel:**
```php
Route::middleware('auth')->group(function () {
    Route::get('/protected', ...);
});
```

## Key Takeaways

1. **ViewSets** = Resource Controllers (automatic CRUD)
2. **Serializers** = Validation + DTOs combined
3. **Middleware** = Interceptors (same concept, different syntax)
4. **Models** = ORM entities (ActiveRecord pattern)
5. **Templates** = Server-side rendering (like Blade/EJS)
6. **Static** = Public folder (CSS, JS, images)

Django is more "batteries included" than Express but similar in power to Laravel!

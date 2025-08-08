# 🚀 TodoList FastAPI Backend

A modern REST API backend for the TodoList application built with FastAPI, PostgreSQL, and JWT authentication.

## 🏗️ Architecture

```
backend/
├── main.py              # FastAPI application entry point
├── config.py            # Application configuration
├── database.py          # Database connection and session management
├── models.py            # SQLAlchemy database models
├── schemas.py           # Pydantic schemas for request/response
├── auth.py              # Authentication utilities (JWT, password hashing)
├── routers/             # API route handlers
│   ├── auth.py         # Authentication routes (/auth)
│   └── tasks.py        # Task management routes (/tasks)
├── requirements.txt     # Python dependencies
├── setup.py            # Automated setup script
├── start.bat           # Windows startup script
├── start.sh            # Unix/Linux startup script
└── .env.example        # Environment variables template
```

## 🔧 Features

- **User Authentication**: Register, login, JWT token-based sessions
- **Task Management**: Full CRUD operations for tasks
- **Data Persistence**: PostgreSQL database with SQLAlchemy ORM
- **API Documentation**: Auto-generated with FastAPI (Swagger/OpenAPI)
- **Security**: Password hashing with bcrypt, JWT tokens
- **CORS Support**: Configured for React frontend integration
- **Type Safety**: Full Pydantic validation and type hints

## 📋 Prerequisites

- Python 3.8+
- PostgreSQL database (local or hosted on Render)
- Git

## 🚀 Quick Start

### 1. Automated Setup

Run the setup script to configure everything automatically:

```bash
cd backend
python setup.py
```

This will:
- Create a Python virtual environment
- Install all dependencies
- Create a `.env` file from the template

### 2. Configure Database

Update the `.env` file with your PostgreSQL database credentials:

```env
DATABASE_URL=postgresql://username:password@hostname:port/database_name
SECRET_KEY=your-super-secret-key-minimum-32-characters
```

**For Render PostgreSQL:**
```env
DATABASE_URL=postgresql://username:password@dpg-xxxxxxxxx-a.oregon-postgres.render.com/database_name
```

### 3. Start the Server

**Windows:**
```cmd
start.bat
```

**Unix/Linux/MacOS:**
```bash
chmod +x start.sh
./start.sh
```

**Or manually:**
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
python main.py
```

The API will be available at:
- **API**: http://localhost:8000
- **Documentation**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

### Tasks
- `GET /api/tasks/` - Get all user tasks
- `POST /api/tasks/` - Create a new task
- `PUT /api/tasks/{task_id}` - Update a task
- `DELETE /api/tasks/{task_id}` - Delete a task
- `POST /api/tasks/bulk` - Create multiple tasks

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

## 🔒 Authentication Flow

1. **Register/Login**: User provides credentials
2. **JWT Token**: Server returns access token
3. **Protected Routes**: Client sends token in Authorization header
4. **Token Validation**: Server validates token for each request

### Example Request
```bash
curl -X GET "http://localhost:8000/api/tasks/" \
     -H "Authorization: Bearer your-jwt-token-here"
```

## 📝 Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Create Task
```bash
POST /api/tasks/
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Complete the project",
  "description": "Finish the todo app with database integration",
  "priority": "high"
}
```

## 🛠️ Development

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Run in Development Mode
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Database Migrations
The application automatically creates tables on startup. For production, consider using Alembic for migrations.

## 🚢 Production Deployment

### Environment Variables
Set these in your production environment:
```env
DATABASE_URL=postgresql://prod_user:prod_pass@prod_host:5432/prod_db
SECRET_KEY=your-production-secret-key
ENVIRONMENT=production
```

### Docker Deployment
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🧪 Testing

### Test the API
```bash
# Health check
curl http://localhost:8000/health

# API documentation
open http://localhost:8000/docs
```

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT signing key (min 32 characters)
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time
- `ALLOWED_ORIGINS`: CORS allowed origins
- `ENVIRONMENT`: development/production

## 📊 Database Setup on Render

1. Create a PostgreSQL database on Render
2. Get the connection details from Render dashboard
3. Update your `.env` file with the database URL
4. Use Adminer tool to manage your database

### Render Database URL Format
```
postgresql://username:password@dpg-xxxxxxxxx-a.oregon-postgres.render.com/database_name
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify DATABASE_URL is correct
   - Check if database server is running
   - Ensure firewall allows connections

2. **Import Errors**
   - Activate virtual environment
   - Install dependencies: `pip install -r requirements.txt`

3. **CORS Issues**
   - Check ALLOWED_ORIGINS in config
   - Ensure React app URL is included

4. **JWT Token Issues**
   - Verify SECRET_KEY is set
   - Check token expiration time
   - Ensure Authorization header format: `Bearer <token>`

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/) - JWT token debugger

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ using FastAPI, PostgreSQL, and Python**

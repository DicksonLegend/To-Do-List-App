# Simple Todo API Backend

A super simple FastAPI backend for storing todo tasks in a PostgreSQL database.

## Quick Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up database:**
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your Render PostgreSQL connection string
   
3. **Run the server:**
   ```bash
   python main.py
   ```

The API will be available at `http://localhost:8000` with docs at `http://localhost:8000/docs`

## API Endpoints

- `GET /` - API status
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/{id}` - Update a task
- `DELETE /tasks/{id}` - Delete a task

## Database

The app automatically creates a simple `tasks` table with:
- `id` (Primary Key)
- `text` (Task title)
- `description` (Optional description)
- `completed` (Boolean)
- `priority` (low/medium/high)
- `created_at` (Timestamp)

That's it! No complex authentication, just simple task storage. 🎉

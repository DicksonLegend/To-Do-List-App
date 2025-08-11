# 📋 To-Do List App

A modern, full-stack to-do list application built with React, TypeScript, and FastAPI. Features a beautiful glassmorphism design with database persistence and real-time synchronization.

![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-cyan.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue.svg)

## ✨ Features

- 🎨 **Modern UI** - Beautiful glassmorphism design with smooth animations
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Real-time** - Instant task updates with database synchronization
- 🗃️ **Database Storage** - PostgreSQL database with FastAPI backend
- 🔄 **Offline Support** - Local storage fallback when backend is unavailable
- 🎯 **Task Management** - Add, edit, delete, and toggle task completion
- 🏷️ **Priority Levels** - Organize tasks by priority (Low, Medium, High)
- 🔍 **Search & Filter** - Find tasks quickly with search and filter options
- 📊 **Statistics** - Track your productivity with task statistics
- 🚀 **Fast Performance** - Optimized for speed and smooth user experience

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Lightning-fast build tool
- **Lucide React** - Beautiful icon library

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - Python SQL toolkit and ORM
- **PostgreSQL** - Robust relational database
- **Uvicorn** - ASGI server for production

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Git** - Version control

## 🚀 Live Demo

- **Frontend**: [Your Render Static Site URL]
- **Backend API**: https://to-do-list-app-ub20.onrender.com
- **API Documentation**: https://to-do-list-app-ub20.onrender.com/docs

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL database (optional for local development)

### 1. Clone Repository
```bash
git clone https://github.com/DicksonLegend/To-Do-List-App.git
cd To-Do-List-App
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 3. Backend Setup (Optional)
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your database URL
echo "DATABASE_URL=your_postgresql_url_here" > .env

# Start the server
python main.py
```

The backend will be available at `http://localhost:8000`

## 🏗️ Project Structure

```
To-Do-List-App/
├── 📁 backend/                 # FastAPI backend
│   ├── main.py                # Complete FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── test_db.py            # Database connection test
│   ├── .env                  # Environment variables
│   └── venv/                 # Python virtual environment
├── 📁 src/                    # React frontend source
│   ├── 📁 components/         # Reusable UI components
│   │   ├── AddTaskForm.tsx   # Task creation form
│   │   ├── TaskCard.tsx      # Individual task component
│   │   ├── FilterBar.tsx     # Search and filter UI
│   │   ├── Statistics.tsx    # Analytics dashboard
│   │   └── Layout.tsx        # App layout wrapper
│   ├── 📁 pages/             # Page components
│   │   └── TodoList.tsx      # Main todo list page
│   ├── 📁 services/          # API communication
│   │   ├── api.ts           # API service with fallback
│   │   ├── fallback.ts      # Local storage fallback
│   │   └── index.ts         # Service exports
│   ├── 📁 config/            # Configuration
│   │   └── environment.ts    # Environment settings
│   ├── 📁 types/             # TypeScript definitions
│   │   └── index.ts         # Type definitions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── 📁 public/                # Static assets
├── package.json              # Node.js dependencies
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
└── README.md                # Project documentation
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=postgresql://username:password@host:port/database
```

### API Configuration

The frontend automatically detects the environment:
- **Development**: Uses `http://localhost:8000` (local backend)
- **Production**: Uses `https://to-do-list-app-ub20.onrender.com` (deployed backend)

## 📱 Usage

### Adding Tasks
1. Enter task title in the input field
2. Optionally add a description
3. Select priority level (Low, Medium, High)
4. Click "Add Task" or press Enter

### Managing Tasks
- ✅ **Toggle completion** - Click the checkbox
- ✏️ **Edit task** - Click the edit button
- 🗑️ **Delete task** - Click the delete button
- 🏷️ **Change priority** - Use the priority dropdown

### Filtering & Search
- 🔍 **Search** - Type in the search bar to find tasks
- 🎯 **Filter by status** - All, Active, Completed
- 🏷️ **Filter by priority** - All, High, Medium, Low

## 🚀 Deployment

### Frontend (Render Static Site)
1. Connect your GitHub repository to Render
2. Create a new Static Site
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Deploy automatically on git push

### Backend (Render Web Service)
The backend is already deployed at: `https://to-do-list-app-ub20.onrender.com`

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create new task |
| PUT | `/tasks/{id}` | Update task |
| DELETE | `/tasks/{id}` | Delete task |

### Example API Usage

```javascript
// Get all tasks
const response = await fetch('https://to-do-list-app-ub20.onrender.com/tasks');
const data = await response.json();
console.log(data.tasks);

// Create a new task
const newTask = await fetch('https://to-do-list-app-ub20.onrender.com/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'My new task',
    description: 'Task description',
    priority: 'medium'
  })
});
```

## 📝 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
python main.py       # Start FastAPI server
python test_db.py    # Test database connection
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **FastAPI** - For the high-performance Python web framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Render** - For reliable hosting and deployment

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the [API documentation](https://to-do-list-app-ub20.onrender.com/docs)

---

**Built with ❤️ using React, TypeScript, FastAPI, and PostgreSQL**

# Render Deployment Configuration

## Backend Deployment

### Web Service Configuration
- **Environment**: Python 3
- **Build Command**: `cd backend && pip install -r requirements.txt`
- **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

### Environment Variables
Add these environment variables in your Render dashboard:

```
DATABASE_URL=your_postgresql_connection_string_here
PORT=10000
```

### Health Check
The API provides a health check at `/` endpoint.

## Frontend Deployment

### Static Site Configuration
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### Environment Variables
Update the API base URL in `src/services/api.ts` to point to your deployed backend:

```typescript
const API_BASE_URL = 'https://your-backend-url.onrender.com';
```

## Quick Deploy

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy Backend**:
   - Create new Web Service on Render
   - Connect this GitHub repository
   - Use configuration above

3. **Deploy Frontend**:
   - Create new Static Site on Render
   - Connect this GitHub repository
   - Update API URL to deployed backend
   - Use configuration above

## Database Setup

Your PostgreSQL database is already configured. The application will automatically create the `tasks` table on first run.

## API Documentation

Once deployed, your API documentation will be available at:
`https://your-backend-url.onrender.com/docs`

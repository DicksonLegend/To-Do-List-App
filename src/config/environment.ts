// Environment configuration for Render deployment

export const config = {
  // Backend deployed on Render
  API_URL: 'https://to-do-list-app-ub20.onrender.com',
  
  // For local development, you can temporarily change this to:
  // API_URL: 'http://localhost:8000',
};

// Export the API URL
export const API_BASE_URL = config.API_URL;

// Log current configuration for debugging
console.log('🌍 API URL:', API_BASE_URL);

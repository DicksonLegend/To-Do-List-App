// Environment configuration for different deployment scenarios

export const config = {
  // 🚀 UPDATE THIS URL when you deploy your backend to Render
  PRODUCTION_API_URL: 'https://your-backend-name.onrender.com',
  
  // Local development URL (don't change this)
  DEVELOPMENT_API_URL: 'http://localhost:8000',
  
  // Detect if we're running in production (GitHub Pages)
  isProduction: window.location.hostname.includes('github.io'),
  
  // Get the appropriate API URL based on environment
  getAPIURL: function() {
    return this.isProduction ? this.PRODUCTION_API_URL : this.DEVELOPMENT_API_URL;
  }
};

// Export the current API URL
export const API_BASE_URL = config.getAPIURL();

// Log current configuration for debugging
console.log('🌍 Environment:', config.isProduction ? 'Production (GitHub Pages)' : 'Development');
console.log('🔗 API URL:', API_BASE_URL);

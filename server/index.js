import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Get the frontend URL from environment variables or use default
const FRONTEND_URL = process.env.VITE_FRONTEND_URL || 'http://localhost:8080';

// Middleware - Fix CORS configuration
app.use(cors({
  origin: FRONTEND_URL, // Specific origin instead of wildcard
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(express.static('public'));

// Log environment variables (remove in production)
console.log('Environment variables loaded:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Missing');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing');
console.log('FRONTEND_URL:', FRONTEND_URL);

// Import routes
import apiRoutes from './routes/api.js';
app.use('/api', apiRoutes);

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Auto-refresh token every 45 minutes (tokens expire in 1 hour)
setInterval(async () => {
  try {
    const { refreshAccessToken } = await import('./scripts/refresh-token.js');
    await refreshAccessToken();
    console.log('Auto-refreshed OAuth token at:', new Date().toISOString());
  } catch (error) {
    console.error('Auto token refresh failed:', error);
  }
}, 45 * 60 * 1000);
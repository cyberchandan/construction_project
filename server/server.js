const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Security Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false, // Allow inline styles and assets during dev
  })
);

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during local development testing
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body and Cookie Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Serve static uploaded project files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health & Base API Info Endpoints
app.get(['/', '/api/v1'], (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 BuildConnect NCR REST API Server is Active',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      publicSettings: '/api/v1/settings/public',
      publicProjects: '/api/v1/projects',
      submitLead: 'POST /api/v1/leads',
      adminLogin: 'POST /api/v1/auth/login',
    },
  });
});

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'BuildConnect NCR Construction Lead Engine',
    version: '1.0.0',
  });
});


// Import Routes
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const projectRoutes = require('./routes/projectRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const seoRoutes = require('./routes/seoRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// SEO XML/Txt Routes at root
app.use('/', seoRoutes);

// Mount API v1 Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/quotes', quoteRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 BuildConnect NCR Server running on port ${PORT}`);
    console.log(`🌐 Base API URL: http://localhost:${PORT}/api/v1`);
    console.log(`=======================================================`);
  });
}

module.exports = app;

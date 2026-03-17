require('dotenv').config();
const env = process.env;
env.NODE_ENV = env.NODE_ENV || 'development';
env.JWT_SECRET = env.JWT_SECRET || 'dev-secret';
env.JWT_EXPIRES_IN = env.JWT_EXPIRES_IN || '7d';
env.JWT_COOKIE_EXPIRES_IN = env.JWT_COOKIE_EXPIRES_IN || '7';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const syllabusRoutes = require('./routes/syllabus');
const examRoutes = require('./routes/exams');
const mindmapRoutes = require('./routes/mindmaps');
const clubRoutes = require('./routes/clubs');
const eventRoutes = require('./routes/events');
const hallTicketRoutes = require('./routes/hallTickets');
const seatingRoutes = require('./routes/seating');
const { errorHandler } = require('./middleware/error');
const facultyRoutes = require('./routes/faculty');

// Initialize Prisma Client
const prisma = new PrismaClient();

// Create Express app
const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Static
app.use('/static', express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/mindmaps', mindmapRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/hall-tickets', hallTicketRoutes);
app.use('/api/seating', seatingRoutes);
app.use('/api/admin', require('./routes/adminApi'));
app.use('/api/students', require('./routes/students'));
app.use('/api/faculty', facultyRoutes);

// Admin pages
app.use('/admin', require('./routes/admin'));
app.get('/', (req, res) => res.redirect('/admin/login'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ 
    status: 'error', 
    message: 'Not Found',
    path: req.path 
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});

module.exports = { app, server };

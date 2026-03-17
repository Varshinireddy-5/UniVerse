const express = require('express');
const {
  generateHallTickets,
  getHallTicket,
  getStudentHallTickets,
  getExamHallTickets,
  verifyHallTicket,
} = require('../controllers/hallTicketController');
const { auth, hasAnyRole } = require('../middleware/auth');

const router = express.Router();

// Public route for verification
router.post('/verify', verifyHallTicket);

// Protected routes
router.use(auth);

// Student routes
router.get('/my-tickets', getStudentHallTickets);
router.get('/my-tickets/:studentId', hasAnyRole('ADMIN'), getStudentHallTickets);
router.get('/:examId/student/:studentId', getHallTicket);

// Admin routes
router.post('/exams/:examId/generate', hasAnyRole('ADMIN'), generateHallTickets);
router.get('/exams/:examId', hasAnyRole('ADMIN'), getExamHallTickets);

module.exports = router;

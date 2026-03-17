const express = require('express');
const {
  createRoom,
  getAllRooms,
  getRoom,
  generateSeatingAllocation,
  getExamSeatingAllocation,
  getStudentSeat,
  clearSeatingAllocation,
} = require('../controllers/seatingController');
const { auth, hasAnyRole } = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Public routes
router.get('/rooms', getAllRooms);
router.get('/rooms/:id', getRoom);
router.get('/rooms/:id/seats', async (req, res, next) => {
  try {
    const seats = await prisma.seat.findMany({ where: { roomId: req.params.id }, orderBy: [{ rowNumber: 'asc' }, { colNumber: 'asc' }] });
    res.json({ results: seats.length, seats });
  } catch (error) { next(error); }
});

// Protected routes
router.use(auth);

// Student routes
router.get('/exams/:examId/my-seat', getStudentSeat);
router.get('/exams/:examId/students/:studentId/seat', hasAnyRole('ADMIN', 'SEATING_MANAGER'), getStudentSeat);

// Admin routes
router.post('/rooms', hasAnyRole('ADMIN'), createRoom);
router.post('/exams/:examId/allocate', hasAnyRole('ADMIN', 'SEATING_MANAGER'), generateSeatingAllocation);
router.get('/exams/:examId/allocations', hasAnyRole('ADMIN', 'SEATING_MANAGER'), getExamSeatingAllocation);
router.delete('/exams/:examId/allocations', hasAnyRole('ADMIN'), clearSeatingAllocation);

module.exports = router;

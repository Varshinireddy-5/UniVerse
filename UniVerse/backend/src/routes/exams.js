const express = require('express');
const {
  createExam,
  getAllExams,
  getExam,
  updateExam,
  deleteExam,
  getExamsByCourse,
} = require('../controllers/examController');
const { auth, hasAnyRole } = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Public routes
router.get('/', async (req, res, next) => {
  try {
    const { courseId, type, from, to, page = 1, limit = 20 } = req.query;
    const where = {};
    if (courseId) where.courseId = courseId;
    if (type) where.examType = { equals: type };
    if (from || to) where.examDate = { gte: from ? new Date(from) : undefined, lte: to ? new Date(to) : undefined };
    const take = Math.min(parseInt(limit, 10) || 20, 100);
    const skip = (parseInt(page, 10) - 1) * take;
    const [items, total] = await Promise.all([
      prisma.exam.findMany({ where, include: { course: { select: { id: true, code: true, name: true } } }, orderBy: { examDate: 'asc' }, skip, take }),
      prisma.exam.count({ where }),
    ]);
    res.json({ total, page: parseInt(page, 10), limit: take, items });
  } catch (error) { next(error); }
});
router.get('/:id', getExam);
router.get('/course/:courseId', getExamsByCourse);

// Protected routes (require authentication)
router.use(auth);

// Admin only routes
router.post('/', hasAnyRole('ADMIN'), createExam);
router
  .route('/:id')
  .patch(hasAnyRole('ADMIN'), updateExam)
  .delete(hasAnyRole('ADMIN'), deleteExam);

module.exports = router;

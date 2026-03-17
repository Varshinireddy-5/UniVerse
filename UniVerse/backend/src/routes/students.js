const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { auth, hasAnyRole } = require('../middleware/auth');

const prisma = new PrismaClient();
const router = express.Router();

router.use(auth);

router.get('/me/summary', hasAnyRole('STUDENT'), async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const courses = await prisma.studentCourse.findMany({
      where: { studentId },
      select: { courseId: true, enrolledAt: true },
      orderBy: { enrolledAt: 'desc' },
    });
    const courseIds = courses.map(c => c.courseId);

    const upcomingExams = courseIds.length > 0
      ? await prisma.exam.findMany({
          where: {
            courseId: { in: courseIds },
            examDate: { gte: new Date() },
          },
          include: { course: { select: { code: true, name: true } } },
          orderBy: { examDate: 'asc' },
          take: 10,
        })
      : [];

    const upcomingEvents = await prisma.event.findMany({
      where: { startDateTime: { gte: new Date() }, status: { in: ['PENDING', 'APPROVED'] } },
      orderBy: { startDateTime: 'asc' },
      take: 10,
    });

    res.json({
      coursesCount: courses.length,
      upcomingExams,
      upcomingEvents,
    });
  } catch (error) { next(error); }
});

router.use(hasAnyRole('ADMIN'));

router.get('/', async (req, res, next) => {
  try {
    const students = await prisma.student.findMany({
      take: 200,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ results: students.length, students });
  } catch (error) { next(error); }
});

router.get('/grades/top', async (req, res, next) => {
  try {
    const top = await prisma.grade.findMany({
      orderBy: { G3: 'desc' },
      take: 50,
      include: { student: true },
    });
    res.json({ results: top.length, grades: top });
  } catch (error) { next(error); }
});

router.get('/grades/stats', async (req, res, next) => {
  try {
    const math = await prisma.grade.aggregate({
      where: { subject: 'MATH' },
      _avg: { G1: true, G2: true, G3: true },
      _count: { _all: true },
    });
    const portuguese = await prisma.grade.aggregate({
      where: { subject: 'PORTUGUESE' },
      _avg: { G1: true, G2: true, G3: true },
      _count: { _all: true },
    });
    res.json({ math, portuguese });
  } catch (error) { next(error); }
});

module.exports = router;

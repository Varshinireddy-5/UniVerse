const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/courses', async (req, res, next) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { code: 'asc' },
      select: { id: true, code: true, name: true, semester: true, department: true },
    });
    res.json({ items: courses });
  } catch (err) {
    next(err);
  }
});

router.get('/courses/:courseId/students', async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const enrollments = await prisma.studentCourse.findMany({
      where: { courseId },
      include: { student: { select: { id: true, fullName: true, email: true, rollNo: true } } },
    });
    const students = enrollments.map((e) => e.student);
    res.json({ students });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

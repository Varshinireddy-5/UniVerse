const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth, hasAnyRole } = require('../middleware/auth');

const prisma = new PrismaClient();
const router = express.Router();

// Simple in-memory audit log
const auditLogs = [];
function logAction(req, action) {
  auditLogs.unshift({
    at: new Date().toISOString(),
    userId: req.user?.id || null,
    email: req.user?.email || null,
    method: req.method,
    path: req.path,
    action,
  });
  if (auditLogs.length > 200) auditLogs.pop();
}

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

// Public: login page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Public: login submit
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render('login', { error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } },
    });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).render('login', { error: 'Incorrect email or password' });
    }

    const roleNames = user.roles.map((ur) => ur.role.name);
    if (!roleNames.includes('ADMIN')) {
      return res.status(403).render('login', { error: 'Admin access required' });
    }

    const token = signToken(user.id);
    const cookieOptions = {
      expires: new Date(Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRES_IN || '7', 10)) * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    return res.redirect('/admin/dashboard');
  } catch (err) {
    return res.status(500).render('login', { error: 'Unexpected error. Try again.' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/admin/login');
});

// Protect all routes below
router.use(auth);
router.use(hasAnyRole('ADMIN'));

// Dashboard
router.get('/dashboard', async (req, res, next) => {
  try {
    const role = (req.query.role || 'ALL').toUpperCase();
    const userWhere = role === 'ALL' ? {} : { roles: { some: { role: { name: role } } } };
    const [users, courses, exams, rooms] = await Promise.all([
      prisma.user.count({ where: userWhere }),
      prisma.course.count(),
      prisma.exam.count(),
      prisma.room.count(),
    ]);
    res.render('dashboard', { counts: { users, courses, exams, rooms }, role });
    logAction(req, 'view_dashboard');
  } catch (error) { next(error); }
});

// Users
router.get('/users', async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    const role = (req.query.role || 'ALL').toUpperCase();
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const pageSize = Math.min(Math.max(parseInt(req.query.pageSize || '50', 10), 5), 200);
    const orderBy = (req.query.sort || 'fullName') === 'email' ? { email: 'asc' } : { fullName: 'asc' };

    const where = q ? {
      OR: [
        { email: { contains: q, mode: 'insensitive' } },
        { fullName: { contains: q, mode: 'insensitive' } },
        { rollNo: { contains: q, mode: 'insensitive' } },
      ],
    } : {};

    if (role && role !== 'ALL') {
      where.roles = { some: { role: { name: role } } };
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        select: {
          id: true, email: true, fullName: true, rollNo: true,
          roles: { select: { role: { select: { name: true } } } },
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      })
    ]);

    res.render('users', { users, q, role, page, pageSize, total });
    logAction(req, 'view_users');
  } catch (error) { next(error); }
});

router.get('/users/export.csv', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, fullName: true, rollNo: true },
      orderBy: { fullName: 'asc' },
      take: 1000,
    });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');
    res.write('id,email,fullName,rollNo\n');
    for (const u of users) {
      res.write(`${u.id},${u.email},${u.fullName},${u.rollNo || ''}\n`);
    }
    res.end();
    logAction(req, 'export_users_csv');
  } catch (error) { next(error); }
});

router.get('/courses/export.csv', async (req, res, next) => {
  try {
    const courses = await prisma.course.findMany({ orderBy: [{ department: 'asc' }, { semester: 'asc' }, { code: 'asc' }], take: 1000 });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="courses.csv"');
    res.write('id,code,name,department,semester\n');
    for (const c of courses) {
      res.write(`${c.id},${c.code},${c.name},${c.department},${c.semester}\n`);
    }
    res.end();
    logAction(req, 'export_courses_csv');
  } catch (error) { next(error); }
});

router.get('/exams/export.csv', async (req, res, next) => {
  try {
    const exams = await prisma.exam.findMany({ include: { course: { select: { code: true, name: true } } }, orderBy: { examDate: 'asc' }, take: 2000 });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="exams.csv"');
    res.write('id,course,examType,examDate,startTime,endTime\n');
    for (const e of exams) {
      res.write(`${e.id},${e.course ? (e.course.code + ' ' + e.course.name) : ''},${e.examType},${e.examDate.toISOString()},${e.startTime.toISOString()},${e.endTime.toISOString()}\n`);
    }
    res.end();
    logAction(req, 'export_exams_csv');
  } catch (error) { next(error); }
});

router.get('/rooms/export.csv', async (req, res, next) => {
  try {
    const rooms = await prisma.room.findMany({ include: { _count: { select: { seats: true } } }, orderBy: { name: 'asc' }, take: 1000 });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="rooms.csv"');
    res.write('id,name,rows,cols,capacity,seats\n');
    for (const r of rooms) {
      res.write(`${r.id},${r.name},${r.rows},${r.cols},${r.capacity},${r._count && r._count.seats ? r._count.seats : 0}\n`);
    }
    res.end();
    logAction(req, 'export_rooms_csv');
  } catch (error) { next(error); }
});

// Courses
router.get('/courses', async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    const department = (req.query.department || '').trim();
    const semester = (req.query.semester || '').trim();
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const pageSize = Math.min(Math.max(parseInt(req.query.pageSize || '50', 10), 5), 200);

    const where = {};
    if (q) {
      where.OR = [
        { code: { contains: q, mode: 'insensitive' } },
        { name: { contains: q, mode: 'insensitive' } },
        { department: { contains: q, mode: 'insensitive' } },
      ];
    }
    if (department) where.department = { contains: department, mode: 'insensitive' };
    if (semester) where.semester = { equals: semester };

    const [total, courses] = await Promise.all([
      prisma.course.count({ where }),
      prisma.course.findMany({
        where,
        orderBy: [{ department: 'asc' }, { semester: 'asc' }, { code: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      })
    ]);
    res.render('courses', { courses, q, department, semester, page, pageSize, total });
    logAction(req, 'view_courses');
  } catch (error) { next(error); }
});

// Exams
router.get('/exams', async (req, res, next) => {
  try {
    const exams = await prisma.exam.findMany({
      include: { course: { select: { id: true, code: true, name: true } } },
      orderBy: { examDate: 'asc' },
      take: 200,
    });
    const rooms = await prisma.room.findMany({ orderBy: { name: 'asc' } });
    res.render('exams', { exams, rooms });
    logAction(req, 'view_exams');
  } catch (error) { next(error); }
});

// Rooms
router.get('/rooms', async (req, res, next) => {
  try {
    const rooms = await prisma.room.findMany({
      include: { _count: { select: { seats: true } } },
      orderBy: { name: 'asc' },
    });
    res.render('rooms', { rooms, message: null, error: null });
    logAction(req, 'view_rooms');
  } catch (error) { next(error); }
});

router.post('/rooms/create', async (req, res) => {
  try {
    const { name, rows, cols } = req.body;
    const capacity = parseInt(rows, 10) * parseInt(cols, 10);
    await prisma.room.create({ data: { name, rows: parseInt(rows, 10), cols: parseInt(cols, 10), capacity } });
    const seats = [];
    const room = await prisma.room.findUnique({ where: { name } });
    for (let r = 1; r <= room.rows; r++) {
      for (let c = 1; c <= room.cols; c++) {
        seats.push({ roomId: room.id, rowNumber: r, colNumber: c });
      }
    }
    await prisma.seat.createMany({ data: seats });
    logAction(req, 'create_room');
    const rooms = await prisma.room.findMany({ include: { _count: { select: { seats: true } } }, orderBy: { name: 'asc' } });
    res.render('rooms', { rooms, message: 'Room created and seats generated', error: null });
  } catch (err) {
    const rooms = await prisma.room.findMany({ include: { _count: { select: { seats: true } } }, orderBy: { name: 'asc' } });
    res.status(400).render('rooms', { rooms, message: null, error: err.message || 'Failed to create room' });
  }
});

// Seating chart (read-only)
router.get('/exams/:id/seating', async (req, res, next) => {
  try {
    const allocations = await prisma.seatingAllocation.findMany({
      where: { examId: req.params.id },
      include: {
        student: { select: { id: true, fullName: true, rollNo: true } },
        seat: { include: { room: { select: { id: true, name: true } } } },
      },
      orderBy: [
        { seat: { room: { name: 'asc' } } },
        { seat: { rowNumber: 'asc' } },
        { seat: { colNumber: 'asc' } },
      ],
    });
    res.render('seatingChart', { allocations });
    logAction(req, 'view_seating_chart');
  } catch (error) { next(error); }
});

// Audit logs page
router.get('/logs', (req, res) => {
  const action = (req.query.action || '').trim();
  const email = (req.query.email || '').trim();
  const from = req.query.from ? new Date(req.query.from) : null;
  const to = req.query.to ? new Date(req.query.to) : null;

  let logs = auditLogs.slice(0, 1000);
  if (action) logs = logs.filter(l => (l.action || '').toLowerCase().includes(action.toLowerCase()));
  if (email) logs = logs.filter(l => (l.email || '').toLowerCase().includes(email.toLowerCase()));
  if (from) logs = logs.filter(l => new Date(l.at) >= from);
  if (to) logs = logs.filter(l => new Date(l.at) <= to);
  res.render('logs', { logs, action, email, from: req.query.from || '', to: req.query.to || '' });
});

// Prisma Studio-like index: list all models with counts

router.get('/logs/export.csv', (req, res) => {
  const action = (req.query.action || '').trim();
  const email = (req.query.email || '').trim();
  const from = req.query.from ? new Date(req.query.from) : null;
  const to = req.query.to ? new Date(req.query.to) : null;

  let logs = auditLogs.slice(0, 5000);
  if (action) logs = logs.filter(l => (l.action || '').toLowerCase().includes(action.toLowerCase()));
  if (email) logs = logs.filter(l => (l.email || '').toLowerCase().includes(email.toLowerCase()));
  if (from) logs = logs.filter(l => new Date(l.at) >= from);
  if (to) logs = logs.filter(l => new Date(l.at) <= to);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="audit-logs.csv"');
  res.write('at,email,method,path,action\n');
  for (const l of logs) {
    res.write(`${l.at},${l.email || ''},${l.method},${l.path},${l.action}\n`);
  }
  res.end();
});

module.exports = router;

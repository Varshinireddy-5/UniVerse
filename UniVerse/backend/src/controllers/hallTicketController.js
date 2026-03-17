const { PrismaClient } = require('@prisma/client');
const { AppError } = require('../middleware/error');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

// Generate hall tickets for all students in a course (admin only)
const generateHallTickets = async (req, res, next) => {
  try {
    const { examId } = req.params;

    // Check if exam exists
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        course: {
          include: {
            studentCourses: {
              select: {
                studentId: true,
              },
            },
          },
        },
      },
    });

    if (!exam) {
      return next(new AppError('No exam found with that ID', 404));
    }

    // Get all students enrolled in the course
    const studentIds = exam.course.studentCourses.map(sc => sc.studentId);

    if (studentIds.length === 0) {
      return next(new AppError('No students enrolled in this course', 400));
    }

    // Generate hall tickets
    const hallTickets = await Promise.all(
      studentIds.map(async (studentId) => {
        // Generate a unique QR code data
        const qrData = JSON.stringify({
          studentId,
          examId,
          timestamp: Date.now(),
          uuid: uuidv4(),
        });

        // Generate QR code as data URL
        const qrCode = await QRCode.toDataURL(qrData);

        // Create or update hall ticket
        return prisma.hallTicket.upsert({
          where: {
            studentId_examId: {
              studentId,
              examId,
            },
          },
          update: {
            qrCode,
            issueDate: new Date(),
          },
          create: {
            student: { connect: { id: studentId } },
            exam: { connect: { id: examId } },
            qrCode,
            issueDate: new Date(),
          },
          include: {
            student: {
              select: {
                id: true,
                fullName: true,
                rollNo: true,
              },
            },
          },
        });
      })
    );

    res.status(201).json({
      status: 'success',
      results: hallTickets.length,
      data: {
        hallTickets,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get hall ticket for a specific student and exam
const getHallTicket = async (req, res, next) => {
  try {
    const { examId, studentId } = req.params;
    const requestingUserId = req.user.id;

    // Check if the requesting user is the student or an admin
    if (requestingUserId !== studentId && !req.user.roles.includes('ADMIN')) {
      return next(new AppError('Not authorized to access this resource', 403));
    }

    const hallTicket = await prisma.hallTicket.findUnique({
      where: {
        studentId_examId: {
          studentId,
          examId,
        },
      },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            rollNo: true,
            email: true,
          },
        },
        exam: {
          include: {
            course: {
              select: {
                id: true,
                code: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!hallTicket) {
      return next(new AppError('No hall ticket found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        hallTicket,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all hall tickets for a student
const getStudentHallTickets = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.user.id;

    // Check if the requesting user is the student or an admin
    if (req.user.id !== studentId && !req.user.roles.includes('ADMIN')) {
      return next(new AppError('Not authorized to access this resource', 403));
    }

    const hallTickets = await prisma.hallTicket.findMany({
      where: { studentId },
      include: {
        exam: {
          include: {
            course: {
              select: {
                id: true,
                code: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        exam: {
          examDate: 'asc',
        },
      },
    });

    res.status(200).json({
      status: 'success',
      results: hallTickets.length,
      data: {
        hallTickets,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all hall tickets for an exam (admin only)
const getExamHallTickets = async (req, res, next) => {
  try {
    const { examId } = req.params;

    const hallTickets = await prisma.hallTicket.findMany({
      where: { examId },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            rollNo: true,
            email: true,
          },
        },
      },
      orderBy: {
        student: {
          rollNo: 'asc',
        },
      },
    });

    res.status(200).json({
      status: 'success',
      results: hallTickets.length,
      data: {
        hallTickets,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Verify hall ticket using QR code
const verifyHallTicket = async (req, res, next) => {
  try {
    const { qrData } = req.body;

    if (!qrData) {
      return next(new AppError('QR code data is required', 400));
    }

    // In a real implementation, you would verify the QR code data
    // For this example, we'll just parse the data
    let parsedData;
    try {
      parsedData = JSON.parse(qrData);
    } catch (error) {
      return next(new AppError('Invalid QR code data', 400));
    }

    const { studentId, examId } = parsedData;

    // Verify the hall ticket exists
    const hallTicket = await prisma.hallTicket.findUnique({
      where: {
        studentId_examId: {
          studentId,
          examId,
        },
      },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            rollNo: true,
          },
        },
        exam: {
          include: {
            course: {
              select: {
                id: true,
                code: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!hallTicket) {
      return next(new AppError('Invalid hall ticket', 400));
    }

    res.status(200).json({
      status: 'success',
      data: {
        isValid: true,
        hallTicket,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateHallTickets,
  getHallTicket,
  getStudentHallTickets,
  getExamHallTickets,
  verifyHallTicket,
};

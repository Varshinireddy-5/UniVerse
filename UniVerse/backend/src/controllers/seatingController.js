const { PrismaClient } = require('@prisma/client');
const { AppError } = require('../middleware/error');

const prisma = new PrismaClient();

// Create a new room (admin only)
const createRoom = async (req, res, next) => {
  try {
    const { name, capacity, rows, cols } = req.body;

    // Validate that rows * cols equals capacity
    if (rows * cols !== capacity) {
      return next(new AppError('Rows * Columns must equal capacity', 400));
    }

    // Check if room with same name already exists
    const existingRoom = await prisma.room.findUnique({
      where: { name },
    });

    if (existingRoom) {
      return next(new AppError('A room with this name already exists', 400));
    }

    const room = await prisma.room.create({
      data: {
        name,
        capacity: parseInt(capacity, 10),
        rows: parseInt(rows, 10),
        cols: parseInt(cols, 10),
      },
    });

    // Generate seats for the room
    const seats = [];
    for (let row = 1; row <= room.rows; row++) {
      for (let col = 1; col <= room.cols; col++) {
        seats.push({
          roomId: room.id,
          rowNumber: row,
          colNumber: col,
        });
      }
    }

    await prisma.seat.createMany({
      data: seats,
    });

    // Get the room with all its seats
    const roomWithSeats = await prisma.room.findUnique({
      where: { id: room.id },
      include: {
        seats: true,
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        room: roomWithSeats,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all rooms
const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        _count: {
          select: { seats: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.status(200).json({
      status: 'success',
      results: rooms.length,
      data: {
        rooms,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a single room with seats
const getRoom = async (req, res, next) => {
  try {
    const room = await prisma.room.findUnique({
      where: { id: req.params.id },
      include: {
        seats: {
          orderBy: [
            { rowNumber: 'asc' },
            { colNumber: 'asc' },
          ],
        },
      },
    });

    if (!room) {
      return next(new AppError('No room found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        room,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Generate seating allocation for an exam
const generateSeatingAllocation = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const { roomIds } = req.body;

    if (!roomIds || !Array.isArray(roomIds) || roomIds.length === 0) {
      return next(new AppError('Please provide at least one room ID', 400));
    }

    // Check if exam exists
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        course: {
          include: {
            studentCourses: {
              select: {
                student: {
                  select: {
                    id: true,
                    rollNo: true,
                  },
                },
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
    const students = exam.course.studentCourses.map(sc => sc.student);
    const studentCount = students.length;

    if (studentCount === 0) {
      return next(new AppError('No students enrolled in this course', 400));
    }

    // Get all seats from the specified rooms
    const rooms = await prisma.room.findMany({
      where: {
        id: { in: roomIds },
      },
      include: {
        seats: true,
      },
    });

    if (rooms.length === 0) {
      return next(new AppError('No rooms found with the provided IDs', 404));
    }

    // Calculate total available seats
    const totalSeats = rooms.reduce((sum, room) => sum + room.seats.length, 0);

    if (totalSeats < studentCount) {
      return next(new AppError('Not enough seats available for all students', 400));
    }

    // Check for existing allocations
    const existingAllocations = await prisma.seatingAllocation.findMany({
      where: { examId },
    });

    if (existingAllocations.length > 0) {
      return next(new AppError('Seating allocation already exists for this exam. Please clear existing allocations first.', 400));
    }

    // Shuffle students (Fisher-Yates algorithm)
    const shuffledStudents = [...students];
    for (let i = shuffledStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledStudents[i], shuffledStudents[j]] = [shuffledStudents[j], shuffledStudents[i]];
    }

    // Allocate seats to students
    const allocations = [];
    let studentIndex = 0;

    for (const room of rooms) {
      for (const seat of room.seats) {
        if (studentIndex >= shuffledStudents.length) break;

        allocations.push({
          examId,
          studentId: shuffledStudents[studentIndex].id,
          seatId: seat.id,
        });

        studentIndex++;
      }
      if (studentIndex >= shuffledStudents.length) break;
    }

    // Create allocations in the database
    const createdAllocations = await prisma.$transaction(
      allocations.map(allocation =>
        prisma.seatingAllocation.create({
          data: allocation,
          include: {
            student: {
              select: {
                id: true,
                fullName: true,
                rollNo: true,
              },
            },
            seat: {
              include: {
                room: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        })
      )
    );

    res.status(201).json({
      status: 'success',
      results: createdAllocations.length,
      data: {
        allocations: createdAllocations,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get seating allocation for an exam
const getExamSeatingAllocation = async (req, res, next) => {
  try {
    const { examId } = req.params;

    const allocations = await prisma.seatingAllocation.findMany({
      where: { examId },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            rollNo: true,
          },
        },
        seat: {
          include: {
            room: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          seat: {
            room: {
              name: 'asc',
            },
          },
        },
        {
          seat: {
            rowNumber: 'asc',
          },
        },
        {
          seat: {
            colNumber: 'asc',
          },
        },
      ],
    });

    if (allocations.length === 0) {
      return next(new AppError('No seating allocation found for this exam', 404));
    }

    // Group allocations by room for better frontend display
    const allocationsByRoom = allocations.reduce((acc, allocation) => {
      const roomName = allocation.seat.room.name;
      if (!acc[roomName]) {
        acc[roomName] = {
          roomId: allocation.seat.room.id,
          roomName,
          allocations: [],
        };
      }
      acc[roomName].allocations.push(allocation);
      return acc;
    }, {});

    res.status(200).json({
      status: 'success',
      results: allocations.length,
      data: {
        allocations: Object.values(allocationsByRoom),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a student's seat for an exam
const getStudentSeat = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const studentId = req.params.studentId || req.user.id;

    // Check if the requesting user is the student or an admin
    if (req.user.id !== studentId && !req.user.roles.includes('ADMIN', 'SEATING_MANAGER')) {
      return next(new AppError('Not authorized to access this resource', 403));
    }

    const allocation = await prisma.seatingAllocation.findFirst({
      where: {
        examId,
        studentId,
      },
      include: {
        seat: {
          include: {
            room: {
              select: {
                id: true,
                name: true,
              },
            },
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

    if (!allocation) {
      return next(new AppError('No seating allocation found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        allocation,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Clear seating allocation for an exam (admin only)
const clearSeatingAllocation = async (req, res, next) => {
  try {
    const { examId } = req.params;

    // Check if exam exists
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
    });

    if (!exam) {
      return next(new AppError('No exam found with that ID', 404));
    }

    // Delete all allocations for this exam
    await prisma.seatingAllocation.deleteMany({
      where: { examId },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoom,
  generateSeatingAllocation,
  getExamSeatingAllocation,
  getStudentSeat,
  clearSeatingAllocation,
};

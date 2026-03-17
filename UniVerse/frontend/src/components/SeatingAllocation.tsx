import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Shield, Navigation, Eye, AlertTriangle, Download, QrCode, Calendar, Clock, Building, Printer } from 'lucide-react';

export function SeatingAllocation({ user }: { user: any }) {
  const [selectedHall, setSelectedHall] = useState('Hall 201');
  const [showDirections, setShowDirections] = useState(false);

  const examHalls = [
    { name: 'Hall 201', block: 'A', capacity: 120, occupied: 98, exam: 'CS301 - Mid Sem', floor: '2nd Floor' },
    { name: 'Hall 202', block: 'A', capacity: 100, occupied: 85, exam: 'CS302 - Mid Sem', floor: '2nd Floor' },
    { name: 'Hall 305', block: 'B', capacity: 150, occupied: 142, exam: 'CS303 - Mid Sem', floor: '3rd Floor' },
  ];

  const yourExamDetails = {
    examName: 'CS301 - Data Structures Mid Semester',
    date: 'December 15, 2024',
    time: '10:00 AM - 12:00 PM',
    duration: '2 hours',
    hall: 'Hall 201',
    seat: 'A-45',
    block: 'A',
    floor: '2nd Floor',
    reportingTime: '9:30 AM',
  };

  // Mock seating grid (12x10 for better visualization)
  const seatGrid = Array(12).fill(0).map((_, row) =>
    Array(10).fill(0).map((_, col) => {
      const random = Math.random();
      if (random > 0.85) return 'empty';
      if (random > 0.7) return 'disabled';
      if (row === 4 && col === 5) return 'user'; // User's seat
      return random > 0.5 ? 'cs301' : 'cs302'; // Different subjects
    })
  );

  const nearbySeats = [
    { seat: 'A-44', student: 'Priya Sharma', subject: 'CS302', distance: '1 seat left' },
    { seat: 'A-46', student: 'Rohan Patel', subject: 'CS302', distance: '1 seat right' },
    { seat: 'B-45', student: 'Vivek Kumar', subject: 'CS303', distance: '1 row behind' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Exam Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{yourExamDetails.examName}</h2>
            <div className="flex items-center gap-6 text-gray-300">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {yourExamDetails.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {yourExamDetails.time}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Hall Ticket
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              View QR Code
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <p className="text-gray-400 text-sm mb-1">Seat Number</p>
            <p className="text-2xl font-bold text-white">{yourExamDetails.seat}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <p className="text-gray-400 text-sm mb-1">Hall & Block</p>
            <p className="text-2xl font-bold text-white">{yourExamDetails.hall}</p>
            <p className="text-sm text-gray-400">Block {yourExamDetails.block}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <p className="text-gray-400 text-sm mb-1">Floor</p>
            <p className="text-2xl font-bold text-white">{yourExamDetails.floor}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <p className="text-gray-400 text-sm mb-1">Reporting Time</p>
            <p className="text-2xl font-bold text-white">{yourExamDetails.reportingTime}</p>
          </div>
        </div>
      </motion.div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <MapPin className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">A-45</h3>
          <p className="text-gray-400">Your Seat Number</p>
          <p className="text-sm text-blue-400 mt-2">Hall 201, Block A</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <Shield className="w-8 h-8 text-purple-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">Anti-Cheat</h3>
          <p className="text-gray-400">Smart Algorithm</p>
          <p className="text-sm text-purple-400 mt-2">Optimized spacing</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <Users className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">325</h3>
          <p className="text-gray-400">Total Students</p>
          <p className="text-sm text-green-400 mt-2">Across 3 halls</p>
        </motion.div>
      </div>

      {/* Hall Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6">Exam Halls Overview</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {examHalls.map((hall, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-bold">{hall.name}</h4>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                  Block {hall.block}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{hall.exam}</p>
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">Occupancy</span>
                  <span className="text-white font-semibold">{hall.occupied}/{hall.capacity}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                    style={{ width: `${(hall.occupied / hall.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 3D Seat Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">3D Hall Map - Hall 201</h3>
            <p className="text-sm text-gray-400">Your seat is highlighted</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl transition-colors flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Get Directions
            </button>
            <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-xl transition-colors flex items-center gap-2">
              <Eye className="w-4 h-4" />
              AR View
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
            <span className="text-sm text-gray-400">Your Seat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-lg"></div>
            <span className="text-sm text-gray-400">CS301 Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
            <span className="text-sm text-gray-400">CS302 Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/10 rounded-lg border-2 border-white/20"></div>
            <span className="text-sm text-gray-400">Empty</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-800 rounded-lg"></div>
            <span className="text-sm text-gray-400">Disabled</span>
          </div>
        </div>

        {/* Seating Grid */}
        <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-800/50 rounded-xl p-8 overflow-x-auto">
          {/* Stage/Teacher Desk */}
          <div className="mb-6 text-center">
            <div className="inline-block px-12 py-3 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl border border-white/20">
              <p className="text-white font-bold">STAGE / TEACHER DESK</p>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="flex flex-col gap-3">
            {seatGrid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-3">
                {row.map((seat, colIndex) => {
                  if (seat === 'disabled') {
                    return (
                      <div
                        key={colIndex}
                        className="w-8 h-8 bg-gray-800 rounded-lg opacity-30"
                      />
                    );
                  }
                  if (seat === 'empty') {
                    return (
                      <div
                        key={colIndex}
                        className="w-8 h-8 bg-white/5 rounded-lg border-2 border-white/10"
                      />
                    );
                  }
                  if (seat === 'user') {
                    return (
                      <motion.div
                        key={colIndex}
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(168, 85, 247, 0.4)',
                            '0 0 0 8px rgba(168, 85, 247, 0)',
                            '0 0 0 0 rgba(168, 85, 247, 0)'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg cursor-pointer relative"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          A-45 (You)
                        </div>
                      </motion.div>
                    );
                  }
                  return (
                    <div
                      key={colIndex}
                      className={`w-8 h-8 ${
                        seat === 'cs301' ? 'bg-blue-500' : 'bg-green-500'
                      } rounded-lg cursor-pointer hover:opacity-80 transition-opacity`}
                      title={`Seat ${String.fromCharCode(65 + rowIndex)}-${colIndex + 1}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Row Labels */}
          <div className="mt-4 flex justify-center gap-8 text-sm text-gray-400">
            <span>← Left Wing</span>
            <span>Right Wing →</span>
          </div>
        </div>
      </motion.div>

      {/* Anti-Cheating Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-orange-400 flex-shrink-0" />
            <div>
              <h3 className="text-white font-bold mb-2">Anti-Cheating Algorithm</h3>
              <p className="text-sm text-gray-400 mb-4">
                Our smart seating system ensures:
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                  Maximum distance between same-subject students
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                  Different roll numbers in adjacent seats
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                  Optimal invigilator coverage
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                  Real-time seat swap detection
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="text-white font-bold mb-2">Special Accommodations</h3>
              <p className="text-sm text-gray-400 mb-4">
                We accommodate special needs:
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Wheelchair accessible seating
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Front row for hearing impaired
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Extra time allocations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Scribe assistance seating
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
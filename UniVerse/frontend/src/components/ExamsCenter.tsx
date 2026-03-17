import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Download, FileText, Award, Clock, CheckCircle, AlertCircle, BookOpen, TrendingUp, Brain, Target, Calculator, Bell, BookMarked, BarChart3, Lightbulb, Timer, ClipboardList, Flag, Eye, PieChart, QrCode, Navigation, Radio, Info, Boxes } from 'lucide-react';
import { api } from '../lib/api';

interface ExamsCenterProps {
  user: any;
}

export function ExamsCenter({ user }: ExamsCenterProps) {
  const [activeTab, setActiveTab] = useState<'schedule' | 'hallticket' | 'seating' | 'results' | 'map' | 'updates' | 'guidelines' | 'analytics'>('schedule');
  const [exams, setExams] = useState<any[]>([]);
  const [hallTickets, setHallTickets] = useState<any[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [mySeat, setMySeat] = useState<any | null>(null);
  const [loadingSeat, setLoadingSeat] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const summary = await api.get('/api/students/me/summary');
        const ue = (summary?.upcomingExams || []).map((e: any) => ({
          id: e.id,
          subject: e.course?.name || '',
          code: e.course?.code || '',
          date: e.examDate,
          startTime: e.startTime,
          endTime: e.endTime,
        }));
        setExams(ue);
      } catch (e) {}
      try {
        const tickets = await api.get('/api/hall-tickets/my-tickets');
        setHallTickets(tickets?.data?.hallTickets || []);
      } catch (e) {}
    })();
  }, []);

  const results = [] as any[];

  const seatingLayout = [
    ['A-1', 'A-2', 'A-3', 'A-4', 'A-5', 'A-6', 'A-7', 'A-8'],
    ['A-9', 'A-10', 'A-11', 'A-12', 'A-13', 'A-14', 'A-15', 'A-16'],
    ['', '', '', '', '', '', '', ''],
    ['B-1', 'B-2', 'B-3', 'B-4', 'B-5', 'B-6', 'B-7', 'B-8'],
    ['B-9', 'B-10', 'B-11', 'B-12', 'B-13', 'B-14', 'B-15', 'B-16'],
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 border border-purple-300">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">Examination Center</h2>
            <p className="text-gray-800">Schedules, hall tickets, seating, and results - all in one place</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[
          { id: 'schedule', label: 'Exam Schedule', icon: Calendar },
          { id: 'hallticket', label: 'Hall Ticket', icon: FileText },
          { id: 'seating', label: 'Seating Plan', icon: MapPin },
          { id: 'results', label: 'Results', icon: Award },
          { id: 'map', label: 'Map', icon: Navigation },
          { id: 'updates', label: 'Updates', icon: Info },
          { id: 'guidelines', label: 'Guidelines', icon: Radio },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'calculator', label: 'Calculator', icon: Calculator },
          { id: 'notifications', label: 'Notifications', icon: Bell },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-cyan-200'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          {exams.map((exam, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-1">{exam.subject}</h3>
                    <p className="text-sm text-gray-600 mb-3">Course Code: {exam.code}</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-cyan-600" />
                        <span className="text-sm">{formatDate(exam.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <span className="text-sm">{exam.startTime ? new Date(exam.startTime).toLocaleTimeString() : ''} {exam.endTime ? ' - ' + new Date(exam.endTime).toLocaleTimeString() : ''}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-cyan-600" />
                        <span className="text-sm">Exam Hall TBD</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Hall Ticket Tab */}
      {activeTab === 'hallticket' && (
        <div className="bg-white rounded-2xl border-2 border-cyan-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">UniVerse University</h2>
                <p className="text-cyan-100">Hall Tickets</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-cyan-100">Hall Ticket</p>
                <p className="text-xl font-bold">{user.name.split(' ')[0].toUpperCase()}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Student Name</p>
                    <p className="text-lg font-bold text-black">{user.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Roll Number</p>
                      <p className="font-semibold text-black">{user.rollNo || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Program</p>
                      <p className="font-semibold text-black">B.Tech Computer Science</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Semester</p>
                      <p className="font-semibold text-black">5th Semester</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Section</p>
                      <p className="font-semibold text-black">Section A</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-32 h-40 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center border-2 border-cyan-300">
                  <span className="text-4xl font-bold text-cyan-600">{user.name.split(' ').map((n: string) => n[0]).join('')}</span>
                </div>
                
                {/* QR Code */}
                <div className="bg-white p-3 rounded-xl border-2 border-cyan-300 shadow-md">
                  {hallTickets[0]?.qrCode ? (
                    <img src={hallTickets[0].qrCode} alt="QR" className="w-24 h-24 rounded" />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-white" />
                    </div>
                  )}
                  <p className="text-xs text-center text-gray-600 mt-2">Scan QR Code</p>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-cyan-200 pt-6">
              <h3 className="font-bold text-black mb-4 text-lg">Examination Details</h3>
              <div className="space-y-2">
                {exams.map((exam, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-black">{exam.code}</p>
                    <p className="text-black col-span-2">{exam.subject}</p>
                    <p className="text-gray-600">{formatDate(exam.date)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Instructions:</p>
                  <ul className="text-xs text-black space-y-1">
                    <li>• Report 30 minutes before exam time</li>
                    <li>• Bring valid ID card and hall ticket</li>
                    <li>• Mobile phones not allowed in exam hall</li>
                    <li>• Present QR code for verification</li>
                  </ul>
                </div>
                <div className="text-right">
                  <div className="inline-block border-t-2 border-black pt-2">
                    <p className="text-sm font-semibold text-black">Controller of Examinations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border-t border-cyan-200 flex justify-end gap-3">
            <button className="px-6 py-3 bg-white border border-cyan-300 text-cyan-600 rounded-xl hover:bg-cyan-50 transition-all flex items-center gap-2 font-semibold">
              <QrCode className="w-5 h-5" />
              Show QR Code
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold">
              <Download className="w-5 h-5" />
              Download Hall Ticket
            </button>
          </div>
        </div>
      )}

      {/* Seating Tab */}
      {activeTab === 'seating' && (
        <div className="space-y-6">
          {/* 3D View Header */}
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Boxes className="w-8 h-8 text-purple-600" />
                  <h3 className="text-2xl font-bold text-black">3D Seating Visualization</h3>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    className="px-3 py-2 border border-cyan-200 rounded-lg"
                    value={selectedExamId}
                    onChange={(e) => {
                      setSelectedExamId(e.target.value);
                      if (e.target.value) fetchMySeat(e.target.value);
                    }}
                  >
                    <option value="">Select exam</option>
                    {exams.map((ex) => (
                      <option key={ex.id} value={ex.id}>{ex.code} {ex.subject}</option>
                    ))}
                  </select>
                  <span className="text-gray-600">{loadingSeat ? 'Loading seat...' : ''}</span>
                </div>
                <p className="text-gray-600">{mySeat ? `Room ${mySeat.seat.room.name}` : ''}</p>
                <p className="text-gray-600">{mySeat ? `Row ${mySeat.seat.rowNumber}, Column ${mySeat.seat.colNumber}` : error ? error : ''}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-xl hover:bg-cyan-200 transition-all">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-all">
                  <Boxes className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3D Perspective Info */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200">
                <p className="text-sm text-gray-600 mb-1">Distance from Front</p>
                <p className="font-bold text-black">12 meters</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Bench Position</p>
                <p className="font-bold text-black">Left Side</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Near Facilities</p>
                <p className="font-bold text-black">Water, Exit</p>
              </div>
            </div>
          </div>

          {/* 3D Visualization */}
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <div className="mb-6 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
              <p className="text-center font-semibold text-black mb-2">🎓 FRONT - Invigilator Desk</p>
            </div>

            {/* 3D Effect Seating Layout */}
            <div className="space-y-3 perspective-1000">
              {seatingLayout.map((row, rowIndex) => (
                <motion.div
                  key={rowIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rowIndex * 0.1 }}
                  className="flex justify-center gap-3"
                  style={{
                    transform: `perspective(1000px) rotateX(${5 - rowIndex * 1}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {row.map((seat, seatIndex) => (
                    <div
                      key={seatIndex}
                      className={`w-20 h-20 rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all shadow-md ${
                        seat === ''
                          ? 'bg-transparent shadow-none'
                          : (mySeat && seat === `${String.fromCharCode(64 + mySeat.seat.rowNumber)}-${mySeat.seat.colNumber}`)
                          ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-2xl border-4 border-cyan-300 scale-110 animate-pulse'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 text-black hover:scale-105 hover:shadow-lg'
                      }`}
                      style={{
                        transform: (mySeat && seat === `${String.fromCharCode(64 + mySeat.seat.rowNumber)}-${mySeat.seat.colNumber}`) ? 'translateZ(20px)' : 'translateZ(0px)',
                      }}
                    >
                      {seat && (
                        <>
                          <span>{seat}</span>
                          {(mySeat && seat === `${String.fromCharCode(64 + mySeat.seat.rowNumber)}-${mySeat.seat.colNumber}`) && (
                            <span className="text-xs mt-1 bg-white/30 px-2 py-0.5 rounded">YOU</span>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg border-4 border-cyan-300 shadow-lg" />
                <span className="text-black font-semibold">Your Seat</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-300 shadow" />
                <span className="text-black">Other Seats</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-transparent rounded-lg border-2 border-dashed border-gray-300" />
                <span className="text-black">Aisle</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-black mb-1">Navigation Tips:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Enter from the main door and turn left</li>
                    <li>• Your seat is in the 5th row from the front</li>
                    <li>• Water fountain is 3 meters behind your seat</li>
                    <li>• Emergency exit is on your left side</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
              <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-3xl font-bold text-black mb-1">8.7</h3>
              <p className="text-gray-600">Current CGPA</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
              <Award className="w-8 h-8 text-cyan-600 mb-3" />
              <h3 className="text-3xl font-bold text-black mb-1">3/4</h3>
              <p className="text-gray-600">Results Published</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
              <CheckCircle className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="text-3xl font-bold text-black mb-1">100%</h3>
              <p className="text-gray-600">Pass Rate</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-cyan-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
                    <th className="text-left p-4 text-black font-semibold">Course Code</th>
                    <th className="text-left p-4 text-black font-semibold">Subject</th>
                    <th className="text-center p-4 text-black font-semibold">Marks</th>
                    <th className="text-center p-4 text-black font-semibold">Grade</th>
                    <th className="text-center p-4 text-black font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                    >
                      <td className="p-4 text-black font-semibold">{result.code}</td>
                      <td className="p-4 text-black">{result.subject}</td>
                      <td className="p-4 text-center text-black">
                        {result.marks !== null ? `${result.marks}/${result.total}` : '-'}
                      </td>
                      <td className="p-4 text-center">
                        {result.grade ? (
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            result.grade === 'A+' || result.grade === 'A' ? 'bg-green-100 text-green-700' :
                            result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {result.grade}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          result.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {result.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Map Tab */}
      {activeTab === 'map' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <Navigation className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-3xl font-bold text-black mb-1">Campus Map</h3>
            <p className="text-gray-600">Find your way around the campus</p>
          </div>

          <div className="bg-white rounded-2xl border border-cyan-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
                    <th className="text-left p-4 text-black font-semibold">Building</th>
                    <th className="text-left p-4 text-black font-semibold">Location</th>
                  </tr>
                </thead>
                <tbody>
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                  >
                    <td className="p-4 text-black font-semibold">Main Building</td>
                    <td className="p-4 text-black">Central Campus</td>
                  </motion.tr>
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                  >
                    <td className="p-4 text-black font-semibold">Science Building</td>
                    <td className="p-4 text-black">North Campus</td>
                  </motion.tr>
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                  >
                    <td className="p-4 text-black font-semibold">Library</td>
                    <td className="p-4 text-black">East Campus</td>
                  </motion.tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Updates Tab */}
      {activeTab === 'updates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <Info className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-3xl font-bold text-black mb-1">Exam Updates</h3>
            <p className="text-gray-600">Stay informed about exam changes</p>
          </div>

          <div className="bg-white rounded-2xl border border-cyan-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
                    <th className="text-left p-4 text-black font-semibold">Subject</th>
                    <th className="text-left p-4 text-black font-semibold">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingExams.map((exam, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                    >
                      <td className="p-4 text-black font-semibold">{exam.subject}</td>
                      <td className="p-4 text-black">
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Exam scheduled on {exam.date}</li>
                          <li>• Time: {exam.time}</li>
                          <li>• Room: {exam.room}</li>
                          <li>• Seat: {exam.seat}</li>
                        </ul>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Guidelines Tab */}
      {activeTab === 'guidelines' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <Radio className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-3xl font-bold text-black mb-1">Exam Guidelines</h3>
            <p className="text-gray-600">Follow these rules for a smooth exam experience</p>
          </div>

          <div className="bg-white rounded-2xl border border-cyan-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
                    <th className="text-left p-4 text-black font-semibold">Guideline</th>
                    <th className="text-left p-4 text-black font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                  >
                    <td className="p-4 text-black font-semibold">Report Early</td>
                    <td className="p-4 text-black">Report 30 minutes before exam time</td>
                  </motion.tr>
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                  >
                    <td className="p-4 text-black font-semibold">Bring ID</td>
                    <td className="p-4 text-black">Bring valid ID card and hall ticket</td>
                  </motion.tr>
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                  >
                    <td className="p-4 text-black font-semibold">No Mobile Phones</td>
                    <td className="p-4 text-black">Mobile phones not allowed in exam hall</td>
                  </motion.tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <BarChart3 className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-3xl font-bold text-black mb-1">Performance Analysis</h3>
            <p className="text-gray-600">Visualize your academic performance</p>
          </div>

          <div className="bg-white rounded-2xl border border-cyan-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
                    <th className="text-left p-4 text-black font-semibold">Subject</th>
                    <th className="text-left p-4 text-black font-semibold">Grade</th>
                    <th className="text-left p-4 text-black font-semibold">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                    >
                      <td className="p-4 text-black font-semibold">{result.subject}</td>
                      <td className="p-4 text-black">
                        {result.grade ? (
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            result.grade === 'A+' || result.grade === 'A' ? 'bg-green-100 text-green-700' :
                            result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {result.grade}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4 text-black">
                        {result.percentage ? `${result.percentage}%` : '-'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <Calculator className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-3xl font-bold text-black mb-1">Grade Calculator</h3>
            <p className="text-gray-600">Calculate your grades and CGPA</p>
          </div>

          <div className="bg-white rounded-2xl border border-cyan-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
                    <th className="text-left p-4 text-black font-semibold">Subject</th>
                    <th className="text-left p-4 text-black font-semibold">Marks Obtained</th>
                    <th className="text-left p-4 text-black font-semibold">Total Marks</th>
                    <th className="text-left p-4 text-black font-semibold">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                    >
                      <td className="p-4 text-black font-semibold">{result.subject}</td>
                      <td className="p-4 text-black">
                        {result.marks ? `${result.marks}/${result.total}` : '-'}
                      </td>
                      <td className="p-4 text-black">
                        {result.total ? `${result.total}` : '-'}
                      </td>
                      <td className="p-4 text-black">
                        {result.grade ? (
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            result.grade === 'A+' || result.grade === 'A' ? 'bg-green-100 text-green-700' :
                            result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {result.grade}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <Bell className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-3xl font-bold text-black mb-1">Exam Notifications</h3>
            <p className="text-gray-600">Stay updated with exam-related announcements</p>
          </div>

          <div className="bg-white rounded-2xl border border-cyan-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
                    <th className="text-left p-4 text-black font-semibold">Subject</th>
                    <th className="text-left p-4 text-black font-semibold">Notification</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingExams.map((exam, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                    >
                      <td className="p-4 text-black font-semibold">{exam.subject}</td>
                      <td className="p-4 text-black">
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Exam scheduled on {exam.date}</li>
                          <li>• Time: {exam.time}</li>
                          <li>• Room: {exam.room}</li>
                          <li>• Seat: {exam.seat}</li>
                        </ul>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

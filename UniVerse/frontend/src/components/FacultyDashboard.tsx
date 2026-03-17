import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, CheckCircle, Clock, TrendingUp, Award, FileText, Calendar, Mail, 
  Download, Upload, Search, Filter, Plus, Edit, Trash2, Send, Eye, X,
  BookOpen, Clipboard, Bell, AlertCircle, Target, BarChart3, PieChart,
  User, GraduationCap, MessageCircle, Share2, Printer, Save, RefreshCw,
  ChevronDown, ChevronRight, Star, ThumbsUp, Zap, Settings, QrCode,
  UserCheck, UserX, TrendingDown, FileCheck, Folder, Link2, Video, AlertTriangle
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { api } from '../lib/api.js';

interface FacultyDashboardProps {
  user: any;
  currentView: string;
}

export function FacultyDashboard({ user, currentView }: FacultyDashboardProps) {
  // Remove activeSection state since we now use currentView from props
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showMarksModal, setShowMarksModal] = useState(false);
  const [attendanceMode, setAttendanceMode] = useState<'manual' | 'qr'>('manual');
  const [classesData, setClassesData] = useState<any[]>([]);
  const [roster, setRoster] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/faculty/courses');
        setClassesData(res.items || []);
        if ((res.items || []).length > 0) setSelectedClass(res.items[0].id);
      } catch (e) { /* noop */ }
    })();
  }, []);

  useEffect(() => {
    if (!selectedClass) return;
    (async () => {
      try {
        const res = await api.get(`/api/faculty/courses/${selectedClass}/students`);
        setRoster(res.students || []);
      } catch (e) { /* noop */ }
    })();
  }, [selectedClass]);

  const students = [
    { id: 'STU001', name: 'Aarav Mehta', rollNo: '20CS001', attendance: 92, grade: 'A', cgpa: 8.5, email: 'aarav@university.edu', phone: '+91 9876543210', present: true, shortageAlert: false },
    { id: 'STU002', name: 'Priya Sharma', rollNo: '20CS002', attendance: 88, grade: 'A', cgpa: 8.2, email: 'priya@university.edu', phone: '+91 9876543211', present: true, shortageAlert: false },
    { id: 'STU003', name: 'Rohan Patel', rollNo: '20CS003', attendance: 65, grade: 'B', cgpa: 7.1, email: 'rohan@university.edu', phone: '+91 9876543212', present: false, shortageAlert: true },
    { id: 'STU004', name: 'Ananya Singh', rollNo: '20CS004', attendance: 95, grade: 'A+', cgpa: 9.2, email: 'ananya@university.edu', phone: '+91 9876543213', present: true, shortageAlert: false },
    { id: 'STU005', name: 'Vivek Kumar', rollNo: '20CS005', attendance: 82, grade: 'B+', cgpa: 7.8, email: 'vivek@university.edu', phone: '+91 9876543214', present: true, shortageAlert: false },
    { id: 'STU006', name: 'Ishita Reddy', rollNo: '20CS006', attendance: 90, grade: 'A', cgpa: 8.6, email: 'ishita@university.edu', phone: '+91 9876543215', present: true, shortageAlert: false },
    { id: 'STU007', name: 'Aditya Joshi', rollNo: '20CS007', attendance: 78, grade: 'B', cgpa: 7.5, email: 'aditya@university.edu', phone: '+91 9876543216', present: false, shortageAlert: false },
  ];

  const materials = [
    { id: 1, title: 'Unit 1 - Introduction to DS', type: 'PDF', size: '2.5 MB', uploadDate: '2024-01-15', downloads: 42 },
    { id: 2, title: 'Lecture 5 - Trees', type: 'PPT', size: '5.1 MB', uploadDate: '2024-01-20', downloads: 38 },
    { id: 3, title: 'Lab Assignment 3', type: 'PDF', size: '1.2 MB', uploadDate: '2024-01-25', downloads: 45 },
  ];

  const assignments = [
    { id: 1, title: 'Binary Trees Implementation', dueDate: '2024-12-15', submitted: 38, total: 45, status: 'active' },
    { id: 2, title: 'Sorting Algorithms', dueDate: '2024-12-10', submitted: 45, total: 45, status: 'completed' },
    { id: 3, title: 'Graph Traversal', dueDate: '2024-12-20', submitted: 12, total: 45, status: 'active' },
  ];

  const announcements = [
    { id: 1, title: 'Class Postponed', message: 'Tomorrow\'s class is postponed to next week', date: '2024-12-03', urgent: true },
    { id: 2, title: 'Assignment Extension', message: 'Assignment 3 deadline extended by 2 days', date: '2024-12-02', urgent: false },
  ];

  const attendanceTrend = [
    { week: 'Week 1', attendance: 88, avgGrade: 75 },
    { week: 'Week 2', attendance: 92, avgGrade: 78 },
    { week: 'Week 3', attendance: 85, avgGrade: 76 },
    { week: 'Week 4', attendance: 90, avgGrade: 80 },
    { week: 'Week 5', attendance: 94, avgGrade: 82 },
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 8, percentage: 18 },
    { grade: 'A', count: 12, percentage: 27 },
    { grade: 'B+', count: 10, percentage: 22 },
    { grade: 'B', count: 8, percentage: 18 },
    { grade: 'C', count: 5, percentage: 11 },
    { grade: 'F', count: 2, percentage: 4 },
  ];

  const performanceData = [
    { name: 'Aarav Mehta', internal1: 85, internal2: 90, assignments: 88 },
    { name: 'Priya Sharma', internal1: 82, internal2: 85, assignments: 86 },
    { name: 'Rohan Patel', internal1: 70, internal2: 68, assignments: 72 },
    { name: 'Ananya Singh', internal1: 95, internal2: 92, assignments: 94 },
  ];

  const lowPerformers = students.filter(s => s.attendance < 75 || s.cgpa < 7.5);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Dashboard View - Quick Stats Overview */}
      {currentView === 'dashboard' && (
        <>
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Faculty Dashboard</h2>
            <p className="text-gray-600">Welcome back, Prof. {user.name}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-white/30"
          >
            <Users className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">{roster.length}</h3>
            <p className="text-gray-600">Students in Selected Course</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl p-6 border border-white/30"
          >
            <BookOpen className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">{classesData.length}</h3>
            <p className="text-gray-600">Active Classes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/30"
          >
            <FileText className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">24</h3>
            <p className="text-gray-600">Materials Uploaded</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-white/30"
          >
            <AlertCircle className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">{students.filter(s => s.shortageAlert).length}</h3>
            <p className="text-gray-600">Shortage Alerts</p>
          </motion.div>
        </div>

        {/* Today's Schedule & Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-cyan-600" />
              Today's Schedule
            </h3>
            <div className="space-y-3">
              {[
                { time: '09:00 AM - 10:30 AM', subject: 'Data Structures', room: 'Room 301', batch: 'CSE-3A', students: 45 },
                { time: '11:00 AM - 12:30 PM', subject: 'Web Development', room: 'Lab 4', batch: 'CSE-3B', students: 42 },
                { time: '02:00 PM - 03:30 PM', subject: 'Advanced Algorithms', room: 'Room 205', batch: 'CSE-4A', students: 38 },
              ].map((lecture, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{lecture.subject}</h4>
                        <p className="text-sm text-gray-600">{lecture.time}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span>📍 {lecture.room}</span>
                          <span>👥 {lecture.batch}</span>
                          <span>🎓 {lecture.students} students</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      Mark Attendance
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-cyan-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-3 group">
                <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Upload Material</span>
              </button>
              <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-3 group">
                <Clipboard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Create Assignment</span>
              </button>
              <button className="w-full p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-3 group">
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Send Announcement</span>
              </button>
              <button className="w-full p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-3 group">
                <FileCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Create Quiz</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity & Students Needing Attention */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-cyan-600" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                { action: 'Uploaded lecture notes', subject: 'Data Structures - Unit 5', time: '2 hours ago', icon: Upload, color: 'from-blue-400 to-cyan-500' },
                { action: 'Graded assignment submissions', subject: 'Web Dev Assignment 3', time: '5 hours ago', icon: CheckCircle, color: 'from-green-400 to-teal-500' },
                { action: 'Published quiz results', subject: 'Algorithms Quiz 2', time: '1 day ago', icon: FileText, color: 'from-purple-400 to-pink-500' },
                { action: 'Sent class announcement', subject: 'All Classes - Holiday Notice', time: '2 days ago', icon: Bell, color: 'from-orange-400 to-red-500' },
              ].map((activity, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl flex items-center gap-4 hover:bg-gray-100 transition-colors">
                  <div className={`w-12 h-12 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.subject}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              Students Needing Attention
            </h3>
            <div className="space-y-3">
              {students.filter(s => s.shortageAlert || s.attendance < 75).slice(0, 4).map((student, idx) => (
                <div key={idx} className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.rollNo}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${student.attendance < 75 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {student.attendance}% Attendance
                        </span>
                        <span className="text-xs text-gray-600">CGPA: {student.cgpa}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-cyan-600" />
              Class Performance Overview
            </h3>
            <div className="space-y-4">
              {classesData.map((cls, idx) => {
                const avgScore = 72 + (idx * 5);
                return (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="font-bold text-gray-800">{cls.code}</span>
                        <span className="text-sm text-gray-600 ml-2">• {cls.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">Avg: {avgScore}%</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${avgScore}%` }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>Pass Rate: 95%</span>
                      <span>{cls.students} students</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Attendance Summary
            </h3>
            <div className="space-y-4">
              {classesData.map((cls, idx) => {
                const avgAttendance = 80 + (idx * 3);
                return (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="font-bold text-gray-800">{cls.code}</span>
                        <span className="text-sm text-gray-600 ml-2">• Section {cls.section}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{avgAttendance}% Average</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${avgAttendance}%` }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>Below 75%: {Math.floor(cls.students * 0.15)} students</span>
                      <span>Total Classes: 24</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pending Tasks & Top Performers */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clipboard className="w-6 h-6 text-purple-600" />
              Pending Tasks
            </h3>
            <div className="space-y-3">
              {[
                { task: 'Grade Assignment 3 submissions', class: 'CS301', count: '38 submissions', priority: 'high', dueDate: 'Today' },
                { task: 'Upload Unit 6 lecture notes', class: 'CS302', count: 'Required', priority: 'medium', dueDate: 'Tomorrow' },
                { task: 'Prepare Mid-term question paper', class: 'CS401', count: '50 questions', priority: 'high', dueDate: 'Dec 10' },
                { task: 'Review project proposals', class: 'CS301', count: '12 proposals', priority: 'low', dueDate: 'Dec 12' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl border-l-4 border-cyan-500 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-gray-800">{item.task}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.priority === 'high' ? 'bg-red-100 text-red-700' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>📚 {item.class}</span>
                        <span>• {item.count}</span>
                        <span>• Due: {item.dueDate}</span>
                      </div>
                    </div>
                    <button className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-600" />
              Top Performers This Month
            </h3>
            <div className="space-y-3">
              {students.filter(s => s.cgpa >= 8.5).slice(0, 4).map((student, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.rollNo}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          CGPA: {student.cgpa}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {student.attendance}% Attendance
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <ThumbsUp className="w-5 h-5 text-yellow-600" />
                      <span className="text-xs text-gray-600 mt-1">Excellence</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </>
      )}

      {/* Academic Delivery Section */}
      {currentView === 'academic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Class Selector */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Select Class</h3>
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Material
                </button>
              </div>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-500"
              >
                {classesData.map((cls) => (
                  <option key={cls.id || cls.code} value={cls.id || cls.code}>
                    {cls.code} - {cls.name} (Section {cls.section})
                  </option>
                ))}
              </select>
            </div>

            {/* Syllabus & Materials */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-cyan-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Course Syllabus</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-cyan-50 hover:bg-cyan-100 rounded-xl transition-colors text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">Current Syllabus</p>
                        <p className="text-sm text-gray-600">Last updated: Jan 2024</p>
                      </div>
                      <Eye className="w-5 h-5 text-cyan-600" />
                    </div>
                  </button>
                  <button className="w-full p-4 border-2 border-dashed border-cyan-300 hover:border-cyan-500 rounded-xl transition-colors text-center">
                    <Upload className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Update Syllabus</p>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-cyan-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-xl transition-all border border-blue-200">
                    <FileText className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-sm font-semibold text-gray-800">Upload Notes</p>
                  </button>
                  <button className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all border border-purple-200">
                    <Upload className="w-6 h-6 text-purple-600 mb-2" />
                    <p className="text-sm font-semibold text-gray-800">Upload PPT</p>
                  </button>
                  <button className="p-4 bg-gradient-to-br from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 rounded-xl transition-all border border-green-200">
                    <Clipboard className="w-6 h-6 text-green-600 mb-2" />
                    <p className="text-sm font-semibold text-gray-800">Assignment</p>
                  </button>
                  <button className="p-4 bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-xl transition-all border border-orange-200">
                    <Link2 className="w-6 h-6 text-orange-600 mb-2" />
                    <p className="text-sm font-semibold text-gray-800">Add Link</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Uploaded Materials */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Uploaded Materials</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search materials..."
                    className="px-4 py-2 bg-white border border-cyan-200 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                  <button className="p-2 bg-cyan-50 hover:bg-cyan-100 rounded-lg">
                    <Filter className="w-5 h-5 text-cyan-600" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {materials.map((material) => (
                  <div key={material.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{material.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{material.type}</span>
                            <span>{material.size}</span>
                            <span>{material.uploadDate}</span>
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {material.downloads} downloads
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white rounded-lg transition-colors">
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Assignments</h3>
                <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Assignment
                </button>
              </div>
              <div className="space-y-3">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        assignment.status === 'completed' ? 'bg-green-500/20 text-green-700' : 'bg-orange-500/20 text-orange-700'
                      }`}>
                        {assignment.status === 'completed' ? 'Completed' : 'Active'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Submissions</span>
                          <span className="text-sm font-semibold text-gray-800">{assignment.submitted}/{assignment.total}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Recent Announcements</h3>
                <button 
                  onClick={() => setShowAnnouncementModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  New Announcement
                </button>
              </div>
              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className={`p-4 rounded-xl border-l-4 ${
                    announcement.urgent ? 'bg-red-50 border-red-500' : 'bg-blue-50 border-blue-500'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-800">{announcement.title}</h4>
                          {announcement.urgent && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">Urgent</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{announcement.message}</p>
                        <p className="text-xs text-gray-500">{announcement.date}</p>
                      </div>
                      <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Attendance Section */}
        {currentView === 'attendance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Attendance Mode Selector */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Mark Attendance</h3>
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setAttendanceMode('manual')}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    attendanceMode === 'manual'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Manual Entry
                </button>
                <button
                  onClick={() => setAttendanceMode('qr')}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    attendanceMode === 'qr'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  QR Code
                </button>
              </div>

              {attendanceMode === 'qr' ? (
                <div className="text-center py-12">
                  <div className="w-64 h-64 bg-white border-4 border-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-32 h-32 text-cyan-500" />
                  </div>
                  <p className="text-gray-600 mb-2">Students can scan this QR code to mark attendance</p>
                  <p className="text-sm text-gray-500">Code expires in: 5:00</p>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors">
                      Refresh Code
                    </button>
                    <button className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors">
                      Download QR
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-500"
                    >
                      {classesData.map((cls) => (
                        <option key={cls.id || cls.code} value={cls.id || cls.code}>
                          {cls.code} - {cls.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={attendanceDate}
                      onChange={(e) => setAttendanceDate(e.target.value)}
                      className="px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {students.map((student) => (
                      <div key={student.id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.rollNo}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                              student.present
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4 inline mr-2" />
                            Present
                          </button>
                          <button
                            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                              !student.present
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                            }`}
                          >
                            <UserX className="w-4 h-4 inline mr-2" />
                            Absent
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Present: <span className="font-semibold text-green-600">{students.filter(s => s.present).length}</span>
                      {' / '}
                      Absent: <span className="font-semibold text-red-600">{students.filter(s => !s.present).length}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-colors font-semibold">
                        Cancel
                      </button>
                      <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                        Save Attendance
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bulk Upload */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Bulk Attendance Upload</h3>
              <div className="border-2 border-dashed border-cyan-300 rounded-xl p-8 text-center">
                <Upload className="w-12 h-12 text-cyan-500 mx-auto mb-3" />
                <p className="text-gray-700 font-semibold mb-2">Upload Excel/CSV File</p>
                <p className="text-sm text-gray-600 mb-4">Drag and drop or click to browse</p>
                <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors">
                  Choose File
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button className="text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Template
                </button>
                <button className="text-gray-600 hover:text-gray-700 font-semibold">
                  View Instructions
                </button>
              </div>
            </div>

            {/* Attendance Trends */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Attendance Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#06b6d4" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Shortage Alerts */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Shortage Alerts</h3>
                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send All Alerts
                </button>
              </div>
              <div className="space-y-3">
                {students.filter(s => s.shortageAlert).map((student) => (
                  <div key={student.id} className="p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-600">Attendance: {student.attendance}% (Below 75%)</p>
                      </div>
                      <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                        Send Alert
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Evaluation Section */}
        {currentView === 'evaluation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Marks Entry */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Internal Marks Entry</h3>
                <button 
                  onClick={() => setShowMarksModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Enter Marks
                </button>
              </div>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-500 mb-4"
              >
                {classesData.map((cls) => (
                  <option key={cls.id || cls.code} value={cls.id || cls.code}>
                    {cls.code} - {cls.name}
                  </option>
                ))}
              </select>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left">Roll No</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-center">Internal 1</th>
                      <th className="px-4 py-3 text-center">Internal 2</th>
                      <th className="px-4 py-3 text-center">Assignments</th>
                      <th className="px-4 py-3 text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.map((student, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-3">{`20CS00${index + 1}`}</td>
                        <td className="px-4 py-3">{student.name}</td>
                        <td className="px-4 py-3 text-center">
                          <input 
                            type="number" 
                            defaultValue={student.internal1}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                            max="100"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input 
                            type="number" 
                            defaultValue={student.internal2}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                            max="100"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input 
                            type="number" 
                            defaultValue={student.assignments}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                            max="100"
                          />
                        </td>
                        <td className="px-4 py-3 text-center font-semibold">
                          {Math.round((student.internal1 + student.internal2 + student.assignments) / 3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <button className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-colors font-semibold">
                  Cancel
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                  Save & Publish
                </button>
              </div>
            </div>

            {/* Model Papers */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Model Papers & Answer Keys</h3>
                <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <FileText className="w-8 h-8 text-cyan-600 mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-1">Mid-Sem Model Paper</h4>
                  <p className="text-sm text-gray-600 mb-3">Uploaded: Nov 2024</p>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-sm">
                      View
                    </button>
                    <button className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm">
                      Download
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <FileCheck className="w-8 h-8 text-purple-600 mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-1">Answer Key - Internal 1</h4>
                  <p className="text-sm text-gray-600 mb-3">Uploaded: Oct 2024</p>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-sm">
                      View
                    </button>
                    <button className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grade Distribution */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Grade Distribution</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.grade}: ${entry.percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {gradeDistribution.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-800">{grade.grade}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: `${grade.percentage}%`,
                              backgroundColor: ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][index]
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{grade.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Communication Section */}
        {currentView === 'communication' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Send Notification */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Send Notification</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Recipients</label>
                    <select className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-500">
                      <option>All Students</option>
                      <option>CS301 - Section A</option>
                      <option>CS302 - Section B</option>
                      <option>Individual Students</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                    <select className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-500">
                      <option>Normal</option>
                      <option>Important</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Enter subject..."
                    className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Enter your message..."
                    className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex-1 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-colors font-semibold">
                    Save as Draft
                  </button>
                  <button className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Notification
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Share Materials */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Share Materials Instantly</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-xl transition-all border border-blue-200 text-center">
                  <FileText className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <p className="font-semibold text-gray-800">Share Document</p>
                </button>
                <button className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all border border-purple-200 text-center">
                  <Link2 className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <p className="font-semibold text-gray-800">Share Link</p>
                </button>
                <button className="p-6 bg-gradient-to-br from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 rounded-xl transition-all border border-green-200 text-center">
                  <Video className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="font-semibold text-gray-800">Share Video</p>
                </button>
              </div>
            </div>

            {/* Message History */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Communications</h3>
              <div className="space-y-3">
                {[
                  { title: 'Assignment Reminder', sent: '2 hours ago', recipients: 45, type: 'normal' },
                  { title: 'Class Cancellation', sent: '1 day ago', recipients: 45, type: 'urgent' },
                  { title: 'New Study Material', sent: '2 days ago', recipients: 45, type: 'normal' },
                ].map((msg, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{msg.title}</h4>
                        <p className="text-sm text-gray-600">{msg.sent} • {msg.recipients} recipients</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {msg.type === 'urgent' && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">Urgent</span>
                        )}
                        <button className="p-2 hover:bg-white rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Section */}
        {currentView === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Class Performance */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Class Performance Reports</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="internal1" fill="#06b6d4" />
                  <Bar dataKey="internal2" fill="#8b5cf6" />
                  <Bar dataKey="assignments" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Low Performers */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Students Needing Attention</h3>
              <div className="space-y-3">
                {lowPerformers.map((student) => (
                  <div key={student.id} className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{student.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>Attendance: {student.attendance}%</span>
                          <span>CGPA: {student.cgpa}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance vs Performance */}
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Attendance vs Performance Insights</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#06b6d4" strokeWidth={3} />
                  <Line type="monotone" dataKey="avgGrade" stroke="#8b5cf6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Events Section */}
        {currentView === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Club Event Management</h3>
              <p className="text-gray-600 mb-4">As a club mentor, you can approve or review events here.</p>
              <div className="space-y-3">
                {[
                  { title: 'Tech Fest 2024', club: 'Tech Club', date: '2024-12-20', status: 'pending' },
                  { title: 'Coding Workshop', club: 'CS Club', date: '2024-12-15', status: 'approved' },
                ].map((event, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.club} • {event.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {event.status === 'pending' ? (
                          <>
                            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                              Approve
                            </button>
                            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="px-4 py-2 bg-green-500/20 text-green-700 rounded-lg font-semibold">
                            Approved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Students Section */}
        {currentView === 'students' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 border border-cyan-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Student Management</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="px-4 py-2 bg-white border border-cyan-200 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                  <button className="p-2 bg-cyan-50 hover:bg-cyan-100 rounded-lg">
                    <Filter className="w-5 h-5 text-cyan-600" />
                  </button>
                </div>
              </div>
              
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-500 mb-4"
              >
                <option value="all">All Classes</option>
                {classesData.map((cls) => (
                  <option key={cls.id || cls.code} value={cls.id || cls.code}>
                    {cls.code} - {cls.name}
                  </option>
                ))}
              </select>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left">Roll No</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-center">Attendance</th>
                      <th className="px-4 py-3 text-center">CGPA</th>
                      <th className="px-4 py-3 text-center">Grade</th>
                      <th className="px-4 py-3 text-center">Contact</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3">{student.rollNo}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-semibold text-gray-800">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            student.attendance >= 85 ? 'bg-green-500/20 text-green-700' :
                            student.attendance >= 75 ? 'bg-yellow-500/20 text-yellow-700' :
                            'bg-red-500/20 text-red-700'
                          }`}>
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-semibold text-gray-800">{student.cgpa}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-700 rounded-full text-xs font-semibold">
                            {student.grade}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Email">
                              <Mail className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Phone">
                              <MessageCircle className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm transition-colors">
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
    </div>
  );
}

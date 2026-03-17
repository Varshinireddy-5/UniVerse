import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp, TrendingDown, Calendar, CheckCircle, 
  AlertCircle, BookOpen, Clock, Target, Brain, Heart
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { api } from '../lib/api.js';

export function StudentDashboard({ user, onNavigate }: { user: any; onNavigate?: (view: string) => void }) {
  const [summary, setSummary] = useState<{ coursesCount: number; upcomingExams: any[]; upcomingEvents: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await api.get('/api/students/me/summary');
        if (isMounted) {
          setSummary(data);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const attendanceData = [
    { month: 'Aug', attendance: 85 },
    { month: 'Sep', attendance: 78 },
    { month: 'Oct', attendance: 92 },
    { month: 'Nov', attendance: 88 },
    { month: 'Dec', attendance: 95 },
  ];

  const gpaData = [
    { sem: 'Sem 1', gpa: 8.2 },
    { sem: 'Sem 2', gpa: 8.5 },
    { sem: 'Sem 3', gpa: 8.8 },
    { sem: 'Sem 4', gpa: 9.1 },
    { sem: 'Sem 5', gpa: 9.3 },
  ];

  const skillsData = [
    { subject: 'DSA', score: 90 },
    { subject: 'Web Dev', score: 85 },
    { subject: 'ML/AI', score: 75 },
    { subject: 'Database', score: 88 },
    { subject: 'Networks', score: 82 },
  ];

  const upcomingTasks = (summary?.upcomingExams || []).slice(0, 4).map((exam: any) => {
    const now = new Date();
    const date = new Date(exam.examDate);
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const due = diffDays <= 1 ? 'tomorrow' : `${diffDays} days`;
    const priority = diffDays <= 2 ? 'high' : diffDays <= 5 ? 'medium' : 'low';
    return { title: `${exam.examType} - ${exam.course?.code || ''}`, due, priority, subject: exam.course?.name || '' };
  });

  const upcomingEvents = (summary?.upcomingEvents || []).map((ev: any) => ({
    title: ev.title,
    date: new Date(ev.startDateTime).toLocaleDateString(),
    type: ev.status?.toLowerCase() || 'event',
    color: 'from-purple-500 to-blue-500',
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <CheckCircle className="w-6 h-6 text-purple-300" />
            </div>
            <span className="flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              +7%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">92%</h3>
          <p className="text-gray-400">Overall Attendance</p>
          <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-300" />
            </div>
            <span className="flex items-center text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              +0.2
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">9.3</h3>
          <p className="text-gray-400">Current CGPA</p>
          <div className="mt-3 flex items-center space-x-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full ${
                  i < 9 ? 'bg-gradient-to-r from-green-500 to-teal-500' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <BookOpen className="w-6 h-6 text-orange-300" />
            </div>
            <span className="flex items-center text-sm text-orange-400">
              <Clock className="w-4 h-4 mr-1" />
              4 pending
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{summary?.coursesCount ?? 0}</h3>
          <p className="text-gray-400">Active Courses</p>
          <p className="text-xs text-gray-500 mt-2">48 credit hours</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-pink-500/20 rounded-xl">
              <Heart className="w-6 h-6 text-pink-300" />
            </div>
            <span className="flex items-center text-sm text-yellow-400">
              <Brain className="w-4 h-4 mr-1" />
              Good
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">72%</h3>
          <p className="text-gray-400">Wellbeing Score</p>
          <p className="text-xs text-gray-500 mt-2">Stress: Low | Focus: High</p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Attendance Trend</h3>
              <p className="text-sm text-gray-400">Last 5 months</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Attendance %</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#fff'
                }} 
              />
              <Area type="monotone" dataKey="attendance" stroke="#a855f7" fillOpacity={1} fill="url(#colorAttendance)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* GPA Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">GPA Progress</h3>
              <p className="text-sm text-gray-400">Semester wise</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400">GPA</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={gpaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="sem" stroke="#9ca3af" />
              <YAxis domain={[0, 10]} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="gpa" fill="url(#colorGpa)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Tasks and Events */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Upcoming Tasks</h3>
              <p className="text-sm text-gray-400">4 tasks due this week</p>
            </div>
            <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    task.priority === 'high' ? 'bg-red-500/20' :
                    task.priority === 'medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                  }`}>
                    <Target className={`w-6 h-6 ${
                      task.priority === 'high' ? 'text-red-300' :
                      task.priority === 'medium' ? 'text-yellow-300' : 'text-green-300'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                      {task.title}
                    </h4>
                    <p className="text-sm text-gray-400">{task.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm text-white">{task.due}</p>
                    <p className={`text-xs ${
                      task.priority === 'high' ? 'text-red-400' :
                      task.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {task.priority.toUpperCase()}
                    </p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-purple-500 cursor-pointer"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">Skills Overview</h3>
            <p className="text-sm text-gray-400">Current semester</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="#ffffff20" />
              <PolarAngleAxis dataKey="subject" stroke="#9ca3af" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
              <Radar name="Score" dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
              <p className="text-sm text-gray-400">Next 2 weeks</p>
            </div>
            <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl transition-colors">
              View Calendar
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`relative overflow-hidden bg-gradient-to-br ${event.color} p-6 rounded-2xl cursor-pointer group hover:scale-105 transition-transform`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <Calendar className="w-8 h-8 text-white mb-3" />
                <h4 className="text-white font-bold mb-1">{event.title}</h4>
                <p className="text-white/80 text-sm mb-2">{event.date}</p>
                <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs rounded-full">
                  {event.type}
                </span>
              </div>
            </motion.div>
          ))}
          </div>
      </motion.div>
    </div>
  );
}

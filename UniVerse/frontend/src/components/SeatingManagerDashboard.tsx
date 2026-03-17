import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users, Building, Layout, Download, Upload, Shuffle,
  CheckCircle, AlertTriangle, Calendar, FileText, Settings,
  TrendingUp, MapPin, Grid, BarChart, Search, Filter,
  Eye, Edit, Trash2, Copy, RefreshCw, Bell, Clock, Plus,
  Printer, Send, Archive, Zap, Target, Activity, Database,
  Shield, Maximize2, Minimize2, Save, XCircle, CheckSquare,
  List, Monitor, Wifi, Lock, Unlock, UserCheck, AlertCircle
} from 'lucide-react';

interface SeatingManagerDashboardProps {
  user: any;
}

export function SeatingManagerDashboard({ user }: SeatingManagerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'allocate' | 'manage' | 'halls' | 'conflicts' | 'reports'>('allocate');
  const [students, setStudents] = useState('');
  const [rooms, setRooms] = useState('');
  const [benches, setBenches] = useState('');
  const [allocationGenerated, setAllocationGenerated] = useState(false);

  const stats = [
    { icon: Users, label: 'Total Students', value: '1,234', color: 'from-cyan-500 to-blue-500' },
    { icon: Building, label: 'Exam Halls', value: '12', color: 'from-purple-500 to-pink-500' },
    { icon: Layout, label: 'Total Capacity', value: '1,500', color: 'from-orange-500 to-red-500' },
    { icon: CheckCircle, label: 'Allocations Done', value: '8', color: 'from-green-500 to-teal-500' },
    { icon: AlertTriangle, label: 'Conflicts Detected', value: '3', color: 'from-red-500 to-pink-500' },
    { icon: Clock, label: 'Upcoming Exams', value: '5', color: 'from-indigo-500 to-purple-500' },
  ];

  const recentAllocations = [
    { exam: 'Mid-Sem CS301', date: '2024-03-15', students: 156, halls: 3, status: 'completed' },
    { exam: 'Final Year Projects', date: '2024-03-18', students: 89, halls: 2, status: 'completed' },
    { exam: 'End-Sem ECE202', date: '2024-03-22', students: 234, halls: 5, status: 'in-progress' },
  ];

  const handleGenerateSeating = () => {
    // Mock seating generation
    setAllocationGenerated(true);
    setTimeout(() => setAllocationGenerated(false), 3000);
  };

  const handleBulkUpload = () => {
    // Mock bulk upload
    alert('Please upload CSV with columns: StudentID, Name, Department, Semester');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-400/20 to-blue-400/20 backdrop-blur-xl rounded-2xl p-8 border border-cyan-300">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Seating Allocation Management</h2>
            <p>Manage exam seating allocations and generate randomized seating charts</p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center"
          >
            <Layout className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Quick Actions & Analytics Grid */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Quick Stats */}
        <div className="lg:col-span-3 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-cyan-600" />
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">1,234</h3>
            <p className="text-gray-600">Total Students</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Building className="w-10 h-10 text-purple-600" />
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">12 Active</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">12</h3>
            <p className="text-gray-600">Exam Halls</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
              <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">5 Pending</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">8</h3>
            <p className="text-gray-600">Completed</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              New Allocation
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm">
              <Upload className="w-4 h-4" />
              Import Data
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* System Overview & Smart Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Hall Capacity Overview */}
        <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            Hall Capacity Status
          </h3>
          <div className="space-y-4">
            {[
              { hall: 'Hall A', capacity: 100, used: 85, status: 'high' },
              { hall: 'Hall B', capacity: 120, used: 60, status: 'medium' },
              { hall: 'Hall C', capacity: 90, used: 30, status: 'low' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="font-semibold">{item.hall}</span>
                  <span className="text-gray-600">{item.used}/{item.capacity}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.status === 'high' ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                      item.status === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-green-500 to-teal-500'
                    }`}
                    style={{ width: `${(item.used / item.capacity) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Insights */}
        <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-600" />
            Smart Insights
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckSquare className="w-4 h-4 text-blue-600" />
                <p className="font-semibold text-sm text-blue-900">Optimal Utilization</p>
              </div>
              <p className="text-xs text-blue-700">Hall B has 50% vacancy - can accommodate 60 more students</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <p className="font-semibold text-sm text-yellow-900">Conflict Warning</p>
              </div>
              <p className="text-xs text-yellow-700">3 students have overlapping exam schedules</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="font-semibold text-sm text-green-900">Ready to Deploy</p>
              </div>
              <p className="text-xs text-green-700">2 allocations are ready for publication</p>
            </div>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Upcoming Exams
          </h3>
          <div className="space-y-3">
            {[
              { exam: 'Mid-Sem CS301', date: 'Dec 10', time: '10:00 AM', students: 156 },
              { exam: 'End-Sem ECE202', date: 'Dec 15', time: '02:00 PM', students: 234 },
              { exam: 'Final Year Projects', date: 'Dec 18', time: '09:00 AM', students: 89 },
            ].map((exam, idx) => (
              <div key={idx} className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                <p className="font-semibold text-sm mb-1">{exam.exam}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>📅 {exam.date}</span>
                  <span>🕐 {exam.time}</span>
                  <span>👥 {exam.students}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Tools */}
      <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyan-600" />
          Advanced Management Tools
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
              <Shuffle className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-center text-sm">AI Optimizer</p>
            <p className="text-xs text-gray-600 text-center mt-1">Smart allocation</p>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-center text-sm">Anti-Cheat</p>
            <p className="text-xs text-gray-600 text-center mt-1">Prevent proximity</p>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
              <Printer className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-center text-sm">Print Manager</p>
            <p className="text-xs text-gray-600 text-center mt-1">Batch printing</p>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-center text-sm">SMS/Email</p>
            <p className="text-xs text-gray-600 text-center mt-1">Notify students</p>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
              <Archive className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-center text-sm">Archive</p>
            <p className="text-xs text-gray-600 text-center mt-1">Past allocations</p>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
              <Copy className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-center text-sm">Clone Setup</p>
            <p className="text-xs text-gray-600 text-center mt-1">Reuse template</p>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-center text-sm">Live Monitor</p>
            <p className="text-xs text-gray-600 text-center mt-1">Real-time status</p>
          </button>
          
          <button className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-center text-sm">Data Backup</p>
            <p className="text-xs text-gray-600 text-center mt-1">Secure storage</p>
          </button>
        </div>
      </div>

      {/* Real-time Monitoring Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Hall Status Monitor
          </h3>
          <div className="space-y-3">
            {[
              { hall: 'Hall A', status: 'active', students: 85, invigilators: 2, signal: 'strong' },
              { hall: 'Hall B', status: 'active', students: 60, invigilators: 2, signal: 'medium' },
              { hall: 'Hall C', status: 'idle', students: 0, invigilators: 0, signal: 'strong' },
            ].map((hall, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${hall.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                    <h4 className="font-bold">{hall.hall}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className={`w-4 h-4 ${hall.signal === 'strong' ? 'text-green-600' : 'text-yellow-600'}`} />
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      hall.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {hall.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>👥 {hall.students} Students</span>
                  <span>👨‍🏫 {hall.invigilators} Invigilators</span>
                  <button className="text-cyan-600 hover:text-cyan-700 font-semibold">View &rarr;</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-600" />
            Recent Notifications
          </h3>
          <div className="space-y-3">
            {[
              { type: 'success', msg: 'Allocation CS301 completed successfully', time: '5 mins ago' },
              { type: 'warning', msg: 'Hall A capacity reaching limit', time: '15 mins ago' },
              { type: 'info', msg: 'New exam schedule uploaded', time: '1 hour ago' },
              { type: 'alert', msg: 'Conflict detected in allocation ECE202', time: '2 hours ago' },
            ].map((notif, idx) => (
              <div key={idx} className={`p-3 rounded-xl border-l-4 ${
                notif.type === 'success' ? 'bg-green-50 border-green-500' :
                notif.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                notif.type === 'alert' ? 'bg-red-50 border-red-500' :
                'bg-blue-50 border-blue-500'
              }`}>
                <p className="text-sm font-semibold mb-1">{notif.msg}</p>
                <p className="text-xs text-gray-600">{notif.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-cyan-200">
        {[
          { id: 'allocate', label: 'New Allocation', icon: Shuffle },
          { id: 'manage', label: 'Manage Existing', icon: Settings },
          { id: 'halls', label: 'Manage Halls', icon: Building },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 transition-all ${
              activeTab === tab.id
                ? 'border-b-2 border-cyan-500 text-cyan-600 font-semibold'
                : 'text-gray-600 hover:text-cyan-600'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'allocate' && (
        <div className="space-y-6">
          {/* Allocation Form */}
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Create New Seating Allocation</h3>
            
            <div className="space-y-6">
              {/* Exam Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Exam Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Mid-Sem Mathematics"
                    className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Exam Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              </div>

              {/* Data Input Methods */}
              <div className="border-t border-cyan-100 pt-6">
                <h4 className="font-semibold mb-4">Input Student Data</h4>
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={handleBulkUpload}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Bulk Upload CSV
                  </button>
                  <button className="flex-1 py-3 bg-white border border-cyan-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Users className="w-5 h-5" />
                    Select from Database
                  </button>
                </div>
              </div>

              {/* Manual Input */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Number of Students</label>
                  <input
                    type="number"
                    value={students}
                    onChange={(e) => setStudents(e.target.value)}
                    placeholder="e.g., 150"
                    className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Number of Rooms</label>
                  <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Benches per Room</label>
                  <input
                    type="number"
                    value={benches}
                    onChange={(e) => setBenches(e.target.value)}
                    placeholder="e.g., 30"
                    className="w-full px-4 py-3 bg-white border border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              </div>

              {/* Allocation Settings */}
              <div className="border-t border-cyan-100 pt-6">
                <h4 className="font-semibold mb-4">Allocation Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 bg-cyan-50 rounded-xl cursor-pointer hover:bg-cyan-100 transition-colors">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-cyan-500" />
                    <div>
                      <p className="font-semibold">Anti-Cheating Algorithm</p>
                      <p className="text-sm text-gray-600">Separate students from same class/branch</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-cyan-50 rounded-xl cursor-pointer hover:bg-cyan-100 transition-colors">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-cyan-500" />
                    <div>
                      <p className="font-semibold">Random Seating</p>
                      <p className="text-sm text-gray-600">Randomize seat allocation</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-cyan-50 rounded-xl cursor-pointer hover:bg-cyan-100 transition-colors">
                    <input type="checkbox" className="w-5 h-5 text-cyan-500" />
                    <div>
                      <p className="font-semibold">Special Accommodations</p>
                      <p className="text-sm text-gray-600">Reserve seats for students with special needs</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleGenerateSeating}
                  className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold"
                >
                  <Shuffle className="w-5 h-5" />
                  Generate Seating Allocation
                </button>
                <button className="px-6 py-4 bg-white border border-cyan-200 rounded-xl hover:bg-gray-50 transition-colors">
                  Preview
                </button>
              </div>

              {allocationGenerated && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-green-900">Allocation Generated Successfully!</p>
                    <p className="text-sm text-green-700">Seating chart is ready for export</p>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="space-y-6">
          {/* Recent Allocations */}
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recent Allocations</h3>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentAllocations.map((allocation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold">{allocation.exam}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📅 {allocation.date}</span>
                        <span>👥 {allocation.students} students</span>
                        <span>🏛️ {allocation.halls} halls</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        allocation.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {allocation.status}
                    </span>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Download className="w-5 h-5 text-cyan-600" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <FileText className="w-5 h-5 text-cyan-600" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'halls' && (
        <div className="space-y-6">
          {/* Manage Halls */}
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Manage Exam Halls</h3>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                Add New Hall
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Hall A</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Capacity: 100</span>
                      <span>Benches: 20</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Edit className="w-5 h-5 text-cyan-600" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5 text-cyan-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'conflicts' && (
        <div className="space-y-6">
          {/* Conflicts */}
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Detected Conflicts</h3>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                Resolve All
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Conflict in Hall A</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Exam: Mid-Sem CS301</span>
                      <span>Students: 156</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Edit className="w-5 h-5 text-cyan-600" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5 text-cyan-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Allocation Summary', desc: 'Overview of all allocations', icon: BarChart, color: 'from-cyan-500 to-blue-500' },
            { title: 'Hall Utilization', desc: 'Hall usage statistics', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
            { title: 'Student Distribution', desc: 'Department-wise distribution', icon: Users, color: 'from-orange-500 to-red-500' },
            { title: 'Export Reports', desc: 'Download detailed reports', icon: Download, color: 'from-green-500 to-teal-500' },
          ].map((report, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm cursor-pointer hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${report.color} rounded-xl flex items-center justify-center mb-4`}>
                <report.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">{report.title}</h3>
              <p className="text-sm text-gray-600">{report.desc}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
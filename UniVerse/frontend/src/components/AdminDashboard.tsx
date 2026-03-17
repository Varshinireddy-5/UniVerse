import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, TrendingUp, Building, FileText, Shield, AlertTriangle, CheckCircle, Plus, Edit, Trash2, Search, Download, Upload, Settings, Database, Server, Activity, Zap } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AdminDashboardProps {
  user: any;
  currentView: string;
}

export function AdminDashboard({ user, currentView }: AdminDashboardProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  const systemStats = [
    { label: 'Total Users', value: '2,340', change: '+12%', icon: Users, color: 'from-cyan-500 to-blue-500' },
    { label: 'Active Students', value: '1,850', change: '+5%', icon: Users, color: 'from-green-500 to-teal-500' },
    { label: 'Faculty Members', value: '145', change: '+3%', icon: Shield, color: 'from-purple-500 to-pink-500' },
    { label: 'System Health', value: '98%', change: 'Excellent', icon: CheckCircle, color: 'from-orange-500 to-red-500' },
  ];

  const enrollmentData = [
    { month: 'Jan', students: 1650, faculty: 120 },
    { month: 'Feb', students: 1700, faculty: 125 },
    { month: 'Mar', students: 1750, faculty: 130 },
    { month: 'Apr', students: 1800, faculty: 140 },
    { month: 'May', students: 1850, faculty: 145 },
  ];

  const platformUsage = [
    { name: 'Login Activity', value: 45000, color: '#06b6d4' },
    { name: 'Feature Usage', value: 35000, color: '#3b82f6' },
    { name: 'API Calls', value: 25000, color: '#8b5cf6' },
    { name: 'Data Transfers', value: 15000, color: '#ec4899' },
  ];

  const systemMetrics = [
    { time: '00:00', cpu: 45, memory: 62, requests: 1200 },
    { time: '04:00', cpu: 32, memory: 58, requests: 800 },
    { time: '08:00', cpu: 78, memory: 85, requests: 3200 },
    { time: '12:00', cpu: 92, memory: 91, requests: 4500 },
    { time: '16:00', cpu: 88, memory: 87, requests: 4200 },
    { time: '20:00', cpu: 65, memory: 72, requests: 2800 },
  ];

  const users = [
    { id: 'USR001', name: 'Alice Johnson', role: 'student', email: 'alice@university.edu', status: 'active', lastLogin: '2 hours ago', courses: 5 },
    { id: 'USR002', name: 'Prof. Bob Smith', role: 'faculty', email: 'bob.smith@university.edu', status: 'active', lastLogin: '5 hours ago', courses: 3 },
    { id: 'USR003', name: 'Charlie Brown', role: 'student', email: 'charlie@university.edu', status: 'inactive', lastLogin: '3 days ago', courses: 4 },
    { id: 'USR004', name: 'Diana Prince', role: 'faculty', email: 'diana@university.edu', status: 'active', lastLogin: '1 hour ago', courses: 2 },
    { id: 'USR005', name: 'Ethan Hunt', role: 'student', email: 'ethan@university.edu', status: 'active', lastLogin: '30 mins ago', courses: 6 },
  ];

  const recentActivity = [
    { action: 'New student enrollment', user: 'System', time: '5 mins ago', type: 'success' },
    { action: 'Faculty account created', user: 'Admin', time: '15 mins ago', type: 'info' },
    { action: 'Failed login attempt detected', user: 'Security', time: '1 hour ago', type: 'warning' },
    { action: 'Bulk grade upload completed', user: 'Prof. Smith', time: '2 hours ago', type: 'success' },
    { action: 'System backup completed', user: 'System', time: '6 hours ago', type: 'success' },
    { action: 'Database optimization performed', user: 'System', time: '8 hours ago', type: 'info' },
  ];

  const analyticsData = [
    { feature: 'Attendance', usage: 8500, growth: 15 },
    { feature: 'Exams', usage: 7200, growth: 22 },
    { feature: 'Study Materials', usage: 6800, growth: 18 },
    { feature: 'AI Assistant', usage: 5500, growth: 35 },
    { feature: 'Clubs & Events', usage: 4200, growth: 12 },
  ];

  if (currentView === 'dashboard') {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-cyan-400/20 to-blue-400/20 backdrop-blur-xl rounded-2xl p-8 border border-cyan-300">
          <h2 className="text-3xl font-bold text-black mb-2">System Administration</h2>
          <p className="text-black">Monitor and manage your university platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm"
            >
              <stat.icon className="w-8 h-8 text-cyan-600 mb-4" />
              <h3 className="text-3xl font-bold text-black mb-1">{stat.value}</h3>
              <p className="text-black mb-2">{stat.label}</p>
              <span className="text-sm text-cyan-600 font-semibold">{stat.change}</span>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm"
          >
            <h3 className="text-xl font-bold text-black mb-6">Enrollment Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', color: '#000' }} />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#06b6d4" strokeWidth={3} name="Students" />
                <Line type="monotone" dataKey="faculty" stroke="#8b5cf6" strokeWidth={3} name="Faculty" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm"
          >
            <h3 className="text-xl font-bold text-black mb-6">Platform Usage Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={platformUsage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', color: '#000' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm"
        >
          <h3 className="text-xl font-bold text-black mb-6">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-green-100' :
                    activity.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {activity.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                     activity.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-yellow-600" /> :
                     <FileText className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <p className="text-black font-semibold">{activity.action}</p>
                    <p className="text-sm text-black">by {activity.user}</p>
                  </div>
                </div>
                <span className="text-sm text-black">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentView === 'analytics') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">Platform Analytics</h2>
          <div className="flex gap-2">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                    : 'bg-white text-black hover:bg-gray-50 border border-cyan-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* System Performance */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Server className="w-8 h-8 text-cyan-600" />
              <span className="text-sm font-semibold text-green-600">Normal</span>
            </div>
            <h3 className="text-3xl font-bold text-black mb-1">76%</h3>
            <p className="text-black">CPU Usage</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-semibold text-green-600">Normal</span>
            </div>
            <h3 className="text-3xl font-bold text-black mb-1">82%</h3>
            <p className="text-black">Memory Usage</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-600" />
              <span className="text-sm font-semibold text-green-600">Excellent</span>
            </div>
            <h3 className="text-3xl font-bold text-black mb-1">3.2K</h3>
            <p className="text-black">Requests/min</p>
          </div>
        </div>

        {/* System Metrics Over Time */}
        <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
          <h3 className="text-xl font-bold text-black mb-6">System Performance (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={systemMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', color: '#000' }} />
              <Legend />
              <Area type="monotone" dataKey="cpu" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} name="CPU %" />
              <Area type="monotone" dataKey="memory" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Memory %" />
              <Area type="monotone" dataKey="requests" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Requests" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Feature Usage Analytics */}
        <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
          <h3 className="text-xl font-bold text-black mb-6">Feature Usage & Growth</h3>
          <div className="space-y-4">
            {analyticsData.map((item, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-black">{item.feature}</span>
                  <span className="text-sm text-green-600 font-semibold">+{item.growth}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${(item.usage / 10000) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-black">{item.usage.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'users') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">User Management</h2>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add User
            </button>
            <button className="px-4 py-2 bg-white border border-cyan-200 text-black rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button className="px-4 py-2 bg-white border border-cyan-200 text-black rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-cyan-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-cyan-200 flex items-center justify-between bg-gradient-to-br from-cyan-50 to-blue-50">
            <div className="flex gap-2">
              {['all', 'student', 'faculty', 'admin'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-xl capitalize transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 bg-white border border-cyan-200 rounded-xl text-black placeholder-gray-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyan-200 bg-gray-50">
                  <th className="text-left p-4 text-black font-semibold">User ID</th>
                  <th className="text-left p-4 text-black font-semibold">Name</th>
                  <th className="text-left p-4 text-black font-semibold">Email</th>
                  <th className="text-left p-4 text-black font-semibold">Role</th>
                  <th className="text-center p-4 text-black font-semibold">Courses</th>
                  <th className="text-left p-4 text-black font-semibold">Status</th>
                  <th className="text-left p-4 text-black font-semibold">Last Login</th>
                  <th className="text-center p-4 text-black font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-cyan-50/50 transition-colors"
                  >
                    <td className="p-4 text-black font-semibold">{user.id}</td>
                    <td className="p-4 text-black">{user.name}</td>
                    <td className="p-4 text-black">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'faculty' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'admin' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-center text-black">{user.courses}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-black">{user.lastLogin}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'system') {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-cyan-400/20 to-blue-400/20 backdrop-blur-xl rounded-2xl p-8 border border-cyan-300">
          <h2 className="text-3xl font-bold text-black mb-2">System Administration</h2>
          <p className="text-black">Monitor and manage your university platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm"
            >
              <stat.icon className="w-8 h-8 text-cyan-600 mb-4" />
              <h3 className="text-3xl font-bold text-black mb-1">{stat.value}</h3>
              <p className="text-black mb-2">{stat.label}</p>
              <span className="text-sm text-cyan-600 font-semibold">{stat.change}</span>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm"
          >
            <h3 className="text-xl font-bold text-black mb-6">Enrollment Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', color: '#000' }} />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#06b6d4" strokeWidth={3} name="Students" />
                <Line type="monotone" dataKey="faculty" stroke="#8b5cf6" strokeWidth={3} name="Faculty" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm"
          >
            <h3 className="text-xl font-bold text-black mb-6">Platform Usage Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={platformUsage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', color: '#000' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm"
        >
          <h3 className="text-xl font-bold text-black mb-6">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-green-100' :
                    activity.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {activity.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                     activity.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-yellow-600" /> :
                     <FileText className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <p className="text-black font-semibold">{activity.action}</p>
                    <p className="text-sm text-black">by {activity.user}</p>
                  </div>
                </div>
                <span className="text-sm text-black">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Advanced System Controls */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-purple-600" />
              Database Management
            </h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-between group">
                <span>Backup Database</span>
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-between group">
                <span>Restore Database</span>
                <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="w-full p-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-between group">
                <span>Optimize Tables</span>
                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between text-sm text-black mb-2">
                  <span>Database Size:</span>
                  <span className="font-semibold">2.4 GB</span>
                </div>
                <div className="flex justify-between text-sm text-black">
                  <span>Last Backup:</span>
                  <span className="font-semibold">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-orange-600" />
              Security & Access
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-black">Firewall Status</span>
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Active</span>
                </div>
                <p className="text-sm text-black">All ports secured</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-black">Failed Login Attempts</span>
                  <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">12</span>
                </div>
                <p className="text-sm text-black">Last hour</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-black">Active Sessions</span>
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">1,234</span>
                </div>
                <p className="text-sm text-black">Currently online</p>
              </div>
              <button className="w-full p-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all">
                View Security Logs
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <Server className="w-6 h-6 text-cyan-600" />
              Server Health
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-black">CPU Load</span>
                  <span className="font-semibold text-black">76%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '76%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-black">Memory Usage</span>
                  <span className="font-semibold text-black">82%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '82%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-black">Disk Space</span>
                  <span className="font-semibold text-black">45%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-teal-500" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-black">Network Load</span>
                  <span className="font-semibold text-black">58%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: '58%' }} />
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm text-black flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-600" />
                  Uptime: 99.98% (30 days)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
          <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-600" />
            Quick Actions
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-black text-center">Add New User</p>
              <p className="text-xs text-gray-600 text-center mt-1">Create account</p>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-black text-center">Bulk Import</p>
              <p className="text-xs text-gray-600 text-center mt-1">Upload CSV</p>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-black text-center">Generate Report</p>
              <p className="text-xs text-gray-600 text-center mt-1">Analytics & stats</p>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-black text-center">System Config</p>
              <p className="text-xs text-gray-600 text-center mt-1">Manage settings</p>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-black text-center">View Analytics</p>
              <p className="text-xs text-gray-600 text-center mt-1">Platform insights</p>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-black text-center">System Alerts</p>
              <p className="text-xs text-gray-600 text-center mt-1">12 pending</p>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-black text-center">Export Data</p>
              <p className="text-xs text-gray-600 text-center mt-1">Download files</p>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-black text-center">Approve Requests</p>
              <p className="text-xs text-gray-600 text-center mt-1">8 waiting</p>
            </button>
          </div>
        </div>

        {/* System Logs & User Management */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              System Logs (Real-time)
            </h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {[
                { level: 'INFO', message: 'User authentication successful', time: '14:32:15', user: 'admin@university.edu' },
                { level: 'WARNING', message: 'High memory usage detected', time: '14:30:42', user: 'System' },
                { level: 'INFO', message: 'Database backup completed', time: '14:28:03', user: 'System' },
                { level: 'ERROR', message: 'Failed login attempt from unknown IP', time: '14:25:19', user: '192.168.1.100' },
                { level: 'INFO', message: 'New user registration', time: '14:22:45', user: 'student@university.edu' },
                { level: 'INFO', message: 'Bulk grade upload completed', time: '14:20:12', user: 'faculty@university.edu' },
                { level: 'WARNING', message: 'SSL certificate expiring soon', time: '14:15:08', user: 'System' },
                { level: 'INFO', message: 'Cache cleared successfully', time: '14:10:33', user: 'admin@university.edu' },
              ].map((log, idx) => (
                <div key={idx} className={`p-3 rounded-lg border-l-4 ${
                  log.level === 'ERROR' ? 'bg-red-50 border-red-500' :
                  log.level === 'WARNING' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        log.level === 'ERROR' ? 'bg-red-600 text-white' :
                        log.level === 'WARNING' ? 'bg-yellow-600 text-white' :
                        'bg-blue-600 text-white'
                      }`}>{log.level}</span>
                      <p className="text-sm text-black">{log.message}</p>
                    </div>
                    <span className="text-xs text-black">{log.time}</span>
                  </div>
                  <p className="text-xs text-black mt-1 ml-16">{log.user}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-green-600" />
              Quick User Management
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <button className="flex-1 p-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add User
                </button>
                <button className="flex-1 p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" />
                  Bulk Import
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                  <Users className="w-8 h-8 text-cyan-600 mb-2" />
                  <h4 className="text-2xl font-bold text-black">1,850</h4>
                  <p className="text-sm text-black">Students</p>
                  <button className="mt-2 w-full py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm">
                    Manage
                  </button>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <Shield className="w-8 h-8 text-purple-600 mb-2" />
                  <h4 className="text-2xl font-bold text-black">145</h4>
                  <p className="text-sm text-black">Faculty</p>
                  <button className="mt-2 w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm">
                    Manage
                  </button>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <Settings className="w-8 h-8 text-orange-600 mb-2" />
                  <h4 className="text-2xl font-bold text-black">12</h4>
                  <p className="text-sm text-black">Admins</p>
                  <button className="mt-2 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm">
                    Manage
                  </button>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-200">
                  <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                  <h4 className="text-2xl font-bold text-black">2,007</h4>
                  <p className="text-sm text-black">Total Active</p>
                  <button className="mt-2 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                    View All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Analytics */}
        <div className="bg-white rounded-2xl p-6 border border-cyan-200 shadow-sm">
          <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            Feature Usage Analytics
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {analyticsData.map((feature, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-black mb-2">{feature.feature}</h4>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-black">{feature.usage.toLocaleString()}</p>
                    <p className="text-xs text-black">total uses</p>
                  </div>
                  <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    feature.growth > 30 ? 'bg-green-100 text-green-700' :
                    feature.growth > 15 ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    +{feature.growth}%
                  </div>
                </div>
                <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${(feature.usage / 10000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default view for other sections
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl p-8 border border-cyan-200 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-black mb-2">{currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h2>
        <p className="text-black">This section is under development</p>
      </div>
    </div>
  );
}

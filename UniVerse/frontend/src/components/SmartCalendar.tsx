import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight,
  Search, Bell, Download, X, MapPin, Users, BookOpen, Trophy,
  Target, Flame, Zap, CheckCircle, AlertCircle, Filter, Eye,
  Edit2, Trash2, Copy, Share2, TrendingUp, BarChart3, Home,
  Sunrise, Sunset, Moon, Sun
} from 'lucide-react';

export function SmartCalendar({ user }: { user: any }) {
  const [view, setView] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventFilter, setEventFilter] = useState('all');

  // Sample events data
  const events = [
    { id: 1, title: 'Data Structures', type: 'class', date: new Date(2025, 11, 4), startTime: '09:00', endTime: '10:00', location: 'Room 301', professor: 'Dr. Rajesh Kumar', color: 'blue' },
    { id: 2, title: 'Web Development Lab', type: 'lab', date: new Date(2025, 11, 4), startTime: '11:00', endTime: '13:00', location: 'Lab 202', professor: 'Prof. Priya Sharma', color: 'purple' },
    { id: 3, title: 'DBMS Mid-Sem Exam', type: 'exam', date: new Date(2025, 11, 4), startTime: '14:00', endTime: '17:00', location: 'Hall A', important: true, color: 'red' },
    { id: 4, title: 'Tech Club Meeting', type: 'club', date: new Date(2025, 11, 4), startTime: '17:00', endTime: '18:30', location: 'Club Room', color: 'green' },
    { id: 5, title: 'Machine Learning', type: 'class', date: new Date(2025, 11, 5), startTime: '10:00', endTime: '11:00', location: 'Room 205', professor: 'Dr. Ananya Iyer', color: 'blue' },
    { id: 6, title: 'AI Workshop', type: 'workshop', date: new Date(2025, 11, 5), startTime: '15:00', endTime: '18:00', location: 'Auditorium', important: true, color: 'orange' },
    { id: 7, title: 'OS Assignment Due', type: 'deadline', date: new Date(2025, 11, 6), startTime: '23:59', endTime: '23:59', location: 'Online Submit', important: true, color: 'red' },
    { id: 8, title: 'Basketball Practice', type: 'sports', date: new Date(2025, 11, 6), startTime: '17:00', endTime: '19:00', location: 'Sports Complex', color: 'yellow' },
    { id: 9, title: 'Cultural Night', type: 'event', date: new Date(2025, 11, 15), startTime: '18:00', endTime: '22:00', location: 'Auditorium', important: true, color: 'pink' },
  ];

  const eventTypes = [
    { id: 'all', label: 'All Events', color: 'bg-white/10', count: events.length },
    { id: 'class', label: 'Classes', color: 'bg-blue-500/20 text-blue-300', count: events.filter(e => e.type === 'class').length },
    { id: 'exam', label: 'Exams', color: 'bg-red-500/20 text-red-300', count: events.filter(e => e.type === 'exam').length },
    { id: 'club', label: 'Clubs', color: 'bg-green-500/20 text-green-300', count: events.filter(e => e.type === 'club').length },
    { id: 'deadline', label: 'Deadlines', color: 'bg-orange-500/20 text-orange-300', count: events.filter(e => e.type === 'deadline').length },
  ];

  const getEventColor = (color: string) => {
    const colors: any = {
      blue: 'from-blue-500 to-cyan-500',
      purple: 'from-purple-500 to-pink-500',
      red: 'from-red-500 to-orange-500',
      green: 'from-green-500 to-teal-500',
      orange: 'from-orange-500 to-yellow-500',
      yellow: 'from-yellow-500 to-orange-500',
      pink: 'from-pink-500 to-rose-500',
    };
    return colors[color] || 'from-gray-500 to-gray-600';
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const isSameDate = event.date.toDateString() === date.toDateString();
      const matchesFilter = eventFilter === 'all' || event.type === eventFilter;
      return isSameDate && matchesFilter;
    });
  };

  const getTodayEvents = () => {
    return events
      .filter(e => e.date.toDateString() === new Date().toDateString())
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Month View
  const MonthView = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    
    for (let i = 0; i < (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1); i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }

    return (
      <div className="space-y-4">
        {/* Calendar Grid */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2 border-b border-white/20 pb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-center py-2">
                <span className="text-xs font-bold text-cyan-400">{day}</span>
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 border-l border-t border-white/10">
            {days.map((date, index) => {
              if (!date) return (
                <div 
                  key={`empty-${index}`} 
                  className="aspect-square border-r border-b border-white/10 bg-white/[0.02]"
                />
              );
              
              const dayEvents = getEventsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const isPast = date < new Date() && !isToday;
              
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDate(date)}
                  className={`aspect-square p-2 border-r border-b border-white/10 transition-all relative ${
                    isToday
                      ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
                      : isSelected
                      ? 'bg-white/10'
                      : isPast
                      ? 'bg-white/[0.02] opacity-60'
                      : 'bg-white/[0.02] hover:bg-white/5'
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <span className={`text-xs font-bold mb-auto ${
                      isToday ? 'text-cyan-400' : isPast ? 'text-gray-500' : 'text-gray-300'
                    }`}>
                      {date.getDate()}
                    </span>
                    
                    {dayEvents.length > 0 && (
                      <div className="space-y-0.5 mt-1">
                        {dayEvents.slice(0, 2).map((event, i) => (
                          <div
                            key={i}
                            className={`h-1 rounded-full bg-gradient-to-r ${getEventColor(event.color)}`}
                          />
                        ))}
                        {dayEvents.length > 2 && (
                          <p className="text-[10px] text-cyan-400 font-semibold">+{dayEvents.length - 2}</p>
                        )}
                      </div>
                    )}
                  </div>
                  {isToday && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Events */}
        {getEventsForDate(selectedDate).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-cyan-400" />
              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            <div className="space-y-3">
              {getEventsForDate(selectedDate).map(event => (
                <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  // Week View
  const WeekView = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Day Headers */}
          <div className="grid grid-cols-8 gap-2 mb-3">
            <div className="p-2"></div>
            {weekDays.map((date, i) => {
              const isToday = date.toDateString() === new Date().toDateString();
              return (
                <div
                  key={i}
                  className={`text-center p-3 rounded-xl ${
                    isToday ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/40' : 'bg-white/5'
                  }`}
                >
                  <p className={`text-xs font-semibold mb-1 ${isToday ? 'text-cyan-300' : 'text-gray-400'}`}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className={`text-lg font-bold ${isToday ? 'text-white' : 'text-gray-300'}`}>
                    {date.getDate()}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Time Grid */}
          <div className="space-y-1">
            {hours.map(hour => (
              <div key={hour} className="grid grid-cols-8 gap-2">
                <div className="text-xs font-semibold text-gray-400 text-right py-2">
                  {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
                {weekDays.map((date, dayIndex) => {
                  const dayEvents = events.filter(event => {
                    const isSameDate = event.date.toDateString() === date.toDateString();
                    const eventHour = parseInt(event.startTime.split(':')[0]);
                    return isSameDate && eventHour === hour;
                  });

                  return (
                    <div
                      key={dayIndex}
                      className="min-h-[60px] p-1 rounded-lg bg-white/5 border border-white/10 relative"
                    >
                      {dayEvents.map(event => (
                        <motion.button
                          key={event.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedEvent(event)}
                          className={`absolute inset-1 p-2 rounded-lg bg-gradient-to-br ${getEventColor(event.color)} bg-opacity-20 border border-white/20`}
                        >
                          <p className="text-white text-xs font-bold truncate">{event.title}</p>
                          <p className="text-xs text-gray-300">{event.startTime}</p>
                        </motion.button>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Day View
  const DayView = () => {
    const dayEvents = getTodayEvents();
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const currentHour = new Date().getHours();

    return (
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Today's Schedule</h3>
              <p className="text-sm text-gray-400">{dayEvents.length} events</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-white">
                <Sun className="w-5 h-5 text-yellow-400" />
                <span className="text-xl font-bold">24°C</span>
              </div>
              <p className="text-xs text-gray-400">Partly Cloudy</p>
            </div>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {hours.map(hour => {
              const hourEvents = dayEvents.filter(e => parseInt(e.startTime.split(':')[0]) === hour);
              const isCurrent = hour === currentHour;

              return (
                <div key={hour} className="flex gap-4">
                  <div className={`w-20 text-sm font-semibold text-right py-2 ${
                    isCurrent ? 'text-cyan-400' : 'text-gray-500'
                  }`}>
                    {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                  </div>
                  <div className="flex-1 relative">
                    <div className={`min-h-[50px] border-l-2 pl-4 ${
                      isCurrent ? 'border-cyan-500' : 'border-white/10'
                    }`}>
                      {hourEvents.map(event => (
                        <motion.button
                          key={event.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedEvent(event)}
                          className={`w-full mb-2 p-3 rounded-xl bg-gradient-to-r ${getEventColor(event.color)} bg-opacity-20 border border-white/20 text-left`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-bold text-sm">{event.title}</p>
                              <p className="text-xs text-gray-300">{event.startTime} - {event.endTime}</p>
                            </div>
                            <MapPin className="w-4 h-4 text-gray-400" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h4 className="text-white font-bold mb-4">Today's Summary</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Total Events</span>
                <span className="text-white font-bold text-lg">{dayEvents.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Hours Scheduled</span>
                <span className="text-white font-bold text-lg">8h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Free Time</span>
                <span className="text-white font-bold text-lg">16h</span>
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Up Next
            </h4>
            <div className="space-y-3">
              {dayEvents.slice(0, 3).map(event => (
                <div key={event.id} className={`p-3 rounded-xl bg-gradient-to-br ${getEventColor(event.color)} bg-opacity-10 border border-white/10`}>
                  <p className="text-white font-bold text-sm mb-1">{event.title}</p>
                  <p className="text-xs text-gray-400">{event.startTime} • {event.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Agenda View
  const AgendaView = () => {
    const next7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });

    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="space-y-6">
          {next7Days.map(date => {
            const dayEvents = getEventsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <div key={date.toDateString()} className={`pb-6 border-b border-white/10 last:border-0 last:pb-0`}>
                <div className={`flex items-center gap-4 mb-4 ${isToday ? 'text-cyan-400' : 'text-gray-400'}`}>
                  <div className={`text-center p-3 rounded-xl ${isToday ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
                    <p className="text-xs font-semibold mb-1">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className="text-2xl font-bold">{date.getDate()}</p>
                  </div>
                  <div>
                    <p className="text-white font-bold">
                      {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-400">{dayEvents.length} events</p>
                  </div>
                </div>
                
                {dayEvents.length > 0 ? (
                  <div className="space-y-2 ml-20">
                    {dayEvents.map(event => (
                      <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm ml-20">No events scheduled</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Event Card Component
  const EventCard = ({ event, onClick }: any) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`w-full p-4 rounded-xl bg-gradient-to-r ${getEventColor(event.color)} bg-opacity-10 border border-white/10 hover:border-white/20 transition-all text-left`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-white font-bold">{event.title}</h4>
        {event.important && (
          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">Important</span>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-300">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {event.startTime} - {event.endTime}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {event.location}
        </span>
      </div>
      {event.professor && (
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
          <Users className="w-3 h-3" />
          {event.professor}
        </p>
      )}
    </motion.button>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Smart Calendar</h2>
          <p className="text-gray-400">Manage your schedule efficiently</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <Download className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">28</h3>
          <p className="text-gray-300 text-sm">Classes This Week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">12</h3>
          <p className="text-gray-300 text-sm">Day Streak</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">87%</h3>
          <p className="text-gray-300 text-sm">Attendance Rate</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <Clock className="w-5 h-5 text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">3</h3>
          <p className="text-gray-300 text-sm">Upcoming Deadlines</p>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* View Switcher */}
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          {[
            { id: 'month', label: 'Month', icon: CalendarIcon },
            { id: 'week', label: 'Week', icon: BarChart3 },
            { id: 'day', label: 'Day', icon: Clock },
            { id: 'agenda', label: 'Agenda', icon: Eye },
          ].map(v => (
            <motion.button
              key={v.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView(v.id as any)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                view === v.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <v.icon className="w-4 h-4" />
              <span className="text-sm font-semibold">{v.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Date Navigation */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevMonth}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
          
          <div className="text-center min-w-[200px]">
            <h3 className="text-xl font-bold text-white">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextMonth}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToToday}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 transition-colors font-semibold text-sm"
          >
            Today
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEventModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white transition-colors font-semibold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </motion.button>
        </div>
      </div>

      {/* Event Filters */}
      <div className="flex flex-wrap gap-2">
        {eventTypes.map(type => (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEventFilter(type.id)}
            className={`px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
              eventFilter === type.id
                ? 'bg-white/20 text-white border border-white/30'
                : `${type.color} border border-white/10 hover:bg-white/10`
            }`}
          >
            {type.label} ({type.count})
          </motion.button>
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'month' && <MonthView />}
          {view === 'week' && <WeekView />}
          {view === 'day' && <DayView />}
          {view === 'agenda' && <AgendaView />}
        </motion.div>
      </AnimatePresence>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showEventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowEventModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full border border-cyan-400/30 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Add New Event</h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 block">Event Title</label>
                  <input
                    type="text"
                    placeholder="Enter event title..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Type</label>
                    <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors">
                      <option value="class">Class</option>
                      <option value="exam">Exam</option>
                      <option value="club">Club</option>
                      <option value="deadline">Deadline</option>
                      <option value="event">Event</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Start Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">End Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 block">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 block">Description (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Add details..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-colors font-semibold shadow-lg shadow-cyan-500/20"
                >
                  Add Event
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`bg-gradient-to-br ${getEventColor(selectedEvent.color)} bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 max-w-lg w-full border border-white/20 shadow-2xl`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                    {selectedEvent.type}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-3">{selectedEvent.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-200">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{selectedEvent.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <Clock className="w-5 h-5" />
                  <span>{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <MapPin className="w-5 h-5" />
                  <span>{selectedEvent.location}</span>
                </div>
                {selectedEvent.professor && (
                  <div className="flex items-center gap-3 text-gray-200">
                    <Users className="w-5 h-5" />
                    <span>{selectedEvent.professor}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-6">
                <button className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors flex items-center justify-center gap-2 font-semibold">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors flex items-center justify-center gap-2 font-semibold">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors font-semibold">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
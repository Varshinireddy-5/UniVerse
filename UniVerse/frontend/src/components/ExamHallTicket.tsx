import { motion } from 'motion/react';
import { QrCode, Calendar, MapPin, Clock, Download, CheckCircle, AlertCircle, TrendingUp, Target } from 'lucide-react';

export function ExamHallTicket({ user }: { user: any }) {
  const upcomingExams = [
    {
      subject: 'Data Structures & Algorithms',
      code: 'CS301',
      date: '2024-12-20',
      time: '09:00 AM - 12:00 PM',
      venue: 'Block A, Hall 201',
      seat: 'A-45',
      status: 'confirmed',
      hallTicket: 'HT2024CS301045'
    },
    {
      subject: 'Web Development',
      code: 'CS302',
      date: '2024-12-22',
      time: '02:00 PM - 05:00 PM',
      venue: 'Block B, Hall 305',
      seat: 'B-32',
      status: 'confirmed',
      hallTicket: 'HT2024CS302032'
    },
    {
      subject: 'Database Management Systems',
      code: 'CS303',
      date: '2024-12-25',
      time: '09:00 AM - 12:00 PM',
      venue: 'Block A, Hall 203',
      seat: 'A-67',
      status: 'pending',
      hallTicket: 'HT2024CS303067'
    },
  ];

  const pastResults = [
    { subject: 'Programming in C', code: 'CS101', marks: 92, grade: 'A+', gpa: 9.5 },
    { subject: 'Digital Logic', code: 'CS102', marks: 88, grade: 'A', gpa: 9.0 },
    { subject: 'Data Structures', code: 'CS201', marks: 95, grade: 'A+', gpa: 10.0 },
    { subject: 'Operating Systems', code: 'CS202', marks: 85, grade: 'A', gpa: 8.5 },
  ];

  const weakTopics = [
    { topic: 'Graph Algorithms', subject: 'CS301', confidence: 45, priority: 'high' },
    { topic: 'React Hooks', subject: 'CS302', confidence: 62, priority: 'medium' },
    { topic: 'SQL Joins', subject: 'CS303', confidence: 58, priority: 'medium' },
    { topic: 'Binary Trees', subject: 'CS301', confidence: 35, priority: 'high' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Hall Tickets Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Upcoming Exams & Hall Tickets</h2>
            <p className="text-gray-400">Download your hall tickets and exam schedules</p>
          </div>
          <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl transition-colors">
            Download All
          </button>
        </div>

        {upcomingExams.map((exam, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{exam.subject}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      exam.status === 'confirmed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {exam.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-gray-400">{exam.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-400">{exam.hallTicket}</p>
                  <p className="text-sm text-gray-400">Hall Ticket No.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                  <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Date</p>
                    <p className="text-white font-semibold">
                      {new Date(exam.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                  <Clock className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Time</p>
                    <p className="text-white font-semibold">{exam.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                  <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Venue</p>
                    <p className="text-white font-semibold">{exam.venue}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                  <Target className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Seat Number</p>
                    <p className="text-white font-semibold">{exam.seat}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 flex items-center gap-4">
                  {/* QR Code */}
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2">
                    <QrCode className="w-full h-full text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">Scan this QR code for verification at the exam hall</p>
                    <div className="flex items-center gap-2">
                      {exam.status === 'confirmed' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">Verified & Ready</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-yellow-400">Awaiting Confirmation</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Ticket
                  </button>
                  <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
                    View Seat Map
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Results & Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Past Results */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Recent Results</h3>
              <p className="text-sm text-gray-400">Your exam performance</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-400">9.25</p>
              <p className="text-xs text-gray-400">Avg GPA</p>
            </div>
          </div>

          <div className="space-y-3">
            {pastResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <div className="flex-1">
                  <p className="text-white font-semibold mb-1">{result.subject}</p>
                  <p className="text-sm text-gray-400">{result.code}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">{result.marks}</p>
                    <p className="text-xs text-gray-400">/ 100</p>
                  </div>
                  <div className={`px-3 py-1 rounded-lg font-bold ${
                    result.grade.includes('+') ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {result.grade}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl border border-green-500/20">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-white font-semibold">Performance Trend</p>
                <p className="text-sm text-gray-400">Your grades are consistently improving!</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Weak Topics Detection */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Weak Topics Analysis</h3>
            <p className="text-sm text-gray-400">AI-detected areas that need more focus</p>
          </div>

          <div className="space-y-4">
            {weakTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 bg-white/5 rounded-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold">{topic.topic}</p>
                    <p className="text-sm text-gray-400">{topic.subject}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    topic.priority === 'high' 
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {topic.priority.toUpperCase()}
                  </span>
                </div>

                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-400">Confidence Level</span>
                    <span className={`font-semibold ${
                      topic.confidence < 50 ? 'text-red-400' :
                      topic.confidence < 70 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {topic.confidence}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        topic.confidence < 50 ? 'bg-red-500' :
                        topic.confidence < 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${topic.confidence}%` }}
                    />
                  </div>
                </div>

                <button className="w-full mt-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors text-sm">
                  Generate Study Material
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Score Prediction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">AI Score Prediction</h3>
            <p className="text-gray-400">Based on your preparation and past performance</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {upcomingExams.map((exam, index) => (
            <div key={index} className="p-6 bg-white/5 rounded-xl">
              <p className="text-white font-semibold mb-1">{exam.code}</p>
              <p className="text-sm text-gray-400 mb-4">{exam.subject}</p>
              <div className="text-center mb-3">
                <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                  87%
                </p>
                <p className="text-xs text-gray-400 mt-1">Predicted Score</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Good preparation</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

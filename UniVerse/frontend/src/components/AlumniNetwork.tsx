import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, MessageCircle, Star, TrendingUp, Award, Users, MapPin, Building, 
  Search, Filter, Globe, GraduationCap, Heart, Share2, Mail, Phone, Linkedin,
  Calendar, Clock, DollarSign, BookOpen, Trophy, Target, Zap, Video, Send,
  UserPlus, CheckCircle, Gift, TrendingDown, BarChart3, PieChart, Flame,
  Network, MessageSquare, Bell, Download, Upload, Eye, ThumbsUp, Sparkles
} from 'lucide-react';

export function AlumniNetwork({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<'directory' | 'connections' | 'jobs' | 'mentorship' | 'events' | 'stories' | 'groups' | 'giving'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const alumni = [
    {
      name: 'Dr. Ananya Sharma',
      batch: '2015',
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      skills: ['Machine Learning', 'Cloud Computing', 'Python'],
      avatar: 'AS',
      mentorAvailable: true,
      rating: 4.9,
      connections: 234,
      degree: 'B.Tech Computer Science',
      isConnected: false
    },
    {
      name: 'Rajesh Patel',
      batch: '2017',
      company: 'Microsoft',
      position: 'Product Manager',
      location: 'Seattle, WA',
      skills: ['Product Strategy', 'Agile', 'Data Analysis'],
      avatar: 'RP',
      mentorAvailable: true,
      rating: 4.8,
      connections: 456,
      degree: 'B.Tech Electronics',
      isConnected: true
    },
    {
      name: 'Priya Iyer',
      batch: '2016',
      company: 'Amazon',
      position: 'Tech Lead',
      location: 'Austin, TX',
      skills: ['AWS', 'DevOps', 'System Design'],
      avatar: 'PI',
      mentorAvailable: false,
      rating: 4.7,
      connections: 189,
      degree: 'M.Tech AI',
      isConnected: false
    },
    {
      name: 'Vikram Malhotra',
      batch: '2018',
      company: 'Meta',
      position: 'Data Scientist',
      location: 'Menlo Park, CA',
      skills: ['Deep Learning', 'NLP', 'TensorFlow'],
      avatar: 'VM',
      mentorAvailable: true,
      rating: 4.9,
      connections: 312,
      degree: 'B.Tech CS',
      isConnected: true
    },
    {
      name: 'Sneha Reddy',
      batch: '2019',
      company: 'Tesla',
      position: 'Robotics Engineer',
      location: 'Palo Alto, CA',
      skills: ['Robotics', 'Computer Vision', 'ROS'],
      avatar: 'SR',
      mentorAvailable: true,
      rating: 4.8,
      connections: 167,
      degree: 'B.Tech Mechanical',
      isConnected: false
    },
    {
      name: 'Arjun Nair',
      batch: '2014',
      company: 'Apple',
      position: 'Engineering Manager',
      location: 'Cupertino, CA',
      skills: ['iOS', 'Swift', 'Team Leadership'],
      avatar: 'AN',
      mentorAvailable: true,
      rating: 5.0,
      connections: 523,
      degree: 'B.Tech CS',
      isConnected: true
    },
  ];

  const jobs = [
    {
      title: 'Full Stack Developer Internship',
      company: 'Tech Startup Inc.',
      location: 'Remote',
      type: 'Internship',
      duration: '3 months',
      stipend: '$2000/month',
      postedBy: 'Ananya Sharma',
      applicants: 45,
      deadline: '2024-12-20',
      color: 'from-blue-500 to-cyan-500',
      skills: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'ML Engineer - Entry Level',
      company: 'AI Solutions Corp',
      location: 'New York, NY',
      type: 'Full-time',
      duration: 'Permanent',
      stipend: '$95k/year',
      postedBy: 'Rajesh Patel',
      applicants: 78,
      deadline: '2024-12-25',
      color: 'from-purple-500 to-pink-500',
      skills: ['Python', 'PyTorch', 'ML Ops']
    },
    {
      title: 'Research Assistant',
      company: 'University Research Lab',
      location: 'Boston, MA',
      type: 'Part-time',
      duration: '6 months',
      stipend: '$25/hour',
      postedBy: 'Priya Iyer',
      applicants: 23,
      deadline: '2024-12-15',
      color: 'from-green-500 to-teal-500',
      skills: ['Research', 'Python', 'Data Analysis']
    },
    {
      title: 'Product Designer',
      company: 'Design Studio XYZ',
      location: 'San Francisco, CA',
      type: 'Full-time',
      duration: 'Permanent',
      stipend: '$105k/year',
      postedBy: 'Vikram Malhotra',
      applicants: 34,
      deadline: '2024-12-28',
      color: 'from-orange-500 to-red-500',
      skills: ['Figma', 'UI/UX', 'Design Systems']
    },
  ];

  const mentorshipSessions = [
    {
      mentor: 'Dr. Ananya Sharma',
      topic: 'Career Path in AI/ML',
      date: '2024-12-10',
      time: '6:00 PM',
      duration: '1 hour',
      status: 'upcoming',
      participants: 12
    },
    {
      mentor: 'Rajesh Patel',
      topic: 'Product Management 101',
      date: '2024-12-05',
      time: '7:00 PM',
      duration: '1 hour',
      status: 'completed',
      participants: 15
    },
    {
      mentor: 'Arjun Nair',
      topic: 'Building Your Tech Career',
      date: '2024-12-12',
      time: '5:30 PM',
      duration: '1.5 hours',
      status: 'upcoming',
      participants: 20
    },
  ];

  const upcomingEvents = [
    {
      title: 'Annual Alumni Reunion 2024',
      date: '2024-12-30',
      time: '10:00 AM',
      location: 'University Campus, Main Auditorium',
      attendees: 450,
      type: 'Reunion',
      organizer: 'Alumni Association',
      image: '🎓'
    },
    {
      title: 'Tech Talk: Future of AI',
      date: '2024-12-15',
      time: '4:00 PM',
      location: 'Virtual Event',
      attendees: 234,
      type: 'Webinar',
      organizer: 'Tech Alumni Group',
      image: '💻'
    },
    {
      title: 'Networking Mixer - Bay Area',
      date: '2024-12-18',
      time: '6:00 PM',
      location: 'San Francisco, CA',
      attendees: 89,
      type: 'Networking',
      organizer: 'Bay Area Chapter',
      image: '🤝'
    },
    {
      title: 'Career Fair 2024',
      date: '2024-12-22',
      time: '9:00 AM',
      location: 'University Campus',
      attendees: 678,
      type: 'Career',
      organizer: 'Placement Cell',
      image: '💼'
    },
  ];

  const successStories = [
    {
      alumni: 'Ananya Sharma',
      batch: '2015',
      title: 'From Campus to Google: My Journey',
      excerpt: 'Starting from a small town, I never imagined I would be working at Google. Here\'s how UniVerse prepared me...',
      likes: 234,
      comments: 45,
      image: 'AS',
      category: 'Career Success'
    },
    {
      alumni: 'Vikram Malhotra',
      batch: '2018',
      title: 'Building My Own Startup',
      excerpt: 'After 3 years at Meta, I took the leap to start my own AI company. The entrepreneurship lessons from university helped...',
      likes: 189,
      comments: 67,
      image: 'VM',
      category: 'Entrepreneurship'
    },
    {
      alumni: 'Sneha Reddy',
      batch: '2019',
      title: 'Breaking into Robotics at Tesla',
      excerpt: 'As one of the few women in robotics, my journey was challenging but rewarding. Here\'s my story...',
      likes: 312,
      comments: 89,
      image: 'SR',
      category: 'Inspiration'
    },
  ];

  const alumniGroups = [
    {
      name: 'Tech Alumni Network',
      members: 456,
      category: 'Industry',
      description: 'Connect with alumni in tech industry',
      isJoined: true,
      activity: 'Very Active'
    },
    {
      name: 'Bay Area Chapter',
      members: 234,
      category: 'Location',
      description: 'Alumni based in San Francisco Bay Area',
      isJoined: false,
      activity: 'Active'
    },
    {
      name: 'Entrepreneurs Club',
      members: 178,
      category: 'Interest',
      description: 'For alumni running their own businesses',
      isJoined: true,
      activity: 'Moderate'
    },
    {
      name: 'Class of 2015',
      members: 345,
      category: 'Batch',
      description: 'Reconnect with your batchmates',
      isJoined: false,
      activity: 'Active'
    },
  ];

  const givingOpportunities = [
    {
      title: 'Scholarship Fund',
      description: 'Support underprivileged students',
      raised: 125000,
      goal: 200000,
      contributors: 89,
      category: 'Education'
    },
    {
      title: 'Infrastructure Development',
      description: 'New library and labs construction',
      raised: 450000,
      goal: 1000000,
      contributors: 234,
      category: 'Infrastructure'
    },
    {
      title: 'Research Grants',
      description: 'Fund student research projects',
      raised: 75000,
      goal: 150000,
      contributors: 45,
      category: 'Research'
    },
  ];

  const myConnections = alumni.filter(a => a.isConnected);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Alumni Network</h2>
          <p className="text-gray-400">Connect, Learn, and Grow Together</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Invite Alumni
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <Users className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">2,340</h3>
          <p className="text-gray-400">Total Alumni</p>
          <div className="mt-2 flex items-center gap-1 text-green-400 text-sm">
            <TrendingUp className="w-3 h-3" />
            <span>+12% this year</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <Network className="w-8 h-8 text-purple-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">{myConnections.length}</h3>
          <p className="text-gray-400">Your Connections</p>
          <div className="mt-2 flex items-center gap-1 text-cyan-400 text-sm">
            <UserPlus className="w-3 h-3" />
            <span>3 new this week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <Briefcase className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">156</h3>
          <p className="text-gray-400">Job Openings</p>
          <div className="mt-2 flex items-center gap-1 text-orange-400 text-sm">
            <Zap className="w-3 h-3" />
            <span>24 new today</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <Star className="w-8 h-8 text-orange-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">89</h3>
          <p className="text-gray-400">Active Mentors</p>
          <div className="mt-2 flex items-center gap-1 text-purple-400 text-sm">
            <Trophy className="w-3 h-3" />
            <span>Top rated</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <Calendar className="w-8 h-8 text-pink-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">12</h3>
          <p className="text-gray-400">Upcoming Events</p>
          <div className="mt-2 flex items-center gap-1 text-yellow-400 text-sm">
            <Sparkles className="w-3 h-3" />
            <span>Reunion soon</span>
          </div>
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-white/10">
          {[
            { id: 'directory', label: 'Alumni Directory', icon: Users },
            { id: 'connections', label: 'My Connections', icon: Network },
            { id: 'jobs', label: 'Job Board', icon: Briefcase },
            { id: 'mentorship', label: 'Mentorship', icon: Star },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'stories', label: 'Success Stories', icon: Trophy },
            { id: 'groups', label: 'Groups & Chapters', icon: Users },
            { id: 'giving', label: 'Give Back', icon: Heart },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-shrink-0 flex items-center gap-2 py-4 px-6 transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Alumni Directory Tab */}
          {activeTab === 'directory' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, company, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <select 
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="all">All Alumni</option>
                    <option value="mentors">Available Mentors</option>
                    <option value="batch">By Batch</option>
                    <option value="company">By Company</option>
                  </select>
                  <button className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
                    <Filter className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Alumni Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {alumni.map((person, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                        {person.avatar}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-bold text-white mb-1 truncate">{person.name}</h4>
                            <p className="text-sm text-gray-400">Batch of {person.batch} • {person.degree}</p>
                          </div>
                          {person.mentorAvailable && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-semibold whitespace-nowrap ml-2">
                              Mentor
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Building className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span className="text-white font-semibold truncate">{person.company}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Briefcase className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            <span className="text-gray-300 truncate">{person.position}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                            <span className="text-gray-300 truncate">{person.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          {person.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          {person.isConnected ? (
                            <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 text-green-400 rounded-xl transition-all flex items-center justify-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Connected
                            </button>
                          ) : (
                            <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                              <UserPlus className="w-4 h-4" />
                              Connect
                            </button>
                          )}
                          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <div className="flex items-center gap-1 px-3 py-2 bg-white/5 rounded-xl">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-sm font-semibold">{person.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* My Connections Tab */}
          {activeTab === 'connections' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">My Connections</h3>
                  <p className="text-sm text-gray-400">You're connected with {myConnections.length} alumni</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                  Find More Alumni
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {myConnections.map((person, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10 text-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      {person.avatar}
                    </div>
                    <h4 className="font-bold text-white mb-1">{person.name}</h4>
                    <p className="text-sm text-gray-400 mb-2">{person.position}</p>
                    <p className="text-xs text-purple-400 mb-4">{person.company}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
                        <MessageCircle className="w-4 h-4 mx-auto" />
                      </button>
                      <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
                        <Eye className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Job Opportunities</h3>
                  <p className="text-sm text-gray-400">Exclusive opportunities from alumni</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Post a Job
                </button>
              </div>

              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative overflow-hidden bg-gradient-to-br ${job.color} bg-opacity-10 rounded-2xl p-6 border border-white/10 hover:scale-[1.02] transition-transform`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-xl font-bold text-white">{job.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            job.type === 'Internship' ? 'bg-blue-500/20 text-blue-400' :
                            job.type === 'Full-time' ? 'bg-green-500/20 text-green-400' :
                            'bg-purple-500/20 text-purple-400'
                          }`}>
                            {job.type}
                          </span>
                        </div>
                        <p className="text-gray-300 font-semibold mb-1">{job.company}</p>
                        <p className="text-sm text-gray-400">Posted by {job.postedBy}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {job.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Location</p>
                        <p className="text-white font-semibold text-sm">{job.location}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Duration</p>
                        <p className="text-white font-semibold text-sm">{job.duration}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Compensation</p>
                        <p className="text-white font-semibold text-sm">{job.stipend}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Applicants</p>
                        <p className="text-white font-semibold text-sm">{job.applicants}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">
                        Deadline: {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-lg transition-all">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Mentorship Tab */}
          {activeTab === 'mentorship' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Mentorship Sessions</h3>
                  <p className="text-sm text-gray-400">Learn from experienced alumni</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Request Session
                </button>
              </div>

              {mentorshipSessions.map((session, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl border ${
                    session.status === 'upcoming'
                      ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-white">{session.topic}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          session.status === 'upcoming'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {session.status}
                        </span>
                      </div>
                      <p className="text-gray-400">with {session.mentor}</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span className="text-white text-sm">{session.participants}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-300 mb-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      {session.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-orange-400" />
                      {session.duration}
                    </span>
                  </div>

                  {session.status === 'upcoming' ? (
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        <Video className="w-4 h-4" />
                        Join Session
                      </button>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
                        Reschedule
                      </button>
                    </div>
                  ) : (
                    <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Summary
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
                  <p className="text-sm text-gray-400">Connect at alumni gatherings</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                  Create Event
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-5xl">{event.image}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-bold text-white">{event.title}</h4>
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full font-semibold">
                            {event.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">by {event.organizer}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Clock className="w-4 h-4 text-purple-400" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin className="w-4 h-4 text-orange-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Users className="w-4 h-4 text-green-400" />
                        {event.attendees} attending
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                        Register
                      </button>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Success Stories Tab */}
          {activeTab === 'stories' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Success Stories</h3>
                  <p className="text-sm text-gray-400">Get inspired by alumni achievements</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                  Share Your Story
                </button>
              </div>

              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {story.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{story.title}</h4>
                          <p className="text-sm text-gray-400">{story.alumni} • Batch of {story.batch}</p>
                        </div>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full font-semibold">
                          {story.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{story.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-pink-400 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>{story.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>{story.comments}</span>
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-cyan-400 rounded-xl transition-colors text-sm font-semibold">
                      Read More
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Groups & Chapters Tab */}
          {activeTab === 'groups' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Alumni Groups & Chapters</h3>
                  <p className="text-sm text-gray-400">Join communities based on your interests</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                  Create Group
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {alumniGroups.map((group, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{group.name}</h4>
                        <p className="text-sm text-gray-400 mb-2">{group.description}</p>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                          {group.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-300">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span>{group.members} members</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        group.activity === 'Very Active' ? 'bg-green-500/20 text-green-400' :
                        group.activity === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {group.activity}
                      </div>
                    </div>

                    {group.isJoined ? (
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 text-green-400 rounded-xl transition-all flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Joined
                      </button>
                    ) : (
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                        Join Group
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Give Back Tab */}
          {activeTab === 'giving' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Give Back to UniVerse</h3>
                  <p className="text-sm text-gray-400">Support future generations</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Make a Donation
                </button>
              </div>

              {givingOpportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{opportunity.title}</h4>
                      <p className="text-gray-400 mb-2">{opportunity.description}</p>
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full font-semibold">
                        {opportunity.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-semibold">
                        ${opportunity.raised.toLocaleString()} / ${opportunity.goal.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(opportunity.raised / opportunity.goal) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{opportunity.contributors} contributors</span>
                      <span className="text-cyan-400 font-semibold">
                        {Math.round((opportunity.raised / opportunity.goal) * 100)}% funded
                      </span>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    Contribute Now
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

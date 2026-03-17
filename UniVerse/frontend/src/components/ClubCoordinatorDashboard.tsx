import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Calendar, FileText, Upload, Download, Check, X,
  Clock, AlertCircle, CheckCircle, Eye, MessageSquare,
  TrendingUp, Star, Award, Sparkles, Send, DollarSign,
  UserPlus, Settings, Bell, Target, BarChart3, Mail, Plus, Edit
} from 'lucide-react';

interface ClubCoordinatorDashboardProps {
  user: any;
}

export function ClubCoordinatorDashboard({ user }: ClubCoordinatorDashboardProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'clubs' | 'budget' | 'feedback' | 'analytics'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const stats = [
    { icon: Clock, label: 'Pending Requests', value: '12', color: 'from-orange-500 to-red-500' },
    { icon: CheckCircle, label: 'Approved Events', value: '34', color: 'from-green-500 to-teal-500' },
    { icon: Calendar, label: 'Upcoming Events', value: '8', color: 'from-cyan-500 to-blue-500' },
    { icon: Users, label: 'Active Clubs', value: '15', color: 'from-purple-500 to-pink-500' },
    { icon: DollarSign, label: 'Total Budget', value: '₹12.5L', color: 'from-yellow-500 to-orange-500' },
    { icon: Star, label: 'Avg Rating', value: '4.6', color: 'from-indigo-500 to-purple-500' },
  ];

  const pendingRequests = [
    {
      id: 1,
      club: 'Tech Club',
      event: 'Hackathon 2024',
      date: '2024-04-15',
      venue: 'Main Auditorium',
      participants: 200,
      budget: '₹50,000',
      priority: 'high',
      documents: ['Proposal.pdf', 'Budget.xlsx', 'Agenda.docx'],
      submittedOn: '2024-03-01',
      description: 'A 24-hour coding hackathon with industry mentors and exciting prizes.'
    },
    {
      id: 2,
      club: 'Music Society',
      event: 'Spring Concert',
      date: '2024-04-20',
      venue: 'Open Air Theatre',
      participants: 500,
      budget: '₹75,000',
      priority: 'medium',
      documents: ['Event_Plan.pdf', 'Artist_List.pdf'],
      submittedOn: '2024-03-05',
      description: 'Annual spring concert featuring student bands and guest performers.'
    },
    {
      id: 3,
      club: 'Drama Club',
      event: 'Theatre Workshop',
      date: '2024-04-10',
      venue: 'Drama Hall',
      participants: 50,
      budget: '₹15,000',
      priority: 'low',
      documents: ['Workshop_Details.pdf'],
      submittedOn: '2024-03-08',
      description: 'Interactive workshop on contemporary theatre techniques.'
    },
  ];

  const approvedEvents = [
    {
      id: 4,
      club: 'Photography Club',
      event: 'Photo Walk',
      date: '2024-03-25',
      status: 'scheduled',
      participants: 30,
      approvedOn: '2024-02-20'
    },
    {
      id: 5,
      club: 'Dance Society',
      event: 'Dance Competition',
      date: '2024-04-05',
      status: 'scheduled',
      participants: 150,
      approvedOn: '2024-02-25'
    },
  ];

  const handleApprove = (request: any) => {
    alert(`Event "${request.event}" approved! It will be added to the campus calendar.`);
    setSelectedRequest(null);
  };

  const handleReject = (request: any) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      alert(`Event "${request.event}" rejected. Notification sent to ${request.club}.`);
      setSelectedRequest(null);
    }
  };

  const handleRequestChanges = (request: any) => {
    const feedback = prompt('Please provide feedback for requested changes:');
    if (feedback) {
      alert(`Feedback sent to ${request.club} for event "${request.event}".`);
      setSelectedRequest(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-300">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Club & Event Coordination</h2>
            <p>Review event proposals, manage club activities, and coordinate campus events</p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-purple-200">
        {[
          { id: 'pending', label: 'Pending Requests', icon: Clock, badge: 12 },
          { id: 'approved', label: 'Approved Events', icon: CheckCircle },
          { id: 'clubs', label: 'Club Management', icon: Users },
          { id: 'budget', label: 'Budget', icon: DollarSign },
          { id: 'feedback', label: 'Feedback', icon: MessageSquare },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`relative flex items-center gap-2 px-6 py-3 transition-all ${
              activeTab === tab.id
                ? 'border-b-2 border-purple-500 text-purple-600 font-semibold'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
            {tab.badge && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'pending' && (
        <div className="space-y-6">
          {/* Pending Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Requests List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Event Proposals Awaiting Review</h3>
              {pendingRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedRequest(request)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedRequest?.id === request.id
                      ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 shadow-md'
                      : 'bg-white border-purple-200 hover:border-purple-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold">{request.event}</h4>
                      <p className="text-sm text-gray-600">{request.club}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        request.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : request.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {request.priority}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📅 {request.date}</p>
                    <p>📍 {request.venue}</p>
                    <p>👥 {request.participants} participants</p>
                    <p>💰 Budget: {request.budget}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-purple-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Submitted {request.submittedOn}</span>
                    <span>{request.documents.length} documents</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Request Details */}
            <div className="sticky top-6">
              {selectedRequest ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{selectedRequest.event}</h3>
                      <p className="text-gray-600">{selectedRequest.club}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedRequest.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : selectedRequest.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {selectedRequest.priority} priority
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold mb-2">Event Details</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-purple-50 rounded-xl">
                          <p className="text-gray-600">Date</p>
                          <p className="font-semibold">{selectedRequest.date}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl">
                          <p className="text-gray-600">Venue</p>
                          <p className="font-semibold">{selectedRequest.venue}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl">
                          <p className="text-gray-600">Participants</p>
                          <p className="font-semibold">{selectedRequest.participants}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl">
                          <p className="text-gray-600">Budget</p>
                          <p className="font-semibold">{selectedRequest.budget}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-gray-600 p-3 bg-purple-50 rounded-xl">
                        {selectedRequest.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Submitted Documents</h4>
                      <div className="space-y-2">
                        {selectedRequest.documents.map((doc: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-purple-50 rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-purple-600" />
                              <span className="text-sm font-semibold">{doc}</span>
                            </div>
                            <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-purple-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(selectedRequest)}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold"
                      >
                        <Check className="w-5 h-5" />
                        Approve & Add to Calendar
                      </button>
                      <button
                        onClick={() => handleReject(selectedRequest)}
                        className="flex-1 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold"
                      >
                        <X className="w-5 h-5" />
                        Reject
                      </button>
                    </div>
                    <button
                      onClick={() => handleRequestChanges(selectedRequest)}
                      className="w-full py-3 bg-white border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 font-semibold"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Request Changes
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl p-12 border border-purple-200 text-center">
                  <AlertCircle className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                  <p className="text-gray-600">Select a request to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'approved' && (
        <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Approved Events</h3>
          <div className="space-y-3">
            {approvedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">{event.event}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{event.club}</span>
                      <span>📅 {event.date}</span>
                      <span>👥 {event.participants}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {event.status}
                  </span>
                  <button className="px-4 py-2 bg-white rounded-lg hover:bg-green-50 transition-colors text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'clubs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Club Directory', desc: 'Manage all campus clubs', icon: Users, color: 'from-cyan-500 to-blue-500' },
            { title: 'Event Templates', desc: 'Pre-approved event formats', icon: FileText, color: 'from-purple-500 to-pink-500' },
            { title: 'Upload Guidelines', desc: 'Document requirements', icon: Upload, color: 'from-orange-500 to-red-500' },
            { title: 'Event Calendar', desc: 'View all scheduled events', icon: Calendar, color: 'from-green-500 to-teal-500' },
            { title: 'Budget Tracker', desc: 'Monitor club budgets', icon: TrendingUp, color: 'from-yellow-500 to-orange-500' },
            { title: 'Reports', desc: 'Generate activity reports', icon: Download, color: 'from-indigo-500 to-purple-500' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm cursor-pointer hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Event Statistics</h3>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Total Events (This Year)</span>
                  <span className="text-2xl font-bold">156</span>
                </div>
                <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-3/4" />
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Approval Rate</span>
                  <span className="text-2xl font-bold">87%</span>
                </div>
                <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 w-5/6" />
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Avg Processing Time</span>
                  <span className="text-2xl font-bold">2.5 days</span>
                </div>
                <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-1/2" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Top Performing Clubs</h3>
            <div className="space-y-3">
              {[
                { club: 'Tech Club', events: 24, rating: 4.8 },
                { club: 'Cultural Society', events: 18, rating: 4.7 },
                { club: 'Sports Club', events: 15, rating: 4.6 },
                { club: 'Music Society', events: 12, rating: 4.5 },
              ].map((club, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{club.club}</p>
                      <p className="text-sm text-gray-600">{club.events} events</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{club.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Event Feedback</h3>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Positive Feedback</span>
                  <span className="text-2xl font-bold">85%</span>
                </div>
                <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-3/4" />
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Neutral Feedback</span>
                  <span className="text-2xl font-bold">10%</span>
                </div>
                <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 w-5/6" />
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Negative Feedback</span>
                  <span className="text-2xl font-bold">5%</span>
                </div>
                <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-1/2" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Top Performing Clubs</h3>
            <div className="space-y-3">
              {[
                { club: 'Tech Club', events: 24, rating: 4.8 },
                { club: 'Cultural Society', events: 18, rating: 4.7 },
                { club: 'Sports Club', events: 15, rating: 4.6 },
                { club: 'Music Society', events: 12, rating: 4.5 },
              ].map((club, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{club.club}</p>
                      <p className="text-sm text-gray-600">{club.events} events</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{club.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Event Statistics</h3>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Total Events (This Year)</span>
                  <span className="text-2xl font-bold">156</span>
                </div>
                <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-3/4" />
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Approval Rate</span>
                  <span className="text-2xl font-bold">87%</span>
                </div>
                <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 w-5/6" />
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Avg Processing Time</span>
                  <span className="text-2xl font-bold">2.5 days</span>
                </div>
                <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-1/2" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Top Performing Clubs</h3>
            <div className="space-y-3">
              {[
                { club: 'Tech Club', events: 24, rating: 4.8 },
                { club: 'Cultural Society', events: 18, rating: 4.7 },
                { club: 'Sports Club', events: 15, rating: 4.6 },
                { club: 'Music Society', events: 12, rating: 4.5 },
              ].map((club, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{club.club}</p>
                      <p className="text-sm text-gray-600">{club.events} events</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{club.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
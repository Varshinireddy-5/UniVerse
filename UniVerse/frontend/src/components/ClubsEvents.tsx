import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, Trophy, Star, TrendingUp, Clock, MapPin, Heart, Share2 } from 'lucide-react';
import { api } from '../lib/api.js';

export function ClubsEvents({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<'clubs' | 'events'>('clubs');
  const [clubs, setClubs] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const c = await api.get('/api/clubs');
        setClubs((c || []).map((club:any) => ({
          name: club.name,
          members: (club.members || []).length,
          reputation: 4.5,
          category: 'Club',
          color: 'from-blue-500 to-cyan-500',
          joined: false,
          role: '',
          activities: (club.events || []).length,
        })));
      } catch {}
      try {
        const ev = await api.get('/api/events');
        setEvents((ev || []).map((e:any) => ({
          id: e.id,
          title: e.title,
          club: e.club?.name || '',
          date: e.startDateTime,
          time: new Date(e.startDateTime).toLocaleTimeString(),
          venue: e.location || 'TBA',
          attendees: (e.attendees || []).length,
          maxCapacity: 500,
          type: 'Event',
          status: e.status?.toLowerCase() || 'upcoming',
          registered: false,
          color: 'from-purple-500 to-pink-500',
        })));
      } catch {}
    })();
  }, []);
  const handleRegister = async (eventId:string) => {
    try {
      await api.post(`/api/events/${eventId}/rsvp`, { status: 'GOING' });
      setEvents(events.map(ev => ev.id === eventId ? { ...ev, registered: true, attendees: ev.attendees + 1 } : ev));
    } catch {}
  };
  const handleUnregister = async (eventId:string) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/events/${eventId}/rsvp`, { method: 'DELETE', credentials: 'include' });
      setEvents(events.map(ev => ev.id === eventId ? { ...ev, registered: false, attendees: Math.max(0, ev.attendees - 1) } : ev));
    } catch {}
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <Users className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">2</h3>
          <p className="text-gray-400">Clubs Joined</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <Calendar className="w-8 h-8 text-purple-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">12</h3>
          <p className="text-gray-400">Events Attended</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <Trophy className="w-8 h-8 text-orange-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">1,250</h3>
          <p className="text-gray-400">Reputation Points</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <Star className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="text-3xl font-bold text-white mb-1">8</h3>
          <p className="text-gray-400">Skills Acquired</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('clubs')}
            className={`flex-1 py-4 px-6 transition-colors ${
              activeTab === 'clubs'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Clubs & Societies
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-4 px-6 transition-colors ${
              activeTab === 'events'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Events & Activities
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'clubs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Campus Clubs</h3>
                  <p className="text-sm text-gray-400">Explore and join clubs that match your interests</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                  Discover More
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {clubs.map((club, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative overflow-hidden bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 transition-all group"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${club.color} opacity-20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform`} />
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">{club.name}</h4>
                          <p className="text-sm text-gray-400">{club.category}</p>
                        </div>
                        {club.joined && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-semibold">
                            {club.role || 'Member'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{club.members} members</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-yellow-400">
                          <Star className="w-4 h-4 fill-yellow-400" />
                          <span>{club.reputation}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-400">Activity Score</span>
                          <span className="text-white font-semibold">{club.activities}/30</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${club.color} rounded-full`}
                            style={{ width: `${(club.activities / 30) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {club.joined ? (
                          <>
                            <button className={`flex-1 py-2 bg-gradient-to-r ${club.color} text-white rounded-xl hover:shadow-lg transition-all`}>
                              View Dashboard
                            </button>
                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="flex-1 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl transition-colors">
                              Join Club
                            </button>
                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                              <Heart className="w-5 h-5 text-gray-400" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'events' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
                  <p className="text-sm text-gray-400">Register for events and activities</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                  Create Event
                </button>
              </div>

              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold text-white">{event.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            event.registered
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {event.registered ? 'Registered' : event.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">by {event.club}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                          <Share2 className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-orange-400" />
                        <span className="text-gray-300">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300">{event.attendees}/{event.maxCapacity}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Registration Progress</span>
                        <span className="text-white font-semibold">
                          {Math.round((event.attendees / event.maxCapacity) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${event.color} rounded-full`}
                          style={{ width: `${(event.attendees / event.maxCapacity) * 100}%` }}
                        />
                      </div>
                    </div>

                    {event.registered ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleUnregister(event.id)} className="flex-1 py-3 bg-green-500/20 text-green-400 rounded-xl font-semibold">
                          ✓ Registered
                        </button>
                        <button className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white">
                          View QR Code
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleRegister(event.id)} className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                        Register Now
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Won 1st place', event: 'Tech Quiz Competition', club: 'Tech Club', xp: '+500 XP', time: '2 hours ago', color: 'from-yellow-500 to-orange-500' },
            { action: 'Completed workshop', event: 'ML Basics Workshop', club: 'AI/ML Society', xp: '+200 XP', time: '1 day ago', color: 'from-purple-500 to-pink-500' },
            { action: 'Joined new club', event: 'Tech Club', club: 'Campus', xp: '+100 XP', time: '3 days ago', color: 'from-blue-500 to-cyan-500' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{activity.action}</p>
                <p className="text-sm text-gray-400">{activity.event} • {activity.club}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-semibold">{activity.xp}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

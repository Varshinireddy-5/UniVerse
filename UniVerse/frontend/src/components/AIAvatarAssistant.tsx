import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot, Send, Mic, MicOff, Camera, Volume2, VolumeX,
  Sparkles, BookOpen, MapPin, MessageCircle, Languages,
  Scan, Brain, Heart, Video
} from 'lucide-react';

export function AIAvatarAssistant({ user }: { user: any }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: `Hello ${user.name.split(' ')[0]}! I'm your AI campus assistant. I can help you with topics, campus navigation, study tips, and more! How can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [avatarMode, setAvatarMode] = useState<'text' | 'voice' | 'video' | 'ar'>('text');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: BookOpen, label: 'Explain a Topic', color: 'from-purple-500 to-blue-500' },
    { icon: MapPin, label: 'Campus Navigation', color: 'from-green-500 to-teal-500' },
    { icon: Brain, label: 'Study Tips', color: 'from-pink-500 to-purple-500' },
    { icon: MessageCircle, label: 'Ask Anything', color: 'from-orange-500 to-red-500' },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: getAIResponse(inputText),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('library') || lowerInput.includes('location')) {
      return "The main library is located in Block A, 2nd floor. It's open from 8 AM to 10 PM. Current occupancy is 65%. Would you like me to show you the route using AR navigation?";
    } else if (lowerInput.includes('attendance') || lowerInput.includes('class')) {
      return "Your current attendance is 92%. You need to maintain 75% to be eligible for exams. Based on your schedule, you can safely miss 3 more classes in CS301 this semester.";
    } else if (lowerInput.includes('gpa') || lowerInput.includes('grade')) {
      return "Your current CGPA is 9.3. To maintain a 9+ CGPA, you need to score at least 85% in your upcoming exams. I can create a personalized study plan for you if you'd like!";
    } else if (lowerInput.includes('study') || lowerInput.includes('learn')) {
      return "I can help you study more effectively! I can generate notes, create flashcards, make quizzes, or explain concepts. Which subject would you like to focus on?";
    } else {
      return "I understand you're asking about that. I can provide detailed explanations, show you campus locations, create study materials, or help with any other campus-related queries. Could you be more specific about what you need?";
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex-1 grid lg:grid-cols-3 gap-6">
        {/* AI Avatar Display */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Avatar Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="relative">
              {/* Avatar Animation */}
              <div className="relative w-full aspect-square mb-6">
                <motion.div
                  animate={{
                    scale: isSpeaking ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: isSpeaking ? Infinity : 0,
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-3xl flex items-center justify-center overflow-hidden"
                >
                  {/* Animated rings when speaking */}
                  {isSpeaking && (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 border-4 border-white/30 rounded-3xl"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        className="absolute inset-0 border-4 border-white/20 rounded-3xl"
                      />
                    </>
                  )}
                  
                  <Bot className="w-32 h-32 text-white relative z-10" />
                  
                  {/* Sparkles */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <Sparkles className="absolute top-4 right-4 w-6 h-6 text-yellow-300" />
                    <Sparkles className="absolute bottom-4 left-4 w-4 h-4 text-blue-300" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Avatar Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">Campus AI Assistant</h3>
                <p className="text-gray-400 text-sm">Your 24/7 Study Buddy</p>
              </div>

              {/* Mode Selector */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { mode: 'text', icon: MessageCircle, label: 'Text' },
                  { mode: 'voice', icon: Mic, label: 'Voice' },
                  { mode: 'video', icon: Video, label: 'Video' },
                  { mode: 'ar', icon: Scan, label: 'AR' },
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setAvatarMode(mode as any)}
                    className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                      avatarMode === mode
                        ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{label}</span>
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`p-4 rounded-xl transition-all ${
                    isListening
                      ? 'bg-red-500 text-white scale-110'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className={`p-4 rounded-xl transition-all ${
                    isSpeaking
                      ? 'bg-green-500 text-white scale-110'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button className="p-4 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition-all">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Languages className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-white">Language</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-3 rounded-xl flex items-center gap-2 transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-sm">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col h-[calc(100vh-12rem)]"
        >
          {/* Quick Actions */}
          <div className="p-6 border-b border-white/10">
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl bg-gradient-to-br ${action.color} text-white flex flex-col items-center gap-2 hover:shadow-lg transition-all`}
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-xs text-center">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'ai' 
                        ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                        : 'bg-gradient-to-br from-pink-500 to-orange-500'
                    }`}>
                      {message.sender === 'ai' ? (
                        <Bot className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white font-bold">
                          {user.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className={`p-4 rounded-2xl ${
                        message.sender === 'ai'
                          ? 'bg-white/10 text-white rounded-tl-none'
                          : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-tr-none'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about campus, studies, or get help..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                />
                <button
                  onClick={() => setIsListening(!isListening)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Mic className={`w-5 h-5 ${isListening ? 'text-red-400' : 'text-gray-400'}`} />
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white hover:shadow-lg transition-all"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

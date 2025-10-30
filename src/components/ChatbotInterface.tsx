import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home, MessageSquare, HelpCircle, User, Bot, Search, X, ChevronRight, 
  ExternalLink, Wheat, BarChart3, Cloud, FlaskConical, Camera, 
  Phone, MessageCircle, Globe, TrendingUp, Thermometer, Droplets,
  Bell, Calendar, Users, Map, Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { motion, AnimatePresence } from 'motion/react';

// Typing indicator component
const TypingDots = () => (
  <div className="flex gap-1 p-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-green-500 rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

// Separate ChatInterface component to prevent re-creation issues
const ChatInterface = React.memo(({ 
  messages, 
  isTyping, 
  inputMessage, 
  setInputMessage, 
  handleSendMessage, 
  handleBackToMain, 
  toggleLanguage, 
  language, 
  text 
}: {
  messages: ChatMessage[];
  isTyping: boolean;
  inputMessage: string;
  setInputMessage: (value: string) => void;
  handleSendMessage: () => void;
  handleBackToMain: () => void;
  toggleLanguage: () => void;
  language: Language;
  text: any;
}) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white p-4 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={handleBackToMain}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-xl">🌱</span>
        </div>
        
        <div className="flex-1">
          <h2 className="font-medium">{text[language].chatWith}</h2>
          <p className="text-white/80 text-sm">Online • Responds instantly</p>
        </div>

        <button
          onClick={toggleLanguage}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <Globe className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message.sender === 'bot' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">🌱</span>
                  </div>
                  <span className="text-xs text-gray-500">AgriBot</span>
                </div>
              )}
              
              <div
                className={`p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              
              <p className="text-xs text-gray-400 mt-1 px-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">🌱</span>
                </div>
                <span className="text-xs text-gray-500">AgriBot is typing...</span>
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm">
                <TypingDots />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={text[language].typeMessage}
              className="w-full resize-none rounded-2xl border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyDown={handleKeyDown}
            />
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
});

type Tab = 'home' | 'messages' | 'help';
type Language = 'en' | 'hi';
type ChatMessage = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatbotInterface = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab: Tab) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 300);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleAskQuestion = useCallback(() => {
    setShowChat(true);
    // Add welcome message from bot
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        content: language === 'en' 
          ? "Hello! I'm your AgriBot assistant 🌱 How can I help you with your farming needs today?"
          : "नमस्ते! मैं आपका AgriBot सहायक हूँ 🌱 आज मैं आपकी खेती की जरूरतों में कैसे मदद कर सकता हूँ?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length, language]);

  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: language === 'en'
          ? "Thank you for your question! I'm analyzing your farming query and will provide you with the best recommendations. Let me check the latest agricultural data for you."
          : "आपके प्रश्न के लिए धन्यवाद! मैं आपकी कृषि संबंधी समस्या का विश्लेषण कर रहा हूँ और आपको सर्वोत्तम सुझाव दूंगा। मैं आपके लिए नवीनतम कृषि डेटा की जांच कर रहा हूँ।",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  }, [inputMessage, language]);

  const handleBackToMain = useCallback(() => {
    setShowChat(false);
    setIsTyping(false);
  }, []);

  const text = {
    en: {
      greeting: "Hi there 👋",
      tagline: "Your personal farm assistant – anytime, anywhere.",
      recentMessage: "Recent message",
      askQuestion: "Ask a question",
      aiHelp: "AI Agent and team can help",
      scheduleDemo: "Schedule a Demo",
      searchHelp: "Search for help",
      messages: "Messages",
      help: "Help",
      collections: "5 collections",
      chatWith: "Chat with AgriBot",
      typeMessage: "Type your message...",
      send: "Send",
      mostPopular: "Most Popular Questions",
      needMoreHelp: "Need more help? Connect with our Expert 👨‍🌾",
      scheduleCall: "Schedule Call",
      whatsapp: "WhatsApp",
      cropActions: {
        recommend: "Recommend Best Crop",
        mandi: "Live Mandi Rates", 
        weather: "Weather Forecast",
        soil: "Soil Test Result Upload",
        scan: "Crop Health Scan"
      }
    },
    hi: {
      greeting: "नमस्ते 👋",
      tagline: "आपका व्यक्तिगत कृषि सहायक – कभी भी, कहीं भी।",
      recentMessage: "हाल का संदेश",
      askQuestion: "प्रश्न पूछें",
      aiHelp: "AI एजेंट और टीम मदद कर सकते हैं",
      scheduleDemo: "डेमो शेड्यूल करें",
      searchHelp: "सहायता खोजें",
      messages: "संदेश", 
      help: "सहायता",
      collections: "5 संग्रह",
      chatWith: "AgriBot से चैट करें",
      typeMessage: "अपना संदेश लिखें...",
      send: "भेजें",
      mostPopular: "सबसे लोकप्रिय प्रश्न",
      needMoreHelp: "और मदद चाहिए? हमारे विशेषज्ञ से जुड़ें 👨‍🌾",
      scheduleCall: "कॉल शेड्यूल करें",
      whatsapp: "व्हाट्सऐप",
      cropActions: {
        recommend: "सर्वोत्तम फसल सुझाएं",
        mandi: "लाइव मंडी भाव",
        weather: "मौसम पूर्वानुमान", 
        soil: "मिट्टी परीक्षण अपलोड",
        scan: "फसल स्वास्थ्य स्कैन"
      }
    }
  };

  const cropActions = [
    { icon: Wheat, label: text[language].cropActions.recommend, color: "bg-amber-100 text-amber-600" },
    { icon: BarChart3, label: text[language].cropActions.mandi, color: "bg-green-100 text-green-600" },
    { icon: Cloud, label: text[language].cropActions.weather, color: "bg-blue-100 text-blue-600" },
    { icon: FlaskConical, label: text[language].cropActions.soil, color: "bg-purple-100 text-purple-600" },
    { icon: Camera, label: text[language].cropActions.scan, color: "bg-red-100 text-red-600" }
  ];

  const helpCategories = [
    {
      name: 'Account / Profile',
      description: 'Account management, login, passwords',
      articles: 3,
      icon: User,
      color: 'bg-blue-500'
    },
    {
      name: 'Crop Monitoring / Maps',
      description: 'Maps, indices and monitoring tools',
      articles: 1,
      icon: Map,
      color: 'bg-green-500'
    },
    {
      name: "What's New",
      description: 'Latest features and updates',
      articles: 1,
      icon: Star,
      color: 'bg-purple-500'
    },
    {
      name: 'Market Rates',
      description: 'Commodity prices and market reports',
      articles: 1,
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'weather',
      message: 'Rain expected in your region 🌧️ – Switch to water-resilient crops?',
      action: 'Get Advice',
      icon: Cloud,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 2,
      type: 'market',
      message: 'Wheat prices up 15% this week 📈 – Good time to sell!',
      action: 'View Rates',
      icon: TrendingUp,
      color: 'bg-green-50 border-green-200'
    }
  ];

  const popularQuestions = [
    "How to Create Account on Map My Crop",
    "Live Market Rates / Mandi Rates",
    "Weather Updates for My Region",
    "Best Crops for Monsoon Season"
  ];

  const LoadingSpinner = () => (
    <motion.div
      className="flex justify-center items-center h-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1B5E20] rounded-full animate-spin"></div>
        <motion.div
          className="absolute inset-0 w-8 h-8 border-4 border-transparent border-t-[#1B5E20] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );

  const FarmMascot = () => (
    <motion.div
      className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
    >
      <span className="text-2xl">🌱</span>
    </motion.div>
  );



  const WeatherWidget = () => (
    <motion.div
      className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">Today's Weather</span>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-blue-600">28°C</p>
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3 text-blue-500" />
            <span className="text-xs text-blue-500">60%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const MarketWidget = () => (
    <motion.div
      className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium">Wheat Price</span>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-green-600">₹2,150/qtl</p>
          <span className="text-xs text-green-500">↗ +2.3%</span>
        </div>
      </div>
    </motion.div>
  );



  const ExpertHandoffCard = () => (
    <motion.div
      className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <div className="text-center mb-3">
        <p className="text-sm text-gray-700">{text[language].needMoreHelp}</p>
      </div>
      <div className="flex gap-2">
        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => {}}>
            <Phone className="w-4 h-4 mr-2" />
            {text[language].scheduleCall}
          </Button>
        </motion.div>
        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button size="sm" variant="outline" className="w-full border-green-600 text-green-600" onClick={() => {}}>
            <MessageCircle className="w-4 h-4 mr-2" />
            {text[language].whatsapp}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );



  const TabContent = () => {
    if (isLoading) return <LoadingSpinner />;

    switch (activeTab) {
      case 'home':
        return (
          <motion.div
            className="h-full flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Farm Pattern Background */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="flex-1 overflow-y-auto">
              {/* Gradient Header Section */}
              <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#FBC02D] text-white p-6 relative overflow-hidden flex-shrink-0">
              {/* Header Controls */}
              <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FarmMascot />
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 hover:bg-white/30 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">{language.toUpperCase()}</span>
                  </button>
                  
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback className="bg-white text-[#1B5E20]">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                </div>

                <button className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full p-2 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </motion.div>

              {/* Greeting */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-2xl mb-1">{text[language].greeting}</h1>
                <p className="text-white/90 text-sm mb-2">{text[language].tagline}</p>
              </motion.div>

              {/* Crop Action Buttons */}
              <motion.div
                className="grid grid-cols-2 gap-3 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {cropActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={index}
                      className="bg-white/90 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-white transition-all transform hover:scale-105"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-gray-700 text-center leading-tight">{action.label}</span>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Recent Message Card */}
              <motion.div
                className="bg-white rounded-xl p-4 text-gray-800"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-red-500">{text[language].recentMessage}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-xs">🗺️</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 line-clamp-1">
                      If you need any further assistance w...
                    </p>
                    <p className="text-xs text-gray-500">Scott P • 8h ago</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
              </div>

              {/* White Content Section */}
              <div className="bg-white p-6 space-y-4 flex-shrink-0">
              {/* Weather & Market Widgets */}
              <div className="space-y-3">
                <WeatherWidget />
                <MarketWidget />
              </div>

              {/* Main Action Buttons */}
              <motion.button
                className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAskQuestion}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{text[language].askQuestion}</p>
                    <p className="text-sm text-gray-500">{text[language].aiHelp}</p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
              </motion.button>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="bg-gray-50 rounded-xl p-4 flex items-center gap-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">🌱</span>
                  </div>
                  <TypingDots />
                  <span className="text-sm text-gray-600">AgriBot is typing...</span>
                </motion.div>
              )}

              <motion.button
                className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="font-medium text-gray-900">{text[language].scheduleDemo}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-500" />
              </motion.button>

              {/* Popular Questions */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <h4 className="text-sm font-medium text-gray-900 mb-3">{text[language].mostPopular}</h4>
                {popularQuestions.slice(0, 2).map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span className="text-gray-700 text-sm">{question}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </motion.div>

                <ExpertHandoffCard />
              </div>
            </div>
          </motion.div>
        );

      case 'messages':
        return (
          <motion.div
            className="h-full flex flex-col bg-white overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <motion.div
              className="p-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-medium">{text[language].messages}</h2>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Notifications */}
              <div className="p-6 space-y-3">
                {notifications.map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <motion.div
                      key={notification.id}
                      className={`${notification.color} rounded-xl p-4 border`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              {notification.action}
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Messages List */}
              <div className="p-6">
                <motion.div
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">🗺️</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 line-clamp-1">
                      If you need any further assistance with un...
                    </p>
                    <p className="text-xs text-gray-500">Scott P • 8h ago</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-500" />
                </motion.div>
              </div>
            </div>

            {/* Fixed Bottom Button */}
            <motion.div
              className="p-6 bg-white border-t border-gray-100 flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl h-12 gap-2"
                  onClick={handleAskQuestion}
                >
                  {text[language].askQuestion}
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case 'help':
        return (
          <motion.div
            className="h-full flex flex-col bg-white overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <motion.div
              className="p-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-medium">{text[language].help}</h2>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Search Bar */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                  <span className="font-medium text-gray-700">{text[language].searchHelp}</span>
                  <Search className="w-5 h-5 text-red-500 ml-auto" />
                </div>
              </motion.div>

              {/* Most Popular Questions */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-medium text-gray-900">{text[language].mostPopular}</h3>
                {popularQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span className="text-gray-700 text-sm">{question}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </motion.div>

              {/* Collections Header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-lg font-medium text-gray-900">{text[language].collections}</h3>
              </motion.div>

              {/* Dashboard Style Categories */}
              <div className="grid grid-cols-2 gap-3">
                {helpCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.name}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-all transform hover:scale-105"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{category.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{category.description}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {category.articles} articles
                      </Badge>
                    </motion.button>
                  );
                })}
              </div>

              <ExpertHandoffCard />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (!isVisible) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <motion.div
          className="w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 relative">
      {/* Desktop & Mobile Responsive Container */}
      <motion.div
        className="w-full max-w-sm md:max-w-md lg:max-w-lg h-[600px] md:h-[700px] bg-white rounded-2xl shadow-2xl flex flex-col relative"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {showChat ? (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ChatInterface
                  messages={messages}
                  isTyping={isTyping}
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  handleSendMessage={handleSendMessage}
                  handleBackToMain={handleBackToMain}
                  toggleLanguage={toggleLanguage}
                  language={language}
                  text={text}
                />
              </motion.div>
            ) : (
              <TabContent key="tabs" />
            )}
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Navigation - Hidden in Chat Mode */}
        {!showChat && (
          <motion.div
            className="bg-white border-t border-gray-200 p-4 flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.8 }}
          >
          <div className="flex justify-around">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'messages', icon: MessageSquare, label: text[language].messages },
              { id: 'help', icon: HelpCircle, label: text[language].help }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as Tab)}
                  className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors relative ${
                    isActive
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="text-xs">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ChatbotInterface;
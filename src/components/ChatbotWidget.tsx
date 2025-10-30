import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home, MessageSquare, HelpCircle, User, Bot, Search, X, ChevronRight, 
  ExternalLink, Wheat, BarChart3, Cloud, FlaskConical, Camera, 
  Phone, MessageCircle, Globe, TrendingUp, Thermometer, Droplets,
  Bell, Calendar, Users, Map, Star, Minimize2, Paperclip, Smile, 
  FileImage, Mic, ArrowUp
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
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <div className="h-full flex flex-col bg-white">
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
                  <span className="text-xs text-gray-500">Krishika</span>
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
                <span className="text-xs text-gray-500">Krishika is typing...</span>
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm">
                <TypingDots />
              </div>
            </div>
          </div>
        )}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="relative">
          {/* Modern input with icons */}
          <div className="flex items-center bg-white border-2 border-red-300 rounded-full px-4 py-3 focus-within:border-red-500 transition-colors">
            {/* Left side icons */}
            <div className="flex items-center gap-3 mr-3">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Smile className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <FileImage className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Mic className="w-4 h-4" />
              </button>
            </div>
            
            {/* Input field */}
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
              onKeyDown={handleKeyDown}
            />
            
            {/* Send button */}
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="ml-3 w-8 h-8 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
            >
              <ArrowUp className="w-4 h-4 text-gray-600" />
            </button>
          </div>
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

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [hasInitialized, setHasInitialized] = useState(false);

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
    
    // Initialize with language selection if first time
    if (messages.length === 0 && !hasInitialized) {
      setHasInitialized(true);
      const languageSelectionMessage: ChatMessage = {
        id: 'lang-select',
        content: "🌍 Welcome! / स्वागत है!\n\nPlease select your preferred language:\nकृपया अपनी पसंदीदा भाषा चुनें:\n\n1️⃣ English\n2️⃣ हिंदी (Hindi)\n\nType '1' for English or '2' for Hindi\n'1' अंग्रेजी के लिए या '2' हिंदी के लिए टाइप करें",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([languageSelectionMessage]);
    } else if (messages.length === 0 && hasInitialized) {
      // Add welcome message if already initialized but no messages
      const welcomeMessage: ChatMessage = {
        id: '1',
        content: language === 'en' 
          ? "Hello! I'm Krishika, your farming assistant 🌱 How can I help you with your farming needs today?"
          : "नमस्ते! मैं कृषिका हूँ, आपकी कृषि सहायक 🌱 आज मैं आपकी खेती की जरूरतों में कैसे मदद कर सकता हूँ?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length, language, hasInitialized]);

  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputMessage.trim();
    setInputMessage('');
    setIsTyping(true);

    // Check if this is language selection (1 or 2)
    if (messages.length === 1 && messages[0].id === 'lang-select') {
      setTimeout(() => {
        let welcomeContent = '';
        
        if (userInput === '1' || userInput.toLowerCase().includes('english')) {
          setLanguage('en');
          welcomeContent = "Great! I'll assist you in English 🌱\n\nHello! I'm Krishika, your personal farming assistant. I'm here to help you with:\n\n🌾 Crop recommendations\n📊 Live mandi rates\n🌤️ Weather forecasts\n🔬 Soil health analysis\n📱 Farming tips & guidance\n\nHow can I help you with your farming needs today?";
        } else if (userInput === '2' || userInput.toLowerCase().includes('hindi') || userInput.toLowerCase().includes('हिंदी')) {
          setLanguage('hi');
          welcomeContent = "बढ़िया! मैं आपकी हिंदी में सहायता करूंगा 🌱\n\nनमस्ते! मैं कृषिका हूँ, आपकी व्यक्तिगत कृषि सहायक। मैं आपकी इन चीजों में मदद कर सकती हूँ:\n\n🌾 फसल की सिफारिशें\n📊 लाइव मंडी भाव\n🌤️ मौसम पूर्वानुमान\n🔬 मिट्टी स्वास्थ्य विश्लेषण\n📱 खेती की सलाह\n\nआज मैं आपकी खेती की जरूरतों में कैसे मदद कर सकती हूँ?";
        } else {
          welcomeContent = "Please select a valid option:\nकृपया एक मान्य विकल्प चुनें:\n\nType '1' for English or '2' for Hindi\n'1' अंग्रेजी के लिए या '2' हिंदी के लिए टाइप करें";
        }
        
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: welcomeContent,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    } else {
      // Normal bot response after language selection
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
    }
  }, [inputMessage, language, messages]);

  const handleBackToMain = useCallback(() => {
    setShowChat(false);
    setIsTyping(false);
  }, []);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    // Reset to messages tab when opening
    if (!isOpen) {
      setActiveTab('messages');
      setShowChat(false);
    }
  };

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
      chatWith: "Chat with Krishika",
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
      help: "सहा���ता",
      collections: "5 संग्रह",
      chatWith: "कृषिका से चैट करें",
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

  const WeatherWidget = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
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
    </div>
  );

  const MarketWidget = () => (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
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
    </div>
  );

  const ExpertHandoffCard = () => (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 mt-4">
      <div className="text-center mb-3">
        <p className="text-sm text-gray-700">{text[language].needMoreHelp}</p>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
          <Phone className="w-4 h-4 mr-2" />
          {text[language].scheduleCall}
        </Button>
        <Button size="sm" variant="outline" className="flex-1 border-green-600 text-green-600">
          <MessageCircle className="w-4 h-4 mr-2" />
          {text[language].whatsapp}
        </Button>
      </div>
    </div>
  );

  const TabContent = () => {
    if (isLoading) return <LoadingSpinner />;

    switch (activeTab) {
      case 'home':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              {/* Gradient Header Section */}
              <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#FBC02D] text-white p-4 relative overflow-hidden flex-shrink-0">
                {/* Header Controls */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-lg">🌱</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 hover:bg-white/30 transition-colors text-xs"
                    >
                      <Globe className="w-3 h-3" />
                      <span>{language.toUpperCase()}</span>
                    </button>
                    
                    <Avatar className="w-7 h-7 border border-white">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                      <AvatarFallback className="bg-white text-[#1B5E20] text-xs">
                        <User className="w-3 h-3" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* Greeting */}
                <div className="mb-4">
                  <h1 className="text-lg mb-1">{text[language].greeting}</h1>
                  <p className="text-white/90 text-xs mb-2">{text[language].tagline}</p>
                </div>

                {/* Crop Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {cropActions.slice(0, 4).map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center gap-1 hover:bg-white transition-all"
                      >
                        <div className={`w-6 h-6 ${action.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="text-xs text-gray-700 text-center leading-tight">{action.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Recent Message Card */}
                <div className="bg-white rounded-lg p-3 text-gray-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-red-500">{text[language].recentMessage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-xs">🗺️</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-700 line-clamp-1">
                        If you need any further assistance w...
                      </p>
                      <p className="text-xs text-gray-500">Scott P • 8h ago</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* White Content Section */}
              <div className="bg-white p-4 space-y-3 flex-shrink-0">
                {/* Weather & Market Widgets */}
                <div className="space-y-2">
                  <WeatherWidget />
                  <MarketWidget />
                </div>

                {/* Main Action Buttons */}
                <button
                  className="w-full bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={handleAskQuestion}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-3 h-3 text-red-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 text-sm">{text[language].askQuestion}</p>
                      <p className="text-xs text-gray-500">{text[language].aiHelp}</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-3 h-3 text-white" />
                  </div>
                </button>

                <button className="w-full bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-3 h-3 text-blue-500" />
                    </div>
                    <p className="font-medium text-gray-900 text-sm">{text[language].scheduleDemo}</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-blue-500" />
                </button>

                {/* Popular Questions */}
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">{text[language].mostPopular}</h4>
                  {popularQuestions.slice(0, 2).map((question, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span className="text-gray-700 text-xs">{question}</span>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </button>
                  ))}
                </div>

                <ExpertHandoffCard />
              </div>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="h-full flex flex-col bg-white overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <h2 className="text-lg font-medium">{text[language].messages}</h2>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Notifications */}
              <div className="p-4 space-y-2">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`${notification.color} rounded-lg p-3 border`}
                    >
                      <div className="flex items-start gap-2">
                        <Icon className="w-4 h-4 text-gray-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-700 mb-2">{notification.message}</p>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs h-7">
                            {notification.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Messages List */}
              <div className="p-4">
                <div className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-sm">🗺️</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-700 line-clamp-1">
                      If you need any further assistance with un...
                    </p>
                    <p className="text-xs text-gray-500">Scott P • 8h ago</p>
                  </div>
                  <ChevronRight className="w-3 h-3 text-red-500" />
                </div>
              </div>
            </div>

            {/* Fixed Bottom Button */}
            <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
              <Button 
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg h-10 gap-2 text-sm"
                onClick={handleAskQuestion}
              >
                {text[language].askQuestion}
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="h-full flex flex-col bg-white overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-700 text-sm">{text[language].searchHelp}</span>
                  <Search className="w-4 h-4 text-red-500 ml-auto" />
                </div>
              </div>

              {/* Most Popular Questions */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 text-sm">{text[language].mostPopular}</h3>
                {popularQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span className="text-gray-700 text-xs">{question}</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </button>
                ))}
              </div>

              {/* Collections Header */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">{text[language].collections}</h3>
              </div>

              {/* Dashboard Style Categories */}
              <div className="grid grid-cols-2 gap-2">
                {helpCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.name}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-all"
                    >
                      <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center mb-2 mx-auto`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-medium text-gray-900 text-xs mb-1">{category.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{category.description}</p>
                      <Badge variant="secondary" className="mt-1 text-xs h-4">
                        {category.articles} articles
                      </Badge>
                    </button>
                  );
                })}
              </div>

              <ExpertHandoffCard />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Widget Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-40"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            {/* Widget Header */}
            <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white p-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                {showChat && (
                  <button
                    onClick={handleBackToMain}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors mr-1"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                )}
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🌱</span>
                </div>
                <div>
                  <h3 className="font-medium text-sm">
                    {showChat ? 'Chat with Krishika' : 
                     activeTab === 'help' ? text[language].help :
                     'Krishika Assistant'}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {showChat ? 'Online • Ready to help' : 
                     activeTab === 'help' ? 'Support Center' :
                     'Online • Ready to help'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {showChat && (
                  <button
                    onClick={toggleLanguage}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleWidget}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

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
              <div className="bg-white border-t border-gray-200 p-3 flex-shrink-0">
                <div className="flex justify-around">
                  {[
                    { id: 'home', icon: Home, label: 'Home' },
                    { id: 'messages', icon: MessageSquare, label: text[language].messages },
                    { id: 'help', icon: HelpCircle, label: text[language].help }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id as Tab)}
                        className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors relative ${
                          isActive
                            ? 'text-green-600 bg-green-50'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className="text-xs">{tab.label}</span>
                        {isActive && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Icon */}
      <div className="flex items-center gap-3">
        {/* Animated Text "Ask to Krishika" */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
              }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ 
                duration: 0.4, 
                type: "spring",
                delay: 1 // Appears after a delay
              }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Ask to Krishika
              </p>
              <div className="absolute inset-0 bg-white rounded-full shadow-lg opacity-50 animate-ping"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Icon - Always Visible */}
        <motion.button
          onClick={toggleWidget}
          className="w-14 h-14 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group z-50 relative"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            y: isOpen ? 0 : [0, -8, 0] // Floating animation when closed
          }}
          transition={{ 
            duration: 0.3, 
            type: "spring",
            y: {
              duration: 2,
              repeat: isOpen ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span 
            className="text-xl"
            animate={{ 
              rotate: isOpen ? 0 : [0, 10, -10, 0] // Wiggle animation when closed
            }}
            transition={{
              rotate: {
                duration: 3,
                repeat: isOpen ? 0 : Infinity,
                ease: "easeInOut"
              }
            }}
          >
            🌱
          </motion.span>
          
          {/* Notification Badge */}
          <motion.div 
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <span className="text-xs text-white">2</span>
          </motion.div>

          {/* Pulsing Ring Effect */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-green-400"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{ 
              duration: 2, 
              repeat: isOpen ? 0 : Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatbotWidget;
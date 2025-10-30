import React, { useState } from 'react';
import { Home, Camera, Droplet, Sprout, MessageSquare, User, LogOut, Sun, Moon, Menu, X, Sparkles, TrendingUp, Award, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PestDetection from './PestDetection';
import NPKAnalysis from './NPKAnalysis';
import SoilRecommendation from './SoilRecommendation';
import FarmerChatbot from './FarmerChatbot';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

type ActiveModule = 'home' | 'pest' | 'npk' | 'soil' | 'chatbot';

interface FarmerDashboardProps {
  onLogout?: () => void;
  farmerName?: string;
}

export default function FarmerDashboard({ onLogout, farmerName = "Farmer" }: FarmerDashboardProps) {
  const [activeModule, setActiveModule] = useState<ActiveModule>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const menuItems = [
    { id: 'home' as ActiveModule, icon: Home, label: selectedLanguage === 'hi' ? 'होम' : 'Home' },
    { id: 'pest' as ActiveModule, icon: Camera, label: selectedLanguage === 'hi' ? 'कीट पहचान' : 'Pest Detection' },
    { id: 'npk' as ActiveModule, icon: Droplet, label: selectedLanguage === 'hi' ? 'मिट्टी परीक्षण' : 'Soil Test (NPK)' },
    { id: 'soil' as ActiveModule, icon: Sprout, label: selectedLanguage === 'hi' ? 'फसल सुझाव' : 'Crop Recommendation' },
    { id: 'chatbot' as ActiveModule, icon: MessageSquare, label: selectedLanguage === 'hi' ? 'एआई सहायक' : 'AI Assistant' },
  ];

  const renderContent = () => {
    // Show chatbot in full screen mode
    if (activeModule === 'chatbot') {
      return null;
    }

    switch (activeModule) {
      case 'pest':
        return <PestDetection language={selectedLanguage} isDarkMode={isDarkMode} />;
      case 'npk':
        return <NPKAnalysis language={selectedLanguage} isDarkMode={isDarkMode} />;
      case 'soil':
        return <SoilRecommendation language={selectedLanguage} isDarkMode={isDarkMode} />;
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section with Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B5E20] via-green-600 to-[#2E7D32] p-6 shadow-xl"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-xl md:text-2xl text-white">
                        {selectedLanguage === 'hi' ? '🙏 नमस्ते' : '👋 Welcome'}, {farmerName}!
                      </h1>
                      <Badge className="bg-[#FBC02D] text-[#1B5E20] border-none text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                    </div>
                    <p className="text-sm text-white/90">
                      {selectedLanguage === 'hi' 
                        ? 'अन्नदाता स्मार्ट कृषि डैशबोर्ड में आपका स्वागत है' 
                        : 'Welcome to Annadata Smart Farming Dashboard'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-8 w-8"
                  >
                    <Bell className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-xs">{selectedLanguage === 'hi' ? 'कुल स्कैन' : 'Total Scans'}</p>
                        <p className="text-xl text-white mt-0.5">127</p>
                      </div>
                      <div className="bg-[#FBC02D] p-2 rounded-lg">
                        <Camera className="w-5 h-5 text-[#1B5E20]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-[#FBC02D]">
                      <TrendingUp className="w-3 h-3" />
                      <span>+12% {selectedLanguage === 'hi' ? 'इस महीने' : 'this month'}</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-xs">{selectedLanguage === 'hi' ? 'स्वस्थ फसलें' : 'Healthy Crops'}</p>
                        <p className="text-xl text-white mt-0.5">94%</p>
                      </div>
                      <div className="bg-[#FBC02D] p-2 rounded-lg">
                        <Sprout className="w-5 h-5 text-[#1B5E20]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-green-300">
                      <Award className="w-3 h-3" />
                      <span>{selectedLanguage === 'hi' ? 'उत्कृष्ट' : 'Excellent'}</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-xs">{selectedLanguage === 'hi' ? 'AI सुझाव' : 'AI Suggestions'}</p>
                        <p className="text-xl text-white mt-0.5">23</p>
                      </div>
                      <div className="bg-[#FBC02D] p-2 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-[#1B5E20]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-blue-300">
                      <Sparkles className="w-3 h-3" />
                      <span>{selectedLanguage === 'hi' ? 'सक्रिय' : 'Active'}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pest Detection Card */}
              <motion.button
                onClick={() => setActiveModule('pest')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-5 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all text-left group relative overflow-hidden`}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base mb-0.5">
                        {selectedLanguage === 'hi' ? 'कीट पहचान' : 'Pest Detection'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Powered
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'फसल की तस्वीर लें और कीटों की पहचान करें'
                      : 'Upload crop photos to identify pests and diseases'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    {selectedLanguage === 'hi' ? '98% सटीकता' : '98% Accuracy'}
                  </div>
                </div>
              </motion.button>

              {/* NPK Analysis Card */}
              <motion.button
                onClick={() => setActiveModule('npk')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-5 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all text-left group relative overflow-hidden`}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                      <Droplet className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base mb-0.5">
                        {selectedLanguage === 'hi' ? 'मिट्टी परीक्षण' : 'Soil Test (NPK)'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Smart Analysis
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'मिट्टी की एनपीके मान जांचें और सुझाव पाएं'
                      : 'Check NPK values and get fertilizer recommendations'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                    {selectedLanguage === 'hi' ? 'तुरंत परिणाम' : 'Instant Results'}
                  </div>
                </div>
              </motion.button>

              {/* Soil Recommendation Card */}
              <motion.button
                onClick={() => setActiveModule('soil')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-5 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all text-left group relative overflow-hidden`}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                      <Sprout className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base mb-0.5">
                        {selectedLanguage === 'hi' ? 'फसल सुझाव' : 'Crop Recommendation'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <Award className="w-3 h-3 mr-1" />
                        Expert System
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'अपनी मिट्टी के लिए सबसे अच्छी फसल जानें'
                      : 'Find the best crops for your soil and climate'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    {selectedLanguage === 'hi' ? 'डेटा-आधारित' : 'Data-Driven'}
                  </div>
                </div>
              </motion.button>

              {/* AI Chatbot Card */}
              <motion.button
                onClick={() => setActiveModule('chatbot')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-5 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all text-left group relative overflow-hidden`}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base mb-0.5">
                        {selectedLanguage === 'hi' ? 'एआई सहायक कृषिका' : 'AI Assistant Krishika'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Voice Enabled
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'अपनी भाषा में बात करें, कृषि समस्याओं का समाधान पाएं'
                      : 'Chat in your language, get instant farming solutions'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
                    {selectedLanguage === 'hi' ? '24/7 उपलब्ध' : '24/7 Available'}
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Tips Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-0.5 shadow-xl"
            >
              <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-[11px] p-5`}>
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2.5 rounded-lg shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {selectedLanguage === 'hi' ? '💡 आज की कृषि टिप' : '💡 Today\'s Farming Tip'}
                    </h3>
                    <p className="text-sm opacity-80">
                      {selectedLanguage === 'hi'
                        ? 'फसल की बुवाई से पहले मिट्टी की जांच जरूर करें। सही एनपीके मान से उपज 30% तक बढ़ सकती है।'
                        : 'Always test soil before sowing. Optimal NPK levels can increase yield by up to 30%.'}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs">
                      <TrendingUp className="w-3 h-3" />
                      {selectedLanguage === 'hi' ? '+30% उपज संभव' : '+30% Yield Possible'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );
    }
  };

  // Render full-screen chatbot when active
  if (activeModule === 'chatbot') {
    return (
      <FarmerChatbot 
        language={selectedLanguage} 
        isDarkMode={isDarkMode}
        onBack={() => setActiveModule('home')}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50 text-gray-900'}`}>
      {/* Enhanced Header */}
      <header className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-gradient-to-r from-[#1B5E20] via-green-700 to-[#1B5E20]'} text-white shadow-xl sticky top-0 z-50 backdrop-blur-md border-b border-white/10`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={toggleMobileMenu} className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-9 h-9 bg-[#FBC02D] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-xl">🌾</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="font-semibold">{selectedLanguage === 'hi' ? 'अन्नदाता' : 'Annadata'}</h1>
                <p className="text-xs text-white/70 hidden md:block">{selectedLanguage === 'hi' ? 'स्मार्ट कृषि डैशबोर्ड' : 'Smart Farming Dashboard'}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLanguage(selectedLanguage === 'en' ? 'hi' : 'en')}
              className="px-3 py-1.5 bg-[#FBC02D] text-[#1B5E20] rounded-lg hover:bg-yellow-400 transition-colors shadow-md text-sm"
            >
              {selectedLanguage === 'en' ? 'हिंदी' : 'English'}
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            {/* User Profile */}
            <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/20">
              <div className="w-7 h-7 bg-[#FBC02D] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-[#1B5E20]" />
              </div>
              <span className="text-sm max-w-[100px] truncate">{farmerName}</span>
            </div>

            {/* Logout */}
            {onLogout && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="hidden md:flex items-center gap-1 text-white hover:bg-white/10 px-2 py-1.5 rounded-lg transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">{selectedLanguage === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <nav className="px-4 py-2 space-y-2 bg-gradient-to-b from-transparent to-black/10">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setActiveModule(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeModule === item.id
                        ? 'bg-[#FBC02D] text-[#1B5E20] shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeModule === item.id ? 'bg-white/20' : 'bg-white/10'}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg flex-1 text-left">{item.label}</span>
                  </motion.button>
                ))}
                {onLogout && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: menuItems.length * 0.05 }}
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg"
                  >
                    <div className="p-2 rounded-lg bg-white/20">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <span className="text-lg flex-1 text-left">
                      {selectedLanguage === 'hi' ? 'लॉग आउट' : 'Logout'}
                    </span>
                  </motion.button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop (Fixed) */}
        <aside className={`hidden md:block w-64 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-md shadow-xl min-h-[calc(100vh-60px)] fixed top-[60px] left-0 border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-y-auto`}>
          <nav className="p-3 space-y-1.5">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all relative overflow-hidden ${
                  activeModule === item.id
                    ? 'bg-gradient-to-r from-[#1B5E20] to-green-600 text-white shadow-lg'
                    : isDarkMode
                    ? 'bg-gray-700/50 text-white hover:bg-gray-600/50'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
              >
                {activeModule === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#1B5E20] to-green-600 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-2.5 w-full">
                  <div className={`p-1.5 rounded-md ${
                    activeModule === item.id 
                      ? 'bg-white/20' 
                      : isDarkMode 
                      ? 'bg-gray-600' 
                      : 'bg-white'
                  }`}>
                    <item.icon className={`w-4 h-4 ${activeModule === item.id ? 'text-white' : 'text-[#1B5E20]'}`} />
                  </div>
                  <span className="text-sm flex-1 text-left">{item.label}</span>
                  {activeModule === item.id && (
                    <div className="w-1.5 h-1.5 bg-[#FBC02D] rounded-full animate-pulse"></div>
                  )}
                </div>
              </motion.button>
            ))}
          </nav>
        </aside>

        {/* Main Content - Add left margin to account for fixed sidebar */}
        <main className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Play, CheckCircle, TrendingUp, MapPin, Users, 
  Clock, Shield, Zap, BarChart3, Wheat, Cloud, FlaskConical, 
  Camera, Bell, Phone, Star, ChevronLeft, ChevronRight,
  Satellite, Smartphone, Award, Target, Globe, Menu, X,
  Sun, Moon, Rocket, Map, Leaf
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader } from './components/ui/card';
import { Badge } from './components/ui/badge';
import ChatbotWidget from './components/ChatbotWidget';

// Import images
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import LoginSignup from './components/LoginSignup';
import GetInTouch from './components/GetInTouch';
import LiveMandiPrices from './components/LiveMandiPrices';
import FarmerDashboard from './components/FarmerDashboard';
import VendorDashboard from './components/VendorDashboard';
import ConsumerDashboard from './components/ConsumerDashboard';
import annadataLogo from 'figma:asset/092c2cf26050eefa770d1845ea58caecf68fa85f.png';
import portalImage from 'figma:asset/6714307eaabd40348e450b10785b10c1119bf199.png';
import communityDemo1 from 'figma:asset/7aec63bb2e7191a897642c3336a11d297a916930.png';
import communityDemo2 from 'figma:asset/b1beed60d0bb09b51600325376b0e161a1125f00.png';

export default function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [showLoginSignup, setShowLoginSignup] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'vendor' | 'consumer' | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'farmer' | 'vendor' | 'consumer' | null>(null);
  const [userName, setUserName] = useState<string>('किसान');

  // Hero background images
  const heroImages = [
    "https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZ3JpY3VsdHVyZSUyMHRlY2hub2xvZ3klMjBmYXJtaW5nJTIwZHJvbmVzJTIwc2F0ZWxsaXRlc3xlbnwxfHx8fDE3NTkwODY5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1743614052683-38c4506cabb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsJTIwdGVzdGluZyUyMGFncmljdWx0dXJlJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NTkwNTQzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1744230673231-865d54a0aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwbW9uaXRvcmluZyUyMGFncmljdWx0dXJhbCUyMHRlY2hub2xvZ3klMjBtYXB8ZW58MXx8fHwxNzU5MDg3MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1713959989861-2425c95e9777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGFncmljdWx0dXJhbCUyMGZpZWxkJTIwc3VucmlzZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTkwODY5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Auto-change hero background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll animation hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Smooth scroll handler for anchor links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace('#', ''));
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  // Handle login
  const handleLogin = (role: 'farmer' | 'vendor' | 'consumer', name: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    setShowLoginSignup(false);
    setSelectedRole(undefined);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName(language === 'hi' ? 'किसान' : 'Farmer');
  };

  // Animated counter component
  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isVisible.metrics) return;
      
      const increment = end / (duration / 50);
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev >= end) {
            clearInterval(timer);
            return end;
          }
          return Math.min(prev + increment, end);
        });
      }, 50);
      
      return () => clearInterval(timer);
    }, [isVisible.metrics, end, duration]);
    
    return <span>{Math.floor(count).toLocaleString()}</span>;
  };

  // Features data
  const features = [
    {
      icon: Wheat,
      title: "AI Crop Recommendation",
      description: "Get personalized crop suggestions based on soil, climate, and market data",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50"
    },
    {
      icon: BarChart3,
      title: "Live Market/Mandi Rates",
      description: "Real-time commodity prices and market trend predictions",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Cloud,
      title: "Real-time Weather Forecasts",
      description: "Accurate weather predictions and climate risk assessments",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: FlaskConical,
      title: "Soil & Crop Health Scans",
      description: "Advanced soil analysis and crop health monitoring",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Intelligent notifications for pests, weather, and price changes",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50"
    },
    {
      icon: Phone,
      title: "Expert Consultation",
      description: "Direct access to agricultural experts and agronomists",
      color: "from-teal-500 to-blue-500",
      bgColor: "bg-teal-50"
    }
  ];

  // Testimonials data with improved images and crop-specific photos
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      quote: language === 'en' 
        ? "Using Annadata, I increased my yield by 30% and reduced water usage by 25%. The AI recommendations were spot-on!"
        : "अन्नदाता का उ��योग करके, मैंने अपनी पै���ावार में 30% की वृद्धि की और पानी का उपयोग 25% कम किया। AI की सिफारिशें बिल्कुल सटीक थीं!",
      rating: 5,
      crop: language === 'en' ? "Wheat" : "गेहूं",
      improvement: language === 'en' ? "+30% yield" : "+30% उत्पादन",
      cropImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop"
    },
    {
      name: "Priya Sharma",
      location: "Punjab",
      image: "https://images.unsplash.com/photo-1614025000673-edf238aaf5d4?w=100&h=100&fit=crop&crop=face",
      quote: language === 'en'
        ? "The weather alerts saved my entire crop from unexpected hail. The market price predictions helped me sell at the right time."
        : "मौसम की चेतावनी ने मेरी पूरी फसल को अचानक आई ओलावृष्टि से बचाया। बाजार मूल्य की भविष्यवाणी ने ���ुझे सही समय पर बेचने में मदद की।",
      rating: 5,
      crop: language === 'en' ? "Rice" : "चावल",
      improvement: language === 'en' ? "+25% profit" : "+25% मुनाफा",
      cropImage: "https://images.unsplash.com/photo-1695150601855-f545034a070a?w=300&h=200&fit=crop"
    },
    {
      name: "Ramesh Patel",
      location: "Gujarat",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      quote: language === 'en'
        ? "The soil health analysis revealed issues I never knew existed. Now my cotton crops are healthier than ever before."
        : "मिट्टी स्वास्थ्य विश्लेषण ने उन समस्याओं को उजागर किया जिनके बारे में मुझे पता ही नहीं था। अब मेरी कपास ��ी फसल पहले से कहीं अधिक स्वस्थ है।",
      rating: 5,
      crop: language === 'en' ? "Cotton" : "कपास",
      improvement: language === 'en' ? "+40% quality" : "+40% गुणवत्ता",
      cropImage: "https://images.unsplash.com/photo-1712471010183-8c30c4511467?w=300&h=200&fit=crop"
    }
  ];

  // Regional crop data for interactive demo
  const regionData = {
    north: { crops: ["Wheat", "Rice", "Sugarcane"], season: "Rabi", confidence: "96%" },
    south: { crops: ["Rice", "Cotton", "Millets"], season: "Kharif", confidence: "94%" },
    west: { crops: ["Cotton", "Sugarcane", "Soybean"], season: "Both", confidence: "98%" },
    east: { crops: ["Rice", "Jute", "Tea"], season: "Kharif", confidence: "92%" }
  };

  // Route to appropriate dashboard based on user role
  if (isLoggedIn && userRole === 'farmer') {
    return (
      <FarmerDashboard 
        onLogout={handleLogout}
        farmerName={userName}
      />
    );
  }

  if (isLoggedIn && userRole === 'vendor') {
    return (
      <VendorDashboard 
        onLogout={handleLogout}
        vendorName={userName}
      />
    );
  }

  if (isLoggedIn && userRole === 'consumer') {
    return (
      <ConsumerDashboard 
        onLogout={handleLogout}
        consumerName={userName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 shadow-lg border-b border-gray-200/50 backdrop-blur-md' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <img 
                  src={annadataLogo} 
                  alt="Annadata Logo" 
                  className="w-12 h-12 rounded-full border-2 border-[#FBC02D] shadow-md"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1B5E20]/20 to-[#FBC02D]/20"></div>
              </div>
              <div>
                <span className={`text-2xl font-bold transition-all duration-300 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] bg-clip-text text-transparent' 
                    : 'text-white drop-shadow-lg'
                }`}>
                  Annadata
                </span>
                <p className={`text-xs font-medium transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-700' 
                    : 'text-white/90 drop-shadow-lg'
                }`}>Smart Agriculture Platform</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <motion.div 
                className="flex items-center gap-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a 
                  href="#features" 
                  onClick={(e) => handleSmoothScroll(e, '#features')}
                  className={`transition-all duration-300 font-medium relative group ${
                    scrolled 
                      ? 'text-gray-800 hover:text-[#1B5E20]' 
                      : 'text-white/90 hover:text-white drop-shadow-lg'
                  }`}
                >
                  Features
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    scrolled ? 'bg-[#1B5E20]' : 'bg-white'
                  }`}></span>
                </a>
                <a 
                  href="#demo" 
                  onClick={(e) => handleSmoothScroll(e, '#demo')}
                  className={`transition-all duration-300 font-medium relative group ${
                    scrolled 
                      ? 'text-gray-800 hover:text-[#1B5E20]' 
                      : 'text-white/90 hover:text-white drop-shadow-lg'
                  }`}
                >
                  Demo
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    scrolled ? 'bg-[#1B5E20]' : 'bg-white'
                  }`}></span>
                </a>
                <a 
                  href="#testimonials" 
                  onClick={(e) => handleSmoothScroll(e, '#testimonials')}
                  className={`transition-all duration-300 font-medium relative group ${
                    scrolled 
                      ? 'text-gray-800 hover:text-[#1B5E20]' 
                      : 'text-white/90 hover:text-white drop-shadow-lg'
                  }`}
                >
                  Success Stories
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    scrolled ? 'bg-[#1B5E20]' : 'bg-white'
                  }`}></span>
                </a>
                <a 
                  href="#portals" 
                  onClick={(e) => handleSmoothScroll(e, '#portals')}
                  className={`transition-all duration-300 font-medium relative group ${
                    scrolled 
                      ? 'text-gray-800 hover:text-[#1B5E20]' 
                      : 'text-white/90 hover:text-white drop-shadow-lg'
                  }`}
                >
                  {language === 'en' ? 'Portals' : 'पोर्टल'}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    scrolled ? 'bg-[#1B5E20]' : 'bg-white'
                  }`}></span>
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => handleSmoothScroll(e, '#contact')}
                  className={`transition-all duration-300 font-medium relative group ${
                    scrolled 
                      ? 'text-gray-800 hover:text-[#1B5E20]' 
                      : 'text-white/90 hover:text-white drop-shadow-lg'
                  }`}
                >
                  {language === 'en' ? 'Contact' : 'संपर्क'}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    scrolled ? 'bg-[#1B5E20]' : 'bg-white'
                  }`}></span>
                </a>
              </motion.div>
              
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors shadow-sm border ${
                    scrolled 
                      ? 'bg-white/80 backdrop-blur-sm hover:bg-white/90 border-gray-200/50 text-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-800/90 dark:border-gray-700/50 dark:text-gray-300'
                      : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30 text-white'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors shadow-sm border ${
                    scrolled 
                      ? 'bg-white/80 backdrop-blur-sm hover:bg-white/90 border-gray-200/50 text-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-800/90 dark:border-gray-700/50 dark:text-gray-300'
                      : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30 text-white'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{language === 'en' ? 'हिं' : 'EN'}</span>
                </button>

                <Button 
                  onClick={() => setShowLoginSignup(true)}
                  variant="outline" 
                  className={`transition-all duration-300 shadow-sm ${
                    scrolled 
                      ? 'border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                      : 'border-white text-white hover:bg-white hover:text-[#1B5E20] bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  {language === 'en' ? 'Login' : 'लॉगिन'}
                </Button>

                <Button 
                  className="bg-gradient-to-r from-[#FBC02D] to-[#F9A825] hover:from-[#F9A825] hover:to-[#F57F17] text-black font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    setShowLoginSignup(true);
                  }}
                >
                  {language === 'en' ? 'Get Started Free' : 'मुफ्त शुरू करें'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`transition-colors p-2 rounded-lg shadow-sm border ${
                  scrolled 
                    ? 'text-gray-800 hover:text-[#1B5E20] bg-white/80 backdrop-blur-sm border-gray-200/50 dark:bg-gray-800/80 dark:text-gray-300 dark:border-gray-700/50 dark:hover:text-white'
                    : 'text-white hover:text-white/80 bg-white/20 backdrop-blur-sm border-white/30'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md dark:bg-gray-900/95 dark:border-gray-700"
              >
                <div className="px-4 py-6 space-y-4">
                  <a 
                    href="#features" 
                    onClick={(e) => handleSmoothScroll(e, '#features')}
                    className="block text-gray-700 hover:text-[#1B5E20] transition-colors font-medium dark:text-gray-300 dark:hover:text-white"
                  >
                    {language === 'en' ? 'Features' : 'सुविधाएं'}
                  </a>
                  <a 
                    href="#demo" 
                    onClick={(e) => handleSmoothScroll(e, '#demo')}
                    className="block text-gray-700 hover:text-[#1B5E20] transition-colors font-medium dark:text-gray-300 dark:hover:text-white"
                  >
                    {language === 'en' ? 'Demo' : 'डेमो'}
                  </a>
                  <a 
                    href="#testimonials" 
                    onClick={(e) => handleSmoothScroll(e, '#testimonials')}
                    className="block text-gray-700 hover:text-[#1B5E20] transition-colors font-medium dark:text-gray-300 dark:hover:text-white"
                  >
                    {language === 'en' ? 'Success Stories' : 'सफलता की कहानियां'}
                  </a>
                  <a 
                    href="#portals" 
                    onClick={(e) => handleSmoothScroll(e, '#portals')}
                    className="block text-gray-700 hover:text-[#1B5E20] transition-colors font-medium dark:text-gray-300 dark:hover:text-white"
                  >
                    {language === 'en' ? 'Portals' : 'पोर्टल'}
                  </a>
                  <a 
                    href="#contact" 
                    onClick={(e) => handleSmoothScroll(e, '#contact')}
                    className="block text-gray-700 hover:text-[#1B5E20] transition-colors font-medium dark:text-gray-300 dark:hover:text-white"
                  >
                    {language === 'en' ? 'Contact' : 'संपर्क'}
                  </a>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setShowLoginSignup(true)}
                      variant="outline" 
                      className="flex-1 border-[#1B5E20] text-[#1B5E20]"
                    >
                      {language === 'en' ? 'Login' : 'लॉगिन'}
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-[#FBC02D] to-[#F9A825] hover:from-[#F9A825] hover:to-[#F57F17] text-black font-semibold"
                      onClick={() => {
                        setShowLoginSignup(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {language === 'en' ? 'Sign Up' : 'साइन अप'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentHeroImage}
              src={heroImages[currentHeroImage]}
              alt="Modern Agriculture"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/90 via-[#1B5E20]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-20 h-20 bg-[#FBC02D]/20 rounded-full"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-16 h-16 bg-white/10 rounded-full"
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-[#FBC02D]/20 text-[#FBC02D] border-[#FBC02D]/30">
              <Rocket className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Revolutionizing Indian Agriculture' : 'भारतीय कृषि में क्रांति'}
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="inline-block">Annadata – </span>
              <span className="text-[#FBC02D] inline-block">
                {language === 'en' ? 'Empowering Farmers' : 'किसानों को सशक्त बनाना'}
              </span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {language === 'en' 
                ? "Get the best crop recommendations, live mandi rates, and weather insights for higher yields using cutting-edge AI technology."
                : "अत्याधुनिक AI तकनीक का उपयोग करक��� बेहतर फसल की सिफारिशें, लाइव मंडी भाव और मौसम की जानकारी प्राप्त करें।"
              }
            </motion.p>

            {/* Join As Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-green-400/30"
                  onClick={() => {
                    setSelectedRole('farmer');
                    setShowLoginSignup(true);
                  }}
                >
                  <Wheat className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Join as Farmer' : 'किसान के रूप में शा���िल हों'}
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-orange-400/30"
                  onClick={() => {
                    setSelectedRole('vendor');
                    setShowLoginSignup(true);
                  }}
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Join as Vendor' : 'विक्रेता के रूप में शामिल हों'}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-blue-400/30"
                  onClick={() => {
                    setSelectedRole('consumer');
                    setShowLoginSignup(true);
                  }}
                >
                  <Users className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Join as Consumer' : 'उपभोक्ता के रूप में शामिल हों'}
                </Button>
              </motion.div>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white/80 text-white hover:bg-white hover:text-[#1B5E20] text-lg px-8 py-4 backdrop-blur-sm bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={(e) => handleSmoothScroll(e, '#demo')}
                >
                  <Play className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Watch Demo' : 'डेमो देखें'}
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-[#FBC02D] text-[#FBC02D] hover:bg-[#FBC02D] hover:text-black text-lg px-8 py-4 backdrop-blur-sm bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={(e) => handleSmoothScroll(e, '#features')}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Explore Features' : 'सुविधाएं देखें'}
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-4 h-4 text-[#FBC02D]" />
                <span className="text-sm">
                  {language === 'en' ? '50,000+ Happy Farmers' : '50,000+ खुश किसान'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-4 h-4 text-[#FBC02D]" />
                <span className="text-sm">
                  {language === 'en' ? '96% Accuracy Rate' : '96% सटीकता दर'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-4 h-4 text-[#FBC02D]" />
                <span className="text-sm">
                  {language === 'en' ? '28 States Covered' : '28 राज्यों में सेवा'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Live Mandi Prices Section */}
      <LiveMandiPrices language={language} />

      {/* Portal Navigation Section */}
      <section id="portals" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background crop pattern */}
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1696219364443-0a34143c7cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXQlMjBwcm9kdWNlfGVufDF8fHx8MTc1OTA3NjA5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Fresh Produce"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.portals ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#1B5E20] text-white px-6 py-2">
              {language === 'en' ? 'Choose Your Role' : 'अपनी भूमिका चुनें'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'en' ? 'Select Your ' : 'अपना '}
              <span className="text-[#1B5E20] dark:text-[#FBC02D]">{language === 'en' ? 'Portal' : 'पोर्टल'}</span>
              {language === 'en' ? '' : ' चुने��'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              {language === 'en' 
                ? 'Annadata offers specialized interfaces for farmers, vendors, and consumers in the agricultural ecosystem.'
                : 'अन्नदाता कृषि पारिस्थितिकी तंत्र में किसानों, विक्रेताओं और उपभोक्ताओं के लिए विशेष इंटरफेस प्रदान करता है।'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Farmer Portal */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible.portals ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <Card className="h-full bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 hover:border-green-300 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Wheat className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Farmer Portal' : 'किसान पोर्टल'}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Manage your product listings</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Track orders and payments</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Access market analytics</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Monitor crop health data</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white mt-6 group-hover:scale-105 transition-transform duration-500"
                    onClick={() => {
                      setSelectedRole('farmer');
                      setShowLoginSignup(true);
                    }}
                  >
                    Enter Farmer Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vendor Portal */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible.portals ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <Card className="h-full bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 hover:border-orange-300 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Vendor Portal' : 'विक्रेता पोर्टल'}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      <span>Discover fresh products</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      <span>Compare prices and quality</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      <span>Place bulk orders</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      <span>Manage your inventory</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-6 group-hover:scale-105 transition-transform duration-500"
                    onClick={() => {
                      setSelectedRole('vendor');
                      setShowLoginSignup(true);
                    }}
                  >
                    Enter Vendor Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Consumer Portal */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible.portals ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="group"
            >
              <Card className="h-full bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:border-blue-300 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Consumer Portal' : 'उपभोक्ता पोर्टल'}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Find nearby vendors</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Compare prices</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Track orders in real-time</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Save on frequently purchased items</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-6 group-hover:scale-105 transition-transform duration-500"
                    onClick={() => {
                      setSelectedRole('consumer');
                      setShowLoginSignup(true);
                    }}
                  >
                    Enter Consumer Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section id="problem" className="py-20 bg-gradient-to-b from-[#F1F8E9] to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.problem ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left - Problem Illustration */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1601965202403-31a8f85b8b76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBmaWVsZHMlMjBjcm9wcyUyMHVuY2VydGFpbnR5JTIwd2VhdGhlcnxlbnwxfHx8fDE3NTkwODY5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Farmer Challenges"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Traditional Farming Challenges</h3>
                  <p className="text-white/90">Uncertainty • Low yields • Market volatility</p>
                </div>
              </div>
              
              {/* Floating problem indicators */}
              <motion.div
                className="absolute -top-4 -right-4 bg-red-500 text-white p-3 rounded-full shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-6 h-6" />
              </motion.div>
            </div>

            {/* Right - Problem Points */}
            <div>
              <Badge className="mb-4 bg-red-100 text-red-600 border-red-200">
                Critical Challenges
              </Badge>
              
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                We solve the biggest challenges 
                <span className="text-[#1B5E20] dark:text-[#FBC02D]"> farmers face</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Cloud,
                    title: "Uncertain Weather Patterns",
                    description: "Unpredictable rainfall and extreme weather events destroy crops and livelihoods"
                  },
                  {
                    icon: TrendingUp,
                    title: "Market Volatility",
                    description: "Fluctuating prices and lack of market information lead to significant losses"
                  },
                  {
                    icon: Target,
                    title: "Wrong Crop Choices",
                    description: "Poor crop selection based on incomplete data results in low yields and profits"
                  }
                ].map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isVisible.problem ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <problem.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{problem.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{problem.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Overview Section */}
      <section id="solution" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.solution ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#1B5E20] text-white">
              AI-Powered Solution
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How It <span className="text-[#1B5E20] dark:text-[#FBC02D]">Works</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform transforms farming decisions with data-driven insights and real-time recommendations.
            </p>
          </motion.div>

          {/* Process Flow */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                icon: MapPin,
                title: "Enter Details",
                description: "Input your soil type, location, and farming preferences",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "02", 
                icon: Zap,
                title: "AI Analysis",
                description: "Our AI analyzes climate, soil, and market data instantly",
                color: "from-[#1B5E20] to-[#2E7D32]"
              },
              {
                step: "03",
                icon: BarChart3,
                title: "Get Insights",
                description: "Receive crop recommendations, prices & weather updates",
                color: "from-[#FBC02D] to-[#F9A825]"
              },
              {
                step: "04",
                icon: TrendingUp,
                title: "Grow Smarter",
                description: "Implement recommendations and earn better profits",
                color: "from-green-500 to-green-600"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible.solution ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative text-center"
              >
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 transform translate-x-1/2 z-0"></div>
                )}
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block w-8 h-8 bg-gray-100 rounded-full text-sm font-bold text-gray-600 leading-8">
                      {step.step}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.features ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#FBC02D]/20 text-[#1B5E20] border-[#FBC02D]">
              <Zap className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need to 
              <span className="text-[#1B5E20] dark:text-[#FBC02D]"> Farm Smarter</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible.features ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  className="group cursor-pointer"
                >
                  <Card className={`h-full ${feature.bgColor} border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${hoveredFeature === index ? 'scale-105' : ''}`}>
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={hoveredFeature === index ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <Button size="sm" className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 bg-[#1B5E20] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBC02D] to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.demo ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#FBC02D] text-black">
              <Map className="w-4 h-4 mr-2" />
              Interactive Demo
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore Crop Recommendations
              <br /><span className="text-[#FBC02D]">Across India</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Hover over different regions to see AI-powered crop recommendations tailored to local conditions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Map */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6 text-center">India Crop Recommendation Map</h3>
                
                {/* Simplified India Map Regions */}
                <div className="relative w-full h-80 bg-white/5 rounded-xl overflow-hidden">
                  <svg viewBox="0 0 400 300" className="w-full h-full">
                    {/* North Region */}
                    <motion.path
                      d="M50 50 L200 50 L200 120 L50 120 Z"
                      fill={selectedRegion === 'north' ? '#FBC02D' : 'rgba(255,255,255,0.2)'}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2"
                      className="cursor-pointer"
                      onHoverStart={() => setSelectedRegion('north')}
                      onHoverEnd={() => setSelectedRegion(null)}
                      whileHover={{ scale: 1.05 }}
                    />
                    <text x="125" y="85" fill="white" textAnchor="middle" className="text-sm font-medium">
                      North India
                    </text>
                    
                    {/* South Region */}
                    <motion.path
                      d="M50 180 L200 180 L200 250 L50 250 Z"
                      fill={selectedRegion === 'south' ? '#FBC02D' : 'rgba(255,255,255,0.2)'}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2"
                      className="cursor-pointer"
                      onHoverStart={() => setSelectedRegion('south')}
                      onHoverEnd={() => setSelectedRegion(null)}
                      whileHover={{ scale: 1.05 }}
                    />
                    <text x="125" y="215" fill="white" textAnchor="middle" className="text-sm font-medium">
                      South India
                    </text>
                    
                    {/* West Region */}
                    <motion.path
                      d="M220 80 L350 80 L350 150 L220 150 Z"
                      fill={selectedRegion === 'west' ? '#FBC02D' : 'rgba(255,255,255,0.2)'}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2"
                      className="cursor-pointer"
                      onHoverStart={() => setSelectedRegion('west')}
                      onHoverEnd={() => setSelectedRegion(null)}
                      whileHover={{ scale: 1.05 }}
                    />
                    <text x="285" y="115" fill="white" textAnchor="middle" className="text-sm font-medium">
                      West India
                    </text>
                    
                    {/* East Region */}
                    <motion.path
                      d="M220 170 L350 170 L350 240 L220 240 Z"
                      fill={selectedRegion === 'east' ? '#FBC02D' : 'rgba(255,255,255,0.2)'}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2"
                      className="cursor-pointer"
                      onHoverStart={() => setSelectedRegion('east')}
                      onHoverEnd={() => setSelectedRegion(null)}
                      whileHover={{ scale: 1.05 }}
                    />
                    <text x="285" y="205" fill="white" textAnchor="middle" className="text-sm font-medium">
                      East India
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Demo Results */}
            <div>
              <AnimatePresence mode="wait">
                {selectedRegion ? (
                  <motion.div
                    key={selectedRegion}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl p-8 shadow-2xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} India Analysis
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Recommended Crops:</h4>
                        <div className="flex flex-wrap gap-2">
                          {regionData[selectedRegion].crops.map((crop, index) => (
                            <Badge key={index} className="bg-[#1B5E20] text-white">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Best Season:</h4>
                        <Badge className="bg-[#FBC02D] text-black">
                          {regionData[selectedRegion].season}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">AI Confidence:</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: regionData[selectedRegion].confidence }}
                            ></div>
                          </div>
                          <span className="font-semibold text-green-600">
                            {regionData[selectedRegion].confidence}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6 bg-[#1B5E20] hover:bg-[#2E7D32] text-white">
                      Get Detailed Report
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
                  >
                    <Satellite className="w-16 h-16 text-[#FBC02D] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Experience AI-Powered Recommendations
                    </h3>
                    <p className="text-white/80 mb-6">
                      Hover over different regions on the map to see how our AI analyzes local conditions and recommends the best crops for each area.
                    </p>
                    <Button className="bg-[#FBC02D] hover:bg-[#F9A825] text-black">
                      Start Demo
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Watch Demo - Community Engagement Section */}
      <section id="watch-demo" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible['watch-demo'] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#1B5E20] text-white">
              <Play className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Watch Demo' : 'डेमो देखें'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'en' ? 'Annadata in Action' : 'अन्नदाता एक्शन में'}
              <br />
              <span className="text-[#1B5E20] dark:text-[#FBC02D]">
                {language === 'en' ? 'Real Farmers, Real Communities' : 'वास्तविक किसान, वास्तविक समुदाय'}
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'See how Annadata is making a difference in rural communities across India. Our team conducts on-ground demonstrations to empower farmers with smart agriculture technology.'
                : 'देखें कि अन्नदाता भारत भर के ग्रामीण समुदायों में कैसे बदलाव ला रहा है। हमारी टीम किसानों को स्मार्ट कृषि प्रौद्योगिकी से सशक्त बनाने के लिए जमीनी स्तर पर प्रदर्शन आयोजित करती है।'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Demo Image 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible['watch-demo'] ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group overflow-hidden rounded-2xl shadow-2xl"
            >
              <img 
                src={communityDemo1}
                alt="Community demonstration session"
                className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'en' ? 'Community Training Sessions' : 'सामुदायिक प्रशिक्षण सत्र'}
                </h3>
                <p className="text-white/90 mb-4">
                  {language === 'en' 
                    ? 'Our experts conduct hands-on training sessions in villages, teaching farmers how to use Annadata\'s AI-powered features for better crop planning and management.'
                    : 'हमारे विशेषज्ञ गांवों में व्यावहारिक प्रशिक्षण सत्र आयोजित करते हैं, किसानों को बेहतर फसल योजना और प्रबंधन के लिए अन्नदाता की AI-संचालित सुविधाओं का उपयोग करना सिखाते हैं।'}
                </p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-[#FBC02D] text-black">
                    <Users className="w-3 h-3 mr-1" />
                    {language === 'en' ? '500+ Villages' : '500+ गांव'}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Target className="w-3 h-3 mr-1" />
                    {language === 'en' ? '10,000+ Farmers Trained' : '10,000+ किसान प्रशिक्षित'}
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Demo Image 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible['watch-demo'] ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group overflow-hidden rounded-2xl shadow-2xl"
            >
              <img 
                src={communityDemo2}
                alt="Field demonstration with farmers"
                className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'en' ? 'On-Ground Support & Guidance' : 'जमीनी स्तर पर समर्थन और मार्गदर्शन'}
                </h3>
                <p className="text-white/90 mb-4">
                  {language === 'en' 
                    ? 'We believe in personal touch. Our field teams work directly with farming communities, demonstrating real-time crop recommendations, soil testing, and pest detection features.'
                    : 'हम व्यक्तिगत स्पर्श में विश्वास करते हैं। हमारी फील्ड टीमें सीधे कृषि समुदायों के साथ काम करती हैं, रीयल-टाइम फसल की सिफारिशें, मिट्टी परीक्षण और कीट पहचान सुविधाओं का प्रदर्शन करती हैं।'}
                </p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-[#FBC02D] text-black">
                    <Award className="w-3 h-3 mr-1" />
                    {language === 'en' ? '95% Success Rate' : '95% सफलता दर'}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Leaf className="w-3 h-3 mr-1" />
                    {language === 'en' ? 'Sustainable Farming' : 'टिकाऊ खेती'}
                  </Badge>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible['watch-demo'] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-gray-800 dark:to-gray-700">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Direct Community Engagement' : 'प्रत्यक्ष सामुदायिक जुड़ाव'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' 
                    ? 'Face-to-face training sessions ensuring every farmer understands and benefits from our technology'
                    : 'आमने-सामने प्रशिक्षण सत्र यह सुनिश्चित करते हैं कि हर किसान हमारी तकनीक को समझे और उससे लाभान्वित हो'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 dark:from-gray-800 dark:to-gray-700">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#FBC02D] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-black" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Simplified Technology' : 'सरलीकृत प्रौद्योगिकी'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' 
                    ? 'Designed for ease of use, even for farmers with limited digital literacy'
                    : 'सीमित डिजिटल साक्षरता वाले किसानों के लिए भी उपयोग में आसान बनाया गया है'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-gray-800 dark:to-gray-700">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Continuous Support' : 'निरंतर समर्थन'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' 
                    ? '24/7 helpline and regular field visits to ensure farmers get ongoing assistance'
                    : '24/7 हेल्पलाइन और नियमित फील्ड विजिट यह सुनिश्चित करने के लिए कि किसानों को निरंतर सहायता मिले'}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible['watch-demo'] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] hover:from-[#2E7D32] hover:to-[#388E3C] text-white text-lg px-8 py-6 shadow-xl"
              onClick={() => setShowLoginSignup(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Join Our Community' : 'हमारे समुदाय में शामिल हों'}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-[#F1F8E9] to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.testimonials ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-600 border-green-200">
              <Star className="w-4 h-4 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by <span className="text-[#1B5E20] dark:text-[#FBC02D]">10,000+</span> Farmers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real farmers, real results. See how Annadata is transforming lives across India.
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 max-w-4xl mx-auto">
                      <CardContent className="p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                          <div className="text-center md:text-left">
                            <div className="flex justify-center md:justify-start mb-4">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-[#FBC02D] text-[#FBC02D]" />
                              ))}
                            </div>
                            
                            <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 italic">
                              "{testimonial.quote}"
                            </blockquote>
                            
                            <div className="flex items-center justify-center md:justify-start gap-4">
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full object-cover border-4 border-[#FBC02D]"
                              />
                              <div className="text-left">
                                <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                                <p className="text-gray-600 dark:text-gray-300">{testimonial.location}</p>
                                <div className="flex gap-2 mt-1">
                                  <Badge className="bg-[#1B5E20] text-white text-xs">
                                    {testimonial.crop}
                                  </Badge>
                                  <Badge className="bg-green-100 text-green-600 text-xs">
                                    {testimonial.improvement}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="relative">
                            <img
                              src={testimonial.cropImage}
                              alt={`${testimonial.crop} farming`}
                              className="w-full h-64 object-cover rounded-xl"
                            />
                            <div className="absolute top-4 right-4 bg-[#FBC02D] text-black p-2 rounded-lg font-bold">
                              {testimonial.improvement}
                            </div>
                            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg">
                              {testimonial.crop} {language === 'en' ? 'Farming' : 'खेती'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setActiveTestimonial(Math.max(0, activeTestimonial - 1))}
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                disabled={activeTestimonial === 0}
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeTestimonial ? 'bg-[#1B5E20]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setActiveTestimonial(Math.min(testimonials.length - 1, activeTestimonial + 1))}
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                disabled={activeTestimonial === testimonials.length - 1}
              >
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <GetInTouch language={language} isVisible={isVisible.contact} />

      {/* Impact Metrics */}
      <section id="metrics" className="py-20 bg-[#1B5E20] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] opacity-90"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#FBC02D]/10 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.metrics ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#FBC02D] text-black">
              <BarChart3 className="w-4 h-4 mr-2" />
              Impact Metrics
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Numbers That <span className="text-[#FBC02D]">Speak</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our AI-powered platform is making a real difference in farmers' lives across India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MapPin,
                number: 5000,
                suffix: "+",
                label: "Villages Reached",
                description: "Across 28 states"
              },
              {
                icon: Wheat,
                number: 1200000,
                suffix: "+",
                label: "Crops Recommended", 
                description: "With 96% accuracy"
              },
              {
                icon: TrendingUp,
                number: 35,
                suffix: "%",
                label: "Avg Income Increase",
                description: "For our farmers"
              },
              {
                icon: Users,
                number: 50000,
                suffix: "+",
                label: "Active Farmers",
                description: "Trust our platform"
              }
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isVisible.metrics ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-[#FBC02D] rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-black" />
                      </div>
                      
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                        <AnimatedCounter end={metric.number} />
                        <span className="text-[#FBC02D]">{metric.suffix}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">{metric.label}</h3>
                      <p className="text-white/70">{metric.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1713959989861-2425c95e9777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGFncmljdWx0dXJhbCUyMGZpZWxkJTIwc3VucmlzZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTkwODY5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Farm Field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/95 via-[#1B5E20]/80 to-[#1B5E20]/95"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-[#FBC02D] text-black text-lg px-6 py-2">
              <Rocket className="w-5 h-5 mr-2" />
              Join the Agricultural Revolution
            </Badge>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to <span className="text-[#FBC02D]">Farm Smarter?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto">
              Join thousands of farmers who are already using AI to increase yields, reduce costs, and secure their future. Start your journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-[#FBC02D] hover:bg-[#F9A825] text-black text-xl px-12 py-6 shadow-2xl hover:shadow-3xl transition-all"
                onClick={() => setShowLoginSignup(true)}
              >
                <Wheat className="w-6 h-6 mr-3" />
                Get Started Free
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1B5E20] text-xl px-12 py-6">
                <Phone className="w-6 h-6 mr-3" />
                Book a Demo
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { icon: Shield, text: "100% Secure" },
                { icon: Smartphone, text: "Mobile Ready" },
                { icon: Globe, text: "Multi-language" },
                { icon: Award, text: "Expert Support" }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <Icon className="w-8 h-8 text-[#FBC02D]" />
                    <span className="text-white/80 text-sm">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src={annadataLogo} 
                  alt="Annadata Logo" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-xl font-bold">Annadata</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering farmers with AI-driven insights for better yields and sustainable agriculture.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Crop Recommendations</li>
                <li>Market Rates</li>
                <li>Weather Forecasts</li>
                <li>Soil Analysis</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Expert Consultation</li>
                <li>Training Videos</li>
                <li>Community Forum</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@annadata.com</li>
                <li>+91 9999-888-777</li>
                <li>New Delhi, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Annadata. All rights reserved. Made with <Leaf className="w-4 h-4 mx-1 inline text-green-500" /> for farmers.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Widget */}
      <ChatbotWidget />

      {/* Login/Signup Modal */}
      <AnimatePresence>
        {showLoginSignup && (
          <LoginSignup
            isOpen={showLoginSignup}
            onClose={() => {
              setShowLoginSignup(false);
              setSelectedRole(undefined);
            }}
            language={language}
            onLanguageToggle={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            defaultRole={selectedRole}
            onLogin={handleLogin}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
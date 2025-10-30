import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Mail, Lock, User, Eye, EyeOff, Smartphone, 
  ArrowRight, CheckCircle, Wheat, Globe, MapPin
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import annadataLogo from 'figma:asset/092c2cf26050eefa770d1845ea58caecf68fa85f.png';

interface LoginSignupProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
  onLanguageToggle: () => void;
  defaultRole?: 'farmer' | 'vendor' | 'consumer';
  onLogin?: (role: 'farmer' | 'vendor' | 'consumer', name: string) => void;
}

const LoginSignup: React.FC<LoginSignupProps> = ({ 
  isOpen, 
  onClose, 
  language, 
  onLanguageToggle,
  defaultRole,
  onLogin
}) => {
  const [isLogin, setIsLogin] = useState(!defaultRole); // If defaultRole is provided, show signup form
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    location: '',
    role: defaultRole || 'farmer'
  });

  const text = {
    en: {
      login: "Login",
      signup: "Sign Up",
      welcome: "Welcome Back!",
      newHere: "New to Annadata?",
      joinTitle: "Join Annadata Family",
      alreadyMember: "Already a member?",
      email: "Email Address",
      password: "Password",
      name: "Full Name",
      phone: "Phone Number",
      location: "Location (State/District)",
      role: "I am a",
      farmer: "Farmer",
      vendor: "Vendor",
      consumer: "Consumer",
      forgotPassword: "Forgot Password?",
      loginButton: "Login to Dashboard",
      signupButton: "Create Account",
      or: "or",
      continueWith: "Continue with",
      google: "Google",
      benefits: {
        title: "Why Join Annadata?",
        items: [
          "AI-powered crop recommendations",
          "Real-time market prices",
          "Weather alerts & forecasts",
          "Expert agricultural guidance"
        ]
      },
      terms: "By signing up, you agree to our Terms of Service and Privacy Policy"
    },
    hi: {
      login: "लॉगिन",
      signup: "साइन अप",
      welcome: "वापस स्वागत है!",
      newHere: "अन्नदाता में नए हैं?",
      joinTitle: "अन्नदाता परिवार में शामिल हों",
      alreadyMember: "पहले से सदस्य हैं?",
      email: "ईमेल पता",
      password: "पासवर्ड",
      name: "पूरा नाम",
      phone: "फोन नंबर",
      location: "स्थान (राज्य/जिला)",
      role: "मैं हूँ",
      farmer: "किसान",
      vendor: "विक्रेता",
      consumer: "उपभोक्ता",
      forgotPassword: "पासवर्ड भूल गए?",
      loginButton: "डैशबोर्ड में लॉगिन करें",
      signupButton: "खाता बनाएं",
      or: "या",
      continueWith: "जारी रखें",
      google: "गूगल",
      benefits: {
        title: "अन्नदाता क्यों चुनें?",
        items: [
          "AI-संचालित फसल सुझाव",
          "वास्तविक समय बाजार मूल्य",
          "मौसम चेतावनी और पूर्वानुमान",
          "विशेषज्ञ कृषि मार्गदर्शन"
        ]
      },
      terms: "साइन अप करके, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत हैं"
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { isLogin, formData });
    
    // Call onLogin callback with role and name
    if (onLogin) {
      const userName = formData.name || (language === 'hi' ? 'किसान' : 'Farmer');
      onLogin(formData.role as 'farmer' | 'vendor' | 'consumer', userName);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Left Side - Benefits/Images */}
          <div className="relative bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] text-white p-6 flex flex-col justify-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <img 
                src="https://images.unsplash.com/photo-1696219364443-0a34143c7cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXQlMjBwcm9kdWNlfGVufDF8fHx8MTc1OTA3NjA5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fresh Produce"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-20 right-20 w-16 h-16 bg-[#FBC02D]/20 rounded-full"
              animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={annadataLogo} 
                  alt="Annadata Logo" 
                  className="w-10 h-10 rounded-full border-2 border-[#FBC02D]"
                />
                <div>
                  <h1 className="text-xl font-bold">Annadata</h1>
                  <p className="text-white/80 text-xs">Smart Agriculture Platform</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">{text[language].benefits.title}</h2>
                <div className="space-y-3">
                  {text[language].benefits.items.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <div className="w-6 h-6 bg-[#FBC02D] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-black" />
                      </div>
                      <p className="text-white/90 text-sm">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: User, number: "50K+", label: "Farmers" },
                  { icon: Wheat, number: "1.2M+", label: "Crops" },
                  { icon: MapPin, number: "5K+", label: "Villages" }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="text-sm font-bold">{stat.number}</p>
                      <p className="text-white/70 text-xs">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6 flex flex-col justify-center">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLogin ? text[language].welcome : text[language].joinTitle}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isLogin ? text[language].newHere : text[language].alreadyMember}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-[#1B5E20] font-medium hover:underline"
                  >
                    {isLogin ? text[language].signup : text[language].login}
                  </button>
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={onLanguageToggle}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Globe className="w-4 h-4" />
                  {language.toUpperCase()}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {text[language].name}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-12 h-10 border-gray-300 focus:border-[#1B5E20] focus:ring-[#1B5E20]"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {text[language].phone}
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-12 h-10 border-gray-300 focus:border-[#1B5E20] focus:ring-[#1B5E20]"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {text[language].location}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="pl-12 h-10 border-gray-300 focus:border-[#1B5E20] focus:ring-[#1B5E20]"
                          placeholder="e.g., Punjab"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {text[language].role}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['farmer', 'vendor', 'consumer'].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => handleInputChange('role', role)}
                          className={`p-2 border-2 rounded-lg text-xs font-medium transition-all ${
                            formData.role === role
                              ? 'border-[#1B5E20] bg-[#1B5E20] text-white'
                              : 'border-gray-300 text-gray-700 hover:border-[#1B5E20]'
                          }`}
                        >
                          {text[language][role as keyof typeof text.en]}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {text[language].email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-12 h-10 border-gray-300 focus:border-[#1B5E20] focus:ring-[#1B5E20]"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {text[language].password}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-12 pr-12 h-10 border-gray-300 focus:border-[#1B5E20] focus:ring-[#1B5E20]"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-[#1B5E20] hover:underline"
                  >
                    {text[language].forgotPassword}
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-10 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] hover:from-[#2E7D32] hover:to-[#1B5E20] text-white font-semibold"
              >
                {isLogin ? text[language].loginButton : text[language].signupButton}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <div className="text-center">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-gray-500 text-sm">{text[language].or}</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div className="space-y-2">
                  {isLogin && (
                    <>
                      <Button
                        type="button"
                        onClick={() => {
                          // Demo login as farmer
                          if (onLogin) {
                            onLogin('farmer', language === 'hi' ? 'राजेश कुमार (डेमो)' : 'Rajesh Kumar (Demo)');
                          }
                          onClose();
                        }}
                        className="w-full h-10 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Wheat className="w-4 h-4 mr-2" />
                        {language === 'hi' ? 'किसान के रूप में लॉगिन' : 'Login as Farmer'}
                      </Button>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          onClick={() => {
                            // Demo login as vendor
                            if (onLogin) {
                              onLogin('vendor', language === 'hi' ? 'अमित पटेल (डेमो)' : 'Amit Patel (Demo)');
                            }
                            onClose();
                          }}
                          variant="outline"
                          className="h-10 border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                        >
                          {language === 'hi' ? 'विक्रेता' : 'Vendor'}
                        </Button>

                        <Button
                          type="button"
                          onClick={() => {
                            // Demo login as consumer
                            if (onLogin) {
                              onLogin('consumer', language === 'hi' ? 'प्रिया शर्मा (डेमो)' : 'Priya Sharma (Demo)');
                            }
                            onClose();
                          }}
                          variant="outline"
                          className="h-10 border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          {language === 'hi' ? 'उपभोक्ता' : 'Consumer'}
                        </Button>
                      </div>
                    </>
                  )}

                  {!isLogin && (
                    <Button
                      type="button"
                      onClick={() => {
                        // Demo login as farmer
                        if (onLogin) {
                          onLogin('farmer', language === 'hi' ? 'राजेश कुमार (डेमो)' : 'Rajesh Kumar (Demo)');
                        }
                        onClose();
                      }}
                      className="w-full h-10 bg-[#FBC02D] hover:bg-yellow-400 text-[#1B5E20]"
                    >
                      <Wheat className="w-4 h-4 mr-2" />
                      {language === 'hi' ? 'डेमो दें' : 'Try Demo'}
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-10 border-2 border-gray-300 hover:border-[#1B5E20] text-gray-700"
                  >
                    <img 
                      src="https://developers.google.com/identity/images/g-logo.png" 
                      alt="Google" 
                      className="w-4 h-4 mr-2"
                    />
                    {text[language].continueWith} {text[language].google}
                  </Button>
                </div>
              </div>

              {!isLogin && (
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  {text[language].terms}
                </p>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginSignup;
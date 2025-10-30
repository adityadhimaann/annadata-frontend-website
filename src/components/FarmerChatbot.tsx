import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, Loader2, Bot, User, Globe, Trash2, Camera, Sparkles, Phone, Video, Image as ImageIcon, FileText, TrendingUp, Sun, Cloud, Droplet, Leaf, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface FarmerChatbotProps {
  language: 'en' | 'hi';
  isDarkMode: boolean;
  onBack?: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'weather' | 'price';
  data?: any;
}

interface QuickAction {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  labelHi: string;
  color: string;
  action: string;
}

export default function FarmerChatbot({ language, isDarkMode, onBack }: FarmerChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'hi' 
        ? '🙏 नमस्ते! मै��� कृषिका हूं, आपकी AI कृषि सहायक। मैं आपकी खेती में मदद करने के लिए यहां हूं। आप मुझसे कुछ भी पूछ सकते हैं!'
        : '👋 Hello! I\'m Krishika, your AI farming assistant. I\'m here to help you with all your farming needs. Feel free to ask me anything!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const text = {
    en: {
      title: 'AI Assistant Krishika',
      subtitle: 'Your 24/7 Farming Expert',
      placeholder: 'Ask me anything about farming...',
      listening: 'Listening...',
      speaking: 'Speaking...',
      send: 'Send',
      clearChat: 'Clear Chat',
      voiceInput: 'Voice Input',
      voiceOutput: 'Voice Output',
      quickHelp: 'Quick Help',
      weather: 'Weather',
      prices: 'Market Prices',
      diseases: 'Crop Diseases',
      fertilizers: 'Fertilizers',
      irrigation: 'Irrigation',
      schemes: 'Govt Schemes',
      pestControl: 'Pest Control',
      soilHealth: 'Soil Health',
    },
    hi: {
      title: 'AI सहायक कृषिका',
      subtitle: 'आपका 24/7 कृषि विशेषज्ञ',
      placeholder: 'खेती के बारे में कुछ भी पूछें...',
      listening: 'सुन रहा हूं...',
      speaking: 'बोल रहा हूं...',
      send: 'भेजें',
      clearChat: 'चैट साफ करें',
      voiceInput: 'आवाज इनपुट',
      voiceOutput: 'आवाज आउटपुट',
      quickHelp: 'त्वरित सहायता',
      weather: 'मौसम',
      prices: 'बाजार भाव',
      diseases: 'फसल रोग',
      fertilizers: 'उर्वरक',
      irrigation: 'सिंचाई',
      schemes: 'सरकारी योजनाएं',
      pestControl: 'कीट नियंत्रण',
      soilHealth: 'मिट्टी स्वास्थ्य',
    },
  };

  const chatSuggestions = [
    { id: 'weather', icon: Cloud, label: 'Weather Update', labelHi: 'मौस�� अपडेट', action: 'What is today\'s weather forecast?' },
    { id: 'prices', icon: TrendingUp, label: 'Market Prices', labelHi: 'बाजार भाव', action: 'Show me current crop prices' },
    { id: 'diseases', icon: AlertCircle, label: 'Crop Diseases', labelHi: 'फसल रोग', action: 'Help me identify crop diseases' },
    { id: 'fertilizers', icon: Droplet, label: 'Fertilizer Guide', labelHi: 'उर्वरक गाइड', action: 'What fertilizers should I use?' },
    { id: 'irrigation', icon: Droplet, label: 'Irrigation Tips', labelHi: 'सिंचाई टिप्स', action: 'Give me irrigation advice' },
    { id: 'schemes', icon: FileText, label: 'Govt Schemes', labelHi: 'सरकारी योजनाएं', action: 'Tell me about government schemes' },
  ];

  const knowledgeBase: { [key: string]: { en: string; hi: string } } = {
    'pest': {
      en: '🐛 **Pest Control Guide:**\n\n1. **Preventive Measures:**\n   - Rotate crops regularly\n   - Use disease-resistant varieties\n   - Maintain proper spacing\n\n2. **Organic Solutions:**\n   - Neem oil spray\n   - Garlic-chili spray\n   - Cow urine mixture\n\n3. **Chemical Control:**\n   - Use only when necessary\n   - Follow recommended dosage\n   - Maintain safety period before harvest',
      hi: '🐛 **कीट नियंत्रण गाइड:**\n\n1. **निवारक उपाय:**\n   - फसल चक्र अपनाएं\n   - रोग प्रतिरोधी किस्मों का उपयोग करें\n   - उचित दूरी बनाए रखें\n\n2. **जैविक समाधान:**\n   - नीम तेल स्प्रे\n   - लहसुन-मिर्च स्प्रे\n   - गोमूत्र मिश्रण\n\n3. **रासायनिक नियंत्रण:**\n   - केवल आवश्यक होने पर उपयोग करें\n   - अनुशंसित खुराक का पालन करें\n   - कटाई से पहले सुरक्षा अवधि बनाए रखें'
    },
    'fertilizer': {
      en: '🌱 **Fertilizer Recommendations:**\n\n**NPK Requirements:**\n- Nitrogen (N): For leaf growth\n- Phosphorus (P): For root development\n- Potassium (K): For disease resistance\n\n**Application Tips:**\n- Apply in split doses\n- Water immediately after application\n- Avoid over-fertilization\n- Use organic manure for best results',
      hi: '🌱 **उर्वरक सिफारिशें:**\n\n**एनपीके आवश्यकताएं:**\n- नाइट्रोजन (N): पत्ती वृद्धि के लिए\n- फास्फोरस (P): जड़ विकास के लिए\n- पोटेशियम (K): रोग प्रतिरोध के लिए\n\n**आवेदन सुझाव:**\n- विभाजित खुराक में लागू करें\n- आवेदन के तुरंत बाद पानी दें\n- अधिक उर्वरक से बचें\n- सर्वोत्तम परिणामों के लिए जैविक खाद का उपयोग करें'
    },
    'weather': {
      en: '☀️ **Today\'s Weather Forecast:**\n\n📍 Location: Your Region\n🌡️ Temperature: 28°C - 34°C\n💧 Humidity: 65%\n☁️ Conditions: Partly Cloudy\n💨 Wind: 12 km/h\n\n**Farming Advice:**\n- Good day for spraying pesticides\n- Ensure adequate irrigation\n- Monitor for pest activity',
      hi: '☀️ **आज का मौसम पूर्वानुमान:**\n\n📍 स्थान: आपक�� क्षेत्र\n🌡️ तापमान: 28°C - 34°C\n💧 आर्द्रता: 65%\n☁️ स्थिति: आंशिक रूप से बादल छाए हुए\n💨 हवा: 12 किमी/घंटा\n\n**कृषि सलाह:**\n- कीटनाशक छिड़काव के लिए अच्छा दिन\n- पर्याप्त सिंचाई सुनिश्चित करें\n- कीट गतिविधि की निगरानी करें'
    },
    'irrigation': {
      en: '💧 **Irrigation Best Practices:**\n\n1. **Timing:**\n   - Early morning (5-8 AM)\n   - Late evening (5-7 PM)\n\n2. **Methods:**\n   - Drip irrigation (90% efficient)\n   - Sprinkler (70% efficient)\n   - Flood irrigation (40% efficient)\n\n3. **Water Management:**\n   - Check soil moisture regularly\n   - Avoid over-watering\n   - Use mulching to retain moisture',
      hi: '💧 **सिंचाई सर्वोत्तम प्रथाएं:**\n\n1. **समय:**\n   - सुबह जल्दी (5-8 AM)\n   - देर शाम (5-7 PM)\n\n2. **तरीके:**\n   - ड्रिप सिंचाई (90% कुशल)\n   - स्प्रिंकलर (70% कुशल)\n   - बाढ़ सिंचाई (40% कुशल)\n\n3. **जल प्रबंधन:**\n   - मिट्टी की नमी नियमित रूप से जांचें\n   - अधिक पानी देने से बचें\n   - नमी बनाए रखने के लिए मल्चिंग का उपयोग करें'
    },
    'price': {
      en: '💰 **Current Market Prices:**\n\n🌾 **Wheat:** ₹2,150/quintal\n🌾 **Rice:** ₹1,940/quintal\n🌱 **Soybean:** ₹4,200/quintal\n🥔 **Potato:** ₹1,200/quintal\n🧅 **Onion:** ₹1,800/quintal\n🌽 **Maize:** ₹1,850/quintal\n\n📈 **Market Trend:** Prices are stable with slight upward movement expected.',
      hi: '💰 **वर्तमान बाजार भाव:**\n\n🌾 **गेहूं:** ₹2,150/क्विंटल\n🌾 **चावल:** ₹1,940/क्विंटल\n🌱 **सोयाबीन:** ₹4,200/क्विंटल\n🥔 **आलू:** ₹1,200/क्विंटल\n🧅 **प्याज:** ₹1,800/क्विंटल\n🌽 **मक्का:** ₹1,850/क्विंटल\n\n📈 **बाजार प्रवृत्ति:** कीमतें स्थिर हैं और थोड़ी ऊपर की ओर बढ़ने की उम्मीद है।'
    },
    'scheme': {
      en: '🏛️ **Government Schemes for Farmers:**\n\n1. **PM-KISAN:**\n   - ₹6,000/year direct benefit transfer\n   - For all landholding farmers\n\n2. **Kisan Credit Card (KCC):**\n   - Easy credit access\n   - Low interest rates\n\n3. **PMFBY (Crop Insurance):**\n   - Premium: 1.5-2% of sum insured\n   - Covers natural calamities\n\n4. **Soil Health Card Scheme:**\n   - Free soil testing\n   - Nutrient recommendations',
      hi: '🏛️ **किसानों के लिए सरकारी योजनाएं:**\n\n1. **पीएम-किसान:**\n   - ₹6,000/वर्ष सीधा लाभ हस्तांतरण\n   - सभी भूमि धारक किसानों के लिए\n\n2. **किसान क्रेडिट कार्ड (KCC):**\n   - आसान ऋण पहुंच\n   - कम ब्याज दरें\n\n3. **पीएमएफबीवाई (फसल बीमा):**\n   - प्रीमियम: बीमित राशि का 1.5-2%\n   - प्राकृतिक आपदाओं को कवर करता है\n\n4. **मृदा स्वास्थ्य कार्ड योजना:**\n   - मुफ्त मिट्टी परीक्षण\n   - पोषक तत्व सिफारिशें'
    },
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setShowSuggestions(false);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateResponse(textToSend);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);

      if (voiceEnabled) {
        speakText(botResponse);
      }
    }, 1000);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('pest') || lowerInput.includes('कीट') || lowerInput.includes('insect')) {
      return knowledgeBase['pest'][language];
    } else if (lowerInput.includes('fertilizer') || lowerInput.includes('उर्वरक') || lowerInput.includes('npk')) {
      return knowledgeBase['fertilizer'][language];
    } else if (lowerInput.includes('weather') || lowerInput.includes('मौसम') || lowerInput.includes('temperature')) {
      return knowledgeBase['weather'][language];
    } else if (lowerInput.includes('irrigation') || lowerInput.includes('सिंचाई') || lowerInput.includes('water')) {
      return knowledgeBase['irrigation'][language];
    } else if (lowerInput.includes('price') || lowerInput.includes('भाव') || lowerInput.includes('market') || lowerInput.includes('बाजार')) {
      return knowledgeBase['price'][language];
    } else if (lowerInput.includes('scheme') || lowerInput.includes('योजना') || lowerInput.includes('government') || lowerInput.includes('सरकार')) {
      return knowledgeBase['scheme'][language];
    } else {
      return language === 'hi'
        ? '🙏 धन्यवाद! मैं आपकी मदद करने के लिए यहां हूं। कृपया और विवरण दें या ऊपर दिए गए त्वरित विकल्पों में से चुनें।'
        : '👍 Thank you! I\'m here to help. Please provide more details or choose from the quick options above.';
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate speech recognition
      setTimeout(() => {
        setIsListening(false);
        const sampleQuery = language === 'hi' ? 'मुझे कीट नियंत्रण के बारे में बताएं' : 'Tell me about pest control';
        setInputText(sampleQuery);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    setIsSpeaking(true);
    // Simulate text-to-speech
    setTimeout(() => {
      setIsSpeaking(false);
    }, 3000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        text: language === 'hi' 
          ? '🙏 नमस्ते! मैं कृषिका हूं, आपकी AI कृषि सहायक। मैं आपकी खेती में मदद करने के लिए यहां हूं। आप मुझसे कुछ भी पूछ सकते हैं!'
          : '👋 Hello! I\'m Krishika, your AI farming assistant. I\'m here to help you with all your farming needs. Feel free to ask me anything!',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  const handleSuggestionClick = (action: string) => {
    handleSendMessage(action);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-green-950 to-gray-900' : 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-50'} relative overflow-hidden`}>
      {/* Animated Background Elements - Agricultural Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-lime-500/10 to-green-500/10 rounded-full blur-3xl"
        />
        {/* Leaf patterns */}
        <div className="absolute top-10 left-10 text-green-500/5 text-9xl">🌿</div>
        <div className="absolute bottom-20 right-20 text-green-500/5 text-9xl">🌾</div>
        <div className="absolute top-1/2 right-10 text-green-500/5 text-9xl">🍃</div>
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Compact Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`${isDarkMode ? 'bg-gradient-to-r from-green-900/90 to-emerald-900/90' : 'bg-gradient-to-r from-green-600 to-emerald-600'} backdrop-blur-xl shadow-lg`}
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {onBack && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBack}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                    title="Back to Dashboard"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>
                )}
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/30">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
                </motion.div>
                <div>
                  <h1 className="text-lg md:text-xl text-white">
                    {text[language].title}
                  </h1>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                    {text[language].subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearChat}
                  className="hover:bg-white/10 text-white h-8 w-8 p-0"
                  title={text[language].clearChat}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-4 py-6">
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Chat Suggestions - Show at start */}
              {showSuggestions && messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <p className={`text-sm mb-3 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'hi' ? '💡 मुझसे पूछें:' : '💡 Ask me about:'}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {chatSuggestions.map((suggestion, index) => {
                      const Icon = suggestion.icon;
                      return (
                        <motion.button
                          key={suggestion.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleSuggestionClick(suggestion.action)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-green-900/20 border-green-700/50 hover:border-green-600 hover:bg-green-900/30 text-white' 
                              : 'bg-white border-green-200 hover:border-green-400 hover:shadow-md text-gray-900'
                          }`}
                        >
                          <Icon className={`w-5 h-5 mx-auto mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                          <span className="text-xs block">{language === 'hi' ? suggestion.labelHi : suggestion.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                          isDarkMode 
                            ? 'bg-gradient-to-br from-green-700 to-emerald-700' 
                            : 'bg-gradient-to-br from-green-500 to-emerald-500'
                        }`}>
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}

                    <div className={`max-w-[80%] md:max-w-[70%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`rounded-2xl px-5 py-3 shadow-lg ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-tr-sm'
                            : isDarkMode
                            ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 text-white rounded-tl-sm border border-green-700/50 backdrop-blur-sm'
                            : 'bg-white text-gray-900 rounded-tl-sm border-2 border-green-100 shadow-green-100/50'
                        }`}
                      >
                        <p className="text-sm md:text-base whitespace-pre-line leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : isDarkMode ? 'text-green-400/70' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </motion.div>
                      
                      {message.sender === 'bot' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakText(message.text)}
                          className={`mt-2 ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'}`}
                        >
                          {isSpeaking ? <VolumeX className="w-4 h-4 mr-1" /> : <Volume2 className="w-4 h-4 mr-1" />}
                          <span className="text-xs">{language === 'hi' ? 'सुनें' : 'Listen'}</span>
                        </Button>
                      )}
                    </div>

                    {message.sender === 'user' && (
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-green-700 to-emerald-700' 
                      : 'bg-gradient-to-br from-green-500 to-emerald-500'
                  }`}>
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className={`${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50 backdrop-blur-sm' 
                      : 'bg-white border-2 border-green-100'
                  } rounded-2xl px-5 py-3 shadow-lg rounded-tl-sm`}>
                    <div className="flex gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-500'}`}
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`}
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-500'}`}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`${
            isDarkMode 
              ? 'bg-gradient-to-r from-green-900/90 to-emerald-900/90' 
              : 'bg-gradient-to-r from-green-50 to-emerald-50'
          } backdrop-blur-xl border-t ${isDarkMode ? 'border-green-800' : 'border-green-200'} shadow-2xl`}
        >
          <div className="max-w-4xl mx-auto px-4 py-4">
            {/* Voice Status - Only for Listening */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Mic className="w-5 h-5" />
                    </motion.div>
                    <span className="font-medium">{text[language].listening}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-end gap-3">
              {/* Voice Input Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleListening}
                className={`flex-shrink-0 p-4 rounded-xl transition-all shadow-lg ${
                  isListening
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={text[language].voiceInput}
              >
                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </motion.button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={text[language].placeholder}
                  className={`min-h-[56px] max-h-[120px] pr-24 text-base resize-none ${
                    isDarkMode 
                      ? 'bg-green-950/50 border-green-700 text-white placeholder:text-green-400/50' 
                      : 'bg-white border-green-300 text-gray-900 placeholder:text-gray-500'
                  } rounded-xl shadow-inner`}
                  rows={1}
                />
              </div>

              {/* Send Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className={`flex-shrink-0 p-4 rounded-xl shadow-lg transition-all ${
                  inputText.trim()
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:from-green-700 hover:to-emerald-700'
                    : isDarkMode
                    ? 'bg-green-950/30 text-green-800 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                title={text[language].send}
              >
                <Send className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Voice Toggle Info */}
            <div className="mt-2 flex items-center justify-center gap-2">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  voiceEnabled
                    ? isDarkMode
                      ? 'bg-green-900/30 text-green-400 border border-green-700'
                      : 'bg-green-100 text-green-700 border border-green-300'
                    : isDarkMode
                    ? 'bg-green-950/20 text-green-700 border border-green-900'
                    : 'bg-gray-100 text-gray-500 border border-gray-300'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                <span>{text[language].voiceOutput}: {voiceEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

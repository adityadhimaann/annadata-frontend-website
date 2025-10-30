import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, Mail, MessageCircle, Send, MapPin, Clock,
  Facebook, Twitter, Instagram, ArrowRight, Users
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import contactBg from 'figma:asset/72884f5eb00bd6334fd7142739427ec2eb309bc4.png';

interface GetInTouchProps {
  language: 'en' | 'hi';
  isVisible: boolean;
}

const GetInTouch: React.FC<GetInTouchProps> = ({ language, isVisible }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const text = {
    en: {
      title: "Get In Touch",
      subtitle: "Have questions or feedback? We'd love to hear from you!",
      contactInfo: "Contact Information",
      phone: "Phone",
      email: "Email",
      socialMedia: "Social Media",
      yourName: "Your Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number (Optional)",
      yourMessage: "Your Message",
      sendMessage: "Send Message",
      namePlaceholder: "John Doe",
      emailPlaceholder: "john@example.com",
      phonePlaceholder: "+91 98765 43210",
      messagePlaceholder: "How can we help you?",
      officeHours: "Office Hours",
      mondayFriday: "Monday - Friday: 9:00 AM - 6:00 PM",
      saturday: "Saturday: 10:00 AM - 4:00 PM",
      responseTime: "We typically respond within 24 hours",
      ourTeam: "Our Team",
      teamSubtitle: "Meet the passionate team behind Annadata"
    },
    hi: {
      title: "संपर्क करें",
      subtitle: "कोई प्रश्न या सुझाव है? हमें आपसे सुनना अच्छा लगेगा!",
      contactInfo: "संपर्क जानकारी",
      phone: "फोन",
      email: "ईमेल",
      socialMedia: "सोशल मीडिया",
      yourName: "आपका नाम",
      emailAddress: "ईमेल पता",
      phoneNumber: "फोन नंबर (वैकल्पिक)",
      yourMessage: "आपका संदेश",
      sendMessage: "संदेश भेजें",
      namePlaceholder: "जॉन डो",
      emailPlaceholder: "john@example.com",
      phonePlaceholder: "+91 98765 43210",
      messagePlaceholder: "हम आपकी कैसे मदद कर सकते हैं?",
      officeHours: "कार्यालय समय",
      mondayFriday: "सोमवार - शुक्रवार: सुबह 9:00 - शाम 6:00",
      saturday: "शनिवार: सुबह 10:00 - दोपहर 4:00",
      responseTime: "हम आमतौर पर 24 घंटे के भीतर जवाब देते हैं",
      ourTeam: "हमारी टीम",
      teamSubtitle: "अन्नदाता के पीछे की भावुक टीम से मिलें"
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const contactMethods = [
    {
      icon: Phone,
      title: text[language].phone,
      details: ["+91 98765 43210", "+91 98765 43211"]
    },
    {
      icon: Mail,
      title: text[language].email,
      details: ["info@annadata.com", "support@annadata.com"]
    },
    {
      icon: MessageCircle,
      title: text[language].socialMedia,
      details: ["Facebook", "Twitter", "Instagram"]
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={contactBg}
          alt="Agricultural Field"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/95 via-[#1B5E20]/85 to-[#1B5E20]/95"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {text[language].title}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {text[language].subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {text[language].contactInfo}
              </h3>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 transition-colors hover:bg-white/30">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">{method.title}</h4>
                        <div className="space-y-1">
                          {method.details.map((detail, idx) => (
                            <p key={idx} className="text-white/80">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-6 border-t border-white/20"
            >
              <h4 className="font-semibold text-white mb-4">{text[language].socialMedia}</h4>
              <div className="flex items-center gap-4">
                {[
                  { icon: Facebook, color: "bg-blue-500 hover:bg-blue-600" },
                  { icon: Twitter, color: "bg-sky-500 hover:bg-sky-600" },
                  { icon: Instagram, color: "bg-pink-500 hover:bg-pink-600" }
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.button
                      key={index}
                      className={`w-10 h-10 ${social.color} text-white rounded-lg flex items-center justify-center transition-colors`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#FBC02D] rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-black" />
                </div>
                <h4 className="font-semibold text-white">{text[language].officeHours}</h4>
              </div>
              <div className="space-y-2 text-white/80">
                <p>{text[language].mondayFriday}</p>
                <p>{text[language].saturday}</p>
                <p className="text-sm text-[#FBC02D] mt-3 font-medium">
                  {text[language].responseTime}
                </p>
              </div>
            </motion.div>

            {/* Team Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#FBC02D] rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-black" />
                </div>
                <h4 className="font-semibold text-white">{text[language].ourTeam}</h4>
              </div>
              
              {/* Team Name */}
              <div className="mb-4">
                <div className="inline-block bg-gradient-to-r from-[#FBC02D] to-[#F9A825] text-black px-4 py-2 rounded-lg font-bold text-lg">
                  TekTonX
                </div>
              </div>
              
              {/* Team Members */}
              <div className="space-y-2 text-white/90">
                <p className="text-sm text-white/70 mb-3">{text[language].teamSubtitle}</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Saksham Sharma",
                    "Aditya Kumar",
                    "Shivangi Jain",
                    "Joy",
                    "Arnav",
                    "Kashish"
                  ].map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                      className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-2 h-2 bg-[#FBC02D] rounded-full"></div>
                      <span className="text-sm">{member}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {text[language].yourName}
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={text[language].namePlaceholder}
                      className="h-12 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {text[language].emailAddress}
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={text[language].emailPlaceholder}
                      className="h-12 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {text[language].phoneNumber}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder={text[language].phonePlaceholder}
                      className="h-12 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {text[language].yourMessage}
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder={text[language].messagePlaceholder}
                      rows={5}
                      className="bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] hover:from-[#2E7D32] hover:to-[#1B5E20] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {text[language].sendMessage}
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
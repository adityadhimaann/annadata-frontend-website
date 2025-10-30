import React, { useState } from 'react';
import { Home, ShoppingBag, MapPin, Heart, User, LogOut, Sun, Moon, Menu, X, Sparkles, TrendingUp, Award, Bell, Star, Search, Filter, Truck, Package, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';

type ActiveModule = 'home' | 'browse' | 'orders' | 'favorites' | 'nearby' | 'profile';

interface ConsumerDashboardProps {
  onLogout?: () => void;
  consumerName?: string;
}

export default function ConsumerDashboard({ onLogout, consumerName = "Consumer" }: ConsumerDashboardProps) {
  const [activeModule, setActiveModule] = useState<ActiveModule>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const menuItems = [
    { id: 'home' as ActiveModule, icon: Home, label: selectedLanguage === 'hi' ? 'होम' : 'Home' },
    { id: 'browse' as ActiveModule, icon: ShoppingBag, label: selectedLanguage === 'hi' ? 'शॉप' : 'Browse' },
    { id: 'orders' as ActiveModule, icon: Package, label: selectedLanguage === 'hi' ? 'ऑर्डर्स' : 'My Orders' },
    { id: 'favorites' as ActiveModule, icon: Heart, label: selectedLanguage === 'hi' ? 'पसंदीदा' : 'Favorites' },
    { id: 'nearby' as ActiveModule, icon: MapPin, label: selectedLanguage === 'hi' ? 'नज़दीकी' : 'Nearby' },
    { id: 'profile' as ActiveModule, icon: User, label: selectedLanguage === 'hi' ? 'प्रोफाइल' : 'Profile' },
  ];

  // Sample data
  const products = [
    { id: 1, name: 'Fresh Tomatoes', vendor: 'Green Farm', price: '₹50/kg', rating: 4.5, image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300&h=300&fit=crop', distance: '2 km' },
    { id: 2, name: 'Organic Rice', vendor: 'Organic Store', price: '₹60/kg', rating: 4.8, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop', distance: '5 km' },
    { id: 3, name: 'Fresh Spinach', vendor: 'Fresh Veggie', price: '₹40/kg', rating: 4.3, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop', distance: '3 km' },
    { id: 4, name: 'Green Chillies', vendor: 'Spice World', price: '₹80/kg', rating: 4.6, image: 'https://images.unsplash.com/photo-1583023734958-9b1c5b695023?w=300&h=300&fit=crop', distance: '4 km' },
    { id: 5, name: 'Potatoes', vendor: 'Green Farm', price: '₹30/kg', rating: 4.4, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop', distance: '2 km' },
    { id: 6, name: 'Onions', vendor: 'Veggie Mart', price: '₹35/kg', rating: 4.2, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&h=300&fit=crop', distance: '6 km' },
  ];

  const myOrders = [
    { id: '#ORD-2301', vendor: 'Green Farm', items: 'Fresh Tomatoes, Potatoes', amount: '₹450', status: 'Delivered', date: '28 Oct 2024' },
    { id: '#ORD-2302', vendor: 'Organic Store', items: 'Organic Rice', amount: '₹600', status: 'In Transit', date: '29 Oct 2024' },
    { id: '#ORD-2303', vendor: 'Fresh Veggie', items: 'Fresh Spinach, Green Chillies', amount: '₹320', status: 'Processing', date: '30 Oct 2024' },
  ];

  const nearbyVendors = [
    { name: 'Green Farm', distance: '2.3 km', rating: 4.7, products: 42, image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&h=300&fit=crop' },
    { name: 'Organic Store', distance: '3.5 km', rating: 4.9, products: 38, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop' },
    { name: 'Fresh Veggie', distance: '4.1 km', rating: 4.5, products: 55, image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&h=300&fit=crop' },
    { name: 'Spice World', distance: '5.2 km', rating: 4.6, products: 28, image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=300&h=300&fit=crop' },
  ];

  const renderContent = () => {
    switch (activeModule) {
      case 'browse':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
                    <Input 
                      placeholder={selectedLanguage === 'hi' ? 'प्रोडक्ट्स खोजें...' : 'Search products...'} 
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  {selectedLanguage === 'hi' ? 'फिल्टर' : 'Filters'}
                </Button>
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                {['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Spices', 'Oil & Ghee'].map((cat, index) => (
                  <Button 
                    key={index}
                    variant={index === 0 ? 'default' : 'outline'}
                    size="sm"
                    className={index === 0 ? 'bg-[#1B5E20] hover:bg-[#2E7D32]' : ''}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 group`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-red-500" />
                      </button>
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-[#FBC02D] text-black text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {product.distance}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base mb-1">{product.name}</h3>
                      <p className="text-xs opacity-70 mb-2">{product.vendor}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-[#FBC02D] text-[#FBC02D]" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-[#1B5E20] dark:text-[#FBC02D]">{product.price}</span>
                        <Button size="sm" className="bg-[#1B5E20] hover:bg-[#2E7D32]">
                          {selectedLanguage === 'hi' ? 'जोड़ें' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl">{selectedLanguage === 'hi' ? 'मेरे ऑर्डर्स' : 'My Orders'}</h2>
                <p className="text-sm opacity-70 mt-1">{selectedLanguage === 'hi' ? 'अपने सभी ऑर्डर्स ट्रैक करें' : 'Track all your orders'}</p>
              </div>

              {/* Order Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: selectedLanguage === 'hi' ? 'कुल ऑर्डर्स' : 'Total Orders', value: '67', icon: Package, color: 'from-blue-500 to-blue-600' },
                  { label: selectedLanguage === 'hi' ? 'ट्रांजिट में' : 'In Transit', value: '3', icon: Truck, color: 'from-orange-500 to-orange-600' },
                  { label: selectedLanguage === 'hi' ? 'डिलीवर हुए' : 'Delivered', value: '62', icon: Award, color: 'from-green-500 to-green-600' },
                  { label: selectedLanguage === 'hi' ? 'खर्च किया' : 'Total Spent', value: '₹18.5K', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
                ].map((stat, index) => (
                  <Card key={index} className={`bg-gradient-to-br ${stat.color}`}>
                    <CardContent className="p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className="w-5 h-5" />
                        <p className="text-2xl">{stat.value}</p>
                      </div>
                      <p className="text-sm text-white/90">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {myOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base font-medium">{order.id}</h3>
                            <Badge variant={
                              order.status === 'Delivered' ? 'default' : 
                              order.status === 'In Transit' ? 'secondary' : 
                              'outline'
                            }>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm opacity-70 mb-1">{order.vendor}</p>
                          <p className="text-sm mb-2">{order.items}</p>
                          <div className="flex items-center gap-4 text-xs opacity-70">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {order.date}
                            </span>
                            <span className="text-[#1B5E20] dark:text-[#FBC02D]">{order.amount}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            {selectedLanguage === 'hi' ? 'विवरण' : 'Details'}
                          </Button>
                          {order.status === 'Delivered' && (
                            <Button size="sm" className="bg-[#1B5E20] hover:bg-[#2E7D32]">
                              {selectedLanguage === 'hi' ? 'फिर ऑर्डर करें' : 'Reorder'}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'favorites':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl">{selectedLanguage === 'hi' ? 'पसंदीदा' : 'My Favorites'}</h2>
                <p className="text-sm opacity-70 mt-1">{selectedLanguage === 'hi' ? 'आपके सहेजे हुए आइटम्स' : 'Your saved items'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 4).map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 group`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base mb-1">{product.name}</h3>
                      <p className="text-xs opacity-70 mb-2">{product.vendor}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-[#FBC02D] text-[#FBC02D]" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-[#1B5E20] dark:text-[#FBC02D]">{product.price}</span>
                        <Button size="sm" className="bg-[#1B5E20] hover:bg-[#2E7D32]">
                          {selectedLanguage === 'hi' ? 'जोड़ें' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'nearby':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl">{selectedLanguage === 'hi' ? 'नज़दीकी विक्रेता' : 'Nearby Vendors'}</h2>
                <p className="text-sm opacity-70 mt-1">{selectedLanguage === 'hi' ? 'आपके पास के विक्रेता' : 'Vendors near your location'}</p>
              </div>

              {/* Map Placeholder */}
              <Card className="mb-6">
                <CardContent className="p-0">
                  <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} h-64 flex items-center justify-center rounded-t-lg`}>
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm opacity-70">{selectedLanguage === 'hi' ? 'मैप व्यू' : 'Map View'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vendors List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nearbyVendors.map((vendor, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700`}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-[#FBC02D] text-black">
                          <MapPin className="w-3 h-3 mr-1" />
                          {vendor.distance}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base mb-2">{vendor.name}</h3>
                      <div className="flex items-center gap-4 mb-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#FBC02D] text-[#FBC02D]" />
                          <span>{vendor.rating}</span>
                        </div>
                        <div className="opacity-70">
                          {vendor.products} {selectedLanguage === 'hi' ? 'प्रोडक्ट्स' : 'products'}
                        </div>
                      </div>
                      <Button className="w-full bg-[#1B5E20] hover:bg-[#2E7D32]">
                        {selectedLanguage === 'hi' ? 'शॉप देखें' : 'View Shop'}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl mb-6">{selectedLanguage === 'hi' ? 'मेरी प्रोफाइल' : 'My Profile'}</h2>

              {/* Profile Info */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl">
                      {consumerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl mb-1">{consumerName}</h3>
                      <p className="text-sm opacity-70">{selectedLanguage === 'hi' ? 'प्रीमियम ग्राहक' : 'Premium Customer'}</p>
                      <Badge className="mt-2 bg-[#FBC02D] text-black">
                        <Award className="w-3 h-3 mr-1" />
                        {selectedLanguage === 'hi' ? 'गोल्ड मेंबर' : 'Gold Member'}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm opacity-70 mb-1">{selectedLanguage === 'hi' ? 'ईमेल' : 'Email'}</p>
                      <p className="text-sm">{consumerName.toLowerCase().replace(' ', '.')}@email.com</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70 mb-1">{selectedLanguage === 'hi' ? 'फोन' : 'Phone'}</p>
                      <p className="text-sm">+91 98765 43210</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70 mb-1">{selectedLanguage === 'hi' ? 'पता' : 'Address'}</p>
                      <p className="text-sm">123, Green Street, New Delhi</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70 mb-1">{selectedLanguage === 'hi' ? 'सदस्य बने' : 'Member Since'}</p>
                      <p className="text-sm">January 2024</p>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-[#1B5E20] hover:bg-[#2E7D32]">
                    {selectedLanguage === 'hi' ? 'प्रोफाइल संपादित करें' : 'Edit Profile'}
                  </Button>
                </CardContent>
              </Card>

              {/* Account Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Package className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl mb-1">67</p>
                    <p className="text-sm opacity-70">{selectedLanguage === 'hi' ? 'कुल ऑर्डर्स' : 'Total Orders'}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                    <p className="text-2xl mb-1">24</p>
                    <p className="text-sm opacity-70">{selectedLanguage === 'hi' ? 'पसंदीदा' : 'Favorites'}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl mb-1">₹18.5K</p>
                    <p className="text-sm opacity-70">{selectedLanguage === 'hi' ? 'कुल खर्च' : 'Total Spent'}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section with Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 p-6 shadow-xl"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-xl md:text-2xl text-white">
                        {selectedLanguage === 'hi' ? '🙏 नमस्ते' : '👋 Welcome'}, {consumerName}!
                      </h1>
                      <Badge className="bg-[#FBC02D] text-[#1B5E20] border-none text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Gold Member
                      </Badge>
                    </div>
                    <p className="text-sm text-white/90">
                      {selectedLanguage === 'hi' 
                        ? 'अन्नदाता कंज्यूमर डैशबोर्ड में आपका स्वागत है' 
                        : 'Welcome to Annadata Consumer Dashboard'}
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
                        <p className="text-white/70 text-xs">{selectedLanguage === 'hi' ? 'सक्रिय ऑर्डर्स' : 'Active Orders'}</p>
                        <p className="text-xl text-white mt-0.5">3</p>
                      </div>
                      <div className="bg-[#FBC02D] p-2 rounded-lg">
                        <Truck className="w-5 h-5 text-[#1B5E20]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-[#FBC02D]">
                      <Clock className="w-3 h-3" />
                      <span>{selectedLanguage === 'hi' ? 'ट्रैक करें' : 'Track now'}</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-xs">{selectedLanguage === 'hi' ? 'पसंदीदा आइटम्स' : 'Saved Items'}</p>
                        <p className="text-xl text-white mt-0.5">24</p>
                      </div>
                      <div className="bg-[#FBC02D] p-2 rounded-lg">
                        <Heart className="w-5 h-5 text-[#1B5E20]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-green-300">
                      <Sparkles className="w-3 h-3" />
                      <span>{selectedLanguage === 'hi' ? 'देखें' : 'View all'}</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-xs">{selectedLanguage === 'hi' ? 'बचत (इस महीने)' : 'Saved (This Month)'}</p>
                        <p className="text-xl text-white mt-0.5">₹2.4K</p>
                      </div>
                      <div className="bg-[#FBC02D] p-2 rounded-lg">
                        <Award className="w-5 h-5 text-[#1B5E20]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-blue-300">
                      <TrendingUp className="w-3 h-3" />
                      <span>+15% {selectedLanguage === 'hi' ? 'पिछले महीने से' : 'from last month'}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Browse Products Card */}
              <motion.button
                onClick={() => setActiveModule('browse')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-5 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all text-left group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base mb-0.5">
                        {selectedLanguage === 'hi' ? 'प्रोडक्ट्स ब्राउज़ करें' : 'Browse Products'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {selectedLanguage === 'hi' ? 'नए आइटम्स' : 'New Arrivals'}
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'ताजा उत्पाद खोजें और ऑर्डर करें'
                      : 'Discover fresh products and place orders'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    {selectedLanguage === 'hi' ? '200+ प्रोडक्ट्स' : '200+ Products'}
                  </div>
                </div>
              </motion.button>

              {/* My Orders Card */}
              <motion.button
                onClick={() => setActiveModule('orders')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-5 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all text-left group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base mb-0.5">
                        {selectedLanguage === 'hi' ? 'मेरे ऑर्डर्स' : 'My Orders'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <Clock className="w-3 h-3 mr-1" />
                        3 {selectedLanguage === 'hi' ? 'सक्रिय' : 'Active'}
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'अपने ऑर्डर्स ट्रैक करें और इतिहास देखें'
                      : 'Track your orders and view history'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                    {selectedLanguage === 'hi' ? '3 ट्रांजिट में' : '3 In Transit'}
                  </div>
                </div>
              </motion.button>

              {/* Nearby Vendors Card */}
              <motion.button
                onClick={() => setActiveModule('nearby')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-5 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all text-left group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base mb-0.5">
                        {selectedLanguage === 'hi' ? 'नज़दीकी विक्रेता' : 'Nearby Vendors'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <MapPin className="w-3 h-3 mr-1" />
                        {selectedLanguage === 'hi' ? 'स्थान' : 'Location'}
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'अपने पास के विक्रेताओं को खोजें'
                      : 'Find vendors near your location'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    {selectedLanguage === 'hi' ? '12 नज़दीकी' : '12 Nearby'}
                  </div>
                </div>
              </motion.button>

              {/* Favorites Card */}
              <motion.button
                onClick={() => setActiveModule('favorites')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-5 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all text-left group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-pink-500 to-red-500 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base mb-0.5">
                        {selectedLanguage === 'hi' ? 'मेरे पसंदीदा' : 'My Favorites'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <Heart className="w-3 h-3 mr-1" />
                        {selectedLanguage === 'hi' ? 'सहेजे गए' : 'Saved'}
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'आपके सहेजे हुए आइटम्स देखें'
                      : 'View your saved favorite items'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                    24 {selectedLanguage === 'hi' ? 'आइटम्स' : 'Items'}
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Featured Products */}
            <Card>
              <CardHeader>
                <h3 className="text-lg">{selectedLanguage === 'hi' ? 'फीचर्ड प्रोडक्ट्स' : 'Featured Products'}</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {products.slice(0, 3).map((product) => (
                    <div key={product.id} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-3`}>
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">{product.name}</p>
                          <p className="text-xs opacity-70 mb-1">{product.vendor}</p>
                          <p className="text-sm text-[#1B5E20] dark:text-[#FBC02D]">{product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden h-8 w-8"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base leading-none">Annadata</h1>
                <p className="text-xs opacity-70">{selectedLanguage === 'hi' ? 'उपभोक्ता पोर्टल' : 'Consumer Portal'}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedLanguage(selectedLanguage === 'en' ? 'hi' : 'en')}
              className="h-8 w-8"
            >
              <span className="text-xs">{selectedLanguage === 'en' ? 'हिं' : 'EN'}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="h-8 w-8"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Bell className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="h-8 w-8"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-14 bottom-0 w-56 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r overflow-y-auto hidden lg:block`}>
        <div className="p-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                activeModule === item.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : isDarkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className={`fixed left-0 top-14 bottom-0 w-56 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} z-50 overflow-y-auto lg:hidden`}
            >
              <div className="p-3 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveModule(item.id);
                      toggleMobileMenu();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                      activeModule === item.id
                        ? 'bg-blue-500 text-white shadow-md'
                        : isDarkMode
                        ? 'hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-56 mt-14 p-4 md:p-6">
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
}

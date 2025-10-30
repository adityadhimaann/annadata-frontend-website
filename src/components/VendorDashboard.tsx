import React, { useState } from 'react';
import { Home, Package, ShoppingCart, TrendingUp, Users, DollarSign, LogOut, Sun, Moon, Menu, X, Sparkles, Award, Bell, BarChart3, Truck, ClipboardList, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

type ActiveModule = 'home' | 'inventory' | 'orders' | 'products' | 'analytics' | 'customers';

interface VendorDashboardProps {
  onLogout?: () => void;
  vendorName?: string;
}

export default function VendorDashboard({ onLogout, vendorName = "Vendor" }: VendorDashboardProps) {
  const [activeModule, setActiveModule] = useState<ActiveModule>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const menuItems = [
    { id: 'home' as ActiveModule, icon: Home, label: selectedLanguage === 'hi' ? 'होम' : 'Home' },
    { id: 'inventory' as ActiveModule, icon: Package, label: selectedLanguage === 'hi' ? 'इन्वेंटरी' : 'Inventory' },
    { id: 'orders' as ActiveModule, icon: ShoppingCart, label: selectedLanguage === 'hi' ? 'ऑर्डर्स' : 'Orders' },
    { id: 'products' as ActiveModule, icon: ClipboardList, label: selectedLanguage === 'hi' ? 'प्रोडक्ट्स' : 'Products' },
    { id: 'analytics' as ActiveModule, icon: BarChart3, label: selectedLanguage === 'hi' ? 'एनालिटिक्स' : 'Analytics' },
    { id: 'customers' as ActiveModule, icon: Users, label: selectedLanguage === 'hi' ? 'ग्राहक' : 'Customers' },
  ];

  // Sample data
  const recentOrders = [
    { id: '#ORD-001', customer: 'Rajesh Kumar', product: 'Fresh Tomatoes', quantity: '50 kg', amount: '₹2,500', status: 'Delivered' },
    { id: '#ORD-002', customer: 'Priya Sharma', product: 'Organic Rice', quantity: '100 kg', amount: '₹5,000', status: 'Pending' },
    { id: '#ORD-003', customer: 'Amit Patel', product: 'Wheat Flour', quantity: '75 kg', amount: '₹3,750', status: 'Processing' },
    { id: '#ORD-004', customer: 'Sanjay Singh', product: 'Fresh Spinach', quantity: '20 kg', amount: '₹1,200', status: 'Delivered' },
  ];

  const lowStockItems = [
    { name: 'Fresh Tomatoes', current: '15 kg', minimum: '50 kg', status: 'critical' },
    { name: 'Green Chillies', current: '8 kg', minimum: '20 kg', status: 'low' },
    { name: 'Potatoes', current: '45 kg', minimum: '100 kg', status: 'low' },
  ];

  const renderContent = () => {
    switch (activeModule) {
      case 'inventory':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl">{selectedLanguage === 'hi' ? 'इन्वेंटरी प्रबंधन' : 'Inventory Management'}</h2>
                  <p className="text-sm opacity-70 mt-1">{selectedLanguage === 'hi' ? 'अपनी स्टॉक का प्रबंधन करें' : 'Manage your stock levels'}</p>
                </div>
                <Button className="bg-[#1B5E20] hover:bg-[#2E7D32]">
                  <Package className="w-4 h-4 mr-2" />
                  {selectedLanguage === 'hi' ? 'नया आइटम' : 'Add Item'}
                </Button>
              </div>

              {/* Low Stock Alert */}
              <Card className={`${isDarkMode ? 'bg-red-900/20 border-red-900' : 'bg-red-50 border-red-200'} mb-6`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Bell className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-red-600">{selectedLanguage === 'hi' ? 'कम स्टॉक अलर्ट' : 'Low Stock Alert'}</h3>
                  </div>
                  <div className="space-y-2">
                    {lowStockItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs opacity-70">{selectedLanguage === 'hi' ? 'वर्तमान' : 'Current'}: {item.current} | {selectedLanguage === 'hi' ? 'न्यूनतम' : 'Minimum'}: {item.minimum}</p>
                        </div>
                        <Badge variant={item.status === 'critical' ? 'destructive' : 'outline'}>
                          {item.status === 'critical' ? (selectedLanguage === 'hi' ? 'गंभीर' : 'Critical') : (selectedLanguage === 'hi' ? 'कम' : 'Low')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Fresh Vegetables', 'Grains & Pulses', 'Dairy Products', 'Fruits', 'Spices', 'Oil & Ghee'].map((category, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base">{category}</h3>
                      <Badge className="bg-[#FBC02D] text-black">{Math.floor(Math.random() * 50) + 10}</Badge>
                    </div>
                    <div className="space-y-2 text-sm opacity-70">
                      <p>{selectedLanguage === 'hi' ? 'कुल आइटम्स' : 'Total Items'}: {Math.floor(Math.random() * 20) + 5}</p>
                      <p>{selectedLanguage === 'hi' ? 'कुल मूल्य' : 'Total Value'}: ₹{(Math.floor(Math.random() * 50000) + 10000).toLocaleString()}</p>
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl">{selectedLanguage === 'hi' ? 'ऑर्डर प्रबंधन' : 'Order Management'}</h2>
                  <p className="text-sm opacity-70 mt-1">{selectedLanguage === 'hi' ? 'सभी ऑर्डर्स देखें और प्रबंधित करें' : 'View and manage all orders'}</p>
                </div>
                <Input 
                  placeholder={selectedLanguage === 'hi' ? 'ऑर्डर खोजें...' : 'Search orders...'} 
                  className="max-w-xs"
                />
              </div>

              {/* Order Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: selectedLanguage === 'hi' ? 'कुल ऑर्डर्स' : 'Total Orders', value: '234', icon: ShoppingCart, color: 'from-blue-500 to-blue-600' },
                  { label: selectedLanguage === 'hi' ? 'पेंडिंग' : 'Pending', value: '12', icon: Clock, color: 'from-orange-500 to-orange-600' },
                  { label: selectedLanguage === 'hi' ? 'डिलीवर हुए' : 'Delivered', value: '210', icon: Truck, color: 'from-green-500 to-green-600' },
                  { label: selectedLanguage === 'hi' ? 'कुल राजस्व' : 'Total Revenue', value: '₹2.4L', icon: DollarSign, color: 'from-purple-500 to-purple-600' },
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

              {/* Orders Table */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg">{selectedLanguage === 'hi' ? 'हाल के ऑर्डर्स' : 'Recent Orders'}</h3>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{selectedLanguage === 'hi' ? 'ऑर्डर ID' : 'Order ID'}</TableHead>
                        <TableHead>{selectedLanguage === 'hi' ? 'ग्राहक' : 'Customer'}</TableHead>
                        <TableHead>{selectedLanguage === 'hi' ? 'प्रोडक्ट' : 'Product'}</TableHead>
                        <TableHead>{selectedLanguage === 'hi' ? 'मात्रा' : 'Quantity'}</TableHead>
                        <TableHead>{selectedLanguage === 'hi' ? 'राशि' : 'Amount'}</TableHead>
                        <TableHead>{selectedLanguage === 'hi' ? 'स्थिति' : 'Status'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.product}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>
                            <Badge variant={order.status === 'Delivered' ? 'default' : order.status === 'Pending' ? 'outline' : 'secondary'}>
                              {order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl">{selectedLanguage === 'hi' ? 'प्रोडक्ट सूची' : 'Product Listings'}</h2>
                  <p className="text-sm opacity-70 mt-1">{selectedLanguage === 'hi' ? 'अपने प्रोडक्ट्स जोड़ें और प्रबंधित करें' : 'Add and manage your products'}</p>
                </div>
                <Button className="bg-[#1B5E20] hover:bg-[#2E7D32]">
                  <Package className="w-4 h-4 mr-2" />
                  {selectedLanguage === 'hi' ? 'नया प्रोडक्ट' : 'Add Product'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Fresh Tomatoes', price: '₹50/kg', stock: '150 kg', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300&h=300&fit=crop' },
                  { name: 'Organic Rice', price: '₹60/kg', stock: '500 kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop' },
                  { name: 'Fresh Spinach', price: '₹40/kg', stock: '80 kg', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop' },
                  { name: 'Green Chillies', price: '₹80/kg', stock: '30 kg', image: 'https://images.unsplash.com/photo-1583023734958-9b1c5b695023?w=300&h=300&fit=crop' },
                  { name: 'Potatoes', price: '₹30/kg', stock: '200 kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop' },
                  { name: 'Onions', price: '₹35/kg', stock: '180 kg', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&h=300&fit=crop' },
                ].map((product, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-[#FBC02D] text-black">{selectedLanguage === 'hi' ? 'स्टॉक में' : 'In Stock'}</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg text-[#1B5E20] dark:text-[#FBC02D]">{product.price}</span>
                        <span className="text-sm opacity-70">{product.stock}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          {selectedLanguage === 'hi' ? 'एडिट' : 'Edit'}
                        </Button>
                        <Button size="sm" className="flex-1 bg-[#1B5E20] hover:bg-[#2E7D32]">
                          {selectedLanguage === 'hi' ? 'देखें' : 'View'}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl mb-6">{selectedLanguage === 'hi' ? 'बिजनेस एनालिटिक्स' : 'Business Analytics'}</h2>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: selectedLanguage === 'hi' ? 'मासिक राजस्व' : 'Monthly Revenue', value: '₹2,45,000', change: '+15%', positive: true },
                  { label: selectedLanguage === 'hi' ? 'कुल बिक्री' : 'Total Sales', value: '₹8,92,000', change: '+22%', positive: true },
                  { label: selectedLanguage === 'hi' ? 'नए ग्राहक' : 'New Customers', value: '142', change: '+8%', positive: true },
                  { label: selectedLanguage === 'hi' ? 'औसत ऑर्डर' : 'Avg. Order Value', value: '₹1,850', change: '-3%', positive: false },
                ].map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <p className="text-sm opacity-70 mb-2">{metric.label}</p>
                      <p className="text-2xl mb-2">{metric.value}</p>
                      <div className={`flex items-center gap-1 text-xs ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp className={`w-3 h-3 ${!metric.positive && 'rotate-180'}`} />
                        <span>{metric.change}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg">{selectedLanguage === 'hi' ? 'बिक्री ट्रेंड' : 'Sales Trend'}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg h-64 flex items-center justify-center`}>
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm opacity-70">{selectedLanguage === 'hi' ? 'बिक्री चार्ट' : 'Sales Chart'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-lg">{selectedLanguage === 'hi' ? 'टॉप प्रोडक्ट्स' : 'Top Products'}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['Fresh Tomatoes', 'Organic Rice', 'Potatoes', 'Onions', 'Green Chillies'].map((product, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center text-white text-xs`}>
                              {index + 1}
                            </div>
                            <span className="text-sm">{product}</span>
                          </div>
                          <span className="text-sm opacity-70">₹{(Math.random() * 50000 + 10000).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        );

      case 'customers':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl">{selectedLanguage === 'hi' ? 'ग्राहक प्रबंधन' : 'Customer Management'}</h2>
                  <p className="text-sm opacity-70 mt-1">{selectedLanguage === 'hi' ? 'अपने ग्राहकों को देखें और प्रबंधित करें' : 'View and manage your customers'}</p>
                </div>
                <Input 
                  placeholder={selectedLanguage === 'hi' ? 'ग्राहक खोजें...' : 'Search customers...'} 
                  className="max-w-xs"
                />
              </div>

              {/* Customer Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600">
                  <CardContent className="p-4 text-white">
                    <Users className="w-8 h-8 mb-2" />
                    <p className="text-3xl mb-1">1,247</p>
                    <p className="text-sm text-white/90">{selectedLanguage === 'hi' ? 'कुल ग्राहक' : 'Total Customers'}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-green-600">
                  <CardContent className="p-4 text-white">
                    <Award className="w-8 h-8 mb-2" />
                    <p className="text-3xl mb-1">342</p>
                    <p className="text-sm text-white/90">{selectedLanguage === 'hi' ? 'नियमित ग्राहक' : 'Regular Customers'}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-500 to-orange-600">
                  <CardContent className="p-4 text-white">
                    <Sparkles className="w-8 h-8 mb-2" />
                    <p className="text-3xl mb-1">89</p>
                    <p className="text-sm text-white/90">{selectedLanguage === 'hi' ? 'नए (इस महीने)' : 'New (This Month)'}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Customer List */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg">{selectedLanguage === 'hi' ? 'हाल के ग्राहक' : 'Recent Customers'}</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Rajesh Kumar', orders: '45', spent: '₹1,25,000', status: 'Premium' },
                      { name: 'Priya Sharma', orders: '32', spent: '₹95,000', status: 'Regular' },
                      { name: 'Amit Patel', orders: '28', spent: '₹78,000', status: 'Regular' },
                      { name: 'Sanjay Singh', orders: '15', spent: '₹45,000', status: 'New' },
                      { name: 'Neha Gupta', orders: '12', spent: '₹38,000', status: 'New' },
                    ].map((customer, index) => (
                      <div key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4 flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center text-white">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{customer.name}</p>
                            <p className="text-xs opacity-70">{customer.orders} {selectedLanguage === 'hi' ? 'ऑर्डर्स' : 'orders'} • {customer.spent}</p>
                          </div>
                        </div>
                        <Badge variant={customer.status === 'Premium' ? 'default' : 'outline'}>
                          {customer.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 via-orange-500 to-[#F57F17] p-6 shadow-xl"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-xl md:text-2xl text-white">
                        {selectedLanguage === 'hi' ? '🙏 नमस्ते' : '👋 Welcome'}, {vendorName}!
                      </h1>
                      <Badge className="bg-[#FBC02D] text-[#1B5E20] border-none text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Business Pro
                      </Badge>
                    </div>
                    <p className="text-sm text-white/90">
                      {selectedLanguage === 'hi' 
                        ? 'अन्नदाता विक्रेता डैशबोर्ड में आपका स्वागत है' 
                        : 'Welcome to Annadata Vendor Dashboard'}
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
                        <p className="text-white/70 text-xs">{selectedLanguage === 'hi' ? 'आज के ऑर्डर्स' : 'Today\'s Orders'}</p>
                        <p className="text-xl text-white mt-0.5">28</p>
                      </div>
                      <div className="bg-[#FBC02D] p-2 rounded-lg">
                        <ShoppingCart className="w-5 h-5 text-[#1B5E20]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-[#FBC02D]">
                      <TrendingUp className="w-3 h-3" />
                      <span>+18% {selectedLanguage === 'hi' ? 'कल से' : 'from yesterday'}</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-xs">{selectedLanguage === 'hi' ? 'आज की कमाई' : 'Today\'s Revenue'}</p>
                        <p className="text-xl text-white mt-0.5">₹12.5K</p>
                      </div>
                      <div className="bg-[#FBC02D] p-2 rounded-lg">
                        <DollarSign className="w-5 h-5 text-[#1B5E20]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-green-300">
                      <Award className="w-3 h-3" />
                      <span>{selectedLanguage === 'hi' ? 'बेहतरीन' : 'Excellent'}</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-xs">{selectedLanguage === 'hi' ? 'कुल प्रोडक्ट्स' : 'Total Products'}</p>
                        <p className="text-xl text-white mt-0.5">156</p>
                      </div>
                      <div className="bg-[#FBC02D] p-2 rounded-lg">
                        <Package className="w-5 h-5 text-[#1B5E20]" />
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
              {/* Inventory Card */}
              <motion.button
                onClick={() => setActiveModule('inventory')}
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
                        {selectedLanguage === 'hi' ? 'इन्वेंटरी प्रबंधन' : 'Inventory Management'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {selectedLanguage === 'hi' ? 'स्टॉक ट्रैकिंग' : 'Stock Tracking'}
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'अपने स्टॉक और इन्वेंटरी का प्रबंधन करें'
                      : 'Manage your stock and inventory levels'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    {selectedLanguage === 'hi' ? '156 आइटम्स' : '156 Items'}
                  </div>
                </div>
              </motion.button>

              {/* Orders Card */}
              <motion.button
                onClick={() => setActiveModule('orders')}
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
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base mb-0.5">
                        {selectedLanguage === 'hi' ? 'ऑर्डर प्रबंधन' : 'Order Management'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <Bell className="w-3 h-3 mr-1" />
                        12 {selectedLanguage === 'hi' ? 'नए' : 'New'}
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'सभी ऑर्डर्स देखें और प्रोसेस करें'
                      : 'View and process all customer orders'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                    {selectedLanguage === 'hi' ? '12 पेंडिंग' : '12 Pending'}
                  </div>
                </div>
              </motion.button>

              {/* Products Card */}
              <motion.button
                onClick={() => setActiveModule('products')}
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
                      <ClipboardList className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base mb-0.5">
                        {selectedLanguage === 'hi' ? 'प्रोडक्ट सूची' : 'Product Listings'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <Package className="w-3 h-3 mr-1" />
                        {selectedLanguage === 'hi' ? 'कैटलॉग' : 'Catalog'}
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'अपने प्रोडक्ट्स जोड़ें और अपडेट करें'
                      : 'Add and update your product listings'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    {selectedLanguage === 'hi' ? 'लाइव' : 'Live'}
                  </div>
                </div>
              </motion.button>

              {/* Analytics Card */}
              <motion.button
                onClick={() => setActiveModule('analytics')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-5 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all text-left group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base mb-0.5">
                        {selectedLanguage === 'hi' ? 'बिजनेस एनालिटिक्स' : 'Business Analytics'}
                      </h2>
                      <Badge variant="outline" className="text-xs h-5">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {selectedLanguage === 'hi' ? 'इनसाइट्स' : 'Insights'}
                      </Badge>
                    </div>
                  </div>
                  <p className="opacity-70 text-sm">
                    {selectedLanguage === 'hi'
                      ? 'अपने बिजनेस की परफॉर्मेंस देखें'
                      : 'View your business performance metrics'}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#1B5E20] dark:text-[#FBC02D]">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                    +15% {selectedLanguage === 'hi' ? 'वृद्धि' : 'Growth'}
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <h3 className="text-lg">{selectedLanguage === 'hi' ? 'हाल की गतिविधि' : 'Recent Activity'}</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'New order received', customer: 'Rajesh Kumar', time: '5 mins ago', icon: ShoppingCart, color: 'green' },
                    { action: 'Product updated', product: 'Fresh Tomatoes', time: '23 mins ago', icon: Package, color: 'blue' },
                    { action: 'Order delivered', customer: 'Priya Sharma', time: '1 hour ago', icon: Truck, color: 'purple' },
                    { action: 'New customer registered', customer: 'Amit Patel', time: '2 hours ago', icon: Users, color: 'orange' },
                  ].map((activity, index) => (
                    <div key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-3 flex items-center gap-3`}>
                      <div className={`w-10 h-10 rounded-full bg-${activity.color}-100 dark:bg-${activity.color}-900/20 flex items-center justify-center`}>
                        <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs opacity-70">{activity.customer || activity.product}</p>
                      </div>
                      <span className="text-xs opacity-70">{activity.time}</span>
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base leading-none">Annadata</h1>
                <p className="text-xs opacity-70">{selectedLanguage === 'hi' ? 'विक्रेता पोर्टल' : 'Vendor Portal'}</p>
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
                  ? 'bg-orange-500 text-white shadow-md'
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
                        ? 'bg-orange-500 text-white shadow-md'
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

// Clock component import fix
const Clock = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

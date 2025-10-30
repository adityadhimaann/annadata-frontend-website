import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LiveMandiPricesProps {
  language: 'en' | 'hi';
}

const LiveMandiPrices: React.FC<LiveMandiPricesProps> = ({ language }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const text = {
    en: {
      title: "Live Mandi Prices",
      lastUpdated: "Last Updated",
      volume: "Vol"
    },
    hi: {
      title: "लाइव मंडी भाव",
      lastUpdated: "अंतिम अपडेट",
      volume: "मात्रा"
    }
  };

  const mandiPrices = [
    {
      commodity: language === 'en' ? 'Wheat' : 'गेहूं',
      price: '₹2200',
      change: '+0.7%',
      volume: '650 tons',
      trend: 'up'
    },
    {
      commodity: language === 'en' ? 'Cotton' : 'कपास',
      price: '₹5600',
      change: '-1.7%',
      volume: '424 tons',
      trend: 'down'
    },
    {
      commodity: language === 'en' ? 'Sugarcane' : 'गन्ना',
      price: '₹454',
      change: '+0.8%',
      volume: '2.8k tons',
      trend: 'up'
    },
    {
      commodity: language === 'en' ? 'Soybean' : 'सोयाबीन',
      price: '₹4146',
      change: '-0.5%',
      volume: '800 tons',
      trend: 'down'
    },
    {
      commodity: language === 'en' ? 'Rice' : 'चावल',
      price: '₹3200',
      change: '+1.2%',
      volume: '1.2k tons',
      trend: 'up'
    },
    {
      commodity: language === 'en' ? 'Bajra' : 'बाजरा',
      price: '₹2800',
      change: '0.0%',
      volume: '320 tons',
      trend: 'neutral'
    },
    {
      commodity: language === 'en' ? 'Maize' : 'मक्का',
      price: '₹1950',
      change: '+2.1%',
      volume: '950 tons',
      trend: 'up'
    },
    {
      commodity: language === 'en' ? 'Mustard' : 'सरसों',
      price: '₹5200',
      change: '-0.9%',
      volume: '180 tons',
      trend: 'down'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <section className="py-6 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{text[language].title}</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {text[language].lastUpdated}: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {text[language].volume} • {currentTime.toLocaleDateString()}
          </div>
        </div>

        {/* Auto-scrolling ticker */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: [0, -2000] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* First set of prices */}
            {mandiPrices.map((item, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 min-w-[280px] border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-[80px]">
                  <span className="font-semibold text-gray-900 dark:text-white">{item.commodity}</span>
                  {getTrendIcon(item.trend)}
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900 dark:text-white">{item.price}</div>
                  <div className={`text-sm ${getTrendColor(item.trend)}`}>
                    {item.change}
                  </div>
                </div>
                
                <div className="text-right text-sm text-gray-500 dark:text-gray-400 min-w-[70px]">
                  <div>{text[language].volume}</div>
                  <div>{item.volume}</div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {mandiPrices.map((item, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 min-w-[280px] border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-[80px]">
                  <span className="font-semibold text-gray-900 dark:text-white">{item.commodity}</span>
                  {getTrendIcon(item.trend)}
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900 dark:text-white">{item.price}</div>
                  <div className={`text-sm ${getTrendColor(item.trend)}`}>
                    {item.change}
                  </div>
                </div>
                
                <div className="text-right text-sm text-gray-500 dark:text-gray-400 min-w-[70px]">
                  <div>{text[language].volume}</div>
                  <div>{item.volume}</div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Gradient fade effects */}
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white dark:from-gray-800 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white dark:from-gray-800 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default LiveMandiPrices;
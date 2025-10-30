import React, { useState } from 'react';
import { Droplet, TrendingUp, AlertCircle, CheckCircle2, Leaf, Zap, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface NPKAnalysisProps {
  language: 'en' | 'hi';
  isDarkMode: boolean;
}

interface NPKValues {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  pH: string;
}

interface NPKResult {
  nitrogenStatus: 'low' | 'optimal' | 'high';
  phosphorusStatus: 'low' | 'optimal' | 'high';
  potassiumStatus: 'low' | 'optimal' | 'high';
  pHStatus: 'acidic' | 'neutral' | 'alkaline';
  overallHealth: string;
  overallHealthHindi: string;
  recommendations: string[];
  recommendationsHindi: string[];
  fertilizerSuggestions: Array<{
    name: string;
    nameHindi: string;
    quantity: string;
    quantityHindi: string;
    timing: string;
    timingHindi: string;
  }>;
}

export default function NPKAnalysis({ language, isDarkMode }: NPKAnalysisProps) {
  const [npkValues, setNpkValues] = useState<NPKValues>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    pH: ''
  });
  const [result, setResult] = useState<NPKResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (field: keyof NPKValues, value: string) => {
    setNpkValues(prev => ({ ...prev, [field]: value }));
  };

  const analyzeNPK = () => {
    const n = parseFloat(npkValues.nitrogen);
    const p = parseFloat(npkValues.phosphorus);
    const k = parseFloat(npkValues.potassium);
    const pH = parseFloat(npkValues.pH);

    // Determine status for each nutrient
    const getNitrogenStatus = (val: number): 'low' | 'optimal' | 'high' => {
      if (val < 200) return 'low';
      if (val <= 400) return 'optimal';
      return 'high';
    };

    const getPhosphorusStatus = (val: number): 'low' | 'optimal' | 'high' => {
      if (val < 10) return 'low';
      if (val <= 25) return 'optimal';
      return 'high';
    };

    const getPotassiumStatus = (val: number): 'low' | 'optimal' | 'high' => {
      if (val < 100) return 'low';
      if (val <= 280) return 'optimal';
      return 'high';
    };

    const getpHStatus = (val: number): 'acidic' | 'neutral' | 'alkaline' => {
      if (val < 6.0) return 'acidic';
      if (val <= 7.5) return 'neutral';
      return 'alkaline';
    };

    const nStatus = getNitrogenStatus(n);
    const pStatus = getPhosphorusStatus(p);
    const kStatus = getPotassiumStatus(k);
    const pHStatus = getpHStatus(pH);

    // Generate recommendations based on analysis
    const recommendations: string[] = [];
    const recommendationsHindi: string[] = [];
    const fertilizerSuggestions = [];

    // Nitrogen recommendations
    if (nStatus === 'low') {
      recommendations.push('Nitrogen levels are low. Apply nitrogen-rich fertilizers like Urea or ammonium sulfate.');
      recommendationsHindi.push('नाइट्रोजन का स्तर कम है। यूरिया या अमोनियम सल्फेट जैसे नाइट्रोजन युक्त उर्वरक लगाएं।');
      fertilizerSuggestions.push({
        name: 'Urea (46% N)',
        nameHindi: 'यूरिया (46% एन)',
        quantity: '50-75 kg per acre',
        quantityHindi: '50-75 किलो प्रति एकड़',
        timing: 'Split application: 50% at sowing, 50% after 30 days',
        timingHindi: 'विभाजित अनुप्रयोग: बुवाई के समय 50%, 30 दिन बाद 50%'
      });
    } else if (nStatus === 'high') {
      recommendations.push('Nitrogen levels are high. Avoid nitrogen fertilizers and consider growing legumes for next season.');
      recommendationsHindi.push('नाइट्रोजन का स्तर अधिक है। नाइट्रोजन उर्वरक से बचें और अगले सीजन के लिए फलियां उगाने पर विचार करें।');
    } else {
      recommendations.push('Nitrogen levels are optimal. Maintain current fertilization practices.');
      recommendationsHindi.push('नाइट्रोजन का स्तर इष्टतम है। वर्तमान उर्वरक प्रथाओं को बनाए रखें।');
    }

    // Phosphorus recommendations
    if (pStatus === 'low') {
      recommendations.push('Phosphorus is deficient. Apply DAP or Single Super Phosphate (SSP).');
      recommendationsHindi.push('फास्फोरस की कमी है। डीएपी या सिंगल सुपर फॉस्फेट (एसएसपी) लगाएं।');
      fertilizerSuggestions.push({
        name: 'DAP (18-46-0)',
        nameHindi: 'डीएपी (18-46-0)',
        quantity: '40-60 kg per acre',
        quantityHindi: '40-60 किलो प्रति एकड़',
        timing: 'Apply at the time of sowing',
        timingHindi: 'बुवाई के समय लगाएं'
      });
    } else if (pStatus === 'high') {
      recommendations.push('Phosphorus is in excess. Skip phosphate fertilizers this season.');
      recommendationsHindi.push('फास्फोरस अधिक मात्रा में है। इस सीजन फॉस्फेट उर्वरक छोड़ दें।');
    } else {
      recommendations.push('Phosphorus levels are good. Continue with balanced fertilization.');
      recommendationsHindi.push('फास्फोरस का स्तर अच्छा है। संतुलित उर्वरक जारी रखें।');
    }

    // Potassium recommendations
    if (kStatus === 'low') {
      recommendations.push('Potassium is low. Apply Muriate of Potash (MOP) or organic compost.');
      recommendationsHindi.push('पोटेशियम कम है। म्यूरिएट ऑफ पोटाश (एमओपी) या जैविक खाद लगाएं।');
      fertilizerSuggestions.push({
        name: 'Muriate of Potash (60% K2O)',
        nameHindi: 'म्यूरिएट ऑफ पोटाश (60% K2O)',
        quantity: '30-40 kg per acre',
        quantityHindi: '30-40 किलो प्रति एकड़',
        timing: 'Apply 2-3 weeks after sowing',
        timingHindi: 'बुवाई के 2-3 सप्ताह बाद लगाएं'
      });
    } else if (kStatus === 'high') {
      recommendations.push('Potassium is sufficient. No additional potash fertilizer needed.');
      recommendationsHindi.push('पोटेशियम पर्याप्त है। अतिरिक्त पोटाश उर्वरक की आवश्यकता नहीं है।');
    } else {
      recommendations.push('Potassium levels are ideal. Maintain current practices.');
      recommendationsHindi.push('पोटेशियम का स्तर आदर्श है। वर्तमान प्रथाओं को बनाए रखें।');
    }

    // pH recommendations
    if (pHStatus === 'acidic') {
      recommendations.push('Soil is acidic. Apply lime (2-3 tons per acre) to raise pH.');
      recommendationsHindi.push('मिट्टी अम्लीय है। पीएच बढ़ाने के लिए चूना (2-3 टन प्रति एकड़) लगाएं।');
    } else if (pHStatus === 'alkaline') {
      recommendations.push('Soil is alkaline. Add gypsum or sulfur to lower pH.');
      recommendationsHindi.push('मिट्टी क्षारीय है। पीएच कम करने के लिए जिप्सम या सल्फर मिलाएं।');
    } else {
      recommendations.push('Soil pH is in the optimal range for most crops.');
      recommendationsHindi.push('मिट्टी का पीएच अधिकांश फसलों के लिए इष्टतम सीमा में है।');
    }

    // Add organic matter recommendation
    recommendations.push('Incorporate organic matter like farmyard manure or compost to improve soil health.');
    recommendationsHindi.push('मिट्टी के स्वास्थ्य में सुधार के लिए गोबर की खाद या कम्पोस्ट जैसे जैविक पदार्थ मिलाएं।');

    setResult({
      nitrogenStatus: nStatus,
      phosphorusStatus: pStatus,
      potassiumStatus: kStatus,
      pHStatus: pHStatus,
      overallHealth: nStatus === 'optimal' && pStatus === 'optimal' && kStatus === 'optimal' && pHStatus === 'neutral'
        ? 'Excellent - Your soil is in optimal condition!'
        : nStatus !== 'optimal' || pStatus !== 'optimal' || kStatus !== 'optimal'
        ? 'Needs Attention - Some nutrients require correction'
        : 'Good - Minor adjustments recommended',
      overallHealthHindi: nStatus === 'optimal' && pStatus === 'optimal' && kStatus === 'optimal' && pHStatus === 'neutral'
        ? 'उत्कृष्ट - आपकी मिट्टी इष्टतम स्थिति में है!'
        : nStatus !== 'optimal' || pStatus !== 'optimal' || kStatus !== 'optimal'
        ? 'ध्यान की आवश्यकता - कुछ पोषक तत्वों में सुधार की आवश्यकता है'
        : 'अच्छा - मामूली समायोजन की सिफारिश की गई',
      recommendations,
      recommendationsHindi,
      fertilizerSuggestions
    });

    setShowResult(true);
  };

  const getStatusColor = (status: string) => {
    if (status === 'optimal' || status === 'neutral') return 'text-green-500';
    if (status === 'low' || status === 'acidic' || status === 'alkaline') return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusBg = (status: string) => {
    if (status === 'optimal' || status === 'neutral') return 'bg-green-500/10 border-green-500';
    if (status === 'low' || status === 'acidic' || status === 'alkaline') return 'bg-yellow-500/10 border-yellow-500';
    return 'bg-red-500/10 border-red-500';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'optimal' || status === 'neutral') return <CheckCircle2 className="w-6 h-6 text-green-500" />;
    return <AlertCircle className="w-6 h-6 text-yellow-500" />;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg border-2 border-[#1B5E20]`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#FBC02D] p-2 rounded-lg">
            <Droplet className="w-5 h-5 text-[#1B5E20]" />
          </div>
          <h2 className="text-lg">
            {language === 'hi' ? 'मिट्टी परीक्षण (एनपीके विश्लेषण)' : 'Soil Test (NPK Analysis)'}
          </h2>
        </div>
        <p className="opacity-70 text-sm">
          {language === 'hi'
            ? 'अपने मिट्टी के एनपीके मान दर्ज करें और व्यक्तिगत सिफारिशें प्राप्त करें'
            : 'Enter your soil NPK values and get personalized recommendations'}
        </p>
      </div>

      {/* Input Form */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h3 className="text-base mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#1B5E20]" />
          {language === 'hi' ? 'मिट्टी परीक्षण मान दर्ज करें' : 'Enter Soil Test Values'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nitrogen */}
          <div className="space-y-1.5">
            <Label htmlFor="nitrogen" className="text-sm flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-green-600" />
              {language === 'hi' ? 'नाइट्रोजन (N)' : 'Nitrogen (N)'}
            </Label>
            <Input
              id="nitrogen"
              type="number"
              placeholder={language === 'hi' ? 'किलो/हेक्टेयर' : 'kg/ha'}
              value={npkValues.nitrogen}
              onChange={(e) => handleInputChange('nitrogen', e.target.value)}
              className="text-sm h-9 border-2 border-gray-300 focus:border-[#1B5E20]"
            />
            <p className="text-xs opacity-60">
              {language === 'hi' ? 'सामान्य सीमा: 200-400 किलो/हेक्टेयर' : 'Normal range: 200-400 kg/ha'}
            </p>
          </div>

          {/* Phosphorus */}
          <div className="space-y-1.5">
            <Label htmlFor="phosphorus" className="text-sm flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-orange-600" />
              {language === 'hi' ? 'फास्फोरस (P)' : 'Phosphorus (P)'}
            </Label>
            <Input
              id="phosphorus"
              type="number"
              placeholder={language === 'hi' ? 'किलो/हेक्टेयर' : 'kg/ha'}
              value={npkValues.phosphorus}
              onChange={(e) => handleInputChange('phosphorus', e.target.value)}
              className="text-sm h-9 border-2 border-gray-300 focus:border-[#1B5E20]"
            />
            <p className="text-xs opacity-60">
              {language === 'hi' ? 'सामान्य सीमा: 10-25 किलो/हेक्टेयर' : 'Normal range: 10-25 kg/ha'}
            </p>
          </div>

          {/* Potassium */}
          <div className="space-y-1.5">
            <Label htmlFor="potassium" className="text-sm flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-600" />
              {language === 'hi' ? 'पोटेशियम (K)' : 'Potassium (K)'}
            </Label>
            <Input
              id="potassium"
              type="number"
              placeholder={language === 'hi' ? 'किलो/हेक्टेयर' : 'kg/ha'}
              value={npkValues.potassium}
              onChange={(e) => handleInputChange('potassium', e.target.value)}
              className="text-sm h-9 border-2 border-gray-300 focus:border-[#1B5E20]"
            />
            <p className="text-xs opacity-60">
              {language === 'hi' ? 'सामान्य सीमा: 100-280 किलो/हेक्टेयर' : 'Normal range: 100-280 kg/ha'}
            </p>
          </div>

          {/* pH */}
          <div className="space-y-1.5">
            <Label htmlFor="pH" className="text-sm flex items-center gap-1.5">
              <Droplet className="w-4 h-4 text-purple-600" />
              {language === 'hi' ? 'पीएच स्तर' : 'pH Level'}
            </Label>
            <Input
              id="pH"
              type="number"
              step="0.1"
              placeholder="pH"
              value={npkValues.pH}
              onChange={(e) => handleInputChange('pH', e.target.value)}
              className="text-sm h-9 border-2 border-gray-300 focus:border-[#1B5E20]"
            />
            <p className="text-xs opacity-60">
              {language === 'hi' ? 'सामान्य सीमा: 6.0-7.5' : 'Normal range: 6.0-7.5'}
            </p>
          </div>
        </div>

        <Button
          onClick={analyzeNPK}
          disabled={!npkValues.nitrogen || !npkValues.phosphorus || !npkValues.potassium || !npkValues.pH}
          className="w-full mt-4 bg-[#FBC02D] text-[#1B5E20] hover:bg-yellow-400 text-sm h-9"
        >
          <TrendingUp className="w-4 h-4 mr-1.5" />
          {language === 'hi' ? 'विश्लेषण करें' : 'Analyze Soil'}
        </Button>
      </div>

      {/* Results */}
      {showResult && result && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Overall Health */}
          <div className={`${isDarkMode ? 'bg-gradient-to-r from-[#1B5E20] to-green-700' : 'bg-gradient-to-r from-[#1B5E20] to-green-600'} rounded-2xl p-6 text-white shadow-lg`}>
            <h3 className="text-2xl mb-2">
              {language === 'hi' ? '📊 समग्र मिट्टी स्वास्थ्य' : '📊 Overall Soil Health'}
            </h3>
            <p className="text-xl opacity-90">
              {language === 'hi' ? result.overallHealthHindi : result.overallHealth}
            </p>
          </div>

          {/* NPK Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nitrogen Status */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg border-2 ${getStatusBg(result.nitrogenStatus)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Leaf className="w-8 h-8 text-green-600" />
                  <h4 className="text-xl">{language === 'hi' ? 'नाइट्रोजन (N)' : 'Nitrogen (N)'}</h4>
                </div>
                {getStatusIcon(result.nitrogenStatus)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl">{npkValues.nitrogen}</span>
                <span className={`px-3 py-1 rounded-lg ${getStatusBg(result.nitrogenStatus)} ${getStatusColor(result.nitrogenStatus)} uppercase text-sm`}>
                  {result.nitrogenStatus === 'low' && (language === 'hi' ? 'कम' : 'LOW')}
                  {result.nitrogenStatus === 'optimal' && (language === 'hi' ? 'इष्टतम' : 'OPTIMAL')}
                  {result.nitrogenStatus === 'high' && (language === 'hi' ? 'अधिक' : 'HIGH')}
                </span>
              </div>
            </div>

            {/* Phosphorus Status */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg border-2 ${getStatusBg(result.phosphorusStatus)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-orange-600" />
                  <h4 className="text-xl">{language === 'hi' ? 'फास्फोरस (P)' : 'Phosphorus (P)'}</h4>
                </div>
                {getStatusIcon(result.phosphorusStatus)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl">{npkValues.phosphorus}</span>
                <span className={`px-3 py-1 rounded-lg ${getStatusBg(result.phosphorusStatus)} ${getStatusColor(result.phosphorusStatus)} uppercase text-sm`}>
                  {result.phosphorusStatus === 'low' && (language === 'hi' ? 'कम' : 'LOW')}
                  {result.phosphorusStatus === 'optimal' && (language === 'hi' ? 'इष्टतम' : 'OPTIMAL')}
                  {result.phosphorusStatus === 'high' && (language === 'hi' ? 'अधिक' : 'HIGH')}
                </span>
              </div>
            </div>

            {/* Potassium Status */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg border-2 ${getStatusBg(result.potassiumStatus)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <h4 className="text-xl">{language === 'hi' ? 'पोटेशियम (K)' : 'Potassium (K)'}</h4>
                </div>
                {getStatusIcon(result.potassiumStatus)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl">{npkValues.potassium}</span>
                <span className={`px-3 py-1 rounded-lg ${getStatusBg(result.potassiumStatus)} ${getStatusColor(result.potassiumStatus)} uppercase text-sm`}>
                  {result.potassiumStatus === 'low' && (language === 'hi' ? 'कम' : 'LOW')}
                  {result.potassiumStatus === 'optimal' && (language === 'hi' ? 'इष्टतम' : 'OPTIMAL')}
                  {result.potassiumStatus === 'high' && (language === 'hi' ? 'अधिक' : 'HIGH')}
                </span>
              </div>
            </div>

            {/* pH Status */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg border-2 ${getStatusBg(result.pHStatus)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Droplet className="w-8 h-8 text-purple-600" />
                  <h4 className="text-xl">{language === 'hi' ? 'पीएच स्तर' : 'pH Level'}</h4>
                </div>
                {getStatusIcon(result.pHStatus)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl">{npkValues.pH}</span>
                <span className={`px-3 py-1 rounded-lg ${getStatusBg(result.pHStatus)} ${getStatusColor(result.pHStatus)} uppercase text-sm`}>
                  {result.pHStatus === 'acidic' && (language === 'hi' ? 'अम्लीय' : 'ACIDIC')}
                  {result.pHStatus === 'neutral' && (language === 'hi' ? 'तटस्थ' : 'NEUTRAL')}
                  {result.pHStatus === 'alkaline' && (language === 'hi' ? 'क्षारीय' : 'ALKALINE')}
                </span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-[#1B5E20]" />
              {language === 'hi' ? '✅ सिफारिशें' : '✅ Recommendations'}
            </h3>
            <ul className="space-y-3">
              {(language === 'hi' ? result.recommendationsHindi : result.recommendations).map((rec, index) => (
                <li key={index} className="flex gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#1B5E20] text-white rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-lg">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fertilizer Suggestions */}
          {result.fertilizerSuggestions.length > 0 && (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
              <h3 className="text-xl mb-4 flex items-center gap-2">
                <Sprout className="w-6 h-6 text-[#1B5E20]" />
                {language === 'hi' ? '🌾 उर्वरक सुझाव' : '🌾 Fertilizer Suggestions'}
              </h3>
              <div className="space-y-4">
                {result.fertilizerSuggestions.map((fert, index) => (
                  <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-[#FBC02D]`}>
                    <h4 className="text-lg mb-2">{language === 'hi' ? fert.nameHindi : fert.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm opacity-80">
                      <p>📦 <strong>{language === 'hi' ? 'मात्रा' : 'Quantity'}:</strong> {language === 'hi' ? fert.quantityHindi : fert.quantity}</p>
                      <p>⏰ <strong>{language === 'hi' ? 'समय' : 'Timing'}:</strong> {language === 'hi' ? fert.timingHindi : fert.timing}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Info Card */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-purple-900 to-purple-800' : 'bg-gradient-to-r from-purple-500 to-purple-600'} rounded-2xl p-6 text-white shadow-lg`}>
        <h3 className="text-xl mb-3">
          {language === 'hi' ? '💡 मिट्टी परीक्षण के बारे में' : '💡 About Soil Testing'}
        </h3>
        <p className="mb-2">
          {language === 'hi'
            ? 'मिट्टी परीक्षण साल में कम से कम एक बार करवाएं। यह आपको:'
            : 'Get your soil tested at least once a year. It helps you:'}
        </p>
        <ul className="space-y-1 ml-4">
          <li>• {language === 'hi' ? 'सही मात्रा में उर्वरक का उपयोग करने में मदद करता है' : 'Use the right amount of fertilizer'}</li>
          <li>• {language === 'hi' ? 'पैसे और संसाधनों की बचत करता है' : 'Save money and resources'}</li>
          <li>• {language === 'hi' ? 'फसल की पैदावार बढ़ाता है' : 'Increase crop yield'}</li>
          <li>• {language === 'hi' ? 'मिट्टी के स्वास्थ्य को बनाए रखता है' : 'Maintain soil health'}</li>
        </ul>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sprout, MapPin, Thermometer, Cloud, CheckCircle2, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface SoilRecommendationProps {
  language: 'en' | 'hi';
  isDarkMode: boolean;
}

interface FormData {
  soilType: string;
  season: string;
  region: string;
  rainfall: string;
}

interface CropRecommendation {
  crop: string;
  cropHindi: string;
  suitability: number;
  expectedYield: string;
  expectedYieldHindi: string;
  duration: string;
  durationHindi: string;
  waterRequirement: string;
  waterRequirementHindi: string;
  benefits: string[];
  benefitsHindi: string[];
  tips: string[];
  tipsHindi: string[];
}

export default function SoilRecommendation({ language, isDarkMode }: SoilRecommendationProps) {
  const [formData, setFormData] = useState<FormData>({
    soilType: '',
    season: '',
    region: '',
    rainfall: ''
  });
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [showResults, setShowResults] = useState(false);

  const soilTypes = [
    { value: 'alluvial', label: language === 'hi' ? 'जलोढ़ मिट्टी' : 'Alluvial Soil' },
    { value: 'black', label: language === 'hi' ? 'काली मिट्टी (रेगुर)' : 'Black Soil (Regur)' },
    { value: 'red', label: language === 'hi' ? 'लाल मिट्टी' : 'Red Soil' },
    { value: 'laterite', label: language === 'hi' ? 'लैटेराइट मिट्टी' : 'Laterite Soil' },
    { value: 'sandy', label: language === 'hi' ? 'रेतीली मिट्टी' : 'Sandy Soil' },
    { value: 'clayey', label: language === 'hi' ? 'चिकनी मिट्टी' : 'Clayey Soil' }
  ];

  const seasons = [
    { value: 'kharif', label: language === 'hi' ? 'खरीफ (जून-अक्टूबर)' : 'Kharif (Jun-Oct)' },
    { value: 'rabi', label: language === 'hi' ? 'रबी (नवंबर-मार्च)' : 'Rabi (Nov-Mar)' },
    { value: 'zaid', label: language === 'hi' ? 'जायद (मार्च-जून)' : 'Zaid (Mar-Jun)' },
    { value: 'perennial', label: language === 'hi' ? 'बारहमासी' : 'Perennial' }
  ];

  const regions = [
    { value: 'north', label: language === 'hi' ? 'उत्तर भारत' : 'North India' },
    { value: 'south', label: language === 'hi' ? 'दक्षिण भारत' : 'South India' },
    { value: 'east', label: language === 'hi' ? 'पूर्व भारत' : 'East India' },
    { value: 'west', label: language === 'hi' ? 'पश्चिम भारत' : 'West India' },
    { value: 'central', label: language === 'hi' ? 'मध्य भारत' : 'Central India' }
  ];

  const rainfallLevels = [
    { value: 'low', label: language === 'hi' ? 'कम (< 75 सेमी)' : 'Low (< 75 cm)' },
    { value: 'medium', label: language === 'hi' ? 'मध्यम (75-150 सेमी)' : 'Medium (75-150 cm)' },
    { value: 'high', label: language === 'hi' ? 'अधिक (> 150 सेमी)' : 'High (> 150 cm)' }
  ];

  // Mock crop database
  const cropDatabase: Record<string, CropRecommendation[]> = {
    alluvial: [
      {
        crop: 'Rice (Paddy)',
        cropHindi: 'धान',
        suitability: 95,
        expectedYield: '25-30 quintals/acre',
        expectedYieldHindi: '25-30 क्विंटल/एकड़',
        duration: '120-150 days',
        durationHindi: '120-150 दिन',
        waterRequirement: 'High (Flooded conditions)',
        waterRequirementHindi: 'अधिक (जलभराव स्थिति)',
        benefits: [
          'Excellent for alluvial soil',
          'High market demand',
          'Multiple varieties available',
          'Good profit margins'
        ],
        benefitsHindi: [
          'जलोढ़ मिट्टी के लिए उत्कृष्ट',
          'उच्च बाजार मांग',
          'कई किस्में उपलब्ध',
          'अच्छा लाभ मार्जिन'
        ],
        tips: [
          'Ensure proper water management',
          'Use certified seeds',
          'Apply fertilizers in split doses',
          'Control weeds in early stages'
        ],
        tipsHindi: [
          'उचित जल प्रबंधन सुनिश्चित करें',
          'प्रमाणित बीज का उपयोग करें',
          'विभाजित खुराक में उर्वरक लगाएं',
          'प्रारंभिक चरण में खरपतवार नियंत्रण करें'
        ]
      },
      {
        crop: 'Wheat',
        cropHindi: 'गेहूं',
        suitability: 90,
        expectedYield: '18-22 quintals/acre',
        expectedYieldHindi: '18-22 क्विंटल/एकड़',
        duration: '120-140 days',
        durationHindi: '120-140 दिन',
        waterRequirement: 'Medium (4-5 irrigations)',
        waterRequirementHindi: 'मध्यम (4-5 सिंचाई)',
        benefits: [
          'Staple crop with stable prices',
          'Well-suited for alluvial soil',
          'Good winter crop',
          'Mechanization possible'
        ],
        benefitsHindi: [
          'स्थिर कीमतों के साथ मुख्य फसल',
          'जलोढ़ मिट्टी के लिए उपयुक्त',
          'अच्छी शीतकालीन फसल',
          'मशीनीकरण संभव'
        ],
        tips: [
          'Sow at right time (Nov-Dec)',
          'Ensure proper seed rate',
          'Apply timely irrigation',
          'Monitor for rust diseases'
        ],
        tipsHindi: [
          'सही समय पर बुवाई करें (नवंबर-दिसंबर)',
          'उचित बीज दर सुनिश्चित करें',
          'समय पर सिंचाई करें',
          'रतुआ रोगों की निगरानी करें'
        ]
      },
      {
        crop: 'Sugarcane',
        cropHindi: 'गन्ना',
        suitability: 88,
        expectedYield: '350-450 quintals/acre',
        expectedYieldHindi: '350-450 क्विंटल/एकड़',
        duration: '10-12 months',
        durationHindi: '10-12 महीने',
        waterRequirement: 'High (Regular irrigation)',
        waterRequirementHindi: 'अधिक (नियमित सिंचाई)',
        benefits: [
          'Long-term crop with good returns',
          'Suitable for alluvial soil',
          'Multiple by-products',
          'Assured market through sugar mills'
        ],
        benefitsHindi: [
          'अच्छे रिटर्न के साथ दीर्घकालिक फसल',
          'जलोढ़ मिट्टी के लिए उपयुक्त',
          'कई उप-उत्पाद',
          'चीनी मिलों के माध्यम से सुनिश्चित बाजार'
        ],
        tips: [
          'Use healthy seed canes',
          'Maintain proper spacing',
          'Apply organic manure',
          'Control borers and other pests'
        ],
        tipsHindi: [
          'स्वस्थ बीज गन्ने का उपयोग करें',
          'उचित दूरी बनाए रखें',
          'जैविक खाद लगाएं',
          'बेधक और अन्य कीटों को नियंत्रित करें'
        ]
      }
    ],
    black: [
      {
        crop: 'Cotton',
        cropHindi: 'कपास',
        suitability: 95,
        expectedYield: '12-15 quintals/acre',
        expectedYieldHindi: '12-15 क्विंटल/एकड़',
        duration: '150-180 days',
        durationHindi: '150-180 दिन',
        waterRequirement: 'Medium (3-4 irrigations)',
        waterRequirementHindi: 'मध्यम (3-4 सिंचाई)',
        benefits: [
          'Ideal for black cotton soil',
          'High market value',
          'Cash crop with good returns',
          'Cotton seeds are valuable by-product'
        ],
        benefitsHindi: [
          'काली कपास मिट्टी के लिए आदर्श',
          'उच्च बाजार मूल्य',
          'अच्छे रिटर्न के साथ नकदी फसल',
          'कपास के बीज मूल्यवान उप-उत्पाद हैं'
        ],
        tips: [
          'Use Bt cotton for better yield',
          'Monitor for bollworm',
          'Ensure proper drainage',
          'Apply micronutrients'
        ],
        tipsHindi: [
          'बेहतर उपज के लिए बीटी कपास का उपयोग करें',
          'बॉलवर्म की निगरानी करें',
          'उचित जल निकासी सुनिश्चित करें',
          'सूक्ष्म पोषक तत्व लगाएं'
        ]
      },
      {
        crop: 'Soybean',
        cropHindi: 'सोयाबीन',
        suitability: 92,
        expectedYield: '10-14 quintals/acre',
        expectedYieldHindi: '10-14 क्विंटल/एकड़',
        duration: '90-110 days',
        durationHindi: '90-110 दिन',
        waterRequirement: 'Medium (Rainfed + 1-2 irrigation)',
        waterRequirementHindi: 'मध्यम (वर्षा आधारित + 1-2 सिंचाई)',
        benefits: [
          'Nitrogen-fixing crop',
          'Good for soil health',
          'High protein content',
          'Multiple uses (oil, meal, food)'
        ],
        benefitsHindi: [
          'नाइट्रोजन स्थिरीकरण फसल',
          'मिट्टी के स्वास्थ्य के लिए अच्छा',
          'उच्च प्रोटीन सामग्री',
          'कई उपयोग (तेल, भोजन, खाद्य)'
        ],
        tips: [
          'Sow early in monsoon',
          'Use rhizobium culture',
          'Control weeds early',
          'Harvest at right maturity'
        ],
        tipsHindi: [
          'मानसून में जल्दी बुवाई करें',
          'राइजोबियम कल्चर का उपयोग करें',
          'जल्दी खरपतवार नियंत्रण करें',
          'सही परिपक्वता पर कटाई करें'
        ]
      },
      {
        crop: 'Gram (Chickpea)',
        cropHindi: 'चना',
        suitability: 90,
        expectedYield: '8-12 quintals/acre',
        expectedYieldHindi: '8-12 क्विंटल/एकड़',
        duration: '100-120 days',
        durationHindi: '100-120 दिन',
        waterRequirement: 'Low (1-2 irrigations)',
        waterRequirementHindi: 'कम (1-2 सिंचाई)',
        benefits: [
          'Excellent rabi pulse crop',
          'Improves soil fertility',
          'High protein legume',
          'Low water requirement'
        ],
        benefitsHindi: [
          'उत्कृष्ट रबी दलहन फसल',
          'मिट्टी की उर्वरता में सुधार',
          'उच्च प्रोटीन दलहन',
          'कम पानी की आवश्यकता'
        ],
        tips: [
          'Sow in October-November',
          'Use wilt-resistant varieties',
          'Avoid waterlogging',
          'Control pod borer'
        ],
        tipsHindi: [
          'अक्टूबर-नवंबर में बुवाई करें',
          'उकठा प्रतिरोधी किस्मों का उपयोग करें',
          'जलभराव से बचें',
          'फली बेधक को नियंत्रित करें'
        ]
      }
    ],
    red: [
      {
        crop: 'Groundnut',
        cropHindi: 'मूंगफली',
        suitability: 93,
        expectedYield: '10-15 quintals/acre',
        expectedYieldHindi: '10-15 क्विंटल/एकड़',
        duration: '100-120 days',
        durationHindi: '100-120 दिन',
        waterRequirement: 'Medium (3-4 irrigations)',
        waterRequirementHindi: 'मध्यम (3-4 सिंचाई)',
        benefits: [
          'Well-suited for red soil',
          'Oilseed crop with good market',
          'Improves soil structure',
          'Short duration crop'
        ],
        benefitsHindi: [
          'लाल मिट्टी के लिए उपयुक्त',
          'अच्छे बाजार के साथ तिलहन फसल',
          'मिट्टी की संरचना में सुधार',
          'कम अवधि की फसल'
        ],
        tips: [
          'Use calcium fertilizers',
          'Maintain proper moisture',
          'Control leaf miner and tikka',
          'Harvest when leaves turn yellow'
        ],
        tipsHindi: [
          'कैल्शियम उर्वरकों का उपयोग करें',
          'उचित नमी बनाए रखें',
          'पत्ती खनक और टिक्का नियंत्रित करें',
          'पत्तियां पीली होने पर कटाई करें'
        ]
      },
      {
        crop: 'Millets (Bajra/Ragi)',
        cropHindi: 'बाजरा/रागी',
        suitability: 90,
        expectedYield: '8-12 quintals/acre',
        expectedYieldHindi: '8-12 क्विंटल/एकड़',
        duration: '75-90 days',
        durationHindi: '75-90 दिन',
        waterRequirement: 'Low (Rainfed)',
        waterRequirementHindi: 'कम (वर्षा आधारित)',
        benefits: [
          'Drought-resistant crop',
          'Rich in nutrients',
          'Climate-resilient',
          'Low input costs'
        ],
        benefitsHindi: [
          'सूखा प्रतिरोधी फसल',
          'पोषक तत्वों से भरपूर',
          'जलवायु लचीला',
          'कम इनपुट लागत'
        ],
        tips: [
          'Sow with first monsoon rains',
          'Use drought-tolerant varieties',
          'Minimal fertilizer needed',
          'Control birds during grain formation'
        ],
        tipsHindi: [
          'पहली मानसून बारिश के साथ बुवाई करें',
          'सूखा सहिष्णु किस्मों का उपयोग करें',
          'न्यूनतम उर्वरक की आवश्यकता',
          'अनाज निर्माण के दौरान पक्षियों को नियंत्रित करें'
        ]
      },
      {
        crop: 'Pulses (Tur/Arhar)',
        cropHindi: 'अरहर/तुअर',
        suitability: 88,
        expectedYield: '6-10 quintals/acre',
        expectedYieldHindi: '6-10 क्विंटल/एकड़',
        duration: '150-180 days',
        durationHindi: '150-180 दिन',
        waterRequirement: 'Low (Rainfed + 1 irrigation)',
        waterRequirementHindi: 'कम (वर्षा आधारित + 1 सिंचाई)',
        benefits: [
          'Major pulse crop',
          'Nitrogen fixation',
          'Suitable for red soil',
          'Good market price'
        ],
        benefitsHindi: [
          'प्रमुख दलहन फसल',
          'नाइट्रोजन स्थिरीकरण',
          'लाल मिट्टी के लिए उपयुक्त',
          'अच्छा बाजार मूल्य'
        ],
        tips: [
          'Sow early in monsoon',
          'Use wilt-resistant varieties',
          'Intercrop with short-duration crops',
          'Control pod fly and borers'
        ],
        tipsHindi: [
          'मानसून में जल्दी बुवाई करें',
          'उकठा प्रतिरोधी किस्मों का उपयोग करें',
          'कम अवधि की फसलों के साथ अंतर्फसल',
          'फली मक्खी और बेधक को नियंत्रित करें'
        ]
      }
    ]
  };

  const getRecommendations = () => {
    // Get base recommendations based on soil type
    let crops = cropDatabase[formData.soilType] || cropDatabase.alluvial;

    // Filter based on season and other factors (simplified logic)
    // In production, this would use ML model with Gemini API

    setRecommendations(crops.slice(0, 3)); // Show top 3 crops
    setShowResults(true);
  };

  const isFormValid = formData.soilType && formData.season && formData.region && formData.rainfall;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg border-2 border-[#1B5E20]`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#FBC02D] p-2 rounded-lg">
            <Sprout className="w-5 h-5 text-[#1B5E20]" />
          </div>
          <h2 className="text-lg">
            {language === 'hi' ? 'फसल सिफारिश प्रणाली' : 'Crop Recommendation System'}
          </h2>
        </div>
        <p className="opacity-70 text-sm">
          {language === 'hi'
            ? 'अपनी मिट्टी और जलवायु के आधार पर सर्वोत्तम फसल चुनें'
            : 'Choose the best crops based on your soil and climate'}
        </p>
      </div>

      {/* Input Form */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h3 className="text-base mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#1B5E20]" />
          {language === 'hi' ? 'अपनी जानकारी दर्ज करें' : 'Enter Your Details'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Soil Type */}
          <div className="space-y-1.5">
            <Label className="text-sm">
              {language === 'hi' ? '🌍 मिट्टी का प्रकार' : '🌍 Soil Type'}
            </Label>
            <Select value={formData.soilType} onValueChange={(value) => setFormData(prev => ({ ...prev, soilType: value }))}>
              <SelectTrigger className="text-sm h-9 border-2">
                <SelectValue placeholder={language === 'hi' ? 'मिट्टी का प्रकार चुनें' : 'Select soil type'} />
              </SelectTrigger>
              <SelectContent>
                {soilTypes.map(soil => (
                  <SelectItem key={soil.value} value={soil.value} className="text-sm">
                    {soil.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Season */}
          <div className="space-y-1.5">
            <Label className="text-sm">
              {language === 'hi' ? '🌦️ मौसम/सीजन' : '🌦️ Season'}
            </Label>
            <Select value={formData.season} onValueChange={(value) => setFormData(prev => ({ ...prev, season: value }))}>
              <SelectTrigger className="text-sm h-9 border-2">
                <SelectValue placeholder={language === 'hi' ? 'मौसम चुनें' : 'Select season'} />
              </SelectTrigger>
              <SelectContent>
                {seasons.map(season => (
                  <SelectItem key={season.value} value={season.value} className="text-sm">
                    {season.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Region */}
          <div className="space-y-1.5">
            <Label className="text-sm">
              {language === 'hi' ? '📍 क्षेत्र' : '📍 Region'}
            </Label>
            <Select value={formData.region} onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}>
              <SelectTrigger className="text-sm h-9 border-2">
                <SelectValue placeholder={language === 'hi' ? 'क्षेत्र चुनें' : 'Select region'} />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region.value} value={region.value} className="text-sm">
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rainfall */}
          <div className="space-y-1.5">
            <Label className="text-sm">
              {language === 'hi' ? '☔ वार्षिक वर्षा' : '☔ Annual Rainfall'}
            </Label>
            <Select value={formData.rainfall} onValueChange={(value) => setFormData(prev => ({ ...prev, rainfall: value }))}>
              <SelectTrigger className="text-sm h-9 border-2">
                <SelectValue placeholder={language === 'hi' ? 'वर्षा स्तर चुनें' : 'Select rainfall level'} />
              </SelectTrigger>
              <SelectContent>
                {rainfallLevels.map(rainfall => (
                  <SelectItem key={rainfall.value} value={rainfall.value} className="text-sm">
                    {rainfall.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={getRecommendations}
          disabled={!isFormValid}
          className="w-full mt-4 bg-[#FBC02D] text-[#1B5E20] hover:bg-yellow-400 text-sm h-9"
        >
          <Sprout className="w-4 h-4 mr-1.5" />
          {language === 'hi' ? 'सिफारिश प्राप्त करें' : 'Get Recommendations'}
        </Button>
      </div>

      {/* Results */}
      {showResults && recommendations.length > 0 && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Header */}
          <div className={`${isDarkMode ? 'bg-gradient-to-r from-[#1B5E20] to-green-700' : 'bg-gradient-to-r from-[#1B5E20] to-green-600'} rounded-2xl p-6 text-white shadow-lg`}>
            <h3 className="text-2xl mb-2">
              {language === 'hi' ? '🌾 आपके लिए सर्वोत्तम फसलें' : '🌾 Best Crops for You'}
            </h3>
            <p className="text-lg opacity-90">
              {language === 'hi'
                ? 'आपकी मिट्टी और जलवायु के आधार पर शीर्ष 3 सिफारिशें'
                : 'Top 3 recommendations based on your soil and climate'}
            </p>
          </div>

          {/* Crop Cards */}
          {recommendations.map((crop, index) => (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg border-2 border-[#1B5E20]`}
            >
              {/* Crop Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#FBC02D] p-3 rounded-xl">
                    <Sprout className="w-6 h-6 text-[#1B5E20]" />
                  </div>
                  <div>
                    <h4 className="text-2xl">{language === 'hi' ? crop.cropHindi : crop.crop}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">
                        {crop.suitability}% {language === 'hi' ? 'उपयुक्तता' : 'Suitability'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-green-500/10 px-4 py-2 rounded-lg border-2 border-green-500">
                    <span className="text-green-500 text-sm uppercase">
                      {language === 'hi' ? 'सिफारिश #' : 'Recommended #'}{index + 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Crop Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="opacity-70">{language === 'hi' ? 'अपेक्षित उपज' : 'Expected Yield'}</span>
                  </div>
                  <p className="text-lg">{language === 'hi' ? crop.expectedYieldHindi : crop.expectedYield}</p>
                </div>

                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-5 h-5 text-orange-600" />
                    <span className="opacity-70">{language === 'hi' ? 'अवधि' : 'Duration'}</span>
                  </div>
                  <p className="text-lg">{language === 'hi' ? crop.durationHindi : crop.duration}</p>
                </div>

                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className="w-5 h-5 text-blue-600" />
                    <span className="opacity-70">{language === 'hi' ? 'जल आवश्यकता' : 'Water Need'}</span>
                  </div>
                  <p className="text-lg">{language === 'hi' ? crop.waterRequirementHindi : crop.waterRequirement}</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h5 className="text-lg mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  {language === 'hi' ? 'लाभ' : 'Benefits'}
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {(language === 'hi' ? crop.benefitsHindi : crop.benefits).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Farming Tips */}
              <div>
                <h5 className="text-lg mb-3 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-[#1B5E20]" />
                  {language === 'hi' ? '🌱 खेती के सुझाव' : '🌱 Farming Tips'}
                </h5>
                <ul className="space-y-2">
                  {(language === 'hi' ? crop.tipsHindi : crop.tips).map((tip, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#1B5E20] text-white rounded-full flex items-center justify-center text-sm">
                        {idx + 1}
                      </span>
                      <span className="flex-1">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-green-900 to-green-800' : 'bg-gradient-to-r from-green-500 to-green-600'} rounded-2xl p-6 text-white shadow-lg`}>
        <h3 className="text-xl mb-3">
          {language === 'hi' ? '💡 महत्वपूर्ण जानकारी' : '💡 Important Information'}
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              {language === 'hi'
                ? 'ये सिफारिशें एआई-संचालित विश्लेषण पर आधारित हैं'
                : 'These recommendations are based on AI-powered analysis'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              {language === 'hi'
                ? 'बुवाई से पहले स्थानीय कृषि विशेषज्ञों से परामर्श करें'
                : 'Consult local agricultural experts before sowing'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              {language === 'hi'
                ? 'बाजार की मांग और कीमतों पर विचार करें'
                : 'Consider market demand and prices'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              {language === 'hi'
                ? 'फसल विविधीकरण जोखिम को कम करता है'
                : 'Crop diversification reduces risk'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

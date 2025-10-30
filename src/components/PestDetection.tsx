import React, { useState, useRef } from 'react';
import { Camera, Upload, X, CheckCircle, AlertTriangle, Loader2, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface PestDetectionProps {
  language: 'en' | 'hi';
  isDarkMode: boolean;
}

interface PestResult {
  pestName: string;
  pestNameHindi: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  description: string;
  descriptionHindi: string;
  treatment: string[];
  treatmentHindi: string[];
  preventiveMeasures: string[];
  preventiveMeasuresHindi: string[];
}

export default function PestDetection({ language, isDarkMode }: PestDetectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PestResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock pest detection results (In production, this would call Gemini Vision API)
  const mockPestResults: PestResult[] = [
    {
      pestName: 'Leaf Blight',
      pestNameHindi: 'पत्ती झुलसा रोग',
      severity: 'high',
      confidence: 92,
      description: 'A fungal disease that causes brown spots on leaves, leading to premature leaf drop.',
      descriptionHindi: 'एक फफूंद रोग जो पत्तियों पर भूरे धब्बे का कारण बनता है और पत्तियों के जल्दी गिरने का कारण बनता है।',
      treatment: [
        'Remove and destroy infected leaves immediately',
        'Apply copper-based fungicide every 7-10 days',
        'Ensure proper spacing between plants for air circulation',
        'Water plants at base, avoid wetting leaves'
      ],
      treatmentHindi: [
        'संक्रमित पत्तियों को तुरंत हटाएं और नष्ट करें',
        'हर 7-10 दिनों में तांबे आधारित कवकनाशी का छिड़काव करें',
        'हवा के संचार के लिए पौधों के बीच उचित दूरी सुनिश्चित करें',
        'पौधों को आधार पर पानी दें, पत्तियों को गीला करने से बचें'
      ],
      preventiveMeasures: [
        'Use disease-resistant seed varieties',
        'Practice crop rotation',
        'Maintain field hygiene',
        'Apply organic mulch'
      ],
      preventiveMeasuresHindi: [
        'रोग प्रतिरोधी बीज किस्मों का उपयोग करें',
        'फसल चक्र अपनाएं',
        'खेत की स्वच्छता बनाए रखें',
        'जैविक गीली घास लगाएं'
      ]
    },
    {
      pestName: 'Aphids Infestation',
      pestNameHindi: 'माहू का संक्रमण',
      severity: 'medium',
      confidence: 88,
      description: 'Small sap-sucking insects that cause leaf curling and stunted growth.',
      descriptionHindi: 'छोटे रस चूसने वाले कीड़े जो पत्तियों के मुड़ने और विकास रुकने का कारण बनते हैं।',
      treatment: [
        'Spray neem oil solution (5ml per liter of water)',
        'Use strong water spray to dislodge aphids',
        'Introduce natural predators like ladybugs',
        'Apply insecticidal soap'
      ],
      treatmentHindi: [
        'नीम तेल का घोल (5 मिली प्रति लीटर पानी) का छिड़काव करें',
        'माहू को हटाने के लिए तेज पानी की धार का उपयोग करें',
        'लेडीबग जैसे प्राकृतिक शिकारियों को पेश करें',
        'कीटनाशक साबुन लगाएं'
      ],
      preventiveMeasures: [
        'Plant companion crops like marigold',
        'Regular monitoring of plants',
        'Maintain plant health with proper nutrition',
        'Remove weeds regularly'
      ],
      preventiveMeasuresHindi: [
        'गेंदे जैसी सहयोगी फसलें लगाएं',
        'पौधों की नियमित निगरानी करें',
        'उचित पोषण से पौधे का स्वास्थ्य बनाए रखें',
        'नियमित रूप से खरपतवार हटाएं'
      ]
    },
    {
      pestName: 'Healthy Crop',
      pestNameHindi: 'स्वस्थ फसल',
      severity: 'low',
      confidence: 95,
      description: 'Your crop appears healthy with no visible signs of pests or diseases.',
      descriptionHindi: 'आपकी फसल स्वस्थ दिखाई देती है और कीटों या बीमारियों के कोई दृश्य संकेत नहीं हैं।',
      treatment: [
        'Continue current care practices',
        'Monitor regularly for any changes',
        'Maintain optimal watering schedule',
        'Ensure balanced nutrition'
      ],
      treatmentHindi: [
        'वर्तमान देखभाल प्रथाओं को जारी रखें',
        'किसी भी बदलाव के लिए नियमित निगरानी करें',
        'इष्टतम पानी देने का कार्यक्रम बनाए रखें',
        'संतुलित पोषण सुनिश्चित करें'
      ],
      preventiveMeasures: [
        'Continue good agricultural practices',
        'Maintain field cleanliness',
        'Use organic fertilizers',
        'Practice integrated pest management'
      ],
      preventiveMeasuresHindi: [
        'अच्छी कृषि प्रथाओं को जारी रखें',
        'खेत की स्वच्छता बनाए रखें',
        'जैविक उर्वरकों का उपयोग करें',
        'एकीकृत कीट प्रबंधन का अभ्यास करें'
      ]
    }
  ];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate API call to Gemini Vision API
    // In production: Call actual Gemini API with the image
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result - randomly select from mock data
    const randomResult = mockPestResults[Math.floor(Math.random() * mockPestResults.length)];
    setResult(randomResult);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 border-red-500';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500';
      case 'low': return 'bg-green-500/10 border-green-500';
      default: return 'bg-gray-500/10 border-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg border-2 border-[#1B5E20]`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#FBC02D] p-2 rounded-lg">
            <Camera className="w-5 h-5 text-[#1B5E20]" />
          </div>
          <h2 className="text-lg">
            {language === 'hi' ? 'कीट और रोग पहचान' : 'Pest & Disease Detection'}
          </h2>
        </div>
        <p className="opacity-70 text-sm">
          {language === 'hi'
            ? 'अपनी फसल की तस्वीर अपलोड करें और तुरंत एआई-संचालित विश्लेषण प्राप्त करें'
            : 'Upload your crop photo and get instant AI-powered analysis'}
        </p>
      </div>

      {/* Upload Section */}
      {!selectedImage ? (
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border-2 border-dashed border-[#1B5E20]`}>
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-[#FBC02D]/20 p-6 rounded-full">
                <Upload className="w-10 h-10 text-[#1B5E20]" />
              </div>
            </div>
            <h3 className="text-base">
              {language === 'hi' ? 'फसल की तस्वीर अपलोड करें' : 'Upload Crop Photo'}
            </h3>
            <p className="opacity-70 text-sm">
              {language === 'hi'
                ? 'JPG, PNG या JPEG फॉर्मेट में (अधिकतम 5MB)'
                : 'JPG, PNG or JPEG format (max 5MB)'}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="pest-image-upload"
            />
            <label htmlFor="pest-image-upload">
              <Button
                className="bg-[#1B5E20] text-white hover:bg-green-700 text-sm h-9 px-6 cursor-pointer"
                asChild
              >
                <span>
                  <Camera className="w-4 h-4 mr-1.5" />
                  {language === 'hi' ? 'तस्वीर चुनें' : 'Choose Photo'}
                </span>
              </Button>
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Image Preview */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">
                {language === 'hi' ? 'अपलोड की गई तस्वीर' : 'Uploaded Photo'}
              </h3>
              <Button
                onClick={handleReset}
                variant="ghost"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <X className="w-5 h-5 mr-2" />
                {language === 'hi' ? 'हटाएं' : 'Remove'}
              </Button>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center" style={{ maxHeight: '400px' }}>
              <img
                src={selectedImage}
                alt="Uploaded crop"
                className="max-w-full max-h-96 object-contain"
              />
            </div>
            {!result && !isAnalyzing && (
              <Button
                onClick={handleAnalyze}
                className="w-full mt-4 bg-[#FBC02D] text-[#1B5E20] hover:bg-yellow-400 text-lg py-6"
              >
                <Camera className="w-5 h-5 mr-2" />
                {language === 'hi' ? 'विश्लेषण शुरू करें' : 'Start Analysis'}
              </Button>
            )}
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg text-center`}>
              <Loader2 className="w-12 h-12 animate-spin text-[#1B5E20] mx-auto mb-4" />
              <h3 className="text-xl mb-2">
                {language === 'hi' ? 'एआई विश्लेषण चल रहा है...' : 'AI Analysis in Progress...'}
              </h3>
              <p className="opacity-70">
                {language === 'hi'
                  ? 'कृपया प्रतीक्षा करें जबकि हम आपकी फसल का विश्लेषण करते हैं'
                  : 'Please wait while we analyze your crop'}
              </p>
            </div>
          )}

          {/* Results */}
          {result && !isAnalyzing && (
            <div className="space-y-6">
              {/* Detection Result */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg border-2 ${getSeverityBg(result.severity)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {result.severity === 'low' ? (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    ) : (
                      <AlertTriangle className={`w-8 h-8 ${getSeverityColor(result.severity)}`} />
                    )}
                    <div>
                      <h3 className="text-2xl">
                        {language === 'hi' ? result.pestNameHindi : result.pestName}
                      </h3>
                      <p className="opacity-70">
                        {language === 'hi' ? 'विश्वास स्तर' : 'Confidence'}: {result.confidence}%
                      </p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${getSeverityBg(result.severity)}`}>
                    <span className={`${getSeverityColor(result.severity)} uppercase`}>
                      {result.severity === 'high' && (language === 'hi' ? 'गंभीर' : 'HIGH')}
                      {result.severity === 'medium' && (language === 'hi' ? 'मध्यम' : 'MEDIUM')}
                      {result.severity === 'low' && (language === 'hi' ? 'कम' : 'LOW')}
                    </span>
                  </div>
                </div>
                <p className="text-lg opacity-80">
                  {language === 'hi' ? result.descriptionHindi : result.description}
                </p>
              </div>

              {/* Treatment */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                <h3 className="text-xl mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-[#1B5E20]" />
                  {language === 'hi' ? '🌿 उपचार विधि' : '🌿 Treatment Method'}
                </h3>
                <ul className="space-y-3">
                  {(language === 'hi' ? result.treatmentHindi : result.treatment).map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#1B5E20] text-white rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span className="flex-1 text-lg">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preventive Measures */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                <h3 className="text-xl mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-[#1B5E20]" />
                  {language === 'hi' ? '🛡️ रोकथाम उपाय' : '🛡️ Preventive Measures'}
                </h3>
                <ul className="space-y-3">
                  {(language === 'hi' ? result.preventiveMeasuresHindi : result.preventiveMeasures).map((measure, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="flex-1 text-lg">{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={handleReset}
                  className="bg-[#1B5E20] text-white hover:bg-green-700 text-lg py-6"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {language === 'hi' ? 'नई तस्वीर अपलोड करें' : 'Upload New Photo'}
                </Button>
                <Button
                  onClick={handleAnalyze}
                  variant="outline"
                  className="border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white text-lg py-6"
                >
                  {language === 'hi' ? 'फिर से विश्लेषण करें' : 'Re-analyze'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Info Card */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-blue-800' : 'bg-gradient-to-r from-blue-500 to-blue-600'} rounded-2xl p-6 text-white shadow-lg`}>
        <h3 className="text-xl mb-3">
          {language === 'hi' ? '💡 बेहतर परिणाम के लिए सुझाव' : '💡 Tips for Better Results'}
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>{language === 'hi' ? 'तेज रोशनी में स्पष्ट तस्वीर लें' : 'Take clear photos in bright light'}</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>{language === 'hi' ? 'प्रभावित पत्तियों या भाग को करीब से दिखाएं' : 'Show affected leaves or parts closely'}</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>{language === 'hi' ? 'कई कोणों से तस्वीरें लें' : 'Capture photos from multiple angles'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

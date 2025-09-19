import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  TrendingUp, 
  Search, 
  Globe,
  BarChart3,
  Users,
  Target,
  ArrowUp,
  ExternalLink,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Eye,
  MousePointer,
  DollarSign
} from 'lucide-react';

interface SEODemoProps {
  isVisible: boolean;
  isLiveDemo?: boolean;
}

export function SEODemo({ isVisible, isLiveDemo = false }: SEODemoProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [metrics, setMetrics] = useState({
    organicTraffic: 0,
    keywordRankings: 0,
    backlinks: 0,
    conversionRate: 0
  });

  const presentationSlides = [
    {
      title: "SEO Strategy Overview",
      subtitle: "Comprehensive Search Engine Optimization",
      content: "Our proven SEO methodology delivers measurable results through strategic optimization techniques.",
      icon: Search,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Keyword Research & Analysis", 
      subtitle: "Target High-Value Search Terms",
      content: "We identify and target keywords that drive qualified traffic and conversions for your business.",
      icon: Target,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "On-Page Optimization",
      subtitle: "Content & Technical Excellence", 
      content: "Optimize your website's content, meta tags, and structure for maximum search engine visibility.",
      icon: Globe,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Link Building Campaign",
      subtitle: "Authority & Trust Building",
      content: "Build high-quality backlinks from authoritative sources to boost your domain authority.",
      icon: ExternalLink,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Performance Analytics",
      subtitle: "Data-Driven Results",
      content: "Track and measure your SEO success with comprehensive reporting and actionable insights.",
      icon: BarChart3,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  // Auto-cycle through presentation slides
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % presentationSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, presentationSlides.length]);

  // Update metrics based on current slide
  useEffect(() => {
    if (!isVisible) return;

    const targetMetrics = {
      organicTraffic: Math.min(95, (currentSlide + 1) * 20),
      keywordRankings: Math.min(88, (currentSlide + 1) * 18),
      backlinks: Math.min(92, (currentSlide + 1) * 19),
      conversionRate: Math.min(85, (currentSlide + 1) * 17)
    };

    const animateMetrics = () => {
      setMetrics(prev => ({
        organicTraffic: Math.min(targetMetrics.organicTraffic, prev.organicTraffic + 2),
        keywordRankings: Math.min(targetMetrics.keywordRankings, prev.keywordRankings + 2),
        backlinks: Math.min(targetMetrics.backlinks, prev.backlinks + 2),
        conversionRate: Math.min(targetMetrics.conversionRate, prev.conversionRate + 2)
      }));
    };

    const metricInterval = setInterval(animateMetrics, 100);
    
    setTimeout(() => clearInterval(metricInterval), 1000);

    return () => clearInterval(metricInterval);
  }, [currentSlide, isVisible]);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">SEO Analytics Pro</h3>
              <p className="text-xs opacity-90">Search Engine Optimization</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            <TrendingUp className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Presentation Slide */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">SEO Strategy Presentation</h4>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Presentation
            </div>
          </div>
          
          {/* Main Slide Content */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200"
          >
            <div className="text-center space-y-4">
              <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${presentationSlides[currentSlide].color} flex items-center justify-center text-white shadow-lg`}>
                {React.createElement(presentationSlides[currentSlide].icon, { className: "w-8 h-8" })}
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {presentationSlides[currentSlide].title}
                </h3>
                <p className="text-sm font-medium text-green-600 mb-3">
                  {presentationSlides[currentSlide].subtitle}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {presentationSlides[currentSlide].content}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2">
            {presentationSlides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-green-500 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Google Search Results Preview */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-blue-600" />
              Google Search Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Search Result Item */}
            <div className="p-2 bg-white rounded border shadow-sm">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-xs text-green-600 mb-1">
                    <Globe className="w-3 h-3" />
                    yourwebsite.com
                  </div>
                  <h5 className="text-sm font-medium text-blue-600 mb-1">
                    Your Business - Best Local Services
                  </h5>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    Leading provider of professional services in your area. Award-winning team...
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-xs text-yellow-600">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2 h-2 fill-current" />
                      ))}
                      <span className="ml-1">4.9</span>
                    </div>
                    <Badge className="text-xs bg-green-100 text-green-700">Rank #1</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-1 mb-2">
              <Users className="w-3 h-3 text-blue-600" />
              <span className="text-xs text-blue-600">Organic Traffic</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">+{metrics.organicTraffic}%</span>
                <ArrowUp className="w-3 h-3 text-green-500" />
              </div>
              <Progress value={metrics.organicTraffic} className="h-1" />
            </div>
          </div>

          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-1 mb-2">
              <Target className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">Rankings</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">+{metrics.keywordRankings}%</span>
                <ArrowUp className="w-3 h-3 text-green-500" />
              </div>
              <Progress value={metrics.keywordRankings} className="h-1" />
            </div>
          </div>

          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-1 mb-2">
              <ExternalLink className="w-3 h-3 text-purple-600" />
              <span className="text-xs text-purple-600">Backlinks</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">+{metrics.backlinks}%</span>
                <ArrowUp className="w-3 h-3 text-green-500" />
              </div>
              <Progress value={metrics.backlinks} className="h-1" />
            </div>
          </div>

          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-1 mb-2">
              <DollarSign className="w-3 h-3 text-orange-600" />
              <span className="text-xs text-orange-600">Conversions</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">+{metrics.conversionRate}%</span>
                <ArrowUp className="w-3 h-3 text-green-500" />
              </div>
              <Progress value={metrics.conversionRate} className="h-1" />
            </div>
          </div>
        </div>

        {/* Live Analytics Feed */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700">Live Analytics</span>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-ping"></div>
                <span className="text-xs text-green-600">Real-time</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  Page Views
                </span>
                <span className="font-medium">2,847</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <MousePointer className="w-3 h-3" />
                  Click Rate
                </span>
                <span className="font-medium">8.4%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Avg. Duration
                </span>
                <span className="font-medium">3:42</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Action */}
        <div className="text-center">
          <Button 
            size="sm" 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigateToService', { detail: 'seo' }));
            }}
          >
            <Search className="w-4 h-4 mr-2" />
            Explore SEO Solutions
          </Button>
        </div>
      </div>
    </div>
  );
}
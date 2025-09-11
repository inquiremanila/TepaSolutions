import { motion, useInView } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  Headphones, 
  Megaphone, 
  DollarSign, 
  Users,
  Package,
  Bot,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Target,
  Sparkles,
  Play,
  PauseCircle,
  ArrowLeft
} from 'lucide-react';
import { automationTypes, automationStats } from './data/automation-data';
import { useRef, useState, useEffect } from 'react';

const iconMap = {
  TrendingUp,
  Headphones,
  Megaphone,
  DollarSign,
  Users,
  Package
};

interface AutomationPageProps {
  onBackToMain: () => void;
}

export function AutomationPage({ onBackToMain }: AutomationPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBackToMain}
              className="gap-2"
            >
              <ArrowLeft className="size-4" />
              Back to Main Menu
            </Button>
            <div className="flex items-center gap-3">
              <Badge>Business Automation</Badge>
              <h1 className="text-xl font-bold">Automation Solutions</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Transform Your Business with
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Intelligent Automation
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Eliminate manual processes, reduce errors, and boost productivity with our comprehensive 
              automation solutions. We help businesses streamline operations and focus on growth.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {Object.entries(automationStats).map(([key, value], index) => (
              <motion.div
                key={key}
                className="text-center p-4 rounded-lg bg-card border"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold text-primary mb-2">{value}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Automation Types */}
          <div className="space-y-20">
            {automationTypes.map((automation, index) => (
              <AutomationShowcase key={automation.id} automation={automation} index={index} />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-20 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Automate Your Business?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join 500+ businesses that have transformed their operations with our automation solutions. 
              Start your automation journey today and see immediate results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                <Sparkles className="size-4 mr-2 group-hover:animate-spin" />
                Start Your Automation Journey
              </Button>
              <Button variant="outline" size="lg">
                Schedule Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AutomationShowcase({ automation, index }: { automation: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });
  const [currentProcess, setCurrentProcess] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const Icon = iconMap[automation.icon as keyof typeof iconMap];
  const isReversed = index % 2 === 1;

  // Auto-cycle through processes
  useEffect(() => {
    if (!isInView || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentProcess((prev) => (prev + 1) % automation.processes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView, isPlaying, automation.processes.length]);

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex items-center py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto ${
        isReversed ? 'lg:grid-flow-col-dense' : ''
      }`}>
        
        {/* Visual Demo */}
        <motion.div
          className={`flex justify-center ${isReversed ? 'lg:col-start-2' : ''}`}
          initial={{ x: isReversed ? 100 : -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative scale-75 sm:scale-90 lg:scale-100">
            <AutomationVisualDemo 
              automation={automation} 
              isVisible={isInView}
              currentProcess={currentProcess}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
            />
            {/* Glow Effect */}
            <div className={`absolute -inset-8 bg-gradient-to-r ${automation.color} opacity-20 rounded-xl blur-2xl -z-10`} />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className={`space-y-6 px-4 lg:px-0 ${isReversed ? 'lg:col-start-1' : ''}`}
          initial={{ x: isReversed ? -100 : 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>
            <Badge className="mb-4" variant="outline">
              <Icon className="size-3 mr-1" />
              Automation Solution
            </Badge>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {automation.title}
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              {automation.description}
            </p>
          </div>

          {/* Key Benefits */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Key Benefits</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {automation.benefits.map((benefit: string, idx: number) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <CheckCircle className="size-4 text-green-500 flex-shrink-0" />
                  {benefit}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(automation.metrics).map(([key, value]) => (
              <div key={key} className="p-3 bg-muted/50 rounded-lg border">
                <div className="text-lg font-bold text-primary">{value}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>

          <Button className="group">
            <Target className="size-4 mr-2 group-hover:rotate-45 transition-transform" />
            Inquire About This Implementation
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function AutomationVisualDemo({ 
  automation, 
  isVisible, 
  currentProcess, 
  isPlaying, 
  onTogglePlay 
}: { 
  automation: any; 
  isVisible: boolean; 
  currentProcess: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
}) {
  const Icon = iconMap[automation.icon as keyof typeof iconMap];
  
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl overflow-hidden border" style={{ width: '500px', height: '350px' }}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${automation.color} text-white p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">AutoFlow Pro</h3>
              <p className="text-xs opacity-90">{automation.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onTogglePlay}
              className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {isPlaying ? <PauseCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <Badge className="bg-white/20 text-white border-white/30">
              <Zap className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Process Flow */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">Automation Process</h4>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              {isPlaying ? 'Processing...' : 'Paused'}
            </div>
          </div>
          
          {/* Process Steps */}
          <div className="flex justify-between items-center">
            {automation.processes.map((process: any, index: number) => (
              <motion.div
                key={process.name}
                className="flex flex-col items-center text-center"
                animate={{
                  scale: index === currentProcess ? 1.1 : 1,
                  y: index === currentProcess ? -2 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-1 transition-all duration-300 ${
                    index <= currentProcess 
                      ? `bg-gradient-to-r ${automation.color}` 
                      : 'bg-gray-300'
                  }`}
                >
                  {index < currentProcess ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : index === currentProcess ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Bot className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-xs font-medium text-gray-700 max-w-16">
                  {process.name}
                </span>
              </motion.div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <Progress 
            value={(currentProcess / (automation.processes.length - 1)) * 100} 
            className="h-2" 
          />
        </div>

        {/* Current Process Details */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <div className={`w-6 h-6 rounded flex items-center justify-center text-white bg-gradient-to-r ${automation.color}`}>
                <Bot className="w-4 h-4" />
              </div>
              {automation.processes[currentProcess]?.name}
            </CardTitle>
            <p className="text-xs text-gray-600">
              {automation.processes[currentProcess]?.desc}
            </p>
          </CardHeader>
        </Card>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 bg-blue-50 rounded border border-blue-200">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-blue-600" />
              <span className="text-xs text-blue-600">Speed</span>
            </div>
            <div className="text-sm font-bold text-gray-900">{automation.metrics.timeReduction}</div>
          </div>
          <div className="p-2 bg-green-50 rounded border border-green-200">
            <div className="flex items-center gap-1 mb-1">
              <Target className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600">Accuracy</span>
            </div>
            <div className="text-sm font-bold text-gray-900">{automation.metrics.accuracyImprovement}</div>
          </div>
        </div>

        {/* Flow Visualization */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            <span className="text-xs text-gray-600">Input</span>
          </div>
          <ArrowRight className="w-3 h-3 text-gray-400" />
          <div className="flex items-center gap-1">
            <motion.div 
              className="w-2 h-2 bg-purple-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-xs text-gray-600">Process</span>
          </div>
          <ArrowRight className="w-3 h-3 text-gray-400" />
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Output</span>
          </div>
        </div>
      </div>
    </div>
  );
}
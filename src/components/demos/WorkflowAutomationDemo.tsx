import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { 
  Zap, 
  Users, 
  Mail, 
  TrendingUp, 
  Target, 
  Bot, 
  Clock, 
  DollarSign,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Calendar,
  MessageSquare,
  Database,
  Workflow,
  BrainCircuit,
  Sparkles
} from 'lucide-react';

interface WorkflowAutomationDemoProps {
  isVisible: boolean;
}

export function WorkflowAutomationDemo({ isVisible }: WorkflowAutomationDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [automationProgress, setAutomationProgress] = useState(0);
  const [activeMetric, setActiveMetric] = useState(0);

  const automationSteps = [
    {
      id: 1,
      title: "Data Collection",
      description: "Automatically gather data from multiple touchpoints",
      icon: <Database className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      details: ["Web forms", "APIs", "File uploads", "Database sync"]
    },
    {
      id: 2,
      title: "Process Trigger",
      description: "Smart triggers that initiate workflows automatically",
      icon: <BrainCircuit className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      details: ["Time-based", "Event-driven", "Condition-based", "User actions"]
    },
    {
      id: 3,
      title: "Task Automation",
      description: "Execute repetitive tasks without manual intervention",
      icon: <Bot className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      details: ["Email sending", "Data processing", "File management", "Notifications"]
    },
    {
      id: 4,
      title: "Decision Logic",
      description: "Intelligent routing and conditional processing",
      icon: <Workflow className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      details: ["If/then rules", "Multi-path routing", "Approval flows", "Escalations"]
    },
    {
      id: 5,
      title: "Integration & Sync",
      description: "Seamlessly connect with existing business tools",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-500",
      details: ["CRM sync", "Accounting tools", "Project management", "Communication platforms"]
    }
  ];

  const metrics = [
    {
      label: "Process Speed",
      value: "10x faster",
      improvement: "vs manual process",
      icon: <Clock className="w-4 h-4" />,
      color: "text-blue-600"
    },
    {
      label: "Error Reduction",
      value: "99.2%",
      improvement: "accuracy rate",
      icon: <CheckCircle className="w-4 h-4" />,
      color: "text-green-600"
    },
    {
      label: "Cost Savings",
      value: "$180K/year",
      improvement: "operational costs",
      icon: <DollarSign className="w-4 h-4" />,
      color: "text-purple-600"
    },
    {
      label: "Team Productivity",
      value: "60+ hrs/week",
      improvement: "time freed up",
      icon: <Sparkles className="w-4 h-4" />,
      color: "text-orange-600"
    }
  ];

  // Auto-play automation sequence
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % automationSteps.length);
      setAutomationProgress((prev) => {
        const newProgress = prev + 20;
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Cycle through metrics
  useEffect(() => {
    if (!isVisible) return;

    const metricInterval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 1500);

    return () => clearInterval(metricInterval);
  }, [isVisible]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg shadow-2xl overflow-hidden" style={{ width: '600px', height: '400px' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">WorkFlow Pro</h3>
              <p className="text-xs text-indigo-100">Business Process Automation</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            <Zap className="w-3 h-3 mr-1" />
            Live Automation
          </Badge>
        </div>
      </div>

      <div className="h-full p-4 space-y-4 overflow-y-auto">
        {/* Automation Pipeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">Business Workflow Pipeline</h4>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Processing...
            </div>
          </div>
          
          <div className="relative">
            <Progress value={automationProgress} className="h-2" />
            <div className="flex justify-between mt-2">
              {automationSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`flex flex-col items-center cursor-pointer ${
                    index === currentStep ? 'scale-110' : 'scale-100'
                  }`}
                  animate={{
                    scale: index === currentStep ? 1.1 : 1,
                    y: index === currentStep ? -2 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-1 bg-gradient-to-r ${
                      index <= currentStep ? step.color : 'from-gray-300 to-gray-400'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="text-xs text-center font-medium text-gray-700 max-w-16">
                    {step.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Step Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <div className={`w-6 h-6 rounded flex items-center justify-center text-white bg-gradient-to-r ${automationSteps[currentStep].color}`}>
                    {automationSteps[currentStep].icon}
                  </div>
                  {automationSteps[currentStep].title}
                </CardTitle>
                <p className="text-xs text-gray-600">{automationSteps[currentStep].description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-2">
                  {automationSteps[currentStep].details.map((detail, index) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-xs text-gray-700"
                    >
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {detail}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                index === activeMetric 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md' 
                  : 'bg-white border-gray-200'
              }`}
              animate={{
                scale: index === activeMetric ? 1.02 : 1,
                borderColor: index === activeMetric ? '#3B82F6' : '#E5E7EB'
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`${metric.color} ${index === activeMetric ? 'animate-pulse' : ''}`}>
                  {metric.icon}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {metric.improvement}
                </Badge>
              </div>
              <div className="text-lg font-bold text-gray-900">{metric.value}</div>
              <div className="text-xs text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* View More Section */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Bot className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="font-semibold text-gray-900">Explore All Automation Solutions</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Discover 6+ comprehensive automation types designed to transform your business processes
            </p>
            <Button 
              size="sm" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('navigateToAutomation'));
              }}
            >
              <ArrowRight className="w-4 h-4 mr-1" />
              Explore Automation Solutions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
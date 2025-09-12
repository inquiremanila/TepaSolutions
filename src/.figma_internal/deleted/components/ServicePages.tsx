import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { 
  ArrowLeft,
  Smartphone,
  Globe,
  Code,
  Search,
  Bot,
  CheckCircle,
  Star,
  Target,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Award,
  Sparkles,
  Headphones,
  Megaphone,
  Package
} from 'lucide-react';

interface ServicePageProps {
  service: 'app-dev' | 'web-app' | 'web-dev' | 'seo' | 'automation-sales' | 'automation-support' | 'automation-marketing' | 'automation-finance' | 'automation-hr' | 'automation-inventory';
  onBackToMain: () => void;
}

export function ServicePage({ service, onBackToMain }: ServicePageProps) {
  const serviceData = {
    'app-dev': {
      title: 'Mobile App Development',
      subtitle: 'Native & Cross-Platform Solutions',
      icon: Smartphone,
      color: 'from-blue-600 to-cyan-600',
      description: 'Transform your ideas into powerful mobile applications that engage users and drive business growth. We specialize in creating high-performance, user-friendly apps for iOS, Android, and cross-platform solutions.',
      features: [
        'Native iOS & Android Development',
        'Cross-Platform Solutions (React Native, Flutter)',
        'Progressive Web Apps (PWA)',
        'App Store Optimization',
        'Backend Integration & APIs',
        'Real-time Features & Push Notifications',
        'In-App Purchases & Monetization',
        'Analytics & Performance Monitoring'
      ],
      process: [
        { step: 'Discovery & Planning', desc: 'Understanding your requirements and target audience' },
        { step: 'UI/UX Design', desc: 'Creating intuitive and engaging user experiences' },
        { step: 'Development', desc: 'Building robust and scalable applications' },
        { step: 'Testing & QA', desc: 'Ensuring quality and performance across devices' },
        { step: 'Deployment', desc: 'Publishing to app stores and ongoing support' }
      ],
      stats: {
        'Apps Developed': '150+',
        'App Store Rating': '4.8/5',
        'Download Growth': '+280%',
        'Client Retention': '94%'
      },
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS']
    },
    'web-app': {
      title: 'Web Application Development',
      subtitle: 'Scalable & Modern Web Solutions',
      icon: Code,
      color: 'from-purple-600 to-indigo-600',
      description: 'Build powerful, scalable web applications that deliver exceptional user experiences. From simple dashboards to complex enterprise solutions, we create applications that grow with your business.',
      features: [
        'Single Page Applications (SPA)',
        'Progressive Web Apps (PWA)',
        'Real-time Collaboration Tools',
        'Database Design & Management',
        'API Development & Integration',
        'Cloud Deployment & Scaling',
        'Security & Authentication',
        'Performance Optimization'
      ],
      process: [
        { step: 'Requirements Analysis', desc: 'Defining functionality and technical specifications' },
        { step: 'Architecture Design', desc: 'Planning scalable and maintainable structure' },
        { step: 'Frontend Development', desc: 'Creating responsive and interactive interfaces' },
        { step: 'Backend Development', desc: 'Building robust server-side functionality' },
        { step: 'Testing & Launch', desc: 'Quality assurance and production deployment' }
      ],
      stats: {
        'Web Apps Built': '200+',
        'Uptime Achieved': '99.9%',
        'Load Time': '<2s',
        'User Satisfaction': '96%'
      },
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker']
    },
    'web-dev': {
      title: 'Website Development',
      subtitle: 'Professional & Converting Websites',
      icon: Globe,
      color: 'from-green-600 to-emerald-600',
      description: 'Create stunning, fast-loading websites that convert visitors into customers. From corporate websites to e-commerce platforms, we build digital experiences that represent your brand perfectly.',
      features: [
        'Responsive Design & Development',
        'E-commerce Solutions',
        'Content Management Systems',
        'SEO-Optimized Structure',
        'Performance Optimization',
        'Security Implementation',
        'Analytics Integration',
        'Maintenance & Support'
      ],
      process: [
        { step: 'Strategy & Planning', desc: 'Understanding your goals and target audience' },
        { step: 'Design & Wireframing', desc: 'Creating visual concepts and user flows' },
        { step: 'Development', desc: 'Building responsive and optimized websites' },
        { step: 'Content Integration', desc: 'Adding content and optimizing for search' },
        { step: 'Launch & Optimization', desc: 'Going live and continuous improvement' }
      ],
      stats: {
        'Websites Delivered': '300+',
        'Avg. Speed Score': '95/100',
        'Conversion Increase': '+180%',
        'SEO Improvement': '+250%'
      },
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'WordPress', 'Shopify', 'Vercel']
    },
    'seo': {
      title: 'SEO Solutions',
      subtitle: 'Dominate Search Results',
      icon: Search,
      color: 'from-orange-600 to-red-600',
      description: 'Increase your online visibility and drive organic traffic with our comprehensive SEO strategies. We help businesses rank higher, attract more qualified leads, and grow their digital presence.',
      features: [
        'Keyword Research & Strategy',
        'On-Page Optimization',
        'Technical SEO Audits',
        'Content Strategy & Creation',
        'Link Building Campaigns',
        'Local SEO Optimization',
        'Performance Monitoring',
        'Competitor Analysis'
      ],
      process: [
        { step: 'SEO Audit', desc: 'Comprehensive analysis of current performance' },
        { step: 'Strategy Development', desc: 'Creating customized optimization plan' },
        { step: 'Implementation', desc: 'Executing on-page and technical improvements' },
        { step: 'Content & Links', desc: 'Building authority through quality content' },
        { step: 'Monitor & Optimize', desc: 'Tracking results and continuous improvement' }
      ],
      stats: {
        'Avg. Ranking Increase': '+340%',
        'Organic Traffic Growth': '+280%',
        'Keyword Improvements': '+450%',
        'Client ROI': '+380%'
      },
      technologies: ['Google Analytics', 'Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'GTM']
    },
    'automation-sales': {
      title: 'Sales Process Automation',
      subtitle: 'End-to-End Sales Funnel Optimization',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      description: 'Transform your sales operations with intelligent automation that captures leads, nurtures prospects, and closes deals faster. Our sales automation solutions increase conversion rates by 40% while saving your team 60+ hours per week.',
      features: [
        'Multi-Channel Lead Capture',
        'AI-Powered Lead Scoring & Qualification',
        'Automated Email Nurture Sequences',
        'CRM Integration & Management',
        'Pipeline Automation & Progression',
        'Sales Performance Analytics',
        'Automated Follow-up Systems',
        'Deal Forecasting & Reporting'
      ],
      process: [
        { step: 'Sales Audit', desc: 'Analyzing current sales processes and identifying bottlenecks' },
        { step: 'Automation Strategy', desc: 'Designing custom workflows for lead capture to closure' },
        { step: 'System Integration', desc: 'Connecting CRM, email, and communication tools' },
        { step: 'Workflow Implementation', desc: 'Building and testing automated sequences' },
        { step: 'Optimization & Scale', desc: 'Monitoring performance and scaling successful workflows' }
      ],
      stats: {
        'Time Reduction': '85%',
        'Conversion Increase': '+40%',
        'Cost Savings': '$240K/year',
        'Response Speed': '95% faster'
      },
      technologies: ['HubSpot', 'Salesforce', 'Zapier', 'Pipedrive', 'ActiveCampaign', 'Make.com']
    },
    'automation-support': {
      title: 'Customer Support Automation',
      subtitle: 'Intelligent Helpdesk & Service Workflows',
      icon: Headphones,
      color: 'from-green-500 to-emerald-500',
      description: 'Deliver exceptional customer service 24/7 with intelligent support automation. Our solutions reduce response times by 80% while maintaining high customer satisfaction through smart routing and automated resolution.',
      features: [
        '24/7 Automated First Response',
        'AI-Powered Ticket Classification',
        'Smart Routing & Escalation',
        'Knowledge Base Integration',
        'Multi-Channel Support (Email, Chat, Phone)',
        'Performance Analytics & Reporting',
        'Customer Satisfaction Tracking',
        'Resolution Time Optimization'
      ],
      process: [
        { step: 'Support Assessment', desc: 'Evaluating current support processes and pain points' },
        { step: 'Workflow Design', desc: 'Creating intelligent routing and escalation rules' },
        { step: 'System Setup', desc: 'Implementing helpdesk automation and integrations' },
        { step: 'AI Training', desc: 'Training automated responses and classification' },
        { step: 'Monitor & Improve', desc: 'Tracking metrics and optimizing workflows' }
      ],
      stats: {
        'Response Time Reduction': '80%',
        'Resolution Accuracy': '95%',
        'Cost Savings': '$180K/year',
        'Customer Satisfaction': '+35%'
      },
      technologies: ['Zendesk', 'Freshdesk', 'Intercom', 'ServiceNow', 'Slack', 'Microsoft Teams']
    },
    'automation-marketing': {
      title: 'Marketing Campaign Automation',
      subtitle: 'Multi-Channel Marketing Workflows',
      icon: Megaphone,
      color: 'from-purple-500 to-pink-500',
      description: 'Scale your marketing efforts with personalized, multi-channel campaigns that nurture leads and drive conversions. Our marketing automation increases engagement by 5x while reducing manual work by 70%.',
      features: [
        'Behavioral Trigger Campaigns',
        'Customer Journey Mapping',
        'Dynamic Content Personalization',
        'Cross-Platform Campaign Sync',
        'A/B Testing & Optimization',
        'ROI Tracking & Attribution',
        'Lead Nurturing Sequences',
        'Social Media Automation'
      ],
      process: [
        { step: 'Marketing Analysis', desc: 'Understanding customer journeys and touchpoints' },
        { step: 'Campaign Strategy', desc: 'Designing personalized automation workflows' },
        { step: 'Platform Integration', desc: 'Connecting email, social, and advertising platforms' },
        { step: 'Campaign Deployment', desc: 'Launching automated marketing sequences' },
        { step: 'Performance Optimization', desc: 'Analyzing results and improving campaigns' }
      ],
      stats: {
        'Engagement Increase': '5x',
        'Time Savings': '70%',
        'ROI Improvement': '+320%',
        'Lead Quality': '+88%'
      },
      technologies: ['Mailchimp', 'HubSpot', 'Marketo', 'Pardot', 'Facebook Ads', 'Google Ads']
    },
    'automation-finance': {
      title: 'Financial Process Automation',
      subtitle: 'Accounting & Financial Workflow Optimization',
      icon: DollarSign,
      color: 'from-orange-500 to-red-500',
      description: 'Streamline your financial operations with automated invoicing, expense tracking, and reporting. Our solutions improve accuracy by 99.8% while reducing processing time by 90%, ensuring compliance and real-time visibility.',
      features: [
        'Automated Invoice Generation',
        'Real-Time Expense Tracking',
        'Payment Processing Integration',
        'Financial Report Automation',
        'Compliance & Audit Trails',
        'Budget Monitoring & Alerts',
        'Tax Preparation Automation',
        'Cash Flow Forecasting'
      ],
      process: [
        { step: 'Financial Audit', desc: 'Reviewing current processes and identifying inefficiencies' },
        { step: 'System Design', desc: 'Architecting automated financial workflows' },
        { step: 'Integration Setup', desc: 'Connecting accounting software and payment systems' },
        { step: 'Automation Deployment', desc: 'Implementing and testing financial workflows' },
        { step: 'Compliance & Monitoring', desc: 'Ensuring accuracy and regulatory compliance' }
      ],
      stats: {
        'Processing Speed': '8x faster',
        'Accuracy Rate': '99.8%',
        'Cost Reduction': '$450K/year',
        'Time Savings': '90%'
      },
      technologies: ['QuickBooks', 'Xero', 'SAP', 'NetSuite', 'Stripe', 'PayPal']
    },
    'automation-hr': {
      title: 'HR & Recruitment Automation',
      subtitle: 'Hiring & Employee Management Workflows',
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      description: 'Optimize your human resources processes with automated candidate screening, interview scheduling, and employee onboarding. Our HR automation reduces hiring time by 65% while improving candidate experience and employee satisfaction.',
      features: [
        'Automated Candidate Screening',
        'Interview Scheduling Optimization',
        'Onboarding Workflow Automation',
        'Performance Review Systems',
        'Employee Document Management',
        'Training & Development Tracking',
        'Leave Management Automation',
        'Compliance Monitoring'
      ],
      process: [
        { step: 'HR Process Review', desc: 'Analyzing current recruitment and HR workflows' },
        { step: 'Automation Planning', desc: 'Designing efficient HR automation strategies' },
        { step: 'System Integration', desc: 'Connecting HRIS, ATS, and communication tools' },
        { step: 'Workflow Implementation', desc: 'Building and testing HR automation sequences' },
        { step: 'Training & Optimization', desc: 'Staff training and continuous improvement' }
      ],
      stats: {
        'Hiring Speed': '3x faster',
        'Candidate Experience': '+65%',
        'Cost Savings': '$200K/year',
        'Process Accuracy': '92%'
      },
      technologies: ['BambooHR', 'Workday', 'ADP', 'Greenhouse', 'Lever', 'LinkedIn Recruiter']
    },
    'automation-inventory': {
      title: 'Supply Chain Automation',
      subtitle: 'Inventory & Logistics Optimization',
      icon: Package,
      color: 'from-teal-500 to-cyan-500',
      description: 'Optimize your supply chain with intelligent inventory management and automated procurement processes. Our solutions provide real-time visibility, reduce stockouts by 80%, and improve efficiency by 6x.',
      features: [
        'Real-Time Inventory Tracking',
        'Automated Reorder Points',
        'Supplier Communication Automation',
        'Demand Forecasting AI',
        'Quality Control Workflows',
        'Shipping & Logistics Automation',
        'Cost Optimization Analytics',
        'Multi-Location Management'
      ],
      process: [
        { step: 'Supply Chain Analysis', desc: 'Mapping current inventory and logistics processes' },
        { step: 'Optimization Strategy', desc: 'Designing intelligent automation workflows' },
        { step: 'System Integration', desc: 'Connecting ERP, WMS, and supplier systems' },
        { step: 'Automation Deployment', desc: 'Implementing smart inventory management' },
        { step: 'Performance Monitoring', desc: 'Tracking KPIs and optimizing operations' }
      ],
      stats: {
        'Efficiency Gain': '6x',
        'Stockout Reduction': '80%',
        'Cost Savings': '$380K/year',
        'Accuracy Rate': '96%'
      },
      technologies: ['Oracle SCM', 'SAP', 'Manhattan WMS', 'Fishbowl', 'TradeGecko', 'Cin7']
    }
  };

  const data = serviceData[service];
  
  // Safety check to prevent errors if service is not found
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested service could not be found.</p>
          <Button onClick={onBackToMain}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  
  const ServiceIcon = data.icon;

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
              <span className="hidden sm:inline">Back to Main Menu</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center gap-3">
              <Badge>Service</Badge>
              <h1 className="text-xl font-bold">{data.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${data.color} text-white mb-6`}>
              <ServiceIcon className="size-8" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              {data.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-4">{data.subtitle}</p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {data.description}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {Object.entries(data.stats).map(([key, value], index) => (
              <motion.div
                key={key}
                className="text-center p-6 rounded-xl bg-card border"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold text-primary mb-2">{value}</div>
                <div className="text-sm text-muted-foreground">{key}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features & Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Features */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-6">What We Deliver</h3>
              <div className="space-y-4">
                {data.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <CheckCircle className="size-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Process */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-6">Our Process</h3>
              <div className="space-y-4">
                {data.process.map((step, index) => (
                  <motion.div
                    key={step.step}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${data.color} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{step.step}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Technologies */}
          <motion.div
            className="mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8">Technologies We Use</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {data.technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  className="px-4 py-2 bg-card border rounded-full"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together. 
              We're here to turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={`group bg-gradient-to-r ${data.color}`}>
                <Sparkles className="size-4 mr-2 group-hover:animate-spin" />
                Start Your Project
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
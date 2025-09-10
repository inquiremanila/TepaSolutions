import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Upload, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { submitContactForm } from '../utils/api';
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  hasActions?: boolean;
  awaitingFeedback?: boolean;
}

interface TicketForm {
  name: string;
  contactNumber: string;
  email: string;
  message: string;
}

const initialBotMessage: Message = {
  id: '1',
  text: 'Hi! I\'m Tepabot, your digital assistant from Tepa Solutions. I\'m here to help answer questions about our services, career opportunities, events, and more.\n\nHow can I help you today?',
  isBot: true,
  timestamp: new Date()
};

const suggestedInquiries = [
  "What services do you offer?",
  "Are you hiring?",
  "Tell me about upcoming events",
  "I need technical support",
  "Investment opportunities"
];

const botResponses: Record<string, string> = {
  // Core Services
  'services': 'We offer App Development, Web Development, SEO Solutions, and Business Automation. Our team specializes in creating modern, scalable solutions for businesses of all sizes. Which specific service interests you most?',
  'app development': 'We develop both mobile and web applications tailored to your business needs using modern technologies like React Native, Flutter, and Progressive Web Apps. Our apps are built with scalability and user experience in mind. Do you have a specific app idea or requirement?',
  'web development': 'We create modern, responsive websites and web applications using the latest technologies like React, Node.js, Next.js, and cloud platforms. From simple business websites to complex web applications, we\'ve got you covered. What type of web solution are you looking for?',
  'seo': 'Our SEO services help improve your website\'s visibility and search rankings through keyword optimization, content strategy, technical SEO, and local SEO. We use data-driven approaches to increase your online presence. Are you looking to improve your current website\'s ranking?',
  'automation': 'Our business automation solutions cover sales, marketing, HR, finance, inventory, and support processes. We help businesses save time and reduce manual work through custom workflows, AI integration, and system integrations. Which business area would you like to automate?',
  
  // Pricing & Consultation
  'pricing': 'Our pricing varies based on project scope and requirements. We offer competitive rates with transparent pricing:\n\n• Basic websites: ₱50,000 - ₱150,000\n• Custom web apps: ₱200,000 - ₱800,000\n• Mobile apps: ₱300,000 - ₱1,200,000\n• Automation solutions: ₱100,000 - ₱500,000\n\nWould you like a detailed quote for your specific project?',
  'quote': 'I\'d be happy to help you get a detailed quote! To provide accurate pricing, I\'ll need to understand your specific requirements. Please share:\n\n• Type of project\n• Key features needed\n• Timeline expectations\n• Budget range\n\nOr would you prefer to schedule a free consultation with our team?',
  'consultation': 'We offer free initial consultations to understand your needs and provide recommendations. Our consultations typically include:\n\n• Project requirement analysis\n• Technology recommendations\n• Timeline and budget estimation\n• Solution architecture overview\n\nWould you like to schedule a consultation with our team?',
  'timeline': 'Project timelines vary based on complexity:\n\n• Simple websites: 2-4 weeks\n• Custom web applications: 6-12 weeks\n• Mobile applications: 8-16 weeks\n• Business automation: 4-12 weeks\n• Complex enterprise solutions: 3-6 months\n\nWe always provide detailed timelines during our consultation phase.',
  
  // Career & Jobs
  'jobs': 'Great news! We\'re actively hiring for several positions:\n\n🔹 Frontend Developer (2-4 years exp) - BGC, Taguig\n🔹 Backend Developer (3-5 years exp) - BGC, Taguig\n🔹 Frontend Developer Intern - Student/Fresh Graduate\n🔹 Backend Developer Intern - Student/Fresh Graduate\n\nWe offer competitive salaries, health insurance, flexible schedules, and continuous learning opportunities. Which position interests you?',
  'career': 'We\'re always looking for talented individuals to join our team! We offer:\n\n✅ Comprehensive health insurance\n✅ Flexible hybrid work options\n✅ Continuous learning budget\n✅ Collaborative team environment\n✅ Career growth opportunities\n\nAre you interested in full-time positions, internships, or volunteer opportunities?',
  'hiring': 'Yes, we\'re actively hiring! Current openings include:\n\n• Frontend Developer (React, TypeScript)\n• Backend Developer (Node.js, Python)\n• Frontend Developer Intern\n• Backend Developer Intern\n\nWe also have volunteer opportunities for our Educational Outreach Program. What type of opportunity are you looking for?',
  'internship': 'We have exciting internship opportunities for students and fresh graduates:\n\n📚 Frontend Developer Intern - Learn React, JavaScript, and modern web development\n📚 Backend Developer Intern - Gain experience in API design and server development\n\nOur interns work on real-world projects with experienced mentors. Both positions are based in BGC, Taguig. Are you interested in frontend or backend development?',
  'volunteer': 'Join our Educational Outreach Program! We\'re looking for volunteers to help bridge the digital divide by teaching coding and digital literacy to underserved communities.\n\n🎓 What you\'ll do:\n• Teach basic programming in schools\n• Conduct digital literacy workshops\n• Mentor students in coding projects\n• Help develop educational curriculum\n\n⏰ Commitment: 4-8 hours per month\n📍 Location: Various community centers and schools\n\nInterested in making a difference through technology education?',
  'salary': 'Our salary ranges are competitive and based on experience:\n\n• Frontend Developer: ₱50,000 - ₱120,000/month\n• Backend Developer: ₱60,000 - ₱140,000/month\n• Internships: ₱15,000 - ₱25,000/month (with learning stipend)\n\nWe also provide performance bonuses, health benefits, and professional development allowances. Would you like to know more about a specific position?',
  'benefits': 'We offer comprehensive benefits to all our team members:\n\n🏥 Health & Wellness: Complete health insurance and wellness programs\n⏰ Flexibility: Hybrid work options and flexible schedules\n📚 Learning: Continuous learning budget and skill development\n👥 Culture: Collaborative environment with passionate people\n💰 Financial: Competitive salary with performance bonuses\n\nWhat specific benefit would you like to know more about?',
  
  // Events & Education
  'events': 'We regularly host educational events for the tech community:\n\n🎮 Upcoming: Introduction to Roblox Game Development (Sept 27, 4-6 PM)\n💻 Workshop: HTML & CSS Fundamentals (Sept 20, 2-4 PM)\n📱 Coming Soon: Mobile App Development Bootcamp\n🏫 School Workshops: Roblox Game Development for Students\n\nAll events are free and open to the community. Which event interests you?',
  'workshop': 'Our workshops cover various tech topics for all skill levels:\n\n🎮 Roblox Game Development - Sept 27, 4-6 PM (Beginner friendly)\n💻 HTML & CSS Fundamentals - Sept 20, 2-4 PM (Complete beginners)\n📱 Mobile App Development Bootcamp - Coming soon!\n\nWorkshops are conducted via Zoom with limited capacity. Would you like to register for any upcoming workshop?',
  'roblox': 'Our Roblox Game Development workshop is perfect for beginners! You\'ll learn:\n\n🎯 Roblox Studio basics\n🎯 Lua scripting fundamentals\n🎯 Game design principles\n🎯 Publishing your first game\n\n📅 Date: September 27, 2025\n⏰ Time: 4:00 PM - 6:00 PM\n💻 Platform: Zoom Meeting\n👥 Capacity: 20 participants\n\nWould you like to register for this workshop?',
  'bootcamp': 'Our Mobile App Development Bootcamp is a comprehensive program covering:\n\n📱 React Native development\n📱 Flutter basics\n📱 App store deployment\n📱 UI/UX best practices\n📱 Backend integration\n\nThe bootcamp is currently in planning phase. Official details and registration will be announced soon. Would you like to be notified when registration opens?',
  
  // Investment & Business
  'investment': 'Tepa Solutions is experiencing exceptional growth and exploring investment opportunities! Our highlights:\n\n📈 185% YoY revenue growth (2024)\n🤝 94% client retention rate\n🌏 3x market expansion (2022-2024)\n💰 28% profit margin (Q4 2024)\n\nWe\'re positioned to capitalize on Southeast Asia\'s digital transformation boom. Would you like to learn more about investment opportunities?',
  'investor': 'Thank you for your interest in investing in Tepa Solutions! We\'re experiencing strong growth in the business automation and digital transformation market.\n\n📊 Key metrics:\n• 11.5% CAGR in business automation market\n• Strong financial performance with positive cash flow\n• Scalable business model with recurring revenue\n• Strategic partnerships with major tech vendors\n\nFor detailed information, please contact our investor relations team at investors@tepasolutions.asia or +63 2 8558 1237.',
  'financials': 'Our financial performance demonstrates sustainable growth:\n\n💹 Revenue Growth: 185% YoY (2024)\n🎯 Client Retention: 94% (2024)\n🌐 Market Expansion: 3x growth (2022-2024)\n💰 Profit Margin: 28% (Q4 2024)\n\nWe\'re well-positioned in the growing Southeast Asian market with strong competitive advantages. Would you like to request our investor deck or schedule a meeting with leadership?',
  
  // Technical Support & Issues
  'broken': 'I\'m sorry to hear you\'re experiencing technical issues with your website or application. To provide the best assistance, I\'ll need to connect you with our technical support team.\n\nCommon issues we can help with:\n• Website downtime or loading problems\n• Functionality bugs or errors\n• Performance optimization\n• Security concerns\n• Content updates or changes\n\nPlease fill out the support form so our technical team can assist you promptly.',
  'bug': 'Technical issues can be frustrating! Our development team is ready to help resolve any bugs or problems you\'re experiencing.\n\nTo ensure quick resolution, please provide:\n• Description of the issue\n• When the problem started\n• Steps to reproduce the bug\n• Browser/device information\n• Screenshots if applicable\n\nLet me create a priority support ticket for you.',
  'error': 'I understand you\'re encountering an error. Our technical team can quickly diagnose and fix the issue.\n\nFor fastest resolution, please describe:\n• The specific error message\n• What you were trying to do when it occurred\n• Which page or feature is affected\n• Your browser and device type\n\nI\'ll create a high-priority support ticket to get this resolved immediately.',
  'down': 'If your website or application is down, this is definitely a priority! Our technical team will investigate and resolve this immediately.\n\nImmediate steps:\n1. I\'ll create an urgent support ticket\n2. Our team will be notified within minutes\n3. You\'ll receive status updates via email/SMS\n4. We aim to resolve critical issues within 2-4 hours\n\nLet me get your contact details to create this urgent ticket.',
  'slow': 'Performance issues can impact your business significantly. Our team can optimize your website or application for better speed and performance.\n\nCommon optimizations include:\n• Database query optimization\n• Image and asset compression\n• Caching implementation\n• Server configuration tuning\n• Code optimization\n\nI\'ll connect you with our performance optimization team to analyze and improve your site speed.',
  'update': 'Need updates or changes to your website or application? We provide ongoing maintenance and feature updates for all our clients.\n\nTypes of updates we handle:\n• Content updates and changes\n• New feature additions\n• Design modifications\n• Security updates\n• Performance improvements\n\nWhat specific updates would you like to make? I can create a support ticket with your requirements.',
  'add feature': 'Expanding your application with new features is a great way to grow your business! We help clients add new functionality to their existing systems.\n\nPopular feature additions:\n• Payment gateway integration\n• User authentication systems\n• Admin dashboards\n• API integrations\n• Mobile responsiveness\n• Analytics and reporting\n\nWhat new features are you looking to add? I can connect you with our development team for a consultation.',
  
  // Company Information
  'about': 'Tepa Solutions is a rapidly growing startup founded in 2024 by Jerrie Mataya. We\'re dedicated to making technology simpler and more useful for businesses across the Philippines and Southeast Asia. We specialize in digital transformation, business automation, and educational technology initiatives.',
  'team': 'Our team consists of experienced developers, designers, and digital strategists led by founder Jerrie Mataya. We\'re a passionate group of professionals focused on delivering quality solutions and making technology accessible to everyone.',
  'founder': 'Tepa Solutions was founded by Jerrie Mataya in 2024 with a vision to democratize technology and help businesses thrive in the digital age. Under his leadership, we\'ve grown rapidly while maintaining our commitment to quality and community impact.',
  'location': 'We\'re based in BGC, Taguig, Philippines, and serve clients both locally and internationally. We offer flexible work arrangements including remote work and on-site collaboration depending on project needs and client preferences.',
  'portfolio': 'We\'ve successfully delivered projects across various industries:\n\n🏥 Healthcare: Dental clinic management systems\n🍔 Food & Beverage: Delivery apps and POS systems\n🏢 Enterprise: Admin dashboards and automation platforms\n🛒 E-commerce: Online stores and marketplace solutions\n🎓 Education: Learning management systems\n\nWould you like to see specific case studies or examples from your industry?',
  'technology': 'We use cutting-edge technologies to build robust, scalable solutions:\n\n🌐 Frontend: React, Next.js, TypeScript, Tailwind CSS\n⚙️ Backend: Node.js, Python, FastAPI, PostgreSQL, MongoDB\n☁️ Cloud: AWS, Azure, Vercel, Docker\n📱 Mobile: React Native, Flutter\n🤖 AI/ML: OpenAI, TensorFlow, Custom AI models\n🔧 Automation: Zapier, Custom workflows, API integrations\n\nWe choose the best technology stack for each project based on requirements and scalability needs.',
  'process': 'Our proven development process ensures successful project delivery:\n\n1️⃣ Discovery & Planning - Understand requirements and goals\n2️⃣ Design & Prototyping - Create user-friendly interfaces\n3️⃣ Development & Testing - Build and thoroughly test solutions\n4️⃣ Deployment & Launch - Deploy to production environments\n5️⃣ Support & Maintenance - Ongoing support and updates\n\nWe keep clients involved throughout with regular updates and feedback sessions.',
  'maintenance': 'We provide comprehensive ongoing maintenance and support for all our solutions:\n\n🔧 Regular updates and security patches\n📊 Performance monitoring and optimization\n🛡️ Security audits and vulnerability management\n📞 24/7 technical support for critical issues\n✨ Feature enhancements and improvements\n📱 Mobile and browser compatibility updates\n\nThis ensures your systems stay current, secure, and performing optimally.',
  
  // Contact & Support
  'contact': 'You can reach us through multiple channels:\n\n📧 Email: inquire@tepasolutions.asia\n📞 Phone: +63 2 8 558 1237\n💼 Investor Relations: investors@tepasolutions.asia\n🏢 Office: BGC, Taguig, Philippines\n\nFor immediate technical support, I can also create a priority ticket for you. How would you prefer to get in touch?',
  'support': 'I can connect you with our live support team right away! Our technical support covers:\n\n🔧 Website and application issues\n🐛 Bug fixes and troubleshooting\n⚡ Performance optimization\n🔒 Security concerns\n📱 Mobile compatibility issues\n✨ Feature updates and enhancements\n\nPlease provide your contact details and describe your issue so I can create a support ticket with the appropriate priority level.',
  'live support': 'I\'d be happy to connect you with our live support team. Please provide your name, contact number, email, and describe your inquiry so I can create a support ticket. Our team will contact you shortly based on the priority level of your request.',
  'chat': 'You\'re already chatting with me, Tepabot! I\'m here to help with:\n\n💼 Business inquiries and services\n👔 Career opportunities and applications\n🎓 Educational events and workshops\n💰 Investment information\n🔧 Technical support (I\'ll connect you with our team)\n📞 General questions about Tepa Solutions\n\nWhat specific topic can I help you with today?',
  
  // Default and fallback responses
  'help': 'I can help you with various topics:\n\n🔹 Services: App development, web development, SEO, automation\n🔹 Careers: Job openings, internships, volunteer opportunities\n🔹 Events: Workshops, bootcamps, educational programs\n🔹 Investment: Business opportunities and financial information\n🔹 Technical Support: Website issues, bugs, updates\n🔹 Company: About us, team, portfolio, process\n\nWhat specific area would you like to know more about?',
  'default': 'I\'m here to help with questions about Tepa Solutions! I can assist with information about our services, career opportunities, upcoming events, investment details, or technical support.\n\nPopular topics:\n• Our development services and pricing\n• Job openings and internship programs\n• Free workshops and educational events\n• Technical support for existing clients\n• Investment opportunities\n\nWhat would you like to know more about?'
};

// Enhanced keyword matching with synonyms and variations
const enhancedResponseMatcher = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  // Technical Issues - Higher priority matching
  const technicalKeywords = [
    { keywords: ['broken', 'not working', 'down', 'offline', 'crash', 'crashed'], response: 'broken' },
    { keywords: ['error', 'bug', 'problem', 'issue', 'glitch', 'malfunction'], response: 'error' },
    { keywords: ['slow', 'loading', 'performance', 'speed', 'lag', 'timeout'], response: 'slow' },
    { keywords: ['update', 'change', 'modify', 'edit', 'fix'], response: 'update' },
    { keywords: ['add', 'new feature', 'enhance', 'improvement', 'additional'], response: 'add feature' }
  ];
  
  // Live Support triggers
  if (lowerInput.includes('live support') || lowerInput.includes('human') || lowerInput.includes('agent') || lowerInput.includes('speak') || lowerInput.includes('talk')) {
    return 'live support';
  }
  
  // Check technical issues first
  for (const tech of technicalKeywords) {
    if (tech.keywords.some(keyword => lowerInput.includes(keyword))) {
      return tech.response;
    }
  }
  
  // Enhanced keyword matching
  const keywordMap = [
    // Services
    { keywords: ['service', 'services', 'what do you do', 'offerings'], response: 'services' },
    { keywords: ['app', 'mobile', 'application', 'mobile app'], response: 'app development' },
    { keywords: ['web', 'website', 'web development', 'site'], response: 'web development' },
    { keywords: ['seo', 'search engine', 'ranking', 'google'], response: 'seo' },
    { keywords: ['automation', 'automate', 'workflow', 'process'], response: 'automation' },
    
    // Pricing & Business
    { keywords: ['price', 'pricing', 'cost', 'how much', 'rate', 'fee'], response: 'pricing' },
    { keywords: ['quote', 'quotation', 'estimate'], response: 'quote' },
    { keywords: ['consultation', 'consult', 'meeting', 'discuss'], response: 'consultation' },
    { keywords: ['timeline', 'duration', 'how long', 'time', 'schedule'], response: 'timeline' },
    
    // Careers
    { keywords: ['job', 'jobs', 'position', 'opening', 'vacancy', 'work'], response: 'jobs' },
    { keywords: ['career', 'opportunity', 'employment'], response: 'career' },
    { keywords: ['hiring', 'recruit', 'join'], response: 'hiring' },
    { keywords: ['intern', 'internship', 'trainee', 'student'], response: 'internship' },
    { keywords: ['volunteer', 'teach', 'education', 'community'], response: 'volunteer' },
    { keywords: ['salary', 'pay', 'compensation', 'wage'], response: 'salary' },
    { keywords: ['benefit', 'benefits', 'perks', 'insurance'], response: 'benefits' },
    
    // Events
    { keywords: ['event', 'events', 'workshop', 'seminar'], response: 'events' },
    { keywords: ['workshop', 'training', 'class'], response: 'workshop' },
    { keywords: ['roblox', 'game', 'gaming'], response: 'roblox' },
    { keywords: ['bootcamp', 'intensive', 'course'], response: 'bootcamp' },
    
    // Investment
    { keywords: ['invest', 'investment', 'investor', 'funding'], response: 'investment' },
    { keywords: ['investor', 'invest', 'funding', 'capital'], response: 'investor' },
    { keywords: ['financial', 'revenue', 'profit', 'growth'], response: 'financials' },
    
    // Company
    { keywords: ['about', 'company', 'who are you', 'background'], response: 'about' },
    { keywords: ['team', 'people', 'staff', 'founder'], response: 'team' },
    { keywords: ['founder', 'jerrie', 'ceo'], response: 'founder' },
    { keywords: ['location', 'office', 'address', 'where'], response: 'location' },
    { keywords: ['portfolio', 'work', 'project', 'example'], response: 'portfolio' },
    { keywords: ['technology', 'tech', 'stack', 'framework'], response: 'technology' },
    { keywords: ['process', 'methodology', 'approach', 'how'], response: 'process' },
    { keywords: ['maintenance', 'support', 'ongoing'], response: 'maintenance' },
    
    // Contact
    { keywords: ['contact', 'reach', 'get in touch', 'email', 'phone'], response: 'contact' },
    { keywords: ['support', 'help', 'assistance'], response: 'support' },
    { keywords: ['chat', 'talk', 'communicate'], response: 'chat' },
    
    // General
    { keywords: ['help', 'assist', 'guide'], response: 'help' }
  ];
  
  // Find matching keywords
  for (const mapping of keywordMap) {
    if (mapping.keywords.some(keyword => lowerInput.includes(keyword))) {
      return mapping.response;
    }
  }
  
  return 'default';
};

export function Tepabot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [inputValue, setInputValue] = useState('');
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [lastMessageTime, setLastMessageTime] = useState(Date.now());
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const [ticketForm, setTicketForm] = useState<TicketForm>({
    name: '',
    contactNumber: '',
    email: '',
    message: ''
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Inactivity checker
  useEffect(() => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    const timer = setTimeout(() => {
      if (messages.length > 1 && Date.now() - lastMessageTime > 900000) { // 15 minutes
        const followUpMessage: Message = {
          id: Date.now().toString(),
          text: 'I\'m still here if you need any assistance! Is there anything else I can help you with regarding our services, career opportunities, or technical support?',
          isBot: true,
          timestamp: new Date(),
          hasActions: true
        };
        setMessages(prev => [...prev, followUpMessage]);
      }
    }, 900000); // 15 minutes

    setInactivityTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [lastMessageTime, messages.length]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...files]);
      
      const fileMessage: Message = {
        id: Date.now().toString(),
        text: `📎 Uploaded ${files.length} file(s): ${files.map(f => f.name).join(', ')}`,
        isBot: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const generateResponse = (input: string): Message => {
    const responseKey = enhancedResponseMatcher(input);
    
    // Handle live support requests
    if (responseKey === 'live support' || input.toLowerCase().includes('live support')) {
      setShowTicketForm(true);
      return {
        id: (Date.now() + 1).toString(),
        text: botResponses['live support'],
        isBot: true,
        timestamp: new Date()
      };
    }
    
    // Handle technical issues that should trigger support form
    const technicalIssues = ['broken', 'error', 'bug', 'down', 'slow', 'update', 'add feature'];
    if (technicalIssues.includes(responseKey)) {
      setTimeout(() => {
        setShowTicketForm(true);
      }, 2000); // Show form after response
    }
    
    return {
      id: (Date.now() + 1).toString(),
      text: botResponses[responseKey] || botResponses['default'],
      isBot: true,
      timestamp: new Date(),
      awaitingFeedback: true
    };
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLastMessageTime(Date.now());

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateResponse(text);
      setMessages(prev => [...prev, botResponse]);
      
      // After definitive answer, ask if there's anything else
      if (botResponse.awaitingFeedback) {
        setTimeout(() => {
          const followUpMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: 'Is there anything else I can help you with? I\'m here to assist with questions about our services, careers, events, or technical support.',
            isBot: true,
            timestamp: new Date(),
            hasActions: true
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 2000);
      }
    }, 1000);
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, awaitingFeedback: false }
        : msg
    ));

    const feedbackMessage: Message = {
      id: Date.now().toString(),
      text: isPositive 
        ? 'Thank you for the positive feedback! I\'m glad I could help. Feel free to ask if you need anything else about our services, career opportunities, or upcoming events.'
        : 'Thank you for the feedback. Let me connect you with our live support team for more personalized assistance with your inquiry.',
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, feedbackMessage]);

    if (!isPositive) {
      setTimeout(() => {
        setShowTicketForm(true);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTicket(true);

    try {
      await submitContactForm({
        type: 'support',
        name: ticketForm.name,
        email: ticketForm.email,
        phone: ticketForm.contactNumber,
        message: ticketForm.message,
        company: 'Live Chat Support Request',
        subject: 'Live Support Request from Tepabot',
        priority: 'high' as const
      });

      const successMessage: Message = {
        id: Date.now().toString(),
        text: 'Perfect! I\'ve created a support ticket for you. Our team will contact you within 2-4 hours for technical issues, or within 24 hours for general inquiries. You\'ll receive a confirmation email shortly.\n\nIs there anything else I can help you with while you wait?',
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, successMessage]);
      setShowTicketForm(false);
      setTicketForm({ name: '', contactNumber: '', email: '', message: '' });
      setAttachedFiles([]);
      
      toast.success('Support ticket created!', {
        description: 'Our team will contact you shortly.',
      });

    } catch (error) {
      console.error('Ticket submission error:', error);
      toast.error('Failed to submit ticket', {
        description: 'Please try again or contact us directly at inquire@tepasolutions.asia',
      });
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  const resetChat = () => {
    setMessages([initialBotMessage]);
    setShowTicketForm(false);
    setTicketForm({ name: '', contactNumber: '', email: '', message: '' });
    setAttachedFiles([]);
    setLastMessageTime(Date.now());
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-16 right-0 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
        >
          Chat with Tepabot!
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary"></div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-6 right-6 z-50 ${isMinimized ? 'w-80' : 'w-96'}`}
    >
      <Card className={`shadow-xl ${isMinimized ? 'h-14' : 'h-[600px]'} flex flex-col`}>
        {/* Header */}
        <CardHeader className="p-4 bg-primary text-primary-foreground rounded-t-lg flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-sm">Tepabot</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs opacity-90">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-6 h-6 text-primary-foreground hover:bg-primary-foreground/20"
            >
              {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="flex flex-col flex-1 overflow-hidden"
            >
              {/* Suggested Inquiries */}
              {messages.length === 1 && (
                <div className="p-4 border-b bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedInquiries.map((inquiry, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-2 text-left justify-start"
                        onClick={() => handleSendMessage(inquiry)}
                      >
                        {inquiry}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[85%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.isBot ? 'bg-primary/10' : 'bg-primary'}`}>
                        {message.isBot ? <Bot className="w-3 h-3 text-primary" /> : <User className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <div className={`px-3 py-2 rounded-lg ${message.isBot ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        
                        {/* Feedback buttons */}
                        {message.awaitingFeedback && (
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => handleFeedback(message.id, true)}
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => handleFeedback(message.id, false)}
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Ticket Form */}
                <AnimatePresence>
                  {showTicketForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border rounded-lg p-4 bg-muted/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-sm">Live Support Request</h4>
                        <Badge variant="secondary" className="text-xs">Priority</Badge>
                      </div>
                      <form onSubmit={handleTicketSubmit} className="space-y-3">
                        <div>
                          <Label htmlFor="name" className="text-xs">Full Name *</Label>
                          <Input
                            id="name"
                            value={ticketForm.name}
                            onChange={(e) => setTicketForm(prev => ({ ...prev, name: e.target.value }))}
                            className="h-8 text-xs"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact" className="text-xs">Contact Number *</Label>
                          <Input
                            id="contact"
                            value={ticketForm.contactNumber}
                            onChange={(e) => setTicketForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                            className="h-8 text-xs"
                            placeholder="+63 XXX XXX XXXX"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-xs">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={ticketForm.email}
                            onChange={(e) => setTicketForm(prev => ({ ...prev, email: e.target.value }))}
                            className="h-8 text-xs"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="message" className="text-xs">Describe your inquiry *</Label>
                          <Textarea
                            id="message"
                            value={ticketForm.message}
                            onChange={(e) => setTicketForm(prev => ({ ...prev, message: e.target.value }))}
                            className="text-xs"
                            rows={3}
                            placeholder="Please provide details about your inquiry, including any error messages, specific issues, or requirements..."
                            required
                          />
                        </div>
                        
                        {/* File upload for ticket form */}
                        <div>
                          <Label className="text-xs">Attach Files (Optional)</Label>
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            accept="image/*,.pdf,.doc,.docx,.txt"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full mt-1 h-8"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="w-3 h-3 mr-1" />
                            Upload Screenshots or Documents
                          </Button>
                          {attachedFiles.length > 0 && (
                            <div className="mt-1 space-y-1">
                              {attachedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-background p-1 rounded text-xs">
                                  <span className="truncate">{file.name}</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0"
                                    onClick={() => removeFile(index)}
                                  >
                                    ×
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button type="submit" size="sm" disabled={isSubmittingTicket} className="flex-1">
                            {isSubmittingTicket ? 'Submitting...' : 'Submit Support Request'}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowTicketForm(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about services, careers, events, or technical support..."
                    className="flex-1 text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="shrink-0"
                    title="Attach files"
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-muted-foreground">Powered by Tepa Solutions • Available 24/7</p>
                  <Button variant="ghost" size="sm" onClick={resetChat} className="text-xs h-6">
                    Reset Chat
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
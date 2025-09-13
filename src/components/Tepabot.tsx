import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Upload, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { submitContactForm } from '../utils/api';
import { toast } from "sonner@2.0.3";

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
  text: 'Hi! I\'m Tepabot, your digital assistant from Tepa Solutions. I\'m here to help answer questions about our services.\n\nHow can I help you today?',
  isBot: true,
  timestamp: new Date()
};

const suggestedInquiries = [
  "What services do you offer?",
  "Can you help me with pricing?",
  "I need technical support",
  "Tell me about your automation solutions"
];

const botResponses: Record<string, string> = {
  'services': 'We offer App Development, Web Development, SEO Solutions, and Business Automation. Our team specializes in creating modern, scalable solutions for businesses of all sizes. Which service interests you most?',
  'pricing': 'Our pricing varies based on project scope and requirements. We offer competitive rates with transparent pricing. Would you like to speak with our sales team for a detailed quote?',
  'support': 'I can connect you with our live support team right away. Please provide your contact details and I\'ll create a support ticket for you.',
  'contact': 'You can reach us at inquire@tepasolutions.asia or call +63 2 8 558 1237. You can also fill out our contact form. Would you like me to help you get in touch?',
  'about': 'Tepa Solutions is a growing startup founded in 2024 by Jerrie Mataya. We\'re dedicated to making technology simpler and more useful for businesses across the Philippines. We specialize in digital transformation and business automation.',
  'portfolio': 'We\'ve worked on various projects including food delivery apps, dental clinic websites, admin dashboards, and automation platforms. Our portfolio showcases solutions for restaurants, healthcare, e-commerce, and more. Would you like to see our portfolio?',
  'automation': 'Our business automation solutions cover sales, marketing, HR, finance, inventory, and support processes. We help businesses save time and reduce manual work. Which area interests you most?',
  'web': 'We create modern, responsive websites and web applications using the latest technologies like React, Node.js, and cloud platforms. What type of web solution are you looking for?',
  'app': 'We develop both mobile and web applications tailored to your business needs. Our apps are built with scalability and user experience in mind. Do you have a specific app idea?',
  'seo': 'Our SEO services help improve your website\'s visibility and search rankings through keyword optimization, content strategy, and technical SEO. Are you looking to increase your online presence?',
  'team': 'Our team consists of experienced developers, designers, and digital strategists led by founder Jerrie Mataya. We\'re a passionate group focused on delivering quality solutions.',
  'location': 'We\'re based in the Philippines and serve clients both locally and internationally. We work remotely and on-site depending on project needs.',
  'timeline': 'Project timelines vary based on complexity. Simple websites typically take 2-4 weeks, while complex applications can take 2-6 months. We always provide detailed timelines during our consultation.',
  'process': 'Our process includes consultation, planning, design, development, testing, and deployment. We keep clients involved throughout with regular updates and feedback sessions.',
  'technology': 'We use modern technologies including React, Node.js, Python, cloud platforms (AWS, Azure), and various automation tools. We choose the best tech stack for each project.',
  'consultation': 'We offer free initial consultations to understand your needs and provide recommendations. Would you like to schedule a consultation with our team?',
  'maintenance': 'We provide ongoing maintenance and support for all our solutions, including updates, security patches, and feature enhancements. This ensures your systems stay current and secure.',
  'live_support': 'I\'d be happy to connect you with our live support team. Please provide your name, contact number, email, and describe your inquiry so I can create a support ticket.',
  'default': 'I\'m here to help! You can ask me about our services, pricing, portfolio, team, or request to speak with live support. What would you like to know?'
};

export function Tepabot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [inputValue, setInputValue] = useState('');
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...files]);
      
      // Add message about file upload
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
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('live support') || lowerInput.includes('human') || lowerInput.includes('agent') || lowerInput.includes('speak')) {
      setShowTicketForm(true);
      return {
        id: (Date.now() + 1).toString(),
        text: botResponses.live_support,
        isBot: true,
        timestamp: new Date()
      };
    }
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerInput.includes(key)) {
        return {
          id: (Date.now() + 1).toString(),
          text: response,
          isBot: true,
          timestamp: new Date(),
          awaitingFeedback: true
        };
      }
    }
    
    return {
      id: (Date.now() + 1).toString(),
      text: botResponses.default,
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

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateResponse(text);
      setMessages(prev => [...prev, botResponse]);
      
      // After definitive answer, ask if there's anything else
      if (botResponse.awaitingFeedback) {
        setTimeout(() => {
          const followUpMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: 'Is there anything else I can help you with?',
            isBot: true,
            timestamp: new Date(),
            hasActions: true
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 1500);
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
        ? 'Thank you for the positive feedback! Is there anything else I can help you with?'
        : 'Thank you for the feedback. Let me connect you with our live support team for better assistance.',
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
        text: 'Perfect! I\'ve created a support ticket for you. Our team will contact you shortly. Is there anything else I can help you with?',
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
        description: 'Please try again or contact us directly.',
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
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
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
                          <Label htmlFor="name" className="text-xs">Name</Label>
                          <Input
                            id="name"
                            value={ticketForm.name}
                            onChange={(e) => setTicketForm(prev => ({ ...prev, name: e.target.value }))}
                            className="h-8 text-xs"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact" className="text-xs">Contact Number</Label>
                          <Input
                            id="contact"
                            value={ticketForm.contactNumber}
                            onChange={(e) => setTicketForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                            className="h-8 text-xs"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-xs">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={ticketForm.email}
                            onChange={(e) => setTicketForm(prev => ({ ...prev, email: e.target.value }))}
                            className="h-8 text-xs"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="message" className="text-xs">Message</Label>
                          <Textarea
                            id="message"
                            value={ticketForm.message}
                            onChange={(e) => setTicketForm(prev => ({ ...prev, message: e.target.value }))}
                            className="text-xs"
                            rows={3}
                            placeholder="Describe your inquiry..."
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
                            Upload Files
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
                            {isSubmittingTicket ? 'Submitting...' : 'Submit Ticket'}
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
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="shrink-0"
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
                  <p className="text-xs text-muted-foreground">Powered by Tepa Solutions</p>
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
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Upload, ThumbsUp, ThumbsDown, Zap, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { submitContactForm } from '../supabase/api';
import { toast } from "sonner";
import { openRouterService, shouldEscalateToSupport } from '../services/openrouter';
import { createChatSession, storeChatMessage, updateChatSessionStatus, triggerEscalation, ChatSession } from '../supabase/chat-api';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  hasActions?: boolean;
  awaitingFeedback?: boolean;
  isStreaming?: boolean;
  error?: boolean;
  suggestions?: string[];
}

interface TicketForm {
  name: string;
  contactNumber: string;
  email: string;
  message: string;
}

const initialBotMessage: Message = {
  id: '1',
  text: 'Hi! I\'m Tepabot, your AI assistant from Tepa Solutions. I\'m here to help you with our digital transformation services, answer questions about pricing, development processes, and connect you with our team when needed.\n\nWhat would you like to know?',
  isBot: true,
  timestamp: new Date()
};

// Smart suggestion predictor based on conversation context
const generateSmartSuggestions = (lastMessage: string, conversationHistory: Message[]): string[] => {
  const lowerMessage = lastMessage.toLowerCase();
  const hasDiscussedServices = conversationHistory.some(msg => 
    msg.text.toLowerCase().includes('service') || msg.text.toLowerCase().includes('development')
  );
  
  // Context-aware suggestions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
    return [
      "What factors affect the pricing?",
      "Can I get a detailed quote?",
      "Do you offer payment plans?"
    ];
  }
  
  if (lowerMessage.includes('web') || lowerMessage.includes('website')) {
    return [
      "What's your web development process?",
      "How long does a website take?",
      "Can you show me examples of your work?"
    ];
  }
  
  if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
    return [
      "What platforms do you develop for?",
      "How much does app development cost?",
      "Can you help with app store deployment?"
    ];
  }
  
  if (lowerMessage.includes('seo') || lowerMessage.includes('marketing')) {
    return [
      "What SEO services do you offer?",
      "How do you measure SEO success?",
      "Can you help improve my current website's SEO?"
    ];
  }
  
  if (lowerMessage.includes('automation') || lowerMessage.includes('business')) {
    return [
      "What processes can you automate?",
      "How much time does automation save?",
      "Can you integrate with existing systems?"
    ];
  }
  
  // General suggestions if no specific context
  if (!hasDiscussedServices && conversationHistory.length <= 3) {
    return [
      "Tell me about your services",
      "How do I get started?",
      "Can I schedule a consultation?"
    ];
  }
  
  // Follow-up suggestions
  return [
    "Can you provide more details?",
    "How do I get started?",
    "I'd like to speak with your team"
  ];
};

export function Tepabot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [inputValue, setInputValue] = useState('');
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isAIResponding, setIsAIResponding] = useState(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [lastActivityTime, setLastActivityTime] = useState<Date>(new Date());
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  
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

  // Initialize chat session when component mounts and chat opens
  useEffect(() => {
    if (isOpen && !chatSession) {
      const initializeSession = async () => {
        try {
          const session = await createChatSession({
            pageUrl: window.location.href,
            referrer: document.referrer,
            userAgent: navigator.userAgent
          });
          setChatSession(session);
          
          // Store initial bot message
          if (session.id) {
            await storeChatMessage(
              session.id,
              initialBotMessage.text,
              true,
              'system',
              { message_type: 'welcome' }
            );
          }
        } catch (error) {
          console.error('Failed to initialize chat session:', error);
        }
      };
      
      initializeSession();
    }
  }, [isOpen, chatSession]);

  // Inactivity tracking
  useEffect(() => {
    const resetInactivityTimer = () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      
      const timer = setTimeout(() => {
        if (messages.length > 1 && !isAIResponding) {
          const checkInMessage: Message = {
            id: Date.now().toString(),
            text: 'I\'m still here if you need any help! Is there anything else I can assist you with regarding our services?',
            isBot: true,
            timestamp: new Date(),
            hasActions: true
          };
          setMessages(prev => [...prev, checkInMessage]);
          
          // Store check-in message
          if (chatSession?.id) {
            storeChatMessage(chatSession.id, checkInMessage.text, true, 'system', {
              message_type: 'inactivity_check'
            }).catch(console.error);
          }
        }
      }, 120000); // 2 minutes of inactivity
      
      setInactivityTimer(timer);
    };

    if (isOpen && messages.length > 1) {
      resetInactivityTimer();
    }

    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [lastActivityTime, isOpen, messages.length, isAIResponding, chatSession]);

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

  // Enhanced AI response with better conversation flow
  const generateAIResponse = async (input: string) => {
    if (!input.trim()) return;

    setIsAIResponding(true);
    setShowSuggestions(false);
    
    // Create placeholder message for streaming
    const responseId = (Date.now() + 1).toString();
    const streamingMessage: Message = {
      id: responseId,
      text: '',
      isBot: true,
      timestamp: new Date(),
      isStreaming: true
    };
    
    setMessages(prev => [...prev, streamingMessage]);

    try {
      // Add context about user's location and conversation history
      const currentPath = window.location.pathname;
      if (currentPath !== '/') {
        openRouterService.addContext(`User is currently viewing: ${currentPath}`);
      }

      // Add conversation context for better responses
      if (conversationContext.length > 0) {
        openRouterService.addContext(`Previous topics discussed: ${conversationContext.join(', ')}`);
      }

      let fullResponse = '';
      
      // Use streaming for better UX
      for await (const chunk of openRouterService.getChatResponseStream(input)) {
        fullResponse += chunk;
        
        // Update the streaming message with new content
        setMessages(prev => 
          prev.map(msg => 
            msg.id === responseId 
              ? { ...msg, text: fullResponse }
              : msg
          )
        );
        
        // Small delay to make streaming visible
        await new Promise(resolve => setTimeout(resolve, 15));
      }
      
      // Generate smart suggestions based on the AI response
      const suggestions = generateSmartSuggestions(fullResponse, messages);
      
      // Finalize the message with suggestions
      setMessages(prev => 
        prev.map(msg => 
          msg.id === responseId 
            ? { 
                ...msg, 
                text: fullResponse,
                isStreaming: false,
                awaitingFeedback: true,
                suggestions: suggestions
              }
            : msg
        )
      );

      // Show suggestions after a brief delay
      setTimeout(() => {
        setCurrentSuggestions(suggestions);
        setShowSuggestions(true);
      }, 1000);

      // Update conversation context
      const topics = extractTopics(input + ' ' + fullResponse);
      setConversationContext(prev => [...new Set([...prev, ...topics])].slice(-5)); // Keep last 5 topics

      // Store AI response in Supabase
      if (chatSession?.id) {
        try {
          await storeChatMessage(chatSession.id, fullResponse, true, 'text', {
            model_used: 'deepseek/deepseek-chat-v3.1:free',
            response_time: Date.now() - (new Date()).getTime(),
            suggestions_provided: suggestions
          });
        } catch (error) {
          console.error('Failed to store AI message:', error);
        }
      }

      // Check if we should escalate to live support (less aggressive)
      if (shouldEscalateToSupport(input, fullResponse) && Math.random() < 0.3) { // Only 30% chance
        setTimeout(async () => {
          const escalationMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: 'Would you like to connect with our live support team for more personalized assistance?',
            isBot: true,
            timestamp: new Date(),
            hasActions: true
          };
          setMessages(prev => [...prev, escalationMessage]);
          
          // Trigger escalation in Supabase
          if (chatSession?.id) {
            try {
              await triggerEscalation(chatSession.id, 'AI suggested escalation', input, fullResponse);
            } catch (error) {
              console.error('Failed to trigger escalation:', error);
            }
          }
        }, 3000);
      }
      
    } catch (error) {
      console.error('AI response error:', error);
      
      // Update with error message
      setMessages(prev => 
        prev.map(msg => 
          msg.id === responseId 
            ? { 
                ...msg, 
                text: 'I\'m experiencing technical difficulties right now. Let me connect you with our live support team who can assist you immediately.',
                isStreaming: false,
                error: true,
                hasActions: true
              }
            : msg
        )
      );
      
      // Auto-suggest live support on error
      setTimeout(() => {
        setShowTicketForm(true);
      }, 1000);
    } finally {
      setIsAIResponding(false);
      setLastActivityTime(new Date());
    }
  };

  // Extract topics from conversation for context
  const extractTopics = (text: string): string[] => {
    const keywords = [
      'web development', 'app development', 'seo', 'automation', 'business',
      'pricing', 'consultation', 'project', 'timeline', 'technology', 'service'
    ];
    
    return keywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    );
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim() || isAIResponding) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowSuggestions(false);
    setLastActivityTime(new Date());

    // Store user message in Supabase if session exists
    if (chatSession?.id) {
      try {
        await storeChatMessage(chatSession.id, text, false, 'text');
      } catch (error) {
        console.error('Failed to store user message:', error);
      }
    }

    // Check for live support requests
    const lowerInput = text.toLowerCase();
    if (lowerInput.includes('live support') || lowerInput.includes('human') || lowerInput.includes('agent') || lowerInput.includes('speak to someone')) {
      setTimeout(async () => {
        setShowTicketForm(true);
        const supportMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I\'d be happy to connect you with our live support team. Please fill out the form below with your details and inquiry.',
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, supportMessage]);
        
        // Update session status and store escalation
        if (chatSession?.id) {
          try {
            await updateChatSessionStatus(chatSession.id, 'escalated');
            await storeChatMessage(chatSession.id, supportMessage.text, true, 'escalation', {
              escalation_reason: 'User requested human support',
              user_request: text
            });
          } catch (error) {
            console.error('Failed to handle escalation:', error);
          }
        }
      }, 500);
      return;
    }

    // Generate AI response with small delay for natural feel
    setTimeout(() => {
      generateAIResponse(text);
    }, 200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setShowSuggestions(false);
    handleSendMessage(suggestion);
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, awaitingFeedback: false }
        : msg
    ));

    if (!isPositive) {
      const feedbackMessage: Message = {
        id: Date.now().toString(),
        text: 'Thank you for the feedback. Let me connect you with our live support team for better assistance.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, feedbackMessage]);
      setTimeout(() => {
        setShowTicketForm(true);
      }, 1000);
    } else {
      // Just acknowledge positive feedback, don't ask follow-up immediately
      toast.success('Thank you for the positive feedback!');
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
        text: 'Perfect! I\'ve created a support ticket for you. Our team will contact you shortly. Your ticket reference number will be sent to your email.',
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

  const resetChat = async () => {
    setMessages([initialBotMessage]);
    setShowTicketForm(false);
    setShowSuggestions(false);
    setCurrentSuggestions([]);
    setConversationContext([]);
    setTicketForm({ name: '', contactNumber: '', email: '', message: '' });
    setAttachedFiles([]);
    setIsAIResponding(false);
    setLastActivityTime(new Date());
    
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    // Complete current session if exists
    if (chatSession?.id) {
      try {
        await updateChatSessionStatus(chatSession.id, 'completed');
      } catch (error) {
        console.error('Failed to complete chat session:', error);
      }
    }
    
    // Reset AI conversation history
    openRouterService.resetConversation();
    
    // Create new session
    try {
      const newSession = await createChatSession({
        pageUrl: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent
      });
      setChatSession(newSession);
      
      // Store initial message in new session
      if (newSession.id) {
        await storeChatMessage(
          newSession.id,
          initialBotMessage.text,
          true,
          'system',
          { message_type: 'welcome' }
        );
      }
    } catch (error) {
      console.error('Failed to create new chat session:', error);
      setChatSession(null);
    }
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
          Chat with Tepabot AI!
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
              {isAIResponding ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>
            <div>
              <CardTitle className="text-sm">Tepabot AI</CardTitle>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isAIResponding ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                <span className="text-xs opacity-90">
                  {isAIResponding ? 'Thinking...' : 'Online'}
                </span>
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
                        {message.isBot ? (
                          message.isStreaming ? (
                            <motion.div
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Zap className="w-3 h-3 text-primary" />
                            </motion.div>
                          ) : message.error ? (
                            <X className="w-3 h-3 text-red-500" />
                          ) : (
                            <Bot className="w-3 h-3 text-primary" />
                          )
                        ) : (
                          <User className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                      <div className={`px-3 py-2 rounded-lg ${
                        message.isBot 
                          ? message.error 
                            ? 'bg-red-50 border border-red-200' 
                            : 'bg-muted'
                          : 'bg-primary text-primary-foreground'
                      }`}>
                        <p className="text-sm whitespace-pre-line">
                          {message.text}
                          {message.isStreaming && (
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="ml-1"
                            >
                              ▋
                            </motion.span>
                          )}
                        </p>
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

                {/* Smart Suggestions */}
                <AnimatePresence>
                  {showSuggestions && currentSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Lightbulb className="w-3 h-3" />
                        <span>Suggestions:</span>
                      </div>
                      {currentSuggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-auto py-2 text-left justify-start"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
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
                    placeholder={isAIResponding ? "AI is responding..." : "Type your message..."}
                    className="flex-1"
                    disabled={isAIResponding}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="shrink-0"
                    disabled={isAIResponding}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => handleSendMessage()} size="icon" disabled={!inputValue.trim() || isAIResponding}>
                    {isAIResponding ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
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
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-muted-foreground">Powered by Tepa Solutions</p>
                    {messages.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        AI Powered
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetChat} className="text-xs h-6" disabled={isAIResponding}>
                    New Chat
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
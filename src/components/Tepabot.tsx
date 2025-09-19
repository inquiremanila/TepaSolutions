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
import { openRouterService } from '../services/openrouter';
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
  id: "1",
  text: "Hello! I'm your AI assistant at Tepa Solutions. I have a deep understanding of digital technology and business solutions. How can I help you today?",
  isBot: true,
  timestamp: new Date()
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
          // Create a fallback session for functionality without database
          const fallbackSession: ChatSession = {
            id: `fallback_${Date.now()}`,
            session_token: `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            started_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: 'active',
            context: {
              page_url: window.location.href,
              referrer: document.referrer,
              user_agent: navigator.userAgent
            }
          };
          setChatSession(fallbackSession);
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
// Updated generateAIResponse function for Tepabot.tsx
// Replace your existing generateAIResponse function with this enhanced version

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
    // Enhanced context building for better conversation flow
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      openRouterService.addContext(`User is currently viewing: ${currentPath}`);
    }

    // Build conversation state for suggestions and context
    const conversationState = {
      stage: determineCurrentStage(messages, input),
      topicsDiscussed: conversationContext,
      uncertaintyLevel: detectUncertaintyLevel(input),
      businessType: extractBusinessType(messages),
      painPoints: extractPainPoints(messages),
      responseCount: messages.filter(m => m.isBot).length
    };

    let fullResponse = '';
    
    // Use streaming with enhanced conversation tracking
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
    
    // Generate smart suggestions based on conversation stage and content
    const suggestions = generateContextualSuggestions(fullResponse, conversationState);
    
    // Finalize the message with stage-appropriate suggestions
    setMessages(prev => 
      prev.map(msg => 
        msg.id === responseId 
          ? { 
              ...msg, 
              text: fullResponse,
              isStreaming: false,
              awaitingFeedback: shouldRequestFeedback(conversationState.stage),
              suggestions: suggestions
            }
          : msg
      )
    );

    // Show suggestions after a brief delay, but only if appropriate for the conversation stage
    if (suggestions.length > 0 && conversationState.stage !== 'conversion') {
      setTimeout(() => {
        setCurrentSuggestions(suggestions);
        setShowSuggestions(true);
      }, 1000);
    }

    // Update conversation context with extracted topics
    const newTopics = extractTopicsFromResponse(input + ' ' + fullResponse);
    setConversationContext(prev => [...new Set([...prev, ...newTopics])].slice(-8)); // Keep last 8 topics

    // Store AI response in Supabase with enhanced metadata (if session is not fallback)
    if (chatSession?.id && !chatSession.id.includes('fallback_')) {
      try {
        await storeChatMessage(chatSession.id, fullResponse, true, 'text', {
          model_used: 'deepseek/deepseek-chat-v3.1:free',
          response_time: Date.now() - (new Date()).getTime(),
          suggestions_provided: suggestions,
          conversation_stage: conversationState.stage,
          uncertainty_level: conversationState.uncertaintyLevel,
          topics_discussed: newTopics
        });
      } catch (error) {
        console.error('Failed to store AI message:', error);
        // Continue without storing - functionality should work without database
      }
    }

    // Smart escalation logic based on conversation flow
    const shouldEscalate = shouldEscalateBasedOnStage(conversationState, fullResponse, input);
    if (shouldEscalate && Math.random() < 0.25) { // 25% chance for less aggressive escalation
      setTimeout(async () => {
        const escalationMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: getContextualEscalationMessage(conversationState.stage),
          isBot: true,
          timestamp: new Date(),
          hasActions: true
        };
        setMessages(prev => [...prev, escalationMessage]);
        
        // Trigger escalation in Supabase
        if (chatSession?.id) {
          try {
            await triggerEscalation(chatSession.id, `Stage-based escalation: ${conversationState.stage}`, input, fullResponse);
          } catch (error) {
            console.error('Failed to trigger escalation:', error);
          }
        }
      }, 4000); // Longer delay for more natural flow
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

// Helper functions for enhanced conversation flow

const determineCurrentStage = (messages: Message[], currentInput: string): string => {
  const conversationLength = messages.length;
  const lowerInput = currentInput.toLowerCase();
  
  if (conversationLength <= 2) return 'initial';
  if (lowerInput.includes("don't know") || lowerInput.includes("not sure") || lowerInput.includes("uncertain")) return 'discovery';
  
  // Check for pain points or challenges mentioned
  const painPointKeywords = ['problem', 'issue', 'challenge', 'difficult', 'frustrating', 'slow', 'manual', 'time-consuming'];
  if (painPointKeywords.some(keyword => lowerInput.includes(keyword))) return 'problem_exploration';
  
  // Check if they're discussing specific solutions
  const solutionKeywords = ['website', 'app', 'seo', 'automation', 'system', 'platform'];
  if (solutionKeywords.some(keyword => lowerInput.includes(keyword))) return 'solution_discussion';
  
  // Check for conversion intent
  const conversionKeywords = ['price', 'cost', 'quote', 'consultation', 'get started', 'how much'];
  if (conversionKeywords.some(keyword => lowerInput.includes(keyword))) return 'conversion';
  
  return 'ongoing_discovery';
};

const detectUncertaintyLevel = (input: string): string => {
  const uncertaintyPhrases = ["don't know", "not sure", "maybe", "i think", "probably", "perhaps", "uncertain"];
  const lowerInput = input.toLowerCase();
  
  const uncertaintyCount = uncertaintyPhrases.filter(phrase => lowerInput.includes(phrase)).length;
  
  if (uncertaintyCount >= 2) return 'high';
  if (uncertaintyCount === 1) return 'medium';
  return 'low';
};

const extractBusinessType = (messages: Message[]): string => {
  const businessTypes = ['restaurant', 'retail', 'ecommerce', 'service', 'consulting', 'healthcare', 'education', 'manufacturing'];
  const allText = messages.map(m => m.text.toLowerCase()).join(' ');
  
  for (const type of businessTypes) {
    if (allText.includes(type)) return type;
  }
  return 'unknown';
};

const extractPainPoints = (messages: Message[]): string[] => {
  const painPointKeywords = [
    'slow', 'manual', 'time-consuming', 'frustrating', 'difficult', 'complicated',
    'expensive', 'inefficient', 'outdated', 'broken', 'confusing', 'overwhelming'
  ];
  
  const allText = messages.map(m => m.text.toLowerCase()).join(' ');
  return painPointKeywords.filter(keyword => allText.includes(keyword));
};

const generateContextualSuggestions = (response: string, conversationState: any): string[] => {
  const stage = conversationState.stage;
  const lowerResponse = response.toLowerCase();
  
  switch (stage) {
    case 'initial':
    case 'discovery':
      return [
        "Could you tell me about your current business operations?",
        "What specific challenges are you facing right now?",
        "What made you consider digital solutions at this time?"
      ];
    
    case 'problem_exploration':
      return [
        "How is this challenge impacting your day-to-day operations?",
        "What would an ideal solution look like for your team?",
        "Have you tried addressing this challenge before?"
      ];
    
    case 'solution_discussion':
      if (lowerResponse.includes('cost') || lowerResponse.includes('price')) {
        return [
          "Would you like to see our flexible pricing options?",
          "Shall we discuss your specific requirements for a detailed quote?",
          "Would you like to explore our different service packages?"
        ];
      }
      return [
        "When would you ideally like to implement this solution?",
        "Who will be the main users of this system?",
        "What features are most important for your team?"
      ];
    
    case 'conversion':
      return [
        "Would you like to schedule a free consultation with our experts?",
        "Should we prepare a detailed proposal for your review?",
        "Would you like to discuss next steps with our team?"
      ];
    
    default:
      if (lowerResponse.includes('web') || lowerResponse.includes('website')) {
        return [
          "What goals do you have for your new website?",
          "Are you looking to generate leads, sell products, or showcase your services?",
          "Would you like to see some of our recent website projects?"
        ];
      } else if (lowerResponse.includes('app') || lowerResponse.includes('application')) {
        return [
          "What platforms would your users primarily use - iOS, Android, or both?",
          "Is this app for your customers or internal team use?",
          "Would you like to explore our app development process?"
        ];
      }
      return [
        "Could you elaborate on that point?",
        "What specific outcomes are you hoping to achieve?",
        "Would you like to explore some examples of similar solutions?"
      ];
  }
};

const shouldRequestFeedback = (stage: string): boolean => {
  // Only request feedback during problem exploration and solution discussion stages
  return ['problem_exploration', 'solution_discussion'].includes(stage);
};

const shouldEscalateBasedOnStage = (conversationState: any, response: string, input: string): boolean => {
  const { stage, responseCount } = conversationState;
  
  // Don't escalate too early in the conversation
  if (responseCount < 3) return false;
  
  // Escalate if they're in conversion stage
  if (stage === 'conversion') return true;
  
  // Escalate if they mention specific complex requirements
  const complexKeywords = ['integration', 'custom', 'complex', 'enterprise', 'advanced', 'specific requirements'];
  const hasComplexNeeds = complexKeywords.some(keyword => 
    input.toLowerCase().includes(keyword) || response.toLowerCase().includes(keyword)
  );
  
  return hasComplexNeeds;
};

const getContextualEscalationMessage = (stage: string): string => {
  switch (stage) {
    case 'conversion':
      return 'Your project sounds exciting! Our solutions architect would love to discuss the specifics and create a tailored plan for your business. Would you like to schedule a brief call?';
    case 'solution_discussion':
      return 'To ensure we recommend the most effective solution for your needs, I\'d be happy to arrange a conversation with one of our technical consultants. They can provide in-depth insights and answer any specific questions you have.';
    default:
      return 'I\'d be happy to connect you with one of our digital transformation specialists who can provide personalized guidance for your specific situation. Would that be helpful?';
  }
};

const extractTopicsFromResponse = (text: string): string[] => {
  const keywords = [
    'web development', 'app development', 'mobile app', 'website', 'seo', 'automation', 
    'business process', 'integration', 'database', 'ecommerce', 'crm', 'inventory',
    'marketing', 'sales', 'customer service', 'reporting', 'analytics', 'payment processing'
  ];
  
  return keywords.filter(keyword => 
    text.toLowerCase().includes(keyword.replace(' ', '').toLowerCase()) ||
    text.toLowerCase().includes(keyword.toLowerCase())
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

    // Store user message in Supabase if session exists (if session is not fallback)
    if (chatSession?.id && !chatSession.id.includes('fallback_')) {
      try {
        await storeChatMessage(chatSession.id, text, false, 'text');
      } catch (error) {
        console.error('Failed to store user message:', error);
        // Continue without storing - functionality should work without database
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
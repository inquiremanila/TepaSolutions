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
import { openRouterService, OpenRouterResponse } from '../services/openrouter';
import { createChatSession, storeChatMessage, updateChatSessionStatus, triggerEscalation, ChatSession } from '../supabase/chat-api';

// UI-focused interfaces
interface UIMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isStreaming?: boolean;
  error?: boolean;
  suggestions?: string[];
  awaitingFeedback?: boolean;
}

interface TicketForm {
  name: string;
  contactNumber: string;
  email: string;
  message: string;
}

// UI States
type ChatState = 'idle' | 'ai_responding' | 'waiting_for_user' | 'escalated';

// Welcome message
const WELCOME_MESSAGE: UIMessage = {
  id: "welcome",
  text: "Hello! I'm Tepabot, your AI assistant at Tepa Solutions. I have deep knowledge of digital technology and business solutions. How can I help you today?",
  isBot: true,
  timestamp: new Date()
};

export function Tepabot() {
  // UI State Management
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatState, setChatState] = useState<ChatState>('idle');
  const [messages, setMessages] = useState<UIMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Support Ticket State
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [ticketForm, setTicketForm] = useState<TicketForm>({
    name: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  // Session Management
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [sessionInitialized, setSessionInitialized] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Initialize chat session when opened
  useEffect(() => {
    if (isOpen && !sessionInitialized) {
      initializeChatSession();
    }
  }, [isOpen, sessionInitialized]);

  // Initialize chat session
  const initializeChatSession = async () => {
    try {
      const session = await createChatSession({
        pageUrl: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent
      });
      setChatSession(session);
      
      // Store welcome message
      if (session.id) {
        await storeChatMessage(
          session.id,
          WELCOME_MESSAGE.text,
          true,
          'system',
          { message_type: 'welcome' }
        );
      }
    } catch (error) {
      console.error('Failed to initialize chat session:', error);
      // Create fallback session for offline functionality
      const fallbackSession: ChatSession = {
        id: `fallback_${Date.now()}`,
        session_token: crypto.randomUUID(),
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
    } finally {
      setSessionInitialized(true);
    }
  };

  // Handle sending messages
  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text || chatState === 'ai_responding') return;

    // Create and add user message
    const userMessage: UIMessage = {
      id: `user_${Date.now()}`,
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowSuggestions(false);
    setChatState('ai_responding');

    // Store user message in database
    if (chatSession?.id && !chatSession.id.startsWith('fallback_')) {
      try {
        await storeChatMessage(chatSession.id, text, false, 'text');
      } catch (error) {
        console.error('Failed to store user message:', error);
      }
    }

    // Check for direct support requests
    if (isDirectSupportRequest(text)) {
      await handleSupportRequest(text);
      return;
    }

    // Get AI response
    await getAIResponse(text);
  };

  // Check if user directly requests support
  const isDirectSupportRequest = (message: string): boolean => {
    const supportKeywords = [
      'live support', 'human', 'agent', 'speak to someone', 'live chat',
      'customer service', 'talk to person', 'real person'
    ];
    const lowerMessage = message.toLowerCase();
    return supportKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  // Handle direct support requests
  const handleSupportRequest = async (userMessage: string) => {
    const supportMessage: UIMessage = {
      id: `support_${Date.now()}`,
      text: "I'd be happy to connect you with our live support team. Please fill out the form below and we'll get you the help you need right away.",
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, supportMessage]);
    setChatState('escalated');
    setShowTicketForm(true);

    // Store escalation in database
    if (chatSession?.id && !chatSession.id.startsWith('fallback_')) {
      try {
        await updateChatSessionStatus(chatSession.id, 'escalated');
        await storeChatMessage(chatSession.id, supportMessage.text, true, 'escalation', {
          escalation_reason: 'Direct support request',
          user_request: userMessage
        });
      } catch (error) {
        console.error('Failed to store escalation:', error);
      }
    }
  };

  // Get AI response (handles both regular and streaming)
  const getAIResponse = async (userMessage: string) => {
    try {
      // Create streaming message placeholder
      const streamingId = `ai_${Date.now()}`;
      const streamingMessage: UIMessage = {
        id: streamingId,
        text: '',
        isBot: true,
        timestamp: new Date(),
        isStreaming: true
      };

      setMessages(prev => [...prev, streamingMessage]);

      let fullResponse = '';
      let aiResponse: OpenRouterResponse | null = null;

      // Use streaming for better UX
      for await (const chunk of openRouterService.getChatResponseStream(userMessage)) {
        if (typeof chunk === 'string') {
          fullResponse += chunk;
          
          // Update streaming message
          setMessages(prev => 
            prev.map(msg => 
              msg.id === streamingId 
                ? { ...msg, text: fullResponse }
                : msg
            )
          );

          // Small delay for visible streaming effect
          await new Promise(resolve => setTimeout(resolve, 15));
        } else {
          // Final response object
          aiResponse = chunk;
        }
      }

      // Finalize the message
      const finalMessage: UIMessage = {
        id: streamingId,
        text: fullResponse,
        isBot: true,
        timestamp: new Date(),
        isStreaming: false,
        suggestions: aiResponse?.suggestions || []
      };

      setMessages(prev => 
        prev.map(msg => 
          msg.id === streamingId ? finalMessage : msg
        )
      );

      // Handle suggestions
      if (aiResponse?.suggestions && aiResponse.suggestions.length > 0) {
        setCurrentSuggestions(aiResponse.suggestions);
        setTimeout(() => setShowSuggestions(true), 1000);
      }

      // Handle escalation if needed
      if (aiResponse?.shouldEscalate) {
        setTimeout(() => handleAIEscalation(aiResponse), 2000);
      }

      // Store AI response in database
      if (chatSession?.id && !chatSession.id.startsWith('fallback_')) {
        try {
          await storeChatMessage(chatSession.id, fullResponse, true, 'text', {
            suggestions_provided: aiResponse?.suggestions || [],
            escalation_triggered: aiResponse?.shouldEscalate || false,
            conversation_metrics: aiResponse?.conversationMetrics
          });
        } catch (error) {
          console.error('Failed to store AI response:', error);
        }
      }

    } catch (error) {
      console.error('AI response error:', error);
      
      // Show error message
      const errorMessage: UIMessage = {
        id: `error_${Date.now()}`,
        text: "I'm experiencing technical difficulties. Let me connect you with our support team for immediate assistance.",
        isBot: true,
        timestamp: new Date(),
        error: true
      };

      setMessages(prev => [...prev, errorMessage]);
      
      // Auto-show support form on error
      setTimeout(() => setShowTicketForm(true), 1000);
    } finally {
      setChatState('waiting_for_user');
    }
  };

  // Handle AI-suggested escalation
  const handleAIEscalation = async (response: OpenRouterResponse) => {
    const escalationMessage: UIMessage = {
      id: `escalation_${Date.now()}`,
      text: getEscalationMessage(response.escalationReason || ''),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, escalationMessage]);
    setChatState('escalated');

    // Trigger escalation in database
    if (chatSession?.id && !chatSession.id.startsWith('fallback_')) {
      try {
        await triggerEscalation(
          chatSession.id, 
          response.escalationReason || 'AI-suggested escalation',
          '',
          response.response
        );
      } catch (error) {
        console.error('Failed to trigger escalation:', error);
      }
    }
  };

  // Get contextual escalation message
  const getEscalationMessage = (reason: string): string => {
    switch (reason) {
      case 'Complex technical requirements detected':
        return "Your project sounds technically sophisticated! I'd love to connect you with one of our solution architects who can dive deep into the technical details and requirements.";
      case 'User ready for consultation':
        return "It sounds like you're ready to move forward! Would you like me to arrange a consultation with our team to discuss your project in detail?";
      default:
        return "I think our specialists could provide more detailed guidance for your specific situation. Would you like me to connect you with our team?";
    }
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    setShowSuggestions(false);
    handleSendMessage(suggestion);
  };

  // Handle feedback (thumbs up/down)
  const handleFeedback = (messageId: string, isPositive: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, awaitingFeedback: false }
        : msg
    ));

    if (isPositive) {
      toast.success('Thank you for the positive feedback!');
    } else {
      // Negative feedback triggers support form
      const feedbackMessage: UIMessage = {
        id: `feedback_${Date.now()}`,
        text: 'I apologize that my response wasn\'t helpful. Let me connect you with our live support team for better assistance.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, feedbackMessage]);
      setTimeout(() => setShowTicketForm(true), 1000);
    }
  };

  // Handle file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...files]);
      
      const fileMessage: UIMessage = {
        id: `file_${Date.now()}`,
        text: `📎 Uploaded ${files.length} file(s): ${files.map(f => f.name).join(', ')}`,
        isBot: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  // Remove uploaded file
  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle Enter key in input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle support ticket submission
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

      const successMessage: UIMessage = {
        id: `success_${Date.now()}`,
        text: 'Perfect! I\'ve created your support ticket. Our team will contact you shortly, and you\'ll receive a confirmation email with your ticket reference number.',
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, successMessage]);
      setShowTicketForm(false);
      resetTicketForm();
      
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

  // Reset ticket form
  const resetTicketForm = () => {
    setTicketForm({ name: '', contactNumber: '', email: '', message: '' });
    setAttachedFiles([]);
  };

  // Reset entire chat
  const resetChat = async () => {
    // Complete current session
    if (chatSession?.id && !chatSession.id.startsWith('fallback_')) {
      try {
        await updateChatSessionStatus(chatSession.id, 'completed');
      } catch (error) {
        console.error('Failed to complete chat session:', error);
      }
    }

    // Reset all state
    setMessages([WELCOME_MESSAGE]);
    setShowTicketForm(false);
    setShowSuggestions(false);
    setCurrentSuggestions([]);
    setChatState('idle');
    resetTicketForm();
    setSessionInitialized(false);
    setChatSession(null);
    
    // Reset AI service
    openRouterService.resetConversation();
  };

  // Floating chat button (when closed)
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
        {/* Chat Header */}
        <CardHeader className="p-4 bg-primary text-primary-foreground rounded-t-lg flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              {chatState === 'ai_responding' ? (
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
                <div className={`w-2 h-2 rounded-full ${
                  chatState === 'ai_responding' ? 'bg-yellow-400' : 
                  chatState === 'escalated' ? 'bg-orange-400' : 'bg-green-400'
                }`}></div>
                <span className="text-xs opacity-90">
                  {chatState === 'ai_responding' ? 'Thinking...' : 
                   chatState === 'escalated' ? 'Support Ready' : 'Online'}
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
              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                      {/* Avatar */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.isBot ? 'bg-primary/10' : 'bg-primary'
                      }`}>
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

                      {/* Message Bubble */}
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
                        
                        {/* Feedback Buttons */}
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

                {/* Suggestions */}
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
                          disabled={chatState === 'ai_responding'}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Support Ticket Form */}
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
                        
                        {/* File Upload */}
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

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={chatState === 'ai_responding' ? "AI is responding..." : "Type your message..."}
                    className="flex-1"
                    disabled={chatState === 'ai_responding'}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="shrink-0"
                    disabled={chatState === 'ai_responding'}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={() => handleSendMessage()} 
                    size="icon" 
                    disabled={!inputValue.trim() || chatState === 'ai_responding'}
                  >
                    {chatState === 'ai_responding' ? (
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

                {/* Footer */}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-muted-foreground">Powered by Tepa Solutions</p>
                    {chatState !== 'idle' && (
                      <Badge 
                        variant={chatState === 'escalated' ? 'destructive' : 'secondary'} 
                        className="text-xs"
                      >
                        {chatState === 'escalated' ? 'Support Mode' : 'AI Powered'}
                      </Badge>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetChat} 
                    className="text-xs h-6" 
                    disabled={chatState === 'ai_responding'}
                  >
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
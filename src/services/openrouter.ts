// Server-side AI chat integration using Supabase Edge Function
const AI_CHAT_ENDPOINT = '/functions/v1/ai-chat';

// Import the fallback values at module level
import { projectId, publicAnonKey } from '../supabase/info';

// Get Supabase URL for API calls with secure fallback
const getSupabaseUrl = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    if (import.meta.env.PROD) {
      throw new Error('VITE_SUPABASE_URL is required in production');
    }
    return `https://${projectId}.supabase.co`;
  }
  return supabaseUrl;
};

// Get Supabase anon key with secure fallback
const getSupabaseAnonKey = () => {
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!anonKey) {
    if (import.meta.env.PROD) {
      throw new Error('VITE_SUPABASE_ANON_KEY is required in production');
    }
    return publicAnonKey;
  }
  return anonKey;
};

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ConversationMetrics {
  messageCount: number;
  topicsDiscussed: string[];
  userIntentSignals: string[];
  conversationStage: 'initial' | 'discovery' | 'solution_discussion' | 'conversion';
  lastUserMessage: string;
}

export interface OpenRouterResponse {
  response: string;
  suggestions?: string[];
  shouldEscalate?: boolean;
  escalationReason?: string;
  error?: string;
  conversationMetrics?: ConversationMetrics;
}

// Updated system prompt focusing exclusively on business
const TEPA_AI_SYSTEM_PROMPT = `You are Tepabot, an AI assistant for Tepa Solutions - a Philippine digital innovation company. You specialize in:

SERVICES WE PROVIDE:
- App Development (Mobile & Web Applications)
- Web Development (Modern, responsive websites)
- SEO Solutions (Keyword optimization, content strategy)
- Business Automation (Sales, marketing, HR, finance processes)

CONVERSATION GUIDELINES:
- Focus exclusively on business and technology-related inquiries
- Politely redirect personal conversations back to business topics
- Ask questions to understand business needs and challenges
- Provide helpful information about our services
- Keep responses professional and business-appropriate
- If users share personal issues, acknowledge briefly then redirect to business
- Be enthusiastic about budget constraints - emphasize our affordable solutions

REDIRECTION EXAMPLES:
If someone shares personal issues: "I understand this is a challenging time. How can we help with your business needs today?"
If conversation goes off-topic: "That's interesting! Getting back to how we can help your business, what challenges are you facing?"

BUDGET RESPONSE GUIDELINES:
- Always respond enthusiastically to budget concerns
- Emphasize that we offer affordable solutions
- Highlight our flexible pricing options
- Example: "That's no problem at all! We at Tepa Solutions specialize in creating affordable solutions that deliver real value. Let's discuss what you need and I'll show you how we can work within your budget."

Remember: Your primary role is to assist with business inquiries about Tepa Solutions' services.`;

// FAQ responses for common queries
export const FAQ_RESPONSES = {
  pricing: "That's no problem at all! We at Tepa Solutions specialize in creating affordable solutions that deliver real value. Our pricing varies based on project scope, and we offer flexible packages to fit different budgets. Would you like to discuss your specific needs for a detailed quote?",
  timeline: "Timeline depends on the project complexity: Simple websites typically take 2-4 weeks, while complex applications can take 2-6 months. What type of project are you considering?",
  technologies: "We work with modern technologies including React, Node.js, Python, AWS, Azure, and various automation tools. What kind of solution are you looking to build?",
  consultation: "We offer free initial consultations to understand your needs and propose the best solutions. Would you like to schedule a consultation with our team?",
  process: "Our process includes: Consultation → Planning → Design → Development → Testing → Deployment. We keep you involved at every step. What questions do you have about our approach?",
  maintenance: "Yes, we provide ongoing maintenance and support for all our solutions. This includes updates, bug fixes, and feature enhancements. Would you like to know more about our support packages?"
};

export class OpenRouterService {
  private conversationHistory: ChatMessage[] = [];
  
  constructor() {
    this.conversationHistory = [
      {
        role: 'system',
        content: TEPA_AI_SYSTEM_PROMPT
      }
    ];
  }

  // Check if message is off-topic (personal)
  private handleOffTopic(message: string): { response: string; shouldRedirect: boolean } {
    const personalTopics = [
      'relationship', 'boyfriend', 'girlfriend', 'breakup', 'personal',
      'family', 'emotional', 'feelings', 'dating', 'marriage', 'sad',
      'depressed', 'lonely', 'heartbroken', 'cry', 'crying'
    ];
    
    const lowerMessage = message.toLowerCase();
    const isPersonal = personalTopics.some(topic => lowerMessage.includes(topic));
    
    if (isPersonal) {
      return {
        response: "I understand this is a challenging time. At Tepa Solutions, we focus on helping businesses with their digital needs. How can we assist with your business today?",
        shouldRedirect: true
      };
    }
    
    return { response: '', shouldRedirect: false };
  }

  // Check if message matches FAQ patterns
  private checkFAQ(message: string): string | null {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || lowerMessage.includes('budget') || lowerMessage.includes('afford') || lowerMessage.includes('cheap')) {
      return FAQ_RESPONSES.pricing;
    }
    
    if (lowerMessage.includes('timeline') || lowerMessage.includes('how long') || lowerMessage.includes('when')) {
      return FAQ_RESPONSES.timeline;
    }
    
    if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('what do you use')) {
      return FAQ_RESPONSES.technologies;
    }
    
    if (lowerMessage.includes('consultation') || lowerMessage.includes('meeting') || lowerMessage.includes('discuss')) {
      return FAQ_RESPONSES.consultation;
    }
    
    if (lowerMessage.includes('process') || lowerMessage.includes('how do you work') || lowerMessage.includes('methodology')) {
      return FAQ_RESPONSES.process;
    }
    
    if (lowerMessage.includes('maintenance') || lowerMessage.includes('support') || lowerMessage.includes('after launch')) {
      return FAQ_RESPONSES.maintenance;
    }
    
    return null;
  }

  // Simple conversation metrics for UI decision making
  private getConversationMetrics(): ConversationMetrics {
    const userMessages = this.conversationHistory.filter(m => m.role === 'user');
    const lastUserMessage = userMessages[userMessages.length - 1]?.content || '';
    const allUserText = userMessages.map(m => m.content.toLowerCase()).join(' ');
    
    // Simple topic extraction
    const topics: string[] = [];
    if (allUserText.includes('website') || allUserText.includes('web')) topics.push('web development');
    if (allUserText.includes('app') || allUserText.includes('mobile')) topics.push('app development');
    if (allUserText.includes('seo') || allUserText.includes('search')) topics.push('seo');
    if (allUserText.includes('automation') || allUserText.includes('process')) topics.push('automation');
    if (allUserText.includes('price') || allUserText.includes('budget') || allUserText.includes('cost')) topics.push('pricing');
    
    // Simple intent signals
    const intentSignals: string[] = [];
    if (allUserText.includes('price') || allUserText.includes('cost')) intentSignals.push('pricing_inquiry');
    if (allUserText.includes('when') || allUserText.includes('timeline')) intentSignals.push('timeline_inquiry');
    if (allUserText.includes('get started') || allUserText.includes('consultation')) intentSignals.push('ready_to_proceed');
    if (allUserText.includes('budget') || allUserText.includes('afford')) intentSignals.push('budget_concern');
    
    // Simple stage detection
    let stage: ConversationMetrics['conversationStage'] = 'initial';
    if (userMessages.length > 2) stage = 'discovery';
    if (topics.length > 0) stage = 'solution_discussion';
    if (intentSignals.includes('ready_to_proceed')) stage = 'conversion';
    
    return {
      messageCount: userMessages.length,
      topicsDiscussed: topics,
      userIntentSignals: intentSignals,
      conversationStage: stage,
      lastUserMessage
    };
  }

  // Generate simple suggestions based on conversation context
  private generateSuggestions(response: string, metrics: ConversationMetrics): string[] {
    const suggestions: string[] = [];
    const { conversationStage, topicsDiscussed, userIntentSignals } = metrics;
    
    switch (conversationStage) {
      case 'initial':
      case 'discovery':
        suggestions.push(
          "Tell me about your current business challenges",
          "What specific goals are you hoping to achieve?",
          "What's your biggest pain point right now?"
        );
        break;
        
      case 'solution_discussion':
        if (topicsDiscussed.includes('web development')) {
          suggestions.push(
            "What features would be most important for your website?",
            "Who is your target audience?",
            "Do you have existing branding or content?"
          );
        } else if (topicsDiscussed.includes('app development')) {
          suggestions.push(
            "Would this be for iOS, Android, or both platforms?",
            "What's the main purpose of your app?",
            "Do you need integration with existing systems?"
          );
        } else if (topicsDiscussed.includes('pricing') || userIntentSignals.includes('budget_concern')) {
          suggestions.push(
            "What's your approximate budget range?",
            "Would you like to see our affordable starter packages?",
            "Can we discuss a phased approach to fit your budget?"
          );
        } else {
          suggestions.push(
            "Can you tell me more about your specific requirements?",
            "What would success look like for this project?",
            "What's your timeline for implementation?"
          );
        }
        break;
        
      case 'conversion':
        suggestions.push(
          "Would you like to schedule a free consultation?",
          "Can we prepare a detailed proposal for you?",
          "What questions do you have about our process?"
        );
        break;
    }
    
    return suggestions.slice(0, 3); // Limit to 3 suggestions
  }

  // Check if conversation should escalate to human support
  private shouldEscalate(message: string, metrics: ConversationMetrics): { should: boolean; reason?: string } {
    const lowerMessage = message.toLowerCase();
    
    // Direct requests for human support
    if (lowerMessage.includes('human') || lowerMessage.includes('agent') || lowerMessage.includes('speak to someone')) {
      return { should: true, reason: 'Direct request for human support' };
    }
    
    // Complex requirements that need technical consultation
    const complexKeywords = ['integration', 'enterprise', 'custom api', 'complex', 'advanced'];
    if (complexKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return { should: true, reason: 'Complex technical requirements detected' };
    }
    
    // Ready to proceed indicators
    if (metrics.conversationStage === 'conversion' && metrics.userIntentSignals.includes('ready_to_proceed')) {
      return { should: true, reason: 'User ready for consultation' };
    }
    
    // Long conversation without progression
    if (metrics.messageCount > 6 && metrics.conversationStage === 'discovery') {
      return { should: true, reason: 'Extended discovery phase' };
    }
    
    return { should: false };
  }

  // Main method for getting AI responses
  async getChatResponse(userMessage: string): Promise<OpenRouterResponse> {
    try {
      // Check for off-topic conversations first
      const offTopicCheck = this.handleOffTopic(userMessage);
      if (offTopicCheck.shouldRedirect) {
        this.conversationHistory.push({
          role: 'user',
          content: userMessage
        });
        
        this.conversationHistory.push({
          role: 'assistant',
          content: offTopicCheck.response
        });
        
        return {
          response: offTopicCheck.response,
          suggestions: ['Tell me about your web development services', 'I need help with business automation', 'What SEO services do you offer?'],
          conversationMetrics: this.getConversationMetrics()
        };
      }

      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      // Get conversation metrics
      const metrics = this.getConversationMetrics();
      
      // Check for FAQ first (immediate response)
      const faqResponse = this.checkFAQ(userMessage);
      if (faqResponse) {
        this.conversationHistory.push({
          role: 'assistant',
          content: faqResponse
        });
        
        return {
          response: faqResponse,
          suggestions: this.generateSuggestions(faqResponse, metrics),
          conversationMetrics: metrics
        };
      }

      // Check escalation conditions
      const escalation = this.shouldEscalate(userMessage, metrics);

      // Call server for AI response
      const supabaseUrl = getSupabaseUrl();
      const response = await fetch(`${supabaseUrl}${AI_CHAT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': getSupabaseAnonKey(),
          'Authorization': `Bearer ${getSupabaseAnonKey()}`
        },
        body: JSON.stringify({
          messages: this.conversationHistory,
          conversationMetrics: metrics,
          escalationCheck: escalation
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.response || this.getFallbackResponse();

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse
      });

      // Keep history manageable (last 20 messages)
      if (this.conversationHistory.length > 21) {
        this.conversationHistory = [
          this.conversationHistory[0], // Keep system prompt
          ...this.conversationHistory.slice(-20)
        ];
      }

      return {
        response: aiResponse,
        suggestions: this.generateSuggestions(aiResponse, metrics),
        shouldEscalate: escalation.should,
        escalationReason: escalation.reason,
        conversationMetrics: metrics
      };

    } catch (error) {
      console.error('OpenRouter service error:', error);
      return {
        response: this.getFallbackResponse(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Streaming response for better UX
  async *getChatResponseStream(userMessage: string): AsyncGenerator<string, OpenRouterResponse, unknown> {
    try {
      // Check for off-topic conversations first
      const offTopicCheck = this.handleOffTopic(userMessage);
      if (offTopicCheck.shouldRedirect) {
        // Stream the redirect response
        for (const char of offTopicCheck.response) {
          yield char;
          await new Promise(resolve => setTimeout(resolve, 20));
        }
        
        this.conversationHistory.push({
          role: 'user',
          content: userMessage
        });
        
        this.conversationHistory.push({
          role: 'assistant',
          content: offTopicCheck.response
        });

        return {
          response: offTopicCheck.response,
          suggestions: ['Tell me about your web development services', 'I need help with business automation', 'What SEO services do you offer?'],
          conversationMetrics: this.getConversationMetrics()
        };
      }

      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      const metrics = this.getConversationMetrics();
      
      // Check for FAQ first
      const faqResponse = this.checkFAQ(userMessage);
      if (faqResponse) {
        // Stream FAQ response character by character for consistent UX
        for (const char of faqResponse) {
          yield char;
          await new Promise(resolve => setTimeout(resolve, 20));
        }
        
        this.conversationHistory.push({
          role: 'assistant',
          content: faqResponse
        });

        return {
          response: faqResponse,
          suggestions: this.generateSuggestions(faqResponse, metrics),
          conversationMetrics: metrics
        };
      }

      const escalation = this.shouldEscalate(userMessage, metrics);

      // Call server for streaming response
      const supabaseUrl = getSupabaseUrl();
      const response = await fetch(`${supabaseUrl}${AI_CHAT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': getSupabaseAnonKey(),
          'Authorization': `Bearer ${getSupabaseAnonKey()}`
        },
        body: JSON.stringify({
          messages: this.conversationHistory,
          conversationMetrics: metrics,
          escalationCheck: escalation,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body received');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullResponse = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                this.conversationHistory.push({
                  role: 'assistant',
                  content: fullResponse
                });

                // Keep history manageable
                if (this.conversationHistory.length > 21) {
                  this.conversationHistory = [
                    this.conversationHistory[0],
                    ...this.conversationHistory.slice(-20)
                  ];
                }

                return {
                  response: fullResponse,
                  suggestions: this.generateSuggestions(fullResponse, metrics),
                  shouldEscalate: escalation.should,
                  escalationReason: escalation.reason,
                  conversationMetrics: metrics
                };
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.content;
                
                if (content) {
                  fullResponse += content;
                  yield content;
                }
              } catch (e) {
                // Skip malformed JSON
              }
            }
          }
        }
        
        // If we exit the loop without returning, provide a fallback response
        this.conversationHistory.push({
          role: 'assistant',
          content: fullResponse || this.getFallbackResponse()
        });

        return {
          response: fullResponse || this.getFallbackResponse(),
          suggestions: this.generateSuggestions(fullResponse || this.getFallbackResponse(), metrics),
          shouldEscalate: escalation.should,
          escalationReason: escalation.reason,
          conversationMetrics: metrics
        };
        
      } finally {
        reader.releaseLock();
      }

    } catch (error) {
      console.error('Streaming error:', error);
      const fallbackMessage = this.getFallbackResponse();
      
      // Stream fallback response
      for (const char of fallbackMessage) {
        yield char;
        await new Promise(resolve => setTimeout(resolve, 30));
      }

      return {
        response: fallbackMessage,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Simple fallback response
  private getFallbackResponse(): string {
    const responses = [
      "I'm here to help with your digital solution needs. Could you tell me more about what you're looking for?",
      "I'd be happy to assist you with information about our services. What specific questions do you have?",
      "Let me connect you with the right information. What type of solution are you considering?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Reset conversation for new sessions
  resetConversation() {
    this.conversationHistory = [
      {
        role: 'system',
        content: TEPA_AI_SYSTEM_PROMPT
      }
    ];
  }

  // Export conversation for storage
  exportConversation(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  // Import conversation from storage
  importConversation(messages: ChatMessage[]) {
    this.conversationHistory = messages;
  }
}

// Export singleton instance
export const openRouterService = new OpenRouterService();
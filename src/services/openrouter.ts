// Secure server-side AI chat integration using Supabase Edge Function
const AI_CHAT_ENDPOINT = '/functions/v1/ai-chat';

// Import the fallback values at module level
import { projectId, publicAnonKey } from '../supabase/info';

// Get Supabase URL for API calls with secure fallback
const getSupabaseUrl = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    // In production, we should fail fast instead of using fallbacks
    if (import.meta.env.PROD) {
      throw new Error('VITE_SUPABASE_URL is required in production');
    }
    // For development only, use info.tsx fallback
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
    // Development fallback
    return publicAnonKey;
  }
  return anonKey;
};

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ConversationState {
  stage: string;
  topicsDiscussed: string[];
  uncertaintyLevel: string;
  businessType: string;
  painPoints: string[];
  responseCount: number;
}

export interface OpenRouterResponse {
  response: string;
  error?: string;
  conversationState?: ConversationState;
}

// Enhanced customer support system prompt with exploratory conversation flow
const CUSTOMER_SUPPORT_PROMPT = `You are Tepabot, an advanced AI customer support assistant for Tepa Solutions, a growing Philippine-based startup founded in 2024 by Jerrie Mataya. You specialize in making technology simpler and more useful for businesses.

COMPANY INFORMATION:
- Services: App Development, Web Development, SEO Solutions, Business Automation
- Contact: inquire@tepasolutions.asia, +63 2 8 558 1237
- Founded: 2024 by Jerrie Mataya
- Location: Philippines (serving locally and internationally)
- Focus: Digital transformation and business automation

SERVICE DETAILS:
- App Development: Mobile and web applications, scalable and user-focused
- Web Development: Modern, responsive websites using React, Node.js, cloud platforms
- SEO Solutions: Keyword optimization, content strategy, technical SEO
- Business Automation: Sales, marketing, HR, finance, inventory, support processes

PROJECT APPROACH:
- Process: Consultation → Planning → Design → Development → Testing → Deployment
- Timeline: Websites 2-4 weeks, Complex apps 2-6 months
- Technologies: React, Node.js, Python, AWS, Azure, various automation tools
- Free initial consultations available
- Ongoing maintenance and support included

EXPLORATORY CONVERSATION APPROACH:
When someone says they don't know what they want yet or seems uncertain, use this natural conversation flow:

1. Start with: "What does your day-to-day look like right now, and where do you feel stuck?"

2. Then listen to their response and ask ONE relevant follow-up question based on what they actually said, such as:
   - "How long has that been an issue for you?"
   - "What have you tried so far to solve it?"
   - "How much time does that take you each day/week?"
   - "What would it look like if that problem was solved?"
   - "Who else is affected by this?"
   - "What's the most frustrating part about it?"
   - "How do you handle it currently?"
   - "What would change for your business if this was easier?"

3. Build the conversation organically - ask questions that flow naturally from their previous answer
4. Stay curious, not pushy or salesy
5. Let them guide the direction of the conversation
6. Only suggest solutions after you understand their actual situation

CONVERSATION GUIDELINES:
- Be conversational, human-like, and genuinely curious
- Ask ONE question at a time, never multiple questions in a single response
- Listen carefully to their answers and respond specifically to what they said
- Don't jump to solutions too quickly - understand their problem first
- Avoid overwhelming them with information or options
- Keep responses natural and engaging
- Show genuine interest in helping them figure out what they need
- Only mention specific services when they're directly relevant to their situation

IMPORTANT BEHAVIORAL RULES:
- Never use aggressive sales tactics
- Don't ask "Is there anything else I can help you with?" unless it feels genuinely natural
- Focus on understanding their business challenges first
- Be patient - let the conversation unfold naturally
- If they seem ready to move forward, then suggest next steps like consultation
- Always stay authentic to helping them solve real problems

Remember: The goal is to have a natural, helpful conversation that uncovers their real needs through genuine curiosity, not to push them toward any particular service.`;

// Updated model recommendations with your preferred choices
export const RECOMMENDED_MODELS = {
  // Free models for development/testing - using your preferred models
  free: [
    'deepseek/deepseek-chat-v3.1:free',
    'openai/gpt-oss-120b:free',
  ],
  // Premium models for production (backup options)
  premium: [
    'anthropic/claude-3.5-sonnet',
    'openai/gpt-4o-mini',
    'deepseek/deepseek-chat',
  ]
};

export class OpenRouterService {
  private model: string;
  private conversationHistory: ChatMessage[] = [];
  private responseCount: number = 0;
  private conversationState: ConversationState;

  constructor(model?: string) {
    // Default to your preferred free model
    this.model = model || RECOMMENDED_MODELS.free[0];
    
    // Initialize conversation state
    this.conversationState = {
      stage: 'initial',
      topicsDiscussed: [],
      uncertaintyLevel: 'unknown',
      businessType: 'unknown',
      painPoints: [],
      responseCount: 0
    };
    
    // Initialize with system prompt
    this.conversationHistory = [
      {
        role: 'system',
        content: CUSTOMER_SUPPORT_PROMPT
      }
    ];
  }

  // Store context (will be sent with each request)
  private contextInfo: string[] = [];
  
  addContext(context: string) {
    this.contextInfo.push(context);
    // Keep only last 5 context items
    this.contextInfo = this.contextInfo.slice(-5);
  }
  
  // Get context as string for server request
  private getContextString(): string {
    return this.contextInfo.length > 0 ? this.contextInfo.join('; ') : '';
  }

  // Detect uncertainty level from user message
  private detectUncertaintyLevel(message: string): string {
    const uncertaintyPhrases = [
      "don't know", "not sure", "maybe", "i think", "probably", 
      "perhaps", "uncertain", "confused", "unclear"
    ];
    
    const lowerMessage = message.toLowerCase();
    const uncertaintyCount = uncertaintyPhrases.filter(phrase => 
      lowerMessage.includes(phrase)
    ).length;
    
    if (uncertaintyCount >= 2) return 'high';
    if (uncertaintyCount === 1) return 'medium';
    return 'low';
  }

  // Determine conversation stage based on message content
  private determineConversationStage(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Check for uncertainty indicators
    if (lowerMessage.includes("don't know") || lowerMessage.includes("not sure") || 
        lowerMessage.includes("uncertain") || lowerMessage.includes("exploring options")) {
      return 'discovery';
    }
    
    // Check for pain points or challenges
    const painPointKeywords = ['problem', 'issue', 'challenge', 'difficult', 'frustrating', 'slow', 'manual', 'time-consuming'];
    if (painPointKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'problem_exploration';
    }
    
    // Check for specific solutions discussion
    const solutionKeywords = ['website', 'app', 'seo', 'automation', 'system', 'platform'];
    if (solutionKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'solution_discussion';
    }
    
    // Check for conversion intent
    const conversionKeywords = ['price', 'cost', 'quote', 'consultation', 'get started', 'how much'];
    if (conversionKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'conversion';
    }
    
    return this.responseCount === 0 ? 'initial' : 'ongoing_discovery';
  }

  // Extract business type from conversation
  private extractBusinessType(messages: ChatMessage[]): string {
    const businessTypes = ['restaurant', 'retail', 'ecommerce', 'service', 'consulting', 'healthcare', 'education', 'manufacturing'];
    const allText = messages.map(m => m.content.toLowerCase()).join(' ');
    
    for (const type of businessTypes) {
      if (allText.includes(type)) return type;
    }
    return 'unknown';
  }

  // Extract pain points from conversation
  private extractPainPoints(messages: ChatMessage[]): string[] {
    const painPointKeywords = [
      'slow', 'manual', 'time-consuming', 'frustrating', 'difficult', 'complicated',
      'expensive', 'inefficient', 'outdated', 'broken', 'confusing', 'overwhelming'
    ];
    
    const allText = messages.map(m => m.content.toLowerCase()).join(' ');
    return painPointKeywords.filter(keyword => allText.includes(keyword));
  }

  // Update conversation state based on new message
  private updateConversationState(userMessage: string) {
    this.conversationState.stage = this.determineConversationStage(userMessage);
    this.conversationState.uncertaintyLevel = this.detectUncertaintyLevel(userMessage);
    this.conversationState.businessType = this.extractBusinessType(this.conversationHistory);
    this.conversationState.painPoints = this.extractPainPoints(this.conversationHistory);
    this.conversationState.responseCount = this.responseCount;
    
    // Extract topics from recent conversation
    const recentMessages = this.conversationHistory.slice(-4).map(m => m.content).join(' ');
    const topicKeywords = [
      'web development', 'app development', 'mobile app', 'website', 'seo', 'automation',
      'business process', 'integration', 'database', 'ecommerce', 'crm', 'inventory'
    ];
    
    const newTopics = topicKeywords.filter(topic => 
      recentMessages.toLowerCase().includes(topic.toLowerCase())
    );
    
    this.conversationState.topicsDiscussed = [
      ...new Set([...this.conversationState.topicsDiscussed, ...newTopics])
    ].slice(-5); // Keep last 5 topics
  }

  // Enhanced context management
  private shouldOptimizeModel(userMessage: string): string {
    const complexityIndicators = [
      'complex', 'detailed', 'technical', 'architecture', 'integration', 
      'advanced', 'custom', 'enterprise', 'scalable', 'performance'
    ];
    
    const isComplex = complexityIndicators.some(indicator => 
      userMessage.toLowerCase().includes(indicator)
    );
    
    // Use better model for complex queries
    return isComplex ? RECOMMENDED_MODELS.free[1] : this.model;
  }

  // Build enhanced context for the server
  private buildEnhancedContext(): string {
    let context = this.getContextString();
    
    if (this.conversationState) {
      context += ` | Stage: ${this.conversationState.stage}`;
      context += ` | Uncertainty: ${this.conversationState.uncertaintyLevel}`;
      
      if (this.conversationState.businessType !== 'unknown') {
        context += ` | Business: ${this.conversationState.businessType}`;
      }
      
      if (this.conversationState.topicsDiscussed.length > 0) {
        context += ` | Topics: ${this.conversationState.topicsDiscussed.join(', ')}`;
      }
      
      if (this.conversationState.painPoints.length > 0) {
        context += ` | Pain points: ${this.conversationState.painPoints.join(', ')}`;
      }
    }
    
    return context;
  }

  // Get AI response (non-streaming) via secure server endpoint
  async getChatResponse(userMessage: string): Promise<OpenRouterResponse> {
    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      this.responseCount++;
      this.updateConversationState(userMessage);

      // Optimize model selection based on query complexity
      const selectedModel = this.shouldOptimizeModel(userMessage);

      const supabaseUrl = getSupabaseUrl();
      const response = await fetch(`${supabaseUrl}${AI_CHAT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': getSupabaseAnonKey(),
          'Authorization': `Bearer ${getSupabaseAnonKey()}`
        },
        body: JSON.stringify({
          messages: this.conversationHistory.slice(1), // Exclude system prompt (handled server-side)
          context: this.buildEnhancedContext(),
          stream: false,
          model: selectedModel,
          responseCount: this.responseCount,
          conversationState: this.conversationState
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.response || this.getFallbackResponse(this.conversationState.stage);

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse
      });

      // Keep conversation history manageable (last 12 exchanges for better context)
      if (this.conversationHistory.length > 25) { // system + 12 exchanges
        this.conversationHistory = [
          this.conversationHistory[0], // Keep system prompt
          ...this.conversationHistory.slice(-24) // Keep last 24 messages
        ];
      }

      return { 
        response: aiResponse,
        conversationState: this.conversationState
      };

    } catch (error) {
      console.error('AI chat API error:', error);
      const fallbackResponse = this.getFallbackResponse(this.conversationState.stage);
      
      return {
        response: fallbackResponse,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Enhanced streaming response with conversation state management
  async *getChatResponseStream(userMessage: string): AsyncGenerator<string, void, unknown> {
    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      this.responseCount++;
      this.updateConversationState(userMessage);

      // Optimize model selection
      const selectedModel = this.shouldOptimizeModel(userMessage);

      const supabaseUrl = getSupabaseUrl();
      const response = await fetch(`${supabaseUrl}${AI_CHAT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': getSupabaseAnonKey(),
          'Authorization': `Bearer ${getSupabaseAnonKey()}`
        },
        body: JSON.stringify({
          messages: this.conversationHistory.slice(1), // Exclude system prompt (handled server-side)
          context: this.buildEnhancedContext(),
          stream: true,
          model: selectedModel,
          responseCount: this.responseCount,
          conversationState: this.conversationState
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
                // Add complete assistant response to history
                this.conversationHistory.push({
                  role: 'assistant',
                  content: fullResponse
                });

                // Keep conversation history manageable
                if (this.conversationHistory.length > 25) {
                  this.conversationHistory = [
                    this.conversationHistory[0],
                    ...this.conversationHistory.slice(-24)
                  ];
                }
                return;
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
      } finally {
        reader.releaseLock();
      }

    } catch (error) {
      console.error('AI streaming error:', error);
      const fallbackMessage = this.getFallbackResponse(this.conversationState.stage);
      yield fallbackMessage;
    }
  }

  // Get appropriate fallback response based on conversation stage
  private getFallbackResponse(stage: string): string {
    switch (stage) {
      case 'discovery':
        return "What does your day-to-day look like right now, and where do you feel stuck?";
      case 'problem_exploration':
        return "Tell me more about that challenge. How is it affecting your business?";
      case 'solution_discussion':
        return "Based on what you've shared, there are a few ways we could help. What would your ideal solution look like?";
      case 'conversion':
        return "I'd love to connect you with our team for a detailed discussion. Would you like me to arrange a consultation?";
      default:
        return "I'm here to help you figure out the best digital solution for your business. What's on your mind?";
    }
  }

  // Reset conversation (for new chat sessions)
  resetConversation() {
    this.conversationHistory = [
      {
        role: 'system',
        content: CUSTOMER_SUPPORT_PROMPT
      }
    ];
    this.contextInfo = [];
    this.responseCount = 0;
    this.conversationState = {
      stage: 'initial',
      topicsDiscussed: [],
      uncertaintyLevel: 'unknown',
      businessType: 'unknown',
      painPoints: [],
      responseCount: 0
    };
  }

  // Change model (e.g., upgrade to premium for complex queries)
  setModel(model: string) {
    this.model = model;
  }

  // Get conversation stats
  getConversationStats(): { length: number; responseCount: number; model: string; state: ConversationState } {
    return {
      length: this.conversationHistory.length,
      responseCount: this.responseCount,
      model: this.model,
      state: this.conversationState
    };
  }

  // Get current conversation state
  getConversationState(): ConversationState {
    return { ...this.conversationState };
  }

  // Export conversation for Supabase storage
  exportConversation(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  // Import conversation from Supabase
  importConversation(messages: ChatMessage[]) {
    this.conversationHistory = messages;
    this.responseCount = Math.floor(messages.length / 2); // Approximate
    
    // Rebuild conversation state from messages
    const userMessages = messages.filter(m => m.role === 'user');
    if (userMessages.length > 0) {
      const lastUserMessage = userMessages[userMessages.length - 1];
      this.updateConversationState(lastUserMessage.content);
    }
  }
}

// Enhanced escalation detection with conversation stage awareness
export function shouldEscalateToSupport(userMessage: string, aiResponse: string, conversationState?: ConversationState): boolean {
  const strongEscalationKeywords = [
    'frustrated', 'angry', 'terrible', 'awful', 'disappointed',
    'not working', 'broken', 'urgent', 'emergency',
    'cancel', 'refund', 'complaint', 'manager'
  ];

  const moderateEscalationKeywords = [
    'problem', 'issue', 'bug', 'error', 'help',
    'human', 'agent', 'speak to someone', 'not satisfied'
  ];

  const messageToCheck = (userMessage + ' ' + aiResponse).toLowerCase();
  
  // Strong indicators always trigger escalation
  const hasStrongIndicators = strongEscalationKeywords.some(keyword => 
    messageToCheck.includes(keyword)
  );
  
  // Moderate indicators need multiple occurrences or AI difficulties
  const hasModerateIndicators = moderateEscalationKeywords.filter(keyword => 
    messageToCheck.includes(keyword)
  ).length >= 2;
  
  const aiHasDifficulties = aiResponse.includes('technical difficulties') ||
                           aiResponse.includes('I don\'t know') ||
                           aiResponse.includes('I\'m not sure');

  // Stage-based escalation logic
  const shouldEscalateByStage = conversationState && (
    conversationState.stage === 'conversion' || 
    (conversationState.responseCount > 5 && conversationState.stage === 'solution_discussion')
  );

  return hasStrongIndicators || (hasModerateIndicators && aiHasDifficulties) || Boolean(shouldEscalateByStage);
}

// Export singleton instance for easy usage
export const openRouterService = new OpenRouterService();
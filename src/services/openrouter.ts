// Secure server-side AI chat integration using Supabase Edge Function
const AI_CHAT_ENDPOINT = '/functions/v1/ai-chat';

// Get Supabase URL for API calls with fallback
const getSupabaseUrl = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    console.warn('VITE_SUPABASE_URL not found in environment, using fallback');
    // Import the projectId for fallback
    try {
      // Dynamic import to avoid circular dependencies
      return `https://ruhsxjeiegdeshcnbuxy.supabase.co`;
    } catch (error) {
      console.error('Failed to get Supabase URL:', error);
      return '';
    }
  }
  return supabaseUrl;
};

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterResponse {
  response: string;
  error?: string;
}

// Enhanced customer support system prompt with better conversation flow
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

CONVERSATION GUIDELINES:
1. Be conversational, helpful, and professional but not overly formal
2. Provide specific, detailed information about Tepa Solutions
3. Ask ONE clarifying question when helpful, but don't overwhelm with multiple questions
4. Offer solutions and next steps naturally (consultation, quote, contact with team)
5. If you can't answer something specific, offer to connect them with live support
6. Keep responses engaging and informative without being too lengthy
7. Show genuine enthusiasm about helping with their digital transformation needs
8. Only mention case studies or portfolio examples if directly relevant to their question

RESPONSE BEHAVIOR:
- DO NOT automatically ask "Is there anything else I can help you with?" after every response
- Only ask follow-up questions when they would genuinely add value to the conversation
- Focus on being helpful and informative rather than pushing for more conversation
- Let conversations flow naturally - some queries just need a direct answer
- Be responsive to the user's communication style and energy level

IMPORTANT: 
- Always stay in character as Tepabot from Tepa Solutions
- Provide accurate information about services and company
- Be proactive in offering solutions when appropriate, but don't be pushy
- For pricing questions, explain it varies by project scope and offer consultation
- For complex technical questions, provide what you can and suggest speaking with the development team
- Focus on being genuinely helpful rather than extending conversation length`;

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
  private responseCount: number = 0; // Track conversation length

  constructor(model?: string) {
    // Default to your preferred free model
    this.model = model || RECOMMENDED_MODELS.free[0];
    
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
  }
  
  // Get context as string for server request
  private getContextString(): string {
    return this.contextInfo.length > 0 ? this.contextInfo.join('; ') : '';
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

  // Get AI response (non-streaming) via secure server endpoint
  async getChatResponse(userMessage: string): Promise<OpenRouterResponse> {
    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      this.responseCount++;

      // Optimize model selection based on query complexity
      const selectedModel = this.shouldOptimizeModel(userMessage);

      const supabaseUrl = getSupabaseUrl();
      const response = await fetch(`${supabaseUrl}${AI_CHAT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1aHN4amVpZWdkZXNoY25idXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMDczNDMsImV4cCI6MjA3MjU4MzM0M30.ua-Et2U4A0bRH0CSKA0Q6iT5YWvjSIi-_nPoeclay0U'}`
        },
        body: JSON.stringify({
          messages: this.conversationHistory.slice(1), // Exclude system prompt (handled server-side)
          context: this.getContextString(),
          stream: false,
          model: selectedModel,
          responseCount: this.responseCount // Help server understand conversation length
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.response || 'I apologize, but I couldn\'t generate a response. Please try again.';

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

      return { response: aiResponse };

    } catch (error) {
      console.error('AI chat API error:', error);
      return {
        response: 'I\'m experiencing technical difficulties. Please try again in a moment, or I can connect you with our live support team.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Enhanced streaming response with better model selection
  async *getChatResponseStream(userMessage: string): AsyncGenerator<string, void, unknown> {
    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      this.responseCount++;

      // Optimize model selection
      const selectedModel = this.shouldOptimizeModel(userMessage);

      const supabaseUrl = getSupabaseUrl();
      const response = await fetch(`${supabaseUrl}${AI_CHAT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1aHN4amVpZWdkZXNoY25idXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMDczNDMsImV4cCI6MjA3MjU4MzM0M30.ua-Et2U4A0bRH0CSKA0Q6iT5YWvjSIi-_nPoeclay0U'}`
        },
        body: JSON.stringify({
          messages: this.conversationHistory.slice(1), // Exclude system prompt (handled server-side)
          context: this.getContextString(),
          stream: true,
          model: selectedModel,
          responseCount: this.responseCount
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
      yield 'I\'m experiencing technical difficulties. Please try again in a moment, or I can connect you with our live support team.';
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
  }

  // Change model (e.g., upgrade to premium for complex queries)
  setModel(model: string) {
    this.model = model;
  }

  // Get conversation stats
  getConversationStats(): { length: number; responseCount: number; model: string } {
    return {
      length: this.conversationHistory.length,
      responseCount: this.responseCount,
      model: this.model
    };
  }

  // Export conversation for Supabase storage
  exportConversation(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  // Import conversation from Supabase
  importConversation(messages: ChatMessage[]) {
    this.conversationHistory = messages;
    this.responseCount = Math.floor(messages.length / 2); // Approximate
  }
}

// Enhanced escalation detection with less aggressive triggering
export function shouldEscalateToSupport(userMessage: string, aiResponse: string): boolean {
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

  return hasStrongIndicators || (hasModerateIndicators && aiHasDifficulties);
}

// Export singleton instance for easy usage
export const openRouterService = new OpenRouterService();
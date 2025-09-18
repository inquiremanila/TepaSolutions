// Secure server-side AI chat integration using Supabase Edge Function
const AI_CHAT_ENDPOINT = '/functions/v1/ai-chat';

// Get Supabase URL for API calls
const getSupabaseUrl = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    console.error('VITE_SUPABASE_URL not found in environment');
    return '';
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

// Enhanced customer support system prompt
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

RESPONSE GUIDELINES:
1. Be friendly, professional, and helpful
2. Provide specific, detailed information about Tepa Solutions
3. Ask clarifying questions to better understand customer needs
4. Offer solutions and next steps (consultation, quote, contact with team)
5. If you can't answer something, offer to connect them with live support
6. Keep responses conversational but informative
7. Show enthusiasm about helping with their digital transformation needs
8. Mention relevant case studies or portfolio examples when appropriate

IMPORTANT: 
- Always stay in character as Tepabot from Tepa Solutions
- Provide accurate information about services and company
- Be proactive in offering solutions and consultation opportunities
- If asked about pricing, mention it varies by project scope and offer consultation
- For complex technical questions, suggest speaking with the development team`;

// Recommended OpenRouter models for customer support
export const RECOMMENDED_MODELS = {
  // Free models for development/testing
  free: [
    'meta-llama/llama-3.2-3b-instruct:free',
    'microsoft/phi-3.5-mini-instruct:free',
  ],
  // Premium models for production
  premium: [
    'anthropic/claude-3.5-sonnet',
    'openai/gpt-4o-mini',
    'meta-llama/llama-3.1-8b-instruct',
  ]
};

export class OpenRouterService {
  private model: string;
  private conversationHistory: ChatMessage[] = [];

  constructor(model?: string) {
    // Default to a free model for development
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

  // Get AI response (non-streaming) via secure server endpoint
  async getChatResponse(userMessage: string): Promise<OpenRouterResponse> {
    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      const supabaseUrl = getSupabaseUrl();
      const response = await fetch(`${supabaseUrl}${AI_CHAT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          messages: this.conversationHistory.slice(1), // Exclude system prompt (handled server-side)
          context: this.getContextString(),
          stream: false
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

      // Keep conversation history manageable (last 10 exchanges)
      if (this.conversationHistory.length > 21) { // system + 10 exchanges
        this.conversationHistory = [
          this.conversationHistory[0], // Keep system prompt
          ...this.conversationHistory.slice(-20) // Keep last 20 messages
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

  // Streaming response for better UX via secure server endpoint
  async *getChatResponseStream(userMessage: string): AsyncGenerator<string, void, unknown> {
    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      const supabaseUrl = getSupabaseUrl();
      const response = await fetch(`${supabaseUrl}${AI_CHAT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          messages: this.conversationHistory.slice(1), // Exclude system prompt (handled server-side)
          context: this.getContextString(),
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
                // Add complete assistant response to history
                this.conversationHistory.push({
                  role: 'assistant',
                  content: fullResponse
                });

                // Keep conversation history manageable
                if (this.conversationHistory.length > 21) {
                  this.conversationHistory = [
                    this.conversationHistory[0],
                    ...this.conversationHistory.slice(-20)
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
        content: 'System prompt handled server-side'
      }
    ];
    this.contextInfo = [];
  }

  // Change model (e.g., upgrade to premium for complex queries)
  setModel(model: string) {
    this.model = model;
  }

  // Get conversation length for context management
  getConversationLength(): number {
    return this.conversationHistory.length;
  }

  // Export conversation for Supabase storage
  exportConversation(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  // Import conversation from Supabase
  importConversation(messages: ChatMessage[]) {
    this.conversationHistory = messages;
  }
}

// Utility function to determine if we should escalate to live support
export function shouldEscalateToSupport(userMessage: string, aiResponse: string): boolean {
  const escalationKeywords = [
    'frustrated', 'angry', 'unhappy', 'disappointed', 'terrible', 'awful',
    'not working', 'broken', 'bug', 'error', 'problem', 'issue', 'urgent',
    'cancel', 'refund', 'complaint', 'manager', 'human', 'agent', 'speak to someone'
  ];

  const messageToCheck = (userMessage + ' ' + aiResponse).toLowerCase();
  
  return escalationKeywords.some(keyword => messageToCheck.includes(keyword)) ||
         aiResponse.includes('technical difficulties') ||
         aiResponse.includes('I don\'t know');
}

// Export singleton instance for easy usage
export const openRouterService = new OpenRouterService();
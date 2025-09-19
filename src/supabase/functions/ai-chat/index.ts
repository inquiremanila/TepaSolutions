import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import OpenAI from "npm:openai@^4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Updated system prompt with natural conversation flow
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

serve(async (req) => {
  console.log(`${new Date().toISOString()} - Request received: ${req.method}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight');
    return new Response('ok', { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // Parse request body
    let requestData;
    let bodyText = '';
    try {
      bodyText = await req.text();
      console.log('Request body length:', bodyText.length);
      
      if (!bodyText || bodyText.trim() === '') {
        console.error('Empty request body');
        return new Response(JSON.stringify({ error: 'Request body cannot be empty' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      requestData = JSON.parse(bodyText);
      console.log('Successfully parsed JSON, keys:', Object.keys(requestData));
    } catch (parseError) {
      console.error('JSON parse error:', parseError.message);
      return new Response(JSON.stringify({
        error: 'Invalid JSON format',
        details: parseError.message
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { messages, context, stream = false, model, responseCount = 0, sessionToken, conversationState } = requestData;

    // Validate required fields
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid messages array:', messages);
      return new Response(JSON.stringify({ error: 'Messages array is required and cannot be empty' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Environment variables check
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    console.log('Environment check:');
    console.log('- OpenRouter API Key:', openRouterApiKey ? `Present (${openRouterApiKey.substring(0, 10)}...)` : 'Missing');

    if (!openRouterApiKey) {
      console.error('OpenRouter API key not configured');
      return new Response(JSON.stringify({
        error: 'Hello! I\'m experiencing a temporary configuration issue. Please contact our team directly at inquire@tepasolutions.asia or call +63 2 8 558 1237 for immediate assistance.',
        code: 'MISSING_API_KEY',
        contact: {
          email: 'inquire@tepasolutions.asia',
          phone: '+63 2 8 558 1237'
        }
      }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Initialize Supabase client if credentials available
    let supabase = null;
    if (supabaseUrl && supabaseServiceKey) {
      try {
        supabase = createClient(supabaseUrl, supabaseServiceKey);
        console.log('Supabase client initialized successfully');
      } catch (supabaseError) {
        console.error('Failed to initialize Supabase client:', supabaseError);
      }
    }

    // Initialize OpenRouter client
    let openai;
    try {
      openai = new OpenAI({
        apiKey: openRouterApiKey,
        baseURL: 'https://openrouter.ai/api/v1'
      });
      console.log('OpenAI client initialized successfully');
    } catch (clientError) {
      console.error('Failed to initialize OpenAI client:', clientError);
      return new Response(JSON.stringify({
        error: 'AI service initialization failed',
        code: 'CLIENT_INIT_ERROR'
      }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Model selection
    const selectedModel = model || 'meta-llama/llama-3.2-3b-instruct:free';
    console.log('Selected AI model:', selectedModel);

    // Prepare messages with enhanced system prompt
    const systemMessage = { role: 'system', content: CUSTOMER_SUPPORT_PROMPT };
    let contextualMessages = [systemMessage];

    // Add conversation state context for better flow
    if (conversationState) {
      const stateContext = `
CONVERSATION STATE: ${conversationState.stage || 'discovery'}
TOPICS DISCUSSED: ${conversationState.topicsDiscussed?.join(', ') || 'none'}
USER UNCERTAINTY LEVEL: ${conversationState.uncertaintyLevel || 'high'}
BUSINESS TYPE: ${conversationState.businessType || 'unknown'}
PAIN POINTS MENTIONED: ${conversationState.painPoints?.join(', ') || 'none'}

Based on this conversation state, continue the natural flow of discovery questions. Don't repeat questions already covered.`;
      
      contextualMessages.push({ role: 'system', content: stateContext });
    }

    // Add context if provided
    if (context) {
      contextualMessages.push({ role: 'system', content: `Additional context: ${context}` });
    }

    // Add conversation flow guidance based on response count
    if (responseCount === 0) {
      contextualMessages.push({
        role: 'system',
        content: 'This is the first interaction. If the user seems uncertain about what they want, start with the exploratory question about their day-to-day and where they feel stuck.'
      });
    } else if (responseCount > 0 && responseCount <= 3) {
      contextualMessages.push({
        role: 'system',
        content: `This is response ${responseCount + 1} in the conversation. Continue building understanding through natural follow-up questions. Focus on uncovering their real challenges before suggesting solutions.`
      });
    } else {
      contextualMessages.push({
        role: 'system',
        content: `This is an ongoing conversation (response ${responseCount + 1}). You should have enough context now to start connecting their challenges to potential solutions, but still maintain the consultative approach.`
      });
    }

    // Add conversation messages
    contextualMessages = [...contextualMessages, ...messages];

    console.log('Total contextual messages:', contextualMessages.length);

    // API parameters
    const apiParams = {
      model: selectedModel,
      messages: contextualMessages,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.9,
      frequency_penalty: 0.2,
      presence_penalty: 0.1
    };

    console.log('Making AI request with model:', selectedModel);

    if (stream) {
      // Handle streaming response
      console.log('Processing streaming request...');
      let completion;
      try {
        completion = await openai.chat.completions.create({ ...apiParams, stream: true });
        console.log('Streaming completion initiated');
      } catch (streamError) {
        console.error('Streaming request failed:', streamError.message);
        
        let errorMessage = 'I\'m having trouble starting our conversation right now.';
        let statusCode = 500;
        
        if (streamError.message?.includes('401')) {
          errorMessage = 'AI service authentication issue. Please contact support.';
          statusCode = 503;
        } else if (streamError.message?.includes('insufficient credits')) {
          errorMessage = 'AI service is temporarily limited. Please try again later.';
          statusCode = 503;
        } else if (streamError.message?.includes('rate limit')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
          statusCode = 429;
        }

        return new Response(JSON.stringify({
          error: errorMessage,
          code: 'OPENROUTER_ERROR',
          suggestion: 'Please try again in a few minutes, or contact our support team directly at inquire@tepasolutions.asia'
        }), {
          status: statusCode,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content;
              if (content) {
                const data = `data: ${JSON.stringify({ content })}\n\n`;
                controller.enqueue(encoder.encode(data));
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            console.log('Streaming completed successfully');
          } catch (error) {
            console.error('Streaming processing error:', error);
            const errorData = `data: ${JSON.stringify({
              content: 'I apologize, but I\'m having trouble responding right now. Please try again or let me connect you with our live support team.'
            })}\n\n`;
            controller.enqueue(encoder.encode(errorData));
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          } finally {
            controller.close();
          }
        }
      });

      return new Response(readableStream, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    } else {
      // Handle non-streaming response
      console.log('Processing non-streaming request...');
      let completion;
      try {
        completion = await openai.chat.completions.create(apiParams);
        console.log('AI completion successful');
      } catch (completionError) {
        console.error('AI completion failed:', completionError.message);
        
        let errorMessage = 'I\'m having trouble generating a response right now.';
        let statusCode = 500;
        
        if (completionError.message?.includes('401')) {
          errorMessage = 'Hello! I\'m experiencing a temporary technical issue. Please contact our team directly at inquire@tepasolutions.asia or call +63 2 8 558 1237 for immediate assistance.';
          statusCode = 503;
        } else if (completionError.message?.includes('insufficient credits')) {
          errorMessage = 'I\'m temporarily at capacity. Please try again in a few minutes, or reach out to us directly at inquire@tepasolutions.asia.';
          statusCode = 503;
        }

        return new Response(JSON.stringify({
          response: errorMessage,
          fallback: true,
          contact: {
            email: 'inquire@tepasolutions.asia',
            phone: '+63 2 8 558 1237'
          },
          code: 'OPENROUTER_ERROR'
        }), {
          status: statusCode,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a proper response. Please try again or let me connect you with our live support team.';
      console.log('AI response generated, length:', aiResponse.length);

      // Store conversation in database if available
      if (supabase && sessionToken) {
        try {
          console.log('Attempting to store conversation in database...');
          await supabase.from('chat_messages').insert({
            session_id: sessionToken,
            message: messages[messages.length - 1]?.content || '',
            is_bot: false,
            message_type: 'text'
          });
          await supabase.from('chat_messages').insert({
            session_id: sessionToken,
            message: aiResponse,
            is_bot: true,
            message_type: 'text',
            metadata: {
              model: selectedModel,
              usage: completion.usage,
              conversation_stage: conversationState?.stage || 'discovery'
            }
          });
          console.log('Conversation stored successfully');
        } catch (dbError) {
          console.error('Database storage failed:', dbError.message);
        }
      }

      // Enhanced response data with conversation state tracking
      const responseData = {
        response: aiResponse,
        usage: completion.usage,
        model: selectedModel,
        responseCount: responseCount + 1,
        timestamp: new Date().toISOString(),
        conversationState: {
          stage: determineConversationStage(aiResponse, responseCount),
          responseCount: responseCount + 1,
          lastResponse: aiResponse
        }
      };

      console.log('Sending successful response');
      return new Response(JSON.stringify(responseData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Unhandled error in function:', error);
    
    let errorMessage = 'An unexpected error occurred. Please try again.';
    let statusCode = 500;
    
    if (error.message?.includes('network')) {
      errorMessage = 'Network connectivity issue. Please check your connection and try again.';
      statusCode = 503;
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'Request timed out. Please try again.';
      statusCode = 504;
    }

    return new Response(JSON.stringify({
      error: errorMessage,
      code: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString()
    }), {
      status: statusCode,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Helper function to determine conversation stage
function determineConversationStage(response: string, responseCount: number): string {
  const lowerResponse = response.toLowerCase();
  
  if (responseCount === 0) return 'initial';
  if (lowerResponse.includes('day-to-day') || lowerResponse.includes('where do you feel stuck')) return 'discovery';
  if (lowerResponse.includes('how long') || lowerResponse.includes('what have you tried')) return 'problem_exploration';
  if (lowerResponse.includes('would help') || lowerResponse.includes('solution') || lowerResponse.includes('we could')) return 'solution_discussion';
  if (lowerResponse.includes('consultation') || lowerResponse.includes('next step') || lowerResponse.includes('get started')) return 'conversion';
  
  return 'ongoing_discovery';
}
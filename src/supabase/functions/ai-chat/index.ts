import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import OpenAI from "npm:openai@^4.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, context, stream = false, model, responseCount = 0 } = await req.json()

    // Get OpenRouter API key from environment
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY')
    if (!openRouterApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenRouter API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize OpenRouter client
    const openai = new OpenAI({
      apiKey: openRouterApiKey,
      baseURL: 'https://openrouter.ai/api/v1',
    })

    // Model selection logic - use provided model or default to preferred model
    const selectedModel = model || 'deepseek/deepseek-chat-v3.1:free'

    // Prepare messages with system prompt and context
    const systemMessage = {
      role: 'system' as const,
      content: CUSTOMER_SUPPORT_PROMPT
    }

    let contextualMessages = [systemMessage]
    
    // Add context if provided
    if (context) {
      contextualMessages.push({
        role: 'system' as const,
        content: `Additional context: ${context}`
      })
    }

    // Add conversation length context to help AI adjust response style
    if (responseCount > 0) {
      contextualMessages.push({
        role: 'system' as const,
        content: `Response count: ${responseCount}. ${responseCount > 3 ? 'This is an ongoing conversation - be natural and avoid repetitive follow-up questions.' : 'This is early in the conversation - be welcoming and informative.'}`
      })
    }

    // Add conversation messages
    contextualMessages = [...contextualMessages, ...messages]

    // Enhanced parameters for better conversation flow
    const apiParams = {
      model: selectedModel,
      messages: contextualMessages,
      temperature: 0.7,
      max_tokens: 1200, // Increased for more detailed responses
      top_p: 0.9,
      frequency_penalty: 0.3, // Reduce repetitive language
      presence_penalty: 0.1, // Encourage new topics when appropriate
    }

    if (stream) {
      // Handle streaming response
      const completion = await openai.chat.completions.create({
        ...apiParams,
        stream: true,
      })

      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content
              if (content) {
                const data = `data: ${JSON.stringify({ content })}\n\n`
                controller.enqueue(encoder.encode(data))
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          } catch (error) {
            console.error('Streaming error:', error)
            const errorData = `data: ${JSON.stringify({ 
              content: 'I apologize, but I\'m having trouble responding right now. Please try again or let me connect you with our live support team.' 
            })}\n\n`
            controller.enqueue(encoder.encode(errorData))
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          } finally {
            controller.close()
          }
        },
      })

      return new Response(stream, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    } else {
      // Handle non-streaming response
      const completion = await openai.chat.completions.create(apiParams)

      const response = completion.choices[0]?.message?.content || 
        'I apologize, but I couldn\'t generate a response. Please try again or let me connect you with our live support team.'

      return new Response(
        JSON.stringify({ 
          response, 
          usage: completion.usage,
          model: selectedModel,
          responseCount
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('AI chat error:', error)
    
    // More user-friendly error messages
    let errorMessage = 'I\'m having technical difficulties right now.'
    if (error.message?.includes('rate limit')) {
      errorMessage = 'I\'m currently handling many conversations. Please try again in a moment.'
    } else if (error.message?.includes('model')) {
      errorMessage = 'There\'s an issue with my AI processing. Let me connect you with our live support team.'
    }

    return new Response(
      JSON.stringify({ 
        error: 'Failed to process AI request',
        response: errorMessage,
        technical_details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
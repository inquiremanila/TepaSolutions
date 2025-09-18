import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import OpenAI from "npm:openai@^4.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, context, stream = false } = await req.json()

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

    // Add conversation messages
    contextualMessages = [...contextualMessages, ...messages]

    if (stream) {
      // Handle streaming response
      const completion = await openai.chat.completions.create({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: contextualMessages,
        temperature: 0.7,
        max_tokens: 1000,
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
            const errorData = `data: ${JSON.stringify({ error: 'Streaming failed' })}\n\n`
            controller.enqueue(encoder.encode(errorData))
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
      const completion = await openai.chat.completions.create({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: contextualMessages,
        temperature: 0.7,
        max_tokens: 1000,
      })

      const response = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.'

      return new Response(
        JSON.stringify({ response, usage: completion.usage }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('AI chat error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process AI request',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
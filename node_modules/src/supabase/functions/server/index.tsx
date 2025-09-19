import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'

const app = new Hono()

// Add CORS and logging middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use('*', logger(console.log))

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Health check endpoint
app.get('/make-server-33917803/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Contact form submission
app.post('/make-server-33917803/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { type, name, email, company, phone, message, subject, priority } = body

    // Validate required fields
    if (!name || !email || !message) {
      return c.json({ error: 'Missing required fields: name, email, message' }, 400)
    }

    // Store in KV store with timestamp
    const contactId = `contact_${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const contactData = {
      id: contactId,
      type,
      name,
      email,
      company: company || '',
      phone: phone || '',
      message,
      subject: subject || '',
      priority: priority || 'medium',
      timestamp: new Date().toISOString(),
      status: 'new'
    }

    // Import and use KV store
    const { set } = await import('./kv_store.tsx')
    await set(contactId, contactData)

    console.log(`Contact form submitted: ${type} - ${email}`)
    
    return c.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      contactId 
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return c.json({ error: 'Failed to submit contact form' }, 500)
  }
})

// Career application submission
app.post('/make-server-33917803/careers', async (c) => {
  try {
    const body = await c.req.json()
    const { position, name, email, phone, resume, coverLetter, portfolio, experience } = body

    // Validate required fields
    if (!position || !name || !email || !resume) {
      return c.json({ error: 'Missing required fields: position, name, email, resume' }, 400)
    }

    // Store in KV store with timestamp
    const applicationId = `career_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const applicationData = {
      id: applicationId,
      position,
      name,
      email,
      phone: phone || '',
      resume,
      coverLetter: coverLetter || '',
      portfolio: portfolio || '',
      experience: experience || '',
      timestamp: new Date().toISOString(),
      status: 'pending_review'
    }

    // Import and use KV store
    const { set } = await import('./kv_store.tsx')
    await set(applicationId, applicationData)

    console.log(`Career application submitted: ${position} - ${email}`)
    
    return c.json({ 
      success: true, 
      message: 'Application submitted successfully',
      applicationId 
    })
  } catch (error) {
    console.error('Error processing career application:', error)
    return c.json({ error: 'Failed to submit application' }, 500)
  }
})

// Event registration submission
app.post('/make-server-33917803/events', async (c) => {
  try {
    const body = await c.req.json()
    const { eventId, eventTitle, name, email, phone, organization, experience, expectations, dietaryRestrictions } = body

    // Validate required fields
    if (!eventId || !eventTitle || !name || !email) {
      return c.json({ error: 'Missing required fields: eventId, eventTitle, name, email' }, 400)
    }

    // Store in KV store with timestamp
    const registrationId = `event_${eventId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const registrationData = {
      id: registrationId,
      eventId,
      eventTitle,
      name,
      email,
      phone: phone || '',
      organization: organization || '',
      experience: experience || '',
      expectations: expectations || '',
      dietaryRestrictions: dietaryRestrictions || '',
      timestamp: new Date().toISOString(),
      status: 'registered'
    }

    // Import and use KV store
    const { set } = await import('./kv_store.tsx')
    await set(registrationId, registrationData)

    console.log(`Event registration: ${eventTitle} - ${email}`)
    
    return c.json({ 
      success: true, 
      message: 'Event registration successful',
      registrationId 
    })
  } catch (error) {
    console.error('Error processing event registration:', error)
    return c.json({ error: 'Failed to register for event' }, 500)
  }
})

// Get all submissions (admin endpoint)
app.get('/make-server-33917803/admin/submissions', async (c) => {
  try {
    const { getByPrefix } = await import('./kv_store.tsx')
    
    const contacts = await getByPrefix('contact_')
    const careers = await getByPrefix('career_')
    const events = await getByPrefix('event_')
    
    return c.json({
      contacts: contacts || [],
      careers: careers || [],
      events: events || []
    })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return c.json({ error: 'Failed to fetch submissions' }, 500)
  }
})

Deno.serve(app.fetch)
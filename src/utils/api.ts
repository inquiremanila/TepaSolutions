import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);

export async function submitContactForm(data: {
  type: 'sales' | 'support' | 'volunteer' | 'event-host' | 'investor';
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  subject?: string;
  priority?: 'low' | 'medium' | 'high';
  supportType?: string;
  attachedFiles?: number;
}) {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([{
        type: data.type,
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        message: data.message,
        subject: data.subject,
        priority: data.priority || 'medium',
        support_type: data.supportType,
        attached_files_count: data.attachedFiles || 0,
        status: 'new',
        submitted_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Supabase contact form error:', error);
      throw new Error(error.message || 'Failed to submit contact form');
    }

    return { success: true, message: 'Form submitted successfully' };
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
}

export async function submitCareerApplication(data: {
  position: string;
  name: string;
  email: string;
  phone?: string;
  resume: string;
  coverLetter?: string;
  portfolio?: string;
  experience?: string;
  location?: string;
  availability?: string;
}) {
  try {
    const { error } = await supabase
      .from('career_applications')
      .insert([{
        position: data.position,
        name: data.name,
        email: data.email,
        phone: data.phone,
        resume_text: data.resume,
        cover_letter: data.coverLetter,
        portfolio_url: data.portfolio,
        experience_level: data.experience,
        preferred_location: data.location,
        availability: data.availability,
        status: 'new',
        submitted_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Supabase career application error:', error);
      throw new Error(error.message || 'Failed to submit career application');
    }

    return { success: true, message: 'Application submitted successfully' };
  } catch (error) {
    console.error('Career application submission error:', error);
    throw error;
  }
}

export async function submitEventRegistration(data: {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  experience?: string;
  expectations?: string;
  dietaryRestrictions?: string;
}) {
  try {
    const { error } = await supabase
      .from('event_registrations')
      .insert([{
        event_id: data.eventId,
        event_title: data.eventTitle,
        name: data.name,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        experience_level: data.experience,
        expectations: data.expectations,
        dietary_restrictions: data.dietaryRestrictions,
        status: 'registered',
        registered_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Supabase event registration error:', error);
      throw new Error(error.message || 'Failed to submit event registration');
    }

    return { success: true, message: 'Registration submitted successfully' };
  } catch (error) {
    console.error('Event registration submission error:', error);
    throw error;
  }
}

export async function submitVolunteerApplication(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experienceLevel: string;
  availability: string;
  areaOfInterest: string;
  message: string;
}) {
  try {
    const { error } = await supabase
      .from('volunteer_applications')
      .insert([{
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        experience_level: data.experienceLevel,
        availability: data.availability,
        area_of_interest: data.areaOfInterest,
        motivation_message: data.message,
        status: 'new',
        submitted_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Supabase volunteer application error:', error);
      throw new Error(error.message || 'Failed to submit volunteer application');
    }

    return { success: true, message: 'Volunteer application submitted successfully' };
  } catch (error) {
    console.error('Volunteer application submission error:', error);
    throw error;
  }
}
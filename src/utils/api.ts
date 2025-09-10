import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-33917803`;

export async function submitContactForm(data: {
  type: 'sales' | 'support' | 'volunteer';
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  subject?: string;
  priority?: 'low' | 'medium' | 'high';
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit contact form');
    }

    return await response.json();
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
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/careers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit application');
    }

    return await response.json();
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
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to register for event');
    }

    return await response.json();
  } catch (error) {
    console.error('Event registration submission error:', error);
    throw error;
  }
}
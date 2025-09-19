import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Use environment variables with fallback to info.tsx for compatibility
const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return {
    url: envUrl || `https://${projectId}.supabase.co`,
    key: envKey || publicAnonKey
  };
};

const { url: supabaseUrl, key: supabaseAnonKey } = getSupabaseConfig();
const supabase = createClient(supabaseUrl, supabaseAnonKey);
import type { ChatMessage } from '../services/openrouter';

export interface ChatSession {
  id: string;
  user_id?: string;
  session_token: string;
  started_at: string;
  updated_at: string;
  status: 'active' | 'completed' | 'escalated';
  user_info?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  context?: {
    page_url?: string;
    referrer?: string;
    user_agent?: string;
  };
}

export interface ChatMessage_DB {
  id: string;
  session_id: string;
  message: string;
  is_bot: boolean;
  timestamp: string;
  message_type: 'text' | 'system' | 'escalation' | 'file';
  metadata?: {
    model_used?: string;
    response_time?: number;
    confidence_score?: number;
    escalation_reason?: string;
  };
}

export interface ChatAnalytics {
  session_id: string;
  user_satisfaction?: number; // 1-5 rating
  resolved: boolean;
  escalated_to_human: boolean;
  resolution_time?: number; // in minutes
  topics_discussed?: string[];
  sentiment_score?: number; // -1 to 1
}

// Create a new chat session
export async function createChatSession(context?: {
  pageUrl?: string;
  referrer?: string;
  userAgent?: string;
}): Promise<ChatSession> {
  try {
    const sessionToken = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert([{
        session_token: sessionToken,
        started_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'active',
        context: context || {}
      }])
      .select()
      .single();

    if (error) {
      console.error('Failed to create chat session:', error);
      throw new Error(error.message);
    }

    return data as ChatSession;
  } catch (error) {
    console.error('Chat session creation error:', error);
    throw error;
  }
}

// Store chat message
export async function storeChatMessage(
  sessionId: string,
  message: string,
  isBot: boolean,
  messageType: 'text' | 'system' | 'escalation' | 'file' = 'text',
  metadata?: any
): Promise<ChatMessage_DB> {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        session_id: sessionId,
        message: message,
        is_bot: isBot,
        timestamp: new Date().toISOString(),
        message_type: messageType,
        metadata: metadata || {}
      }])
      .select()
      .single();

    if (error) {
      console.error('Failed to store chat message:', error);
      throw new Error(error.message);
    }

    return data as ChatMessage_DB;
  } catch (error) {
    console.error('Chat message storage error:', error);
    throw error;
  }
}

// Get chat history for a session
export async function getChatHistory(sessionId: string): Promise<ChatMessage_DB[]> {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Failed to get chat history:', error);
      throw new Error(error.message);
    }

    return data as ChatMessage_DB[];
  } catch (error) {
    console.error('Chat history retrieval error:', error);
    throw error;
  }
}

// Update chat session status
export async function updateChatSessionStatus(
  sessionId: string, 
  status: 'active' | 'completed' | 'escalated',
  userInfo?: { name?: string; email?: string; phone?: string; }
): Promise<void> {
  try {
    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    };

    if (userInfo) {
      updateData.user_info = userInfo;
    }

    const { error } = await supabase
      .from('chat_sessions')
      .update(updateData)
      .eq('id', sessionId);

    if (error) {
      console.error('Failed to update chat session:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Chat session update error:', error);
    throw error;
  }
}

// Record chat analytics
export async function recordChatAnalytics(analytics: Partial<ChatAnalytics>): Promise<void> {
  try {
    const { error } = await supabase
      .from('chat_analytics')
      .insert([{
        ...analytics,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Failed to record chat analytics:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Chat analytics error:', error);
    throw error;
  }
}

// Get chat statistics for dashboard/monitoring
export async function getChatStatistics(dateRange?: { from: string; to: string }) {
  try {
    let query = supabase
      .from('chat_sessions')
      .select('*, chat_analytics(*)');

    if (dateRange) {
      query = query.gte('started_at', dateRange.from).lte('started_at', dateRange.to);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Failed to get chat statistics:', error);
      throw new Error(error.message);
    }

    // Calculate statistics
    const totalSessions = data.length;
    const completedSessions = data.filter(s => s.status === 'completed').length;
    const escalatedSessions = data.filter(s => s.status === 'escalated').length;
    const activeSessions = data.filter(s => s.status === 'active').length;

    return {
      totalSessions,
      completedSessions,
      escalatedSessions,
      activeSessions,
      completionRate: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0,
      escalationRate: totalSessions > 0 ? (escalatedSessions / totalSessions) * 100 : 0,
      sessionsData: data
    };
  } catch (error) {
    console.error('Chat statistics error:', error);
    throw error;
  }
}

// Automated escalation trigger (can be called from OpenRouter service)
export async function triggerEscalation(
  sessionId: string,
  reason: string,
  userMessage: string,
  aiResponse: string
): Promise<void> {
  try {
    // Update session status to escalated
    await updateChatSessionStatus(sessionId, 'escalated');

    // Store escalation message
    await storeChatMessage(
      sessionId,
      'This conversation has been escalated to our live support team. A human agent will be with you shortly.',
      true,
      'escalation',
      {
        escalation_reason: reason,
        triggered_by_message: userMessage,
        last_ai_response: aiResponse,
        escalated_at: new Date().toISOString()
      }
    );

    // Create a priority support ticket
    const { error } = await supabase
      .from('support_escalations')
      .insert([{
        session_id: sessionId,
        escalation_reason: reason,
        priority: 'high',
        status: 'pending',
        created_at: new Date().toISOString(),
        context: {
          user_message: userMessage,
          ai_response: aiResponse
        }
      }]);

    if (error) {
      console.error('Failed to create support escalation:', error);
    }

  } catch (error) {
    console.error('Escalation trigger error:', error);
    throw error;
  }
}

// Export utilities for OpenRouter service integration
export const ChatHistoryUtils = {
  // Convert Supabase messages to OpenRouter format
  toOpenRouterFormat: (messages: ChatMessage_DB[]): ChatMessage[] => {
    return messages.map(msg => ({
      role: msg.is_bot ? 'assistant' : 'user',
      content: msg.message
    }));
  },

  // Convert OpenRouter messages to Supabase format
  fromOpenRouterFormat: (messages: ChatMessage[], sessionId: string): Omit<ChatMessage_DB, 'id'>[] => {
    return messages.map((msg, index) => ({
      session_id: sessionId,
      message: msg.content,
      is_bot: msg.role === 'assistant',
      timestamp: new Date(Date.now() + index).toISOString(),
      message_type: 'text' as const,
      metadata: { model_used: msg.role === 'assistant' ? 'system' : undefined }
    }));
  }
};
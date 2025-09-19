-- Supabase Chat System Database Schema (Working Version)
-- This version prioritizes functionality for immediate testing
-- See supabase_chat_schema.sql for production-ready security

-- 1. Create chat_sessions table
create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  session_token text unique not null,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null check (status in ('active','completed','escalated')) default 'active',
  user_info jsonb,
  context jsonb
);

-- 2. Create chat_messages table
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references chat_sessions(id) on delete cascade,
  message text not null,
  is_bot boolean not null default false,
  timestamp timestamptz not null default now(),
  message_type text not null check (message_type in ('text','system','escalation','file')) default 'text',
  metadata jsonb
);

-- 3. Create index for efficient queries
create index if not exists chat_messages_session_ts_idx on chat_messages(session_id, timestamp);

-- 4. Create chat_analytics table
create table if not exists chat_analytics (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references chat_sessions(id) on delete cascade,
  user_satisfaction int check (user_satisfaction between 1 and 5),
  resolved boolean,
  escalated_to_human boolean,
  resolution_time int, -- in minutes
  topics_discussed text[],
  sentiment_score numeric check (sentiment_score between -1 and 1),
  created_at timestamptz not null default now()
);

-- 5. Create support_escalations table
create table if not exists support_escalations (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references chat_sessions(id) on delete cascade,
  escalation_reason text,
  priority text check (priority in ('low', 'medium', 'high', 'urgent')) default 'medium',
  status text check (status in ('pending', 'in_progress', 'resolved', 'closed')) default 'pending',
  created_at timestamptz not null default now(),
  context jsonb
);

-- 6. Enable Row Level Security (RLS)
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;
alter table chat_analytics enable row level security;
alter table support_escalations enable row level security;

-- 7. Create permissive RLS policies for testing (NOT FOR PRODUCTION)
-- These policies allow the current client-side architecture to work

-- Policies for chat_sessions (allow all operations for testing)
create policy if not exists "anon_full_access_sessions" on chat_sessions 
  for all to anon using (true) with check (true);

-- Policies for chat_messages (allow all operations for testing)
create policy if not exists "anon_full_access_messages" on chat_messages 
  for all to anon using (true) with check (true);

-- Policies for chat_analytics (allow all operations for testing)
create policy if not exists "anon_full_access_analytics" on chat_analytics 
  for all to anon using (true) with check (true);

-- Policies for support_escalations (allow all operations for testing)
create policy if not exists "anon_full_access_escalations" on support_escalations 
  for all to anon using (true) with check (true);

-- 8. Create updated_at trigger for chat_sessions
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_chat_sessions_updated_at on chat_sessions;
create trigger update_chat_sessions_updated_at
  before update on chat_sessions
  for each row
  execute function update_updated_at_column();

-- 9. Grant necessary permissions for testing
grant usage on schema public to anon;
grant all on all tables in schema public to anon;
grant all on all sequences in schema public to anon;

-- 10. Verify tables were created successfully
select 
  table_name,
  table_type
from information_schema.tables 
where table_schema = 'public' 
  and table_name in ('chat_sessions', 'chat_messages', 'chat_analytics', 'support_escalations')
order by table_name;

-- QUICK START INSTRUCTIONS:
-- 1. Copy this script to your Supabase SQL Editor and run it
-- 2. Deploy the ai-chat Edge Function if not already done:
--    supabase functions deploy ai-chat
-- 3. Set the OPENROUTER_API_KEY secret:
--    supabase secrets set OPENROUTER_API_KEY=your_key_here
-- 4. Test the chat functionality on your website

-- IMPORTANT FOR PRODUCTION:
-- This schema is permissive for testing purposes only.
-- Before going to production, you MUST:
-- 1. Implement session-based RLS policies (see supabase_chat_schema.sql)
-- 2. Move chat operations to server-side (Edge Functions with service_role)
-- 3. Add rate limiting to prevent abuse
-- 4. Remove permissive anon grants
-- 5. Consider implementing proper user authentication
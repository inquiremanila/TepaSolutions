-- Supabase Chat System Database Schema (Production-Ready)

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

-- 7. Drop existing policies (if they exist) and create production-ready policies

-- Drop policies for chat_sessions
drop policy if exists "anon_read_own_sessions" on chat_sessions;
drop policy if exists "anon_update_own_sessions" on chat_sessions;

-- Drop policies for chat_messages
drop policy if exists "anon_insert_own_messages" on chat_messages;
drop policy if exists "anon_read_own_messages" on chat_messages;

-- Drop policies for chat_analytics
drop policy if exists "anon_full_access_analytics" on chat_analytics;

-- Drop policies for support_escalations
drop policy if exists "anon_full_access_escalations" on support_escalations;

-- Create production-ready policies for chat_sessions
create policy "anon_read_own_sessions" on chat_sessions 
  for select to anon using (session_token = current_setting('app.session_token', true));

create policy "anon_update_own_sessions" on chat_sessions 
  for update to anon using (session_token = current_setting('app.session_token', true));

-- Create production-ready policies for chat_messages
create policy "anon_insert_own_messages" on chat_messages
  for insert to anon
  with check (
    exists (
      select 1 from chat_sessions 
      where id = session_id 
      and session_token = current_setting('app.session_token', true)
    )
  );

create policy "anon_read_own_messages" on chat_messages 
  for select to anon using (
    exists (
      select 1 from chat_sessions 
      where id = session_id 
      and session_token = current_setting('app.session_token', true)
    )
  );

-- Policies for chat_analytics (server-side only via Edge Functions)
-- No anon policies - analytics should be written by service_role only

-- Policies for support_escalations (server-side only via Edge Functions)
-- No anon policies - escalations should be created by service_role only

-- 8. Create updated_at trigger for chat_sessions
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Drop existing trigger if any, and create new one for automatic timestamp update
drop trigger if exists update_chat_sessions_updated_at on chat_sessions;
create trigger update_chat_sessions_updated_at
  before update on chat_sessions
  for each row
  execute function update_updated_at_column();

-- 9. Grant minimal necessary permissions (secure approach)
-- Only grant permissions that are absolutely necessary

-- Grant specific table permissions instead of blanket grants
grant select, insert on chat_sessions to anon;
grant update (status, updated_at, user_info) on chat_sessions to anon;

grant select, insert on chat_messages to anon;

-- Analytics and escalations tables: no anon grants
-- These should only be accessible via Edge Functions using service_role

-- Grant sequence permissions for UUID generation (if needed)
grant usage on all sequences in schema public to anon;

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
-- This schema is now configured for production.
-- Before deploying to production:
-- 1. Make sure session_token handling is implemented securely on the client-side and server-side
-- 2. Ensure Edge Functions are deployed to handle chat operations securely
-- 3. Monitor and maintain RLS policies and security measures
-- 4. Test thoroughly wi

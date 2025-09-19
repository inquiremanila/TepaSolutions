-- Supabase Chat System Database Schema
-- Run this script in your Supabase SQL Editor to create the required tables

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

-- 7. Create RLS policies for anonymous access (for development/testing)
-- NOTE: In production, you should implement more restrictive policies

-- Policies for chat_sessions
create policy if not exists "anon_insert_sessions" on chat_sessions 
  for insert to anon using (true) with check (true);

create policy if not exists "anon_update_sessions" on chat_sessions 
  for update to anon using (true) with check (true);

create policy if not exists "anon_read_sessions" on chat_sessions 
  for select to anon using (true);

-- Policies for chat_messages
create policy if not exists "anon_insert_messages" on chat_messages 
  for insert to anon using (true) with check (true);

create policy if not exists "anon_read_messages" on chat_messages 
  for select to anon using (true);

-- Policies for chat_analytics
create policy if not exists "anon_insert_analytics" on chat_analytics 
  for insert to anon using (true) with check (true);

-- Policies for support_escalations
create policy if not exists "anon_insert_escalations" on support_escalations 
  for insert to anon using (true) with check (true);

-- 8. Create updated_at trigger for chat_sessions
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for automatic timestamp update
drop trigger if exists update_chat_sessions_updated_at on chat_sessions;
create trigger update_chat_sessions_updated_at
  before update on chat_sessions
  for each row
  execute function update_updated_at_column();

-- 9. Grant necessary permissions
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

-- Instructions:
-- 1. Copy and paste this entire script into your Supabase SQL Editor
-- 2. Click "Run" to execute all commands
-- 3. Verify that all 4 tables are created successfully
-- 4. The RLS policies are permissive for development - tighten them for production
-- 5. Deploy your Supabase Edge Functions if not already done:
--    - Go to Supabase Dashboard → Edge Functions
--    - Deploy the ai-chat function
--    - Set the OPENROUTER_API_KEY secret in the Edge Functions secrets section
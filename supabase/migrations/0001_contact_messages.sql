-- Run this in the Supabase SQL editor (Database > SQL Editor > New query).
-- Creates the contact_messages table that src/app/api/contact/route.ts
-- already inserts into, plus row-level security so:
--   - anyone (anon) can submit the public contact form (insert only)
--   - only logged-in admin accounts (authenticated) can read submissions

create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "contact_messages_insert_anon"
  on public.contact_messages
  for insert
  to anon
  with check (true);

create policy "contact_messages_select_authenticated"
  on public.contact_messages
  for select
  to authenticated
  using (true);

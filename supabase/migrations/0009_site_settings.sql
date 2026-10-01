-- Run this in the Supabase SQL editor, after 0008_blog_posts.sql.
-- Single-row table for site-wide settings editable from /admin/settings.
-- Seeded with the Bitcoin address currently hardcoded via the
-- NEXT_PUBLIC_BITCOIN_ADDRESS env var, so nothing changes on the storefront
-- until the admin updates it from the dashboard.

create table if not exists public.site_settings (
  id bigint primary key default 1,
  bitcoin_address text,
  updated_at timestamptz not null default now(),
  constraint site_settings_single_row check (id = 1)
);

insert into public.site_settings (id, bitcoin_address)
values (1, 'bc1q5wg7jay44k2nn9hacm9a870j868zcp3v4w88q4')
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

create policy "site_settings_public_read"
  on public.site_settings
  for select
  using (true);

create policy "site_settings_authenticated_update"
  on public.site_settings
  for update
  to authenticated
  using (true)
  with check (true);

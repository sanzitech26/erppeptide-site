-- Run this in the Supabase SQL editor.
-- Backs the admin Orders page: every checkout submission is stored here
-- (and still emailed to info@). Payment-proof screenshots go in a PRIVATE bucket.

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  street text not null,
  city text not null default '',
  state text not null default '',
  zip text not null default '',
  country text not null default '',
  notes text not null default '',
  items jsonb not null,
  subtotal numeric(10, 2) not null,
  proof_path text,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "orders_insert_anon"
  on public.orders
  for insert
  to anon
  with check (true);

create policy "orders_select_authenticated"
  on public.orders
  for select
  to authenticated
  using (true);

create policy "orders_delete_authenticated"
  on public.orders
  for delete
  to authenticated
  using (true);

-- Private bucket: customers can upload a proof, only the admin can view it.
insert into storage.buckets (id, name, public)
values ('order-proofs', 'order-proofs', false)
on conflict (id) do nothing;

create policy "order_proofs_insert_anon"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'order-proofs');

create policy "order_proofs_select_authenticated"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'order-proofs');

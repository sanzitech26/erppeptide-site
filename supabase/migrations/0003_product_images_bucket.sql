-- Run this in the Supabase SQL editor, after 0002_products.sql.
-- Creates a public Storage bucket for admin-uploaded product photos.

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "product_images_public_read"
  on storage.objects
  for select
  to public
  using (bucket_id = 'product-images');

create policy "product_images_authenticated_insert"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images');

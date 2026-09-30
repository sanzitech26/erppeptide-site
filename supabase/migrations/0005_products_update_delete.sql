-- Run this in the Supabase SQL editor, after 0002_products.sql.
-- The admin product list needs to edit and delete products; 0002 only
-- granted authenticated accounts insert access.

create policy "products_authenticated_update"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

create policy "products_authenticated_delete"
  on public.products
  for delete
  to authenticated
  using (true);

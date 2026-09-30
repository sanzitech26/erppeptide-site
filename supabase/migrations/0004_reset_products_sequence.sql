-- Run this AFTER scripts/seed-products.mjs has finished successfully.
-- The seed script inserts the existing 188 products with their original
-- (legacy) explicit ids, which the products.id identity sequence doesn't
-- know about. This bumps the sequence so the next admin-added product gets
-- a fresh id instead of colliding with an existing one.

select setval(
  pg_get_serial_sequence('public.products', 'id'),
  (select max(id) from public.products)
);

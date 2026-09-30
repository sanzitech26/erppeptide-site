// One-time backfill of src/data/{categories,products}.json into Supabase.
// Run this yourself (not run against your live project by Claude) after
// applying supabase/migrations/0002_products.sql and
// supabase/migrations/0003_product_images_bucket.sql:
//
//   node --env-file=.env.local scripts/seed-products.mjs
//
// Then run supabase/migrations/0004_reset_products_sequence.sql.
// Safe to re-run (upserts by id).

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Run with: node --env-file=.env.local scripts/seed-products.mjs"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey);

const categories = JSON.parse(
  readFileSync(new URL("../src/data/categories.json", import.meta.url))
);
const products = JSON.parse(
  readFileSync(new URL("../src/data/products.json", import.meta.url))
);

const categoryRows = categories.map((c) => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
}));

const { error: categoryError } = await supabase
  .from("categories")
  .upsert(categoryRows);
if (categoryError) throw categoryError;
console.log(`Seeded ${categoryRows.length} categories`);

const productRows = products.map((p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  description: p.description,
  sku: p.sku,
  price: p.price,
  currency: p.currency,
  in_stock: p.inStock,
  image: p.image,
  category_ids: p.categoryIds,
  variants: p.variants,
}));

const BATCH_SIZE = 50;
for (let i = 0; i < productRows.length; i += BATCH_SIZE) {
  const batch = productRows.slice(i, i + BATCH_SIZE);
  const { error } = await supabase.from("products").upsert(batch);
  if (error) throw error;
  console.log(
    `Seeded products ${i + 1}-${i + batch.length} of ${productRows.length}`
  );
}

console.log(
  "Done. Now run supabase/migrations/0004_reset_products_sequence.sql in the Supabase SQL editor."
);

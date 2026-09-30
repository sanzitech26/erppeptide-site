// Checks whether a product still exists in Supabase, e.g. to confirm a
// delete from the admin dashboard actually removed the row.
//
//   node --env-file=.env.local scripts/check-product.mjs <id-or-slug>
//
// Read-only (products has public SELECT via RLS) — only needs the anon key.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const arg = process.argv[2];

if (!url || !anonKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.\n" +
      "Run with: node --env-file=.env.local scripts/check-product.mjs <id-or-slug>"
  );
  process.exit(1);
}
if (!arg) {
  console.error("Usage: node --env-file=.env.local scripts/check-product.mjs <id-or-slug>");
  process.exit(1);
}

const supabase = createClient(url, anonKey);
const column = /^\d+$/.test(arg) ? "id" : "slug";

const { data, error } = await supabase
  .from("products")
  .select("id, slug, name, in_stock")
  .eq(column, column === "id" ? Number(arg) : arg)
  .maybeSingle();

if (error) throw error;

if (!data) {
  console.log(`No product found for ${column} "${arg}" — confirmed deleted (or never existed).`);
} else {
  console.log(`Still in the database:`, data);
}

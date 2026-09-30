import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cookie-free client for public, non-user-scoped reads (product catalog).
// Unlike src/lib/supabase/server.ts, this never touches next/headers'
// cookies(), so it's safe to call from generateStaticParams and other
// build-time contexts that have no request to read cookies from.
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

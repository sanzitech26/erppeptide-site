import { createClient } from "@/lib/supabase/public";

export async function getBitcoinAddress(): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("bitcoin_address")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return data?.bitcoin_address ?? null;
}

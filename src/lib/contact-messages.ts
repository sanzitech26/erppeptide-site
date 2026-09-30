import { createClient } from "@/lib/supabase/server";

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, message, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

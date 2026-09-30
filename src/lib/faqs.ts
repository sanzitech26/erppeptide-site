import { createClient } from "@/lib/supabase/public";

export type Faq = {
  id: number;
  question: string;
  answer: string;
};

export async function getAllFaqs(): Promise<Faq[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("id, question, answer")
    .order("id");
  if (error) throw error;
  return data as Faq[];
}

export async function getFaqById(id: number): Promise<Faq | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("id, question, answer")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Faq) ?? undefined;
}

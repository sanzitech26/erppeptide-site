import { createClient } from "@/lib/supabase/public";

export type Testimonial = {
  id: number;
  name: string;
  stars: number;
  quote: string;
};

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, name, stars, quote")
    .order("id", { ascending: false });
  if (error) throw error;
  return data as Testimonial[];
}

export async function getTestimonialById(id: number): Promise<Testimonial | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, name, stars, quote")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Testimonial) ?? undefined;
}

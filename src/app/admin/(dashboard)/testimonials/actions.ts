"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type TestimonialFormState = { error?: string; success?: boolean } | undefined;

function parseFields(formData: FormData) {
  const name = formData.get("name");
  const quote = formData.get("quote");
  const starsRaw = formData.get("stars");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Name is required." } as const;
  }
  if (typeof quote !== "string" || !quote.trim()) {
    return { error: "Testimonial text is required." } as const;
  }
  const stars = typeof starsRaw === "string" ? Number(starsRaw) : NaN;
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return { error: "Stars must be between 1 and 5." } as const;
  }

  return { name: name.trim(), quote: quote.trim(), stars } as const;
}

export async function createTestimonial(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const fields = parseFields(formData);
  if ("error" in fields) return fields;

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert(fields);
  if (error) return { error: `Could not save: ${error.message}` };

  revalidatePath("/");
  revalidatePath("/testimonials");
  return { success: true };
}

export async function updateTestimonial(
  id: number,
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const fields = parseFields(formData);
  if ("error" in fields) return fields;

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update(fields).eq("id", id);
  if (error) return { error: `Could not save: ${error.message}` };

  revalidatePath("/");
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: number) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
}

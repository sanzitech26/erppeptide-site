"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type FaqFormState = { error?: string; success?: boolean } | undefined;

function parseFields(formData: FormData) {
  const question = formData.get("question");
  const answer = formData.get("answer");
  if (typeof question !== "string" || !question.trim()) {
    return { error: "Question is required." } as const;
  }
  if (typeof answer !== "string" || !answer.trim()) {
    return { error: "Answer is required." } as const;
  }
  return { question: question.trim(), answer: answer.trim() } as const;
}

export async function createFaq(
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  const fields = parseFields(formData);
  if ("error" in fields) return fields;

  const supabase = await createClient();
  const { error } = await supabase.from("faqs").insert(fields);
  if (error) return { error: `Could not save: ${error.message}` };

  revalidatePath("/");
  return { success: true };
}

export async function updateFaq(
  id: number,
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  const fields = parseFields(formData);
  if ("error" in fields) return fields;

  const supabase = await createClient();
  const { error } = await supabase.from("faqs").update(fields).eq("id", id);
  if (error) return { error: `Could not save: ${error.message}` };

  revalidatePath("/");
  revalidatePath("/admin/faqs");
  redirect("/admin/faqs");
}

export async function deleteFaq(id: number) {
  const supabase = await createClient();
  await supabase.from("faqs").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/faqs");
}

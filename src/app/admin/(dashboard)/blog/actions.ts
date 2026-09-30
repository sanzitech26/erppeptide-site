"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type BlogFormState = { error?: string; success?: boolean } | undefined;

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseFields(formData: FormData) {
  const title = formData.get("title");
  const excerpt = formData.get("excerpt");
  const content = formData.get("content");
  const metaDescription = formData.get("metaDescription");
  const published = formData.get("published") === "on";

  if (typeof title !== "string" || !title.trim()) {
    return { error: "Title is required." } as const;
  }
  if (typeof content !== "string" || !content.trim()) {
    return { error: "Content is required." } as const;
  }

  return {
    title: title.trim(),
    excerpt: typeof excerpt === "string" ? excerpt.trim() : "",
    content: content.trim(),
    metaDescription: typeof metaDescription === "string" ? metaDescription.trim() : "",
    published,
  } as const;
}

export async function createBlogPost(
  _prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const fields = parseFields(formData);
  if ("error" in fields) return fields;

  const supabase = await createClient();
  const baseSlug = slugify(fields.title);
  if (!baseSlug) return { error: "Title must contain at least one letter or number." };

  let slug = baseSlug;
  for (let suffix = 2; ; suffix++) {
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${suffix}`;
  }

  let coverImage: string | null = null;
  const image = formData.get("coverImage");
  if (image instanceof File && image.size > 0) {
    const ext = image.name.split(".").pop() || "jpg";
    const path = `blog-${slug}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("product-images").upload(path, image);
    if (uploadError) return { error: `Cover image upload failed: ${uploadError.message}` };
    coverImage = supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
  }

  const { error } = await supabase.from("blog_posts").insert({
    slug,
    title: fields.title,
    excerpt: fields.excerpt,
    content: fields.content,
    meta_description: fields.metaDescription,
    published: fields.published,
    cover_image: coverImage,
  });
  if (error) return { error: `Could not save: ${error.message}` };

  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  return { success: true };
}

export async function updateBlogPost(
  id: number,
  _prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const fields = parseFields(formData);
  if ("error" in fields) return fields;

  const supabase = await createClient();
  const { data: existingPost, error: fetchError } = await supabase
    .from("blog_posts")
    .select("slug, cover_image")
    .eq("id", id)
    .maybeSingle();
  if (fetchError || !existingPost) return { error: "Post not found." };

  let coverImage = existingPost.cover_image as string | null;
  const image = formData.get("coverImage");
  if (image instanceof File && image.size > 0) {
    const ext = image.name.split(".").pop() || "jpg";
    const path = `blog-${existingPost.slug}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("product-images").upload(path, image);
    if (uploadError) return { error: `Cover image upload failed: ${uploadError.message}` };
    coverImage = supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
  }

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title: fields.title,
      excerpt: fields.excerpt,
      content: fields.content,
      meta_description: fields.metaDescription,
      published: fields.published,
      cover_image: coverImage,
    })
    .eq("id", id);
  if (error) return { error: `Could not save: ${error.message}` };

  revalidatePath("/blog");
  revalidatePath(`/blog/${existingPost.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: number) {
  const supabase = await createClient();
  await supabase.from("blog_posts").delete().eq("id", id);

  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/blog");
}

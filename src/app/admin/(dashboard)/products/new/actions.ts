"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CreateProductState = { error?: string; success?: boolean } | undefined;

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProduct(
  _prevState: CreateProductState,
  formData: FormData
): Promise<CreateProductState> {
  const name = formData.get("name");
  const description = formData.get("description");
  const sku = formData.get("sku");
  const priceRaw = formData.get("price");
  const inStock = formData.get("inStock") === "on";
  const categoryIds = formData.getAll("categoryIds").map(Number).filter((n) => !Number.isNaN(n));
  const image = formData.get("image");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Name is required." };
  }
  const price = typeof priceRaw === "string" ? Number(priceRaw) : NaN;
  if (Number.isNaN(price) || price < 0) {
    return { error: "Enter a valid price." };
  }

  const supabase = await createClient();
  const baseSlug = slugify(name);
  if (!baseSlug) {
    return { error: "Name must contain at least one letter or number." };
  }

  let slug = baseSlug;
  for (let suffix = 2; ; suffix++) {
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${suffix}`;
  }

  let imagePath: string | null = null;
  if (image instanceof File && image.size > 0) {
    const ext = image.name.split(".").pop() || "jpg";
    const path = `${slug}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, image);
    if (uploadError) {
      return { error: `Image upload failed: ${uploadError.message}` };
    }
    imagePath = supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
  }

  const { error: insertError } = await supabase.from("products").insert({
    slug,
    name: name.trim(),
    description: typeof description === "string" ? description.trim() : "",
    sku: typeof sku === "string" ? sku.trim() : "",
    price,
    currency: "usd",
    in_stock: inStock,
    image: imagePath,
    category_ids: categoryIds,
    variants: [],
  });

  if (insertError) {
    return { error: `Could not save product: ${insertError.message}` };
  }

  revalidatePath("/");
  revalidatePath("/products");

  return { success: true };
}

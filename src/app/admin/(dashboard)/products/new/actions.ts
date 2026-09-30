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
  const inStock = formData.get("inStock") === "on";
  const categoryIds = formData.getAll("categoryIds").map(Number).filter((n) => !Number.isNaN(n));
  const image = formData.get("image");
  const optionLabels = formData.getAll("optionLabel");
  const optionPrices = formData.getAll("optionPrice");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Name is required." };
  }

  const options: { label: string; price: number }[] = [];
  for (let i = 0; i < optionLabels.length; i++) {
    const label = optionLabels[i];
    const priceRaw = optionPrices[i];
    if (typeof label !== "string" || !label.trim()) continue;
    const price = typeof priceRaw === "string" ? Number(priceRaw) : NaN;
    if (Number.isNaN(price) || price < 0) {
      return { error: `Enter a valid price for "${label.trim()}".` };
    }
    options.push({ label: label.trim(), price });
  }
  if (options.length === 0) {
    return { error: "Add at least one option with a name and price." };
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

  const usedSkus = new Set<string>();
  const variants = options.map((o) => {
    const labelSlug = slugify(o.label);
    const base = labelSlug ? `${slug}-${labelSlug}` : slug;
    let sku = base;
    for (let suffix = 2; usedSkus.has(sku); suffix++) {
      sku = `${base}-${suffix}`;
    }
    usedSkus.add(sku);
    return { sku, label: o.label, price: o.price, inStock };
  });
  const price = Math.min(...variants.map((v) => v.price));

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
    description: "",
    sku: variants[0].sku,
    price,
    currency: "usd",
    in_stock: inStock,
    image: imagePath,
    category_ids: categoryIds,
    variants,
  });

  if (insertError) {
    return { error: `Could not save product: ${insertError.message}` };
  }

  revalidatePath("/");
  revalidatePath("/products");

  return { success: true };
}

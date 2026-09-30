"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ProductFormState = { error?: string; success?: boolean } | undefined;

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseOptions(formData: FormData): { label: string; price: number }[] | { error: string } {
  const optionLabels = formData.getAll("optionLabel");
  const optionPrices = formData.getAll("optionPrice");

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
  return options;
}

function buildVariants(slug: string, options: { label: string; price: number }[], inStock: boolean) {
  const usedSkus = new Set<string>();
  return options.map((o) => {
    const labelSlug = slugify(o.label);
    const base = labelSlug ? `${slug}-${labelSlug}` : slug;
    let sku = base;
    for (let suffix = 2; usedSkus.has(sku); suffix++) {
      sku = `${base}-${suffix}`;
    }
    usedSkus.add(sku);
    return { sku, label: o.label, price: o.price, inStock };
  });
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const name = formData.get("name");
  const inStock = formData.get("inStock") === "on";
  const categoryIds = formData.getAll("categoryIds").map(Number).filter((n) => !Number.isNaN(n));
  const image = formData.get("image");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Name is required." };
  }

  const options = parseOptions(formData);
  if ("error" in options) return options;

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

  const variants = buildVariants(slug, options, inStock);
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

export async function updateProduct(
  id: number,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const name = formData.get("name");
  const inStock = formData.get("inStock") === "on";
  const categoryIds = formData.getAll("categoryIds").map(Number).filter((n) => !Number.isNaN(n));
  const image = formData.get("image");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Name is required." };
  }

  const options = parseOptions(formData);
  if ("error" in options) return options;

  const supabase = await createClient();
  const { data: existingProduct, error: fetchError } = await supabase
    .from("products")
    .select("slug, image")
    .eq("id", id)
    .maybeSingle();
  if (fetchError || !existingProduct) {
    return { error: "Product not found." };
  }

  const slug = existingProduct.slug as string;
  const variants = buildVariants(slug, options, inStock);
  const price = Math.min(...variants.map((v) => v.price));

  let imagePath = existingProduct.image as string | null;
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

  const { error: updateError } = await supabase
    .from("products")
    .update({
      name: name.trim(),
      sku: variants[0].sku,
      price,
      in_stock: inStock,
      image: imagePath,
      category_ids: categoryIds,
      variants,
    })
    .eq("id", id);

  if (updateError) {
    return { error: `Could not save product: ${updateError.message}` };
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  redirect("/admin/products");
}

export async function deleteProduct(id: number) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
}

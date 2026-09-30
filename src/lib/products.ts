import { createClient } from "@/lib/supabase/public";

export type Variant = {
  sku: string;
  label: string;
  price: number;
  inStock: boolean;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  currency: string;
  inStock: boolean;
  image: string | null;
  categoryIds: number[];
  variants: Variant[];
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

type ProductRow = {
  id: number;
  slug: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  currency: string;
  in_stock: boolean;
  image: string | null;
  category_ids: number[];
  variants: Variant[];
};

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    sku: row.sku,
    price: row.price,
    currency: row.currency,
    inStock: row.in_stock,
    image: row.image,
    categoryIds: row.category_ids,
    variants: row.variants,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id");
  if (error) throw error;
  return (data as ProductRow[]).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data as ProductRow) : undefined;
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data as ProductRow) : undefined;
}

export async function getAllCategories(): Promise<Category[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw error;
  return data as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Category) ?? undefined;
}

export async function getProductsByCategoryId(categoryId: number): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.categoryIds.includes(categoryId));
}

export async function getFeaturedProducts(count: number): Promise<Product[]> {
  const products = await getAllProducts();
  return products.slice(0, count);
}

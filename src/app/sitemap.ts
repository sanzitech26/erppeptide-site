import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getAllProducts } from "@/lib/products";
import { getAllBlogPosts } from "@/lib/blog";

const STATIC_PATHS = [
  "",
  "/products",
  "/about",
  "/supply",
  "/testing",
  "/blog",
  "/testimonials",
  "/contact",
  "/shipping-policy",
  "/return-policy",
  "/privacy-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${origin}${path}`,
  }));

  try {
    const products = await getAllProducts();
    for (const p of products) {
      entries.push({ url: `${origin}/products/${p.slug}` });
    }
  } catch {
    // Catalog not migrated/seeded yet — sitemap just omits products.
  }

  try {
    const posts = await getAllBlogPosts();
    for (const p of posts) {
      entries.push({ url: `${origin}/blog/${p.slug}`, lastModified: p.createdAt });
    }
  } catch {
    // Blog table not migrated yet — sitemap just omits posts.
  }

  return entries;
}

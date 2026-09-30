import { createClient as createPublicClient } from "@/lib/supabase/public";
import { createClient as createServerClient } from "@/lib/supabase/server";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  metaDescription: string;
  published: boolean;
  createdAt: string;
};

type BlogPostRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  meta_description: string;
  published: boolean;
  created_at: string;
};

function mapBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    metaDescription: row.meta_description,
    published: row.published,
    createdAt: row.created_at,
  };
}

const SELECT_COLUMNS =
  "id, slug, title, excerpt, content, cover_image, meta_description, published, created_at";

// Public reads (storefront + generateStaticParams) — anon key, published only.
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(SELECT_COLUMNS)
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as BlogPostRow[]).map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(SELECT_COLUMNS)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return data ? mapBlogPost(data as BlogPostRow) : undefined;
}

// Admin reads (session-aware) — sees drafts too.
export async function getAllBlogPostsAdmin(): Promise<BlogPost[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(SELECT_COLUMNS)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as BlogPostRow[]).map(mapBlogPost);
}

export async function getBlogPostByIdAdmin(id: number): Promise<BlogPost | undefined> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(SELECT_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapBlogPost(data as BlogPostRow) : undefined;
}

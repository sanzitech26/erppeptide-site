import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Newspaper, TriangleAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllBlogPostsAdmin } from "@/lib/blog";
import { DeleteBlogPostButton } from "./delete-button";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  let posts: Awaited<ReturnType<typeof getAllBlogPostsAdmin>> = [];
  let loadError = false;

  try {
    posts = await getAllBlogPostsAdmin();
  } catch {
    loadError = true;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading">Blog</h1>
          <p className="text-sm text-muted-foreground">Published posts appear on /blog.</p>
        </div>
        <Button
          size="sm"
          render={
            <Link href="/admin/blog/new">
              <Plus className="size-4" />
              Add Post
            </Link>
          }
        />
      </div>

      <Card className="py-0">
        {loadError ? (
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <TriangleAlert className="size-8 text-destructive/60" />
            <p className="text-sm text-destructive">
              Could not load posts — run{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                supabase/migrations/0008_blog_posts.sql
              </code>{" "}
              in the Supabase SQL editor if you haven&apos;t yet.
            </p>
          </CardContent>
        ) : posts.length === 0 ? (
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <Newspaper className="size-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No posts yet.</p>
          </CardContent>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30">
                    {p.coverImage && (
                      <Image src={p.coverImage} alt="" fill className="object-cover" sizes="48px" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge variant={p.published ? "secondary" : "outline"}>
                    {p.published ? "Published" : "Draft"}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Edit"
                      render={<Link href={`/admin/blog/${p.id}/edit`} />}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <DeleteBlogPostButton id={p.id} title={p.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getBlogPostByIdAdmin } from "@/lib/blog";
import { BlogForm } from "../../blog-form";
import { updateBlogPost } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  if (Number.isNaN(postId)) notFound();

  const post = await getBlogPostByIdAdmin(postId);
  if (!post) notFound();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading">Edit Post</h1>
        <p className="text-sm text-muted-foreground">Changes go live immediately once published.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Post details</CardTitle>
          <CardDescription>Title and content are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogForm
            action={updateBlogPost.bind(null, postId)}
            submitLabel="Save Changes"
            pendingLabel="Saving…"
            initial={{
              title: post.title,
              excerpt: post.excerpt,
              content: post.content,
              metaDescription: post.metaDescription,
              published: post.published,
              coverImage: post.coverImage,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

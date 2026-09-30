import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BlogForm } from "../blog-form";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading">Add Post</h1>
        <p className="text-sm text-muted-foreground">
          Published immediately unless you uncheck &quot;Published&quot; below.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Post details</CardTitle>
          <CardDescription>Title and content are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogForm action={createBlogPost} submitLabel="Add Post" pendingLabel="Saving…" />
        </CardContent>
      </Card>
    </div>
  );
}

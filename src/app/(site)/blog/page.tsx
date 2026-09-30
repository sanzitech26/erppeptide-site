import Image from 'next/image'
import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog'

export const metadata = { title: 'Blog | Jaycey Peptides' }

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getAllBlogPosts>> = []
  try {
    posts = await getAllBlogPosts()
  } catch {
    // Blog table not migrated yet — render an empty state rather than crash.
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-10 text-center">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts yet — check back soon.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="relative aspect-video bg-muted/30">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                )}
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground mb-2">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <h2 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

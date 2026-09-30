import { notFound } from 'next/navigation'
import Image from 'next/image'
import { marked } from 'marked'
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog'

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts()
    return posts.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug).catch(() => undefined)
  if (!post) return {}
  return {
    title: `${post.title} | Jaycey Peptides`,
    description: post.metaDescription || post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt || undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
      type: 'article',
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug).catch(() => undefined)
  if (!post) notFound()

  const html = marked.parse(post.content, { async: false }) as string

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: post.coverImage || undefined,
    datePublished: post.createdAt,
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-heading text-4xl font-bold mb-3">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {post.coverImage && (
        <div className="relative aspect-video mb-10 rounded-xl overflow-hidden bg-muted/30">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        </div>
      )}
      <div
        className="text-foreground [&_h1]:font-heading [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-3 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  )
}

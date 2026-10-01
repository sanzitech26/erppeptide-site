import { notFound } from 'next/navigation'
import { getAllProducts, getProductBySlug, getAllCategories } from '@/lib/products'
import { ProductDetail } from '@/components/product-detail'

export async function generateStaticParams() {
  try {
    const products = await getAllProducts()
    return products.map((p) => ({ slug: p.slug }))
  } catch {
    // Supabase not migrated/seeded yet — don't fail the whole build; new
    // and existing slugs still render on-demand via dynamicParams (default).
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug).catch(() => undefined)
  if (!product) return {}
  return {
    title: `${product.name} | Jaycey Peptides`,
    description: product.description || `${product.name} — factory-direct research peptide from Jaycey Peptides.`,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug).catch(() => undefined)
  if (!product) notFound()

  const categories = await getAllCategories().catch(() => [])
  const categoryName = categories.find((c) => product.categoryIds.includes(c.id))?.name

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <ProductDetail product={product} categoryName={categoryName} />
    </div>
  )
}

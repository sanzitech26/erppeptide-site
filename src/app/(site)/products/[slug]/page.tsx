import { notFound } from 'next/navigation'
import { getAllProducts, getProductBySlug } from '@/lib/products'
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
    title: `${product.name} | ERP Peptide`,
    description: product.description,
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <ProductDetail product={product} />
    </div>
  )
}

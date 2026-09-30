import { notFound } from 'next/navigation'
import { getAllProducts, getProductBySlug } from '@/lib/products'
import { ProductDetail } from '@/components/product-detail'

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
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
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <ProductDetail product={product} />
    </div>
  )
}

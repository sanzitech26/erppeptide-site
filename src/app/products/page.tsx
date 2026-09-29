import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { getAllProducts, getAllCategories, getCategoryBySlug } from '@/lib/products'
import { cn } from 'cn'

export const metadata = {
  title: 'All Products | ERP Peptide',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: categorySlug } = await searchParams
  const categories = getAllCategories()
  const activeCategory = categorySlug ? getCategoryBySlug(categorySlug) : undefined

  const products = activeCategory
    ? getAllProducts().filter((p) => p.categoryIds.includes(activeCategory.id))
    : getAllProducts()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold mb-2">
        {activeCategory ? activeCategory.name : 'All Products'}
      </h1>
      <p className="text-muted-foreground mb-8">{products.length} products</p>

      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/products"
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
            !activeCategory
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border hover:border-primary'
          )}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/products?category=${c.slug}`}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              activeCategory?.id === c.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:border-primary'
            )}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

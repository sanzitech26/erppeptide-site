import { ProductsGrid } from '@/components/products-grid'
import { getAllProducts, getAllCategories } from '@/lib/products'

export const metadata = {
  title: 'All Products | Jaycey Peptides',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: categorySlug } = await searchParams

  let categories: Awaited<ReturnType<typeof getAllCategories>> = []
  let products: Awaited<ReturnType<typeof getAllProducts>> = []
  let loadError = false

  try {
    categories = await getAllCategories()
    products = await getAllProducts()
  } catch {
    loadError = true
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-muted-foreground">
          The catalog isn&apos;t available right now — please check back shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <ProductsGrid products={products} categories={categories} initialCategorySlug={categorySlug} />
    </div>
  )
}

'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ProductCard } from '@/components/product-card'
import { cn } from 'cn'
import type { Product, Category } from '@/lib/products'

const sortOptions = {
  latest: 'Sort by Latest',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  name: 'Name: A to Z',
} as const

type SortKey = keyof typeof sortOptions

export function ProductsGrid({
  products,
  categories,
  initialCategorySlug,
}: {
  products: Product[]
  categories: Category[]
  initialCategorySlug?: string
}) {
  const [categorySlug, setCategorySlug] = useState(initialCategorySlug ?? '')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('latest')

  const activeCategory = categories.find((c) => c.slug === categorySlug)

  const visible = useMemo(() => {
    let list = activeCategory
      ? products.filter((p) => p.categoryIds.includes(activeCategory.id))
      : products

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q))
    }

    list = [...list]
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))

    return list
  }, [products, activeCategory, search, sort])

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-2">
        {activeCategory ? activeCategory.name : 'All Products'}
      </h1>
      <p className="text-muted-foreground mb-8">{visible.length} products</p>

      <div className="flex flex-col gap-4 mb-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategorySlug('')}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              !activeCategory
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:border-primary'
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => setCategorySlug(c.slug)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                activeCategory?.id === c.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary'
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 sm:w-56"
            />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(sortOptions).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">No products match your search.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

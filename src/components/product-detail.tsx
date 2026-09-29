'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'
import { Minus, Plus, ShoppingCart, Check } from 'lucide-react'

export function ProductDetail({ product }: { product: Product }) {
  const variants = product.variants.length
    ? product.variants
    : [{ sku: product.sku, label: 'Standard', price: product.price, inStock: product.inStock }]

  const [selectedSku, setSelectedSku] = useState(variants[0].sku)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const selected = variants.find((v) => v.sku === selectedSku) ?? variants[0]

  function handleAddToCart() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        variantSku: selected.sku,
        variantLabel: selected.label,
        price: selected.price,
      },
      quantity
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="relative aspect-square bg-white rounded-xl border border-border">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-10"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}
        {!selected.inStock && (
          <Badge variant="secondary" className="absolute top-4 left-4">
            Out of stock
          </Badge>
        )}
      </div>

      <div>
        <h1 className="font-heading text-3xl font-bold mb-3">{product.name}</h1>
        <p className="text-2xl font-semibold text-primary mb-6">
          ${selected.price.toFixed(2)}
        </p>
        <p className="text-muted-foreground leading-relaxed mb-8">
          {product.description}
        </p>

        {variants.length > 1 && (
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">Select option</p>
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => (
                <button
                  key={v.sku}
                  onClick={() => setSelectedSku(v.sku)}
                  disabled={!v.inStock}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                    v.sku === selectedSku
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {v.label} — ${v.price.toFixed(2)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" />
            </Button>
            <span className="w-10 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <Button
            size="lg"
            className="flex-1"
            disabled={!selected.inStock}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check className="size-4" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="size-4" />
                {selected.inStock ? 'Add to Cart' : 'Out of Stock'}
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground border-t border-border pt-4">
          For research purposes only. Not for human consumption or clinical use.
          ERP Peptides™ is not a pharmacy and does not provide medical advice.
        </p>
      </div>
    </div>
  )
}

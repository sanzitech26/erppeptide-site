'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'
import { Minus, Plus, ShoppingCart, Check, Zap } from 'lucide-react'

export function ProductDetail({ product }: { product: Product }) {
  const variants = product.variants.length
    ? product.variants
    : [{ sku: product.sku, label: 'Standard', price: product.price, inStock: product.inStock }]

  const [selectedSku, setSelectedSku] = useState(variants[0].sku)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()

  const selected = variants.find((v) => v.sku === selectedSku) ?? variants[0]

  function cartItem() {
    return {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      variantSku: selected.sku,
      variantLabel: selected.label,
      price: selected.price,
    }
  }

  function handleAddToCart() {
    addItem(cartItem(), quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  function handleBuyNow() {
    addItem(cartItem(), quantity)
    router.push('/checkout')
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
        {product.description && (
          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>
        )}

        {variants.length > 1 && (
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">Select option</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {variants.map((v) => (
                <button
                  key={v.sku}
                  onClick={() => setSelectedSku(v.sku)}
                  disabled={!v.inStock}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                    v.sku === selectedSku
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  <div className="relative size-16 overflow-hidden rounded-lg border border-border bg-white">
                    {product.image && (
                      <Image src={product.image} alt="" fill className="object-contain p-1.5" />
                    )}
                  </div>
                  <span className="text-center text-xs font-medium leading-tight">{v.label}</span>
                  <span
                    className={`size-3 rounded-full border-2 ${
                      v.sku === selectedSku ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6">
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

          <div className="flex flex-1 gap-3 min-w-[220px]">
            <Button
              size="lg"
              variant="outline"
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

            <Button
              size="lg"
              className="flex-1"
              disabled={!selected.inStock}
              onClick={handleBuyNow}
            >
              <Zap className="size-4" />
              Buy Now
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground border-t border-border pt-4">
          For research purposes only. Not for human consumption or clinical use.
          ERP Peptides™ is not a pharmacy and does not provide medical advice.
        </p>
      </div>
    </div>
  )
}

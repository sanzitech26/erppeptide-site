'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'
import {
  Minus,
  Plus,
  ShoppingCart,
  Check,
  Zap,
  FlaskConical,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Headset,
} from 'lucide-react'

const trustSignals = [
  { icon: ShieldCheck, label: 'Secure Checkout' },
  { icon: Truck, label: 'Fast & Discreet Shipping' },
  { icon: BadgeCheck, label: 'Authentic Products' },
  { icon: Headset, label: '24/7 Support' },
]

export function ProductDetail({ product, categoryName }: { product: Product; categoryName?: string }) {
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
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-muted/30 to-white shadow-sm">
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
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <FlaskConical className="size-3.5 text-primary" />
            Research Grade
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            Purity Tested
          </span>
        </div>
      </div>

      <div>
        {categoryName && (
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">
            {categoryName}
          </p>
        )}

        <div className="flex items-start justify-between gap-4">
          <h1 className="font-heading text-3xl font-bold mb-1">{product.name}</h1>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              selected.inStock
                ? 'bg-green-100 text-green-700'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {selected.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-4">SKU: {selected.sku}</p>

        <p className="text-2xl font-semibold text-primary mb-6">
          ${selected.price.toFixed(2)}
        </p>
        {product.description && (
          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>
        )}

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

        <div className="grid grid-cols-2 gap-y-3 border-t border-border pt-5 sm:grid-cols-4">
          {trustSignals.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className="size-4 shrink-0 text-primary" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Minus, Plus, X } from 'lucide-react'

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Your cart is empty</h1>
        <Button size="lg" render={<Link href="/products">Browse Products</Link>} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold mb-8">Your Cart</h1>

      <div className="divide-y divide-border border-y border-border mb-8">
        {items.map((item) => (
          <div key={item.variantSku} className="flex items-center gap-4 py-4">
            <div className="relative size-20 shrink-0 bg-white rounded-lg border border-border">
              {item.image && (
                <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.slug}`} className="font-medium hover:text-primary">
                {item.name}
              </Link>
              <p className="text-sm text-muted-foreground">{item.variantLabel}</p>
            </div>
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(item.variantSku, item.quantity - 1)}
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(item.variantSku, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </Button>
            </div>
            <p className="w-20 text-right font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.variantSku)}
              aria-label="Remove item"
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <div className="w-full sm:w-80 space-y-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Shipping, taxes, and payment are finalized with our team on WhatsApp.
          </p>
          <Button size="lg" className="w-full" render={<Link href="/checkout">Checkout</Link>} />
        </div>
      </div>
    </div>
  )
}

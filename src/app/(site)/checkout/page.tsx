'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'
import { buildOrderMessage, whatsappLink } from '@/lib/whatsapp'

export default function CheckoutPage() {
  const { items, subtotal, removeItem, clear } = useCart()
  const [form, setForm] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    notes: '',
  })

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const message = buildOrderMessage({
      items: items.map((i) => ({
        name: i.name,
        variantLabel: i.variantLabel,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal,
      customer: form,
    })
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
    clear()
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Your cart is empty</h1>
        <Button size="lg" render={<Link href="/products">Browse Products</Link>} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-6 order-2 lg:order-1">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name *</Label>
            <Input id="name" required value={form.name} onChange={update('name')} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" required value={form.email} onChange={update('email')} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="street">Street address *</Label>
            <Input id="street" required value={form.street} onChange={update('street')} />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={form.city} onChange={update('city')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="state">State / Province</Label>
              <Input id="state" value={form.state} onChange={update('state')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="zip">ZIP / Postal code</Label>
              <Input id="zip" value={form.zip} onChange={update('zip')} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="country">Country</Label>
            <Input id="country" value={form.country} onChange={update('country')} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Order notes (optional)</Label>
            <Textarea id="notes" value={form.notes} onChange={update('notes')} />
          </div>

          <p className="text-xs text-muted-foreground">
            Submitting opens WhatsApp with your order and details pre-filled — send the
            message to confirm with our team.
          </p>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Continue to WhatsApp
          </Button>
        </form>

        <div className="order-1 lg:order-2">
          <div className="rounded-xl border border-border p-5">
            <h2 className="font-semibold mb-4">Order summary</h2>
            <div className="space-y-4 mb-4">
              {items.map((item) => (
                <div key={item.variantSku} className="flex items-center gap-3">
                  <div className="relative size-14 shrink-0 bg-white rounded-lg border border-border">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.variantLabel} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.variantSku)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-lg font-semibold border-t border-border pt-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

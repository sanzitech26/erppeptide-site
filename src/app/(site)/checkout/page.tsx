'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { X, Copy, Check, ImagePlus } from 'lucide-react'

const BITCOIN_ADDRESS = process.env.NEXT_PUBLIC_BITCOIN_ADDRESS

export default function CheckoutPage() {
  const { items, subtotal, removeItem, clear } = useCart()
  const router = useRouter()
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
  const [proof, setProof] = useState<File | null>(null)
  const [proofPreview, setProofPreview] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleCopy() {
    if (!BITCOIN_ADDRESS) return
    navigator.clipboard.writeText(BITCOIN_ADDRESS).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!proof) {
      setError('Please upload a screenshot of your Bitcoin payment before submitting.')
      return
    }
    setSubmitting(true)
    setError(null)

    const body = new FormData()
    for (const [key, value] of Object.entries(form)) body.append(key, value)
    body.append(
      'items',
      JSON.stringify(
        items.map((i) => ({
          name: i.name,
          variantLabel: i.variantLabel,
          quantity: i.quantity,
          price: i.price,
        }))
      )
    )
    body.append('proof', proof)

    try {
      const res = await fetch('/api/order', { method: 'POST', body })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Could not submit your order.')
      clear()
      router.push('/checkout/success')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not submit your order.')
      setSubmitting(false)
    }
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

          <div className="rounded-xl border border-border p-5 space-y-4">
            <div>
              <p className="text-sm font-semibold mb-1">Payment — Bitcoin</p>
              <p className="text-xs text-muted-foreground">
                Send the total amount in Bitcoin to the address below, then upload a
                screenshot of the completed transaction.
              </p>
            </div>

            {BITCOIN_ADDRESS ? (
              <div className="flex items-center gap-2 rounded-lg bg-muted/40 border border-border px-3 py-2">
                <code className="flex-1 text-xs break-all">{BITCOIN_ADDRESS}</code>
                <Button type="button" variant="ghost" size="icon-sm" onClick={handleCopy} aria-label="Copy address">
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
              </div>
            ) : (
              <p className="text-xs text-destructive">
                Payment address not configured yet — please contact us to complete your order.
              </p>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="proof">Payment proof screenshot *</Label>
              <div className="flex items-center gap-4">
                <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted/30">
                  {proofPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element -- local blob preview, next/image can't optimize it
                    <img src={proofPreview} alt="" className="size-full object-cover" />
                  ) : (
                    <ImagePlus className="size-6 text-muted-foreground/50" />
                  )}
                </div>
                <input
                  id="proof"
                  type="file"
                  accept="image/*"
                  required
                  className="block text-sm"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null
                    setProof(file)
                    setProofPreview(file ? URL.createObjectURL(file) : null)
                  }}
                />
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Order'}
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

'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { CheckCircle2 } from 'lucide-react'

export default function CheckoutSuccessPage() {
  const { clear } = useCart()

  useEffect(() => {
    clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <CheckCircle2 className="mx-auto mb-6 size-16 text-primary" />
      <h1 className="font-heading text-3xl font-bold mb-4">Order confirmed</h1>
      <p className="text-muted-foreground mb-8">
        Thank you — your order has been placed. A tracking number will be
        emailed to you once it ships.
      </p>
      <Button size="lg" render={<Link href="/products">Continue Shopping</Link>} />
    </div>
  )
}

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getAllProducts } from '@/lib/products'

type CartItemInput = {
  productId: number
  variantSku: string
  quantity: number
}

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key || key.startsWith('placeholder')) {
    return NextResponse.json(
      { error: 'Stripe is not configured yet. Add a real STRIPE_SECRET_KEY to .env.local.' },
      { status: 503 }
    )
  }

  const { items } = (await request.json()) as { items: CartItemInput[] }
  if (!items?.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  let products: Awaited<ReturnType<typeof getAllProducts>>
  try {
    products = await getAllProducts()
  } catch {
    return NextResponse.json(
      { error: 'The catalog is temporarily unavailable. Please try again shortly.' },
      { status: 503 }
    )
  }

  // Re-derive line items server-side from known product/variant data so a
  // tampered client-sent price can never reach Stripe.
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []
  for (const item of items) {
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 })
    }
    const product = products.find((p) => p.id === item.productId)
    const variant = product?.variants.find((v) => v.sku === item.variantSku)
    const price = variant?.price ?? product?.price
    if (!product || price === undefined) {
      return NextResponse.json(
        { error: `Unknown product/variant: ${item.variantSku}` },
        { status: 400 }
      )
    }
    line_items.push({
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(price * 100),
        product_data: {
          name: variant ? `${product.name} — ${variant.label}` : product.name,
          images: product.image ? [new URL(product.image, request.url).toString()] : undefined,
        },
      },
    })
  }

  const stripe = new Stripe(key)
  const origin = new URL(request.url).origin

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU'] },
  })

  return NextResponse.json({ url: session.url })
}

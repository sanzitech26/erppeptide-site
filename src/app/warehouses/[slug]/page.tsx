import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { warehouses, getWarehouseBySlug } from '@/lib/warehouses'
import { Truck, Clock } from 'lucide-react'

export function generateStaticParams() {
  return warehouses.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const warehouse = getWarehouseBySlug(slug)
  if (!warehouse) return {}
  return { title: `${warehouse.name} | ERP Peptide` }
}

export default async function WarehousePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const warehouse = getWarehouseBySlug(slug)
  if (!warehouse) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-5xl mb-4">{warehouse.flag}</div>
      <h1 className="font-heading text-4xl font-bold mb-4">{warehouse.name}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        {warehouse.description}
      </p>

      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        <div className="rounded-xl border border-border p-5">
          <Truck className="size-5 text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Shipping fee</p>
          <p className="font-heading font-semibold">{warehouse.shippingFee}</p>
        </div>
        <div className="rounded-xl border border-border p-5">
          <Clock className="size-5 text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Delivery time</p>
          <p className="font-heading font-semibold">{warehouse.delivery}</p>
        </div>
        <div className="rounded-xl border border-border p-5">
          <p className="text-sm text-muted-foreground mb-2">Coverage</p>
          <p className="font-heading font-semibold">{warehouse.region}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8">
        Contact online support for real-time help with product selection,
        bulk orders, shipping, or payment.
      </p>

      <Button size="lg" render={<Link href="/products">Browse Products</Link>} />
    </div>
  )
}

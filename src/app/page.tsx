import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { getAllCategories, getFeaturedProducts } from '@/lib/products'
import { warehouses } from '@/lib/warehouses'
import { CheckCircle2, Truck, ShieldCheck, Users } from 'lucide-react'

export default function Home() {
  const categories = getAllCategories()
  const featured = getFeaturedProducts(8)

  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28 text-center">
          <p className="text-secondary text-sm font-semibold tracking-widest uppercase mb-4">
            Factory Products · Standard Kit Packaging
          </p>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold leading-tight max-w-3xl mx-auto">
            Factory-Direct Research Peptides — From the Source
          </h1>
          <p className="mt-6 text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            We are a source-level peptide manufacturer supplying research-grade
            peptides directly from factory production — no reseller layers, no
            brand premiums.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              render={<Link href="/products">Shop All Products</Link>}
            />
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              render={<Link href="/supply">View Factory Catalog</Link>}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-10">
          Shipping Hubs
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {warehouses.map((w) => (
            <Link
              key={w.slug}
              href={`/warehouses/${w.slug}`}
              className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">{w.flag}</div>
              <h3 className="font-heading font-semibold mb-2">{w.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{w.region}</p>
              <p className="text-sm font-medium text-primary">{w.delivery}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-10">
            Our Signature Collections
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.slug}`}
                className="rounded-xl bg-card border border-border p-6 text-center font-heading font-semibold hover:shadow-lg hover:text-primary transition-all"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">
            Featured Products
          </h2>
          <Button variant="link" className="text-primary" render={<Link href="/products">View all &rarr;</Link>} />
        </div>
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
          <div>
            <Truck className="mx-auto mb-3 size-8 text-secondary" />
            <p className="font-heading font-semibold mb-1">Worldwide Delivery</p>
            <p className="text-sm text-primary-foreground/70">8–15 days, DDP — duties &amp; taxes prepaid</p>
          </div>
          <div>
            <ShieldCheck className="mx-auto mb-3 size-8 text-secondary" />
            <p className="font-heading font-semibold mb-1">Third-Party Tested</p>
            <p className="text-sm text-primary-foreground/70">Every batch tracked, documented, and verified</p>
          </div>
          <div>
            <CheckCircle2 className="mx-auto mb-3 size-8 text-secondary" />
            <p className="font-heading font-semibold mb-1">Risk Coverage</p>
            <p className="text-sm text-primary-foreground/70">Invalid results refunded, seizures reshipped free</p>
          </div>
          <div>
            <Users className="mx-auto mb-3 size-8 text-secondary" />
            <p className="font-heading font-semibold mb-1">2,300+ Customers</p>
            <p className="text-sm text-primary-foreground/70">Trusted by individuals and distributors worldwide</p>
          </div>
        </div>
      </section>
    </div>
  )
}

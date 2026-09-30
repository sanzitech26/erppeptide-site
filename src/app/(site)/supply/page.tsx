import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Package, Headset, ShieldCheck, Users, TrendingDown } from 'lucide-react'

export const metadata = { title: 'Supply | Jaycey Peptides' }

const logistics = [
  'Worldwide delivery in 8–15 days',
  'Air shipment within 24 hours (business days)',
  'Tracking number provided for every order',
  'Brazil orders require local tax ID (CPF / CNPJ)',
]

const support = [
  'Dedicated support team',
  'Fast response during working hours',
  'Clear communication before and after payment',
  'Support for individuals and distributors',
]

const riskCoverage = [
  'Invalid test results → full refund',
  'Customs seizure → free reshipment',
  'Issues handled with documentation and transparency',
]

const pricingReasons = [
  { title: 'No repackaging layers', body: 'Factory packing reduces handling cost and variability.' },
  { title: 'No brand premium', body: 'Buyers pay for production and supply — not branding or retail markups.' },
  { title: 'No reseller stacking', body: 'Direct communication keeps pricing transparent.' },
]

const distributorPoints = [
  { title: 'Kit-based wholesale pricing', body: 'Built for predictable cost and clear margins.' },
  { title: 'Stable upstream supply', body: 'Factory production planning for steady restock.' },
  { title: 'Repeat and bulk restocking', body: 'Structured for frequent replenishment.' },
  { title: 'Long-term cooperation model', body: 'Priority access for consistent partners.' },
]

const communityLinks = [
  { href: 'https://chat.whatsapp.com/LlpmCTE7zQfIylY1T4erlQ', label: 'WhatsApp', desc: 'Order coordination' },
  { href: 'https://t.me/+aUEr7VkHjLswZTY8', label: 'Telegram', desc: 'Shipping updates' },
  { href: 'https://discord.gg/GfrDAnFuSs', label: 'Discord', desc: 'Bulk and repeat supply discussions' },
]

export default function SupplyPage() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-heading text-4xl font-bold mb-4">
            Factory-Direct Research Peptides Supply
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-8">
            All products are supplied in standardized Kits (10 vials per Kit) —
            the most cost-efficient and stable way to source research
            peptides. Minimum order: 1 Kit (10 vials).
          </p>
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            render={<Link href="/products">Shop All Products</Link>}
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="font-heading text-2xl font-bold text-center mb-2">
          Supply Assurance — Shipping, Support &amp; Risk Coverage
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          Our supply model is built to reduce buyer risk and support long-term
          cooperation.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border p-6">
            <Package className="size-6 text-primary mb-3" />
            <h3 className="font-heading font-semibold mb-3">Logistics Capability</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {logistics.map((l) => <li key={l}>• {l}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-border p-6">
            <Headset className="size-6 text-primary mb-3" />
            <h3 className="font-heading font-semibold mb-3">Support Response</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {support.map((l) => <li key={l}>• {l}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-border p-6">
            <ShieldCheck className="size-6 text-primary mb-3" />
            <h3 className="font-heading font-semibold mb-3">After-Sales &amp; Risk Coverage</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {riskCoverage.map((l) => <li key={l}>• {l}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <TrendingDown className="mx-auto size-8 text-primary mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">
            Why Buying From the Factory Costs Less
          </h2>
          <p className="text-muted-foreground mb-10">
            Pricing is lower because factory-direct supply removes
            repackaging layers, brand premiums, and multiple reseller
            margins.
          </p>
          <div className="grid gap-6 sm:grid-cols-3 text-left">
            {pricingReasons.map((r) => (
              <div key={r.title} className="rounded-xl bg-card border border-border p-6">
                <h3 className="font-heading font-semibold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <Users className="mx-auto size-8 text-primary mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">
            Supplying Local Distributors Worldwide
          </h2>
          <p className="text-muted-foreground">
            Many resellers and local suppliers source directly from us. No
            middlemen — just factory-level pricing.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {distributorPoints.map((d) => (
            <div key={d.title} className="rounded-xl border border-border p-6">
              <h3 className="font-heading font-semibold mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold mb-2">
            Buyer &amp; Distributor Communities
          </h2>
          <p className="text-primary-foreground/80 mb-10">
            We operate active private communities where buyers and partners
            stay connected — order coordination, shipping updates, and repeat
            supply planning.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {communityLinks.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/20 p-6 hover:bg-white/10 transition-colors"
              >
                <p className="font-heading font-semibold text-secondary mb-1">{c.label}</p>
                <p className="text-sm text-primary-foreground/70">{c.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

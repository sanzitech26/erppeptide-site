import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getFeaturedProducts } from '@/lib/products'
import { Truck, ShieldCheck, BadgeCheck } from 'lucide-react'

const heroInfoCards = [
  {
    tag: 'Transport',
    title: 'Reliable Global Shipping',
    body: 'Air shipment with tracking issued within 24 hours on business days and typical delivery in 8-15 days.',
  },
  {
    tag: 'Customs',
    title: 'Customs clearance',
    body: 'Double customs clearance where supported.',
  },
  {
    tag: 'Quality',
    title: 'Quality Promise',
    body: 'Batch traceability, factory QC, and refund handling for verified quality issues instead of pushing risk downstream.',
  },
]

const distributorGrid = [
  {
    number: '01',
    title: 'Direct Factory Supply',
    body: 'Products move directly from factory production to shipment, with no extra reseller layer added in between.',
    footer: 'Result: cleaner sourcing path and more predictable batch consistency.',
  },
  {
    number: '02',
    title: 'Kit-Based Packaging',
    body: 'Supply is organized in standard Kits of 10 vials, matching upstream distribution logic rather than retail-style single-vial handling.',
    bullets: ['Stronger batch consistency', 'Cleaner stock planning', 'Lower handling cost'],
  },
  {
    number: '03',
    title: 'Margin-Friendly Pricing',
    body: 'Pricing reflects production, packaging, logistics, and risk handling, not inflated brand premiums or stacked reseller markup.',
    footer: 'Result: more room for local pricing strategy and repeat business.',
  },
  {
    number: '04',
    title: 'Built For Repeat Supply',
    body: 'Best suited for local stockists, repeat buyers, and distributors who need predictable replenishment with less operational friction.',
    footer: 'Best fit: local resale, recurring restocks, and long-term supply coordination.',
  },
]

const assuranceCards = [
  {
    icon: Truck,
    tag: 'Dispatch Flow',
    title: 'Logistics & Shipping',
    intro: 'Fast outbound handling built for repeat supply instead of one-off retail orders.',
    bullets: [
      'Air shipment with 8-15 day worldwide delivery',
      'Tracking number issued within 24 hours on business days',
      'Duty-included clearance where supported',
    ],
    outcome: 'Outcome: easier expectation-setting for your own downstream buyers.',
  },
  {
    icon: ShieldCheck,
    tag: 'Risk Handling',
    title: 'Customs & After-Sales',
    intro: 'Operational risk stays with us instead of being pushed onto distributors.',
    bullets: [
      'Refund handling for verified invalid test results',
      'Clear after-sales path instead of case-by-case ambiguity',
    ],
    outcome: 'Outcome: less exposure when handling cross-border repeat orders.',
  },
  {
    icon: BadgeCheck,
    tag: 'Coordination',
    title: 'Communication & Support',
    intro: 'Repeat purchasing only works when communication stays predictable.',
    bullets: [
      'Dedicated support for payment, dispatch, and order updates',
      'Clear communication during business hours',
      'Better continuity for repeat supply planning',
    ],
    outcome: 'Outcome: fewer blind spots between payment, dispatch, and delivery.',
  },
]

// ponytail: only the first FAQ answer is verbatim from the design mockup —
// the rest are drafted from facts already verified elsewhere on this site
// (shipping/return policy, supply page). Payment methods, tracking, and
// storage answers are reasonable placeholders pending real copy from the client.
const faqs = [
  {
    value: 'authentic',
    q: 'Are your peptides real and authentic?',
    a: 'Yes — we are a factory-direct supplier with stable production and large inventory. All products are manufactured under strict quality standards, and COAs (Certificates of Analysis) are available for verification.',
  },
  {
    value: 'order-problem',
    q: 'What if there is a problem with my order?',
    a: 'Inspect your order on arrival. If an item is defective, damaged, or incorrect, contact our support team and we’ll handle a refund or replacement directly — no need to push the issue to your own customers.',
  },
  {
    value: 'pricing',
    q: 'Why are your prices lower than other companies?',
    a: 'We sell factory-direct with no reseller layers, no brand premiums, and no stacked margins. Pricing reflects production, packaging, and logistics — not retail markup.',
  },
  {
    value: 'bulk',
    q: 'Do you offer bulk discounts?',
    a: 'Yes. Kit-based wholesale pricing is available for distributors and repeat buyers, with priority access for long-term partners. Contact support for a bulk quote.',
  },
  {
    value: 'payment',
    q: 'What payment methods do you accept?',
    a: 'We accept major cryptocurrencies and bank transfer for wholesale orders. Contact our support team for the current payment options available in your region.',
  },
  {
    value: 'shipping-time',
    q: 'How long does shipping take?',
    a: 'China warehouse: 8-15 business days worldwide. USA warehouses: 3-5 business days within the US. Canada warehouse: 3-6 business days within Canada.',
  },
  {
    value: 'customs',
    q: 'Do I need to pay customs or taxes?',
    a: 'No. All China warehouse shipments are DDP (Delivered Duty Paid) — duties and taxes are prepaid, so there are no additional import fees on delivery.',
  },
  {
    value: 'ship-country',
    q: 'Do you ship to my country?',
    a: 'The China warehouse ships worldwide. Our USA and Canada warehouses ship domestically only, within the US and Canada respectively.',
  },
  {
    value: 'ship-when',
    q: 'When will my order be shipped?',
    a: 'Orders are processed Monday-Friday, and a tracking number is emailed as soon as your order ships.',
  },
  {
    value: 'tracking',
    q: 'Why is my tracking not updating?',
    a: 'Tracking can take 24-48 hours to register after a label is created, and may pause briefly during customs clearance. If it hasn’t updated after 5 business days, contact support and we’ll look into it.',
  },
  {
    value: 'storage',
    q: 'How should peptides be stored?',
    a: 'Lyophilized (freeze-dried) peptides should be stored frozen and protected from light until reconstitution. Once reconstituted, store refrigerated and use within the timeframe recommended for that specific peptide. Refer to each product page for compound-specific guidance.',
  },
]

export default function Home() {
  const featured = getFeaturedProducts(4)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <Image
          src="/hero/cleanroom-vials.jpg"
          alt=""
          fill
          priority
          className="object-cover mix-blend-luminosity opacity-90"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 grid gap-12 lg:grid-cols-[1.3fr_1fr] items-center">
          <div>
            <p className="text-secondary text-sm font-semibold tracking-widest uppercase mb-4">
              Factory Source For Distributors
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Factory-Direct Research Peptides Supply
            </h1>
            <p className="text-primary-foreground/85 text-lg mb-4 max-w-xl">
              Built for local distributors who need stable upstream supply,
              clean lab-based packaging, and factory-level pricing without
              reseller layers.
            </p>
            <p className="text-primary-foreground/70 mb-8 max-w-xl">
              We ship directly from factory production in standard kits,
              making repeat purchasing, local fulfillment, and margin
              control much easier for distributor operations.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-[#040c1c] text-white border border-white/10 hover:bg-[#040c1c]/90"
                render={<Link href="/products">Browse All Products</Link>}
              />
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                render={<Link href="/supply">Understand the Supply Model</Link>}
              />
            </div>
          </div>

          <div className="space-y-4">
            {heroInfoCards.map((c) => (
              <div
                key={c.tag}
                className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-5"
              >
                <p className="text-secondary text-xs font-semibold uppercase tracking-wide mb-1">
                  {c.tag}
                </p>
                <p className="font-heading font-semibold mb-1">{c.title}</p>
                <p className="text-sm text-primary-foreground/70">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplying Local Distributors Worldwide */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-2">
            Supplying Local Distributors Worldwide
          </h2>
          <p className="text-muted-foreground">
            Factory supply structured for repeat purchasing, cleaner local
            resale, and more predictable margin control.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {distributorGrid.map((d) => (
            <div
              key={d.number}
              className="relative overflow-hidden rounded-xl border border-border bg-card p-6 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-primary before:to-secondary"
            >
              <div className="size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mb-4">
                {Number(d.number)}
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{d.body}</p>
              {d.bullets && (
                <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
                  {d.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-secondary mt-1">●</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {d.footer && (
                <p className="text-sm font-medium text-primary border-t border-border pt-3">
                  {d.footer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Supply Assurance System */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            Supply Assurance System
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {assuranceCards.map((c) => (
              <div key={c.title} className="rounded-xl bg-card border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                    <c.icon className="size-5 text-primary" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground/70 bg-secondary rounded-full px-2.5 py-1">
                    {c.tag}
                  </span>
                </div>
                <h3 className="font-heading font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{c.intro}</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground mb-3">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-secondary mt-1">●</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-medium text-primary border-t border-border pt-3">{c.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory hot products */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl font-bold mb-2">Factory hot products</h2>
          <p className="text-muted-foreground">
            Swipe through current top-position products, then jump into the
            full catalog to compare all available options.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-secondary/30 border border-secondary/50 p-5 mb-8">
          <div>
            <p className="font-heading font-semibold">Need a faster way to evaluate products?</p>
            <p className="text-sm text-muted-foreground">
              Open the full catalog to filter, compare, and move straight
              into the product detail pages.
            </p>
          </div>
          <Button render={<Link href="/products">Enter Full Catalog</Link>} />
        </div>

        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 mb-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" render={<Link href="/products">Browse All Products</Link>} />
        </div>
      </section>

      {/* Long-form SEO copy */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Factory-Direct Research Peptide Supply
        </p>
        <h2 className="font-heading text-3xl font-bold mb-8">
          Factory-Direct Research Peptides for Distributors and Repeat Buyers
        </h2>
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            ERP Peptides supplies <strong className="text-foreground">factory-direct research peptides</strong> to
            local distributors, stockists and laboratories that need a
            dependable upstream source rather than another layer of resale.
            Product moves from our own production line straight to dispatch,
            which keeps batch consistency tighter, sourcing simpler and
            pricing closer to what it actually costs to manufacture and
            ship.
          </p>
          <p>
            Everything is supplied in standard{' '}
            <strong className="text-foreground">kits of 10 vials</strong>. That is
            deliberate: kit-based packaging matches how distributors
            actually plan stock, and it removes the handling overhead of
            retail-style single-vial picking. Repeat replenishment becomes
            predictable, and so does your own restock list.
          </p>
          <p>
            The catalogue is organised the way buyers actually shop it —{' '}
            <strong className="text-foreground">
              Fat Loss &amp; Metabolic, Hormone &amp; Support, Beauty &amp;
              Repair, Muscle &amp; Recovery, Brain &amp; Mood, Anti-aging
            </strong>{' '}
            and solvents — so a distributor comparing specifications across
            a restock list can move between kit sizes and price points
            without hunting.
          </p>
          <p>
            Orders ship from four public hubs. The{' '}
            <strong className="text-foreground">China warehouse</strong> carries the
            catalogue and ships worldwide in roughly 8-15 days by air, with
            duty-included clearance where it&apos;s supported, so there is
            nothing extra to settle on arrival. Our{' '}
            <strong className="text-foreground">US warehouses</strong> hold local
            stock for 3-5 day domestic delivery, with overnight service
            available, and the <strong className="text-foreground">Canada
            warehouse</strong> covers Canadian buyers on the same short
            timeline.
          </p>
          <p>
            Every product is manufactured under controlled quality
            standards, and{' '}
            <Link href="/testing" className="font-semibold text-foreground underline underline-offset-2">
              Certificates of Analysis
            </Link>{' '}
            are published so third-party test results can
            be checked before you commit to a repeat order. Where a
            verified test result fails, we handle the refund rather than
            pushing that risk down to you.
          </p>
          <p>
            Shipping is free on orders over $598, bulk pricing is available
            on request, and support stays reachable through payment,
            dispatch and delivery.
          </p>
          <p className="italic text-sm border-t border-border pt-5">
            All products are supplied strictly for laboratory research use
            only. They are not for human consumption, and no medical,
            therapeutic or efficacy claims are made.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold mb-2">Questions &amp; Answers</h2>
            <p className="text-muted-foreground">
              Answers to the issues distributors ask about before starting
              repeat supply.
            </p>
          </div>
          <Accordion defaultValue={['authentic']}>
            {faqs.map((f) => (
              <AccordionItem key={f.value} value={f.value}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Research use only banner */}
      <section className="bg-primary text-primary-foreground py-10 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-heading text-xl font-bold mb-2">Research Use Only</h2>
          <p className="text-sm text-primary-foreground/70">
            All products sold on this website are for research purposes
            only. Not for human consumption. No medical, therapeutic or
            efficacy claims are made.
          </p>
        </div>
      </section>
    </div>
  )
}

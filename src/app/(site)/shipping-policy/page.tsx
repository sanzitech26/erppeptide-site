export const metadata = { title: 'Shipping Policy | Jaycey Peptides' }

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 prose-neutral">
      <h1 className="font-heading text-4xl font-bold mb-8">Shipping Policy</h1>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Shipping Options &amp; Warehouse Locations
          </h2>
          <p className="mb-4">
            We ship from two warehouses to provide faster delivery based on
            your location:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-5">
              <p className="font-semibold text-foreground mb-2">China Warehouse — $50</p>
              <ul className="space-y-1 text-sm">
                <li>• Ships worldwide</li>
                <li>• Estimated delivery: 8–15 business days</li>
                <li>• Includes DDP service (duties &amp; taxes prepaid) and door-to-door delivery</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border p-5">
              <p className="font-semibold text-foreground mb-2">USA Warehouse — $20</p>
              <ul className="space-y-1 text-sm">
                <li>• Ships within the United States only</li>
                <li>• Estimated delivery: 3–5 business days</li>
                <li>• Ships via local U.S. carriers (no PO boxes)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Free Shipping</h2>
          <p>
            Orders over $598 qualify for free shipping from either warehouse
            (based on inventory availability).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Duties, Taxes &amp; Customs
          </h2>
          <p>
            All shipments are DDP (Delivered Duty Paid): duties included,
            taxes included, door-to-door delivery included. No additional
            import fees will be charged to the customer.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Order Processing &amp; Delivery
          </h2>
          <p>
            Orders are processed Monday–Friday. Tracking numbers will be
            emailed once your order ships — please check your spam/junk
            folder if you cannot find the email. Delivery times are estimates
            and may vary due to customs clearance or local logistics delays.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Shipping Limitations
          </h2>
          <p>
            The USA warehouse ships to the United States only. The China
            warehouse ships to all international regions. We cannot ship to
            PO boxes (U.S. carriers do not support this).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Lost or Stolen Packages
          </h2>
          <p>
            Please ensure someone is available to receive your package. Once
            a package is marked as &ldquo;Delivered&rdquo; by the carrier, we
            are not responsible for lost or stolen packages.
          </p>
        </section>
      </div>
    </div>
  )
}

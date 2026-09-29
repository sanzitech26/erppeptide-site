export const metadata = { title: 'Return Policy | ERP Peptide' }

export default function ReturnPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-8">Return Policy</h1>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <p>
          We offer a 30-day return window. You may request a return within 30
          days of receiving your order.
        </p>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Initiate a Return
          </h2>
          <p className="mb-3">
            To initiate a return or refund request, log in to your account
            using the same email address used at checkout, navigate to the
            My Account page, select the Orders tab, and click Return Request
            next to the relevant order. Complete the return request form and
            our team will respond within 1–2 business days.
          </p>
          <p>
            If your return is approved, we will provide detailed instructions
            on how and where to send your package. All items must be shipped
            back to our warehouse — returns sent without prior authorization
            will not be accepted.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Damaged Product &amp; Product Issues
          </h2>
          <p>
            Please inspect your order upon receipt. If an item is defective,
            damaged, or you receive the wrong item, please submit an Exchange
            Request Form.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Exchanges</h2>
          <p>We will issue you a refund and you can purchase your items again.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Refunds</h2>
          <p>
            We will notify you once we&apos;ve received and inspected your
            return, and let you know if the refund has been approved. If
            approved, you&apos;ll be automatically refunded on your original
            payment method within 3 business days. It can take additional
            time for your bank or card company to process and post the
            refund.
          </p>
        </section>
      </div>
    </div>
  )
}

export const metadata = { title: 'Privacy Policy | ERP Peptide' }

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-8 text-muted-foreground leading-relaxed text-sm">
        <p>
          This Privacy Policy describes how ERP Peptide (&ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and
          discloses your personal information when you visit, use our
          services, or make a purchase from this site, or otherwise
          communicate with us.
        </p>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            Information We Collect
          </h2>
          <p className="mb-2">Directly from you:</p>
          <ul className="space-y-1 list-disc pl-5">
            <li>Contact details — name, address, phone number, email</li>
            <li>Order information — billing/shipping address, payment confirmation</li>
            <li>Shopping information — items viewed, added to cart</li>
            <li>Customer support information you share with us</li>
          </ul>
          <p className="mt-2">
            We also automatically collect Usage Data (device, browser,
            network, and IP information) via cookies and similar
            technologies, and may receive information from vendors and
            payment processors who support our Site and Services.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            How We Use Your Information
          </h2>
          <p>
            To provide the Services (process payments, fulfill orders, manage
            your account, handle returns and exchanges); for marketing and
            promotional communications; for security and fraud prevention;
            and to provide customer support.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Cookies</h2>
          <p>
            We use cookies to power and improve the Site, remember your
            preferences, and understand user interaction. Most browsers
            accept cookies by default — you can adjust your browser settings
            to remove or reject them, though this may affect functionality.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            How We Disclose Information
          </h2>
          <p>
            We may share information with vendors who perform services on
            our behalf (payment processing, shipping, fulfillment, data
            analytics), with your consent, or as required to comply with
            legal obligations.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            Your Rights
          </h2>
          <p>
            Depending on where you live, you may have the right to access,
            delete, correct, or request a copy of your personal information,
            and to restrict or object to certain processing. Contact us
            using the details below to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
            Children&apos;s Data
          </h2>
          <p>
            The Services are not intended for children, and we do not
            knowingly collect personal information about children.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Contact</h2>
          <p>
            Should you have any questions about our privacy practices or this
            Privacy Policy, please reach out through our Contact page.
          </p>
        </section>
      </div>
    </div>
  )
}

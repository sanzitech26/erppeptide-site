import { CheckCircle2 } from 'lucide-react'

export const metadata = { title: 'Testing | Jaycey Peptides' }

const steps = [
  {
    title: 'Verify Test Results',
    body: 'Validate purity data with trusted independent lab partners.',
  },
  {
    title: 'Learn About Our Process',
    body: 'Each batch is tracked, documented, and verified before release.',
  },
  {
    title: 'Where to Find COAs',
    body: 'Certificates are available on this page and within each product listing.',
  },
]

export default function TestingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-4">
        Product Testing &amp; Certificates
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-12">
        We take purity testing seriously. All peptides undergo rigorous
        third-party testing to ensure transparency and reliability for
        research use.
      </p>

      <div className="grid gap-6 sm:grid-cols-3 mb-16">
        {steps.map((s) => (
          <div key={s.title} className="rounded-xl border border-border p-6">
            <CheckCircle2 className="size-6 text-primary mb-3" />
            <h3 className="font-heading font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-muted/40 border border-border p-8 text-center">
        <h2 className="font-heading text-xl font-semibold mb-2">
          Certificates of Analysis
        </h2>
        <p className="text-muted-foreground text-sm">
          COAs for individual batches (KLOW, Retatrutide, MOTS-C, GHK-CU, BPC157,
          Tirzepatide, and more) are issued per production run. Contact our
          support team for the current certificate on any product you&apos;re
          ordering.
        </p>
      </div>
    </div>
  )
}

export const metadata = { title: 'About Us | ERP Peptide' }

const stats = [
  { value: '2020', label: 'Founding year' },
  { value: '2,352', label: 'Happy customers' },
  { value: '190+', label: 'Companies we work with' },
  { value: '752', label: 'Projects completed' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <p className="text-secondary-foreground/70 text-sm font-semibold uppercase tracking-widest mb-3">
        About our online store
      </p>
      <h1 className="font-heading text-4xl font-bold mb-6">
        Shanghai ERP Peptide Biotechnology Co., Ltd.
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-4">
        A modern pharmaceutical enterprise with sterile freeze-dried powder
        injections as its leading products. Since our establishment in 2020,
        adhering to the sustainable development strategy of &ldquo;people-oriented
        and quality first,&rdquo; we have gradually evolved from small-scale and
        simple freeze-drying production to complex and large-scale aseptic
        production models — providing customers with comprehensive aseptic
        production solutions.
      </p>
      <p className="text-lg font-semibold text-primary mb-12">
        An efficient, responsible, and trustworthy supplier.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
        {stats.map((s) => (
          <div key={s.label} className="text-center rounded-xl border border-border bg-card py-8">
            <p className="font-heading text-3xl font-bold text-primary mb-1">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-muted/40 border border-border p-8 text-sm text-muted-foreground leading-relaxed">
        ERP Peptides™ products are for research purposes only. Not for human
        consumption or clinical use. The buyer is responsible for adhering to
        all local laws and regulations. ERP Peptides™ is not a pharmacy and
        does not provide medical advice, prescriptions, or consultations.
      </div>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { whatsappLink } from '@/lib/whatsapp'

const quickLinks = [
  { href: '/testing', label: 'Testing' },
  { href: '/products', label: 'US Warehouse Inventory' },
]

const supportLinks = [
  { href: '/contact', label: 'Account' },
  { href: '/shipping-policy', label: 'Shipping Policy' },
  { href: '/return-policy', label: 'Return Policy' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
]

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/brand/logo.png"
            alt="ERP Peptide"
            width={160}
            height={40}
            className="h-8 w-auto brightness-0 invert mb-4"
          />
          <p className="text-sm text-primary-foreground/70">
            ERP Peptides™ products are for research purposes only. Not for
            human consumption or clinical use. The buyer is responsible for
            adhering to all local laws and regulations. ERP Peptides™ is not
            a pharmacy and does not provide medical advice, prescriptions, or
            consultations.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-secondary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {supportLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-secondary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>emmy@erppeptides.shop</li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                WhatsApp: +1 (402) 320-6956
              </a>
            </li>
            <li>Shanghai ERP Peptide Biotechnology Co., Ltd.</li>
          </ul>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-primary-foreground/60">
        <p>
          &copy; {new Date().getFullYear()} ERP Peptides™. All Rights
          Reserved. | <Link href="/testing" className="hover:text-secondary">Testing</Link>
        </p>
      </div>
    </footer>
  )
}

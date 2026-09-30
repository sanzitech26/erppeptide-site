import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { whatsappLink } from '@/lib/whatsapp'

const quickLinks = [
  { href: '/testing', label: 'Testing' },
  { href: '/products', label: 'US Warehouse Inventory' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
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
            src="/brand/ikjnb.png"
            alt="Jaycey Peptides"
            width={306}
            height={68}
            className="h-8 w-auto mb-4 brightness-0 invert"
          />
          <p className="text-sm text-primary-foreground/70">
            Jaycey Peptides™ products are for research purposes only. Not for
            human consumption or clinical use. The buyer is responsible for
            adhering to all local laws and regulations. Jaycey Peptides™ is not
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
            {process.env.ORDER_NOTIFICATION_EMAIL && (
              <li>{process.env.ORDER_NOTIFICATION_EMAIL}</li>
            )}
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
            <li>Shanghai Jaycey Peptide Biotechnology Co., Ltd.</li>
          </ul>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-primary-foreground/60">
        <p>
          &copy; {new Date().getFullYear()} Jaycey Peptides™. All Rights
          Reserved. | <Link href="/testing" className="hover:text-secondary">Testing</Link>
        </p>
      </div>
    </footer>
  )
}

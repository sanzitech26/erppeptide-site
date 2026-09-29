import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

const quickLinks = [
  { href: '/testing', label: 'Testing' },
  { href: '/supply', label: 'Supply' },
  { href: '/shipping-policy', label: 'Shipping Policy' },
  { href: '/return-policy', label: 'Return Policy' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
]

const communityLinks = [
  { href: 'https://t.me/+aUEr7VkHjLswZTY8', label: 'Telegram' },
  { href: 'https://chat.whatsapp.com/LlpmCTE7zQfIylY1T4erlQ', label: 'WhatsApp' },
  { href: 'https://discord.gg/GfrDAnFuSs', label: 'Discord' },
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
            Shanghai ERP Peptide Biotechnology Co., Ltd. Factory-direct research
            peptides, shipped from China, USA, and Canada warehouses.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-secondary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary mb-4">
            Community
          </h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {communityLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link href="/contact" className="hover:text-secondary transition-colors">
                Contact form
              </Link>
            </li>
            <li>+44 7519 188836</li>
          </ul>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-primary-foreground/60 space-y-2">
        <p>
          ERP Peptides™ products are for research purposes only. Not for human
          consumption or clinical use. The buyer is responsible for adhering to
          all local laws and regulations. ERP Peptides™ is not a pharmacy and
          does not provide medical advice, prescriptions, or consultations.
        </p>
        <p>&copy; {new Date().getFullYear()} ERP Peptides™. All rights reserved.</p>
      </div>
    </footer>
  )
}

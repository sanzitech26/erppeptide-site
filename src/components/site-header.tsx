'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, ShoppingCart, Search, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { whatsappLink } from '@/lib/whatsapp'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About Us' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-secondary text-center text-xs sm:text-sm py-1.5 px-4">
        🇺🇸 Overview of all inventory in the US warehouse. The promotion ends
        on August 21st.{' '}
        <Link href="/products" className="underline font-medium">
          Click to view.
        </Link>
      </div>

      <div className="bg-background/95 backdrop-blur-sm px-4 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 rounded-full bg-white border border-border shadow-lg px-5 py-2.5">
          <Link href="/" className="shrink-0">
            <Image src="/brand/logo.png" alt="Jaycey Peptides" width={140} height={35} className="h-8 w-auto" priority />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex rounded-full"
              render={
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" /> Online Support
                </a>
              }
            />
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Search">
              <Search className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              render={
                <Link href="/cart" aria-label="Cart">
                  <span className="relative">
                    <ShoppingCart className="size-5" />
                    {count > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full size-4 flex items-center justify-center">
                        {count}
                      </span>
                    )}
                  </span>
                </Link>
              }
            />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden mx-auto max-w-7xl mt-2 rounded-2xl bg-white border border-border shadow-lg px-5 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm font-medium" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

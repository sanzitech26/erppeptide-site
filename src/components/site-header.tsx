'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'

const navLinks = [
  { href: '/products', label: 'Promotion' },
  { href: '/warehouses/china', label: 'China Hub' },
  { href: '/warehouses/portland', label: 'USA Hub — Portland' },
  { href: '/warehouses/delaware', label: 'USA Hub — Delaware' },
  { href: '/warehouses/canada', label: 'Canada Hub' },
  { href: '/products', label: 'All Products' },
  { href: '/supply', label: 'Supply' },
  { href: '/testing', label: 'Testing' },
  { href: '/about', label: 'About Us' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
      <div className="bg-secondary text-secondary-foreground text-center text-xs sm:text-sm py-1.5 px-4">
        Overview of all inventory in the US warehouse. The promotion ends on
        August 25th.{' '}
        <Link href="/products" className="underline font-medium">
          Click to view.
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-20">
        <Link href="/" className="shrink-0">
          <Image
            src="/brand/logo.png"
            alt="ERP Peptide"
            width={160}
            height={40}
            className="h-9 w-auto brightness-0 invert"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex hover:bg-white/10 hover:text-secondary"
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex hover:bg-white/10 hover:text-secondary"
            render={
              <Link href="/contact" aria-label="Account">
                <User className="size-5" />
              </Link>
            }
          />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 hover:text-secondary"
            render={
              <Link href="/cart" aria-label="Cart">
                <span className="relative">
                  <ShoppingCart className="size-5" />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full size-4 flex items-center justify-center">
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
            className="lg:hidden hover:bg-white/10 hover:text-secondary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

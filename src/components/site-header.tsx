'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
  MessageCircle,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCart } from '@/lib/cart-context'

const navLinks = [
  { href: '/products', label: 'Promotion', flag: '🔥' },
  { href: '/warehouses/china', label: 'China Hub', flag: '🇨🇳' },
  { href: '/warehouses/canada', label: 'Canada Hub', flag: '🇨🇦' },
  { href: '/about', label: 'About Us', flag: null },
]

const usaHubLinks = [
  { href: '/warehouses/portland', label: 'Warehouse A (Portland)' },
  { href: '/warehouses/delaware', label: 'Warehouse B (Delaware)' },
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
            <Image src="/brand/logo.png" alt="ERP Peptide" width={140} height={35} className="h-8 w-auto" priority />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.flag && <span className="mr-1">{link.flag}</span>}
                {link.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors outline-none">
                🇺🇸 USA Hub <ChevronDown className="size-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {usaHubLinks.map((l) => (
                  <DropdownMenuItem key={l.href} render={<Link href={l.href}>{l.label}</Link>} />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.flag && <span className="mr-1">{link.flag}</span>}
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
                <Link href="/contact">
                  <MessageCircle className="size-4" /> Online Support
                </Link>
              }
            />
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Search">
              <Search className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              render={
                <Link href="/contact" aria-label="Account">
                  <User className="size-5" />
                </Link>
              }
            />
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
            {navLinks.slice(0, 2).map((link) => (
              <Link key={link.label} href={link.href} className="text-sm font-medium" onClick={() => setOpen(false)}>
                {link.flag && <span className="mr-1">{link.flag}</span>}
                {link.label}
              </Link>
            ))}
            {usaHubLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium pl-4" onClick={() => setOpen(false)}>
                🇺🇸 {l.label}
              </Link>
            ))}
            {navLinks.slice(2).map((link) => (
              <Link key={link.label} href={link.href} className="text-sm font-medium" onClick={() => setOpen(false)}>
                {link.flag && <span className="mr-1">{link.flag}</span>}
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inbox, Package, HelpCircle, MessageSquareQuote, Newspaper, Settings } from "lucide-react";
import { cn } from "cn";

const links = [
  { href: "/admin", label: "Contact Messages", icon: Inbox },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminNav({ variant = "sidebar" }: { variant?: "sidebar" | "mobile" }) {
  const pathname = usePathname();

  if (variant === "mobile") {
    return (
      <nav className="flex gap-2 overflow-x-auto px-4 pb-3">
        {links.map((l) => {
          const active = pathname === l.href;
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-white/15 text-white"
                  : "text-primary-foreground/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="size-3.5" />
              {l.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-1">
      {links.map((l) => {
        const active = pathname === l.href;
        const Icon = l.icon;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-white/10 text-white"
                : "text-primary-foreground/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon className="size-4" />
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

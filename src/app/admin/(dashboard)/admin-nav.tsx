"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inbox, PackagePlus } from "lucide-react";
import { cn } from "cn";

const links = [
  { href: "/admin", label: "Contact Messages", icon: Inbox },
  { href: "/admin/products/new", label: "Add Product", icon: PackagePlus },
];

export function AdminNav() {
  const pathname = usePathname();

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

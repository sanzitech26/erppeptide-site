import Link from "next/link";
import { logout } from "../actions";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="flex items-center justify-between border-b bg-background px-6 py-4">
        <div className="flex items-center gap-6">
          <span className="font-heading text-lg">ERP Peptides Admin</span>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin" className="hover:underline">
              Contact Messages
            </Link>
            <Link href="/admin/products/new" className="hover:underline">
              Add Product
            </Link>
          </nav>
        </div>
        <form action={logout}>
          <Button variant="outline" size="sm" type="submit">
            Log out
          </Button>
        </form>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}

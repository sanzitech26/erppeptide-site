import { LogOut } from "lucide-react";
import { logout } from "../actions";
import { Button } from "@/components/ui/button";
import { AdminNav } from "./admin-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30 md:flex-row">
      {/* Mobile top bar (hidden md and up) */}
      <div className="bg-primary text-primary-foreground md:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <p className="font-heading text-lg leading-none">Jaycey Peptides</p>
            <p className="text-[10px] font-medium tracking-wide text-primary-foreground/60 uppercase">
              Admin
            </p>
          </div>
          <form action={logout}>
            <Button
              variant="ghost"
              size="icon-sm"
              type="submit"
              aria-label="Log out"
              className="text-primary-foreground/70 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="size-4" />
            </Button>
          </form>
        </div>
        <AdminNav variant="mobile" />
      </div>

      {/* Desktop sidebar (hidden below md) */}
      <aside className="hidden w-64 shrink-0 flex-col bg-primary px-4 py-6 text-primary-foreground md:flex">
        <div className="mb-8 px-2">
          <p className="font-heading text-lg">Jaycey Peptides</p>
          <p className="text-xs font-medium tracking-wide text-primary-foreground/60 uppercase">
            Admin
          </p>
        </div>

        <AdminNav />

        <form action={logout} className="mt-auto pt-6">
          <Button
            variant="ghost"
            size="sm"
            type="submit"
            className="w-full justify-start gap-2.5 text-primary-foreground/70 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </form>
      </aside>

      <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}

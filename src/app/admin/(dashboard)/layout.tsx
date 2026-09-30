import { LogOut } from "lucide-react";
import { logout } from "../actions";
import { Button } from "@/components/ui/button";
import { AdminNav } from "./admin-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="flex w-64 shrink-0 flex-col bg-primary px-4 py-6 text-primary-foreground">
        <div className="mb-8 px-2">
          <p className="font-heading text-lg">ERP Peptides</p>
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

      <main className="flex-1 px-8 py-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}

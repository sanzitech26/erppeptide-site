import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LiveSupportButton } from "@/components/live-support-button";
import { CartProvider } from "@/lib/cart-context";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <LiveSupportButton />
    </CartProvider>
  );
}

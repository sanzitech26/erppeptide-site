import Script from "next/script";
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
      <Script src="//code.jivosite.com/widget/7SN4ESVAFB" strategy="afterInteractive" />
    </CartProvider>
  );
}

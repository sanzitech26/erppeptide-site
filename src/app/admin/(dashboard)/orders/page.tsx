import { ShoppingBag, TriangleAlert, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getOrders } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function OrdersAdminPage() {
  let orders: Awaited<ReturnType<typeof getOrders>> = [];
  let loadError = false;

  try {
    orders = await getOrders();
  } catch {
    loadError = true;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading">Orders</h1>
          <p className="text-sm text-muted-foreground">
            Submitted from the storefront checkout. Each order is also emailed to info@.
          </p>
        </div>
        {!loadError && (
          <Badge variant="secondary">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </Badge>
        )}
      </div>

      {loadError ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <TriangleAlert className="size-8 text-destructive/60" />
            <p className="text-sm text-destructive">
              Could not load orders — run{" "}
              <code className="rounded bg-muted px-1 py-0.5">supabase/migrations/0012_orders.sql</code>{" "}
              in the Supabase SQL editor if you haven&apos;t yet.
            </p>
          </CardContent>
        </Card>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <ShoppingBag className="size-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No orders yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <Card key={o.id}>
              <CardContent className="space-y-4 px-6 py-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">
                      #{o.id} · {o.name}
                    </p>
                    <a href={`mailto:${o.email}`} className="text-sm text-muted-foreground hover:underline">
                      {o.email}
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${o.subtotal.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
                  </div>
                </div>

                <ul className="divide-y divide-border text-sm">
                  {o.items.map((i, idx) => (
                    <li key={idx} className="flex justify-between gap-4 py-1.5">
                      <span>
                        {i.name} <span className="text-muted-foreground">({i.variantLabel})</span> × {i.quantity}
                      </span>
                      <span>${(i.price * i.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Ship to</p>
                    <p>{o.street}</p>
                    <p>{[o.city, o.state, o.zip].filter(Boolean).join(", ")}</p>
                    <p>{o.country}</p>
                  </div>
                  {o.notes && (
                    <div>
                      <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Notes</p>
                      <p className="whitespace-pre-wrap">{o.notes}</p>
                    </div>
                  )}
                </div>

                {o.proofUrl ? (
                  <a
                    href={o.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    View payment proof <ExternalLink className="size-3.5" />
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">Payment proof is in the order email only.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { PackagePlus, PackageSearch, Pencil, TriangleAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/products";
import { DeleteProductButton } from "./delete-button";

// getAllProducts() uses the cookie-free public Supabase client, so nothing
// here trips Next's automatic dynamic-rendering detection — force it, same
// reasoning as products/new (see that page for the full explanation).
export const dynamic = "force-dynamic";

function priceRange(variants: { price: number }[]) {
  if (variants.length <= 1) return `$${variants[0]?.price.toFixed(2) ?? "0.00"}`;
  const prices = variants.map((v) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max
    ? `$${min.toFixed(2)}`
    : `$${min.toFixed(2)}–$${max.toFixed(2)} (${variants.length} options)`;
}

export default async function ProductsPage() {
  let products: Awaited<ReturnType<typeof getAllProducts>> = [];
  let loadError = false;

  try {
    products = await getAllProducts();
  } catch {
    loadError = true;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading">Products</h1>
          <p className="text-sm text-muted-foreground">Everything currently live on the storefront.</p>
        </div>
        <Button
          size="sm"
          render={
            <Link href="/admin/products/new">
              <PackagePlus className="size-4" />
              Add Product
            </Link>
          }
        />
      </div>

      <Card className="py-0">
        {loadError ? (
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <TriangleAlert className="size-8 text-destructive/60" />
            <p className="text-sm text-destructive">
              Could not load products — run{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                supabase/migrations/0002_products.sql
              </code>{" "}
              in the Supabase SQL editor if you haven&apos;t yet.
            </p>
          </CardContent>
        ) : products.length === 0 ? (
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <PackageSearch className="size-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No products yet.</p>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium">Price</th>
                  <th className="px-6 py-3 font-medium">Stock</th>
                  <th className="px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b align-middle last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted/30">
                          {p.image && (
                            <Image src={p.image} alt="" fill className="object-cover" sizes="40px" />
                          )}
                        </div>
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {priceRange(p.variants)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={p.inStock ? "secondary" : "outline"}>
                        {p.inStock ? "In stock" : "Out of stock"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Edit"
                          render={<Link href={`/admin/products/${p.id}/edit`} />}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <DeleteProductButton id={p.id} name={p.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

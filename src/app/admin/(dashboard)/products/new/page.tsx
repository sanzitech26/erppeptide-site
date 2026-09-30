import { TriangleAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getAllCategories } from "@/lib/products";
import { ProductForm } from "./product-form";

// getAllCategories() uses the cookie-free public Supabase client (safe for
// generateStaticParams elsewhere), so nothing here trips Next's automatic
// dynamic-rendering detection — force it, or this page freezes at build
// time and won't reflect categories/migration state added afterward.
export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  let categories: Awaited<ReturnType<typeof getAllCategories>> = [];
  let loadError = false;

  try {
    categories = await getAllCategories();
  } catch {
    loadError = true;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading">Add Product</h1>
        <p className="text-sm text-muted-foreground">
          Published immediately — visible on the storefront as soon as you save.
        </p>
      </div>

      <Card>
        {loadError ? (
          <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
            <TriangleAlert className="size-8 text-destructive/60" />
            <p className="text-sm text-destructive">
              Could not load categories — run{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                supabase/migrations/0002_products.sql
              </code>{" "}
              in the Supabase SQL editor if you haven&apos;t yet.
            </p>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Product details</CardTitle>
              <CardDescription>Fields marked required must be filled in.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductForm categories={categories} />
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

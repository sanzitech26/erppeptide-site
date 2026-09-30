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
      <h1 className="mb-6 text-2xl font-heading">Add Product</h1>

      {loadError ? (
        <p className="text-sm text-destructive">
          Could not load categories — run{" "}
          <code className="rounded bg-muted px-1 py-0.5">supabase/migrations/0002_products.sql</code>{" "}
          in the Supabase SQL editor if you haven&apos;t yet.
        </p>
      ) : (
        <ProductForm categories={categories} />
      )}
    </div>
  );
}

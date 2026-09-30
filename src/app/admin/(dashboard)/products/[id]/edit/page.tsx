import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getAllCategories, getProductById } from "@/lib/products";
import { ProductForm } from "../../product-form";
import { updateProduct } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);
  if (Number.isNaN(productId)) notFound();

  const [product, categories] = await Promise.all([
    getProductById(productId),
    getAllCategories(),
  ]);
  if (!product) notFound();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading">Edit Product</h1>
        <p className="text-sm text-muted-foreground">Changes go live on the storefront immediately.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product details</CardTitle>
          <CardDescription>Fields marked required must be filled in.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm
            categories={categories}
            action={updateProduct.bind(null, productId)}
            submitLabel="Save Changes"
            pendingLabel="Saving…"
            initial={{
              name: product.name,
              inStock: product.inStock,
              categoryIds: product.categoryIds,
              options: product.variants.map((v) => ({ label: v.label, price: v.price })),
              image: product.image,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

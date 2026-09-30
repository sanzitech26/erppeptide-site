"use client";

import { useActionState, useEffect, useRef } from "react";
import { createProduct } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/products";

export function ProductForm({ categories }: { categories: Category[] }) {
  const [state, action, pending] = useActionState(createProduct, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="max-w-xl space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={4} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="sku">SKU</Label>
          <Input id="sku" name="sku" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="price">Price (USD)</Label>
          <Input id="price" name="price" type="number" step="0.01" min="0" required />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input id="inStock" name="inStock" type="checkbox" defaultChecked className="size-4" />
        <Label htmlFor="inStock">In stock</Label>
      </div>

      <div className="space-y-1.5">
        <Label>Categories</Label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="categoryIds" value={c.id} className="size-4" />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="image">Product photo</Label>
        <input id="image" name="image" type="file" accept="image/*" className="block text-sm" />
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Product added.</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Add Product"}
      </Button>
    </form>
  );
}

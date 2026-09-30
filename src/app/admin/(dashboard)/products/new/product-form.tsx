"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { createProduct } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Category } from "@/lib/products";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </p>
  );
}

function emptyOption() {
  return { key: crypto.randomUUID() };
}

export function ProductForm({ categories }: { categories: Category[] }) {
  const [state, action, pending] = useActionState(createProduct, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [options, setOptions] = useState([emptyOption()]);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting the preview to match the just-cleared file input
      setImagePreview(null);
      setOptions([emptyOption()]);
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-8">
      <div className="space-y-4">
        <SectionLabel>Basic info</SectionLabel>
        <div className="space-y-1.5">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={4} />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <SectionLabel>Options</SectionLabel>
        <div className="space-y-2">
          {options.map((o) => (
            <div key={o.key} className="flex gap-2">
              <Input
                name="optionLabel"
                placeholder="e.g. 20mg × 10 Vials"
                required
                className="flex-1"
              />
              <Input
                name="optionPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="Price"
                required
                className="w-28"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setOptions((prev) => prev.filter((p) => p.key !== o.key))}
                disabled={options.length === 1}
                aria-label="Remove option"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setOptions((prev) => [...prev, emptyOption()])}
        >
          <Plus className="size-4" />
          Add another option
        </Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <SectionLabel>Stock</SectionLabel>
        <label className="flex w-fit items-center gap-2 text-sm">
          <input id="inStock" name="inStock" type="checkbox" defaultChecked className="size-4" />
          In stock
        </label>
      </div>

      <Separator />

      <div className="space-y-3">
        <SectionLabel>Categories</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((c) => (
            <label
              key={c.id}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <input type="checkbox" name="categoryIds" value={c.id} className="size-4" />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <SectionLabel>Photo</SectionLabel>
        <div className="flex items-center gap-4">
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted/30">
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element -- local blob preview, next/image can't optimize it
              <img src={imagePreview} alt="" className="size-full object-cover" />
            ) : (
              <ImagePlus className="size-6 text-muted-foreground/50" />
            )}
          </div>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="block text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setImagePreview(file ? URL.createObjectURL(file) : null);
            }}
          />
        </div>
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Product added.</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Add Product"}
      </Button>
    </form>
  );
}

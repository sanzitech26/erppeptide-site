"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Category } from "@/lib/products";
import type { ProductFormState } from "./actions";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </p>
  );
}

function emptyOption(label = "", price = "") {
  return { key: crypto.randomUUID(), label, price };
}

export type ProductFormInitial = {
  name: string;
  inStock: boolean;
  categoryIds: number[];
  options: { label: string; price: number }[];
  image: string | null;
};

export function ProductForm({
  categories,
  action,
  submitLabel,
  pendingLabel,
  initial,
}: {
  categories: Category[];
  action: (prevState: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  submitLabel: string;
  pendingLabel: string;
  initial?: ProductFormInitial;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initial?.image ?? null);
  const [options, setOptions] = useState(
    initial?.options.length
      ? initial.options.map((o) => emptyOption(o.label, String(o.price)))
      : [emptyOption()]
  );

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting the preview to match the just-cleared file input
      setImagePreview(null);
      setOptions([emptyOption()]);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-8">
      <div className="space-y-4">
        <SectionLabel>Basic info</SectionLabel>
        <div className="space-y-1.5">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" defaultValue={initial?.name} required />
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
                defaultValue={o.label}
                required
                className="flex-1"
              />
              <Input
                name="optionPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="Price"
                defaultValue={o.price}
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
          <input
            id="inStock"
            name="inStock"
            type="checkbox"
            defaultChecked={initial?.inStock ?? true}
            className="size-4"
          />
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
              <input
                type="checkbox"
                name="categoryIds"
                value={c.id}
                defaultChecked={initial?.categoryIds.includes(c.id)}
                className="size-4"
              />
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
              // eslint-disable-next-line @next/next/no-img-element -- local blob preview / existing image URL, next/image can't optimize either reliably here
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
              setImagePreview(file ? URL.createObjectURL(file) : (initial?.image ?? null));
            }}
          />
        </div>
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Product added.</p>}

      <Button type="submit" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}

"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { BlogFormState } from "./actions";

export type BlogFormInitial = {
  title: string;
  excerpt: string;
  content: string;
  metaDescription: string;
  published: boolean;
  coverImage: string | null;
};

export function BlogForm({
  action,
  submitLabel,
  pendingLabel,
  initial,
}: {
  action: (prevState: BlogFormState, formData: FormData) => Promise<BlogFormState>;
  submitLabel: string;
  pendingLabel: string;
  initial?: BlogFormInitial;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(initial?.coverImage ?? null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting the preview to match the just-cleared file input
      setCoverPreview(null);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="title">Title *</Label>
        <Input id="title" name="title" defaultValue={initial?.title} required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          defaultValue={initial?.excerpt}
          rows={2}
          placeholder="Short summary shown on the blog list page"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={initial?.content}
          required
          rows={16}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Markdown supported — ## headings, **bold**, *italic*, [links](url), lists.
        </p>
      </div>

      <Separator />

      <div className="space-y-1.5">
        <Label htmlFor="metaDescription">Meta description</Label>
        <Textarea
          id="metaDescription"
          name="metaDescription"
          defaultValue={initial?.metaDescription}
          rows={2}
          placeholder="Shown in search engine results — aim for under 160 characters"
        />
      </div>

      <div className="space-y-3">
        <Label>Cover image</Label>
        <div className="flex items-center gap-4">
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted/30">
            {coverPreview ? (
              // eslint-disable-next-line @next/next/no-img-element -- local blob preview / existing image URL
              <img src={coverPreview} alt="" className="size-full object-cover" />
            ) : (
              <ImagePlus className="size-6 text-muted-foreground/50" />
            )}
          </div>
          <input
            id="coverImage"
            name="coverImage"
            type="file"
            accept="image/*"
            className="block text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setCoverPreview(file ? URL.createObjectURL(file) : (initial?.coverImage ?? null));
            }}
          />
        </div>
      </div>

      <label className="flex w-fit items-center gap-2 text-sm">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={initial?.published ?? true}
          className="size-4"
        />
        Published
      </label>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Post added.</p>}

      <Button type="submit" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}

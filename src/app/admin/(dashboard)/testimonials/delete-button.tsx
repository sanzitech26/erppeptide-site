"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteTestimonial } from "./actions";

export function DeleteTestimonialButton({ id, name }: { id: number; name: string }) {
  return (
    <form
      action={deleteTestimonial.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm(`Delete the testimonial from "${name}"? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        aria-label="Delete"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="size-4" />
      </Button>
    </form>
  );
}

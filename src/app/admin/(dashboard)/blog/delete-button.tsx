"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteBlogPost } from "./actions";

export function DeleteBlogPostButton({ id, title }: { id: number; title: string }) {
  return (
    <form
      action={deleteBlogPost.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This can't be undone.`)) {
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

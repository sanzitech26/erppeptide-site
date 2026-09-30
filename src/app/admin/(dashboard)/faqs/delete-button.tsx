"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteFaq } from "./actions";

export function DeleteFaqButton({ id, question }: { id: number; question: string }) {
  return (
    <form
      action={deleteFaq.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm(`Delete "${question}"? This can't be undone.`)) {
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

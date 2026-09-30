"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Minus, Plus, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { TestimonialFormState } from "./actions";

export function TestimonialForm({
  action,
  submitLabel,
  pendingLabel,
  initial,
}: {
  action: (prevState: TestimonialFormState, formData: FormData) => Promise<TestimonialFormState>;
  submitLabel: string;
  pendingLabel: string;
  initial?: { name: string; stars: number; quote: string };
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [stars, setStars] = useState(initial?.stars ?? 5);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting the stepper to match the just-cleared form
      setStars(5);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" name="name" defaultValue={initial?.name} required />
      </div>

      <div className="space-y-1.5">
        <Label>Stars *</Label>
        <input type="hidden" name="stars" value={stars} />
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setStars((s) => Math.max(1, s - 1))}
            disabled={stars <= 1}
            aria-label="Decrease stars"
          >
            <Minus className="size-4" />
          </Button>
          <div className="flex items-center gap-1 w-24 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${i < stars ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setStars((s) => Math.min(5, s + 1))}
            disabled={stars >= 5}
            aria-label="Increase stars"
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="quote">Testimonial *</Label>
        <Textarea id="quote" name="quote" defaultValue={initial?.quote} required rows={4} />
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Testimonial added.</p>}

      <Button type="submit" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}

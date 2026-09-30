"use client";

import { useActionState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { FaqFormState } from "./actions";

export function FaqForm({
  action,
  submitLabel,
  pendingLabel,
  initial,
}: {
  action: (prevState: FaqFormState, formData: FormData) => Promise<FaqFormState>;
  submitLabel: string;
  pendingLabel: string;
  initial?: { question: string; answer: string };
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="question">Question *</Label>
        <Input id="question" name="question" defaultValue={initial?.question} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="answer">Answer *</Label>
        <Textarea id="answer" name="answer" defaultValue={initial?.answer} required rows={5} />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">FAQ added.</p>}
      <Button type="submit" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}

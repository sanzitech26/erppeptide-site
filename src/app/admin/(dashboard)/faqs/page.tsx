import Link from "next/link";
import { Plus, Pencil, HelpCircle, TriangleAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllFaqs } from "@/lib/faqs";
import { DeleteFaqButton } from "./delete-button";

export const dynamic = "force-dynamic";

export default async function FaqsPage() {
  let faqs: Awaited<ReturnType<typeof getAllFaqs>> = [];
  let loadError = false;

  try {
    faqs = await getAllFaqs();
  } catch {
    loadError = true;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading">FAQ</h1>
          <p className="text-sm text-muted-foreground">Shown in the homepage Q&amp;A section.</p>
        </div>
        <Button
          size="sm"
          render={
            <Link href="/admin/faqs/new">
              <Plus className="size-4" />
              Add FAQ
            </Link>
          }
        />
      </div>

      <Card className="py-0">
        {loadError ? (
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <TriangleAlert className="size-8 text-destructive/60" />
            <p className="text-sm text-destructive">
              Could not load FAQs — run{" "}
              <code className="rounded bg-muted px-1 py-0.5">supabase/migrations/0006_faqs.sql</code>{" "}
              in the Supabase SQL editor if you haven&apos;t yet.
            </p>
          </CardContent>
        ) : faqs.length === 0 ? (
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <HelpCircle className="size-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No FAQs yet.</p>
          </CardContent>
        ) : (
          <div className="divide-y divide-border">
            {faqs.map((f) => (
              <div key={f.id} className="flex items-start justify-between gap-4 px-6 py-4">
                <div className="min-w-0">
                  <p className="font-medium">{f.question}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{f.answer}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Edit"
                    render={<Link href={`/admin/faqs/${f.id}/edit`} />}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <DeleteFaqButton id={f.id} question={f.question} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

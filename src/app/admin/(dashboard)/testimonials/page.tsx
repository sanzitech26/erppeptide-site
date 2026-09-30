import Link from "next/link";
import { Plus, Pencil, Star, MessageSquareQuote, TriangleAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllTestimonials } from "@/lib/testimonials";
import { DeleteTestimonialButton } from "./delete-button";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  let testimonials: Awaited<ReturnType<typeof getAllTestimonials>> = [];
  let loadError = false;

  try {
    testimonials = await getAllTestimonials();
  } catch {
    loadError = true;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading">Testimonials</h1>
          <p className="text-sm text-muted-foreground">
            Shown on the homepage and the /testimonials page.
          </p>
        </div>
        <Button
          size="sm"
          render={
            <Link href="/admin/testimonials/new">
              <Plus className="size-4" />
              Add Testimonial
            </Link>
          }
        />
      </div>

      <Card className="py-0">
        {loadError ? (
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <TriangleAlert className="size-8 text-destructive/60" />
            <p className="text-sm text-destructive">
              Could not load testimonials — run{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                supabase/migrations/0007_testimonials.sql
              </code>{" "}
              in the Supabase SQL editor if you haven&apos;t yet.
            </p>
          </CardContent>
        ) : testimonials.length === 0 ? (
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <MessageSquareQuote className="size-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No testimonials yet.</p>
          </CardContent>
        ) : (
          <div className="divide-y divide-border">
            {testimonials.map((t) => (
              <div key={t.id} className="flex items-start justify-between gap-4 px-6 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{t.name}</p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3.5 ${i < t.stars ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.quote}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Edit"
                    render={<Link href={`/admin/testimonials/${t.id}/edit`} />}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <DeleteTestimonialButton id={t.id} name={t.name} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

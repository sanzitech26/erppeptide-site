import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

export function TestimonialGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <div key={t.id} className="rounded-xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${i < t.stars ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
          <p className="text-sm font-semibold">{t.name}</p>
        </div>
      ))}
    </div>
  );
}

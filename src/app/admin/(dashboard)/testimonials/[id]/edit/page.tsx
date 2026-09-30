import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getTestimonialById } from "@/lib/testimonials";
import { TestimonialForm } from "../../testimonial-form";
import { updateTestimonial } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonialId = Number(id);
  if (Number.isNaN(testimonialId)) notFound();

  const testimonial = await getTestimonialById(testimonialId);
  if (!testimonial) notFound();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading">Edit Testimonial</h1>
        <p className="text-sm text-muted-foreground">Changes go live immediately.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Testimonial details</CardTitle>
          <CardDescription>All fields are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <TestimonialForm
            action={updateTestimonial.bind(null, testimonialId)}
            submitLabel="Save Changes"
            pendingLabel="Saving…"
            initial={{ name: testimonial.name, stars: testimonial.stars, quote: testimonial.quote }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

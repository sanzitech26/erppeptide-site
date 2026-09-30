import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TestimonialForm } from "../testimonial-form";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading">Add Testimonial</h1>
        <p className="text-sm text-muted-foreground">Appears immediately on the homepage.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Testimonial details</CardTitle>
          <CardDescription>All fields are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <TestimonialForm action={createTestimonial} submitLabel="Add Testimonial" pendingLabel="Saving…" />
        </CardContent>
      </Card>
    </div>
  );
}

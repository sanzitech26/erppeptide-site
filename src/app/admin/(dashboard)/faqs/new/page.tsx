import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaqForm } from "../faq-form";
import { createFaq } from "../actions";

export default function NewFaqPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading">Add FAQ</h1>
        <p className="text-sm text-muted-foreground">Appears immediately on the homepage.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>FAQ details</CardTitle>
          <CardDescription>Both fields are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <FaqForm action={createFaq} submitLabel="Add FAQ" pendingLabel="Saving…" />
        </CardContent>
      </Card>
    </div>
  );
}

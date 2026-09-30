import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getFaqById } from "@/lib/faqs";
import { FaqForm } from "../../faq-form";
import { updateFaq } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faqId = Number(id);
  if (Number.isNaN(faqId)) notFound();

  const faq = await getFaqById(faqId);
  if (!faq) notFound();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading">Edit FAQ</h1>
        <p className="text-sm text-muted-foreground">Changes go live on the homepage immediately.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>FAQ details</CardTitle>
          <CardDescription>Both fields are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <FaqForm
            action={updateFaq.bind(null, faqId)}
            submitLabel="Save Changes"
            pendingLabel="Saving…"
            initial={{ question: faq.question, answer: faq.answer }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

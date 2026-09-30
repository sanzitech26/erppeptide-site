import { Inbox, TriangleAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getContactMessages } from "@/lib/contact-messages";

export default async function AdminDashboardPage() {
  let messages: Awaited<ReturnType<typeof getContactMessages>> = [];
  let loadError = false;

  try {
    messages = await getContactMessages();
  } catch {
    loadError = true;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading">Contact Messages</h1>
          <p className="text-sm text-muted-foreground">
            Submissions from the storefront&apos;s contact form.
          </p>
        </div>
        {!loadError && (
          <Badge variant="secondary">
            {messages.length} {messages.length === 1 ? "message" : "messages"}
          </Badge>
        )}
      </div>

      <Card className="py-0">
        {loadError ? (
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <TriangleAlert className="size-8 text-destructive/60" />
            <p className="text-sm text-destructive">
              Could not load messages — run{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                supabase/migrations/0001_contact_messages.sql
              </code>{" "}
              in the Supabase SQL editor if you haven&apos;t yet.
            </p>
          </CardContent>
        ) : messages.length === 0 ? (
          <CardContent className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <Inbox className="size-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No messages yet.</p>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Message</th>
                  <th className="px-6 py-3 font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id} className="border-b align-top last:border-0">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{m.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {m.email}
                    </td>
                    <td className="max-w-md px-6 py-4 whitespace-pre-wrap">{m.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {new Date(m.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

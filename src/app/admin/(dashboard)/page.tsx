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
      <h1 className="mb-6 text-2xl font-heading">Contact Messages</h1>

      {loadError && (
        <p className="text-sm text-destructive">
          Could not load messages — run{" "}
          <code className="rounded bg-muted px-1 py-0.5">
            supabase/migrations/0001_contact_messages.sql
          </code>{" "}
          in the Supabase SQL editor if you haven&apos;t yet.
        </p>
      )}

      {!loadError && messages.length === 0 && (
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      )}

      {!loadError && messages.length > 0 && (
        <div className="overflow-x-auto rounded-lg border bg-background">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className="border-b last:border-0 align-top">
                  <td className="px-4 py-3 whitespace-nowrap">{m.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{m.email}</td>
                  <td className="px-4 py-3 max-w-md whitespace-pre-wrap">{m.message}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {new Date(m.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

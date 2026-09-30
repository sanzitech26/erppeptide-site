import { createClient } from "@/lib/supabase/server";
import { ResetPasswordForm } from "./reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const supabase = await createClient();

  let exchangeError = !code;
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    exchangeError = !!error;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-2xl font-heading">Set a new password</h1>
      {exchangeError ? (
        <p className="text-sm text-destructive">
          This reset link is invalid or has expired. Request a new one from the login page.
        </p>
      ) : (
        <ResetPasswordForm />
      )}
    </div>
  );
}

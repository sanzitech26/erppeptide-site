import Link from "next/link";
import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="mb-2 text-2xl font-heading">Reset password</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Enter your admin email and we&apos;ll send a link to reset your password.
      </p>
      <ForgotPasswordForm />
      <Link href="/admin/login" className="mt-4 text-sm text-muted-foreground hover:text-foreground">
        Back to sign in
      </Link>
    </div>
  );
}

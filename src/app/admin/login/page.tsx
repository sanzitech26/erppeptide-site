import Link from "next/link";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-2xl font-heading">Admin Login</h1>
      <LoginForm />
      <Link
        href="/admin/forgot-password"
        className="mt-4 text-sm text-muted-foreground hover:text-foreground"
      >
        Forgot password?
      </Link>
    </div>
  );
}

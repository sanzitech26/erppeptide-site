import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-2xl font-heading">Admin Login</h1>
      <LoginForm />
    </div>
  );
}

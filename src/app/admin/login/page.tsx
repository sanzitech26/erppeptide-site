import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-6 sm:py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl shadow-xl md:grid-cols-2">
        <div className="relative overflow-hidden bg-primary p-6 sm:p-10 md:flex md:flex-col md:justify-center">
          <div className="absolute -bottom-10 -left-10 size-32 rounded-full bg-secondary/20 sm:-bottom-16 sm:-left-16 sm:size-56" />
          <div className="absolute bottom-4 left-12 size-16 rounded-full bg-secondary/30 sm:bottom-10 sm:left-20 sm:size-32" />
          <div className="absolute -right-12 -bottom-14 size-36 rounded-full bg-secondary/10 sm:-right-20 sm:-bottom-24 sm:size-64" />
          <div className="relative">
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase sm:text-sm">
              Welcome
            </p>
            <h1 className="mt-1 font-heading text-2xl font-bold text-primary-foreground sm:mt-2 sm:text-4xl">
              Jaycey Peptides
            </h1>
            <p className="mt-2 max-w-xs text-xs text-primary-foreground/70 sm:mt-4 sm:text-sm">
              Sign in to manage products, orders, blog content, and more from
              the admin dashboard.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-white p-6 sm:p-10">
          <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Sign in
          </h2>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">
            Enter your admin credentials to continue.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

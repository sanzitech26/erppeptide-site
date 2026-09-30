"use client";

import { useActionState } from "react";
import { updateEmail, updatePassword } from "./actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function SettingsForms({ currentEmail }: { currentEmail: string }) {
  const [emailState, emailAction, emailPending] = useActionState(updateEmail, undefined);
  const [passwordState, passwordAction, passwordPending] = useActionState(updatePassword, undefined);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email address</CardTitle>
          <CardDescription>Currently: {currentEmail}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={emailAction} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">New email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            {emailState?.error && <p className="text-sm text-destructive">{emailState.error}</p>}
            {emailState?.success && <p className="text-sm text-green-600">{emailState.success}</p>}
            <Button type="submit" disabled={emailPending}>
              {emailPending ? "Saving…" : "Update email"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Enter your current password to confirm the change.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={passwordAction} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
              />
            </div>
            {passwordState?.error && <p className="text-sm text-destructive">{passwordState.error}</p>}
            {passwordState?.success && <p className="text-sm text-green-600">{passwordState.success}</p>}
            <Button type="submit" disabled={passwordPending}>
              {passwordPending ? "Saving…" : "Update password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

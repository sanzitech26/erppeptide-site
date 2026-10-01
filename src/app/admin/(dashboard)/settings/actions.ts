"use server";

import { createClient } from "@/lib/supabase/server";

export type SettingsState = { error?: string; success?: string } | undefined;

export async function updateEmail(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const email = formData.get("email");
  if (typeof email !== "string" || !email.trim()) {
    return { error: "Email is required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ email: email.trim() });
  if (error) return { error: error.message };

  return { success: "Check your new email address for a confirmation link to complete the change." };
}

export async function updatePassword(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");

  if (typeof currentPassword !== "string" || !currentPassword) {
    return { error: "Enter your current password." };
  }
  if (typeof newPassword !== "string" || newPassword.length < 6) {
    return { error: "New password must be at least 6 characters." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return { error: "Could not verify your account." };

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });
  if (reauthError) return { error: "Current password is incorrect." };

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { error: error.message };

  return { success: "Password updated." };
}

export async function updateBitcoinAddress(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const bitcoinAddress = formData.get("bitcoinAddress");
  if (typeof bitcoinAddress !== "string" || !bitcoinAddress.trim()) {
    return { error: "Bitcoin address is required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ bitcoin_address: bitcoinAddress.trim(), updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) return { error: error.message };

  return { success: "Bitcoin address updated." };
}

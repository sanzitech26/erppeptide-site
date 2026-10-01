import { createClient } from "@/lib/supabase/server";
import { getBitcoinAddress } from "@/lib/settings";
import { SettingsForms } from "./settings-forms";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let bitcoinAddress = "";
  try {
    bitcoinAddress = (await getBitcoinAddress()) ?? "";
  } catch {
    // site_settings table not migrated yet — admin sees an empty field.
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your login email and password.</p>
      </div>
      <SettingsForms currentEmail={user?.email ?? ""} currentBitcoinAddress={bitcoinAddress} />
    </div>
  );
}

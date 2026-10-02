import { createClient } from "@/lib/supabase/server";

export type OrderRecord = {
  id: number;
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes: string;
  items: { name: string; variantLabel: string; quantity: number; price: number }[];
  subtotal: number;
  proofUrl: string | null;
  created_at: string;
};

export async function getOrders(): Promise<OrderRecord[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("id, name, email, street, city, state, zip, country, notes, items, subtotal, proof_path, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;

  return Promise.all(
    data.map(async ({ proof_path, ...order }) => {
      // Private bucket: link is a signed URL that expires in an hour.
      const signed = proof_path
        ? await supabase.storage.from("order-proofs").createSignedUrl(proof_path, 3600)
        : null;
      return { ...order, subtotal: Number(order.subtotal), proofUrl: signed?.data?.signedUrl ?? null } as OrderRecord;
    })
  );
}

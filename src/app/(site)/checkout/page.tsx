import { getBitcoinAddress } from '@/lib/settings'
import { CheckoutForm } from './checkout-form'

export const dynamic = 'force-dynamic'

export default async function CheckoutPage() {
  let bitcoinAddress: string | null = null
  try {
    bitcoinAddress = await getBitcoinAddress()
  } catch {
    // site_settings table not migrated yet — fall back to the env var.
  }
  bitcoinAddress ??= process.env.NEXT_PUBLIC_BITCOIN_ADDRESS ?? null

  return <CheckoutForm bitcoinAddress={bitcoinAddress} />
}

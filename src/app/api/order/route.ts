import { NextResponse } from 'next/server'
import { getMailer } from '@/lib/mailer'
import { buildOrderEmailHtml, type OrderItem } from '@/lib/order-email'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_PROOF_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: Request) {
  const mailer = getMailer()
  if (!mailer) {
    return NextResponse.json(
      { error: 'Ordering is not configured yet — please contact us directly to place your order.' },
      { status: 503 }
    )
  }

  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  const street = formData.get('street')
  const city = formData.get('city')
  const state = formData.get('state')
  const zip = formData.get('zip')
  const country = formData.get('country')
  const notes = formData.get('notes')
  const itemsRaw = formData.get('items')
  const proof = formData.get('proof')

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !EMAIL_RE.test(email) ||
    typeof street !== 'string' || !street.trim() ||
    typeof itemsRaw !== 'string'
  ) {
    return NextResponse.json({ error: 'Missing or invalid required fields.' }, { status: 400 })
  }

  if (!(proof instanceof File) || proof.size === 0) {
    return NextResponse.json({ error: 'A payment proof screenshot is required.' }, { status: 400 })
  }
  if (proof.size > MAX_PROOF_SIZE) {
    return NextResponse.json({ error: 'Payment proof file is too large (max 10MB).' }, { status: 400 })
  }

  let items: OrderItem[]
  let subtotal: number
  try {
    items = JSON.parse(itemsRaw)
    subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    if (!Array.isArray(items) || items.length === 0) throw new Error('empty')
  } catch {
    return NextResponse.json({ error: 'Invalid order items.' }, { status: 400 })
  }

  const html = buildOrderEmailHtml({
    items,
    subtotal,
    customer: {
      name: name.trim(),
      email: email.trim(),
      street: street.trim(),
      city: typeof city === 'string' ? city.trim() : '',
      state: typeof state === 'string' ? state.trim() : '',
      zip: typeof zip === 'string' ? zip.trim() : '',
      country: typeof country === 'string' ? country.trim() : '',
      notes: typeof notes === 'string' ? notes.trim() : '',
    },
  })

  const proofBuffer = Buffer.from(await proof.arrayBuffer())

  try {
    await mailer.sendMail({
      replyTo: email.trim(),
      subject: `New Order — ${name.trim()}`,
      html,
      attachments: [
        {
          filename: proof.name || 'payment-proof.png',
          content: proofBuffer,
        },
      ],
    })
  } catch {
    return NextResponse.json(
      { error: 'Could not send your order right now — please try again shortly or contact us directly.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}

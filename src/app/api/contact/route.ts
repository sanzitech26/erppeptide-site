import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  if (
    typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' ||
    !name.trim() || !message.trim() || !EMAIL_RE.test(email)
  ) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Field too long' }, { status: 400 })
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('contact_messages')
      .insert({ name: name.trim(), email: email.trim(), message: message.trim() })

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch {
    // ponytail: Supabase project isn't provisioned yet (placeholder env vars),
    // so this fails until real credentials + a contact_messages table exist.
    return NextResponse.json(
      { error: 'Message could not be saved right now — please email or message us directly.' },
      { status: 503 }
    )
  }
}

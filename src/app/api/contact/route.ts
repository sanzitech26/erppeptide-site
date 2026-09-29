import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, message })

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

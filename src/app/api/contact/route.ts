import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getMailer } from '@/lib/mailer'

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

  const fields = { name: name.trim(), email: email.trim(), message: message.trim() }

  // Save to the admin inbox and email info@ independently; only fail if both fail.
  const saved = await (async () => {
    try {
      const supabase = await createClient()
      const { error } = await supabase.from('contact_messages').insert(fields)
      return !error
    } catch {
      return false
    }
  })()

  const emailed = await (async () => {
    try {
      const mailer = getMailer()
      if (!mailer) return false
      await mailer.sendMail({
        replyTo: fields.email,
        subject: `New contact message — ${fields.name}`,
        text: `From: ${fields.name} <${fields.email}>

${fields.message}`,
      })
      return true
    } catch {
      return false
    }
  })()

  if (!saved && !emailed) {
    return NextResponse.json(
      { error: 'Message could not be sent right now — please email info@jayceypeptides.com or message us on WhatsApp.' },
      { status: 503 }
    )
  }
  return NextResponse.json({ ok: true })
}

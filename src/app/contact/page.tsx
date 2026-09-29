'use client'

import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          message: form.get('message'),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      setStatus('sent')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        We&apos;re here to help
      </p>
      <h1 className="font-heading text-4xl font-bold mb-4">Get in Touch</h1>
      <p className="text-muted-foreground mb-2">
        Feel free to submit the form below if you have a question or need to
        contact management. If you have a quick question, use our live chat
        for a faster response.
      </p>
      <p className="text-sm text-muted-foreground mb-10">
        We ship USA &amp; FedEx 2 Day Air every day at 1 PM PDT. You will
        receive a tracking number when shipped.
      </p>

      {status === 'sent' ? (
        <div className="rounded-xl border border-border bg-muted/40 p-8 text-center">
          <p className="font-heading text-xl font-semibold mb-2">Message sent</p>
          <p className="text-muted-foreground">We&apos;ll get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={5} required />
          </div>
          {status === 'error' && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}
          <Button type="submit" size="lg" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send'}
          </Button>
        </form>
      )}
    </div>
  )
}

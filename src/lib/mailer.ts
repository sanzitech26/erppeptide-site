import nodemailer, { type SendMailOptions } from 'nodemailer'

export const BUSINESS_EMAIL = process.env.ORDER_NOTIFICATION_EMAIL || 'info@jayceypeptides.com'
const FROM = process.env.SMTP_FROM || `Jaycey Peptides <${BUSINESS_EMAIL}>`

// Hostinger SMTP defaults; only SMTP_PASS (the mailbox password) must be set in env.
// Returns null when it isn't, so callers can degrade gracefully.
export function getMailer() {
  const pass = process.env.SMTP_PASS
  if (!pass) return null

  const port = Number(process.env.SMTP_PORT || 465)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER || BUSINESS_EMAIL, pass },
  })

  return {
    sendMail: (options: Omit<SendMailOptions, 'from' | 'to'>) =>
      transporter.sendMail({ from: FROM, to: BUSINESS_EMAIL, ...options }),
  }
}

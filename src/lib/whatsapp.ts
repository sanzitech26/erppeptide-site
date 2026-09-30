const WHATSAPP_DIGITS = '14023206956' // +1 (402) 320-6956

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${WHATSAPP_DIGITS}${text}`
}

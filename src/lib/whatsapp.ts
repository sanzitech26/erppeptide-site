const WHATSAPP_DIGITS = '14023206956' // +1 (402) 320-6956

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${WHATSAPP_DIGITS}${text}`
}

export type OrderCustomer = {
  name: string
  email: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  notes: string
}

export type OrderItem = {
  name: string
  variantLabel: string
  quantity: number
  price: number
}

export function buildOrderMessage({
  items,
  subtotal,
  customer,
}: {
  items: OrderItem[]
  subtotal: number
  customer: OrderCustomer
}) {
  const itemLines = items.map(
    (i) => `- ${i.name} (${i.variantLabel}) x${i.quantity} — $${(i.price * i.quantity).toFixed(2)}`
  )

  const cityLine = [customer.city, customer.state, customer.zip].filter(Boolean).join(', ')

  return [
    'New Order Request',
    '',
    'Customer Details:',
    `Name: ${customer.name}`,
    `Email: ${customer.email}`,
    '',
    'Shipping Address:',
    customer.street,
    ...(cityLine ? [cityLine] : []),
    ...(customer.country ? [customer.country] : []),
    '',
    'Order:',
    ...itemLines,
    '',
    `Subtotal: $${subtotal.toFixed(2)}`,
    ...(customer.notes ? ['', `Notes: ${customer.notes}`] : []),
  ].join('\n')
}

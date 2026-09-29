export type Warehouse = {
  slug: string
  name: string
  flag: string
  region: string
  description: string
  shippingFee: string
  delivery: string
}

export const warehouses: Warehouse[] = [
  {
    slug: 'china',
    name: 'China Warehouse',
    flag: '🇨🇳',
    region: 'Ships worldwide',
    description:
      'Large-scale operations with 100k+ kits in stock and a full product range with stable global supply. Fast fulfillment with 8-15 day delivery including customs and duties (DDP), suitable for all order sizes.',
    shippingFee: '$50',
    delivery: '8-15 business days',
  },
  {
    slug: 'portland',
    name: 'USA Hub — Warehouse A (Portland)',
    flag: '🇺🇸',
    region: 'Ships within the United States only',
    description:
      'Local U.S. stock with stable shipping and 3-5 day delivery. Overnight shipping available. Ships via local U.S. carriers — no PO boxes.',
    shippingFee: '$20',
    delivery: '3-5 business days',
  },
  {
    slug: 'delaware',
    name: 'USA Hub — Warehouse B (Delaware)',
    flag: '🇺🇸',
    region: 'Ships within the United States only',
    description:
      'Second U.S. fulfillment point for stable shipping and 3-5 day delivery. Overnight shipping available. Ships via local U.S. carriers — no PO boxes.',
    shippingFee: '$20',
    delivery: '3-5 business days',
  },
  {
    slug: 'canada',
    name: 'Canada Hub',
    flag: '🇨🇦',
    region: 'Ships within Canada only',
    description:
      'Local inventory held in Canada with stable shipping and 3-6 day delivery, shipped within Canada only.',
    shippingFee: 'Calculated at checkout',
    delivery: '3-6 business days',
  },
]

export function getWarehouseBySlug(slug: string) {
  return warehouses.find((w) => w.slug === slug)
}

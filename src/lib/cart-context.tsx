'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CartItem = {
  productId: number
  slug: string
  name: string
  image: string | null
  variantSku: string
  variantLabel: string
  price: number
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (variantSku: string) => void
  setQuantity: (variantSku: string, quantity: number) => void
  clear: () => void
  subtotal: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'erp-peptide-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // ponytail: localStorage isn't available during SSR, so hydrating cart
    // state here (instead of lazy useState init) is required to avoid a
    // server/client markup mismatch — the extra render this causes is fine.
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ponytail: corrupt/blocked storage just starts empty, no need to surface an error
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ponytail: storage full/blocked, cart just won't persist this session
    }
  }, [items, hydrated])

  const addItem: CartContextValue['addItem'] = (item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variantSku === item.variantSku)
      if (existing) {
        return prev.map((i) =>
          i.variantSku === item.variantSku
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { ...item, quantity }]
    })
  }

  const removeItem = (variantSku: string) => {
    setItems((prev) => prev.filter((i) => i.variantSku !== variantSku))
  }

  const setQuantity = (variantSku: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.variantSku !== variantSku)
        : prev.map((i) => (i.variantSku === variantSku ? { ...i, quantity } : i))
    )
  }

  const clear = () => setItems([])

  const { subtotal, count } = useMemo(
    () => ({
      subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    [items]
  )

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, setQuantity, clear, subtotal, count }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

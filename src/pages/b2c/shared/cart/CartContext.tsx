import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import { unitPrice } from '@/lib/pricing'
import type { Product } from '@/catalog'
import type { CartItem } from './types'

interface CartContextValue {
  items: CartItem[]
  /** total de unidades no carrinho */
  count: number
  /** soma de preço × quantidade de todos os itens */
  subtotal: number
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  clear: () => void
  openCart: () => void
  closeCart: () => void
}

type CartAction =
  | { type: 'add'; product: Product; quantity: number }
  | { type: 'remove'; id: string }
  | { type: 'setQuantity'; id: string; quantity: number }
  | { type: 'clear' }
  | { type: 'hydrate'; items: CartItem[] }

const STORAGE_KEY = 'seleta:cart'

function reducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find((i) => i.product.id === action.product.id)
      if (existing) {
        return state.map((i) =>
          i.product.id === action.product.id ? { ...i, quantity: i.quantity + action.quantity } : i,
        )
      }
      return [...state, { product: action.product, quantity: action.quantity }]
    }
    case 'remove':
      return state.filter((i) => i.product.id !== action.id)
    case 'setQuantity':
      if (action.quantity <= 0) return state.filter((i) => i.product.id !== action.id)
      return state.map((i) =>
        i.product.id === action.id ? { ...i, quantity: action.quantity } : i,
      )
    case 'clear':
      return []
    case 'hydrate':
      return action.items
    default:
      return state
  }
}

const CartContext = createContext<CartContextValue | null>(null)

/** Provider do carrinho — estado local (useReducer) persistido em localStorage. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [])
  const [isOpen, setIsOpen] = useState(false)

  // hidrata do localStorage uma única vez, na montagem
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'hydrate', items: JSON.parse(raw) as CartItem[] })
    } catch {
      // storage indisponível ou dado corrompido — segue com carrinho vazio
    }
  }, [])

  // persiste a cada mudança dos itens
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage indisponível — ignora, o carrinho continua em memória
    }
  }, [items])

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0)
    // subtotal ESTIMADO — usa o valor estimado por peso (o final vem após a pesagem)
    const subtotal = items.reduce((n, i) => n + unitPrice(i.product) * i.quantity, 0)
    return {
      items,
      count,
      subtotal,
      isOpen,
      addItem: (product, quantity = 1) => {
        dispatch({ type: 'add', product, quantity })
      },
      removeItem: (id) => dispatch({ type: 'remove', id }),
      setQuantity: (id, quantity) => dispatch({ type: 'setQuantity', id, quantity }),
      clear: () => dispatch({ type: 'clear' }),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }
  }, [items, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/** Acesso ao carrinho — precisa estar dentro de <CartProvider>. */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart precisa estar dentro de <CartProvider>')
  return ctx
}

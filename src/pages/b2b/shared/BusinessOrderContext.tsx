import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { itemsTotal } from './orderRules'
import type { BusinessOrder, DraftLines, OrderDetails, OrderItem, SavedList } from './types'

/*
 * Estado da área de negócios — MOCK sem backend, persistido em localStorage (mesma
 * abordagem do carrinho B2C). Listas salvas e histórico viram dados de servidor
 * (TanStack Query sobre api/) quando a API existir; o rascunho continua local.
 */

interface State {
  draft: DraftLines
  lists: SavedList[]
  orders: BusinessOrder[]
}

type Action =
  | { type: 'setQuantity'; id: string; quantity: number }
  | { type: 'loadLines'; lines: DraftLines }
  | { type: 'clearDraft' }
  | { type: 'saveList'; list: SavedList }
  | { type: 'deleteList'; id: string }
  | { type: 'addOrder'; order: BusinessOrder; clearDraft: boolean }

interface BusinessOrderContextValue extends State {
  setQuantity: (id: string, quantity: number) => void
  /** substitui o rascunho atual pelas linhas de uma lista ou pedido antigo */
  loadLines: (lines: DraftLines) => void
  clearDraft: () => void
  saveList: (name: string) => void
  deleteList: (id: string) => void
  /**
   * Registra o pedido/cotação. O rascunho é limpo quando os itens enviados vieram dele
   * (sempre num pedido; numa cotação, só se o cliente incluiu o pedido em andamento).
   */
  submitOrder: (items: OrderItem[], details: OrderDetails) => BusinessOrder
}

const STORAGE_KEY = 'seleta:b2b'
const EMPTY: State = { draft: {}, lists: [], orders: [] }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setQuantity': {
      const { [action.id]: _removed, ...rest } = state.draft
      const draft = action.quantity > 0 ? { ...rest, [action.id]: action.quantity } : rest
      return { ...state, draft }
    }
    case 'loadLines':
      return { ...state, draft: { ...action.lines } }
    case 'clearDraft':
      return { ...state, draft: {} }
    case 'saveList':
      return { ...state, lists: [action.list, ...state.lists] }
    case 'deleteList':
      return { ...state, lists: state.lists.filter((l) => l.id !== action.id) }
    case 'addOrder':
      return {
        ...state,
        draft: action.clearDraft ? {} : state.draft,
        orders: [action.order, ...state.orders],
      }
    default:
      return state
  }
}

function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<State>) } : EMPTY
  } catch {
    // storage indisponível ou dado corrompido — começa vazio
    return EMPTY
  }
}

const BusinessOrderContext = createContext<BusinessOrderContextValue | null>(null)

export function BusinessOrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage indisponível — segue em memória
    }
  }, [state])

  const value = useMemo<BusinessOrderContextValue>(
    () => ({
      ...state,
      setQuantity: (id, quantity) => dispatch({ type: 'setQuantity', id, quantity }),
      loadLines: (lines) => dispatch({ type: 'loadLines', lines }),
      clearDraft: () => dispatch({ type: 'clearDraft' }),
      saveList: (name) =>
        dispatch({
          type: 'saveList',
          list: {
            id: crypto.randomUUID(),
            name,
            lines: state.draft,
            updatedAt: new Date().toISOString(),
          },
        }),
      deleteList: (id) => dispatch({ type: 'deleteList', id }),
      submitOrder: (items, details) => {
        const order: BusinessOrder = {
          ...details,
          id: crypto.randomUUID(),
          items,
          estimatedTotal: itemsTotal(items),
          createdAt: new Date().toISOString(),
        }
        dispatch({ type: 'addOrder', order, clearDraft: items.length > 0 })
        return order
      },
    }),
    [state],
  )

  return <BusinessOrderContext.Provider value={value}>{children}</BusinessOrderContext.Provider>
}

/** Acesso ao pedido B2B — precisa estar dentro de <BusinessOrderProvider>. */
export function useBusinessOrder(): BusinessOrderContextValue {
  const ctx = useContext(BusinessOrderContext)
  if (!ctx) throw new Error('useBusinessOrder precisa estar dentro de <BusinessOrderProvider>')
  return ctx
}

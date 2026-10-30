import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CheckCircle, X } from '@phosphor-icons/react'
import styled from 'styled-components'

interface ToastInput {
  message: string
  /** ação opcional à direita (ex: "Ver carrinho") */
  action?: { label: string; onClick: () => void }
}

interface Toast extends ToastInput {
  id: number
}

interface ToastContextValue {
  showToast: (toast: ToastInput) => void
}

const DURATION_MS = 3500

const ToastContext = createContext<ToastContextValue | null>(null)

/**
 * Aviso rápido no rodapé da tela — feedback imediato de ações (adicionar ao carrinho,
 * erros de envio). Um por vez: um novo substitui o anterior. Some sozinho.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), DURATION_MS)
    return () => clearTimeout(timer)
  }, [toast])

  const showToast = useCallback((input: ToastInput) => setToast({ ...input, id: Date.now() }), [])
  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Region aria-live="polite">
        {toast ? (
          <Card key={toast.id}>
            <CheckCircle
              size={20}
              weight="fill"
              className="shrink-0 text-mar-400"
              aria-hidden="true"
            />
            <p className="min-w-0 flex-1 text-sm">{toast.message}</p>
            {toast.action ? (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick()
                  setToast(null)
                }}
                className="shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold text-bone-50 underline underline-offset-4 hover:bg-bone-50/10"
              >
                {toast.action.label}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Fechar aviso"
              className="shrink-0 rounded-full p-1 text-bone-100/70 hover:text-bone-50"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </Card>
        ) : null}
      </Region>
    </ToastContext.Provider>
  )
}

/** Dispara avisos — precisa estar dentro de <ToastProvider>. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast precisa estar dentro de <ToastProvider>')
  return ctx
}

// --- styled components ---

/** Região fixa no rodapé, acima da navegação mobile (--bottom-nav-h); não bloqueia cliques fora do aviso. */
const Region = styled.output`
  position: fixed;
  inset-inline: 0;
  bottom: calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px) + 1rem);
  z-index: 45;
  display: flex;
  justify-content: center;
  padding-inline: 1rem;
  pointer-events: none;
`

/** Pílula escura do aviso, entrando de baixo. */
const Card = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 28rem;
  padding: 0.625rem 0.5rem 0.625rem 1rem;
  border-radius: 1rem;
  background: var(--color-ink-900);
  color: var(--color-bone-50);
  box-shadow: 0 20px 40px -16px rgba(23, 20, 15, 0.6);
  animation: toast-in 0.2s ease-out;

  @keyframes toast-in {
    from {
      transform: translateY(1rem);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

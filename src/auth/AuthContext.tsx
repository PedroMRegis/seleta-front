import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

/**
 * Autenticação — MOCK por enquanto (sem backend). Só guarda o usuário "logado" em
 * memória para destravar o fluxo de pedido, que exige login para adicionar itens.
 * Trocar por auth real (API) quando o backend existir.
 */
interface User {
  email: string
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoginOpen: boolean
  openLogin: () => void
  closeLogin: () => void
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoginOpen, setLoginOpen] = useState(false)

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoginOpen,
      openLogin: () => setLoginOpen(true),
      closeLogin: () => setLoginOpen(false),
      login: (email: string) => {
        setUser({ email })
        setLoginOpen(false)
      },
      logout: () => setUser(null),
    }),
    [user, isLoginOpen],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** Acesso à autenticação — precisa estar dentro de <AuthProvider>. */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return ctx
}

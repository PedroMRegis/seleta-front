import { LockSimple } from '@phosphor-icons/react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@/auth'
import { Button, ButtonLink } from '@/components/Button'
import { StatusScreen } from '@/components/StatusScreen'

/**
 * Protege as páginas de clientes (preços, pedido, cotação, listas). Sem login, mostra
 * um convite para entrar ou solicitar cotação no lugar do conteúdo.
 * MOCK: hoje qualquer login libera; com a API, só contas de parceiros.
 */
export function BusinessGate() {
  const { isAuthenticated, openLogin } = useAuth()

  if (isAuthenticated) return <Outlet />

  return (
    <StatusScreen
      icon={
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bone-200 text-ink-700">
          <LockSimple size={22} aria-hidden="true" />
        </span>
      }
      eyebrow="Área de clientes"
      title="Preços e pedidos são exclusivos para parceiros."
      actions={
        <>
          <Button onClick={openLogin}>Entrar</Button>
          <ButtonLink to="/negocios/parceria" variant="secondary">
            Solicitar cotação
          </ButtonLink>
        </>
      }
    >
      Entre com a conta da sua empresa ou solicite uma cotação para formalizar a parceria.
    </StatusScreen>
  )
}

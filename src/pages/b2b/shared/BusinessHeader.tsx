import { User } from '@phosphor-icons/react'
import { useAuth } from '@/auth'
import { ButtonLink } from '@/components/Button'
import { AccountButton, NavItem, SiteHeader } from '@/components/SiteHeader'
import { useBusinessOrder } from './BusinessOrderContext'

/**
 * Header da área de negócios sobre o SiteHeader. Visitante vê "Entrar" e "Solicitar
 * cotação"; cliente logado vê a navegação da área, a conta e o atalho para o pedido.
 */
export function BusinessHeader() {
  const { isAuthenticated, user, openLogin, logout } = useAuth()
  const { draft } = useBusinessOrder()
  const draftCount = Object.keys(draft).length

  return (
    <SiteHeader
      audience="negocios"
      homeTo="/negocios"
      tagline="para negócios"
      navLabel="Área de negócios"
      nav={
        isAuthenticated ? (
          <>
            <NavItem to="/negocios/pedido" end={false}>
              Pedido
            </NavItem>
            <NavItem to="/negocios/cotacao">Cotação</NavItem>
            <NavItem to="/negocios/listas">Listas e histórico</NavItem>
          </>
        ) : null
      }
      actions={
        <>
          <AccountButton
            icon={<User size={18} aria-hidden="true" />}
            label={
              isAuthenticated && user
                ? `${user.email.split('@')[0] ?? user.email} · Sair`
                : 'Entrar'
            }
            onClick={isAuthenticated ? logout : openLogin}
          />
          {isAuthenticated ? (
            draftCount > 0 ? (
              <ButtonLink to="/negocios/pedido/revisar" size="sm">
                Pedido · {draftCount}
              </ButtonLink>
            ) : null
          ) : (
            <ButtonLink to="/negocios/parceria" size="sm">
              Solicitar cotação
            </ButtonLink>
          )}
        </>
      }
    />
  )
}

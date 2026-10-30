import {
  ChatCenteredText,
  ClipboardText,
  House,
  ListBullets,
  SignIn,
  User,
} from '@phosphor-icons/react'
import { useAuth } from '@/auth'
import { BottomNav, type BottomNavItem } from '@/components/BottomNav'
import { useBusinessOrder } from './BusinessOrderContext'

const ICON = { size: 22, 'aria-hidden': true } as const

/**
 * Navegação da área de negócios no celular.
 * Visitante: Início · Cotação · Entrar. Cliente: Pedido · Cotação · Listas · Conta.
 */
export function BusinessBottomNav() {
  const { isAuthenticated, openLogin, logout } = useAuth()
  const { draft } = useBusinessOrder()

  const items: BottomNavItem[] = isAuthenticated
    ? [
        {
          key: 'pedido',
          label: 'Pedido',
          icon: <ClipboardText {...ICON} />,
          to: '/negocios/pedido',
          end: false,
          badge: Object.keys(draft).length,
        },
        {
          key: 'cotacao',
          label: 'Cotação',
          icon: <ChatCenteredText {...ICON} />,
          to: '/negocios/cotacao',
        },
        { key: 'listas', label: 'Listas', icon: <ListBullets {...ICON} />, to: '/negocios/listas' },
        { key: 'conta', label: 'Sair', icon: <User {...ICON} />, onClick: logout },
      ]
    : [
        { key: 'inicio', label: 'Início', icon: <House {...ICON} />, to: '/negocios' },
        {
          key: 'cotacao',
          label: 'Cotação',
          icon: <ChatCenteredText {...ICON} />,
          to: '/negocios/parceria',
        },
        { key: 'entrar', label: 'Entrar', icon: <SignIn {...ICON} />, onClick: openLogin },
      ]

  return <BottomNav label="Navegação da área de negócios" items={items} />
}

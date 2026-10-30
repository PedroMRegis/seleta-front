import { User } from '@phosphor-icons/react'
import { useAuth } from '@/auth'
import { categories } from '@/catalog'
import { AccountButton, NavItem, SiteHeader } from '@/components/SiteHeader'
import { CartButton } from './cart'

/** Header da loja (B2C) sobre o SiteHeader: categorias na navegação, conta e carrinho nas ações. */
export function Header() {
  const { isAuthenticated, user, openLogin, logout } = useAuth()

  return (
    <SiteHeader
      audience="pessoal"
      homeTo="/"
      tagline="peixes & carnes"
      navLabel="Categorias"
      nav={categories.map((category) => (
        <NavItem key={category.slug} to={`/${category.slug}`}>
          {category.name}
        </NavItem>
      ))}
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
          <CartButton />
        </>
      }
    />
  )
}

import { useState } from 'react'
import { House, ShoppingCart, SquaresFour, User } from '@phosphor-icons/react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/auth'
import { categories } from '@/catalog'
import { BottomNav } from '@/components/BottomNav'
import { useCart } from './cart'
import { CategorySheet } from './CategorySheet'

/** Navegação da loja no celular: Início · Categorias · Carrinho · Conta. */
export function StoreBottomNav() {
  const { count, openCart, isOpen: isCartOpen } = useCart()
  const { isAuthenticated, openLogin, logout } = useAuth()
  const { pathname } = useLocation()
  const [isCategoriesOpen, setCategoriesOpen] = useState(false)
  const onCategoryPage = categories.some((c) => pathname === `/${c.slug}`)

  return (
    <>
      <BottomNav
        label="Navegação da loja"
        items={[
          { key: 'inicio', label: 'Início', icon: <House size={22} aria-hidden="true" />, to: '/' },
          {
            key: 'categorias',
            label: 'Categorias',
            icon: <SquaresFour size={22} aria-hidden="true" />,
            onClick: () => setCategoriesOpen(true),
            active: onCategoryPage || isCategoriesOpen,
          },
          {
            key: 'carrinho',
            label: 'Carrinho',
            icon: <ShoppingCart size={22} aria-hidden="true" />,
            onClick: openCart,
            active: isCartOpen,
            badge: count,
          },
          {
            key: 'conta',
            label: isAuthenticated ? 'Sair' : 'Entrar',
            icon: <User size={22} aria-hidden="true" />,
            onClick: isAuthenticated ? logout : openLogin,
          },
        ]}
      />
      <CategorySheet isOpen={isCategoriesOpen} onClose={() => setCategoriesOpen(false)} />
    </>
  )
}

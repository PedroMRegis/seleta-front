import { Plus } from '@phosphor-icons/react'
import { useAuth } from '@/features/auth'
import type { Product } from '@/features/products'
import { useCart } from '../CartContext'

interface AddToCartButtonProps {
  product: Product
  className?: string
}

/**
 * Botão "Adicionar" — exige login (o pedido só é montado logado). Sem usuário, abre o
 * modal de login; logado, adiciona ao carrinho e abre o carrinho.
 * Usa o carrinho e a autenticação (features transversais) por props/hook.
 */
export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const { isAuthenticated, openLogin } = useAuth()

  const onClick = () => {
    if (!isAuthenticated) {
      openLogin()
      return
    }
    addItem(product)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-sm font-semibold text-bone-50 transition hover:bg-ink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] ${className ?? ''}`}
    >
      <Plus size={16} weight="bold" aria-hidden="true" />
      Adicionar
    </button>
  )
}

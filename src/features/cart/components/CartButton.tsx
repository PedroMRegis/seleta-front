import { ShoppingCart } from '@phosphor-icons/react'
import { useCart } from '../CartContext'

/** Botão do carrinho no header — ícone + badge com a contagem de itens. Abre o carrinho. */
export function CartButton() {
  const { count, openCart } = useCart()

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Abrir carrinho${count > 0 ? `, ${count} ${count === 1 ? 'item' : 'itens'}` : ''}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition hover:bg-bone-200"
    >
      <ShoppingCart size={22} aria-hidden="true" />
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brasa-500 px-1 text-[11px] font-bold text-bone-50">
          {count}
        </span>
      ) : null}
    </button>
  )
}

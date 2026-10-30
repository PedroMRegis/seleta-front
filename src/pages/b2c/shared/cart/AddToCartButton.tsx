import { Plus } from '@phosphor-icons/react'
import { useAuth } from '@/auth'
import type { Product } from '@/catalog'
import { Button } from '@/components/Button'
import { QuantityInput } from '@/components/QuantityInput'
import { useToast } from '@/components/Toast'
import { isWeighed } from '@/lib/pricing'
import { useCart } from './CartContext'

interface AddToCartButtonProps {
  product: Product
}

/**
 * "Adicionar" — exige login (o pedido só é montado logado). Adiciona sem abrir o
 * carrinho: confirma com um aviso ("Ver carrinho") e o botão vira o seletor de
 * quantidade, para ajustar ali mesmo.
 */
export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { items, addItem, setQuantity, openCart } = useCart()
  const { isAuthenticated, openLogin } = useAuth()
  const { showToast } = useToast()
  const quantity = items.find((i) => i.product.id === product.id)?.quantity ?? 0

  if (quantity > 0) {
    return (
      <QuantityInput
        fullWidth
        value={quantity}
        unit={isWeighed(product.unit) ? 'pç' : product.unit}
        label={`Quantidade de ${product.name}`}
        onCommit={(v) => setQuantity(product.id, Math.round(v))}
        onIncrement={() => setQuantity(product.id, quantity + 1)}
        onDecrement={() => setQuantity(product.id, quantity - 1)}
      />
    )
  }

  const onAdd = () => {
    if (!isAuthenticated) {
      openLogin()
      return
    }
    addItem(product)
    showToast({
      message: `${product.name} no carrinho.`,
      action: { label: 'Ver carrinho', onClick: openCart },
    })
  }

  return (
    <Button fullWidth onClick={onAdd} aria-label={`Adicionar ${product.name}`}>
      <Plus size={16} weight="bold" aria-hidden="true" />
      Adicionar
    </Button>
  )
}

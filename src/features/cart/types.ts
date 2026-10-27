import type { Product } from '@/features/products'

/**
 * Item do carrinho — um produto e a quantidade escolhida (em unidades/kg conforme a
 * `unit` do produto). Import de tipo apenas (apagado na compilação), sem acoplamento
 * de runtime com a feature products.
 */
export interface CartItem {
  product: Product
  quantity: number
}

import type { Product } from '@/catalog'

/**
 * Item do carrinho — um produto e a quantidade escolhida (em unidades/kg conforme a
 * `unit` do produto).
 */
export interface CartItem {
  product: Product
  quantity: number
}

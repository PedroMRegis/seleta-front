import { isWeighed } from '@/lib/pricing'
import type { Product } from '@/catalog'
import type { DraftLines, OrderItem } from './types'

/* -----------------------------------------------------------------------------
   Regras de quantidade B2B — MOCK. Ainda não há mínimo/incremento reais por produto;
   valores padrão por tipo de venda, com espaço para exceções por produto em OVERRIDES.
   Trocar pelos dados da API quando existirem.
----------------------------------------------------------------------------- */

export interface OrderRule {
  /** quantidade mínima por item */
  min: number
  /** incremento do −/+ e arredondamento do que é digitado */
  step: number
}

const DEFAULT_WEIGHED: OrderRule = { min: 1, step: 0.5 }
const DEFAULT_UNIT: OrderRule = { min: 1, step: 1 }

/** Exceções por id de produto — ex: { lagosta: { min: 2, step: 1 } } */
const OVERRIDES: Record<string, OrderRule> = {}

export function orderRule(product: Pick<Product, 'id' | 'unit'>): OrderRule {
  return OVERRIDES[product.id] ?? (isWeighed(product.unit) ? DEFAULT_WEIGHED : DEFAULT_UNIT)
}

/** Unidade exibida no campo de quantidade: "kg" para itens por peso, senão a unidade de venda. */
export function quantityUnit(product: Pick<Product, 'unit'>): string {
  return isWeighed(product.unit) ? 'kg' : product.unit
}

/** Ajusta um valor digitado à regra: 0 remove; abaixo do mínimo sobe pro mínimo; arredonda no step. */
export function normalizeQuantity(value: number, rule: OrderRule): number {
  if (value <= 0) return 0
  const stepped = Math.round(value / rule.step) * rule.step
  return Number(Math.max(rule.min, stepped).toFixed(2))
}

/** Próximo valor no −/+: do zero sobe direto pro mínimo; abaixo do mínimo zera. */
export function stepQuantity(value: number, rule: OrderRule, direction: 1 | -1): number {
  if (direction === 1) return value === 0 ? rule.min : Number((value + rule.step).toFixed(2))
  const next = value - rule.step
  return next < rule.min ? 0 : Number(next.toFixed(2))
}

/**
 * Converte o rascunho em itens de pedido, na ordem do catálogo. Produtos que saíram do
 * catálogo são ignorados. Estimativa = preço × quantidade (kg ou unidades).
 */
export function resolveItems(products: Product[], lines: DraftLines): OrderItem[] {
  return products.flatMap((p) => {
    const quantity = lines[p.id] ?? 0
    if (quantity <= 0) return []
    return [{ productId: p.id, name: p.name, unit: p.unit, price: p.price, quantity }]
  })
}

export function itemsTotal(items: OrderItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0)
}

/** Transforma itens de um pedido antigo de volta em rascunho (para "repetir pedido"). */
export function itemsToLines(items: OrderItem[]): DraftLines {
  return Object.fromEntries(items.map((i) => [i.productId, i.quantity]))
}

/** Quantidade com unidade em pt-BR: (2.5, produto por kg) → "2,5 kg"; (3, "dúzia") → "3 dúzia". */
export function formatQuantity(quantity: number, product: Pick<Product, 'unit'>): string {
  return `${quantity.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ${quantityUnit(product)}`
}

import { useMemo } from 'react'
import type { Product } from '@/catalog'
import { useBusinessOrder } from './BusinessOrderContext'
import { itemsTotal, resolveItems } from './orderRules'

/** Rascunho atual resolvido contra o catálogo: itens, quantidade de itens e total estimado. */
export function useDraftItems(products: Product[]) {
  const { draft } = useBusinessOrder()

  return useMemo(() => {
    const items = resolveItems(products, draft)
    return { items, count: items.length, total: itemsTotal(items) }
  }, [products, draft])
}

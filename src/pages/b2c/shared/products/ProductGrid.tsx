import type { Product } from '@/catalog'
import { CardGrid } from '@/components/CardGrid'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  /** mensagem de vazio — a página nunca deve renderizar uma lista vazia em silêncio */
  emptyLabel?: string
}

/**
 * Grid reutilizável de cards de produto — usado pelas páginas de categoria e por
 * qualquer seção que precise listar produtos. UI pura: recebe a lista, renderiza.
 */
export function ProductGrid({
  products,
  emptyLabel = 'Nenhum produto disponível no momento.',
}: ProductGridProps) {
  if (products.length === 0) {
    return <p className="py-12 text-center text-ink-500">{emptyLabel}</p>
  }

  return (
    <CardGrid base={2} sm={3} lg={4} xl={5}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </CardGrid>
  )
}

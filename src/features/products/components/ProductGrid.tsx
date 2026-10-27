import styled from 'styled-components'
import type { Product } from '../types'
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
export function ProductGrid({ products, emptyLabel = 'Nenhum produto disponível no momento.' }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="py-12 text-center text-ink-500">{emptyLabel}</p>
  }

  return (
    <Grid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  )
}

// --- styled components ---

/** Grid responsivo de produtos, auto-fill com card entre 220–1fr. */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`

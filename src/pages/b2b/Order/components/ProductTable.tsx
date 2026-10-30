import { Plus } from '@phosphor-icons/react'
import styled, { css } from 'styled-components'
import { Button } from '@/components/Button'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { QuantityInput } from '@/components/QuantityInput'
import type { Product } from '@/catalog'
import { formatBRL } from '@/lib/format'
import { formatWeightRange, weightRange } from '@/lib/pricing'
import { normalizeQuantity, orderRule, quantityUnit, stepQuantity } from '@/pages/b2b/shared'
import type { ResultSection } from '../hooks/useCatalogFilters'

interface ProductTableProps {
  sections: ResultSection[]
  quantities: Record<string, number>
  onQuantityChange: (productId: string, quantity: number) => void
}

/**
 * Lista de produtos com colunas fixas e alinhadas: foto · produto · preço · quantidade.
 * Cabeçalho e linhas usam o mesmo grid, então as colunas nunca desalinham.
 */
export function ProductTable({ sections, quantities, onQuantityChange }: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <HeaderRow aria-hidden="true">
        <span />
        <span>Produto</span>
        <span className="text-right">Preço</span>
        <span className="text-right">Quantidade</span>
      </HeaderRow>

      {sections.map((section) => (
        <section key={section.title ?? 'todos'} aria-label={section.title ?? 'Produtos'}>
          {section.title ? (
            <h3 className="border-t border-line bg-bone-100 px-4 py-2 font-display text-lg sm:px-5">
              {section.title}
            </h3>
          ) : null}
          <ul>
            {section.products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                quantity={quantities[product.id] ?? 0}
                onQuantityChange={(q) => onQuantityChange(product.id, q)}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

interface ProductRowProps {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
}

/** Linha da lista. "Adicionar" coloca a quantidade mínima; depois vira o seletor de quantidade. */
function ProductRow({ product, quantity, onQuantityChange }: ProductRowProps) {
  const rule = orderRule(product)
  const unit = quantityUnit(product)
  const range = weightRange(product)
  const price = (
    <>
      {formatBRL(product.price)}
      <span className="font-normal text-ink-500">/{unit}</span>
    </>
  )

  return (
    <Row $active={quantity > 0}>
      <ImagePlaceholder
        tone={product.tone}
        label={product.imageLabel}
        aspect="1/1"
        rounded
        showCaption={false}
      />

      <div className="min-w-0">
        <p className="truncate font-semibold text-ink-900">{product.name}</p>
        <p className="truncate text-xs text-ink-500">
          {product.category}
          {range ? ` · peça de ${formatWeightRange(range[0], range[1])}` : ''}
        </p>
        <p className="mt-1 text-sm font-semibold tabular-nums text-ink-900 md:hidden">{price}</p>
      </div>

      <p className="hidden text-right text-sm font-semibold tabular-nums text-ink-900 md:block">
        {price}
      </p>

      <div className="flex justify-end">
        {quantity > 0 ? (
          <QuantityInput
            value={quantity}
            unit={unit}
            label={`Quantidade de ${product.name}`}
            onCommit={(v) => onQuantityChange(normalizeQuantity(v, rule))}
            onIncrement={() => onQuantityChange(stepQuantity(quantity, rule, 1))}
            onDecrement={() => onQuantityChange(stepQuantity(quantity, rule, -1))}
          />
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onQuantityChange(stepQuantity(0, rule, 1))}
            aria-label={`Adicionar ${product.name}`}
          >
            <Plus size={14} weight="bold" aria-hidden="true" />
            Adicionar
          </Button>
        )}
      </div>
    </Row>
  )
}

// --- styled components ---

/** Grid das colunas — foto · produto · (preço, só md+) · quantidade. Compartilhado por cabeçalho e linhas. */
const columns = css`
  display: grid;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  grid-template-columns: 3rem minmax(0, 1fr) auto;

  @media (min-width: 640px) {
    padding: 0.75rem 1.25rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: 3.5rem minmax(0, 1fr) 7.5rem 10.5rem;
  }
`

/** Cabeçalho das colunas — só do md em diante. */
const HeaderRow = styled.div`
  ${columns}
  display: none;
  background: var(--color-bone-100);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-ink-500);

  @media (min-width: 768px) {
    display: grid;
  }
`

/** Linha de produto; destaca com fundo e filete de aço à esquerda quando já está no pedido. */
const Row = styled.li<{ $active: boolean }>`
  ${columns}
  border-top: 1px solid var(--color-line);
  background: ${({ $active }) => ($active ? 'var(--color-bone-100)' : 'var(--color-bone-50)')};
  box-shadow: ${({ $active }) => ($active ? 'inset 3px 0 0 var(--color-steel-500)' : 'none')};
  transition: background-color 0.15s ease;
`

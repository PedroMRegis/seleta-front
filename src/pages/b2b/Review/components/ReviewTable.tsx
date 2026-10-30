import { X } from '@phosphor-icons/react'
import styled, { css } from 'styled-components'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { QuantityInput } from '@/components/QuantityInput'
import type { Product } from '@/catalog'
import { formatBRL } from '@/lib/format'
import { normalizeQuantity, orderRule, quantityUnit, stepQuantity } from '@/pages/b2b/shared'

interface ReviewTableProps {
  products: Product[]
  quantities: Record<string, number>
  onQuantityChange: (productId: string, quantity: number) => void
}

/**
 * Itens do pedido em colunas alinhadas — foto · produto · quantidade · estimativa · remover —
 * no mesmo padrão visual da lista de produtos da tela de pedido.
 */
export function ReviewTable({ products, quantities, onQuantityChange }: ReviewTableProps) {
  return (
    <section
      aria-label="Itens do pedido"
      className="overflow-hidden rounded-2xl border border-line"
    >
      <HeaderRow aria-hidden="true">
        <span />
        <span>Produto</span>
        <span className="text-right">Quantidade</span>
        <span className="text-right">Estimativa</span>
        <span />
      </HeaderRow>
      <ul>
        {products.map((product) => {
          const quantity = quantities[product.id] ?? 0
          const rule = orderRule(product)
          const unit = quantityUnit(product)
          const change = (q: number) => onQuantityChange(product.id, q)
          return (
            <Row key={product.id}>
              <div className="[grid-area:img]">
                <ImagePlaceholder
                  tone={product.tone}
                  label={product.imageLabel}
                  aspect="1/1"
                  showCaption={false}
                />
              </div>
              <div className="min-w-0 [grid-area:info]">
                <p className="truncate font-semibold text-ink-900">{product.name}</p>
                <p className="text-xs tabular-nums text-ink-500">
                  {formatBRL(product.price)}/{unit}
                </p>
              </div>
              <div className="flex [grid-area:qty] md:justify-end">
                <QuantityInput
                  value={quantity}
                  unit={unit}
                  label={`Quantidade de ${product.name}`}
                  onCommit={(v) => change(normalizeQuantity(v, rule))}
                  onIncrement={() => change(stepQuantity(quantity, rule, 1))}
                  onDecrement={() => change(stepQuantity(quantity, rule, -1))}
                />
              </div>
              <p className="text-right text-sm font-semibold tabular-nums text-ink-900 [grid-area:total]">
                ≈ {formatBRL(product.price * quantity)}
              </p>
              <button
                type="button"
                aria-label={`Remover ${product.name}`}
                onClick={() => change(0)}
                className="inline-flex h-8 w-8 items-center justify-center justify-self-end rounded-full text-ink-400 transition [grid-area:remove] hover:bg-bone-200 hover:text-brasa-500"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </Row>
          )
        })}
      </ul>
    </section>
  )
}

// --- styled components ---

/** Grid das colunas. Mobile: foto + produto em cima, quantidade e total embaixo; md+: uma linha só. */
const columns = css`
  display: grid;
  align-items: center;
  gap: 0.75rem 1rem;
  padding: 0.75rem 1rem;
  grid-template-columns: 3rem minmax(0, 1fr) auto;
  grid-template-areas:
    'img info remove'
    'qty qty total';

  @media (min-width: 640px) {
    padding: 0.75rem 1.25rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: 3.5rem minmax(0, 1fr) 10.5rem 7.5rem 2rem;
    grid-template-areas: 'img info qty total remove';
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

/** Linha de item do pedido, separada por filete. */
const Row = styled.li`
  ${columns}
  border-top: 1px solid var(--color-line);
  background: var(--color-bone-50);

  &:first-child {
    border-top: none;
  }
`

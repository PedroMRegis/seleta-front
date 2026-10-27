import styled from 'styled-components'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { AddToCartButton } from '@/features/cart'
import { formatBRL } from '@/lib/format'
import { formatWeightRange, isWeighed, unitPrice, weightRange } from '@/lib/pricing'
import type { Product, ProductLine } from '../types'

interface ProductCardProps {
  product: Product
}

/**
 * Card de produto — foco em vender: imagem, nome, preço e adicionar ao carrinho.
 * Itens por peso mostram valor ESTIMADO (preço/kg × peso médio) + a faixa de peso; o
 * valor final é definido após a pesagem. O acento de topo muda conforme `product.line`
 * (peixe = mar, carne = brasa); como são 2 variantes, fica em styled-components.
 */
export function ProductCard({ product }: ProductCardProps) {
  const { price, originalPrice, unit, line, tone, imageLabel, name, category } = product
  const weighed = isWeighed(unit)
  const range = weightRange(product)
  const estimated = unitPrice(product)
  const discountPct =
    originalPrice !== undefined ? Math.round(100 - (price / originalPrice) * 100) : null

  return (
    <Card $line={line} className="flex flex-col overflow-hidden">
      <div className="relative">
        <ImagePlaceholder tone={tone} label={imageLabel} aspect="4/3" rounded={false} />
        {discountPct !== null ? (
          <span className="absolute left-2 top-2 rounded-full bg-gold-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-bone-50">
            -{discountPct}%
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">{category}</p>
        <h3 className="line-clamp-2 text-base font-semibold text-ink-900">{name}</h3>

        <div className="mt-auto pt-2">
          {weighed ? (
            <>
              <p className="text-lg font-semibold text-ink-900">≈ {formatBRL(estimated)}</p>
              <p className="text-xs text-ink-500">
                {originalPrice !== undefined ? (
                  <span className="mr-1 text-ink-400 line-through">{formatBRL(originalPrice)}/kg</span>
                ) : null}
                {formatBRL(price)}/kg
                {range ? ` · peça de ${formatWeightRange(range[0], range[1])}` : ''}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-400">valor final após a pesagem</p>
            </>
          ) : (
            <p className="text-lg font-semibold text-ink-900">
              {formatBRL(price)} <span className="text-sm font-normal text-ink-500">/ {unit}</span>
            </p>
          )}
        </div>

        <div className="pt-2">
          <AddToCartButton product={product} />
        </div>
      </div>
    </Card>
  )
}

// --- styled components ---

/** Card do produto — acento de topo conforme a linha (peixe=mar, carne=brasa) e leve elevação no hover. */
const Card = styled.div<{ $line: ProductLine }>`
  background: var(--color-bone-100);
  border-radius: 1rem;
  border-top: 4px solid
    ${({ $line }) => ($line === 'peixe' ? 'var(--color-mar-500)' : 'var(--color-brasa-500)')};
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -12px rgba(23, 20, 15, 0.25);
  }
`

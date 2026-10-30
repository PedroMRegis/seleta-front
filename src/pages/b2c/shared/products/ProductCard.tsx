import styled from 'styled-components'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { AddToCartButton } from '../cart'
import { formatBRL } from '@/lib/format'
import { formatWeightRange, isWeighed, unitPrice, weightRange } from '@/lib/pricing'
import type { Product, ProductLine } from '@/catalog'

interface ProductCardProps {
  product: Product
}

/**
 * Card de produto compacto (2 por linha no celular, até 5 no desktop) — imagem, nome,
 * preço e adicionar ao carrinho.
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
    <Card $line={line}>
      <div className="relative">
        <ImagePlaceholder tone={tone} label={imageLabel} aspect="4/3" rounded={false} />
        {discountPct !== null ? (
          <span className="absolute left-2 top-2 rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-bone-50 sm:text-[11px]">
            -{discountPct}%
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="hidden text-[11px] font-semibold uppercase tracking-wide text-ink-500 sm:block">
          {category}
        </p>
        {/* sempre 2 linhas de altura: nomes curtos e longos alinham o preço na fileira */}
        <h3 className="line-clamp-2 min-h-[2.75em] text-sm font-semibold leading-snug text-ink-900 sm:mt-1 sm:text-base">
          {name}
        </h3>

        {/* bloco de preço com 3 linhas fixas — por peso ou por unidade, mesma altura */}
        <div className="mt-auto pt-2">
          <p className="text-base font-semibold text-ink-900 sm:text-lg">
            {weighed ? `≈ ${formatBRL(estimated)}` : formatBRL(price)}
          </p>
          <p className="truncate text-[11px] text-ink-500 sm:text-xs">
            {originalPrice !== undefined ? (
              <span className="mr-1 text-ink-400 line-through">
                {formatBRL(originalPrice)}
                {weighed ? '/kg' : ''}
              </span>
            ) : null}
            {weighed ? `${formatBRL(price)}/kg` : `por ${unit}`}
            {range ? (
              <span className="hidden sm:inline">
                {` · peça de ${formatWeightRange(range[0], range[1])}`}
              </span>
            ) : null}
          </p>
          <p className="text-[10px] text-ink-400 sm:text-[11px]">
            {weighed ? 'final após pesagem' : 'preço fixo'}
          </p>
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
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

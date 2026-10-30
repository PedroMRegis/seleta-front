import type { Product, ProductLine } from '@/catalog'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { SectionHeading } from '@/components/SectionHeading'
import { formatBRL } from '@/lib/format'
import { formatWeightRange, isWeighed, unitPrice, weightRange } from '@/lib/pricing'
import { AddToCartButton } from '../cart'

interface FeaturedProductsProps {
  /** produtos em destaque, na ordem de exibição */
  products: Product[]
  /** linha da categoria — define a cor do rótulo e do filete */
  line: ProductLine
}

const ACCENT: Record<ProductLine, { tone: 'mar' | 'brasa'; border: string }> = {
  peixe: { tone: 'mar', border: 'border-mar-500' },
  carne: { tone: 'brasa', border: 'border-brasa-500' },
}

/**
 * "Seleção da casa" de uma categoria — produtos maiores que o card do catálogo. No
 * celular a foto é baixa (16:9) para não ocupar a tela; a partir de 768px, 4:3.
 */
export function FeaturedProducts({ products, line }: FeaturedProductsProps) {
  if (products.length === 0) return null
  const accent = ACCENT[line]

  return (
    <section className="page-container page-section">
      <SectionHeading eyebrow="Seleção da casa" eyebrowTone={accent.tone} title="Destaques" />

      <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
        {products.map((product) => {
          const range = weightRange(product)
          const weighed = isWeighed(product.unit)
          return (
            <article
              key={product.id}
              className={`flex flex-col overflow-hidden rounded-2xl border-t-4 bg-bone-100 ${accent.border}`}
            >
              <ImagePlaceholder
                tone={product.tone}
                label={product.imageLabel}
                aspect="16/9"
                mdAspect="4/3"
                rounded={false}
              />
              <div className="flex flex-1 flex-col p-5 sm:p-8">
                <h3 className="text-2xl">{product.name}</h3>
                <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                  <div>
                    <p className="text-xl font-semibold text-ink-900">
                      {weighed ? `≈ ${formatBRL(unitPrice(product))}` : formatBRL(product.price)}
                    </p>
                    <p className="text-xs text-ink-500">
                      {weighed ? `${formatBRL(product.price)}/kg` : `por ${product.unit}`}
                      {range ? ` · peça de ${formatWeightRange(range[0], range[1])}` : ''}
                    </p>
                  </div>
                  <div className="w-40 shrink-0">
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

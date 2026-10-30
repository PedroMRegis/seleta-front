import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { formatBRL } from '@/lib/format'
import type { Product } from '@/catalog'
import { SectionHeading } from '@/components/SectionHeading'

interface FeaturedCutsProps {
  products: Product[]
}

/** Texto de venda específico por corte — mais longo e persuasivo que o do card do grid. */
const SELL_COPY: Record<string, string> = {
  picanha:
    'A queridinha da churrasqueira: capa de gordura generosa e fibra macia que segura bem o ponto na brasa alta. Vai inteira na grelha, sela dos dois lados, descansa e é fatiada sempre na direção certa — contra as fibras.',
  costela:
    'Pede tempo, não pressa: fogo baixo e constante por horas até a carne soltar do osso sozinha. É o corte certo pra quem gosta daquele churrasco de domingo que começa cedo.',
}

/**
 * Vitrine de cortes em destaque da linha Carnes (picanha e costela), com imagem
 * grande e texto de venda específico — diferente do card compacto do grid.
 */
export function FeaturedCuts({ products }: FeaturedCutsProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <section className="bg-bone-100 page-section">
      <div className="page-container">
        <SectionHeading
          eyebrow="Destaque da casa"
          eyebrowTone="brasa"
          title="Os cortes que fazem a fama do churrasco"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border-t-4 border-brasa-500 bg-bone-50"
            >
              <ImagePlaceholder
                tone={product.tone}
                label={product.imageLabel}
                aspect="4/3"
                rounded={false}
              />
              <div className="p-6 sm:p-8">
                <h3 className="text-xl">{product.name}</h3>
                <p className="mt-3 text-ink-700">
                  {SELL_COPY[product.id] ?? 'Corte selecionado e cortado sob medida no balcão.'}
                </p>
                <p className="mt-4 text-lg font-semibold text-ink-900">
                  {formatBRL(product.price)}{' '}
                  <span className="text-sm font-normal text-ink-500">/ {product.unit}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

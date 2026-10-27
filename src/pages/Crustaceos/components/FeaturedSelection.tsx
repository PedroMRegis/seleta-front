import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { AddToCartButton } from '@/features/cart'
import { productsByCategory } from '@/features/products'
import { formatBRL } from '@/lib/format'
import { formatWeightRange, isWeighed, unitPrice, weightRange } from '@/lib/pricing'

const FEATURED_IDS = ['lagosta', 'camarao-vg']

/**
 * "Seleção da casa" — crustáceos exibidos grandes e elegantes: imagem, nome, preço e
 * adicionar ao carrinho. Product-forward, sem parágrafos nem alegações. Dados lidos
 * read-only de `productsByCategory.crustaceos`.
 */
export function FeaturedSelection() {
  const featured = FEATURED_IDS.flatMap((id) => {
    const product = productsByCategory.crustaceos.find((p) => p.id === id)
    return product ? [product] : []
  })

  if (featured.length === 0) return null

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-mar-600">Seleção da casa</p>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:mt-8 md:grid-cols-2">
        {featured.map((product) => {
          const range = weightRange(product)
          return (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border-t-4 border-mar-500 bg-bone-100"
            >
              <ImagePlaceholder tone={product.tone} label={product.imageLabel} aspect="4/3" rounded={false} />
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                  {product.category}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-ink-900">{product.name}</h3>
                {isWeighed(product.unit) ? (
                  <>
                    <p className="mt-2 text-xl font-semibold text-ink-900">
                      ≈ {formatBRL(unitPrice(product))}
                    </p>
                    <p className="text-xs text-ink-500">
                      {formatBRL(product.price)}/kg
                      {range ? ` · peça de ${formatWeightRange(range[0], range[1])}` : ''}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-xl font-semibold text-ink-900">
                    {formatBRL(product.price)}
                    <span className="text-sm font-normal text-ink-500"> / {product.unit}</span>
                  </p>
                )}
                <div className="mt-4 max-w-56">
                  <AddToCartButton product={product} />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

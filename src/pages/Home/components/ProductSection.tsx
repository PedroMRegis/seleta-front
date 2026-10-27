import { ProductCard } from '@/features/products'
import type { Product } from '@/features/products'

interface ProductSectionProps {
  eyebrow: string
  title: string
  products: Product[]
}

/**
 * Seção com título + grid de produtos. Reusada pra "Mais frescos" e "Ofertas da
 * semana" — só muda o conteúdo (eyebrow/title/products), sem lógica de negócio.
 */
export function ProductSection({ eyebrow, title, products }: ProductSectionProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-steel-700">{eyebrow}</p>
        <h2 className="mt-2 text-2xl sm:text-3xl">{title}</h2>
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-ink-500">Nenhum produto disponível no momento.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

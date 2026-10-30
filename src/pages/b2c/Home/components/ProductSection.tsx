import { ProductGrid } from '@/pages/b2c/shared'
import type { Product } from '@/catalog'
import { SectionHeading } from '@/components/SectionHeading'

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
    <section className="page-container page-section">
      <SectionHeading eyebrow={eyebrow} title={title} />

      <ProductGrid products={products} />
    </section>
  )
}

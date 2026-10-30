import { bestSellers, categories, lineHighlights, weeklyDeals } from '@/catalog'
import { CategoryGrid } from './components/CategoryGrid'
import { Hero } from './components/Hero'
import { LineSplit } from './components/LineSplit'
import { ProductSection } from './components/ProductSection'
import { ServiceStrip } from './components/ServiceStrip'

/** Home da Seleta — só composição das seções, sem lógica de negócio (header/rodapé vêm do StoreLayout). */
export function Home() {
  return (
    <>
      <Hero />
      <LineSplit lineHighlights={lineHighlights} />
      <CategoryGrid categories={categories} />
      <ProductSection eyebrow="Direto da casa" title="Mais frescos" products={bestSellers} />
      <ProductSection
        eyebrow="Por tempo limitado"
        title="Ofertas da semana"
        products={weeklyDeals}
      />
      <ServiceStrip />
    </>
  )
}

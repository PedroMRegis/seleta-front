import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { bestSellers, categories, lineHighlights, weeklyDeals } from '@/features/products'
import { CategoryGrid } from './components/CategoryGrid'
import { Hero } from './components/Hero'
import { LineSplit } from './components/LineSplit'
import { ProductSection } from './components/ProductSection'
import { ServiceStrip } from './components/ServiceStrip'

/** Home da Seleta — só composição de Header, seções e Footer, sem lógica de negócio. */
export function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-bone-50">
      <Header />
      <main className="flex-1">
        <Hero />
        <LineSplit lineHighlights={lineHighlights} />
        <CategoryGrid categories={categories} />
        <ProductSection eyebrow="Direto da casa" title="Mais frescos" products={bestSellers} />
        <ProductSection eyebrow="Por tempo limitado" title="Ofertas da semana" products={weeklyDeals} />
        <ServiceStrip />
      </main>
      <Footer />
    </div>
  )
}

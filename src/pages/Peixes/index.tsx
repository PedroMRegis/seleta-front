import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CategoryHero, ProductGrid, categories, productsByCategory } from '@/features/products'
import { FeaturedSelection } from './components/FeaturedSelection'

/** Página da categoria Peixes — product-forward, sem texto editorial: seleção da casa + catálogo. */
export function Peixes() {
  const category = categories.find((c) => c.slug === 'peixes')
  if (!category) return null

  return (
    <div className="flex min-h-screen flex-col bg-bone-50">
      <Header />
      <main className="flex-1">
        <CategoryHero
          name={category.name}
          line={category.line}
          tagline={category.tagline}
          tone={category.tone}
          imageLabel={category.imageLabel}
        />
        <FeaturedSelection />
        <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <ProductGrid products={productsByCategory.peixes} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

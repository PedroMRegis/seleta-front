import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CategoryHero, ProductGrid, categories, productsByCategory } from '@/features/products'

/** Página da categoria Carnes — a enriquecer com seções de valor (maturação, corte, preparo). */
export function Carnes() {
  const category = categories.find((c) => c.slug === 'carnes')
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
        <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <ProductGrid products={productsByCategory.carnes} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

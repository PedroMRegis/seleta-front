import { categories, productsByCategory, type CategorySlug } from '@/catalog'
import { SectionHeading } from '@/components/SectionHeading'
import { CategoryHero } from './products/CategoryHero'
import { FeaturedProducts } from './products/FeaturedProducts'
import { ProductGrid } from './products/ProductGrid'

interface CategoryPageProps {
  slug: CategorySlug
  /** ids dos produtos da "Seleção da casa", entre o topo e o catálogo (opcional) */
  featuredIds?: string[]
}

/** Molde das páginas de categoria da loja: topo da categoria, vitrine opcional e catálogo completo. */
export function CategoryPage({ slug, featuredIds = [] }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === slug)
  if (!category) return null
  const products = productsByCategory[slug]
  const featured = featuredIds.flatMap((id) => products.filter((p) => p.id === id))

  return (
    <>
      <CategoryHero
        name={category.name}
        line={category.line}
        tagline={category.tagline}
        tone={category.tone}
        imageLabel={category.imageLabel}
      />
      <FeaturedProducts products={featured} line={category.line} />
      <section className="page-container page-section">
        <SectionHeading
          eyebrow={`${products.length} ${products.length === 1 ? 'produto' : 'produtos'}`}
          title="Catálogo completo"
        />
        <ProductGrid products={products} />
      </section>
    </>
  )
}

import { categories, lineHighlights, productsByCategory, type ProductLine } from '@/catalog'
import { ButtonAnchor, ButtonLink } from '@/components/Button'
import { SectionHeading } from '@/components/SectionHeading'
import { CategoryHero } from './products/CategoryHero'
import { ProductGrid } from './products/ProductGrid'

interface LinePageProps {
  line: ProductLine
}

/**
 * Página de uma linha inteira da casa (peixes & frutos do mar · carnes & aves): todas as
 * categorias da linha juntas, uma seção por categoria, com atalhos no topo para pular
 * entre elas e um link para a página de cada categoria.
 */
export function LinePage({ line }: LinePageProps) {
  const highlight = lineHighlights.find((h) => h.line === line)
  if (!highlight) return null
  const sections = categories
    .filter((c) => c.line === line)
    .map((category) => ({ category, products: productsByCategory[category.slug] }))

  return (
    <>
      <CategoryHero
        name={highlight.title}
        line={line}
        tagline={highlight.blurb}
        tone={highlight.tone}
        imageLabel={highlight.imageLabel}
      />

      <nav aria-label="Categorias desta linha" className="page-container pt-8">
        <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {sections.map(({ category, products }) => (
            <li key={category.slug} className="shrink-0">
              <ButtonAnchor href={`#cat-${category.slug}`} variant="secondary" size="sm">
                {category.name} · {products.length}
              </ButtonAnchor>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map(({ category, products }) => (
        <section
          key={category.slug}
          id={`cat-${category.slug}`}
          aria-labelledby={`cat-${category.slug}-title`}
          className="page-container page-section scroll-mt-24 border-b border-line last:border-b-0"
        >
          <SectionHeading
            eyebrow={`${products.length} ${products.length === 1 ? 'produto' : 'produtos'}`}
            title={category.name}
            description={category.tagline}
            aside={
              <ButtonLink to={`/${category.slug}`} variant="secondary" size="sm">
                Só {category.name.toLowerCase()}
              </ButtonLink>
            }
          />
          <ProductGrid products={products} />
        </section>
      ))}
    </>
  )
}

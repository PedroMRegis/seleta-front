import { Link } from 'react-router-dom'
import { CardGrid } from '@/components/CardGrid'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import type { Category, ProductLine } from '@/catalog'
import { SectionHeading } from '@/components/SectionHeading'

interface CategoryGridProps {
  categories: Category[]
}

const ACCENT_BORDER: Record<ProductLine, string> = {
  peixe: 'border-mar-500',
  carne: 'border-brasa-500',
}

/**
 * Grid de categorias — cada card traz o placeholder, nome, contagem de itens e um
 * traço de topo na cor da linha (mar/brasa) daquela categoria.
 */
export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <section id="categorias" className="page-container page-section scroll-mt-24">
      <SectionHeading eyebrow="Explore por categoria" title="Categorias" />

      <CardGrid base={2} sm={3} lg={5}>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/${category.slug}`}
            className={`flex h-full flex-col overflow-hidden rounded-2xl border-t-4 bg-bone-100 text-left transition-shadow hover:shadow-lg ${ACCENT_BORDER[category.line]}`}
          >
            <ImagePlaceholder
              tone={category.tone}
              label={category.imageLabel}
              aspect="4/3"
              mdAspect="1/1"
              rounded={false}
              showCaption={false}
            />
            <div className="flex flex-1 flex-col p-3 sm:p-4">
              <h3 className="text-sm font-semibold text-ink-900 sm:text-base">{category.name}</h3>
              <p className="text-xs text-ink-500 sm:text-sm">{category.count} itens</p>
              {/* frase com altura fixa de 2 linhas — só a partir de 640px; no celular o card fica enxuto */}
              <p className="mt-2 hidden min-h-[2.75em] text-sm leading-snug text-ink-700 sm:line-clamp-2">
                {category.tagline}
              </p>
            </div>
          </Link>
        ))}
      </CardGrid>
    </section>
  )
}

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import type { Category, ProductLine } from '@/features/products'

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
  const navigate = useNavigate()

  if (categories.length === 0) {
    return null
  }

  return (
    <section id="categorias" className="mx-auto max-w-[1200px] scroll-mt-20 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8 sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-steel-700">
          Explore por categoria
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl">Categorias</h2>
      </div>

      <Grid>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => navigate(`/${category.slug}`)}
            className={`block w-full overflow-hidden rounded-2xl border-t-4 bg-bone-100 text-left transition-shadow hover:shadow-lg ${ACCENT_BORDER[category.line]}`}
          >
            <ImagePlaceholder tone={category.tone} label={category.imageLabel} aspect="1/1" rounded={false} />
            <div className="p-4">
              <h3 className="text-base font-semibold text-ink-900">{category.name}</h3>
              <p className="mt-1 text-sm text-ink-500">{category.count} itens</p>
              <p className="mt-2 text-sm text-ink-700">{category.tagline}</p>
            </div>
          </button>
        ))}
      </Grid>
    </section>
  )
}

// --- styled components ---

/** Grid responsivo de categorias, auto-fill com largura mínima de card entre 180–220px. */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 1.25rem;
`

import { CardGrid } from '@/components/CardGrid'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import type { Category } from '@/catalog'
import { SectionHeading } from '@/components/SectionHeading'

interface LinesProps {
  categories: Category[]
}

/** "A seleção" — as categorias com foto e frase de vitrine. Sem preços: preço é só para clientes. */
export function Lines({ categories }: LinesProps) {
  return (
    <section className="page-container page-section">
      <SectionHeading
        eyebrow="A seleção"
        title="O que fornecemos."
        aside={
          <p className="max-w-sm text-sm text-ink-500">
            O catálogo completo, com preços por kg, fica disponível para parceiros.
          </p>
        }
      />

      <CardGrid as="ul" sm={2} lg={3}>
        {categories.map((category) => (
          <li key={category.slug}>
            <ImagePlaceholder tone={category.tone} label={category.imageLabel} aspect="4/3" />
            <h3 className="mt-5 text-2xl">{category.name}</h3>
            <p className="mt-1 text-sm text-ink-700">{category.tagline}</p>
          </li>
        ))}
      </CardGrid>
    </section>
  )
}

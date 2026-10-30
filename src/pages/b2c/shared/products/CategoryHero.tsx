import type { ProductLine } from '@/catalog'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Eyebrow } from '@/components/Eyebrow'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'

interface CategoryHeroProps {
  /** nome da categoria (ex: "Peixes") */
  name: string
  /** linha — governa o acento de cor (peixe = mar, carne = brasa) */
  line: ProductLine
  /** frase de vitrine curta abaixo do título */
  tagline: string
  /** cor e legenda do placeholder de imagem grande da categoria */
  tone: string
  imageLabel: string
}

const LINE_EYEBROW: Record<ProductLine, { label: string; tone: 'mar' | 'brasa' }> = {
  peixe: { label: 'Do mar', tone: 'mar' },
  carne: { label: 'Da terra', tone: 'brasa' },
}

/**
 * Topo de página de categoria — trilha, rótulo da linha (na cor dela), título h1 no
 * tamanho padrão de página, tagline e a imagem grande da categoria.
 */
export function CategoryHero({ name, line, tagline, tone, imageLabel }: CategoryHeroProps) {
  const eyebrow = LINE_EYEBROW[line]

  return (
    <section className="page-container border-b border-line pb-8 pt-6 sm:pb-10 sm:pt-12">
      <Breadcrumb />
      <div className="mt-6 grid items-center gap-6 md:grid-cols-2 md:gap-8">
        <div>
          <Eyebrow tone={eyebrow.tone}>{eyebrow.label}</Eyebrow>
          <h1 className="mt-3 text-4xl sm:text-5xl">{name}</h1>
          <p className="mt-3 max-w-md text-ink-700">{tagline}</p>
        </div>
        <ImagePlaceholder tone={tone} label={imageLabel} aspect="21/9" mdAspect="4/3" />
      </div>
    </section>
  )
}

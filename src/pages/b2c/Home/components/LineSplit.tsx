import { ArrowRight, Cow, Fish } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import type { LineHighlight, ProductLine } from '@/catalog'

interface LineSplitProps {
  lineHighlights: LineHighlight[]
}

const ACCENT: Record<
  ProductLine,
  {
    label: string
    tone: 'mar' | 'brasa'
    border: string
    Icon: typeof Fish
    /** para onde o card leva */
    to: string
    cta: string
  }
> = {
  peixe: {
    label: 'Peixe',
    tone: 'mar',
    border: 'border-mar-500',
    Icon: Fish,
    to: '/peixes-e-frutos-do-mar',
    cta: 'Ver peixes e frutos do mar',
  },
  carne: {
    label: 'Carne',
    tone: 'brasa',
    border: 'border-brasa-500',
    Icon: Cow,
    to: '/carnes-e-aves',
    cta: 'Ver carnes e aves',
  },
}

/**
 * Bloco de destaque das duas linhas da casa (peixe x carne), lado a lado no desktop e
 * empilhado no mobile. Cada card leva à página da linha, com todas as suas categorias.
 * No celular a foto é baixa (16:9) para os dois cards caberem sem rolar demais.
 */
export function LineSplit({ lineHighlights }: LineSplitProps) {
  return (
    <section className="page-container page-section">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {lineHighlights.map((item) => {
          const accent = ACCENT[item.line]
          return (
            <Link
              key={item.line}
              to={accent.to}
              className={`group flex h-full flex-col overflow-hidden rounded-2xl border-t-4 bg-bone-100 transition-shadow hover:shadow-lg ${accent.border}`}
            >
              <ImagePlaceholder
                tone={item.tone}
                label={item.imageLabel}
                aspect="16/9"
                mdAspect="4/3"
                rounded={false}
              />
              <div className="flex flex-1 flex-col p-5 sm:p-8">
                <Eyebrow tone={accent.tone}>
                  <accent.Icon size={18} weight="fill" aria-hidden="true" />
                  {accent.label}
                </Eyebrow>
                <h2 className="mt-3 text-2xl sm:text-3xl">{item.title}</h2>
                <p className="mt-2 text-ink-700 sm:mt-3">{item.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-ink-900">
                  {accent.cta}
                  <ArrowRight
                    size={14}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

import { Cow, Fish } from '@phosphor-icons/react'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import type { LineHighlight, ProductLine } from '@/features/products'

interface LineSplitProps {
  lineHighlights: LineHighlight[]
}

const ACCENT: Record<ProductLine, { label: string; text: string; border: string; Icon: typeof Fish }> = {
  peixe: { label: 'Peixe', text: 'text-mar-600', border: 'border-mar-500', Icon: Fish },
  carne: { label: 'Carne', text: 'text-brasa-600', border: 'border-brasa-500', Icon: Cow },
}

/**
 * Bloco de destaque das duas linhas da casa (peixe x carne), lado a lado no desktop e
 * empilhado no mobile. Cada card carrega o acento de cor e o ícone da sua linha.
 */
export function LineSplit({ lineHighlights }: LineSplitProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {lineHighlights.map((item) => {
          const accent = ACCENT[item.line]
          return (
            <article
              key={item.line}
              className={`overflow-hidden rounded-2xl border-t-4 bg-bone-100 ${accent.border}`}
            >
              <ImagePlaceholder tone={item.tone} label={item.imageLabel} aspect="4/3" rounded={false} />
              <div className="p-6 sm:p-8">
                <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${accent.text}`}>
                  <accent.Icon size={18} weight="fill" aria-hidden="true" />
                  {accent.label}
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl">{item.title}</h2>
                <p className="mt-3 text-ink-700">{item.blurb}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

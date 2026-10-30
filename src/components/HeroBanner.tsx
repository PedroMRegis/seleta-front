import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

interface HeroBannerProps {
  image: string
  imageAlt: string
  eyebrow: string
  title: string
  description: string
  /** botões (use Button/ButtonLink com variantes inverse) */
  actions: ReactNode
}

/**
 * Abertura padrão do site (Home da loja e vitrine de negócios): foto em tela cheia,
 * scrim escuro para contraste e texto alinhado à base, no container padrão.
 */
export function HeroBanner({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  actions,
}: HeroBannerProps) {
  return (
    <section className="relative flex min-h-[400px] items-end overflow-hidden sm:min-h-[600px]">
      <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-ink-900/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/60 to-transparent" />

      <div className="page-container relative pb-10 pt-24 sm:pb-20 sm:pt-32">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] text-bone-50 sm:mt-5 sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-bone-100/80 sm:mt-5 sm:text-lg">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">{actions}</div>
      </div>
    </section>
  )
}

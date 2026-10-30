import type { ReactNode } from 'react'
import { Eyebrow, type EyebrowTone } from './Eyebrow'

interface SectionHeadingProps {
  eyebrow?: ReactNode
  eyebrowTone?: EyebrowTone
  title: string
  description?: ReactNode
  /** conteúdo à direita do título (link, botão, nota) */
  aside?: ReactNode
  /** título claro, para seções sobre fundo escuro */
  inverse?: boolean
  /** sem margem inferior — quando o cabeçalho é o único conteúdo da seção */
  flush?: boolean
}

/**
 * Cabeçalho padrão de seção (loja e negócios): rótulo, título h2 e descrição à
 * esquerda; um complemento opcional à direita. Mesma tipografia e espaçamento sempre.
 */
export function SectionHeading({
  eyebrow,
  eyebrowTone,
  title,
  description,
  aside,
  inverse = false,
  flush = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between ${flush ? '' : 'mb-10 sm:mb-12'}`}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <div className="mb-3">
            <Eyebrow tone={eyebrowTone ?? (inverse ? 'light' : 'neutral')}>{eyebrow}</Eyebrow>
          </div>
        ) : null}
        <h2 className={`text-3xl sm:text-4xl ${inverse ? 'text-bone-50' : ''}`}>{title}</h2>
        {description ? (
          <p className={`mt-3 ${inverse ? 'text-bone-100/75' : 'text-ink-700'}`}>{description}</p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  )
}

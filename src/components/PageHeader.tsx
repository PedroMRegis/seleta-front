import type { ReactNode } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { Eyebrow } from './Eyebrow'

interface PageHeaderProps {
  title: string
  eyebrow?: ReactNode
  description?: ReactNode
  /** botões à direita do título */
  actions?: ReactNode
  /** link de volta acima do título */
  back?: { to: string; label: string }
}

/**
 * Cabeçalho padrão de página (h1): volta opcional, rótulo, título e descrição à
 * esquerda; ações à direita; filete embaixo. Usado na loja e em negócios.
 */
export function PageHeader({ title, eyebrow, description, actions, back }: PageHeaderProps) {
  return (
    <header className="border-b border-line pb-8">
      {back ? (
        <Link
          to={back.to}
          className="mb-5 inline-flex items-center gap-2 text-sm text-ink-500 transition hover:text-ink-900"
        >
          <ArrowLeft size={14} aria-hidden="true" /> {back.label}
        </Link>
      ) : null}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 max-w-2xl">
          {eyebrow ? (
            <div className="mb-3">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          ) : null}
          <h1 className="text-4xl sm:text-5xl">{title}</h1>
          {description ? <p className="mt-3 text-ink-700">{description}</p> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
      </div>
    </header>
  )
}

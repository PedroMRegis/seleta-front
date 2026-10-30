import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

interface StatusScreenProps {
  /** ícone grande no topo (Phosphor, ~48px) */
  icon: ReactNode
  eyebrow?: string
  title: string
  children?: ReactNode
  /** botões abaixo do texto */
  actions?: ReactNode
}

/** Tela centralizada de estado — confirmação de envio, acesso restrito, vazio. Mesmo layout em todo o site. */
export function StatusScreen({ icon, eyebrow, title, children, actions }: StatusScreenProps) {
  return (
    <section className="page-container page-section flex flex-col items-center text-center">
      <div className="flex max-w-xl flex-col items-center">
        {icon}
        {eyebrow ? (
          <div className="mt-6">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        ) : null}
        <h1 className="mt-4 text-4xl sm:text-5xl">{title}</h1>
        {children ? <div className="mt-4 w-full text-ink-700">{children}</div> : null}
        {actions ? <div className="mt-10 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
      </div>
    </section>
  )
}

import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AudienceSwitch, type Audience } from './AudienceSwitch'
import { Wordmark } from './Wordmark'

interface SiteHeaderProps {
  audience: Audience
  /** destino do wordmark */
  homeTo: string
  /** subtítulo em small-caps sob o wordmark */
  tagline: string
  /** navegação principal (use NavItem) — some quando vazia */
  nav?: ReactNode
  navLabel?: string
  /** ações à direita: conta, carrinho, pedido… */
  actions: ReactNode
}

/**
 * Header único do site: faixa "Para você | Para negócios" + barra com wordmark,
 * navegação e ações. Loja e negócios só trocam o conteúdo de cada espaço.
 * A partir de 768px a barra é sticky e completa; no celular ela só mostra a marca e
 * rola junto — navegação e ações ficam na BottomNav.
 */
export function SiteHeader({
  audience,
  homeTo,
  tagline,
  nav,
  navLabel = 'Navegação principal',
  actions,
}: SiteHeaderProps) {
  return (
    <>
      <AudienceSwitch active={audience} />
      <header className="z-40 border-b border-line bg-bone-50/95 backdrop-blur md:sticky md:top-0">
        <div className="page-container flex h-16 items-center gap-6 md:h-20">
          <Link
            to={homeTo}
            className="flex shrink-0 flex-col rounded-sm"
            aria-label={`Seleta ${tagline} — início`}
          >
            <Wordmark className="font-display text-2xl leading-none sm:text-3xl">Seleta</Wordmark>
            <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ink-500 [font-variant:small-caps]">
              {tagline}
            </span>
          </Link>

          {nav ? (
            <nav aria-label={navLabel} className="hidden min-w-0 flex-1 overflow-x-auto md:block">
              <div className="flex gap-1">{nav}</div>
            </nav>
          ) : (
            <div className="flex-1" />
          )}

          <div className="hidden shrink-0 items-center gap-2 md:flex">{actions}</div>
        </div>
      </header>
    </>
  )
}

interface NavItemProps {
  to: string
  children: ReactNode
  /** ativo só na rota exata (default) ou também nas filhas */
  end?: boolean
}

/** Item de navegação do header — pílula, ativa com fundo osso e negrito. */
export function NavItem({ to, children, end = true }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `whitespace-nowrap rounded-full px-3 py-2 text-sm transition ${
          isActive
            ? 'bg-bone-200 font-semibold text-ink-900'
            : 'text-ink-500 hover:bg-bone-100 hover:text-ink-900'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

/** Botão de conta do header — mesmo visual na loja e em negócios. */
export function AccountButton({
  label,
  icon,
  onClick,
}: {
  label: string
  icon: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink-700 transition hover:bg-bone-200"
    >
      {icon}
      {label}
    </button>
  )
}

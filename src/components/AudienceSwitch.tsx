import { Link } from 'react-router-dom'

export type Audience = 'pessoal' | 'negocios'

const OPTIONS: { id: Audience; label: string; to: string }[] = [
  { id: 'pessoal', label: 'Para você', to: '/' },
  { id: 'negocios', label: 'Para negócios', to: '/negocios' },
]

interface AudienceSwitchProps {
  active: Audience
}

/** Faixa fina no topo do site que alterna entre a loja (B2C) e a área de negócios (B2B). */
export function AudienceSwitch({ active }: AudienceSwitchProps) {
  return (
    <nav aria-label="Tipo de cliente" className="bg-ink-900">
      <div className="page-container flex gap-5">
        {OPTIONS.map(({ id, label, to }) => (
          <Link
            key={id}
            to={to}
            aria-current={id === active ? 'page' : undefined}
            className={`border-b-2 py-3 text-xs tracking-wide transition sm:py-2 ${
              id === active
                ? 'border-silver-300 text-bone-50'
                : 'border-transparent text-bone-100/60 hover:text-bone-50'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

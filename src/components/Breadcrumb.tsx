import { Fragment } from 'react'
import { Link, useMatches } from 'react-router-dom'

/** Rotas declaram seu rótulo em `handle: { crumb: 'Peixes' }` no router. */
interface CrumbHandle {
  crumb: string
}

function hasCrumb(handle: unknown): handle is CrumbHandle {
  return typeof handle === 'object' && handle !== null && 'crumb' in handle
}

/**
 * Trilha de navegação gerada da rota ativa: Início → … → página atual. Cada rota do
 * caminho que declara `handle.crumb` vira um passo; o último não é link.
 */
export function Breadcrumb() {
  const crumbs = useMatches()
    .filter((m) => hasCrumb(m.handle) && m.pathname !== '/')
    .map((m) => ({ label: (m.handle as CrumbHandle).crumb, to: m.pathname }))

  if (crumbs.length === 0) return null
  const trail = [{ label: 'Início', to: '/' }, ...crumbs]

  return (
    <nav aria-label="Trilha de navegação" className="text-xs text-ink-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1
          return (
            <Fragment key={crumb.to}>
              {i > 0 ? <li aria-hidden="true">/</li> : null}
              <li>
                {isLast ? (
                  <span aria-current="page" className="text-ink-700">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="underline-offset-2 hover:text-ink-900 hover:underline"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

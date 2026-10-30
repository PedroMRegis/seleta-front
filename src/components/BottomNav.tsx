import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

interface BottomNavBase {
  key: string
  label: string
  icon: ReactNode
  /** número no canto do ícone (carrinho, pedido) — some quando 0 */
  badge?: number
}

/** Item que navega para uma rota (fica ativo nela) ou que dispara uma ação (abrir carrinho, login…). */
export type BottomNavItem =
  | (BottomNavBase & { to: string; end?: boolean })
  | (BottomNavBase & { onClick: () => void; active?: boolean })

interface BottomNavProps {
  label: string
  items: BottomNavItem[]
}

/**
 * Navegação fixa no rodapé, só no celular (abaixo de 768px — a mesma regra de
 * `--bottom-nav-h` no index.css). Fica presa à base da tela mesmo rolando a página e
 * respeita a área segura do iPhone. Um espaçador evita que cubra o fim do conteúdo.
 */
export function BottomNav({ label, items }: BottomNavProps) {
  return (
    <>
      <Spacer aria-hidden="true" />
      <Bar aria-label={label}>
        <ul>
          {items.map((item) => {
            const content = (
              <>
                <span className="relative">
                  {item.icon}
                  {item.badge ? (
                    <span className="absolute -right-2.5 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brasa-500 px-1 text-[10px] font-bold text-bone-50">
                      {item.badge}
                    </span>
                  ) : null}
                </span>
                <span>{item.label}</span>
              </>
            )
            return (
              <li key={item.key}>
                {'to' in item ? (
                  <NavLink to={item.to} end={item.end ?? true}>
                    {content}
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    aria-current={item.active ? 'page' : undefined}
                  >
                    {content}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </Bar>
    </>
  )
}

// --- styled components ---

/** Reserva no fim da página a altura da barra (+ área segura), para o conteúdo não ficar por baixo. */
const Spacer = styled.div`
  height: calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px));
`

/** Barra fixa na base da tela; some a partir de 768px. Itens em colunas iguais; ativo em tinta, demais em cinza. */
const Bar = styled.nav`
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 40;
  border-top: 1px solid var(--color-line);
  background: rgba(248, 245, 239, 0.96);
  backdrop-filter: blur(8px);
  padding-bottom: env(safe-area-inset-bottom, 0px);

  @media (width >= 48rem) {
    display: none;
  }

  ul {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    height: var(--bottom-nav-h);
  }

  a,
  button {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--color-ink-500);
    transition: color 0.15s ease;
  }

  a.active,
  button[aria-current='page'] {
    color: var(--color-ink-900);
  }

  a:active,
  button:active {
    background: var(--color-bone-100);
  }
`

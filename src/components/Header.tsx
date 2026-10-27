import { User } from '@phosphor-icons/react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '@/features/auth'
import { CartButton } from '@/features/cart'
import { categories } from '@/features/products'

/**
 * Header global, sticky no topo. Linha 1: wordmark + entrar/conta + carrinho. Linha 2:
 * navegação por categoria (botões, não links — cada troca rola pro topo pela rota).
 * Carrinho e login são features transversais consumidas aqui pelo shell.
 */
export function Header() {
  const { isAuthenticated, user, openLogin, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bone-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex shrink-0 flex-col rounded-sm text-left"
          aria-label="Seleta — início"
        >
          <Wordmark className="font-display text-2xl leading-none sm:text-3xl">Seleta</Wordmark>
          <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ink-500 [font-variant:small-caps]">
            peixes &amp; carnes
          </span>
        </button>

        <nav aria-label="Categorias" className="min-w-0 flex-1 overflow-x-auto">
          <div className="flex gap-1">
            {categories.map((category) => {
              const active = pathname === `/${category.slug}`
              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => navigate(`/${category.slug}`)}
                  aria-current={active ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-sm transition ${
                    active
                      ? 'bg-bone-200 font-semibold text-ink-900'
                      : 'text-ink-500 hover:bg-bone-100 hover:text-ink-900'
                  }`}
                >
                  {category.name}
                </button>
              )
            })}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {isAuthenticated && user ? (
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-ink-700 transition hover:bg-bone-200"
            >
              <User size={18} aria-hidden="true" />
              <span className="hidden sm:inline">{user.email.split('@')[0] ?? user.email} · Sair</span>
              <span className="sm:hidden">Sair</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={openLogin}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-ink-700 transition hover:bg-bone-200"
            >
              <User size={18} aria-hidden="true" />
              Entrar
            </button>
          )}
          <CartButton />
        </div>
      </div>
    </header>
  )
}

// --- styled components ---

/** Wordmark com brilho prata (gradiente + background-clip:text); recai para steel-700 sólido quando o navegador não suporta background-clip:text. */
const Wordmark = styled.span`
  color: var(--color-steel-700);

  @supports (background-clip: text) or (-webkit-background-clip: text) {
    background-image: linear-gradient(
      90deg,
      var(--color-silver-300),
      var(--color-steel-700),
      var(--color-silver-400)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }
`

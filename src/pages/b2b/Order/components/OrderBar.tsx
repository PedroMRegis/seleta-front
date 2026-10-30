import { ArrowRight } from '@phosphor-icons/react'
import styled from 'styled-components'
import { ButtonLink } from '@/components/Button'
import { formatBRL } from '@/lib/format'

interface OrderBarProps {
  count: number
  total: number
}

/**
 * Barra flutuante do pedido em andamento, só abaixo de lg (lá a coluna do pedido não
 * cabe). Aparece com o primeiro item e leva à revisão. No celular fica logo acima da
 * navegação fixa do rodapé (--bottom-nav-h).
 */
export function OrderBar({ count, total }: OrderBarProps) {
  if (count === 0) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom,0px))] z-30 px-4 pb-3 sm:pb-6 lg:hidden">
      <Bar>
        <p className="text-sm">
          <span className="font-semibold">
            {count} {count === 1 ? 'item' : 'itens'}
          </span>
          <span className="text-bone-100/70"> · ≈ {formatBRL(total)}</span>
        </p>
        <ButtonLink to="/negocios/pedido/revisar" variant="inverse" size="sm">
          Revisar pedido
          <ArrowRight size={14} weight="bold" aria-hidden="true" />
        </ButtonLink>
      </Bar>
    </div>
  )
}

// --- styled components ---

/** Pílula escura centralizada com sombra profunda e entrada deslizando de baixo. */
const Bar = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: 36rem;
  margin: 0 auto;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  border-radius: 9999px;
  background: var(--color-ink-900);
  color: var(--color-bone-50);
  box-shadow: 0 20px 40px -16px rgba(23, 20, 15, 0.6);
  animation: bar-in 0.25s ease-out;

  @keyframes bar-in {
    from {
      transform: translateY(120%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

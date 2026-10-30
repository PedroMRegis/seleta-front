import type { ReactNode } from 'react'
import { X } from '@phosphor-icons/react'
import styled from 'styled-components'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'

interface FiltersDrawerProps {
  isOpen: boolean
  onClose: () => void
  /** quantos produtos os filtros atuais mostram — vai no botão de aplicar */
  total: number
  children: ReactNode
}

/** Gaveta de filtros para telas menores que xl (onde a coluna de filtros não cabe). Compõe o Modal base. */
export function FiltersDrawer({ isOpen, onClose, total, children }: FiltersDrawerProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Filtros"
      containerClassName="absolute left-0 top-0 h-full w-full max-w-sm"
    >
      <Panel>
        <div className="flex justify-end px-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar filtros"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition hover:bg-bone-200"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
        <div className="border-t border-line p-4">
          <Button fullWidth onClick={onClose}>
            Ver {total} {total === 1 ? 'produto' : 'produtos'}
          </Button>
        </div>
      </Panel>
    </Modal>
  )
}

// --- styled components ---

/** Painel da gaveta — altura total, fundo osso, entrando pela esquerda. */
const Panel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bone-50);
  box-shadow: 16px 0 40px -24px rgba(23, 20, 15, 0.5);
  animation: filters-in 0.2s ease-out;

  @keyframes filters-in {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`

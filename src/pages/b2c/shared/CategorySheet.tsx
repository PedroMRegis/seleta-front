import { CaretRight, X } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { categories } from '@/catalog'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { Modal } from '@/components/Modal'

interface CategorySheetProps {
  isOpen: boolean
  onClose: () => void
}

/** Folha que sobe da base (celular) com as categorias da loja. Compõe o Modal base. */
export function CategorySheet({ isOpen, onClose }: CategorySheetProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Categorias"
      containerClassName="absolute inset-x-0 bottom-0"
    >
      <Sheet>
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <h2 className="text-2xl">Categorias</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar categorias"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition hover:bg-bone-200"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <ul className="divide-y divide-line px-5 pb-4">
          {categories.map((category) => (
            <li key={category.slug}>
              <NavLink
                to={`/${category.slug}`}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 py-3 ${isActive ? 'font-semibold text-ink-900' : 'text-ink-700'}`
                }
              >
                <div className="w-12 shrink-0">
                  <ImagePlaceholder
                    tone={category.tone}
                    label={category.imageLabel}
                    aspect="1/1"
                    showCaption={false}
                  />
                </div>
                <span className="flex-1">{category.name}</span>
                <CaretRight size={16} className="text-ink-400" aria-hidden="true" />
              </NavLink>
            </li>
          ))}
        </ul>
      </Sheet>
    </Modal>
  )
}

// --- styled components ---

/** Folha com cantos superiores arredondados, respeitando a área segura e subindo da base. */
const Sheet = styled.div`
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 1.25rem 1.25rem 0 0;
  background: var(--color-bone-50);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  box-shadow: 0 -16px 40px -24px rgba(23, 20, 15, 0.5);
  animation: sheet-in 0.22s ease-out;

  @keyframes sheet-in {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`

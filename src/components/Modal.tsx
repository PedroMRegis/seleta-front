/* oxlint-disable jsx-a11y/prefer-tag-over-role -- diálogo acessível via role="dialog"; o <dialog> nativo traria backdrop/scroll próprios e mudaria o comportamento controlado aqui */
import { useEffect, useRef, type ReactNode } from 'react'
import styled from 'styled-components'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  /** rótulo acessível do diálogo (não há título visível garantido) */
  ariaLabel: string
  /** classe do container do diálogo — define o posicionamento (ex: drawer à direita) */
  containerClassName?: string
}

/**
 * Modal/overlay base — cuida do overlay escurecido, fechar no Esc, fechar clicando fora,
 * trava de scroll do body e semântica de diálogo. Outros modais/drawers compõem este,
 * nunca reimplementam overlay/fechamento do zero.
 */
export function Modal({ isOpen, onClose, children, ariaLabel, containerClassName }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <Root className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink-900/50"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={containerClassName}
      >
        {children}
      </div>
    </Root>
  )
}

// --- styled components ---

/** Raiz do modal com leve fade-in ao abrir. */
const Root = styled.div`
  animation: modal-fade 0.15s ease-out;

  @keyframes modal-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

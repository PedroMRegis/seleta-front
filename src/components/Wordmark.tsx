import type { ReactNode } from 'react'
import styled from 'styled-components'

interface WordmarkProps {
  children: ReactNode
  className?: string
}

/** Wordmark "Seleta" com brilho prata — usado nos headers B2C e B2B. */
export function Wordmark({ children, className }: WordmarkProps) {
  return (
    <span className={className}>
      <Shine>{children}</Shine>
    </span>
  )
}

// --- styled components ---

/** Texto com brilho prata (gradiente + background-clip:text); recai para steel-700 sólido quando o navegador não suporta background-clip:text. */
const Shine = styled.span`
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

import type { ReactNode } from 'react'
import styled from 'styled-components'

/** neutral = padrão · mar/brasa = acento da linha (peixe/carne) · light = sobre fundo escuro */
export type EyebrowTone = 'neutral' | 'mar' | 'brasa' | 'light'

interface EyebrowProps {
  tone?: EyebrowTone
  children: ReactNode
}

/** Rótulo pequeno em caixa alta acima de títulos — o mesmo em todo o site. */
export function Eyebrow({ tone = 'neutral', children }: EyebrowProps) {
  return <Label $tone={tone}>{children}</Label>
}

// --- styled components ---

const TONE_COLOR: Record<EyebrowTone, string> = {
  neutral: 'var(--color-ink-500)',
  mar: 'var(--color-mar-500)',
  brasa: 'var(--color-brasa-500)',
  light: 'var(--color-silver-300)',
}

/** Caixa alta, 12px, espaçamento largo; cor conforme o tom. */
const Label = styled.p<{ $tone: EyebrowTone }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ $tone }) => TONE_COLOR[$tone]};
`

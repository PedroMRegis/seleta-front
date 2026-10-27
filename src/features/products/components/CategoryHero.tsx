import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import type { ProductLine } from '../types'

interface CategoryHeroProps {
  /** nome da categoria (ex: "Peixes") */
  name: string
  /** linha — governa o acento de cor (peixe = mar, carne = brasa) */
  line: ProductLine
  /** frase de vitrine curta abaixo do título */
  tagline: string
  /** cor e legenda do placeholder de imagem grande da categoria */
  tone: string
  imageLabel: string
}

const LINE_LABEL: Record<ProductLine, string> = {
  peixe: 'Do mar',
  carne: 'Da terra',
}

/**
 * Topo de página de categoria — migalha de volta pra Home, eyebrow da linha, título,
 * tagline e um placeholder de imagem grande. O acento de cor muda conforme a linha.
 */
export function CategoryHero({ name, line, tagline, tone, imageLabel }: CategoryHeroProps) {
  const navigate = useNavigate()

  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-8 pt-8 sm:px-6 sm:pt-12 lg:px-8">
      <nav className="mb-6 text-xs text-ink-500" aria-label="Trilha de navegação">
        <button type="button" onClick={() => navigate('/')} className="underline-offset-2 hover:underline">
          Início
        </button>
        <span aria-hidden="true"> / </span>
        <span className="text-ink-700">{name}</span>
      </nav>

      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <Eyebrow $line={line}>{LINE_LABEL[line]}</Eyebrow>
          <h1 className="mt-3 text-4xl sm:text-5xl">{name}</h1>
          <p className="mt-4 max-w-md text-base text-ink-700">{tagline}</p>
        </div>
        <ImagePlaceholder tone={tone} label={imageLabel} aspect="4/3" />
      </div>
    </section>
  )
}

// --- styled components ---

/** Eyebrow com a cor da linha (mar/brasa), em small-caps espaçado. */
const Eyebrow = styled.span<{ $line: ProductLine }>`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${({ $line }) => ($line === 'peixe' ? 'var(--color-mar-500)' : 'var(--color-brasa-500)')};
`

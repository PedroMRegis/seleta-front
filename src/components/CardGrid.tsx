import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'

type Columns = 1 | 2 | 3 | 4 | 5

interface CardGridProps {
  /** colunas no celular (padrão 1) */
  base?: Columns
  /** colunas a partir de cada breakpoint */
  sm?: Columns
  lg?: Columns
  xl?: Columns
  /** renderiza como lista (filhos devem ser <li>) */
  as?: 'div' | 'ul'
  children: ReactNode
}

/**
 * Grade de cards do site. Colunas fixas por breakpoint e a última linha incompleta
 * centralizada — nunca sobram cards encostados num lado só.
 */
export function CardGrid({ base = 1, sm = 2, lg = 3, xl, as = 'div', children }: CardGridProps) {
  return (
    <Grid as={as} $base={base} $sm={sm} $lg={lg} $xl={xl ?? lg}>
      {children}
    </Grid>
  )
}

// --- styled components ---

/** Largura de cada card para `n` colunas, descontando os gaps. */
const basis = (n: Columns) => css`
  & > * {
    flex-basis: calc((100% - var(--grid-gap) * ${n - 1}) / ${n});
  }
`

/** Flex com quebra e centralização; a base de cada item define as colunas por breakpoint. */
const Grid = styled.div<{ $base: Columns; $sm: Columns; $lg: Columns; $xl: Columns }>`
  --grid-gap: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--grid-gap);
  list-style: none;

  & > * {
    flex-grow: 0;
    flex-shrink: 0;
    min-width: 0;
  }

  ${({ $base }) => basis($base)}

  @media (min-width: 640px) {
    --grid-gap: 1.5rem;
    ${({ $sm }) => basis($sm)}
  }
  @media (min-width: 1024px) {
    ${({ $lg }) => basis($lg)}
  }
  @media (min-width: 1280px) {
    ${({ $xl }) => basis($xl)}
  }
`

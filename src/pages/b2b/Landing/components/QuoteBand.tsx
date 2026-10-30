import styled from 'styled-components'
import { ButtonLink } from '@/components/Button'
import { SectionHeading } from '@/components/SectionHeading'

interface QuoteBandProps {
  isAuthenticated: boolean
}

/** Faixa escura de cotação — o caminho para volume grande ou compra recorrente. */
export function QuoteBand({ isAuthenticated }: QuoteBandProps) {
  return (
    <Band>
      <div className="page-container page-section">
        <SectionHeading
          inverse
          flush
          eyebrow="Cotação"
          title="Volume grande ou compra recorrente?"
          description="Conte o que sua operação precisa e com que frequência. Respondemos com os valores para o seu volume."
          aside={
            <ButtonLink
              to={isAuthenticated ? '/negocios/cotacao' : '/negocios/parceria'}
              variant="inverse"
              size="lg"
            >
              {isAuthenticated ? 'Pedir cotação' : 'Solicitar cotação'}
            </ButtonLink>
          }
        />
      </div>
    </Band>
  )
}

// --- styled components ---

/** Faixa em tinta carvão com um brilho de aço no canto — o "prata" da marca. */
const Band = styled.section`
  background:
    radial-gradient(50rem 24rem at 100% 0%, rgba(164, 170, 178, 0.2), transparent 60%),
    var(--color-ink-900);
`

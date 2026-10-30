import heroFish from '@/assets/hero_fish.png'
import { Button, ButtonLink } from '@/components/Button'
import { HeroBanner } from '@/components/HeroBanner'

interface LandingHeroProps {
  isAuthenticated: boolean
  onLogin: () => void
}

/**
 * Abertura da vitrine B2B, sobre o HeroBanner padrão — com as duas portas de entrada
 * (solicitar cotação / entrar). Cliente logado vai direto para o pedido.
 */
export function LandingHero({ isAuthenticated, onLogin }: LandingHeroProps) {
  return (
    <HeroBanner
      image={heroFish}
      imageAlt="Peixe fresco sobre gelo"
      eyebrow="Seleta para negócios"
      title="A curadoria da casa, na escala da sua cozinha."
      description="Peixes, frutos do mar e carnes selecionados para restaurantes, hotéis, bufês e empórios."
      actions={
        isAuthenticated ? (
          <ButtonLink to="/negocios/pedido" variant="inverse" size="lg">
            Fazer pedido
          </ButtonLink>
        ) : (
          <>
            <ButtonLink to="/negocios/parceria" variant="inverse" size="lg">
              Solicitar cotação
            </ButtonLink>
            <Button variant="inverseOutline" size="lg" onClick={onLogin}>
              Já sou cliente
            </Button>
          </>
        )
      }
    />
  )
}

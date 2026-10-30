import heroFish from '@/assets/hero_fish.png'
import { ButtonAnchor } from '@/components/Button'
import { HeroBanner } from '@/components/HeroBanner'

/** Abertura da Home da loja, sobre o HeroBanner padrão. O CTA rola até as categorias. */
export function Hero() {
  return (
    <HeroBanner
      image={heroFish}
      imageAlt="Peixe fresco sobre gelo"
      eyebrow="Empório de peixes & carnes"
      title="Do mar e da terra, a seleta escolha."
      description="Peças selecionadas de peixes, frutos do mar e carnes — pesadas na loja e entregues frescas até você."
      actions={
        <ButtonAnchor href="#categorias" variant="inverse" size="lg">
          Ver a seleção
        </ButtonAnchor>
      }
    />
  )
}

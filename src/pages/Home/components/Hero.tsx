import heroFish from '@/assets/hero_fish.png'

/**
 * Hero da Home — imagem de fundo escura (peixe no gelo) com scrim em gradiente pra
 * garantir contraste do texto claro por cima. CTA leva à seção de categorias.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[440px] items-center overflow-hidden sm:min-h-[520px]">
      <img
        src={heroFish}
        alt="Peixe fresco sobre gelo"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/60 to-ink-900/20" />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-silver-300 [font-variant:small-caps]">
            Empório de peixes &amp; carnes
          </p>
          <h1 className="mt-4 text-4xl text-bone-50 sm:text-5xl lg:text-6xl">
            Do mar e da terra, a seleta escolha.
          </h1>
          <p className="mt-4 max-w-md text-bone-100/90">
            Peças selecionadas de peixes, frutos do mar e carnes — pesadas na loja e entregues
            frescas até você.
          </p>
          <a
            href="#categorias"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-bone-50 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:bg-bone-200 active:scale-[0.99]"
          >
            Ver a seleção
          </a>
        </div>
      </div>
    </section>
  )
}

import styled from 'styled-components'

/** Proporções suportadas pelo bloco de placeholder. */
type Aspect = '4/3' | '1/1' | '16/9' | '21/9'

interface ImagePlaceholderProps {
  /** cor de fundo do bloco — vem do dado (ex: product.tone, category.tone) */
  tone: string
  /** legenda do que vai entrar ali quando houver foto real */
  label: string
  /** proporção do bloco — default '4/3' */
  aspect?: Aspect
  /** proporção a partir de 768px, quando diferente (ex: mais baixa no celular, 4/3 no desktop) */
  mdAspect?: Aspect
  /** cantos arredondados — default true */
  rounded?: boolean
  /** mostra a pílula de legenda e o ícone — desligar em miniaturas — default true */
  showCaption?: boolean
  className?: string
}

const ASPECT_CLASS: Record<Aspect, string> = {
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '16/9': 'aspect-[16/9]',
  '21/9': 'aspect-[21/9]',
}

/** Mesmas proporções a partir de 768px — strings literais para o Tailwind gerar as classes. */
const MD_ASPECT_CLASS: Record<Aspect, string> = {
  '4/3': 'md:aspect-[4/3]',
  '1/1': 'md:aspect-square',
  '16/9': 'md:aspect-[16/9]',
  '21/9': 'md:aspect-[21/9]',
}

/**
 * Bloco colorido com legenda — placeholder de imagem enquanto não há fotos reais do
 * produto/categoria. UI pura: não sabe de onde vem o dado, só recebe `tone` (cor) e
 * `label` (legenda). A pílula de legenda é sempre bone/ink pra garantir contraste
 * independente da cor de fundo recebida.
 */
export function ImagePlaceholder({
  tone,
  label,
  aspect = '4/3',
  mdAspect,
  rounded = true,
  showCaption = true,
  className,
}: ImagePlaceholderProps) {
  const classes = [
    'relative overflow-hidden',
    ASPECT_CLASS[aspect],
    mdAspect ? MD_ASPECT_CLASS[mdAspect] : '',
    rounded ? 'rounded-xl' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    // role="img" é intencional aqui: é um bloco de cor (não uma <img> real, pois ainda
    // não há foto), exposto como imagem pro leitor de tela via aria-label.
    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
    <Surface role="img" aria-label={label} className={classes} style={{ backgroundColor: tone }}>
      {showCaption ? (
        <>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="absolute right-2 top-2 h-5 w-5 text-white/55"
          >
            <path
              fill="currentColor"
              d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v10h14V7H5Zm2 8 3.5-4.5 2.5 3 2-2.5L17 15H7Z"
            />
          </svg>
          <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-bone-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-700">
            Foto &middot; {label}
          </span>
        </>
      ) : null}
    </Surface>
  )
}

// --- styled components ---

/** Fundo colorido dinâmico (tone vem do dado, por isso é style inline) com textura diagonal sutil que marca visualmente o bloco como placeholder. */
const Surface = styled.div`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0px,
      rgba(255, 255, 255, 0.08) 2px,
      transparent 2px,
      transparent 12px
    );
    pointer-events: none;
  }
`

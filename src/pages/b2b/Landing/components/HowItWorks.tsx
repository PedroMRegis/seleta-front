import { SectionHeading } from '@/components/SectionHeading'

const STEPS = [
  {
    title: 'Solicite uma cotação',
    text: 'Conte o que sua operação precisa. Preparamos uma proposta para o seu volume.',
  },
  {
    title: 'Feche a parceria',
    text: 'Com a parceria formalizada, liberamos sua conta com preços e pedidos online.',
  },
  {
    title: 'Peça pela carta',
    text: 'Catálogo com preço por kg, listas salvas e pedidos repetidos. Pesamos cada item.',
  },
  {
    title: 'Pague e receba',
    text: 'Pagamento liberado por e-mail — na entrega, cartão ou pix. Entrega ou retirada na loja.',
  },
]

/** "Como funciona" — os quatro passos reais do pedido B2B, numerados em serifa grande. */
export function HowItWorks() {
  return (
    <section className="border-y border-line bg-bone-100">
      <div className="page-container page-section">
        <SectionHeading eyebrow="Como funciona" title="Da cotação à entrega." />

        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ title, text }, index) => (
            <li key={title} className="border-t border-ink-900 pt-6">
              <span className="font-display text-5xl text-steel-500">{index + 1}</span>
              <h3 className="mt-4 text-xl">{title}</h3>
              <p className="mt-2 text-sm text-ink-700">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

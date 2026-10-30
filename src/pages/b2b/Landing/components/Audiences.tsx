import { SectionHeading } from '@/components/SectionHeading'

const AUDIENCES = [
  {
    title: 'Restaurantes',
    text: 'Peixes, frutos do mar e cortes para o cardápio, com reposição sem retrabalho: repita o pedido da semana em um clique.',
  },
  {
    title: 'Hotéis e bufês',
    text: 'Volume para a operação diária e para eventos, com a data de entrega combinada no próprio pedido.',
  },
  {
    title: 'Empórios',
    text: 'A seleção da Seleta para a sua vitrine, com cotação para compras recorrentes.',
  },
]

/** "Para quem" — os três perfis atendidos, em colunas editoriais separadas por filete. */
export function Audiences() {
  return (
    <section className="page-container page-section">
      <SectionHeading eyebrow="Para quem" title="Feito para quem cozinha todos os dias." />

      <ul className="grid gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line">
        {AUDIENCES.map(({ title, text }) => (
          <li key={title} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
            <h3 className="text-2xl">{title}</h3>
            <p className="mt-3 text-ink-700">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

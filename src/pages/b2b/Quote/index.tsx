import { useState } from 'react'
import { CheckCircle } from '@phosphor-icons/react'
import { ButtonLink } from '@/components/Button'
import { StatusScreen } from '@/components/StatusScreen'
import { StepsCard } from '@/components/StepsCard'
import { catalog } from '@/catalog'
import { BusinessPage, useBusinessOrder, useDraftItems } from '@/pages/b2b/shared'
import { QuoteFormView } from './components/QuoteFormView'

const STEPS = [
  'Você envia os produtos, volumes e a frequência.',
  'Analisamos a demanda com a equipe da loja.',
  'Respondemos por e-mail com os valores para o seu volume.',
]

/** Cotação de clientes (/negocios/cotacao) — formulário | como funciona. */
export function Quote() {
  const { submitOrder } = useBusinessOrder()
  const { items } = useDraftItems(catalog)
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <StatusScreen
        icon={<CheckCircle size={48} weight="light" className="text-mar-500" aria-hidden="true" />}
        title="Cotação enviada."
        actions={
          <>
            <ButtonLink to="/negocios/pedido">Voltar ao pedido</ButtonLink>
            <ButtonLink to="/negocios/listas" variant="secondary">
              Ver histórico
            </ButtonLink>
          </>
        }
      >
        Vamos analisar os itens e volumes e responder por e-mail com os valores.
      </StatusScreen>
    )
  }

  return (
    <BusinessPage
      title="Pedir cotação"
      description="Para volume grande ou compra recorrente. Conte o que sua operação precisa e com que frequência."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0">
          <QuoteFormView
            draftItems={items}
            onSubmit={({ includeDraft, frequency, startDate, description }) => {
              submitOrder(includeDraft ? items : [], {
                kind: 'cotacao',
                frequency,
                deliveryDate: startDate || null,
                notes: description,
              })
              setSent(true)
            }}
          />
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <StepsCard title="Como funciona" steps={STEPS} />
        </aside>
      </div>
    </BusinessPage>
  )
}

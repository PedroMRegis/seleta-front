import { useState } from 'react'
import { Button, ButtonLink } from '@/components/Button'
import { catalog } from '@/catalog'
import {
  BusinessPage,
  useBusinessOrder,
  useDraftItems,
  type BusinessOrder,
} from '@/pages/b2b/shared'
import { DeliveryPanel } from './components/DeliveryPanel'
import { OrderSent } from './components/OrderSent'
import { ReviewTable } from './components/ReviewTable'
import { SaveListModal } from './components/SaveListModal'

/** Revisão e envio do pedido B2B (/negocios/pedido/revisar) — itens | entrega e pagamento. */
export function Review() {
  const { draft, setQuantity, clearDraft, submitOrder } = useBusinessOrder()
  const { items, total } = useDraftItems(catalog)
  const [isSaveOpen, setSaveOpen] = useState(false)
  const [sent, setSent] = useState<BusinessOrder | null>(null)

  if (sent) return <OrderSent order={sent} />

  const products = catalog.filter((p) => (draft[p.id] ?? 0) > 0)

  return (
    <BusinessPage
      title="Revisar pedido"
      description="Confira as quantidades, diga quando quer receber e envie."
      back={{ to: '/negocios/pedido', label: 'Continuar escolhendo' }}
      actions={
        products.length > 0 ? (
          <>
            <Button variant="secondary" size="sm" onClick={() => setSaveOpen(true)}>
              Salvar como lista
            </Button>
            <Button variant="ghost" size="sm" onClick={clearDraft}>
              Esvaziar
            </Button>
          </>
        ) : null
      }
    >
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
          <p className="text-ink-700">Seu pedido está vazio.</p>
          <div className="mt-6">
            <ButtonLink to="/negocios/pedido">Escolher produtos</ButtonLink>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <ReviewTable products={products} quantities={draft} onQuantityChange={setQuantity} />
          <aside aria-label="Entrega e pagamento" className="lg:sticky lg:top-28 lg:self-start">
            <DeliveryPanel
              total={total}
              onSubmit={(values) => setSent(submitOrder(items, { kind: 'pedido', ...values }))}
            />
          </aside>
        </div>
      )}

      <SaveListModal isOpen={isSaveOpen} onClose={() => setSaveOpen(false)} />
    </BusinessPage>
  )
}

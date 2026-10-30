import { useNavigate } from 'react-router-dom'
import { ButtonLink } from '@/components/Button'
import { catalog } from '@/catalog'
import { BusinessPage, itemsToLines, useBusinessOrder } from '@/pages/b2b/shared'
import { OrderHistory } from './components/OrderHistory'
import { SavedLists } from './components/SavedLists'

/** Listas salvas e histórico (/negocios/listas) — usar ou repetir leva direto à revisão. */
export function Lists() {
  const navigate = useNavigate()
  const { lists, orders, loadLines, deleteList } = useBusinessOrder()
  const goToReview = () => navigate('/negocios/pedido/revisar')

  return (
    <BusinessPage
      title="Listas e histórico"
      description="Use uma lista ou repita um pedido — você ajusta as quantidades antes de enviar."
      actions={
        <ButtonLink to="/negocios/pedido" size="sm">
          Novo pedido
        </ButtonLink>
      }
    >
      <div className="flex flex-col gap-14">
        <section aria-labelledby="listas-title">
          <h2
            id="listas-title"
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-500"
          >
            Listas salvas ({lists.length})
          </h2>
          <SavedLists
            lists={lists}
            products={catalog}
            onUse={(list) => {
              loadLines(list.lines)
              goToReview()
            }}
            onDelete={deleteList}
          />
        </section>

        <section aria-labelledby="historico-title">
          <h2
            id="historico-title"
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-500"
          >
            Histórico ({orders.length})
          </h2>
          <OrderHistory
            orders={orders}
            onRepeat={(order) => {
              loadLines(itemsToLines(order.items))
              goToReview()
            }}
          />
        </section>
      </div>
    </BusinessPage>
  )
}

import { Button } from '@/components/Button'
import { formatDate, formatIsoDay } from '@/lib/date'
import { formatBRL } from '@/lib/format'
import type { BusinessOrder, QuoteFrequency } from '@/pages/b2b/shared'

const FREQUENCY_LABEL: Record<QuoteFrequency, string> = {
  pontual: 'pontual',
  semanal: 'semanal',
  quinzenal: 'quinzenal',
  mensal: 'mensal',
}

interface OrderHistoryProps {
  orders: BusinessOrder[]
  onRepeat: (order: BusinessOrder) => void
}

/** Pedidos e cotações enviados, do mais recente ao mais antigo. Repetir só quando há itens. */
export function OrderHistory({ orders, onRepeat }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-line px-6 py-14 text-center text-ink-700">
        Nenhum pedido ou cotação enviado ainda.
      </p>
    )
  }

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-bone-50">
      {orders.map((order) => {
        const isQuote = order.kind === 'cotacao'
        return (
          <li
            key={order.id}
            className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
          >
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">
                {isQuote ? `Cotação ${FREQUENCY_LABEL[order.frequency]}` : 'Pedido'} ·{' '}
                {formatDate(order.createdAt)}
              </p>
              <p className="mt-2 truncate text-ink-900">
                {order.items.length > 0
                  ? order.items.map((i) => i.name).join(' · ')
                  : order.notes || 'Cotação sem itens da carta'}
              </p>
              {order.deliveryDate ? (
                <p className="mt-1 text-sm text-ink-500">
                  {isQuote ? 'A partir de' : 'Entrega desejada'}: {formatIsoDay(order.deliveryDate)}
                </p>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-6">
              {order.items.length > 0 ? (
                <>
                  <span className="font-semibold tabular-nums text-ink-900">
                    ≈ {formatBRL(order.estimatedTotal)}
                  </span>
                  <Button variant="secondary" size="sm" onClick={() => onRepeat(order)}>
                    Repetir
                  </Button>
                </>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

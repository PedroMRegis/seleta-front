import { ClipboardText, X } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/Button'
import { formatBRL } from '@/lib/format'
import { formatQuantity, type OrderItem } from '@/pages/b2b/shared'

interface OrderPanelProps {
  items: OrderItem[]
  total: number
  hasLists: boolean
  onRemove: (productId: string) => void
}

/**
 * Coluna do pedido em andamento: itens, total estimado e "Revisar e enviar". A lista
 * rola por dentro, então o total e os botões ficam sempre visíveis.
 */
export function OrderPanel({ items, total, hasLists, onRemove }: OrderPanelProps) {
  return (
    <div className="flex max-h-[calc(100vh-8rem)] flex-col rounded-2xl border border-line bg-bone-100">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-line px-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">
          Seu pedido
        </h2>
        <span className="text-sm tabular-nums text-ink-500">
          {items.length} {items.length === 1 ? 'item' : 'itens'}
        </span>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
          <ClipboardText size={32} weight="light" className="text-ink-400" aria-hidden="true" />
          <p className="text-sm text-ink-700">Use “Adicionar” na lista para montar o pedido.</p>
          {hasLists ? (
            <ButtonLink to="/negocios/listas" variant="secondary" size="sm">
              Usar uma lista salva
            </ButtonLink>
          ) : null}
        </div>
      ) : (
        <>
          <ul className="min-h-0 flex-1 divide-y divide-line overflow-y-auto px-5">
            {items.map((item) => (
              <li key={item.productId} className="flex items-start gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-900">{item.name}</p>
                  <p className="text-xs tabular-nums text-ink-500">
                    {formatQuantity(item.quantity, item)} · ≈{' '}
                    {formatBRL(item.price * item.quantity)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Remover ${item.name}`}
                  onClick={() => onRemove(item.productId)}
                  className="rounded-full p-1 text-ink-400 transition hover:bg-bone-200 hover:text-brasa-500"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <div className="shrink-0 border-t border-line px-5 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-ink-500">Total estimado</span>
              <span className="font-display text-2xl tabular-nums text-ink-900">
                ≈ {formatBRL(total)}
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-500">O valor final segue a pesagem.</p>
            <div className="mt-5">
              <ButtonLink to="/negocios/pedido/revisar" fullWidth>
                Revisar e enviar
              </ButtonLink>
            </div>
          </div>
        </>
      )}

      <p className="shrink-0 border-t border-line px-5 py-3 text-center text-xs text-ink-500">
        Volume grande ou recorrente?{' '}
        <Link
          to="/negocios/cotacao"
          className="font-semibold text-ink-900 underline underline-offset-4"
        >
          Peça uma cotação
        </Link>
      </p>
    </div>
  )
}

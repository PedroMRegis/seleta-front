import { Trash } from '@phosphor-icons/react'
import { Button, ButtonLink } from '@/components/Button'
import { CardGrid } from '@/components/CardGrid'
import type { Product } from '@/catalog'
import { formatDate } from '@/lib/date'
import { formatBRL } from '@/lib/format'
import { itemsTotal, resolveItems, type SavedList } from '@/pages/b2b/shared'

interface SavedListsProps {
  lists: SavedList[]
  products: Product[]
  onUse: (list: SavedList) => void
  onDelete: (id: string) => void
}

/** Listas salvas para recompra, em cartões. Usar uma lista substitui o pedido em andamento. */
export function SavedLists({ lists, products, onUse, onDelete }: SavedListsProps) {
  if (lists.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line px-6 py-14 text-center">
        <p className="text-ink-700">Nenhuma lista salva ainda.</p>
        <p className="mt-1 text-sm text-ink-500">
          Na revisão do pedido, use “Salvar como lista” para guardar compras recorrentes.
        </p>
        <div className="mt-6">
          <ButtonLink to="/negocios/pedido" variant="secondary" size="sm">
            Ir para a carta
          </ButtonLink>
        </div>
      </div>
    )
  }

  return (
    <CardGrid as="ul" sm={2} lg={3}>
      {lists.map((list) => {
        const items = resolveItems(products, list.lines)
        return (
          <li
            key={list.id}
            className="flex flex-col rounded-2xl border border-line bg-bone-100 p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-2xl">{list.name}</h3>
              <button
                type="button"
                aria-label={`Excluir lista ${list.name}`}
                onClick={() => onDelete(list.id)}
                className="rounded-full p-1.5 text-ink-400 transition hover:bg-bone-200 hover:text-brasa-500"
              >
                <Trash size={16} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-1 text-xs text-ink-500">
              {items.length} {items.length === 1 ? 'item' : 'itens'} · salva em{' '}
              {formatDate(list.updatedAt)}
            </p>
            <p className="mt-4 line-clamp-3 text-sm text-ink-700">
              {items.map((i) => i.name).join(' · ')}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
              <span className="text-sm tabular-nums text-ink-500">
                ≈ {formatBRL(itemsTotal(items))}
              </span>
              <Button size="sm" onClick={() => onUse(list)}>
                Usar lista
              </Button>
            </div>
          </li>
        )
      })}
    </CardGrid>
  )
}

import { FadersHorizontal, MagnifyingGlass, X } from '@phosphor-icons/react'
import { Select } from '@/components/FormField'
import type { SortKey } from '../hooks/useCatalogFilters'

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'categoria', label: 'Por categoria' },
  { value: 'nome', label: 'Nome (A–Z)' },
  { value: 'preco-asc', label: 'Menor preço' },
  { value: 'preco-desc', label: 'Maior preço' },
]

interface SearchBarProps {
  query: string
  onQueryChange: (query: string) => void
  sort: SortKey
  onSortChange: (sort: SortKey) => void
  total: number
  activeFilters: number
  /** abre a gaveta de filtros (o botão só aparece abaixo de xl) */
  onOpenFilters: () => void
}

/** Topo da coluna de produtos: busca larga, botão de filtros (telas menores), contagem e ordenação. */
export function SearchBar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  total,
  activeFilters,
  onOpenFilters,
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <label className="relative block flex-1">
          <span className="sr-only">Buscar produto</span>
          <MagnifyingGlass
            size={20}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar produto — ex.: salmão, picanha, camarão"
            className="h-12 w-full rounded-full border border-line bg-bone-50 pl-12 pr-11 text-base text-ink-900 placeholder:text-ink-400 hover:border-silver-400 focus:border-steel-500 focus:outline-2 focus:outline-offset-1 focus:outline-steel-500 [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Limpar busca"
              className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-500 hover:bg-bone-200"
            >
              <X size={14} aria-hidden="true" />
            </button>
          ) : null}
        </label>
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-ink-900 transition hover:border-silver-400 xl:hidden"
        >
          <FadersHorizontal size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Filtros</span>
          {activeFilters > 0 ? (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink-900 px-1.5 text-[11px] text-bone-50">
              {activeFilters}
            </span>
          ) : null}
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-500" aria-live="polite">
          {total} {total === 1 ? 'produto' : 'produtos'}
        </p>
        <div className="flex items-center gap-2 text-sm text-ink-500">
          <label htmlFor="ordenar" className="hidden sm:inline">
            Ordenar
          </label>
          <div className="w-44">
            <Select
              id="ordenar"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              aria-label="Ordenar produtos"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

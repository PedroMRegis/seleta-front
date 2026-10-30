import type { ReactNode } from 'react'
import type { Category, CategorySlug } from '@/catalog'
import type { CatalogFilters, LineFilter, PriceBand } from '../hooks/useCatalogFilters'

const LINES: { value: LineFilter; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'peixe', label: 'Do mar' },
  { value: 'carne', label: 'Da terra' },
]

const PRICES: { value: PriceBand; label: string }[] = [
  { value: 'todas', label: 'Qualquer preço' },
  { value: 'ate-50', label: 'Até R$ 50' },
  { value: '50-100', label: 'R$ 50 a R$ 100' },
  { value: 'acima-100', label: 'Acima de R$ 100' },
]

interface FiltersPanelProps {
  /** prefixo dos names dos inputs — o painel aparece na lateral e na gaveta ao mesmo tempo */
  idPrefix: string
  filters: CatalogFilters
  categories: Category[]
  categoryCounts: Record<CategorySlug, number>
  /** itens no pedido em andamento */
  draftCount: number
  activeCount: number
  onToggleCategory: (slug: CategorySlug) => void
  onChange: (patch: Partial<CatalogFilters>) => void
  onClear: () => void
}

/** Filtros da carta: categoria (múltipla), linha, faixa de preço e "só no pedido". */
export function FiltersPanel({
  idPrefix,
  filters,
  categories,
  categoryCounts,
  draftCount,
  activeCount,
  onToggleCategory,
  onChange,
  onClear,
}: FiltersPanelProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex h-9 items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">Filtros</h2>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="rounded-full px-2 py-1 text-sm font-semibold text-ink-900 underline underline-offset-4 hover:text-steel-700"
          >
            Limpar ({activeCount})
          </button>
        ) : null}
      </div>

      <Group legend="Categoria">
        {categories.map((c) => (
          <Option
            key={c.slug}
            type="checkbox"
            name={`${idPrefix}-categoria`}
            label={c.name}
            count={categoryCounts[c.slug]}
            checked={filters.categories.includes(c.slug)}
            onChange={() => onToggleCategory(c.slug)}
          />
        ))}
      </Group>

      <Group legend="Linha">
        {LINES.map((l) => (
          <Option
            key={l.value}
            type="radio"
            name={`${idPrefix}-linha`}
            label={l.label}
            checked={filters.line === l.value}
            onChange={() => onChange({ line: l.value })}
          />
        ))}
      </Group>

      <Group legend="Preço por kg ou unidade">
        {PRICES.map((p) => (
          <Option
            key={p.value}
            type="radio"
            name={`${idPrefix}-preco`}
            label={p.label}
            checked={filters.price === p.value}
            onChange={() => onChange({ price: p.value })}
          />
        ))}
      </Group>

      <Group legend="Pedido">
        <Option
          type="checkbox"
          name={`${idPrefix}-no-pedido`}
          label="Só itens no pedido"
          count={draftCount}
          checked={filters.onlyInOrder}
          onChange={() => onChange({ onlyInOrder: !filters.onlyInOrder })}
        />
      </Group>
    </div>
  )
}

/** Bloco de filtro com legenda e filete. */
function Group({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-5">
      <legend className="float-left mb-3 w-full text-sm font-semibold text-ink-900">
        {legend}
      </legend>
      <div className="clear-left flex flex-col gap-1">{children}</div>
    </fieldset>
  )
}

interface OptionProps {
  type: 'checkbox' | 'radio'
  name: string
  label: string
  count?: number
  checked: boolean
  onChange: () => void
}

/** Linha de opção (checkbox ou rádio nativo) com contagem opcional à direita. */
function Option({ type, name, label, count, checked, onChange }: OptionProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-ink-700 transition hover:bg-bone-100">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-ink-900"
      />
      <span className={`flex-1 ${checked ? 'font-semibold text-ink-900' : ''}`}>{label}</span>
      {count !== undefined ? (
        <span className="text-xs tabular-nums text-ink-400">{count}</span>
      ) : null}
    </label>
  )
}

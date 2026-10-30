import { useMemo, useState } from 'react'
import type { Category, CategorySlug, Product, ProductLine } from '@/catalog'
import { normalizeSearch } from '@/lib/text'

export type SortKey = 'categoria' | 'nome' | 'preco-asc' | 'preco-desc'
export type LineFilter = 'todas' | ProductLine
export type PriceBand = 'todas' | 'ate-50' | '50-100' | 'acima-100'

export interface CatalogFilters {
  query: string
  /** vazio = todas as categorias */
  categories: CategorySlug[]
  line: LineFilter
  price: PriceBand
  onlyInOrder: boolean
  sort: SortKey
}

export interface CatalogGroup {
  category: Category
  products: Product[]
}

/** Grupo de linhas da lista: com título (ordenação por categoria) ou uma lista corrida. */
export interface ResultSection {
  title: string | null
  products: Product[]
}

const INITIAL: CatalogFilters = {
  query: '',
  categories: [],
  line: 'todas',
  price: 'todas',
  onlyInOrder: false,
  sort: 'categoria',
}

function inPriceBand(price: number, band: PriceBand): boolean {
  if (band === 'ate-50') return price <= 50
  if (band === '50-100') return price > 50 && price <= 100
  if (band === 'acima-100') return price > 100
  return true
}

const COMPARE: Record<Exclude<SortKey, 'categoria'>, (a: Product, b: Product) => number> = {
  nome: (a, b) => a.name.localeCompare(b.name, 'pt-BR'),
  'preco-asc': (a, b) => a.price - b.price,
  'preco-desc': (a, b) => b.price - a.price,
}

/**
 * Busca + filtros + ordenação da carta B2B. A contagem por categoria considera a busca
 * e os demais filtros (menos a própria categoria), para o cliente ver o que cada uma
 * ainda tem antes de marcar.
 */
export function useCatalogFilters(groups: CatalogGroup[], draft: Record<string, number>) {
  const [filters, setFilters] = useState<CatalogFilters>(INITIAL)

  const result = useMemo(() => {
    const q = normalizeSearch(filters.query)
    const matches = (p: Product) =>
      (q === '' || normalizeSearch(p.name).includes(q)) &&
      (filters.line === 'todas' || p.line === filters.line) &&
      inPriceBand(p.price, filters.price) &&
      (!filters.onlyInOrder || (draft[p.id] ?? 0) > 0)

    const matchedGroups = groups.map(({ category, products }) => ({
      category,
      products: products.filter(matches),
    }))
    const categoryCounts = Object.fromEntries(
      matchedGroups.map(({ category, products }) => [category.slug, products.length]),
    ) as Record<CategorySlug, number>

    const selected = matchedGroups.filter(
      ({ category }) =>
        filters.categories.length === 0 || filters.categories.includes(category.slug),
    )
    const total = selected.reduce((n, g) => n + g.products.length, 0)

    const sections: ResultSection[] =
      filters.sort === 'categoria'
        ? selected
            .filter((g) => g.products.length > 0)
            .map((g) => ({ title: g.category.name, products: g.products }))
        : [
            {
              title: null,
              products: selected.flatMap((g) => g.products).sort(COMPARE[filters.sort]),
            },
          ]

    return { sections, total, categoryCounts }
  }, [groups, draft, filters])

  const activeCount =
    filters.categories.length +
    (filters.line !== 'todas' ? 1 : 0) +
    (filters.price !== 'todas' ? 1 : 0) +
    (filters.onlyInOrder ? 1 : 0)

  return {
    filters,
    ...result,
    activeCount,
    update: (patch: Partial<CatalogFilters>) => setFilters((f) => ({ ...f, ...patch })),
    toggleCategory: (slug: CategorySlug) =>
      setFilters((f) => ({
        ...f,
        categories: f.categories.includes(slug)
          ? f.categories.filter((s) => s !== slug)
          : [...f.categories, slug],
      })),
    /** limpa os filtros, mantendo busca e ordenação */
    clearFilters: () => setFilters((f) => ({ ...INITIAL, query: f.query, sort: f.sort })),
  }
}

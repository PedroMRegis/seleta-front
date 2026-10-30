import { useState } from 'react'
import { Button, ButtonLink } from '@/components/Button'
import { catalog, categories, productsByCategory } from '@/catalog'
import { BusinessPage, useBusinessOrder, useDraftItems } from '@/pages/b2b/shared'
import { FiltersDrawer } from './components/FiltersDrawer'
import { FiltersPanel } from './components/FiltersPanel'
import { OrderBar } from './components/OrderBar'
import { OrderPanel } from './components/OrderPanel'
import { ProductTable } from './components/ProductTable'
import { SearchBar } from './components/SearchBar'
import { useCatalogFilters } from './hooks/useCatalogFilters'

const GROUPS = categories.map((category) => ({
  category,
  products: productsByCategory[category.slug],
}))

/**
 * Pedido B2B (/negocios/pedido) em três colunas: filtros | busca + produtos | pedido.
 * Abaixo de xl, os filtros vão para uma gaveta; abaixo de lg, o pedido vira barra flutuante.
 */
export function Order() {
  const { draft, lists, setQuantity } = useBusinessOrder()
  const { items, count, total } = useDraftItems(catalog)
  const catalogFilters = useCatalogFilters(GROUPS, draft)
  const { filters, sections, activeCount, update, clearFilters } = catalogFilters
  const [isFiltersOpen, setFiltersOpen] = useState(false)

  const filtersPanel = (idPrefix: string) => (
    <FiltersPanel
      idPrefix={idPrefix}
      filters={filters}
      categories={categories}
      categoryCounts={catalogFilters.categoryCounts}
      draftCount={count}
      activeCount={activeCount}
      onToggleCategory={catalogFilters.toggleCategory}
      onChange={update}
      onClear={clearFilters}
    />
  )

  return (
    <BusinessPage
      title="Fazer pedido"
      description="Preços por kg. O valor final é definido na pesagem."
      actions={
        lists.length > 0 ? (
          <ButtonLink to="/negocios/listas" variant="secondary" size="sm">
            Listas salvas ({lists.length})
          </ButtonLink>
        ) : null
      }
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[15rem_minmax(0,1fr)_20rem]">
        <aside
          aria-label="Filtros"
          className="hidden xl:sticky xl:top-28 xl:block xl:max-h-[calc(100vh-8rem)] xl:self-start xl:overflow-y-auto"
        >
          {filtersPanel('lateral')}
        </aside>

        <section aria-label="Produtos" className="flex min-w-0 flex-col gap-5">
          <SearchBar
            query={filters.query}
            onQueryChange={(query) => update({ query })}
            sort={filters.sort}
            onSortChange={(sort) => update({ sort })}
            total={catalogFilters.total}
            activeFilters={activeCount}
            onOpenFilters={() => setFiltersOpen(true)}
          />

          {catalogFilters.total === 0 ? (
            <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
              <p className="text-ink-700">Nenhum produto com essa busca e filtros.</p>
              <div className="mt-4 flex justify-center gap-2">
                {filters.query ? (
                  <Button variant="ghost" size="sm" onClick={() => update({ query: '' })}>
                    Limpar busca
                  </Button>
                ) : null}
                {activeCount > 0 ? (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Limpar filtros
                  </Button>
                ) : null}
              </div>
            </div>
          ) : (
            <ProductTable sections={sections} quantities={draft} onQuantityChange={setQuantity} />
          )}
        </section>

        <aside
          aria-label="Seu pedido"
          className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
        >
          <OrderPanel
            items={items}
            total={total}
            hasLists={lists.length > 0}
            onRemove={(id) => setQuantity(id, 0)}
          />
        </aside>
      </div>

      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={() => setFiltersOpen(false)}
        total={catalogFilters.total}
      >
        {filtersPanel('gaveta')}
      </FiltersDrawer>
      <OrderBar count={count} total={total} />
    </BusinessPage>
  )
}

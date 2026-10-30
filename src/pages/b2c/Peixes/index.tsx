import { CategoryPage } from '@/pages/b2c/shared'

/** Página da categoria Peixes — seleção da casa + catálogo. */
export function Peixes() {
  return <CategoryPage slug="peixes" featuredIds={['salmao', 'bacalhau']} />
}

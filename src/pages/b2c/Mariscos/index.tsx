import { CategoryPage } from '@/pages/b2c/shared'

/** Página da categoria Mariscos — seleção da casa + catálogo. */
export function Mariscos() {
  return <CategoryPage slug="mariscos" featuredIds={['polvo', 'ostra']} />
}

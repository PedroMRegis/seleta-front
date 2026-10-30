import { CategoryPage } from '@/pages/b2c/shared'

/** Página da categoria Crustáceos — seleção da casa + catálogo. */
export function Crustaceos() {
  return <CategoryPage slug="crustaceos" featuredIds={['lagosta', 'camarao-vg']} />
}

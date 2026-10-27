/* -----------------------------------------------------------------------------
   Precificação por peso — os produtos são peças pré-cortadas vendidas por kg, com
   peso variável. Antes da pesagem pela loja, mostramos um valor ESTIMADO (preço/kg ×
   peso médio da faixa) e a faixa de peso mín.–máx. da peça. O valor final só é
   definido quando os funcionários pesam o pedido.
   Faixas de peso são placeholders por linha enquanto não há dados reais por produto.
----------------------------------------------------------------------------- */

type Line = 'peixe' | 'carne'

/** Faixa de peso padrão (em gramas) por linha, usada quando o produto não traz a sua. */
const DEFAULT_RANGE: Record<Line, { min: number; max: number }> = {
  peixe: { min: 300, max: 900 },
  carne: { min: 800, max: 1400 },
}

interface Weighable {
  price: number
  unit: string
  line: Line
  weightMin?: number
  weightMax?: number
}

/** True quando o item é vendido por peso (unit === 'kg'); senão é preço fixo por unidade. */
export function isWeighed(unit: string): boolean {
  return unit === 'kg'
}

/** Faixa de peso (gramas) do item por peso, ou null se for preço fixo por unidade. */
export function weightRange(item: Weighable): [number, number] | null {
  if (!isWeighed(item.unit)) return null
  const fallback = DEFAULT_RANGE[item.line]
  return [item.weightMin ?? fallback.min, item.weightMax ?? fallback.max]
}

/** Valor estimado por peça = preço/kg × peso médio da faixa (em kg). */
export function estimatedPrice(pricePerKg: number, minG: number, maxG: number): number {
  const avgKg = (minG + maxG) / 2 / 1000
  return pricePerKg * avgKg
}

/** Preço a considerar por unidade no carrinho: estimado (se por peso) ou o preço fixo. */
export function unitPrice(item: Weighable): number {
  const range = weightRange(item)
  if (!range) return item.price
  return estimatedPrice(item.price, range[0], range[1])
}

/** Formata um peso em gramas para pt-BR: 800 -> "800 g", 1200 -> "1,2 kg". */
export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    return `${(grams / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} kg`
  }
  return `${grams} g`
}

/** Faixa de peso formatada: "800 g – 1,2 kg". */
export function formatWeightRange(minG: number, maxG: number): string {
  return `${formatWeight(minG)} – ${formatWeight(maxG)}`
}

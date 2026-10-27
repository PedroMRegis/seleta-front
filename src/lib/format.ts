const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

/** Formata um valor numérico (em reais) como moeda brasileira, ex: 189.9 -> "R$ 189,90". */
export function formatBRL(value: number): string {
  return brl.format(value)
}

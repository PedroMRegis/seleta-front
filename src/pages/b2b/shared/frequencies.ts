import type { Choice } from '@/components/ChoiceGroup'
import type { QuoteFrequency } from './types'

/** Opções de frequência de compra — usadas na cotação de clientes e na de novos parceiros. */
export const FREQUENCIES: Choice<QuoteFrequency>[] = [
  { value: 'pontual', label: 'Pontual', description: 'Uma compra só' },
  { value: 'semanal', label: 'Semanal' },
  { value: 'quinzenal', label: 'Quinzenal' },
  { value: 'mensal', label: 'Mensal' },
]

export const FREQUENCY_VALUES = ['pontual', 'semanal', 'quinzenal', 'mensal'] as const

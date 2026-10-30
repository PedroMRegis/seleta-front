import { z } from 'zod'
import { FREQUENCY_VALUES } from '@/pages/b2b/shared'

/**
 * Regras da cotação. Precisa de itens OU de uma descrição: se o cliente não incluir o
 * pedido em andamento, a descrição vira obrigatória.
 */
export const quoteSchema = z
  .object({
    includeDraft: z.boolean(),
    frequency: z.enum(FREQUENCY_VALUES, {
      error: 'Escolha a frequência.',
    }),
    startDate: z.string(),
    description: z.string().trim().max(1000, 'Use no máximo 1000 caracteres.'),
  })
  .refine((v) => v.includeDraft || v.description.length >= 10, {
    path: ['description'],
    message: 'Descreva os produtos e volumes que você precisa.',
  })

export type QuoteForm = z.infer<typeof quoteSchema>

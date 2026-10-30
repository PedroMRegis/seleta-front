import { z } from 'zod'
import type { Choice } from '@/components/ChoiceGroup'
import { isValidCnpj, onlyDigits } from '@/lib/document'
import { FREQUENCY_VALUES } from '@/pages/b2b/shared'

/** Regras do formulário de cotação para novos parceiros (contato comercial). */
export const partnerSchema = z.object({
  companyName: z.string().trim().min(2, 'Informe o nome da empresa.'),
  cnpj: z.string().refine(isValidCnpj, 'CNPJ inválido. Confira os 14 dígitos.'),
  businessType: z.enum(['restaurante', 'hotel', 'emporio', 'outro'], {
    error: 'Escolha o tipo de negócio.',
  }),
  contactName: z.string().trim().min(2, 'Informe seu nome.'),
  email: z.email('Informe um e-mail válido.'),
  phone: z
    .string()
    .refine((v) => [10, 11].includes(onlyDigits(v).length), 'Informe o telefone com DDD.'),
  city: z.string().trim().min(2, 'Informe a cidade de entrega.'),
  frequency: z.enum(FREQUENCY_VALUES, { error: 'Escolha a frequência.' }),
  needs: z
    .string()
    .trim()
    .min(10, 'Conte quais produtos e volumes você precisa.')
    .max(1000, 'Use no máximo 1000 caracteres.'),
})

export type PartnerForm = z.infer<typeof partnerSchema>

export const BUSINESS_TYPES: Choice<PartnerForm['businessType']>[] = [
  { value: 'restaurante', label: 'Restaurante' },
  { value: 'hotel', label: 'Hotel ou bufê' },
  { value: 'emporio', label: 'Empório ou revenda' },
  { value: 'outro', label: 'Outro' },
]

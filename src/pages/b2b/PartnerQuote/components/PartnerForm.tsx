import type { ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/Button'
import { ChoiceGroup } from '@/components/ChoiceGroup'
import { FormField, TextArea, TextInput, describedBy } from '@/components/FormField'
import { formatCnpj, formatPhone } from '@/lib/document'
import { FREQUENCIES } from '@/pages/b2b/shared'
import { BUSINESS_TYPES, partnerSchema, type PartnerForm as Values } from '../schema'

interface PartnerFormProps {
  onSubmitted: (values: Values) => void
}

/** Cotação para novos parceiros, em três blocos: o que você precisa, empresa e contato. */
export function PartnerForm({ onSubmitted }: PartnerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      companyName: '',
      cnpj: '',
      contactName: '',
      email: '',
      phone: '',
      city: '',
      needs: '',
    },
  })

  // MOCK: sem API ainda — só confirma na tela. Trocar por mutation (TanStack Query) com toast de erro.
  const onSubmit = handleSubmit((values) => onSubmitted(values))

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-12">
      <Section title="O que você precisa">
        <FormField
          label="Produtos e volumes"
          htmlFor="needs"
          hint="Ex.: 20 kg de filé de salmão e 10 kg de camarão por semana, entregas às segundas."
          error={errors.needs?.message}
        >
          <TextArea
            id="needs"
            rows={5}
            aria-invalid={Boolean(errors.needs)}
            aria-describedby={describedBy('needs')}
            {...register('needs')}
          />
        </FormField>
        <Controller
          control={control}
          name="frequency"
          render={({ field }) => (
            <ChoiceGroup
              name="frequency"
              legend="Com que frequência?"
              options={FREQUENCIES}
              value={field.value}
              onChange={field.onChange}
              error={errors.frequency?.message}
              columns={4}
            />
          )}
        />
        <FormField label="Cidade de entrega" htmlFor="city" error={errors.city?.message}>
          <TextInput
            id="city"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.city)}
            aria-describedby={describedBy('city')}
            {...register('city')}
          />
        </FormField>
      </Section>

      <Section title="Empresa">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            label="Nome da empresa"
            htmlFor="companyName"
            error={errors.companyName?.message}
          >
            <TextInput
              id="companyName"
              autoComplete="organization"
              aria-invalid={Boolean(errors.companyName)}
              aria-describedby={describedBy('companyName')}
              {...register('companyName')}
            />
          </FormField>
          <Controller
            control={control}
            name="cnpj"
            render={({ field }) => (
              <FormField label="CNPJ" htmlFor="cnpj" error={errors.cnpj?.message}>
                <TextInput
                  id="cnpj"
                  inputMode="numeric"
                  placeholder="00.000.000/0000-00"
                  aria-invalid={Boolean(errors.cnpj)}
                  aria-describedby={describedBy('cnpj')}
                  {...field}
                  onChange={(e) => field.onChange(formatCnpj(e.target.value))}
                />
              </FormField>
            )}
          />
        </div>
        <Controller
          control={control}
          name="businessType"
          render={({ field }) => (
            <ChoiceGroup
              name="businessType"
              legend="Tipo de negócio"
              options={BUSINESS_TYPES}
              value={field.value}
              onChange={field.onChange}
              error={errors.businessType?.message}
              columns={4}
            />
          )}
        />
      </Section>

      <Section title="Contato">
        <FormField label="Seu nome" htmlFor="contactName" error={errors.contactName?.message}>
          <TextInput
            id="contactName"
            autoComplete="name"
            aria-invalid={Boolean(errors.contactName)}
            aria-describedby={describedBy('contactName')}
            {...register('contactName')}
          />
        </FormField>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="E-mail" htmlFor="email" error={errors.email?.message}>
            <TextInput
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy('email')}
              {...register('email')}
            />
          </FormField>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <FormField label="Telefone" htmlFor="phone" error={errors.phone?.message}>
                <TextInput
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(71) 99999-9999"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={describedBy('phone')}
                  {...field}
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
                />
              </FormField>
            )}
          />
        </div>
      </Section>

      <div className="flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-500">Seus dados são usados só para preparar a proposta.</p>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          Solicitar cotação
        </Button>
      </div>
    </form>
  )
}

/** Bloco do formulário com título em serifa e filete. */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-6">
      <legend className="mb-6 w-full border-b border-line pb-3 font-display text-2xl text-ink-900">
        {title}
      </legend>
      {children}
    </fieldset>
  )
}

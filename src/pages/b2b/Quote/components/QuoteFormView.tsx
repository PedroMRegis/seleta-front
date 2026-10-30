import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/Button'
import { ChoiceGroup } from '@/components/ChoiceGroup'
import { FormField, TextArea, TextInput, describedBy } from '@/components/FormField'
import { isoDayFromToday } from '@/lib/date'
import { FREQUENCIES, formatQuantity, type OrderItem } from '@/pages/b2b/shared'
import { quoteSchema, type QuoteForm } from '../schema'

interface QuoteFormViewProps {
  /** itens do pedido em andamento — oferecidos para entrar na cotação */
  draftItems: OrderItem[]
  onSubmit: (values: QuoteForm) => void
}

/** Formulário de cotação: itens do pedido (opcional), frequência, início e descrição. */
export function QuoteFormView({ draftItems, onSubmit }: QuoteFormViewProps) {
  const hasDraft = draftItems.length > 0
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteForm>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { includeDraft: hasDraft, startDate: '', description: '' },
  })
  const includeDraft = watch('includeDraft')

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
      {hasDraft ? (
        <div className="rounded-2xl border border-line bg-bone-100 p-6">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-ink-900"
              {...register('includeDraft')}
            />
            <span>
              <span className="block font-semibold text-ink-900">
                Incluir o pedido em andamento ({draftItems.length}{' '}
                {draftItems.length === 1 ? 'item' : 'itens'})
              </span>
              <span className="text-sm text-ink-500">
                As quantidades servem de base para a cotação.
              </span>
            </span>
          </label>
          {includeDraft ? (
            <ul className="mt-4 flex flex-col gap-1 border-t border-line pt-4 text-sm text-ink-700">
              {draftItems.map((item) => (
                <li key={item.productId} className="flex justify-between gap-4">
                  <span>{item.name}</span>
                  <span className="tabular-nums text-ink-500">
                    {formatQuantity(item.quantity, item)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

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

      <FormField label="A partir de quando? (opcional)" htmlFor="startDate">
        <TextInput
          id="startDate"
          type="date"
          min={isoDayFromToday(1)}
          aria-describedby={describedBy('startDate')}
          {...register('startDate')}
        />
      </FormField>

      <FormField
        label={includeDraft ? 'Algo mais? (opcional)' : 'O que você precisa?'}
        htmlFor="description"
        hint="Produtos, volumes aproximados, dias de entrega."
        error={errors.description?.message}
      >
        <TextArea
          id="description"
          rows={5}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={describedBy('description')}
          {...register('description')}
        />
      </FormField>

      <div className="flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-500">Respondemos por e-mail com os valores.</p>
        <Button type="submit" size="lg">
          Enviar cotação
        </Button>
      </div>
    </form>
  )
}

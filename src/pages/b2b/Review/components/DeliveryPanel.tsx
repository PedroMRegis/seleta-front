import { useState } from 'react'
import { CreditCard, QrCode, Truck } from '@phosphor-icons/react'
import { Button } from '@/components/Button'
import { ChoiceGroup, type Choice } from '@/components/ChoiceGroup'
import { FormField, TextArea, TextInput, describedBy } from '@/components/FormField'
import { isoDayFromToday } from '@/lib/date'
import { formatBRL } from '@/lib/format'
import type { PaymentMethod } from '@/pages/b2b/shared'

const PAYMENT_OPTIONS: Choice<PaymentMethod>[] = [
  { value: 'entrega', label: 'Na entrega', Icon: Truck },
  { value: 'cartao', label: 'Cartão', Icon: CreditCard },
  { value: 'pix', label: 'Pix', Icon: QrCode },
]

export interface DeliveryValues {
  deliveryDate: string | null
  notes: string
  payment: PaymentMethod
}

interface DeliveryPanelProps {
  total: number
  onSubmit: (values: DeliveryValues) => void
}

/** Painel de envio: entrega desejada, observações, pagamento, total estimado e "Enviar pedido". */
export function DeliveryPanel({ total, onSubmit }: DeliveryPanelProps) {
  const [deliveryDate, setDeliveryDate] = useState('')
  const [notes, setNotes] = useState('')
  const [payment, setPayment] = useState<PaymentMethod>('entrega')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ deliveryDate: deliveryDate || null, notes: notes.trim(), payment })
      }}
      className="flex flex-col gap-6 rounded-2xl border border-line bg-bone-100 p-6"
    >
      <h2 className="text-2xl">Entrega e pagamento</h2>

      <FormField
        label="Entrega desejada"
        htmlFor="deliveryDate"
        hint="Opcional — confirmamos a data com você."
      >
        <TextInput
          id="deliveryDate"
          type="date"
          min={isoDayFromToday(1)}
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          aria-describedby={describedBy('deliveryDate')}
        />
      </FormField>

      <FormField
        label="Observações"
        htmlFor="notes"
        hint="Horário de recebimento, acesso para entrega."
      >
        <TextArea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          aria-describedby={describedBy('notes')}
        />
      </FormField>

      <ChoiceGroup
        name="payment"
        legend="Pagamento"
        options={PAYMENT_OPTIONS}
        value={payment}
        onChange={setPayment}
        columns={3}
      />

      <div className="border-t border-line pt-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-ink-500">Total estimado</span>
          <span className="font-display text-3xl tabular-nums text-ink-900">
            ≈ {formatBRL(total)}
          </span>
        </div>
        <p className="mt-2 text-xs text-ink-500">
          O valor final segue o peso real. Depois da pesagem, liberamos o pagamento por e-mail.
        </p>
      </div>

      <Button type="submit" size="lg">
        Enviar pedido
      </Button>
    </form>
  )
}

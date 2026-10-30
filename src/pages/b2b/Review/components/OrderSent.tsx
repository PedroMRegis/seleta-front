import { CheckCircle } from '@phosphor-icons/react'
import { ButtonLink } from '@/components/Button'
import { StatusScreen } from '@/components/StatusScreen'
import { StepsCard } from '@/components/StepsCard'
import { formatBRL } from '@/lib/format'
import type { BusinessOrder } from '@/pages/b2b/shared'

const NEXT_STEPS = [
  'Separamos e pesamos os itens.',
  'Você recebe um e-mail com o valor final e o pagamento liberado.',
  'Pagamento feito, entregamos ou deixamos pronto para retirada.',
]

interface OrderSentProps {
  order: BusinessOrder
}

/** Confirmação depois de enviar o pedido — resumo e o que acontece agora. */
export function OrderSent({ order }: OrderSentProps) {
  return (
    <StatusScreen
      icon={<CheckCircle size={48} weight="light" className="text-mar-500" aria-hidden="true" />}
      title="Pedido enviado."
      actions={
        <>
          <ButtonLink to="/negocios/pedido">Novo pedido</ButtonLink>
          <ButtonLink to="/negocios/listas" variant="secondary">
            Ver histórico
          </ButtonLink>
        </>
      }
    >
      <p>
        {order.items.length} {order.items.length === 1 ? 'item' : 'itens'} · estimativa ≈{' '}
        {formatBRL(order.estimatedTotal)}
      </p>
      <div className="mt-10 text-left">
        <StepsCard title="O que acontece agora" steps={NEXT_STEPS} />
      </div>
    </StatusScreen>
  )
}

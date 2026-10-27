import { useState } from 'react'
import { CreditCard, Minus, Plus, QrCode, ShoppingCart, Trash, Truck, X } from '@phosphor-icons/react'
import styled from 'styled-components'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { Modal } from '@/components/Modal'
import { formatBRL } from '@/lib/format'
import { formatWeightRange, isWeighed, unitPrice, weightRange } from '@/lib/pricing'
import { useCart } from '../CartContext'

type PaymentMethod = 'entrega' | 'cartao' | 'pix'

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; Icon: typeof Truck }[] = [
  { id: 'entrega', label: 'Pagar na entrega', Icon: Truck },
  { id: 'cartao', label: 'Cartão', Icon: CreditCard },
  { id: 'pix', label: 'Pix', Icon: QrCode },
]

function paymentLabel(method: PaymentMethod): string {
  return PAYMENT_OPTIONS.find((p) => p.id === method)?.label ?? ''
}

/**
 * Carrinho (drawer à direita) — compõe o Modal base. Mostra os itens com VALOR
 * ESTIMADO (o final vem após a pesagem), a escolha de forma de pagamento e o envio da
 * SOLICITAÇÃO de pedido (não é pagamento imediato). Após enviar, explica os próximos
 * passos: pesagem → liberação do pagamento por e-mail.
 */
export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, count, setQuantity, removeItem, clear } = useCart()
  const [payment, setPayment] = useState<PaymentMethod>('entrega')
  const [submitted, setSubmitted] = useState(false)

  const finish = () => {
    clear()
    setSubmitted(false)
    closeCart()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeCart}
      ariaLabel="Carrinho de compras"
      containerClassName="absolute right-0 top-0 h-full w-full max-w-md"
    >
      <Panel>
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="flex items-center gap-2 text-xl">
            <ShoppingCart size={22} aria-hidden="true" /> Seu pedido
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition hover:bg-bone-200"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {submitted ? (
          <div className="flex flex-1 flex-col justify-center gap-4 px-6 text-center">
            <h3 className="text-2xl">Solicitação enviada!</h3>
            <p className="text-ink-700">
              Vamos pesar seus itens e definir o valor final. Assim que o pagamento for liberado,
              você recebe um e-mail e paga pelo card do seu pedido.
            </p>
            <p className="text-sm text-ink-500">Forma de pagamento escolhida: {paymentLabel(payment)}.</p>
            <button
              type="button"
              onClick={finish}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-bone-50 transition hover:bg-ink-700"
            >
              Entendi
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-ink-500">
            <ShoppingCart size={40} aria-hidden="true" />
            <p>Seu carrinho está vazio.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map(({ product, quantity }) => {
                  const range = weightRange(product)
                  const est = unitPrice(product) * quantity
                  return (
                    <li key={product.id} className="flex gap-3">
                      <div className="h-16 w-16 shrink-0">
                        <ImagePlaceholder tone={product.tone} label={product.imageLabel} aspect="1/1" />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm font-semibold text-ink-900">{product.name}</p>
                        <p className="text-xs text-ink-500">
                          {isWeighed(product.unit)
                            ? `${formatBRL(product.price)}/kg${range ? ` · ${formatWeightRange(range[0], range[1])}` : ''}`
                            : `${formatBRL(product.price)} / ${product.unit}`}
                        </p>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-line">
                            <button
                              type="button"
                              aria-label={`Diminuir ${product.name}`}
                              onClick={() => setQuantity(product.id, quantity - 1)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-700 hover:bg-bone-200"
                            >
                              <Minus size={14} aria-hidden="true" />
                            </button>
                            <span className="min-w-6 text-center text-sm">{quantity}</span>
                            <button
                              type="button"
                              aria-label={`Aumentar ${product.name}`}
                              onClick={() => setQuantity(product.id, quantity + 1)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-700 hover:bg-bone-200"
                            >
                              <Plus size={14} aria-hidden="true" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-ink-900">≈ {formatBRL(est)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remover ${product.name}`}
                        onClick={() => removeItem(product.id)}
                        className="self-start rounded-full p-1 text-ink-400 transition hover:text-brasa-500"
                      >
                        <Trash size={16} aria-hidden="true" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="border-t border-line px-5 py-4">
              <fieldset className="mb-4">
                <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Como você quer pagar
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {PAYMENT_OPTIONS.map(({ id, label, Icon }) => (
                    <label
                      key={id}
                      className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center text-xs transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 ${
                        payment === id
                          ? 'border-mar-500 bg-mar-100 text-mar-600'
                          : 'border-line text-ink-700 hover:border-steel-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={id}
                        checked={payment === id}
                        onChange={() => setPayment(id)}
                        className="sr-only"
                      />
                      <Icon size={20} aria-hidden="true" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-ink-500">
                  Estimativa ({count} {count === 1 ? 'item' : 'itens'})
                </span>
                <span className="text-lg font-semibold text-ink-900">≈ {formatBRL(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-ink-500">
                Valor estimado. O total final é definido após a pesagem dos seus itens.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="inline-flex w-full items-center justify-center rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-bone-50 transition hover:bg-ink-700 active:scale-[0.99]"
              >
                Enviar solicitação de pedido
              </button>
            </div>
          </>
        )}
      </Panel>
    </Modal>
  )
}

// --- styled components ---

/** Painel do drawer — altura total, fundo osso, com animação de entrada deslizando da direita. */
const Panel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bone-50);
  box-shadow: -16px 0 40px -24px rgba(23, 20, 15, 0.5);
  animation: drawer-in 0.2s ease-out;

  @keyframes drawer-in {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`

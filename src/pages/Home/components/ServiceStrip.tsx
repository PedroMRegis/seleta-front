import { Storefront, Truck, WhatsappLogo } from '@phosphor-icons/react'

interface Service {
  Icon: typeof Truck
  title: string
  description: string
}

const SERVICES: Service[] = [
  { Icon: Truck, title: 'Entrega em domicílio', description: 'Levamos seu pedido até você.' },
  { Icon: Storefront, title: 'Retirada na loja', description: 'Faça o pedido e retire quando quiser.' },
  { Icon: WhatsappLogo, title: 'Pedido por WhatsApp', description: 'Atendimento e pedidos também pelo WhatsApp.' },
]

/** Faixa com os serviços reais da casa: entrega, retirada e pedido por WhatsApp. */
export function ServiceStrip() {
  return (
    <section className="bg-bone-100 py-10 sm:py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {SERVICES.map(({ Icon, title, description }) => (
            <div key={title} className="flex gap-3">
              <Icon size={28} className="mt-0.5 shrink-0 text-mar-600" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
                <p className="mt-1 text-sm text-ink-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

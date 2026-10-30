/** Envio como pedido (pesagem → pagamento liberado) ou como pedido de cotação. */
export type OrderKind = 'pedido' | 'cotacao'

export type PaymentMethod = 'entrega' | 'cartao' | 'pix'

/** Frequência de compra informada numa cotação. */
export type QuoteFrequency = 'pontual' | 'semanal' | 'quinzenal' | 'mensal'

/** Rascunho do pedido: id do produto → quantidade (kg se vendido por peso, senão unidades). */
export type DraftLines = Record<string, number>

/** Lista salva para recompra (ex: "Pedido semanal"). */
export interface SavedList {
  id: string
  name: string
  lines: DraftLines
  /** ISO date */
  updatedAt: string
}

/** Item de pedido com retrato do produto no momento do envio (nome e preço não mudam depois). */
export interface OrderItem {
  productId: string
  name: string
  unit: string
  /** preço por kg (itens por peso) ou por unidade, em reais */
  price: number
  quantity: number
}

interface DetailsBase {
  /** data de entrega desejada (YYYY-MM-DD) — é um pedido, a loja confirma */
  deliveryDate: string | null
  notes: string
}

export interface OrderRequestDetails extends DetailsBase {
  kind: 'pedido'
  payment: PaymentMethod
}

export interface QuoteRequestDetails extends DetailsBase {
  kind: 'cotacao'
  frequency: QuoteFrequency
}

export type OrderDetails = OrderRequestDetails | QuoteRequestDetails

export type BusinessOrder = OrderDetails & {
  id: string
  items: OrderItem[]
  estimatedTotal: number
  /** ISO date */
  createdAt: string
}

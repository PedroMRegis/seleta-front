/** Linha de produto — define o tratamento visual (mar/aço x brasa/vermelho). */
export type ProductLine = 'peixe' | 'carne'

/** Slug de categoria — casa com a rota da página daquela categoria (/peixes, /carnes…). */
export type CategorySlug = 'peixes' | 'crustaceos' | 'mariscos' | 'carnes' | 'aves'

export interface Product {
  id: string
  name: string
  /** linha do produto — governa a cor de acento no card (peixe = mar, carne = brasa) */
  line: ProductLine
  category: string
  /** preço atual em reais */
  price: number
  /** unidade de venda: "kg" = vendido por peso (peça pré-cortada); senão preço fixo por unidade */
  unit: string
  /** peso mínimo da peça, em gramas (itens por peso). Sem valor, usa o padrão da linha. */
  weightMin?: number
  /** peso máximo da peça, em gramas (itens por peso). Sem valor, usa o padrão da linha. */
  weightMax?: number
  /** preço cheio em reais (por kg quando vendido por peso) — presente só em oferta */
  originalPrice?: number
  /** @deprecated dados inventados — não exibir; remover quando houver dados reais */
  rating: number
  /** @deprecated dados inventados — não exibir; remover quando houver dados reais */
  reviews: number
  /** @deprecated selo inventado — não exibir; remover quando houver dados reais */
  badge?: string
  /** cor base do placeholder de imagem, enquanto não há foto real do produto */
  tone: string
  /** legenda do placeholder — descreve a foto que vai entrar ali */
  imageLabel: string
}

export interface Category {
  id: string
  /** slug da categoria — usado na rota (/peixes) e como chave do catálogo */
  slug: CategorySlug
  name: string
  line: ProductLine
  count: number
  tone: string
  /** legenda do placeholder — descreve a foto que vai entrar ali */
  imageLabel: string
  /** frase curta de vitrine da categoria (aparece no card e no topo da página) */
  tagline: string
}

/** Destaque de uma linha inteira (bloco grande "Peixes" x "Carnes" na Home). */
export interface LineHighlight {
  line: ProductLine
  title: string
  blurb: string
  tone: string
  imageLabel: string
}

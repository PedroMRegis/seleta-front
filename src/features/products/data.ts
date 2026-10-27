import type { Category, CategorySlug, LineHighlight, Product } from './types'

/* -----------------------------------------------------------------------------
   DADOS MOCK — temporário.
   Substituir por hooks de dados (TanStack Query) sobre `api/` quando o backend
   estiver disponível. Mantido aqui, isolado na feature, para o mockup da Home.
   `tone` = cor do placeholder de imagem; `imageLabel` = legenda do que vai ali.
----------------------------------------------------------------------------- */

/** Destaque das duas linhas da casa — bloco grande na Home. */
export const lineHighlights: LineHighlight[] = [
  {
    line: 'peixe',
    title: 'Peixes & frutos do mar',
    blurb: 'Peixes, filés, postas e frutos do mar selecionados.',
    tone: '#1f5560',
    imageLabel: 'Banca de peixes frescos no gelo',
  },
  {
    line: 'carne',
    title: 'Carnes & aves',
    blurb: 'Cortes bovinos, aves e suínos selecionados.',
    tone: '#9e2b25',
    imageLabel: 'Balcão de carnes frescas',
  },
]

export const bestSellers: Product[] = [
  {
    id: 'salmao-file',
    name: 'Filé de Salmão Fresco',
    line: 'peixe',
    category: 'Peixes',
    price: 79.9,
    unit: 'kg',
    rating: 4.9,
    reviews: 214,
    badge: 'Mais fresco',
    tone: '#1f5560',
    imageLabel: 'Filé de salmão fresco',
  },
  {
    id: 'picanha-premium',
    name: 'Picanha Bovina Premium',
    line: 'carne',
    category: 'Carnes Bovinas',
    price: 94.9,
    unit: 'kg',
    rating: 4.9,
    reviews: 261,
    badge: 'Mais vendido',
    tone: '#9e2b25',
    imageLabel: 'Peça de picanha maturada',
  },
  {
    id: 'camarao-rosa',
    name: 'Camarão Rosa Grande',
    line: 'peixe',
    category: 'Frutos do Mar',
    price: 119.9,
    unit: 'kg',
    rating: 4.8,
    reviews: 137,
    tone: '#2a6b70',
    imageLabel: 'Camarão rosa limpo',
  },
  {
    id: 'costela-bovina',
    name: 'Costela Bovina',
    line: 'carne',
    category: 'Carnes Bovinas',
    price: 49.9,
    unit: 'kg',
    rating: 4.7,
    reviews: 98,
    tone: '#7d1f1c',
    imageLabel: 'Costela para churrasco',
  },
]

export const weeklyDeals: Product[] = [
  {
    id: 'tilapia-file',
    name: 'Filé de Tilápia',
    line: 'peixe',
    category: 'Peixes',
    price: 39.9,
    unit: 'kg',
    originalPrice: 54.9,
    rating: 4.6,
    reviews: 152,
    tone: '#2f7d7d',
    imageLabel: 'Filé de tilápia',
  },
  {
    id: 'fraldinha',
    name: 'Fraldinha Bovina',
    line: 'carne',
    category: 'Carnes Bovinas',
    price: 44.9,
    unit: 'kg',
    originalPrice: 59.9,
    rating: 4.7,
    reviews: 203,
    tone: '#8a2622',
    imageLabel: 'Corte de fraldinha',
  },
  {
    id: 'polvo-fresco',
    name: 'Polvo Fresco',
    line: 'peixe',
    category: 'Frutos do Mar',
    price: 129.9,
    unit: 'kg',
    originalPrice: 169.9,
    rating: 4.8,
    reviews: 84,
    badge: 'Últimas peças',
    tone: '#255a63',
    imageLabel: 'Polvo inteiro fresco',
  },
  {
    id: 'frango-caipira',
    name: 'Frango Caipira Inteiro',
    line: 'carne',
    category: 'Aves',
    price: 34.9,
    unit: 'unid.',
    originalPrice: 44.9,
    rating: 4.9,
    reviews: 176,
    badge: 'Oferta',
    tone: '#a8452e',
    imageLabel: 'Frango caipira inteiro',
  },
]

export const categories: Category[] = [
  {
    id: 'peixes',
    slug: 'peixes',
    name: 'Peixes',
    line: 'peixe',
    count: 8,
    tone: '#1f5560',
    imageLabel: 'Peixes frescos no gelo',
    tagline: 'Filés, postas e peixes inteiros da chegada do dia',
  },
  {
    id: 'crustaceos',
    slug: 'crustaceos',
    name: 'Crustáceos',
    line: 'peixe',
    count: 6,
    tone: '#2a6b70',
    imageLabel: 'Camarões e lagostas',
    tagline: 'Camarão, lagosta e lagostim limpos na hora',
  },
  {
    id: 'mariscos',
    slug: 'mariscos',
    name: 'Mariscos',
    line: 'peixe',
    count: 6,
    tone: '#255a63',
    imageLabel: 'Polvo, lula e mariscos',
    tagline: 'Polvo, lula, mexilhão e ostras selecionados',
  },
  {
    id: 'carnes',
    slug: 'carnes',
    name: 'Carnes',
    line: 'carne',
    count: 8,
    tone: '#9e2b25',
    imageLabel: 'Cortes bovinos maturados',
    tagline: 'Cortes bovinos e suínos, no balcão sob medida',
  },
  {
    id: 'aves',
    slug: 'aves',
    name: 'Aves',
    line: 'carne',
    count: 6,
    tone: '#a8452e',
    imageLabel: 'Frango caipira e aves',
    tagline: 'Frango caipira e cortes de ave do dia',
  },
]

/* -----------------------------------------------------------------------------
   CATÁLOGO POR CATEGORIA — usado pelas páginas de categoria (/peixes, /carnes…).
   Mesma natureza mock/temporária: vira query sobre `api/` quando houver backend.
----------------------------------------------------------------------------- */

const peixes: Product[] = [
  { id: 'salmao', name: 'Filé de Salmão Fresco', line: 'peixe', category: 'Peixes', price: 79.9, unit: 'kg', rating: 4.9, reviews: 214, badge: 'Chegada do dia', tone: '#1f5560', imageLabel: 'Filé de salmão fresco' },
  { id: 'tilapia', name: 'Filé de Tilápia', line: 'peixe', category: 'Peixes', price: 39.9, unit: 'kg', originalPrice: 54.9, rating: 4.6, reviews: 152, tone: '#2f7d7d', imageLabel: 'Filé de tilápia' },
  { id: 'atum-posta', name: 'Posta de Atum', line: 'peixe', category: 'Peixes', price: 89.9, unit: 'kg', rating: 4.8, reviews: 76, tone: '#255a63', imageLabel: 'Posta de atum vermelho' },
  { id: 'robalo', name: 'Robalo Inteiro', line: 'peixe', category: 'Peixes', price: 69.9, unit: 'kg', rating: 4.7, reviews: 63, tone: '#2a6b70', imageLabel: 'Robalo inteiro fresco' },
  { id: 'pescada', name: 'Pescada Branca', line: 'peixe', category: 'Peixes', price: 44.9, unit: 'kg', rating: 4.5, reviews: 91, tone: '#1f5560', imageLabel: 'Pescada branca' },
  { id: 'sardinha', name: 'Sardinha Fresca', line: 'peixe', category: 'Peixes', price: 24.9, unit: 'kg', rating: 4.6, reviews: 118, badge: 'Do litoral', tone: '#163f48', imageLabel: 'Sardinha fresca no gelo' },
  { id: 'linguado', name: 'Filé de Linguado', line: 'peixe', category: 'Peixes', price: 74.9, unit: 'kg', rating: 4.8, reviews: 54, tone: '#2f7d7d', imageLabel: 'Filé de linguado' },
  { id: 'bacalhau', name: 'Bacalhau Dessalgado', line: 'peixe', category: 'Peixes', price: 99.9, unit: 'kg', originalPrice: 129.9, rating: 4.9, reviews: 87, tone: '#255a63', imageLabel: 'Lombo de bacalhau dessalgado' },
]

const crustaceos: Product[] = [
  { id: 'camarao-rosa-g', name: 'Camarão Rosa Grande', line: 'peixe', category: 'Crustáceos', price: 119.9, unit: 'kg', rating: 4.8, reviews: 137, badge: 'Mais pedido', tone: '#2a6b70', imageLabel: 'Camarão rosa grande limpo' },
  { id: 'camarao-cinza', name: 'Camarão Cinza Médio', line: 'peixe', category: 'Crustáceos', price: 69.9, unit: 'kg', originalPrice: 89.9, rating: 4.6, reviews: 102, tone: '#2f7d7d', imageLabel: 'Camarão cinza médio' },
  { id: 'lagosta', name: 'Lagosta Inteira', line: 'peixe', category: 'Crustáceos', price: 189.9, unit: 'kg', rating: 4.9, reviews: 41, badge: 'Premium', tone: '#255a63', imageLabel: 'Lagosta inteira fresca' },
  { id: 'lagostim', name: 'Lagostim', line: 'peixe', category: 'Crustáceos', price: 99.9, unit: 'kg', rating: 4.7, reviews: 38, tone: '#1f5560', imageLabel: 'Lagostim fresco' },
  { id: 'caranguejo', name: 'Caranguejo', line: 'peixe', category: 'Crustáceos', price: 59.9, unit: 'kg', rating: 4.5, reviews: 67, tone: '#2a6b70', imageLabel: 'Caranguejo fresco' },
  { id: 'camarao-vg', name: 'Camarão VG Limpo', line: 'peixe', category: 'Crustáceos', price: 149.9, unit: 'kg', rating: 4.9, reviews: 59, tone: '#163f48', imageLabel: 'Camarão VG descascado' },
]

const mariscos: Product[] = [
  { id: 'polvo', name: 'Polvo Fresco', line: 'peixe', category: 'Mariscos', price: 129.9, unit: 'kg', originalPrice: 169.9, rating: 4.8, reviews: 84, badge: 'Últimas peças', tone: '#255a63', imageLabel: 'Polvo inteiro fresco' },
  { id: 'lula-aneis', name: 'Lula em Anéis', line: 'peixe', category: 'Mariscos', price: 64.9, unit: 'kg', rating: 4.6, reviews: 73, tone: '#2f7d7d', imageLabel: 'Anéis de lula' },
  { id: 'lula-inteira', name: 'Lula Inteira Limpa', line: 'peixe', category: 'Mariscos', price: 59.9, unit: 'kg', rating: 4.5, reviews: 48, tone: '#1f5560', imageLabel: 'Lula inteira limpa' },
  { id: 'mexilhao', name: 'Mexilhão na Concha', line: 'peixe', category: 'Mariscos', price: 34.9, unit: 'kg', rating: 4.4, reviews: 55, tone: '#2a6b70', imageLabel: 'Mexilhão na concha' },
  { id: 'ostra', name: 'Ostra Fresca', line: 'peixe', category: 'Mariscos', price: 49.9, unit: 'dúzia', rating: 4.7, reviews: 62, badge: 'Do dia', tone: '#255a63', imageLabel: 'Ostras frescas na concha' },
  { id: 'vieira', name: 'Vieira', line: 'peixe', category: 'Mariscos', price: 139.9, unit: 'kg', rating: 4.8, reviews: 29, tone: '#163f48', imageLabel: 'Vieiras frescas' },
]

const carnes: Product[] = [
  { id: 'picanha', name: 'Picanha Bovina Premium', line: 'carne', category: 'Carnes', price: 94.9, unit: 'kg', rating: 4.9, reviews: 261, badge: 'Mais vendido', tone: '#9e2b25', imageLabel: 'Peça de picanha maturada' },
  { id: 'costela', name: 'Costela Bovina', line: 'carne', category: 'Carnes', price: 49.9, unit: 'kg', rating: 4.7, reviews: 98, tone: '#7d1f1c', imageLabel: 'Costela para churrasco' },
  { id: 'fraldinha', name: 'Fraldinha', line: 'carne', category: 'Carnes', price: 44.9, unit: 'kg', originalPrice: 59.9, rating: 4.7, reviews: 203, tone: '#8a2622', imageLabel: 'Corte de fraldinha' },
  { id: 'contrafile', name: 'Contrafilé', line: 'carne', category: 'Carnes', price: 64.9, unit: 'kg', rating: 4.8, reviews: 121, tone: '#9e2b25', imageLabel: 'Contrafilé em peça' },
  { id: 'alcatra', name: 'Alcatra', line: 'carne', category: 'Carnes', price: 59.9, unit: 'kg', rating: 4.7, reviews: 88, tone: '#7d1f1c', imageLabel: 'Alcatra em peça' },
  { id: 'maminha', name: 'Maminha', line: 'carne', category: 'Carnes', price: 57.9, unit: 'kg', rating: 4.6, reviews: 74, tone: '#8a2622', imageLabel: 'Maminha maturada' },
  { id: 'cupim', name: 'Cupim', line: 'carne', category: 'Carnes', price: 46.9, unit: 'kg', originalPrice: 62.9, rating: 4.6, reviews: 65, tone: '#b5453d', imageLabel: 'Cupim para assar' },
  { id: 'linguica', name: 'Linguiça Artesanal', line: 'carne', category: 'Carnes', price: 39.9, unit: 'kg', rating: 4.8, reviews: 149, badge: 'Da casa', tone: '#6b3a2e', imageLabel: 'Linguiça artesanal' },
]

const aves: Product[] = [
  { id: 'frango-caipira', name: 'Frango Caipira Inteiro', line: 'carne', category: 'Aves', price: 34.9, unit: 'unid.', originalPrice: 44.9, rating: 4.9, reviews: 176, badge: 'Caipira', tone: '#a8452e', imageLabel: 'Frango caipira inteiro' },
  { id: 'peito-frango', name: 'Peito de Frango', line: 'carne', category: 'Aves', price: 24.9, unit: 'kg', rating: 4.6, reviews: 210, tone: '#9e2b25', imageLabel: 'Peito de frango' },
  { id: 'coxa-sobrecoxa', name: 'Coxa e Sobrecoxa', line: 'carne', category: 'Aves', price: 19.9, unit: 'kg', originalPrice: 26.9, rating: 4.7, reviews: 143, tone: '#b5453d', imageLabel: 'Coxa e sobrecoxa' },
  { id: 'file-peito', name: 'Filé de Peito', line: 'carne', category: 'Aves', price: 29.9, unit: 'kg', rating: 4.7, reviews: 118, tone: '#a8452e', imageLabel: 'Filé de peito de frango' },
  { id: 'asa-frango', name: 'Asa de Frango', line: 'carne', category: 'Aves', price: 21.9, unit: 'kg', rating: 4.5, reviews: 96, tone: '#7d1f1c', imageLabel: 'Asas de frango' },
  { id: 'coracao', name: 'Coração de Frango', line: 'carne', category: 'Aves', price: 27.9, unit: 'kg', rating: 4.6, reviews: 88, badge: 'Pra grelha', tone: '#6b3a2e', imageLabel: 'Coração de frango' },
]

/** Catálogo indexado pelo slug da categoria — cada página lê a sua lista aqui. */
export const productsByCategory: Record<CategorySlug, Product[]> = {
  peixes,
  crustaceos,
  mariscos,
  carnes,
  aves,
}

import { createBrowserRouter } from 'react-router-dom'
import { Home } from '@/pages/b2c/Home'
import { Peixes } from '@/pages/b2c/Peixes'
import { Crustaceos } from '@/pages/b2c/Crustaceos'
import { Mariscos } from '@/pages/b2c/Mariscos'
import { Carnes } from '@/pages/b2c/Carnes'
import { Aves } from '@/pages/b2c/Aves'
import { LinhaMar } from '@/pages/b2c/LinhaMar'
import { LinhaTerra } from '@/pages/b2c/LinhaTerra'
import { Landing } from '@/pages/b2b/Landing'
import { Lists } from '@/pages/b2b/Lists'
import { Order } from '@/pages/b2b/Order'
import { Quote } from '@/pages/b2b/Quote'
import { PartnerQuote } from '@/pages/b2b/PartnerQuote'
import { Review } from '@/pages/b2b/Review'
import { BusinessGate, BusinessLayout } from '@/pages/b2b/shared'
import { StoreLayout } from '@/pages/b2c/shared'
import { RootLayout } from './RootLayout'

/**
 * Rotas da Seleta, sob o layout que rola pro topo:
 * - loja (b2c): Home + uma página por categoria, sob o StoreLayout;
 * - negócios (b2b): vitrine e cotação para novos parceiros públicas; pedido, cotação e listas só
 *   para clientes logados (BusinessGate).
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <StoreLayout />,
        children: [
          { path: '/', element: <Home /> },
          {
            path: '/peixes-e-frutos-do-mar',
            element: <LinhaMar />,
            handle: { crumb: 'Peixes & frutos do mar' },
          },
          { path: '/carnes-e-aves', element: <LinhaTerra />, handle: { crumb: 'Carnes & aves' } },
          { path: '/peixes', element: <Peixes />, handle: { crumb: 'Peixes' } },
          { path: '/crustaceos', element: <Crustaceos />, handle: { crumb: 'Crustáceos' } },
          { path: '/mariscos', element: <Mariscos />, handle: { crumb: 'Mariscos' } },
          { path: '/carnes', element: <Carnes />, handle: { crumb: 'Carnes' } },
          { path: '/aves', element: <Aves />, handle: { crumb: 'Aves' } },
        ],
      },
      {
        path: '/negocios',
        element: <BusinessLayout />,
        children: [
          { index: true, element: <Landing /> },
          { path: 'parceria', element: <PartnerQuote /> },
          {
            element: <BusinessGate />,
            children: [
              { path: 'pedido', element: <Order /> },
              { path: 'pedido/revisar', element: <Review /> },
              { path: 'cotacao', element: <Quote /> },
              { path: 'listas', element: <Lists /> },
            ],
          },
        ],
      },
    ],
  },
])

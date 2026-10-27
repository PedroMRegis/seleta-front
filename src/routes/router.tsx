import { createBrowserRouter } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Peixes } from '@/pages/Peixes'
import { Crustaceos } from '@/pages/Crustaceos'
import { Mariscos } from '@/pages/Mariscos'
import { Carnes } from '@/pages/Carnes'
import { Aves } from '@/pages/Aves'
import { RootLayout } from './RootLayout'

/** Rotas da Seleta — Home + uma página por categoria, sob o layout que rola pro topo. */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/peixes', element: <Peixes /> },
      { path: '/crustaceos', element: <Crustaceos /> },
      { path: '/mariscos', element: <Mariscos /> },
      { path: '/carnes', element: <Carnes /> },
      { path: '/aves', element: <Aves /> },
    ],
  },
])

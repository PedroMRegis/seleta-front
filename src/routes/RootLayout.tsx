import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

/**
 * Layout raiz de todas as rotas. Sempre que o caminho muda, rola a página pro topo —
 * assim cada troca de página começa do começo, independente de onde o scroll estava.
 */
export function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <Outlet />
}

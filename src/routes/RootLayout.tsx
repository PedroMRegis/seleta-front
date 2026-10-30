import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

/**
 * Layout raiz de todas as rotas. Sempre que o caminho muda, rola a página pro topo —
 * assim cada troca de página começa do começo, independente de onde o scroll estava.
 * Com âncora na URL (ex: /negocios#resumo), rola até o elemento com aquele id.
 */
export function RootLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return <Outlet />
}

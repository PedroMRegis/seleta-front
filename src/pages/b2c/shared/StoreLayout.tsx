import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Header } from './Header'
import { StoreBottomNav } from './StoreBottomNav'

/**
 * Moldura de todas as páginas da loja: header, conteúdo da rota, rodapé e — no
 * celular — a navegação fixa na base (espelha o BusinessLayout).
 */
export function StoreLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-bone-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <StoreBottomNav />
    </div>
  )
}

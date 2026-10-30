import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { BusinessBottomNav } from './BusinessBottomNav'
import { BusinessHeader } from './BusinessHeader'

/**
 * Moldura de todas as páginas /negocios: header da área, conteúdo da rota, rodapé e —
 * no celular — a navegação fixa na base.
 */
export function BusinessLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-bone-50">
      <BusinessHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BusinessBottomNav />
    </div>
  )
}

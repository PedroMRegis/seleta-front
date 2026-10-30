import { RouterProvider } from 'react-router-dom'
import { AuthProvider, LoginModal } from '@/auth'
import { ToastProvider } from '@/components/Toast'
import { BusinessOrderProvider } from '@/pages/b2b/shared'
import { CartProvider, CartDrawer } from '@/pages/b2c/shared'
import { router } from '@/routes/router'

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <BusinessOrderProvider>
            <RouterProvider router={router} />
            <CartDrawer />
            <LoginModal />
          </BusinessOrderProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  )
}

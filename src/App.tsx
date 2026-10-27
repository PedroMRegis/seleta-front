import { RouterProvider } from 'react-router-dom'
import { AuthProvider, LoginModal } from '@/features/auth'
import { CartProvider, CartDrawer } from '@/features/cart'
import { router } from '@/routes/router'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <CartDrawer />
        <LoginModal />
      </CartProvider>
    </AuthProvider>
  )
}

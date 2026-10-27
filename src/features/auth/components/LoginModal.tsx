import { useState, type FormEvent } from 'react'
import { SignIn } from '@phosphor-icons/react'
import { Modal } from '@/components/Modal'
import { useAuth } from '../AuthContext'

/**
 * Modal de login — abre quando o cliente tenta adicionar um item sem estar logado
 * (o pedido exige login). Mock: qualquer e-mail entra. Compõe o Modal base.
 */
export function LoginModal() {
  const { isLoginOpen, closeLogin, login } = useAuth()
  const [email, setEmail] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    if (value) login(value)
  }

  return (
    <Modal
      isOpen={isLoginOpen}
      onClose={closeLogin}
      ariaLabel="Entrar na conta"
      containerClassName="absolute left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-bone-50 p-6 shadow-xl sm:p-8"
    >
      <div className="mb-5 flex items-center gap-2 text-mar-600">
        <SignIn size={22} weight="bold" aria-hidden="true" />
        <h2 className="text-2xl">Entrar</h2>
      </div>
      <p className="mb-5 text-sm text-ink-500">
        Para montar seu pedido é preciso entrar. Assim conseguimos pesar seus itens e liberar o
        pagamento depois.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label className="text-sm font-medium text-ink-700" htmlFor="login-email">
          E-mail
        </label>
        <input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          className="rounded-lg border border-line bg-white px-3 py-2.5 text-ink-900 outline-none focus-visible:border-mar-500"
        />
        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-bone-50 transition hover:bg-ink-700 active:scale-[0.99]"
        >
          Entrar
        </button>
      </form>
      <p className="mt-4 text-center text-xs text-ink-400">Login de demonstração — sem senha por ora.</p>
    </Modal>
  )
}

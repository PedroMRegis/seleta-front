import { useState, type FormEvent } from 'react'
import { Button } from '@/components/Button'
import { FormField, TextInput } from '@/components/FormField'
import { Modal } from '@/components/Modal'
import { useAuth } from './AuthContext'

/**
 * Modal de login — loja e negócios. Abre quando alguém tenta pedir sem estar logado.
 * Mock: qualquer e-mail entra. Compõe o Modal base, com os campos e botão padrão.
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
      containerClassName="absolute left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2"
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 rounded-2xl bg-bone-50 p-8 shadow-2xl"
      >
        <div>
          <h2 className="text-2xl">Entrar</h2>
          <p className="mt-2 text-sm text-ink-700">
            Entre para montar seu pedido. Assim conseguimos pesar seus itens e liberar o pagamento
            depois.
          </p>
        </div>
        <FormField label="E-mail" htmlFor="login-email">
          <TextInput
            id="login-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
          />
        </FormField>
        <Button type="submit" fullWidth>
          Entrar
        </Button>
        <p className="text-center text-xs text-ink-400">
          Login de demonstração — sem senha por ora.
        </p>
      </form>
    </Modal>
  )
}

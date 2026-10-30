import { useState } from 'react'
import { CheckCircle } from '@phosphor-icons/react'
import { ButtonLink } from '@/components/Button'
import { StatusScreen } from '@/components/StatusScreen'
import { StepsCard } from '@/components/StepsCard'
import { BusinessPage } from '@/pages/b2b/shared'
import { PartnerForm } from './components/PartnerForm'

const NEXT_STEPS = [
  'Você conta o que sua operação precisa.',
  'Entramos em contato com uma proposta para o seu volume.',
  'Parceria fechada, liberamos sua conta com preços e pedidos online.',
]

/** Cotação para novos parceiros (/negocios/parceria) — formulário | como funciona. */
export function PartnerQuote() {
  const [sent, setSent] = useState<{ contactName: string; email: string } | null>(null)

  if (sent) {
    return (
      <StatusScreen
        icon={<CheckCircle size={48} weight="light" className="text-mar-500" aria-hidden="true" />}
        title="Solicitação recebida."
        actions={
          <ButtonLink to="/negocios" variant="secondary">
            Voltar
          </ButtonLink>
        }
      >
        Obrigado, {sent.contactName}. Vamos preparar uma proposta e entrar em contato pelo e-mail{' '}
        <strong>{sent.email}</strong> ou telefone informado.
      </StatusScreen>
    )
  }

  return (
    <BusinessPage
      eyebrow="Seleta para negócios"
      title="Solicite uma cotação"
      description="Conte o que sua cozinha ou loja precisa. Montamos uma proposta para o seu volume e formalizamos a parceria."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0">
          <PartnerForm
            onSubmitted={(v) => setSent({ contactName: v.contactName, email: v.email })}
          />
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <StepsCard title="Como funciona" steps={NEXT_STEPS} />
        </aside>
      </div>
    </BusinessPage>
  )
}

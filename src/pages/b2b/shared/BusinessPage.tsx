import type { ComponentProps, ReactNode } from 'react'
import { PageHeader } from '@/components/PageHeader'

type BusinessPageProps = ComponentProps<typeof PageHeader> & { children: ReactNode }

/**
 * Molde das telas de negócios (pedido, revisão, cotações, listas): container padrão,
 * PageHeader e conteúdo com o mesmo ritmo. A folga inferior maior no mobile abre espaço
 * para a barra flutuante do pedido.
 */
export function BusinessPage({ children, ...header }: BusinessPageProps) {
  return (
    <div className="page-container pb-28 pt-10 sm:pt-12 lg:pb-20">
      <PageHeader {...header} />
      <div className="mt-8">{children}</div>
    </div>
  )
}

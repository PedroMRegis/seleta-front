import type { ComponentType } from 'react'
import styled from 'styled-components'

export interface Choice<T extends string> {
  value: T
  label: string
  description?: string
  Icon?: ComponentType<{ size?: number; 'aria-hidden'?: boolean }>
}

interface ChoiceGroupProps<T extends string> {
  /** nome do grupo de rádios */
  name: string
  legend: string
  options: Choice<T>[]
  value: T | undefined
  onChange: (value: T) => void
  error?: string | undefined
  /** colunas do grid a partir de sm — default 2 */
  columns?: 2 | 3 | 4
}

const COLUMNS = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' }

/** Grupo de opções em cartões (rádios nativos escondidos) — teclado e leitor de tela funcionam como rádio comum. */
export function ChoiceGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  columns = 2,
}: ChoiceGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink-900">{legend}</legend>
      <div className={`grid grid-cols-2 gap-2 ${COLUMNS[columns]}`}>
        {options.map(({ value: optionValue, label, description, Icon }) => (
          <Card key={optionValue} $selected={value === optionValue}>
            <input
              type="radio"
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={() => onChange(optionValue)}
              className="sr-only"
            />
            {Icon ? <Icon size={20} aria-hidden /> : null}
            <span className="text-sm font-semibold">{label}</span>
            {description ? <span className="text-xs text-ink-500">{description}</span> : null}
          </Card>
        ))}
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-xs font-semibold text-brasa-500">
          {error}
        </p>
      ) : null}
    </fieldset>
  )
}

// --- styled components ---

/** Cartão de opção: borda fina; selecionado ganha borda de tinta e fundo claro; foco visível pelo rádio escondido. */
const Card = styled.label<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  cursor: pointer;
  border-radius: 0.75rem;
  border: 1px solid ${({ $selected }) => ($selected ? 'var(--color-ink-900)' : 'var(--color-line)')};
  background: ${({ $selected }) => ($selected ? 'var(--color-bone-50)' : 'transparent')};
  box-shadow: ${({ $selected }) => ($selected ? 'inset 0 0 0 1px var(--color-ink-900)' : 'none')};
  padding: 0.75rem 1rem;
  color: var(--color-ink-900);
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    border-color: ${({ $selected }) =>
      $selected ? 'var(--color-ink-900)' : 'var(--color-silver-400)'};
  }

  &:focus-within {
    outline: 2px solid var(--color-steel-500);
    outline-offset: 2px;
  }
`

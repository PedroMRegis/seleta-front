import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'

interface FormFieldProps {
  label: string
  /** id do controle — liga o <label> e as mensagens de ajuda/erro */
  htmlFor: string
  hint?: string
  error?: string | undefined
  children: ReactNode
}

/**
 * Rótulo + controle + dica/erro. O controle (TextInput, TextArea…) vem como filho e deve
 * usar `aria-describedby={describedBy(id)}` para o leitor de tela ler dica e erro.
 */
export function FormField({ label, htmlFor, hint, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink-900">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs font-semibold text-brasa-500">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

/** ids que um controle deve passar em aria-describedby para ler dica e erro do FormField. */
export function describedBy(id: string): string {
  return `${id}-hint ${id}-error`
}

// --- styled components ---

/** Visual comum dos campos: borda fina, foco em aço, borda brasa quando inválido. */
const fieldStyles = css`
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid var(--color-line);
  background: var(--color-bone-50);
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  color: var(--color-ink-900);
  transition: border-color 0.15s ease;

  &::placeholder {
    color: var(--color-ink-400);
  }

  &:hover {
    border-color: var(--color-silver-400);
  }

  &:focus {
    outline: 2px solid var(--color-steel-500);
    outline-offset: 1px;
    border-color: var(--color-steel-500);
  }

  &[aria-invalid='true'] {
    border-color: var(--color-brasa-500);
  }
`

/** Campo de texto de uma linha. */
export const TextInput = styled.input`
  ${fieldStyles}
`

/** Select nativo com o mesmo visual dos campos e seta própria. */
export const Select = styled.select`
  ${fieldStyles}
  appearance: none;
  padding-right: 2.5rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%236b6357' stroke-width='1.5' d='m4 6 4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.875rem center;
  background-size: 1rem;
  cursor: pointer;
`

/** Área de texto com o mesmo visual do TextInput. */
export const TextArea = styled.textarea`
  ${fieldStyles}
  min-height: 6rem;
  resize: vertical;
  line-height: 1.5;
`

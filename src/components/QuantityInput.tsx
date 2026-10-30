import { useState } from 'react'
import { Minus, Plus } from '@phosphor-icons/react'

interface QuantityInputProps {
  value: number
  /** unidade exibida ao lado do campo (ex: "kg", "dúzia") */
  unit: string
  /** rótulo acessível — ex: "Quantidade de Filé de Salmão" */
  label: string
  /** valor digitado, já convertido em número (0 quando vazio/inválido) */
  onCommit: (value: number) => void
  onIncrement: () => void
  onDecrement: () => void
  /** ocupa a largura toda, com botões maiores (substitui um botão de largura total) */
  fullWidth?: boolean
}

function format(value: number): string {
  return value === 0 ? '' : value.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
}

function parse(text: string): number {
  const n = Number(text.trim().replace(',', '.'))
  return Number.isFinite(n) && n > 0 ? n : 0
}

/**
 * Campo de quantidade com −/+ que aceita decimal no formato pt-BR ("12,5"). Enquanto o
 * usuário digita, guarda o texto; o número só sobe (onCommit) ao sair do campo ou no Enter.
 */
export function QuantityInput({
  value,
  unit,
  label,
  onCommit,
  onIncrement,
  onDecrement,
  fullWidth = false,
}: QuantityInputProps) {
  const stepButton = `inline-flex items-center justify-center rounded-full text-ink-700 transition hover:bg-bone-200 ${
    fullWidth ? 'h-10 w-10' : 'h-8 w-8'
  }`
  const [text, setText] = useState<string | null>(null)

  const commit = () => {
    if (text !== null) onCommit(parse(text))
    setText(null)
  }

  return (
    <div
      className={`items-center rounded-full border border-line bg-bone-50 ${
        fullWidth ? 'flex w-full justify-between' : 'inline-flex'
      }`}
    >
      <button
        type="button"
        aria-label={`Diminuir ${label}`}
        onClick={onDecrement}
        disabled={value === 0}
        className={`${stepButton} disabled:text-ink-400 disabled:hover:bg-transparent`}
      >
        <Minus size={14} aria-hidden="true" />
      </button>
      <span className="flex items-center">
        <input
          type="text"
          inputMode="decimal"
          aria-label={label}
          placeholder="0"
          value={text ?? format(value)}
          onFocus={(e) => {
            setText(format(value))
            e.currentTarget.select()
          }}
          onChange={(e) => setText(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
          }}
          className="w-12 bg-transparent text-center text-sm font-semibold text-ink-900 tabular-nums outline-none placeholder:font-normal placeholder:text-ink-400"
        />
        <span className="pr-1 text-xs text-ink-500">{unit}</span>
      </span>
      <button
        type="button"
        aria-label={`Aumentar ${label}`}
        onClick={onIncrement}
        className={stepButton}
      >
        <Plus size={14} aria-hidden="true" />
      </button>
    </div>
  )
}

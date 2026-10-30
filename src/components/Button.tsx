import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import styled, { css } from 'styled-components'

/**
 * primary = tinta sólida (ação principal) · secondary = contorno · ghost = só texto ·
 * inverse = osso sólido, para usar sobre fundo escuro · inverseOutline = contorno claro
 * sobre fundo escuro.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'inverseOutline'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface StyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** ocupa toda a largura do container */
  fullWidth?: boolean
}

type ButtonProps = StyleProps & ButtonHTMLAttributes<HTMLButtonElement>
type ButtonLinkProps = StyleProps & LinkProps
type ButtonAnchorProps = StyleProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** Botão padrão do site. Para navegação use `ButtonLink`, com o mesmo visual. */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <StyledButton type={type} $variant={variant} $size={size} $fullWidth={fullWidth} {...rest} />
  )
}

/** Link de rota com cara de botão. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...rest
}: ButtonLinkProps) {
  return <StyledLink $variant={variant} $size={size} $fullWidth={fullWidth} {...rest} />
}

/**
 * Âncora nativa com cara de botão — para pular a uma seção da mesma página
 * (`href="#categorias"`): o navegador rola até o id, sem passar pelo roteador.
 */
export function ButtonAnchor({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...rest
}: ButtonAnchorProps) {
  return <StyledAnchor $variant={variant} $size={size} $fullWidth={fullWidth} {...rest} />
}

// --- styled components ---

/** Estilo base + variantes de cor e tamanho, compartilhado por Button e ButtonLink. */
const buttonStyles = css<{ $variant: ButtonVariant; $size: ButtonSize; $fullWidth: boolean }>`
  display: ${({ $fullWidth }) => ($fullWidth ? 'flex' : 'inline-flex')};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid transparent;
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    transform 0.1s ease;

  ${({ $size }) =>
    ({
      sm: css`
        padding: 0.5rem 1rem;
        font-size: 0.8125rem;
      `,
      md: css`
        padding: 0.75rem 1.5rem;
        font-size: 0.875rem;
      `,
      lg: css`
        padding: 1rem 2rem;
        font-size: 1rem;
      `,
    })[$size]}

  ${({ $variant }) =>
    ({
      primary: css`
        background: var(--color-ink-900);
        color: var(--color-bone-50);
        &:hover {
          background: var(--color-ink-700);
        }
      `,
      secondary: css`
        border-color: var(--color-ink-900);
        color: var(--color-ink-900);
        &:hover {
          background: var(--color-bone-200);
        }
      `,
      ghost: css`
        color: var(--color-ink-700);
        &:hover {
          background: var(--color-bone-200);
          color: var(--color-ink-900);
        }
      `,
      inverse: css`
        background: var(--color-bone-50);
        color: var(--color-ink-900);
        &:hover {
          background: var(--color-bone-200);
        }
      `,
      inverseOutline: css`
        border-color: rgba(248, 245, 239, 0.45);
        color: var(--color-bone-50);
        &:hover {
          border-color: var(--color-bone-50);
          background: rgba(248, 245, 239, 0.08);
        }
      `,
    })[$variant]}

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
    transform: none;
  }
`

/** Botão nativo com o estilo compartilhado. */
const StyledButton = styled.button<{
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
}>`
  ${buttonStyles}
`

/** Link do react-router com o estilo compartilhado. */
const StyledLink = styled(Link)<{
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
}>`
  ${buttonStyles}
`

/** Âncora nativa com o estilo compartilhado. */
const StyledAnchor = styled.a<{ $variant: ButtonVariant; $size: ButtonSize; $fullWidth: boolean }>`
  ${buttonStyles}
`

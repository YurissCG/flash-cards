import type { AnchorHTMLAttributes, HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'ghost' | 'link'
export type ButtonSize = 'md' | 'lg'

interface ButtonSharedProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  'aria-label'?: string
}

interface ButtonAsButtonProps extends ButtonSharedProps {
  href?: undefined
  type?: 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

interface ButtonAsAnchorProps extends ButtonSharedProps {
  href: string
  target?: HTMLAttributeAnchorTarget
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel']
  onClick?: MouseEventHandler<HTMLAnchorElement>
  /** Fase de captura — dispara antes de listeners de terceiros anexados
   * diretamente no elemento, mesmo que eles chamem stopPropagation depois. */
  onClickCapture?: MouseEventHandler<HTMLAnchorElement>
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-transform duration-150 disabled:opacity-50 disabled:pointer-events-none'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Assinatura visual do CTA (§2.4): sombra sólida "3D" que some ao :active,
  // com translateY(4px) — efeito de tecla física. Nunca usar em botões secundários.
  primary: 'bg-verde-500 text-tinta-900 shadow-cta hover:bg-verde-600 active:translate-y-1 active:shadow-none',
  ghost: 'border-2 border-current bg-transparent hover:bg-black/5 active:scale-[0.98]',
  link: 'rounded-none bg-transparent p-0 underline underline-offset-4 hover:no-underline',
}

const SIZE_CLASSES: Record<ButtonSize | 'link', string> = {
  md: 'min-h-11 px-6 py-3 text-sm',
  lg: 'min-h-11 px-8 py-4 text-lead',
  link: 'text-sm',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[variant === 'link' ? 'link' : size], className)

  if (props.href !== undefined) {
    const { href, target, rel, onClick, onClickCapture, 'aria-label': ariaLabel } = props
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onClickCapture={onClickCapture}
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
      </a>
    )
  }

  const { type = 'button', onClick, disabled, 'aria-label': ariaLabel } = props
  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  )
}

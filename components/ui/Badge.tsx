import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { AccentColor } from '@/content/hero-cards'

export type BadgeColor = AccentColor

interface BadgeProps {
  children: ReactNode
  color?: BadgeColor
  className?: string
}

// roxo/verde/amarelo usam o par claro (§2.2: "roxo-100 — faixa clara, badges,
// fundo de chips"). Coral não tem um tom -100 na paleta e é reservado para
// alertas — aqui aparece sólido (bg-coral-400 + texto escuro), o que também o
// deixa deliberadamente mais chamativo que os outros três quando usado como
// tarja de categoria (ex.: Ansiedade, Luto nos hero cards).
const COLOR_CLASSES: Record<BadgeColor, string> = {
  roxo: 'bg-roxo-100 text-roxo-800',
  verde: 'bg-verde-100 text-verde-600',
  amarelo: 'bg-amarelo-100 text-tinta-900',
  coral: 'bg-coral-400 text-tinta-900',
}

export function Badge({ children, color = 'roxo', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 font-sans text-xs font-semibold',
        COLOR_CLASSES[color],
        className,
      )}
    >
      {children}
    </span>
  )
}

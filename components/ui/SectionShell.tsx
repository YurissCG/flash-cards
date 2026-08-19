import type { ReactNode } from 'react'
import { Container } from './Container'
import { cn } from '@/lib/cn'

/** Faixas cromáticas do mapa da página (§3) — o ritmo roxo↔claro é obrigatório. */
export type Faixa = 'branco' | 'roxo-50' | 'roxo-500' | 'roxo-800' | 'roxo-900'

export interface SectionShellProps {
  id: string
  faixa: Faixa
  eyebrow?: string
  heading: string
  children: ReactNode
  className?: string
}

const FAIXA_BG: Record<Faixa, string> = {
  branco: 'bg-white',
  'roxo-50': 'bg-roxo-50',
  'roxo-500': 'bg-roxo-500',
  'roxo-800': 'bg-roxo-800',
  'roxo-900': 'bg-roxo-900',
}

const FAIXA_TEXT: Record<Faixa, string> = {
  branco: 'text-tinta-900',
  'roxo-50': 'text-tinta-900',
  'roxo-500': 'text-white',
  'roxo-800': 'text-white',
  'roxo-900': 'text-white',
}

// Eyebrow (§2.3): roxo-400 em faixa clara, amarelo-400 em faixa roxa. Em texto
// pequeno (13px) e bold, roxo-400 sobre branco/roxo-50 não passa AA (4,02:1 e
// 3,66:1 — abaixo de 4,5:1; achado real via Lighthouse, a tabela de §2.2 não
// cobria essa combinação). roxo-600 é o tom mais próximo na mesma rampa que
// passa (7,20:1 / 6,57:1).
const FAIXA_EYEBROW: Record<Faixa, string> = {
  branco: 'text-roxo-600',
  'roxo-50': 'text-roxo-600',
  'roxo-500': 'text-amarelo-400',
  'roxo-800': 'text-amarelo-400',
  'roxo-900': 'text-amarelo-400',
}

/** `<section>` + faixa + container + eyebrow + H2, com `aria-labelledby` (§7.4). */
export function SectionShell({ id, faixa, eyebrow, heading, children, className }: SectionShellProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        FAIXA_BG[faixa],
        FAIXA_TEXT[faixa],
        'py-[var(--section-y-mobile)] md:py-[var(--section-y-desktop)]',
        className,
      )}
    >
      <Container>
        {eyebrow ? (
          <p className={cn('font-sans text-xs font-semibold uppercase tracking-[0.14em]', FAIXA_EYEBROW[faixa])}>
            {eyebrow}
          </p>
        ) : null}
        <h2 id={headingId} className={cn('font-display text-h2 font-semibold', eyebrow ? 'mt-3' : undefined)}>
          {heading}
        </h2>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  )
}

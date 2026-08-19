'use client'

import { Button, type ButtonSize } from './Button'
import { track } from '@/lib/analytics'
import { SITE } from '@/content/site'

/** Onde o CTA aparece na página — mapeia 1:1 para as seções de §3. */
export type CtaOrigem =
  | 'hero'
  | 'hero-deck-complete'
  | 'showcase'
  | 'preco'
  | 'garantia'
  | 'cta-final'
  | 'sticky'
  | 'popup-exit-intent'
  | 'popup-scroll-nudge'

export interface CtaButtonProps {
  label: string
  origem: CtaOrigem
  size?: ButtonSize
  className?: string
}

/**
 * Todos os CTAs da página passam por aqui (§4.2). Sempre leva ao mesmo link
 * de pagamento, em nova aba, e dispara `begin_checkout` com a origem antes de
 * navegar (o navegador já abriu a aba pelo próprio <a>; o track só registra).
 */
export function CtaButton({ label, origem, size = 'lg', className }: CtaButtonProps) {
  return (
    <Button
      href={SITE.checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="primary"
      size={size}
      className={className}
      onClick={() => track('begin_checkout', { origem })}
    >
      {label}
    </Button>
  )
}

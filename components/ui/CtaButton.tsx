'use client'

import type { MouseEvent } from 'react'
import { Button, type ButtonSize } from './Button'
import { track } from '@/lib/analytics'
import { SITE } from '@/content/site'
import { openCheckoutNow } from '@/lib/checkout-safety-net'

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
 * de pagamento, em nova aba, e dispara `begin_checkout` com a origem. Os
 * dois (abertura e tracking interno) rodam em onClickCapture — o pixel de
 * rastreamento de terceiro anexa um listener no próprio elemento (fase de
 * bubble) e chama stopPropagation, o que impediria um onClick normal (que
 * o React entrega via um listener delegado, mais acima na árvore) de
 * disparar. onClickCapture roda antes disso, então sempre executa.
 */
export function CtaButton({ label, origem, size = 'lg', className }: CtaButtonProps) {
  function handleClickCapture(event: MouseEvent<HTMLAnchorElement>) {
    track('begin_checkout', { origem })
    openCheckoutNow(event)
  }

  return (
    <Button
      href={SITE.checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="primary"
      size={size}
      className={className}
      onClickCapture={handleClickCapture}
    >
      {label}
    </Button>
  )
}

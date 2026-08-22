import { SITE } from '@/content/site'

// Detecta com certeza se o checkout já foi aberto por QUALQUER código nesta
// página (inclusive o pixel de terceiro) — não por um palpite de foco/
// visibilidade, que criava aba duplicada quando o fallback deles também
// funcionava (só que mais devagar). window.open é o único jeito globalmente
// observável de saber isso, então essa interceptação é a fonte da verdade.
let checkoutOpened = false

function patchWindowOpenOnce() {
  if (typeof window === 'undefined') return
  const flagged = window as typeof window & { __ctaSafetyNetPatched?: boolean }
  if (flagged.__ctaSafetyNetPatched) return
  flagged.__ctaSafetyNetPatched = true

  const nativeOpen = window.open.bind(window)
  window.open = ((url?: string | URL, target?: string, features?: string) => {
    if (url != null && String(url).includes('pay.cakto.com.br')) checkoutOpened = true
    return nativeOpen(url, target, features)
  }) as typeof window.open
}

const SAFETY_NET_DELAY_MS = 3500

/**
 * Rede de segurança: o pixel da UTMify intercepta o clique em qualquer <a>
 * que pareça um botão de checkout (preventDefault + stopPropagation) pra
 * rastrear o InitiateCheckout antes de navegar. Constatado ao vivo (clique
 * sem ir a lugar nenhum): quando a chamada de rastreamento dele falha de
 * certas formas, o fallback de navegação dele não dispara a tempo — ou não
 * dispara nunca. Isso precisa rodar na fase de *captura* (onClickCapture),
 * que dispara antes do listener deles (anexado direto no elemento, fase de
 * bubble), então funciona mesmo que eles chamem stopPropagation depois.
 * Depois de um tempo, checa se ALGUÉM (inclusive o script deles, quando só
 * está lento) já abriu o checkout via window.open — só abre por conta
 * própria se ninguém abriu, evitando abas duplicadas.
 */
export function armCheckoutSafetyNet() {
  patchWindowOpenOnce()
  setTimeout(() => {
    if (!checkoutOpened) window.open(SITE.checkoutUrl, '_blank', 'noopener,noreferrer')
  }, SAFETY_NET_DELAY_MS)
}

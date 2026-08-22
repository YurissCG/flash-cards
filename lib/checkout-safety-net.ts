import type { MouseEvent as ReactMouseEvent } from 'react'
import { SITE } from '@/content/site'

// Suprime a navegação duplicada quando o pixel de terceiro (UTMify) TAMBÉM
// tenta abrir o checkout por conta própria (ele intercepta window.open
// globalmente, então nossa chamada passa pelo wrapper dele — e, quando ele
// mesmo tenta abrir de novo logo em seguida, isso vira uma segunda aba
// idêntica). Uma janela curta de cooldown por URL evita isso sem impedir
// que o rastreamento dele continue rodando por trás.
const recentlyOpened = new Map<string, number>()
const DEDUPE_WINDOW_MS = 4000

function patchWindowOpenOnce() {
  if (typeof window === 'undefined') return
  const flagged = window as typeof window & { __ctaSafetyNetPatched?: boolean }
  if (flagged.__ctaSafetyNetPatched) return
  flagged.__ctaSafetyNetPatched = true

  const nativeOpen = window.open.bind(window)
  window.open = ((url?: string | URL, target?: string, features?: string) => {
    const key = url != null ? String(url) : ''
    const last = recentlyOpened.get(key)
    const now = Date.now()
    if (last != null && now - last < DEDUPE_WINDOW_MS) return null
    recentlyOpened.set(key, now)
    return nativeOpen(url, target, features)
  }) as typeof window.open
}

/**
 * O pixel da UTMify intercepta o clique em qualquer <a> que pareça botão de
 * checkout (preventDefault + stopPropagation) pra rastrear InitiateCheckout
 * antes de navegar, e só então abre o checkout por conta própria. Constatado
 * ao vivo, em ordem de gravidade:
 *
 * 1) Quando a chamada de rastreamento dele falha de certas formas, o
 *    fallback de navegação dele não dispara a tempo — ou nunca dispara.
 * 2) Mesmo quando funciona, é lento (~3-4s até abrir o checkout) porque
 *    espera múltiplas chamadas de rede antes de navegar.
 * 3) Uma primeira correção que atrasava nossa própria abertura via
 *    setTimeout (esperar alguns segundos e checar se nada abriu) piorou
 *    isso: window.open chamado fora do gesto síncrono do clique é tratado
 *    como pop-up pelo navegador e pode ser bloqueado silenciosamente —
 *    "às vezes funciona, às vezes não" dependia só de timing/navegador.
 *
 * A correção robusta é não esperar nada: abre o checkout NA HORA, de forma
 * síncrona, dentro do próprio gesto de clique (onClickCapture — roda antes
 * do listener deles, que fica no elemento, fase de bubble, então funciona
 * mesmo que eles chamem stopPropagation depois). Isso nunca é bloqueado por
 * bloqueador de pop-up porque é literalmente a mesma coisa que o navegador
 * faria nativamente para um <a target="_blank">. O rastreamento deles
 * continua rodando por trás sem interferência; o cooldown acima só evita
 * que a tentativa (mais lenta) dele de navegar de novo abra uma segunda aba.
 *
 * Resta um efeito colateral: quando o fallback deles finalmente roda,
 * ele navega a ABA ORIGINAL pro checkout (em vez de só abrir uma nova) —
 * confirmado ao vivo, isso faz a landing page "sumir" da aba original
 * mesmo com a nova aba já aberta. Como esse fallback lê `href` do próprio
 * elemento (não de uma constante, como o nosso), esconder o `href` real do
 * DOM por alguns segundos impede essa navegação indesejada sem tocar no
 * rastreamento deles, que já rodou antes desse ponto do fluxo.
 */
const HREF_RESTORE_DELAY_MS = 6000

export function openCheckoutNow(event: ReactMouseEvent<HTMLAnchorElement>) {
  patchWindowOpenOnce()
  event.preventDefault()

  const anchor = event.currentTarget
  const realHref = anchor.getAttribute('href')
  anchor.setAttribute('href', '#')
  window.setTimeout(() => {
    if (realHref) anchor.setAttribute('href', realHref)
  }, HREF_RESTORE_DELAY_MS)

  window.open(SITE.checkoutUrl, '_blank', 'noopener,noreferrer')
}

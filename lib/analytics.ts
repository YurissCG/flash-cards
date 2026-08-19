type AnalyticsPayload = Record<string, string | number | boolean | undefined>

interface QueuedEvent {
  event: string
  payload?: AnalyticsPayload
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

const queue: QueuedEvent[] = []
let ready = false
let checkoutStarted = false

function send(event: string, payload?: AnalyticsPayload) {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...payload })
  window.gtag?.('event', event, payload)
  window.fbq?.('trackCustom', event, payload)
}

/** Enfileira o evento se os pixels ainda não carregaram; envia direto caso já estejam prontos. */
export function track(event: string, payload?: AnalyticsPayload) {
  if (event === 'begin_checkout') checkoutStarted = true
  if (typeof window === 'undefined') return
  if (!ready) {
    queue.push({ event, payload })
    return
  }
  send(event, payload)
}

/** Usado pelos pop-ups (§5.5.3): nunca exibir depois que begin_checkout disparou. */
export function hasCheckoutStarted(): boolean {
  return checkoutStarted
}

/** Chamado quando os scripts de GA4/Meta terminam de carregar — esvazia a fila em ordem. */
export function markAnalyticsReady() {
  ready = true
  while (queue.length > 0) {
    const next = queue.shift()
    if (next) send(next.event, next.payload)
  }
}

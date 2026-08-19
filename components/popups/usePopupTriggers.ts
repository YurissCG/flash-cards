'use client'

import { useEffect, useRef } from 'react'
import { useExitIntent } from '@/hooks/useExitIntent'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { hasCheckoutStarted } from '@/lib/analytics'
import type { PopupId } from './PopupProvider'

// exit-intent é desktop (mouseleave não existe em touch); scroll-nudge é
// mobile — a tabela de §5.5.3 rotula os dois gatilhos assim, sem overlap.
const DESKTOP_QUERY = '(min-width: 1024px)'

const MIN_PAGE_AGE_MS = 20_000 // §5.5.3: nunca nos primeiros 20s (supressão global)
const EXIT_INTENT_MIN_AGE_MS = 25_000
const EXIT_INTENT_MIN_SCROLL = 0.25
const SCROLL_NUDGE_MIN_AGE_MS = 40_000
const SCROLL_NUDGE_MIN_SCROLL = 0.6
const SCROLL_CHECK_INTERVAL_MS = 500

function getScrollDepth(): number {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - doc.clientHeight
  if (scrollable <= 0) return 1
  return window.scrollY / scrollable
}

/**
 * Orquestra os gatilhos de exit-intent e scroll-nudge, chamando `enqueue`
 * quando as condições e as supressões globais de §5.5.3 são satisfeitas.
 * Recebe `enqueue`/`isSuppressed` por parâmetro (não via `usePopup()`) porque
 * é chamado de dentro do próprio PopupProvider, fora da árvore do seu Context.
 */
export function usePopupTriggers(enqueue: (id: PopupId) => void, isSuppressed: boolean) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const mountedAtRef = useRef(0)
  const scrollNudgeFiredRef = useRef(false)

  useEffect(() => {
    mountedAtRef.current = Date.now()
  }, [])

  function canShowAny(): boolean {
    if (isSuppressed) return false
    if (hasCheckoutStarted()) return false
    return Date.now() - mountedAtRef.current >= MIN_PAGE_AGE_MS
  }

  useExitIntent(() => {
    if (!isDesktop) return
    if (!canShowAny()) return
    if (Date.now() - mountedAtRef.current < EXIT_INTENT_MIN_AGE_MS) return
    if (getScrollDepth() < EXIT_INTENT_MIN_SCROLL) return
    enqueue('exit-intent')
  }, isDesktop)

  useEffect(() => {
    if (isDesktop) return
    if (scrollNudgeFiredRef.current) return

    function check() {
      if (scrollNudgeFiredRef.current) return
      if (!canShowAny()) return
      if (Date.now() - mountedAtRef.current < SCROLL_NUDGE_MIN_AGE_MS) return
      if (getScrollDepth() < SCROLL_NUDGE_MIN_SCROLL) return
      scrollNudgeFiredRef.current = true
      enqueue('scroll-nudge')
    }

    const interval = setInterval(check, SCROLL_CHECK_INTERVAL_MS)
    window.addEventListener('scroll', check, { passive: true })
    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', check)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, isSuppressed])
}
